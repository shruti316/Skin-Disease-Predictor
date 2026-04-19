import streamlit as st
from PIL import Image
import numpy as np
import os

# ─────────────────────────────────────────────
#  PAGE CONFIG
# ─────────────────────────────────────────────
st.set_page_config(
    page_title="Skin Disease Predictor",
    page_icon="🩺",
    layout="centered"
)

# ─────────────────────────────────────────────
#  CUSTOM CSS
# ─────────────────────────────────────────────
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

    html, body, [class*="css"] {
        font-family: 'Inter', sans-serif;
    }

    .main-title {
        font-size: 2.2rem;
        font-weight: 700;
        color: #1a1a2e;
        text-align: center;
        margin-bottom: 0.2rem;
    }

    .sub-title {
        font-size: 1rem;
        color: #555;
        text-align: center;
        margin-bottom: 2rem;
    }

    .result-box {
        background: #f0f4ff;
        border-left: 5px solid #4361ee;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        margin-bottom: 1rem;
    }

    .severity-mild     { border-left-color: #2dc653; background: #edfbf0; }
    .severity-moderate { border-left-color: #f4a261; background: #fff8f0; }
    .severity-severe   { border-left-color: #e63946; background: #fff0f1; }

    .suggestion-card {
        background: #ffffff;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 0.8rem 1.2rem;
        margin-bottom: 0.5rem;
        font-size: 0.95rem;
    }

    .footer {
        text-align: center;
        color: #999;
        font-size: 0.8rem;
        margin-top: 3rem;
    }

    .patient-card {
        background: #f8f9fa;
        border-radius: 10px;
        padding: 1rem 1.5rem;
        margin-bottom: 1.5rem;
        border: 1px solid #e0e0e0;
    }
</style>
""", unsafe_allow_html=True)


# ─────────────────────────────────────────────
#  DISEASE CLASSES PER SPECIES
# ─────────────────────────────────────────────
HUMAN_CLASSES = [
    "eczema",
    "melanoma",
    "atopic_dermatitis",
    "basal_cell_carcinoma",
    "melanocytic_nevi",
    "benign_keratosis",
    "psoriasis",
    "seborrheic_keratoses",
    "tinea_ringworm",
    "warts_molluscum"
]

DOG_CLASSES = [
    "ringworm",
    "demodicosis",
    "hypersensitivity",
    "healthy",
    "fungal_infections",
    "dermatitis"
]

CAT_CLASSES = [
    "scabies",
    "ringworm",
    "healthy",
    "flea_allergy"
]


# ─────────────────────────────────────────────
#  RECOMMENDATION SYSTEM
# ─────────────────────────────────────────────
RECOMMENDATIONS = {
    # ── HUMAN DISEASES ──
    "eczema": {
        "mild":     ["Moisturize affected area 2x daily",
                     "Use fragrance-free soap",
                     "Wear loose, cotton clothing"],
        "moderate": ["Apply prescribed topical steroids if available",
                     "Avoid known triggers (heat, stress, certain fabrics)",
                     "Keep nails short to avoid scratching"],
        "severe":   ["Seek immediate dermatological consultation",
                     "Avoid self-medicating with strong steroids",
                     "Track triggers in a diary for your doctor"]
    },
    "melanoma": {
        "mild":     ["Monitor the mole/spot regularly",
                     "Take a photo and compare monthly",
                     "Consult a dermatologist for a skin check"],
        "moderate": ["Book a dermatologist appointment urgently",
                     "Avoid sun exposure on the affected area",
                     "Do not attempt home treatment"],
        "severe":   ["Seek immediate medical attention",
                     "This may require biopsy or specialist review",
                     "Do not delay — early detection is critical"]
    },
    "atopic_dermatitis": {
        "mild":     ["Keep skin moisturized with thick creams",
                     "Avoid hot showers",
                     "Use hypoallergenic detergent"],
        "moderate": ["See a dermatologist for topical treatment",
                     "Identify and avoid allergen triggers",
                     "Use antihistamines for itching relief"],
        "severe":   ["Immediate dermatologist consultation needed",
                     "May require immunosuppressant therapy",
                     "Do not scratch — risk of infection is high"]
    },
    "basal_cell_carcinoma": {
        "mild":     ["See a dermatologist for evaluation",
                     "Avoid sun exposure on area",
                     "Document size and appearance monthly"],
        "moderate": ["Urgent dermatologist appointment required",
                     "Do not attempt home treatment",
                     "May require surgical removal"],
        "severe":   ["Immediate medical consultation required",
                     "Surgical or radiation treatment may be needed",
                     "Do not delay — consult an oncologist"]
    },
    "melanocytic_nevi": {
        "mild":     ["Monitor for changes in size or color",
                     "Apply sunscreen on affected area",
                     "Annual skin checks recommended"],
        "moderate": ["See dermatologist for dermoscopy evaluation",
                     "Avoid sun exposure",
                     "Track any changes carefully"],
        "severe":   ["Urgent dermatologist visit required",
                     "Biopsy may be needed",
                     "Do not delay medical evaluation"]
    },
    "benign_keratosis": {
        "mild":     ["Keep area moisturized",
                     "Avoid picking or scratching",
                     "Use gentle exfoliation"],
        "moderate": ["Consult dermatologist for treatment options",
                     "Cryotherapy may be recommended",
                     "Avoid sun exposure on affected area"],
        "severe":   ["See a dermatologist immediately",
                     "May require removal procedure",
                     "Rule out malignancy with professional evaluation"]
    },
    "psoriasis": {
        "mild":     ["Keep skin moisturized",
                     "Avoid dry environments",
                     "Gentle sunlight exposure may help"],
        "moderate": ["Use medicated shampoos if scalp affected",
                     "Avoid alcohol and smoking",
                     "Consult a doctor for topical treatments"],
        "severe":   ["Biological therapy may be needed — see a specialist",
                     "Do not delay medical consultation",
                     "Track flare-up patterns carefully"]
    },
    "seborrheic_keratoses": {
        "mild":     ["No treatment needed if asymptomatic",
                     "Keep area clean and dry",
                     "Monitor for any changes"],
        "moderate": ["See dermatologist if itchy or irritated",
                     "Avoid scratching or picking",
                     "Cryotherapy is a common treatment"],
        "severe":   ["Consult dermatologist immediately",
                     "Rule out malignancy",
                     "Professional removal may be required"]
    },
    "tinea_ringworm": {
        "mild":     ["Apply antifungal cream (clotrimazole) twice daily",
                     "Keep the area clean and dry",
                     "Do not share towels or clothing"],
        "moderate": ["Continue antifungal treatment for full 2-4 weeks",
                     "Wash clothes and bedding in hot water",
                     "See a doctor if no improvement in 2 weeks"],
        "severe":   ["Oral antifungal medication may be required",
                     "Consult a doctor immediately",
                     "Check family members and pets for infection"]
    },
    "warts_molluscum": {
        "mild":     ["Avoid touching or picking warts",
                     "Keep area clean and dry",
                     "Use OTC salicylic acid treatment"],
        "moderate": ["See dermatologist for removal options",
                     "Cryotherapy is commonly used",
                     "Avoid spreading to other body parts"],
        "severe":   ["Immediate dermatologist consultation",
                     "Multiple treatment sessions may be needed",
                     "Check immune system health with doctor"]
    },

    # ── DOG DISEASES ──
    "ringworm": {
        "mild":     ["Apply antifungal cream on affected area",
                     "Keep area clean and dry",
                     "Isolate pet from other animals"],
        "moderate": ["Consult vet for medicated shampoo",
                     "Wash pet bedding in hot water",
                     "Continue treatment for full course"],
        "severe":   ["Immediate vet consultation required",
                     "Oral antifungal medication may be needed",
                     "Isolate from all other pets and humans"]
    },
    "demodicosis": {
        "mild":     ["Keep dog clean and well-groomed",
                     "Boost immunity with good nutrition",
                     "Monitor for spreading"],
        "moderate": ["Medicated shampoo treatment required",
                     "Vet consultation for antiparasitic treatment",
                     "Regular follow-up checks needed"],
        "severe":   ["Immediate vet attention required",
                     "Systemic treatment likely needed",
                     "Isolate from other pets"]
    },
    "hypersensitivity": {
        "mild":     ["Identify and remove allergen triggers",
                     "Keep environment clean",
                     "Use hypoallergenic pet food"],
        "moderate": ["Vet consultation for antihistamines",
                     "Allergy testing may be recommended",
                     "Avoid known triggers strictly"],
        "severe":   ["Urgent vet visit required",
                     "Immunotherapy may be needed",
                     "Do not delay — severe reactions can be dangerous"]
    },
    "fungal_infections": {
        "mild":     ["Keep affected area dry and clean",
                     "Apply antifungal cream",
                     "Avoid moisture buildup in skin folds"],
        "moderate": ["Vet prescribed antifungal treatment",
                     "Medicated baths may be recommended",
                     "Follow full treatment course"],
        "severe":   ["Immediate vet consultation",
                     "Systemic antifungal medication needed",
                     "Regular vet follow-up required"]
    },
    "dermatitis": {
        "mild":     ["Identify and remove irritant",
                     "Keep area clean and dry",
                     "Use gentle pet-safe cleanser"],
        "moderate": ["Vet consultation for topical treatment",
                     "Avoid scratching with collar if needed",
                     "Antihistamines may help"],
        "severe":   ["Urgent vet visit required",
                     "May need steroid treatment",
                     "Rule out underlying health conditions"]
    },

    # ── CAT DISEASES ──
    "scabies": {
        "mild":     ["Isolate cat from other pets",
                     "Clean and disinfect bedding",
                     "Antiparasitic treatment from vet"],
        "moderate": ["Vet consultation required immediately",
                     "Full course of treatment needed",
                     "Wash all pet bedding thoroughly"],
        "severe":   ["Urgent vet attention required",
                     "Highly contagious — isolate immediately",
                     "All pets in household should be checked"]
    },
    "flea_allergy": {
        "mild":     ["Apply flea prevention treatment",
                     "Clean home environment thoroughly",
                     "Vacuum carpets and furniture regularly"],
        "moderate": ["Vet consultation for antihistamines",
                     "Strict flea control program needed",
                     "Treat all pets in household"],
        "severe":   ["Immediate vet attention required",
                     "Secondary skin infection risk is high",
                     "Professional flea treatment for home needed"]
    },

    # ── HEALTHY ──
    "healthy": {
        "mild":     ["Skin looks healthy! Maintain good skincare routine",
                     "Stay hydrated and use SPF daily",
                     "Continue regular skin self-checks"]
    }
}

SEVERITY_COLORS = {
    "mild":     ("🟢", "severity-mild",     "Mild"),
    "moderate": ("🟡", "severity-moderate", "Moderate"),
    "severe":   ("🔴", "severity-severe",   "Severe"),
}


# ─────────────────────────────────────────────
#  LOAD MODEL
# ─────────────────────────────────────────────
@st.cache_resource
def load_model():
    model_path = "checkpoints/best_model.pth"
    if os.path.exists(model_path):
        try:
            import torch
            from model.model import SkinDiseaseModel
            device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
            # Number of classes depends on species — will be set dynamically
            model = SkinDiseaseModel(num_classes=10)
            model.load_state_dict(torch.load(model_path, map_location=device))
            model.eval()
            return model
        except Exception as e:
            st.warning(f"Could not load model: {e}. Running in demo mode.")
            return None
    return None


# ─────────────────────────────────────────────
#  PREPROCESS IMAGE
# ─────────────────────────────────────────────
def preprocess_image(image: Image.Image):
    try:
        import torch
        from torchvision import transforms
        transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(
                mean=[0.485, 0.456, 0.406],
                std=[0.229, 0.224, 0.225]
            )
        ])
        img = image.convert("RGB")
        return transform(img).unsqueeze(0)
    except Exception:
        return None


# ─────────────────────────────────────────────
#  PREDICT
# ─────────────────────────────────────────────
def run_prediction(image: Image.Image, model, species: str):
    # Get correct class list based on species
    if species == "Human":
        class_names = HUMAN_CLASSES
    elif species == "Dog":
        class_names = DOG_CLASSES
    else:
        class_names = CAT_CLASSES

    if model is not None:
        try:
            import torch
            img_tensor = preprocess_image(image)
            if img_tensor is not None:
                with torch.no_grad():
                    disease_out, severity_out = model(img_tensor)
                    disease_probs = torch.softmax(disease_out, dim=1)
                    disease_idx = disease_probs.argmax().item()
                    confidence = float(disease_probs.max().item())
                    severity_idx = severity_out.argmax().item()
                    severity_map = {0: "mild", 1: "moderate", 2: "severe"}
                    condition = class_names[min(disease_idx, len(class_names)-1)]
                    severity = severity_map[severity_idx]
                    return condition, confidence, severity
        except Exception as e:
            st.warning(f"Prediction error: {e}. Using demo mode.")

    # Demo mode
    if species == "Human":
        return "eczema", 0.82, "moderate"
    elif species == "Dog":
        return "dermatitis", 0.75, "mild"
    else:
        return "ringworm", 0.70, "moderate"


# ─────────────────────────────────────────────
#  ADJUST SEVERITY BASED ON PATIENT DATA
# ─────────────────────────────────────────────
def adjust_severity(severity: str, age: int, duration: str, spreading: bool, species: str) -> str:
    severity_levels = ["mild", "moderate", "severe"]
    idx = severity_levels.index(severity)

    # Bump up severity for high risk cases
    if species == "Human":
        if age > 60 or age < 5:
            idx = min(idx + 1, 2)
    if "More than 1 month" in duration:
        idx = min(idx + 1, 2)
    if spreading:
        idx = min(idx + 1, 2)

    return severity_levels[idx]


# ─────────────────────────────────────────────
#  MAIN APP
# ─────────────────────────────────────────────
def main():
    # ── SIDEBAR ──
    with st.sidebar:
        st.image("https://img.icons8.com/color/96/skin.png", width=80)
        st.title("🩺 About This App")
        st.markdown("""
        This AI tool analyzes skin images to:
        - 🔍 Detect skin conditions
        - 📊 Classify severity
        - 💡 Give care suggestions
        """)
        st.divider()
        st.markdown("**Supported Species:**")
        st.markdown("• 🧑 Humans\n• 🐕 Dogs\n• 🐈 Cats")
        st.divider()
        st.warning("⚠️ Not a medical diagnosis tool. Always consult a dermatologist or vet.")
        st.divider()
        st.markdown("**Made by:** Team 🎓")
        st.markdown("**Project:** ML Skin Disease Predictor")

    # ── HEADER ──
    st.markdown('<div class="main-title">🩺 Skin Disease Predictor</div>', unsafe_allow_html=True)
    st.markdown('<div class="sub-title">Upload a skin image · Fill patient details · Get instant AI analysis</div>', unsafe_allow_html=True)
    st.divider()

    # Load model
    model = load_model()
    if model is None:
        st.info("ℹ️ Running in **Demo Mode** — model not found. Results are placeholder only.")

    # ── PATIENT INFORMATION FORM ──
    st.subheader("👤 Patient Information")
    st.markdown('<div class="patient-card">', unsafe_allow_html=True)

    col1, col2 = st.columns(2)
    with col1:
        patient_name = st.text_input("Full Name", placeholder="Enter name")
        age = st.number_input("Age", min_value=1, max_value=120, value=25)
        gender = st.selectbox("Gender", ["Male", "Female", "Other"])

    with col2:
        species = st.selectbox("Species", ["Human", "Dog", "Cat"])
        duration = st.selectbox("How long has this been present?", [
            "Less than 1 week",
            "1-2 weeks",
            "2-4 weeks",
            "More than 1 month"
        ])
        itchy = st.checkbox("Is it itchy?")
        spreading = st.checkbox("Is it spreading?")

    known_allergies = st.text_input("Known Allergies (if any)", placeholder="e.g. pollen, dust, none")

    st.markdown('</div>', unsafe_allow_html=True)

    st.divider()

    # ── IMAGE UPLOAD ──
    st.subheader("📤 Upload Skin Image")
    uploaded_file = st.file_uploader(
        "Choose a clear photo of the affected skin area",
        type=["jpg", "jpeg", "png", "webp"],
        help="Supported formats: JPG, PNG, WEBP"
    )

    if uploaded_file is None:
        st.markdown("#### 👆 Fill patient details and upload an image to get started")
        st.markdown("""
        > ⚠️ This is not a medical diagnosis. Always consult a dermatologist or vet for professional advice.
        """)
        return

    # Show uploaded image
    image = Image.open(uploaded_file)
    col1, col2, col3 = st.columns([1, 2, 1])
    with col2:
        st.image(image, caption="Your uploaded image", use_container_width=True)

    st.divider()

    # ── ANALYZE BUTTON ──
    analyze_clicked = st.button("🔍 Analyze Skin", type="primary", use_container_width=True)

    if not analyze_clicked:
        return

    # Validate name
    if not patient_name.strip():
        st.error("Please enter patient name before analyzing!")
        return

    # ── RUN PREDICTION ──
    with st.spinner("Analyzing your image..."):
        condition, confidence, severity = run_prediction(image, model, species)
        severity = adjust_severity(severity, age, duration, spreading, species)

    st.success("✅ Analysis complete!")
    st.divider()

    # ── PATIENT SUMMARY ──
    st.subheader("👤 Patient Summary")
    col1, col2, col3, col4 = st.columns(4)
    col1.metric("Name", patient_name.title())
    col2.metric("Age", age)
    col3.metric("Species", species)
    col4.metric("Duration", duration.split()[0])

    st.divider()

    # ── RESULTS ──
    st.subheader("📊 Results")

    # Condition
    st.markdown(f"""
    <div class="result-box">
        <b>Detected Condition</b><br>
        <span style="font-size:1.4rem; font-weight:700; text-transform:capitalize;">
            {condition.replace('_', ' ').title()}
        </span>
        &nbsp;&nbsp;
        <span style="color:#888; font-size:0.9rem;">Confidence: {confidence*100:.1f}%</span>
    </div>
    """, unsafe_allow_html=True)

    # Severity
    icon, css_class, label = SEVERITY_COLORS.get(severity, ("⚪", "result-box", severity.title()))
    st.markdown(f"""
    <div class="result-box {css_class}">
        <b>Severity Level</b><br>
        <span style="font-size:1.3rem; font-weight:700;">{icon} {label}</span>
    </div>
    """, unsafe_allow_html=True)

    # ── RECOMMENDATIONS ──
    st.subheader("💡 Care Recommendations")

    condition_recs = RECOMMENDATIONS.get(condition, {})
    severity_recs = condition_recs.get(severity, condition_recs.get("mild", []))

    if severity_recs:
        for tip in severity_recs:
            st.markdown(f'<div class="suggestion-card">✅ {tip}</div>', unsafe_allow_html=True)
    else:
        st.write("Please consult a healthcare professional for this condition.")

    # Doctor/Vet warning for severe
    if severity == "severe":
        if species == "Human":
            st.error("🚨 SEVERE CASE DETECTED — Please consult a doctor or dermatologist immediately!")
        else:
            st.error(f"🚨 SEVERE CASE DETECTED — Please take your {species.lower()} to a vet immediately!")

    st.warning("⚠️ These suggestions are general guidance only and do not replace professional medical advice.")

    # ── SUMMARY TABLE ──
    st.divider()
    st.subheader("📋 Summary")
    col1, col2, col3, col4 = st.columns(4)
    col1.metric("Condition", condition.replace('_', ' ').title())
    col2.metric("Confidence", f"{confidence*100:.1f}%")
    col3.metric("Severity", label)
    col4.metric("Species", species)

    # Footer
    st.markdown('<div class="footer">ML Skin Disease Predictor · For educational purposes only · Not a medical device</div>', unsafe_allow_html=True)


# ─────────────────────────────────────────────
if __name__ == "__main__":
    main()