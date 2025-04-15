from django.urls import path
from .views import SplitPDFView  # Asigură-te că importă din views-ul corect (APIView)

urlpatterns = [
    path('', SplitPDFView.as_view(), name='split_pdf'),
]