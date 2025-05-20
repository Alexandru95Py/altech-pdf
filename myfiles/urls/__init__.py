# myfiles/urls/__init__.py

from django.urls import path, include

urlpatterns = [
    path('base/', include('myfiles.urls.base_plan')),
    path('pro/', include('myfiles.urls.pro_plan')),
]