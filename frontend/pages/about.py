import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import streamlit as st

def show():
    st.markdown("""
    <div style='padding:1.5rem 0 0.5rem;'>
        <div style='font-family:Syne,sans-serif;font-size:2rem;font-weight:800;letter-spacing:-0.02em;
            background:linear-gradient(135deg,#fff,#00d2ff);
            -webkit-background-clip:text;-webkit-text-fill-color:transparent;'>ℹ️ About DermAI</div>
        <div style='color:#3a5a7a;font-size:0.88rem;margin-top:0.2rem;'>Advanced Skin Disease Prediction System</div>
    </div>
    """, unsafe_allow_html=True)
    st.markdown("---")

    st.markdown("""
    <div style='background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:2rem;margin-bottom:1.5rem;'>
        <h3 style='font-family:Syne,sans-serif;color:#fff;'>Project Overview</h3>
        <p style='color:#5a7a9a;line-height:1.75;'>
            DermAI is an intelligent assistant designed to help identify potential skin conditions from uploaded images. 
            Leveraging deep learning, it analyzes skin lesions and provides information to help users understand their skin better.
        </p>
        <p style='color:#ef4444;font-size:0.9rem;font-weight:bold;margin-top:1rem;'>
            ⚠️ Disclaimer: DermAI is not a substitute for professional medical advice, diagnosis, or treatment. 
            Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
        </p>
    </div>
    """, unsafe_allow_html=True)