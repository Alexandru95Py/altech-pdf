from django.urls import path, include

urlpatterns = [
    path('split/', include('altech_pdf.pro_plan.split.urls')),
    path('merge/', include('altech_pdf.pro_plan.merge.urls')),
    path('delete/', include('altech_pdf.pro_plan.delete.urls')),
    path('reorder/', include('altech_pdf.pro_plan.reorder.urls')),
    
]