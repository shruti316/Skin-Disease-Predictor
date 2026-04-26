import streamlit as st
from datetime import datetime

def init():
    defaults = {
        "history": [],
        "model": None,
        "model_loaded": False,
    }
    for key, val in defaults.items():
        if key not in st.session_state:
            st.session_state[key] = val

def add_to_history(condition, confidence, severity):
    entry = {
        "condition": condition,
        "confidence": confidence,
        "severity": severity,
        "timestamp": datetime.now().strftime("%d %b %Y, %I:%M %p"),
    }
    st.session_state.history.insert(0, entry)
    if len(st.session_state.history) > 20:
        st.session_state.history = st.session_state.history[:20]

def clear_history():
    st.session_state.history = []

def get_history():
    return st.session_state.get("history", [])