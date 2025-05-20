import os
import uuid

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import ReorderPDFSerializer
from .utils import reorder_pdf

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

class ReorderPDFView(APIView):
    @pro_required
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
                return Response({
                    "message": "PDF pages reordered successfully.",
                    "file_path": result_path
                }, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({
                    "error": str(e)
                }, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)