import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import streamlit as st


import time

def run_with_progress(image, model, predict_fn, gradcam_fn, severity_fn):
    bar = st.progress(0)
    status = st.empty()

    def upd(pct, msg):
        bar.progress(pct, text=msg)
        status.markdown(f'<div style="font-size:0.82rem;color:#4a6a8a;text-align:center;">{msg}</div>', unsafe_allow_html=True)
        time.sleep(0.35)

    upd(10, "🔍 Preprocessing image...")
    upd(30, "🧠 Running AI model...")
    condition, confidence, all_preds = predict_fn(image, model)
    upd(55, "📊 Classifying severity...")
    severity = severity_fn(confidence)
    upd(75, "🔥 Generating Grad-CAM...")
    heatmap = gradcam_fn(image, model)
    upd(90, "💡 Preparing recommendations...")
    upd(100, "✅ Analysis complete!")
    time.sleep(0.4)
    bar.empty()
    status.empty()

    return condition, confidence, all_preds, severity, heatmap