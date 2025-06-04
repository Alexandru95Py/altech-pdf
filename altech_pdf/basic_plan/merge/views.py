from django.utils.decorators import method_decorator
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from altech_pdf.decorators import free_or_pro_required
from .serializers import MergePDFSerializer
from .utils import merge_pdfs
import os, uuid, logging

logger = logging.getLogger(__name__)

class MergePDFView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        # ✅ Verificare autenticare
        if not user.is_authenticated:
            return Response({"error": "Autentificare necesară."}, status=403)

        # ✅ Verificare dacă user-ul are atributul `plan` și dacă e 'free' sau 'pro'
        if not hasattr(user, "plan") or user.plan not in ["free", "pro"]:
            return Response({"error": "Acces interzis."}, status=403)

        # ✅ Extragem fișierele din request
        files = request.FILES.getlist('files')
        if not files or len(files) < 2:
            return Response({"error": "Trebuie să încarci cel puțin două fișiere PDF."}, status=400)

        # ✅ Salvăm fișierul rezultat
        output_filename = f"merge_{uuid.uuid4().hex}.pdf"
        output_path = os.path.join("media", output_filename)
        os.makedirs("media", exist_ok=True)

        result_path = merge_pdfs(files, output_path)

        return Response({
            "message": "PDFs merged successfully.",
            "file_path": result_path
        }, status=200)