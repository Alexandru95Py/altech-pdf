from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
import tempfile


def generate_cv_pdf(data, photo_path=None):
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".pdf")
    c = canvas.Canvas(temp_file.name, pagesize=A4)

    width, height = A4
    y = height - 50

    # Nume
    c.setFont("Helvetica-Bold", 16)
    c.drawString(50, y, data.get("full_name", "Nume Necunoscut"))
    y -= 30

    # Poza (dacă există)
    if photo_path:
        try:
            c.drawImage(photo_path, width - 150, height - 150, width=80, height=80)
        except Exception as e:
            print("Eroare la adăugarea pozei:", e)

    c.setFont("Helvetica", 12)

    def draw_section(title, content):
        nonlocal y
        c.setFont("Helvetica-Bold", 12)
        c.drawString(50, y, title)
        y -= 18
        c.setFont("Helvetica", 11)
        for line in content.split('\n'):
            c.drawString(60, y, line)
            y -= 14
        y -= 10

    draw_section("Despre mine", data.get("about", ""))
    draw_section("Educație", data.get("education", ""))
    draw_section("Experiență", data.get("experience", ""))
    draw_section("Competențe", data.get("skills", ""))
    draw_section("Limbi străine", data.get("languages", ""))
    draw_section("Link-uri utile", data.get("links", ""))

    c.showPage()
    c.save()

    return temp_file.name