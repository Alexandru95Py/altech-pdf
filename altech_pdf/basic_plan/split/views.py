import os
import uuid
import logging

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.utils.decorators import method_decorator

from .serializers import SplitPDFSerializer
from .utils import split_pdf
from altech_pdf.decorators import free_or_pro_required

logger = logging.getLogger(__name__)

@method_decorator(free_or_pro_required, name='dispatch')
class SplitPDFView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logger.debug("Request data: %s", request.data)
        logger.debug("Request files: %s", request.FILES)

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

            try:
                result_path = split_pdf(file, start, end, output_path)
            except Exception as e:
                logger.exception("Eroare la split_pdf: %s", e)
                return Response(
                    {"error": "Eroare la procesarea fișierului PDF."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            return Response({
                "message": "PDF split successfully.",
                "file_path": result_path
            }, status=status.HTTP_200_OK)

        logger.debug("Serializer errors: %s", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
