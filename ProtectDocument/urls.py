from django.urls import path, include

urlpatterns = [
    path('protect/', include('ProtectDocument.free_plan.urls', namespace='free')),
    path('protect/', include('ProtectDocument.pro_plan.urls', namespace='pro')),  # pregătit pentru PRO
]