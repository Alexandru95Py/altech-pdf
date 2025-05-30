from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from django.http import HttpResponse

from .serializers import CVDataSerializer
from .pdf_generator import generate_cv_pdf


class GenerateCVView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        serializer = CVDataSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            photo = request.FILES.get('photo')  # poate fi None

            # Salvează poza temporar
            photo_url = None
            if photo:
                try:
                    with open(f'/tmp/{photo.name}', 'wb+') as destination:
                        for chunk in photo.chunks():
                            destination.write(chunk)
                    photo_url = f'/tmp/{photo.name}'
                except Exception as e:
                    print("Eroare la salvarea pozei:", e)

            # Generează PDF
            pdf_path = generate_cv_pdf(data, photo_url)

            # Returnează PDF ca răspuns
            with open(pdf_path, 'rb') as pdf_file:
                response = HttpResponse(pdf_file.read(), content_type='application/pdf')
                response['Content-Disposition'] = 'attachment; filename="cv.pdf"'
                return response

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)