from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, Table, TableStyle, HRFlowable
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from pathlib import Path
from datetime import datetime
import os

def generate_pdf_report(patient_data, prediction_result, image_path, output_path):
    doc = SimpleDocTemplate(
        str(output_path),
        pagesize=A4,
        rightMargin=50,
        leftMargin=50,
        topMargin=50,
        bottomMargin=50
    )
    styles = getSampleStyleSheet()
    story  = []

    title_style = ParagraphStyle(
        "Title",
        parent=styles["Title"],
        fontSize=24,
        textColor=colors.HexColor("#1a1a2e"),
        spaceAfter=5,
        alignment=TA_CENTER
    )
    subtitle_style = ParagraphStyle(
        "Subtitle",
        parent=styles["Normal"],
        fontSize=11,
        textColor=colors.HexColor("#555555"),
        spaceAfter=20,
        alignment=TA_CENTER
    )
    heading_style = ParagraphStyle(
        "Heading",
        parent=styles["Heading2"],
        fontSize=13,
        textColor=colors.HexColor("#4361ee"),
        spaceBefore=15,
        spaceAfter=8
    )
    normal_style = ParagraphStyle(
        "Normal",
        parent=styles["Normal"],
        fontSize=10,
        spaceAfter=5
    )

    story.append(Paragraph("Skin Disease Prediction Report", title_style))
    story.append(Paragraph("AI-Powered Skin Analysis | For Educational Purposes Only", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=2, color=colors.HexColor("#4361ee")))
    story.append(Spacer(1, 15))

    story.append(Paragraph("Patient Information", heading_style))
    patient_table_data = [
        ["Field",     "Details"],
        ["Name",      patient_data.get("name",     "N/A")],
        ["Age",       str(patient_data.get("age",  "N/A"))],
        ["Gender",    patient_data.get("gender",   "N/A")],
        ["Species",   patient_data.get("species",  "Human")],
        ["Duration",  patient_data.get("duration", "N/A")],
        ["Itchy",     "Yes" if patient_data.get("itchy")     else "No"],
        ["Spreading", "Yes" if patient_data.get("spreading") else "No"],
        ["Allergies", patient_data.get("allergies", "None")],
        ["Date",      datetime.now().strftime("%d-%m-%Y %H:%M")]
    ]
    patient_table = Table(patient_table_data, colWidths=[2*inch, 4*inch])
    patient_table.setStyle(TableStyle([
        ("BACKGROUND",     (0, 0), (-1, 0), colors.HexColor("#4361ee")),
        ("TEXTCOLOR",      (0, 0), (-1, 0), colors.white),
        ("FONTNAME",       (0, 0), (-1, 0), "Helvetica-Bold"),
        ("GRID",           (0, 0), (-1, -1), 0.5, colors.HexColor("#e0e0e0")),
        ("FONTSIZE",       (0, 0), (-1, -1), 10),
        ("PADDING",        (0, 0), (-1, -1), 8),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f0f4ff")]),
    ]))
    story.append(patient_table)
    story.append(Spacer(1, 15))

    story.append(Paragraph("Prediction Results", heading_style))
    results_data = [
        ["Metric",           "Result"],
        ["Detected Disease", prediction_result.get("disease",    "N/A")],
        ["Confidence",       f"{prediction_result.get('confidence', 0)}%"],
        ["Severity Level",   prediction_result.get("severity",   "N/A")],
    ]
    results_table = Table(results_data, colWidths=[2*inch, 4*inch])
    results_table.setStyle(TableStyle([
        ("BACKGROUND",     (0, 0), (-1, 0), colors.HexColor("#4361ee")),
        ("TEXTCOLOR",      (0, 0), (-1, 0), colors.white),
        ("FONTNAME",       (0, 0), (-1, 0), "Helvetica-Bold"),
        ("GRID",           (0, 0), (-1, -1), 0.5, colors.HexColor("#e0e0e0")),
        ("FONTSIZE",       (0, 0), (-1, -1), 10),
        ("PADDING",        (0, 0), (-1, -1), 8),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f0f4ff")]),
    ]))
    story.append(results_table)
    story.append(Spacer(1, 15))

    story.append(Paragraph("Top 5 Predictions", heading_style))
    top5_data = [["Disease", "Confidence %"]]
    for disease, prob in prediction_result.get("top5", []):
        top5_data.append([disease.replace("_", " ").title(), f"{prob:.1f}%"])
    top5_table = Table(top5_data, colWidths=[4*inch, 2*inch])
    top5_table.setStyle(TableStyle([
        ("BACKGROUND",     (0, 0), (-1, 0), colors.HexColor("#4361ee")),
        ("TEXTCOLOR",      (0, 0), (-1, 0), colors.white),
        ("FONTNAME",       (0, 0), (-1, 0), "Helvetica-Bold"),
        ("GRID",           (0, 0), (-1, -1), 0.5, colors.HexColor("#e0e0e0")),
        ("FONTSIZE",       (0, 0), (-1, -1), 10),
        ("PADDING",        (0, 0), (-1, -1), 8),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f0f4ff")]),
    ]))
    story.append(top5_table)
    story.append(Spacer(1, 15))

    if os.path.exists(str(image_path)):
        story.append(Paragraph("Analyzed Image", heading_style))
        img = Image(str(image_path), width=2.5*inch, height=2.5*inch)
        story.append(img)
        story.append(Spacer(1, 15))

    story.append(Paragraph("Recommendations", heading_style))
    story.append(Paragraph(
        f"• {prediction_result.get('recommendation', 'Consult a healthcare professional.')}",
        normal_style
    ))
    story.append(Spacer(1, 10))

    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#e0e0e0")))
    story.append(Spacer(1, 10))
    disclaimer_style = ParagraphStyle(
        "Disclaimer",
        parent=styles["Normal"],
        fontSize=8,
        textColor=colors.HexColor("#999999"),
        alignment=TA_CENTER
    )
    story.append(Paragraph(
        "DISCLAIMER: This report is generated by an AI model for educational purposes only. "
        "It is NOT a medical diagnosis. Always consult a qualified doctor or veterinarian.",
        disclaimer_style
    ))
    doc.build(story)
