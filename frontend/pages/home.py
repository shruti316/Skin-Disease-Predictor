import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import streamlit as st


def show():
    st.markdown("""
    <div style='text-align:center; padding:3rem 1rem 2.5rem;'>
        <div style='display:inline-block; background:rgba(0,210,255,0.08);
            border:1px solid rgba(0,210,255,0.25); color:#00d2ff; font-size:0.7rem;
            font-weight:600; letter-spacing:0.18em; text-transform:uppercase;
            padding:0.4rem 1.4rem; border-radius:100px; margin-bottom:1.8rem;'>
            ✦ AI-Powered Dermatology Assistant
        </div>
        <div style='font-family:Syne,sans-serif; font-size:3.5rem; font-weight:800;
            line-height:1.05; letter-spacing:-0.03em;
            background:linear-gradient(135deg,#ffffff 0%,#a0d4ff 40%,#00d2ff 70%,#0088ff 100%);
            -webkit-background-clip:text; -webkit-text-fill-color:transparent;
            background-clip:text; margin-bottom:1.2rem;'>
            Intelligent Skin<br>Disease Analysis
        </div>
        <div style='font-size:1.05rem; color:#5a7a9a; font-weight:300;
            max-width:560px; margin:0 auto 2.5rem; line-height:1.75;'>
            Upload a photo of affected skin and get instant AI-powered analysis —
            condition detection, severity classification, visual explanation, and care guidance.
        </div>
    </div>
    """, unsafe_allow_html=True)

    # Stats row
    cols = st.columns(4)
    stats = [("6","Conditions"),("3","Severity Levels"),("AI","Grad-CAM"),("Free","Always")]
    for col,(num,label) in zip(cols,stats):
        col.markdown(f"""
        <div style='text-align:center;padding:1.3rem 0.5rem;
            background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);
            border-radius:16px;'>
            <div style='font-family:Syne,sans-serif;font-size:2rem;font-weight:800;
                color:#00d2ff;'>{num}</div>
            <div style='font-size:0.7rem;color:#2a4a6a;text-transform:uppercase;
                letter-spacing:0.12em;margin-top:0.3rem;'>{label}</div>
        </div>""", unsafe_allow_html=True)

    st.markdown("<br>", unsafe_allow_html=True)
    st.markdown("""<div style='height:1px;background:linear-gradient(90deg,transparent,rgba(0,210,255,0.15),transparent);'></div>""", unsafe_allow_html=True)
    st.markdown("<br>", unsafe_allow_html=True)

    # Features
    st.markdown("""
    <div style='font-family:Syne,sans-serif;font-size:1.6rem;font-weight:800;
        color:#fff;text-align:center;margin-bottom:0.4rem;'>What DermAI Can Do</div>
    <div style='font-size:0.88rem;color:#3a5a7a;text-align:center;margin-bottom:1.8rem;'>
        Everything you need for preliminary skin analysis
    </div>
    """, unsafe_allow_html=True)

    features = [
        ("🔍","Disease Detection","#00d2ff","Identifies 6 skin conditions from a single uploaded image using deep learning"),
        ("📊","Severity Classification","#f59e0b","Classifies as Mild, Moderate, or Severe based on visual features"),
        ("🔥","Grad-CAM Heatmap","#ef4444","Highlights the exact regions the AI used to make its prediction"),
        ("💡","Care Recommendations","#10b981","Personalized general care tips based on condition and severity"),
        ("📋","Prediction History","#8b5cf6","Track and compare all your session analyses in one place"),
        ("📚","Disease Information","#f97316","In-depth info on symptoms, prevention, and treatment for each condition"),
    ]
    cols = st.columns(3)
    for i,(icon,title,color,desc) in enumerate(features):
        with cols[i%3]:
            st.markdown(f"""
            <div style='background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);
                border-top:2px solid {color};border-radius:18px;padding:1.6rem;
                margin-bottom:1rem;min-height:155px;box-shadow:0 4px 20px rgba(0,0,0,0.15);'>
                <div style='font-size:1.8rem;margin-bottom:0.7rem;'>{icon}</div>
                <div style='font-family:Syne,sans-serif;font-size:0.95rem;font-weight:700;
                    color:#fff;margin-bottom:0.4rem;'>{title}</div>
                <div style='font-size:0.8rem;color:#3a5a7a;line-height:1.5;'>{desc}</div>
            </div>""", unsafe_allow_html=True)

    st.markdown("<br>", unsafe_allow_html=True)
    st.markdown("""<div style='height:1px;background:linear-gradient(90deg,transparent,rgba(0,210,255,0.15),transparent);'></div>""", unsafe_allow_html=True)
    st.markdown("<br>", unsafe_allow_html=True)

    # How it works
    st.markdown("""
    <div style='font-family:Syne,sans-serif;font-size:1.6rem;font-weight:800;
        color:#fff;text-align:center;margin-bottom:1.8rem;'>How It Works</div>
    """, unsafe_allow_html=True)

    steps = [
        ("01","Upload","Choose a clear photo of affected skin area","#00d2ff"),
        ("02","Analyze","AI model detects and classifies condition","#8b5cf6"),
        ("03","Explain","Grad-CAM shows exactly what AI focused on","#f59e0b"),
        ("04","Guidance","Get personalized care recommendations","#10b981"),
    ]
    for col,(num,title,desc,color) in zip(st.columns(4),steps):
        with col:
            st.markdown(f"""
            <div style='text-align:center;padding:1.5rem 0.5rem;
                background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);
                border-radius:16px;'>
                <div style='font-family:Syne,sans-serif;font-size:2rem;font-weight:800;
                    color:{color};opacity:0.4;margin-bottom:0.5rem;'>{num}</div>
                <div style='font-size:0.9rem;font-weight:700;color:#c8d8f0;margin-bottom:0.4rem;'>{title}</div>
                <div style='font-size:0.75rem;color:#2a4a6a;line-height:1.4;'>{desc}</div>
            </div>""", unsafe_allow_html=True)

    st.markdown("<br><br>", unsafe_allow_html=True)

    # CTA button
    _,c,_ = st.columns([1,1.2,1])
    with c:
        st.markdown('<div style="text-align:center;margin-bottom:0.8rem;font-size:0.82rem;color:#2a4a6a;">Ready to analyze your skin?</div>', unsafe_allow_html=True)
        if st.button("🔍  Start Skin Analysis", type="primary", use_container_width=True):
            st.session_state["_nav"] = "Predict"
            st.rerun()

    st.markdown('<div style="text-align:center;font-size:0.75rem;color:#1a3050;margin-top:0.8rem;">⚠️ For educational purposes only — always consult a qualified dermatologist</div>', unsafe_allow_html=True)