import io
import os
from django.test import TestCase
from rest_framework.test import APIClient
from django.core.files.uploadedfile import SimpleUploadedFile
from PyPDF2 import PdfReader, PdfWriter
from altech_pdf.test_utils import create_test_user
from rest_framework import serializers
from rest_framework.test import APITestCase
from altech_pdf.test_utils import generate_test_pdf
from io import BytesIO
from django.core.files.uploadedfile import SimpleUploadedFile
from reportlab.pdfgen import canvas




class BasePDFTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        # Generează PDF de test
        pdf_writer = PdfWriter()
        pdf_writer.add_blank_page(width=72, height=72)
        stream = io.BytesIO()
        pdf_writer.write(stream)
        stream.seek(0)
        self.test_pdf = SimpleUploadedFile("test.pdf", stream.read(), content_type="application/pdf")


# SPLIT --------------------------
class SplitPDFTests(APITestCase):
    def test_split_pdf_invalid_data(self):
        # Creăm utilizator cu plan free
        user = create_test_user(plan="free")
        self.client.force_login(user)

        # Trimitem request fără date valide
        response = self.client.post(
            "/split/",
            data={}, 
            format="multipart"
        )

        # Debug și verificare
        print("Response JSON:", response.json())
        self.assertEqual(response.status_code, 400)

    class SplitPDFTests(APITestCase):
        def test_split_pdf_success(self):
            user = create_test_user(email="testuser@example.com", password="testpass")
            self.client.force_login(user)

            with open("altech_pdf/test_files/sample.pdf", "rb") as test_pdf:
                response = self.client.post(
                    "/split/",
                    {
                        "file": test_pdf,
                        "start_page": 1,
                        "end_page": 1
                    },
                    format="multipart"
                )

            self.assertEqual(response.status_code, 200)
            self.assertIn("file_path", response.json())

# MERGE --------------------------
class MergePDFTests(BasePDFTestCase):
    def test_merge_pdf_invalid_data(self):
        user = create_test_user()
        self.client.force_login(user)

        file1 = generate_test_pdf("file1.pdf")  # doar un fișier (invalid pentru merge)
        
        response = self.client.post("/merge/", {
            'files': [file1],
        }, format="multipart")

        print("Response JSON:", response.json())
        self.assertEqual(response.status_code, 400)

 
    def generate_valid_pdf(name="test.pdf"):
        buffer = BytesIO()
        p = canvas.Canvas(buffer)
        p.drawString(100, 750, "Hello PDF")  # Text minimal pentru a crea un PDF valid
        p.showPage()
        p.save()
        buffer.seek(0)
        return SimpleUploadedFile(name, buffer.read(), content_type='application/pdf')


    def test_merge_pdf_unauthorized(self):
        client = APIClient()
        response = client.post("/merge/", {}, format="multipart")
        self.assertIn(response.status_code, [401, 403])


# DELETE --------------------------
    def test_delete_pdf_invalid_data(self):
        user = create_test_user(plan="free", is_active=True)  # dacă nu ai deja self.user
        self.client.force_login(user)
        
        response = self.client.post("/delete/", {
            'file': self.test_pdf,
            'pages_to_delete': []
        }, format="multipart")

        self.assertEqual(response.status_code, 400)

    def test_delete_pdf_success(self):
        user = create_test_user()
        self.client.force_login(user)
        response = self.client.post("/delete/", {
            'file': self.test_pdf,
            'pages_to_delete': [1]
        }, format="multipart")
        print("Response JSON:", response.json())
        self.assertEqual(response.status_code, 200)
        self.assertIn("file_path", response.json())

    def test_delete_pdf_unauthorized(self):
        client = APIClient()
        response = client.post("/delete/", {}, format="multipart")
        self.assertIn(response.status_code, [401, 403])

    # REORDER --------------------------
class ReorderPDFTests(BasePDFTestCase):
    def test_reorder_pdf_invalid_data(self):
        user = create_test_user()
        self.client.force_login(user)
        response = self.client.post("/reorder/", {
            'file': self.test_pdf,
            'new_order': []
        }, format="multipart")
        print("Response JSON:", response.json())
        self.assertEqual(response.status_code, 400)

    def test_reorder_pdf_success(self):
        user = create_test_user()
        self.client.force_login(user)
        response = self.client.post("/reorder/", {
            'file': self.test_pdf,
            'new_order': [1]
        }, format="multipart")
        print("Response JSON:", response.json())
        self.assertEqual(response.status_code, 200)
        self.assertIn("file_path", response.json())

    def test_reorder_pdf_unauthorized(self):
        client = APIClient()
        response = client.post("/reorder/", {}, format="multipart")
        self.assertIn(response.status_code, [401, 403])