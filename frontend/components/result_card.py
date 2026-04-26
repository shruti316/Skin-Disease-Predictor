import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import streamlit as st



SEVERITY_CONFIG = {
    "mild":     {"label":"Mild",     "color":"#10b981","icon":"🟢","bg":"rgba(16,185,129,0.08)", "border":"rgba(16,185,129,0.2)"},
    "moderate": {"label":"Moderate", "color":"#f59e0b","icon":"🟡","bg":"rgba(245,158,11,0.08)",  "border":"rgba(245,158,11,0.2)"},
    "severe":   {"label":"Severe",   "color":"#ef4444","icon":"🔴","bg":"rgba(239,68,68,0.08)",   "border":"rgba(239,68,68,0.2)"},
}

def section_header(title):
    st.markdown(f"""
    <div style='font-family:Syne,sans-serif; font-size:1.1rem; font-weight:700; color:#fff;
        margin:1.5rem 0 1rem; padding-bottom:0.5rem;
        border-bottom:1px solid rgba(255,255,255,0.06);'>{title}</div>
    """, unsafe_allow_html=True)

def show_results(condition, confidence, severity):
    sev = SEVERITY_CONFIG[severity]
    r1, r2, r3 = st.columns(3)
    with r1:
        st.markdown(f"""
        <div style='background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.08);
            border-radius:18px;padding:1.5rem;height:130px;'>
            <div style='font-size:0.65rem;font-weight:600;letter-spacing:0.15em;
                text-transform:uppercase;color:#2a4a6a;margin-bottom:0.5rem;'>Detected Condition</div>
            <div style='font-family:Syne,sans-serif;font-size:1.7rem;font-weight:800;
                color:#fff;text-transform:capitalize;'>{condition}</div>
            <div style='font-size:0.75rem;color:#2a4a6a;margin-top:0.4rem;'>Primary AI classification</div>
        </div>""", unsafe_allow_html=True)
    with r2:
        st.markdown(f"""
        <div style='background:{sev["bg"]};border:1px solid {sev["border"]};
            border-radius:18px;padding:1.5rem;height:130px;'>
            <div style='font-size:0.65rem;font-weight:600;letter-spacing:0.15em;
                text-transform:uppercase;color:#2a4a6a;margin-bottom:0.5rem;'>Severity Level</div>
            <div style='font-family:Syne,sans-serif;font-size:1.7rem;font-weight:800;
                color:{sev["color"]};'>{sev["icon"]} {sev["label"]}</div>
            <div style='font-size:0.75rem;color:#2a4a6a;margin-top:0.4rem;'>Based on visual analysis</div>
        </div>""", unsafe_allow_html=True)
    with r3:
        st.markdown(f"""
        <div style='background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.08);
            border-radius:18px;padding:1.5rem;height:130px;'>
            <div style='font-size:0.65rem;font-weight:600;letter-spacing:0.15em;
                text-transform:uppercase;color:#2a4a6a;margin-bottom:0.5rem;'>AI Confidence</div>
            <div style='font-family:Syne,sans-serif;font-size:1.7rem;font-weight:800;color:#00d2ff;'>{confidence*100:.1f}%</div>
            <div style='background:rgba(255,255,255,0.04);border-radius:100px;height:5px;overflow:hidden;margin-top:0.6rem;'>
                <div style='width:{confidence*100:.1f}%;height:100%;border-radius:100px;background:linear-gradient(90deg,#00d2ff,#0088ff);'></div>
            </div>
        </div>""", unsafe_allow_html=True)

def show_gradcam(image, heatmap):
    if heatmap is not None:
        h1, h2 = st.columns(2)
        with h1: st.image(image, caption="📸 Original Image", use_container_width=True)
        with h2: st.image(heatmap, caption="🔥 AI Attention Heatmap", use_container_width=True)
        st.markdown('<div style="text-align:center;font-size:0.76rem;color:#2a4a6a;margin-top:0.5rem;">🔴 High attention · 🟡 Medium · 🔵 Low attention</div>', unsafe_allow_html=True)
    else:
        st.markdown("""
        <div style='background:rgba(0,210,255,0.03);border:1px dashed rgba(0,210,255,0.12);
            border-radius:16px;padding:2.5rem;text-align:center;color:#1a3a5a;'>
            <div style='font-size:2rem;margin-bottom:0.6rem;'>🔥</div>
            <div style='font-size:0.88rem;color:#2a4a6a;'>
                Heatmap will appear once Member 1's <b style='color:#3a6a8a;'>gradcam.py</b> is integrated
            </div>
        </div>""", unsafe_allow_html=True)

def show_recommendations(condition, severity, recommendations):
    recs = recommendations.get(condition, {}).get(severity,
           recommendations.get(condition, {}).get("mild", []))
    for i, tip in enumerate(recs, 1):
        st.markdown(f"""
        <div style='background:rgba(0,210,255,0.04);border:1px solid rgba(0,210,255,0.1);
            border-left:3px solid #00d2ff;border-radius:12px;
            padding:0.9rem 1.2rem;margin-bottom:0.6rem;font-size:0.88rem;color:#b8cce0;'>
            <span style='color:#00d2ff;font-weight:800;margin-right:0.7rem;'>{i:02d}</span>{tip}
        </div>""", unsafe_allow_html=True)
    st.markdown("""
    <div style='background:rgba(245,158,11,0.05);border:1px solid rgba(245,158,11,0.18);
        border-radius:12px;padding:0.9rem 1.2rem;font-size:0.8rem;color:#8a6a2a;margin-top:0.8rem;'>
        ⚠️ <strong>Disclaimer:</strong> General guidance only. Not a substitute for professional medical advice.
    </div>""", unsafe_allow_html=True)

def show_summary(condition, severity, confidence, heatmap):
    sev = SEVERITY_CONFIG[severity]
    m1, m2, m3, m4 = st.columns(4)
    m1.metric("Condition", condition.title())
    m2.metric("Severity", sev["label"])
    m3.metric("Confidence", f"{confidence*100:.1f}%")
    m4.metric("Heatmap", "✅ Ready" if heatmap else "⏳ Pending")