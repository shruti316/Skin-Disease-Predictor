import streamlit as st
import sys, os
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, current_dir)

st.set_page_config(
    page_title="DermAI — Skin Disease Predictor",
    page_icon="🔬",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Load CSS
css_path = os.path.join(os.path.dirname(__file__), "styles", "main.css")
if os.path.exists(css_path):
    with open(css_path) as f:
        st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)

# Init session
from state.session_manager import init
init()

# Navbar
from components.navbar import render as render_navbar
page = render_navbar()

# Handle CTA from home page
if "_nav" in st.session_state:
    page = st.session_state.pop("_nav")

# Route to pages
if page == "Home":
    from pages.home import show
elif page == "Predict":
    from pages.predict import show
elif page == "History":
    from pages.history import show
elif page == "Diseases":
    from pages.disease_info import show
elif page == "About":
    from pages.about import show
else:
    from pages.home import show

show()