import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import streamlit as st


DISEASES = {
    "acne":{"name":"Acne","icon":"🔴","color":"#ef4444","desc":"Acne is a chronic inflammatory skin condition that occurs when hair follicles become clogged with oil and dead skin cells. Commonly appears on the face, chest, and back.","symptoms":["Whiteheads and blackheads","Papules (small red bumps)","Pimples with pus at tips","Nodules under the skin","Painful cystic lesions"],"prevention":["Cleanse face twice daily","Avoid touching your face","Use non-comedogenic products","Change pillowcases frequently","Stay hydrated"],"care":["Use salicylic acid or benzoyl peroxide","Do not pop or squeeze pimples","Apply non-comedogenic moisturizer","Consult dermatologist for severe cases","Prescription retinoids may be needed"]},
    "eczema":{"name":"Eczema","icon":"🟡","color":"#f59e0b","desc":"Eczema (atopic dermatitis) is a chronic inflammatory condition causing dry, itchy, and inflamed skin. Often occurs alongside asthma or hay fever and tends to flare periodically.","symptoms":["Dry sensitive skin","Intense itching especially at night","Red to brownish-gray patches","Small raised bumps that may weep","Thickened cracked or scaly skin"],"prevention":["Moisturize skin at least twice daily","Use mild fragrance-free soaps","Wear soft breathable clothing","Avoid known triggers","Use a humidifier indoors"],"care":["Apply prescribed topical corticosteroids","Take lukewarm baths not hot","Pat skin dry gently after bathing","Apply moisturizer immediately after bath","Avoid scratching — keep nails short"]},
    "psoriasis":{"name":"Psoriasis","icon":"🟠","color":"#f97316","desc":"Psoriasis is an autoimmune condition causing rapid skin cell buildup resulting in scales and red patches. A long-term condition that tends to flare periodically and can affect joints.","symptoms":["Red patches covered with thick scales","Dry cracked skin that may bleed","Itching burning or soreness","Thickened or pitted nails","Swollen and stiff joints"],"prevention":["Maintain a healthy lifestyle","Avoid triggers: stress smoking alcohol","Protect skin from injuries","Gentle sunlight exposure may help","Stay on prescribed treatment plan"],"care":["Use prescribed topical treatments","Keep skin moisturized consistently","Consider phototherapy light therapy","Systemic or biologic treatments for severe cases","Regular dermatologist follow-ups"]},
    "melanoma":{"name":"Melanoma","icon":"⚫","color":"#6b7280","desc":"Melanoma is the most serious type of skin cancer developing in melanocyte cells. Early detection is critical — when caught early it is highly treatable. Use the ABCDE rule to monitor moles.","symptoms":["A mole that changes in size or color","Asymmetric mole or spot","Irregular ragged or blurred borders","Multiple colors within a single spot","Itching bleeding or crusting"],"prevention":["Use SPF 50+ sunscreen daily","Avoid tanning beds completely","Wear protective clothing in sun","Seek shade during peak hours","Monthly self skin checks"],"care":["Seek immediate medical attention","Biopsy required for proper diagnosis","Surgery to remove the melanoma","Immunotherapy or targeted therapy","Annual professional skin checks"]},
    "ringworm":{"name":"Ringworm","icon":"🟤","color":"#92400e","desc":"Ringworm (tinea corporis) is a common fungal infection. Despite the name it has nothing to do with worms. It causes a ring-shaped rash and is highly contagious through direct contact.","symptoms":["Ring-shaped red rash on skin","Itchy scaly or inflamed skin","Clearer skin inside the ring","Slowly expanding ring over time","Blisters or pustules around edges"],"prevention":["Keep skin clean and dry","Do not share personal items","Wear breathable loose clothing","Wash hands frequently","Avoid contact with infected persons"],"care":["Apply antifungal cream twice daily","Continue treatment for full 2-4 weeks","Wash clothing and bedding in hot water","See doctor if no improvement in 2 weeks","Oral antifungals for severe infections"]},
    "healthy":{"name":"Healthy Skin","icon":"🟢","color":"#10b981","desc":"Healthy skin appears smooth evenly toned and well-hydrated with no signs of irritation or disease. Consistent care and sun protection are key to maintaining healthy skin long-term.","symptoms":["Even and consistent skin tone","Smooth texture with no rough patches","Well-hydrated plump appearance","No rashes lesions or discoloration","No itching or unusual sensations"],"prevention":["Cleanse daily with gentle products","Apply SPF 30+ every single day","Stay well hydrated","Eat a balanced colorful diet","Get enough sleep and manage stress"],"care":["Moisturize daily with quality products","Use antioxidant-rich serums","Perform monthly self skin checks","Visit a dermatologist annually","Always remove makeup before bed"]},
}

def show():
    from components.result_card import section_header

    st.markdown("""
    <div style='padding:1.5rem 0 0.5rem;'>
        <div style='font-family:Syne,sans-serif;font-size:2rem;font-weight:800;letter-spacing:-0.02em;
            background:linear-gradient(135deg,#fff,#00d2ff);
            -webkit-background-clip:text;-webkit-text-fill-color:transparent;'>📚 Disease Information</div>
        <div style='color:#3a5a7a;font-size:0.88rem;margin-top:0.2rem;'>Learn about the skin conditions DermAI can detect</div>
    </div>
    """, unsafe_allow_html=True)
    st.markdown("---")

    selected = st.selectbox(
        "Select condition:",
        options=list(DISEASES.keys()),
        format_func=lambda x: f"{DISEASES[x]['icon']}  {DISEASES[x]['name']}",
        label_visibility="collapsed"
    )
    disease = DISEASES[selected]
    st.markdown("---")

    st.markdown(f"""
    <div style='background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.08);
        border-top:3px solid {disease["color"]};border-radius:20px;padding:2rem;margin-bottom:1.5rem;'>
        <div style='font-size:2.5rem;margin-bottom:0.8rem;'>{disease["icon"]}</div>
        <div style='font-family:Syne,sans-serif;font-size:1.7rem;font-weight:800;color:#fff;margin-bottom:0.8rem;'>{disease["name"]}</div>
        <div style='font-size:0.95rem;color:#5a7a9a;line-height:1.75;max-width:750px;'>{disease["desc"]}</div>
    </div>
    """, unsafe_allow_html=True)

    col1,col2,col3 = st.columns(3)

    def info_list(col, title, icon, items, color, bg, border):
        with col:
            items_html = "".join([f"<div style='padding:0.55rem 0;border-bottom:1px solid rgba(255,255,255,0.04);font-size:0.83rem;color:#b8cce0;'><span style='color:{color};margin-right:0.5rem;font-size:0.7rem;'>▶</span>{item}</div>" for item in items])
            st.markdown(f"""
            <div style='background:{bg};border:1px solid {border};border-radius:16px;padding:1.4rem;height:100%;'>
                <div style='font-family:Syne,sans-serif;font-size:1.1rem;font-weight:700;color:{color};margin-bottom:1rem;display:flex;align-items:center;gap:0.5rem;'>
                    <span>{icon}</span> {title}
                </div>
                {items_html}
            </div>
            """, unsafe_allow_html=True)

    info_list(col1, "Symptoms", "🔍", disease["symptoms"], "#ef4444", "rgba(239,68,68,0.03)", "rgba(239,68,68,0.1)")
    info_list(col2, "Prevention", "🛡️", disease["prevention"], "#3b82f6", "rgba(59,130,246,0.03)", "rgba(59,130,246,0.1)")
    info_list(col3, "Care", "🩹", disease["care"], "#10b981", "rgba(16,185,129,0.03)", "rgba(16,185,129,0.1)")