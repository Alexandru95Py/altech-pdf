import os
import uuid
import logging

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponseForbidden
from django.utils.decorators import method_decorator

from .serializers import ReorderPDFSerializer
from .utils import reorder_pdf
from file_manager.basic_plan.views import (
    FileUploadView, FileListView, FileDeleteView, FileDownloadView
)
from altech_pdf.basic_plan.merge.views import MergePDFView
from altech_pdf.decorators import free_or_pro_required  # import corect, doar unul global
from altech_pdf.basic_plan.split.views import SplitPDFView

logger = logging.getLogger(__name__)


# Decorator aplicat corect pe dispatch
@method_decorator(free_or_pro_required, name='dispatch')
class ReorderPDFView(APIView):
    def post(self, request):
        serializer = ReorderPDFSerializer(data=request.data)
        if serializer.is_valid():
            file = serializer.validated_data['file']
            new_order = serializer.validated_data.get('new_order')
            reverse = serializer.validated_data.get('reverse', False)
            output_filename = f"reordered_{uuid.uuid4().hex}.pdf"
            output_path = os.path.join("media", output_filename)

            try:
                result_path = reorder_pdf(file, new_order, reverse, output_path)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

            return Response({
                "message": "PDF pages reordered successfully.",
                "file_path": result_path
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# View dummy pentru testare/dezvoltare (rămâne neschimbată dacă nu o folosești)
class ExampleView(APIView):
    def post(self, request):
        return Response({"message": "Success"}, status=status.HTTP_200_OK)