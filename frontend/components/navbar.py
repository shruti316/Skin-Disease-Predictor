import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import streamlit as st



def render(selected_page="Home"):
    with st.sidebar:
        st.markdown("""
        <div style='text-align:center; padding:1.8rem 0 1rem;'>
            <div style='font-size:3rem; margin-bottom:0.6rem;'>🔬</div>
            <div style='font-family:Syne,sans-serif; font-size:1.5rem; font-weight:800;
                background:linear-gradient(135deg,#ffffff,#00d2ff);
                -webkit-background-clip:text; -webkit-text-fill-color:transparent;'>DermAI</div>
            <div style='font-size:0.65rem; color:#2a4a6a; letter-spacing:0.18em;
                text-transform:uppercase; margin-top:0.2rem;'>Skin Analysis System</div>
        </div>
        <div style='height:1px; background:linear-gradient(90deg,transparent,rgba(0,210,255,0.2),transparent); margin-bottom:1rem;'></div>
        """, unsafe_allow_html=True)

        page = st.radio(
            "nav",
            ["🏠  Home", "🔍  Predict", "📋  History", "📚  Diseases", "ℹ️  About"],
            label_visibility="collapsed"
        )

        st.markdown("<div style='height:1px; background:linear-gradient(90deg,transparent,rgba(0,210,255,0.2),transparent); margin:1rem 0;'></div>", unsafe_allow_html=True)

        history_count = len(st.session_state.get("history", []))
        st.markdown(f"""
        <div style='background:rgba(0,210,255,0.04); border:1px solid rgba(0,210,255,0.1);
            border-radius:12px; padding:1rem; margin-bottom:1rem;'>
            <div style='font-size:0.65rem; color:#2a4a6a; text-transform:uppercase;
                letter-spacing:0.1em; margin-bottom:0.6rem;'>Session Stats</div>
            <div style='display:flex; justify-content:space-between;'>
                <div style='text-align:center;'>
                    <div style='font-family:Syne,sans-serif; font-size:1.2rem; font-weight:800; color:#00d2ff;'>{history_count}</div>
                    <div style='font-size:0.65rem; color:#2a4a6a;'>Analyses</div>
                </div>
                <div style='text-align:center;'>
                    <div style='font-family:Syne,sans-serif; font-size:1.2rem; font-weight:800; color:#10b981;'>6</div>
                    <div style='font-size:0.65rem; color:#2a4a6a;'>Conditions</div>
                </div>
                <div style='text-align:center;'>
                    <div style='font-family:Syne,sans-serif; font-size:1.2rem; font-weight:800; color:#f59e0b;'>3</div>
                    <div style='font-size:0.65rem; color:#2a4a6a;'>Severities</div>
                </div>
            </div>
        </div>
        <div style='font-size:0.72rem; color:#1a3a5a; line-height:1.6;'>
            ⚠️ <span style='color:#6b5a2a;'>Disclaimer</span><br>
            For educational use only. Always consult a qualified dermatologist.
        </div>
        """, unsafe_allow_html=True)

    return page.split("  ")[-1]