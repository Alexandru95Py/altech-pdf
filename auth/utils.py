from django.urls import path
from auth.views.register import RegisterView
from auth.views.me import MeView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('me/', MeView.as_view(), name='me'),
]
