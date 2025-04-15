import os
import uuid
import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.urls import path
from .serializers import SplitPDFSerializer
from .utils import split_pdf
from rest_framework.test import APITestCase
from django.core.files.uploadedfile import SimpleUploadedFile

logger = logging.getLogger(__name__)

class SplitPDFView(APIView):
    def post(self, request):
        logger.debug(f"Request data: {request.data}")
        logger.debug(f"Request files: {request.FILES}")

        # combinăm datele POST cu fișierele
        data = request.data.copy()
        data['file'] = request.FILES.get('file')

        serializer = SplitPDFSerializer(data=data)
        if serializer.is_valid():
            file = serializer.validated_data['file']
            start = serializer.validated_data['start_page']
            end = serializer.validated_data['end_page']

            output_filename = f"split_{uuid.uuid4().hex}.pdf"
            output_path = os.path.join("media", output_filename)
            os.makedirs("media", exist_ok=True)

            result_path = split_pdf(file, start, end, output_path)

            return Response({
                "message": "PDF split successfully.",
                "file_path": result_path
            }, status=status.HTTP_200_OK)
        
        else:
            print("Serializer errors:", serializer.errors)
            logger.debug(f"Serializer errors: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        
class PDFToolTests(APITestCase):
    def test_split_pdf_success(self):
        pdf_file = SimpleUploadedFile("test.pdf", b"%PDF-1.4\n...", content_type="application/pdf")
        response = self.client.post('/split/', {
            'file': pdf_file,
            'start_page': 1,
            'end_page': 1
        }, format='multipart')

        response_data = response.json()


        self.assertEqual(response.status_code, 200)
        self.assertIn('message', response_data)
        self.assertIn('file_path', response_data)