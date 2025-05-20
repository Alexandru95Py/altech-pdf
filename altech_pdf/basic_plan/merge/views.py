from django.utils.decorators import method_decorator
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from altech_pdf.decorators import free_or_pro_required
from .utils import merge_pdfs
import os, uuid, logging

logger = logging.getLogger(__name__)

@method_decorator(free_or_pro_required, name='dispatch')
class MergePDFView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logger.debug("Request files: %s", request.FILES)
        files = request.FILES.getlist('files')

        if not files or len(files) < 2:
            return Response(
                {"error": "Trebuie să încarci cel puțin două fișiere PDF."},
                status=status.HTTP_400_BAD_REQUEST
            )

        output_filename = f"merge_{uuid.uuid4().hex}.pdf"
        output_path = os.path.join("media", output_filename)
        os.makedirs("media", exist_ok=True)

        result_path = merge_pdfs(files, output_path)

        return Response(
            {
                "message": "PDFs merged successfully.",
                "file_path": result_path
            },
            status=status.HTTP_200_OK
        )