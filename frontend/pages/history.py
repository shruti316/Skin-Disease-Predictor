import streamlit as st
from state.session_manager import get_history, clear_history

SEVERITY_CONFIG = {
    "mild":     {"label":"Mild",     "color":"#10b981","icon":"🟢"},
    "moderate": {"label":"Moderate", "color":"#f59e0b","icon":"🟡"},
    "severe":   {"label":"Severe",   "color":"#ef4444","icon":"🔴"},
}
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import streamlit as st


def show():
    from components.result_card import section_header

    st.markdown("""
    <div style='padding:1.5rem 0 0.5rem;'>
        <div style='font-family:Syne,sans-serif;font-size:2rem;font-weight:800;letter-spacing:-0.02em;
            background:linear-gradient(135deg,#fff,#00d2ff);
            -webkit-background-clip:text;-webkit-text-fill-color:transparent;'>📋 Prediction History</div>
        <div style='color:#3a5a7a;font-size:0.88rem;margin-top:0.2rem;'>Your past analyses from this session</div>
    </div>
    """, unsafe_allow_html=True)
    st.markdown("---")

    history = get_history()

    if not history:
        st.markdown("""
        <div style='text-align:center;padding:5rem 1rem;'>
            <div style='font-size:3.5rem;margin-bottom:1rem;'>📭</div>
            <div style='font-family:Syne,sans-serif;font-size:1.1rem;color:#2a4a6a;font-weight:600;margin-bottom:0.5rem;'>No Analyses Yet</div>
            <div style='font-size:0.85rem;color:#1a3050;'>Go to Predict page to analyze your first skin image</div>
        </div>""", unsafe_allow_html=True)
        return

    total = len(history)
    conditions = [h["condition"] for h in history]
    most_common = max(set(conditions), key=conditions.count)
    avg_conf = sum(h["confidence"] for h in history) / total

    s1,s2,s3,s4 = st.columns(4)
    s1.metric("Total Analyses", total)
    s2.metric("Most Common", most_common.title())
    s3.metric("Avg Confidence", f"{avg_conf*100:.1f}%")
    s4.metric("Session", "Active ✅")

    st.markdown("---")

    h_col, btn_col = st.columns([3,1])
    with h_col:
        section_header(f"🗂️ All Results ({total})")
    with btn_col:
        st.markdown("<br>", unsafe_allow_html=True)
        if st.button("🗑️ Clear History", use_container_width=True):
            clear_history()
            st.rerun()

    for i, item in enumerate(history):
        sev = SEVERITY_CONFIG.get(item.get("severity","mild"), SEVERITY_CONFIG["mild"])
        st.markdown(f"""
        <div style='background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);
            border-left:3px solid {sev["color"]};border-radius:14px;
            padding:1.1rem 1.4rem;margin-bottom:0.6rem;'>
            <span style='font-family:Syne,sans-serif;font-weight:800;color:#fff;
                text-transform:capitalize;font-size:1rem;'>#{i+1} {item["condition"]}</span>
            &nbsp;&nbsp;
            <span style='font-size:0.78rem;color:{sev["color"]};'>{sev["icon"]} {sev["label"]}</span>
            &nbsp;
            <span style='font-size:0.78rem;color:#00d2ff;font-weight:600;'>{item["confidence"]*100:.1f}%</span>
            <br>
            <span style='font-size:0.73rem;color:#1a3050;'>🕐 {item["timestamp"]}</span>
        </div>""", unsafe_allow_html=True)

    st.markdown("---")
    section_header("📊 Condition Breakdown")

    counts = {}
    for h in history:
        counts[h["condition"]] = counts.get(h["condition"],0) + 1

    for cond, count in sorted(counts.items(), key=lambda x: x[1], reverse=True):
        pct = count/total*100
        st.markdown(f"""
        <div style='margin-bottom:0.8rem;'>
            <div style='display:flex;justify-content:space-between;margin-bottom:0.25rem;'>
                <span style='font-size:0.85rem;color:#b8cce0;text-transform:capitalize;font-weight:600;'>{cond}</span>
                <span style='font-size:0.85rem;color:#00d2ff;font-weight:700;'>{count} ({pct:.0f}%)</span>
            </div>
            <div style='background:rgba(255,255,255,0.04);border-radius:100px;height:9px;overflow:hidden;'>
                <div style='width:{pct}%;height:100%;border-radius:100px;
                    background:linear-gradient(90deg,#00d2ff,#0088ff);'></div>
            </div>
        </div>""", unsafe_allow_html=True)