import os
import uuid

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import MergePDFSerializer
from .utils import merge_pdfs

from django.http import HttpResponseForbidden

def pro_required(view_func):
    def wrapper(request, *args, **kwargs):
        user = request.user
        if not user.is_authenticated:
            return HttpResponseForbidden("Autentificare necesară.")
        if not hasattr(user, 'profile') or user.profile.plan != 'pro':
            return HttpResponseForbidden("Acces permis doar utilizatorilor cu plan Pro.")
        return view_func(request, *args, **kwargs)
    return wrapper

class MergePDFView(APIView):
    @pro_required
    def post(self, request):
        data = request.data.copy()
        data.setlist('files', request.FILES.getlist('files'))

        serializer = MergePDFSerializer(data=data)
        if serializer.is_valid():
            files = serializer.validated_data['files']

            output_filename = f"merged_{uuid.uuid4().hex}.pdf"
            output_path = os.path.join("media", output_filename)
            os.makedirs("media", exist_ok=True)

            result_path = merge_pdfs(files, output_path)

            return Response({
                "message": "PDFs merged successfully.",
                "file_path": result_path
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
