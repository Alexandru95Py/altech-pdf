from django.test import TestCase
from rest_framework.test import APIClient
from django.core.files.uploadedfile import SimpleUploadedFile
from PyPDF2 import PdfReader, PdfWriter
import io


class PDFToolTests(TestCase):
   
    def setUp(self):
        pdf_writer = PdfWriter()
        pdf_writer.add_blank_page(width=72, height=72)

        pdf_stream = io.BytesIO()
        pdf_writer.write(pdf_stream)
        pdf_stream.seek(0)

        self.test_pdf = SimpleUploadedFile("test.pdf", pdf_stream.read(), content_type="application/pdf")



    def test_split_pdf_invalid_data(self):
        response = self.client.post('/split/', {})
        print("status code:", response.status_code)
        print("Response JSON:", response.json())
        self.assertEqual(response.status_code, 400)

    def test_split_pdf_success(self):
        pdf_writer = PdfWriter()
        pdf_writer.add_blank_page(width=72, height=72)
        pdf_stream = io.BytesIO()
        pdf_writer.write(pdf_stream)
        pdf_stream.seek(0)

        test_pdf = SimpleUploadedFile("test.pdf", pdf_stream.read(), content_type="application/pdf")

        response = self.client.post('/split/', {
            'file': test_pdf,
            'start_page': 1,
            'end_page': 1
        }, format='multipart')

        print("status code:", response.status_code)
        print("Response JSON:", response.json())

        self.assertEqual(response.status_code, 200)
        self.assertIn('file_path', response.json())


    def test_merge_pdf_invalid_data(self):
        response = self.client.post('/merge/', {
            'files': [self.test_pdf, self.test_pdf]
        }, format='multipart')
        print("status code:", response.status_code)
        print("Response JSON:", response.json())
        self.assertEqual(response.status_code, 400)

    def test_merge_pdf_success(self):
        pdf_writer1 = PdfWriter()
        pdf_writer1.add_blank_page(width=72, height=72)
        stream1 = io.BytesIO()
        pdf_writer1.write(stream1)
        stream1.seek(0)

        pdf_writer2 = PdfWriter()
        pdf_writer2.add_blank_page(width=72, height=72)
        stream2 = io.BytesIO()
        pdf_writer2.write(stream2)
        stream2.seek(0)

        file1 = SimpleUploadedFile("test1.pdf", stream1.read(), content_type="application/pdf")
        file2 = SimpleUploadedFile("test2.pdf", stream2.read(), content_type="application/pdf")

        response = self.client.post('/merge/', {
            'files': [file1, file2]
            }, format='multipart')

        print("status code:", response.status_code)
        print("Response JSON:", response.json())

        self.assertEqual(response.status_code, 200)
        self.assertIn('file_path', response.json())


    def test_delete_pdf_invalid_data(self):
        response = self.client.post('/delete/', {'file': self.test_pdf, 'pages_to_delete': []})
        print("status code:", response.status_code)
        print("Response JSON:", response.json())
        self.assertEqual(response.status_code, 400)

    def test_delete_pdf_success(self):
        response = self.client.post('/delete/', {
            'file': self.test_pdf,
            'pages_to_delete': [1]
        })
        print("status code:", response.status_code)
        print("Response JSON:", response.json())
        self.assertEqual(response.status_code, 200)
        self.assertIn('file_path', response.json())