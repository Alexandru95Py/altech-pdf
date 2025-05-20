from django.urls import path
from custom_auth.views.register import RegisterView
from custom_auth.views.me import MeView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('me/', MeView.as_view(), name='me'),
]
