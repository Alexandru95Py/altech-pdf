import os
import uuid
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ReorderPDFSerializer
from .utils import reorder_pdf

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
                return Response({
                    "error": str(e)
                }, status=status.HTTP_400_BAD_REQUEST)

            return Response({
                "message": "PDF pages reordered successfully.",
                "file_path": result_path
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
