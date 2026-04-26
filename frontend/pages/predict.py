import sys, os, time
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import streamlit as st
import numpy as np

CLASS_NAMES = ["acne","eczema","psoriasis","melanoma","ringworm","healthy"]

RECOMMENDATIONS = {
    "acne":{
        "mild":["Cleanse face twice daily with gentle face wash","Avoid touching your face","Use non-comedogenic moisturizer","Change pillowcases every 2-3 days","Stay hydrated — 8 glasses of water daily"],
        "moderate":["Use salicylic acid or benzoyl peroxide products","Avoid oily and high-glycemic foods","Do not pop pimples — causes permanent scarring","See dermatologist if no improvement in 4 weeks","Remove makeup before sleeping every night"],
        "severe":["Consult a dermatologist immediately","Prescription antibiotics or retinoids may be needed","Avoid heavy makeup on affected areas","Track food and stress triggers","Do not self-medicate with strong products"],
    },
    "eczema":{
        "mild":["Moisturize affected area at least twice daily","Use fragrance-free soap and skincare","Wear loose breathable cotton clothing","Avoid hot showers — use lukewarm water","Apply moisturizer immediately after bathing"],
        "moderate":["Apply prescribed topical corticosteroids","Identify and avoid personal triggers","Keep nails short to avoid scratching damage","Use a humidifier in dry environments","Try wet wrap therapy for flare-ups"],
        "severe":["Seek dermatological consultation urgently","Do not self-medicate with strong steroids","Consider allergy testing for root triggers","Keep a detailed symptom diary","Ask about immunosuppressant treatments"],
    },
    "psoriasis":{
        "mild":["Keep skin moisturized with thick creams","Short sunlight exposure 10-15 mins may help","Avoid skin injuries — can trigger new patches","Reduce stress through yoga or meditation","Use gentle fragrance-free products only"],
        "moderate":["Use medicated shampoos if scalp affected","Avoid alcohol and smoking — worsens condition","Consult dermatologist for topical treatments","Eat anti-inflammatory foods: fish greens nuts","Track and report flare-up patterns"],
        "severe":["Biological therapy may be needed — see specialist","Do not delay medical consultation","Regular dermatologist follow-ups essential","Join a psoriasis support group","Avoid NSAIDs unless prescribed"],
    },
    "melanoma":{
        "mild":["Monitor spot monthly with dated photos","Book a dermatologist check-up soon","Apply SPF 50+ sunscreen daily","Avoid direct sun on affected spot","Use ABCDE rule to monitor changes"],
        "moderate":["Book urgent dermatologist appointment","Do not attempt home treatment","Cover area when going outdoors","Document any changes in size or color","Report itching bleeding or crusting"],
        "severe":["Seek immediate medical attention — critical","Biopsy will be required for diagnosis","Avoid all sun exposure on affected area","Bring photo history to your doctor","Early detection is life-saving — act now"],
    },
    "ringworm":{
        "mild":["Apply antifungal cream clotrimazole twice daily","Keep area clean dry and aired out","Never share towels or personal items","Wash hands after touching affected area","Wear loose breathable clothing"],
        "moderate":["Complete full 2-4 week antifungal treatment","Wash clothing and bedding in hot water","Avoid tight clothing over the area","See doctor if no improvement in 2 weeks","Check pets and family members for infection"],
        "severe":["Oral antifungal medication required — see doctor","Isolate personal items to prevent spreading","Treat all household contacts and pets","Do not use topical steroids — worsens fungal infection","Follow up until infection is completely clear"],
    },
    "healthy":{
        "mild":["Your skin looks healthy — keep it up! 🎉","Use SPF 30+ sunscreen every day","Stay hydrated and eat balanced diet","Perform monthly self skin checks","Annual dermatologist visit recommended"],
    },
}

SEVERITY_CONFIG = {
    "mild":     {"label":"Mild",     "color":"#10b981","icon":"🟢","bg":"rgba(16,185,129,0.08)", "border":"rgba(16,185,129,0.2)"},
    "moderate": {"label":"Moderate", "color":"#f59e0b","icon":"🟡","bg":"rgba(245,158,11,0.08)",  "border":"rgba(245,158,11,0.2)"},
    "severe":   {"label":"Severe",   "color":"#ef4444","icon":"🔴","bg":"rgba(239,68,68,0.08)",   "border":"rgba(239,68,68,0.2)"},
}

def load_model():
    if os.path.exists("model.h5"):
        try:
            from tensorflow.keras.models import load_model as km
            return km("model.h5")
        except: pass
    return None

def run_predict(image, model):
    if model is not None:
        img = image.convert("RGB").resize((224,224))
        arr = np.expand_dims(np.array(img)/255.0, axis=0)
        preds = model.predict(arr)[0]
        idx = np.argmax(preds)
        all_p = {CLASS_NAMES[i]: float(preds[i]) for i in range(len(CLASS_NAMES))}
        return CLASS_NAMES[idx], float(preds[idx]), all_p
    demo = {"acne":0.78,"eczema":0.10,"psoriasis":0.05,"melanoma":0.03,"ringworm":0.02,"healthy":0.02}
    return "acne", 0.78, demo

def run_gradcam(image, model):
    if os.path.exists("gradcam.py") and model:
        try:
            from gradcam import get_heatmap
            return get_heatmap(image, model)
        except: pass
    return None

def get_severity(conf):
    if conf < 0.60: return "mild"
    elif conf < 0.80: return "moderate"
    return "severe"

def show():
    from components.uploader import render as render_uploader
    from components.result_card import (section_header, show_results,
                                        show_gradcam, show_recommendations, show_summary)
    from components.chart import confidence_chart
    from state.session_manager import add_to_history

    st.markdown("""
    <div style='padding:1.5rem 0 0.5rem;'>
        <div style='font-family:Syne,sans-serif;font-size:2rem;font-weight:800;letter-spacing:-0.02em;
            background:linear-gradient(135deg,#fff,#00d2ff);
            -webkit-background-clip:text;-webkit-text-fill-color:transparent;'>🔍 Skin Analysis</div>
        <div style='color:#3a5a7a;font-size:0.88rem;margin-top:0.2rem;'>
            Upload a skin image for instant AI-powered analysis
        </div>
    </div>
    """, unsafe_allow_html=True)

    if not st.session_state.get("model_loaded"):
        with st.spinner("Loading AI model..."):
            st.session_state.model = load_model()
            st.session_state.model_loaded = True
    model = st.session_state.get("model")

    if model is None:
        st.info("🔄 **Demo Mode** — model.h5 not connected. Showing placeholder results.")

    st.markdown("---")

    col1, col2 = st.columns([1.3,1], gap="large")

    with col1:
        image, uploaded, is_valid = render_uploader()

    with col2:
        st.markdown('<div style="font-family:Syne,sans-serif;font-size:1rem;font-weight:700;color:#fff;margin-bottom:0.8rem;">📋 Guidelines</div>', unsafe_allow_html=True)
        for icon,tip,color in [("✅","Good natural lighting","#10b981"),("✅","Camera steady and close","#10b981"),("✅","Affected area centered","#10b981"),("✅","JPG / PNG / WEBP","#10b981"),("❌","No blurry images","#ef4444"),("❌","No X-rays or MRIs","#ef4444")]:
            st.markdown(f'<div style="padding:0.5rem 0;border-bottom:1px solid rgba(255,255,255,0.04);font-size:0.83rem;color:#b8cce0;"><span style="color:{color};margin-right:0.5rem;">{icon}</span>{tip}</div>', unsafe_allow_html=True)

        st.markdown("<br>", unsafe_allow_html=True)
        st.markdown('<div style="font-family:Syne,sans-serif;font-size:0.9rem;font-weight:700;color:#fff;margin-bottom:0.5rem;">🩺 Detectable Conditions</div>', unsafe_allow_html=True)
        for c,color in [("Acne","#ef4444"),("Eczema","#f59e0b"),("Psoriasis","#f97316"),("Melanoma","#6b7280"),("Ringworm","#92400e"),("Healthy","#10b981")]:
            st.markdown(f'<div style="font-size:0.82rem;color:#3a5a7a;padding:0.25rem 0;">• <span style="color:{color};">■</span> {c}</div>', unsafe_allow_html=True)

    if not is_valid or image is None:
        return

    st.markdown("<br>", unsafe_allow_html=True)
    _,btn,_ = st.columns([1,1,1])
    with btn:
        analyze = st.button("🔍  Analyze Skin Now", type="primary", use_container_width=True)

    if not analyze:
        return

    st.markdown("---")

    # Progress
    bar = st.progress(0)
    status = st.empty()
    def upd(pct, msg):
        bar.progress(pct, text=msg)
        status.markdown(f'<div style="font-size:0.82rem;color:#4a6a8a;text-align:center;">{msg}</div>', unsafe_allow_html=True)
        time.sleep(0.35)

    upd(10,"🔍 Preprocessing image...")
    upd(30,"🧠 Running AI model...")
    condition, confidence, all_preds = run_predict(image, model)
    upd(55,"📊 Classifying severity...")
    severity = get_severity(confidence)
    upd(75,"🔥 Generating Grad-CAM...")
    heatmap = run_gradcam(image, model)
    
    upd(100, "✅ Analysis Complete")
    time.sleep(0.5)
    bar.empty()
    status.empty()

    add_to_history({
        "condition": condition,
        "confidence": confidence,
        "severity": severity,
        "date": time.strftime("%Y-%m-%d %H:%M:%S")
    })

    section_header("Analysis Results")
    show_results(condition, confidence, severity)

    st.markdown("<br>", unsafe_allow_html=True)
    hcol, ccol = st.columns([1.2, 1])
    with hcol:
        section_header("AI Attention Map")
        show_gradcam(image, heatmap)
    with ccol:
        section_header("Confidence Distribution")
        confidence_chart(all_preds)

    st.markdown("<br>", unsafe_allow_html=True)
    section_header("Recommended Actions")
    show_recommendations(condition, severity, RECOMMENDATIONS)