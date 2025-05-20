from custom_auth.models import CustomUser  # Asigură-te că modelul e corect importat
from io import BytesIO
from PyPDF2 import PdfWriter
from django.core.files.uploadedfile import SimpleUploadedFile
from reportlab.pdfgen import canvas



def create_test_user(plan="free", is_active=True):
    return CustomUser.objects.create_user(
        email="test@example.com",
        password="testpassword123",
        plan=plan,
        is_active=is_active
    )

def generate_test_pdf(filename="test.pdf"):
    buffer = BytesIO()
    writer = PdfWriter()
    writer.add_blank_page(width=72, height=72)
    writer.write(buffer)
    buffer.seek(0)
    return SimpleUploadedFile(filename, buffer.read(), content_type="application/pdf")


def generate_valid_pdf(name="test.pdf"):
    buffer = BytesIO()
    p = canvas.Canvas(buffer)
    p.drawString(100, 750, "Hello PDF")  # Text minimal pentru a crea un PDF valid
    p.showPage()
    p.save()
    buffer.seek(0)
    return SimpleUploadedFile(name, buffer.read(), content_type='application/pdf')
