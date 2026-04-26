import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import streamlit as st



def confidence_chart(predictions, top_condition):
    st.markdown('<div style="font-family:Syne,sans-serif;font-size:0.85rem;font-weight:700;color:#b8cce0;margin-bottom:0.8rem;text-transform:uppercase;letter-spacing:0.08em;">Confidence Distribution</div>', unsafe_allow_html=True)
    for condition, conf in sorted(predictions.items(), key=lambda x: x[1], reverse=True):
        pct = conf * 100
        is_top = condition == top_condition
        bar_color = "linear-gradient(90deg,#00d2ff,#0088ff)" if is_top else "rgba(255,255,255,0.08)"
        text_color = "#00d2ff" if is_top else "#4a6a8a"
        label_color = "#c8d8f0" if is_top else "#4a6a8a"
        weight = "700" if is_top else "400"
        st.markdown(f"""
        <div style='margin-bottom:0.7rem;'>
            <div style='display:flex;justify-content:space-between;align-items:center;margin-bottom:0.25rem;'>
                <span style='font-size:0.82rem;color:{label_color};font-weight:{weight};text-transform:capitalize;'>{"▶ " if is_top else ""}{condition}</span>
                <span style='font-size:0.82rem;color:{text_color};font-weight:{weight};'>{pct:.1f}%</span>
            </div>
            <div style='background:rgba(255,255,255,0.04);border-radius:100px;height:9px;overflow:hidden;'>
                <div style='width:{pct}%;height:100%;border-radius:100px;background:{bar_color};'></div>
            </div>
        </div>""", unsafe_allow_html=True)