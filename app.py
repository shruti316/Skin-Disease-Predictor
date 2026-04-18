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
</style>
""", unsafe_allow_html=True)


# ─────────────────────────────────────────────
#  RECOMMENDATION SYSTEM  (YOUR OWN WORK ✅)
# ─────────────────────────────────────────────
RECOMMENDATIONS = {
    "acne": {
        "mild":     ["Wash face twice daily with gentle cleanser",
                     "Avoid touching your face",
                     "Use non-comedogenic moisturizer"],
        "moderate": ["Use salicylic acid or benzoyl peroxide products",
                     "Avoid oily foods and dairy if possible",
                     "Consult a dermatologist if no improvement in 4 weeks"],
        "severe":   ["See a dermatologist as soon as possible",
                     "Do not pop or squeeze pimples",
                     "Prescription treatment may be required"]
    },
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
    "psoriasis": {
        "mild":     ["Keep skin moisturized",
                     "Avoid dry environments",
                     "Gentle sunlight exposure may help"],
        "moderate": ["Use medicated shampoos if scalp is affected",
                     "Avoid alcohol and smoking",
                     "Consult a doctor for topical treatments"],
        "severe":   ["Biological therapy may be needed — see a specialist",
                     "Do not delay medical consultation",
                     "Track flare-up patterns carefully"]
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
    "ringworm": {
        "mild":     ["Apply antifungal cream (clotrimazole) twice daily",
                     "Keep the area clean and dry",
                     "Do not share towels or clothing",
                     "Wash hands after touching affected area"],
        "moderate": ["Continue antifungal treatment for full 2-4 weeks",
                     "Avoid tight clothing over the area",
                     "Wash clothes/bedding in hot water",
                     "See a doctor if no improvement in 2 weeks"],
        "severe":   ["Oral antifungal medication may be required",
                     "Consult a doctor immediately",
                     "Isolate personal items to prevent spreading",
                     "Check family members and pets for infection"]
    },
    "healthy": {
        "mild":     ["Your skin looks healthy! Maintain a good skincare routine",
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
#  HELPER: LOAD MODEL  (connects Member 1's work)
# ─────────────────────────────────────────────
@st.cache_resource
def load_model():
    """
    ── INTEGRATION POINT ──────────────────────────────────
    When Member 1 gives you model.h5, uncomment below:

        from tensorflow.keras.models import load_model as keras_load
        model = keras_load("model.h5")
        return model

    Until then, returns None (dummy mode is used).
    ───────────────────────────────────────────────────────
    """
    model_path = "model.h5"
    if os.path.exists(model_path):
        try:
            from tensorflow.keras.models import load_model as keras_load
            return keras_load(model_path)
        except Exception as e:
            st.warning(f"Could not load model: {e}. Running in demo mode.")
            return None
    return None


# ─────────────────────────────────────────────
#  HELPER: PREPROCESS IMAGE
# ─────────────────────────────────────────────
def preprocess_image(image: Image.Image) -> np.ndarray:
    """Resize + normalize image for model input."""
    img = image.convert("RGB")
    img = img.resize((224, 224))
    img_array = np.array(img) / 255.0          # normalize 0–1
    img_array = np.expand_dims(img_array, axis=0)  # add batch dim
    return img_array


# ─────────────────────────────────────────────
#  HELPER: PREDICT
# ─────────────────────────────────────────────
CLASS_NAMES = ["acne", "eczema", "psoriasis", "melanoma","ringworm",`` "healthy"]

def run_prediction(image: Image.Image, model):
    """
    ── INTEGRATION POINT ──────────────────────────────────
    When Member 1 gives you predict.py, replace dummy below with:

        from predict import predict
        condition, confidence = predict(image)
        return condition, confidence

    OR call the model directly as shown below.
    ───────────────────────────────────────────────────────
    """
    if model is not None:
        img_array = preprocess_image(image)
        predictions = model.predict(img_array)
        idx = np.argmax(predictions[0])
        condition = CLASS_NAMES[idx]
        confidence = float(predictions[0][idx])
        return condition, confidence
    else:
        # ── DUMMY MODE (until model.h5 is ready) ──
        condition = "acne"
        confidence = 0.82
        return condition, confidence


# ─────────────────────────────────────────────
#  HELPER: SEVERITY
# ─────────────────────────────────────────────
def get_severity(confidence: float) -> str:
    """
    Simple confidence-based severity.
    Member 1 may later provide a better function — replace here.
    """
    if confidence < 0.60:
        return "mild"
    elif confidence < 0.80:
        return "moderate"
    else:
        return "severe"


# ─────────────────────────────────────────────
#  HELPER: GRAD-CAM  (connects Member 1's work)
# ─────────────────────────────────────────────
def run_gradcam(image: Image.Image, model):
    """
    ── INTEGRATION POINT ──────────────────────────────────
    When Member 1 gives you gradcam.py, replace dummy with:

        from gradcam import get_heatmap
        heatmap = get_heatmap(image, model)
        return heatmap

    Until then, returns None (heatmap section is hidden).
    ───────────────────────────────────────────────────────
    """
    if os.path.exists("gradcam.py") and model is not None:
        try:
            from gradcam import get_heatmap
            return get_heatmap(image, model)
        except Exception:
            return None
    return None


# ─────────────────────────────────────────────
#  MAIN APP UI
# ─────────────────────────────────────────────
def main():
    # ── SIDEBAR ──────────────────────────
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
        st.markdown("*Supported Conditions:*")
        st.markdown("• Acne\n• Eczema\n• Psoriasis\n• Melanoma\n• Ringworm\n• Healthy Skin")
        st.divider()
        st.warning("⚠️ Not a medical diagnosis tool. Always consult a dermatologist.")
        st.divider()
        st.markdown("*Made by:* Member 2 🎓")
        st.markdown("*Project:* ML Skin Disease Predictor")

    # Header
    st.markdown('<div class="main-title">🩺 Skin Disease Predictor</div>', unsafe_allow_html=True)
    st.markdown('<div class="sub-title">Upload a skin image · Get instant AI analysis · Understand your condition</div>', unsafe_allow_html=True)

    st.divider()

    # Load model (cached)
    model = load_model()
    if model is None:
        st.info("ℹ️ Running in *Demo Mode* — model.h5 not found. Results are placeholder only.")

    # ── Upload Section ──────────────────────────
    st.subheader("📤 Upload Image")
    uploaded_file = st.file_uploader(
        "Choose a clear photo of the affected skin area",
        type=["jpg", "jpeg", "png", "webp"],
        help="Supported formats: JPG, PNG, WEBP"
    )

    if uploaded_file is None:
        st.markdown("#### 👆 Upload an image above to get started")
        st.markdown("""
        *This tool can help detect:*
        - Acne
        - Eczema
        - Psoriasis
        - Melanoma (early indicators)
        - Healthy skin
        - Ringworm            
        
        > ⚠️ This is not a medical diagnosis. Always consult a dermatologist for professional advice.
        """)
        return

    # ── Display uploaded image ──────────────────
    image = Image.open(uploaded_file)
    col1, col2, col3 = st.columns([1, 2, 1])
    with col2:
        st.image(image, caption="Your uploaded image", use_container_width=True)

    st.divider()

    # ── Analyze button ──────────────────────────
    analyze_clicked = st.button("🔍 Analyze Skin", type="primary", use_container_width=True)

    if not analyze_clicked:
        return

    # ── Run prediction ──────────────────────────
    with st.spinner("Analyzing your image..."):
        condition, confidence = run_prediction(image, model)
        severity = get_severity(confidence)
        heatmap = run_gradcam(image, model)

    st.success("✅ Analysis complete!")
    st.divider()

    # ── Results Section ─────────────────────────
    st.subheader("📊 Results")

    # Condition
    st.markdown(f"""
    <div class="result-box">
        <b>Detected Condition</b><br>
        <span style="font-size:1.4rem; font-weight:700; text-transform:capitalize;">{condition}</span>
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

    # ── Grad-CAM Heatmap ────────────────────────
    st.subheader("🔥 AI Attention Heatmap")
    if heatmap is not None:
        col1, col2 = st.columns(2)
        with col1:
            st.image(image, caption="Original", use_container_width=True)
        with col2:
            st.image(heatmap, caption="AI Focus Area", use_container_width=True)
        st.caption("The heatmap shows which areas of the image the AI focused on when making its prediction.")
    else:
        st.info("🔄 Heatmap will be available once Member 1's gradcam.py is integrated.")

    # ── Recommendations ─────────────────────────
    st.subheader("💡 Care Recommendations")

    condition_recs = RECOMMENDATIONS.get(condition, {})
    severity_recs = condition_recs.get(severity, condition_recs.get("mild", []))

    if severity_recs:
        for tip in severity_recs:
            st.markdown(f'<div class="suggestion-card">✅ {tip}</div>', unsafe_allow_html=True)
    else:
        st.write("No specific recommendations available for this condition.")

    st.warning("⚠️ These suggestions are general guidance only and do not replace professional medical advice. Please consult a dermatologist for proper diagnosis and treatment.")

    # ── Summary Table ────────────────────────────
    st.divider()
    st.subheader("📋 Summary")
    col1, col2, col3 = st.columns(3)
    col1.metric("Condition", condition.title())
    col2.metric("Confidence", f"{confidence*100:.1f}%")
    col3.metric("Severity", label)

    # Footer
    st.markdown('<div class="footer">ML Skin Disease Predictor · For educational purposes only · Not a medical device</div>', unsafe_allow_html=True)


# ─────────────────────────────────────────────
if __name__ == "__main__":
    main()