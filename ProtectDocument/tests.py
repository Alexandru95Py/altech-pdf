from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.core.files.uploadedfile import SimpleUploadedFile
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token

from PyPDF2 import PdfWriter
import io

from file_manager.models import File

User = get_user_model()

class SomeTestClass(APITestCase):  # Ex: AuthTests, AnalyticsTests, MyFilesTests etc.
    def setUp(self):
        self.user = User.objects.create_user(email='test@example.com', password='securepass123')
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        
        # Creăm un fișier PDF valid în memorie
        pdf_buffer = io.BytesIO()
        writer = PdfWriter()
        writer.add_blank_page(width=72, height=72)
        writer.write(pdf_buffer)
        pdf_buffer.seek(0)

        self.uploaded_file = SimpleUploadedFile(
            "test.pdf", pdf_buffer.read(), content_type="application/pdf"
        )

        self.file = File.objects.create(
            user=self.user,
            file=self.uploaded_file,
            name='test.pdf',
            size=self.uploaded_file.size
        )

    def test_protect_from_myfiles_valid(self):
        url = reverse('free:protect_from_myfiles')
        data = {
            'file_id': self.file.id,
            'password': '1234'
        }
        response = self.client.post(url, data)
        print("DEBUG RESPONSE (myfiles):", response.status_code, response.get('Content-Type'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.get('Content-Type'), 'application/pdf')

    def test_protect_from_myfiles_missing_fields(self):
        url = reverse('free:protect_from_myfiles')
        data = {
            'file_id': '',
            'password': ''
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_protect_from_upload_valid(self):
        url = reverse('free:protect_from_upload')

        # Folosim același fișier PDF valid ca în setUp()
        pdf_buffer = io.BytesIO()
        writer = PdfWriter()
        writer.add_blank_page(width=72, height=72)
        writer.write(pdf_buffer)
        pdf_buffer.seek(0)

        file = SimpleUploadedFile("upload.pdf", pdf_buffer.read(), content_type="application/pdf")

        data = {
            'file': file,
            'password': 'abcd'
        }
        response = self.client.post(url, data, format='multipart')
        print("DEBUG RESPONSE (upload):", response.status_code, response.get('Content-Type'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.get('Content-Type'), 'application/pdf')

    def test_protect_from_upload_missing_password(self):
        url = reverse('free:protect_from_upload')
        file = SimpleUploadedFile("upload.pdf", b"%PDF-1.4\n%EOF", content_type="application/pdf")
        data = {
            'file': file,
            'password': ''
        }
        response = self.client.post(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)