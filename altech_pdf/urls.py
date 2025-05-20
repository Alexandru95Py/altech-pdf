from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),

    # Home
    path('', include('altech_pdf.home.urls')),
    # Basic Plan
    path('split/', include('altech_pdf.basic_plan.split.urls')),
    path('merge/', include('altech_pdf.basic_plan.merge.urls')),
    path('delete/', include('altech_pdf.basic_plan.delete.urls')),
    path('reorder/', include('altech_pdf.basic_plan.reorder.urls')),
    path('file/free/', include('file_manager.basic_plan.urls')),

    # Pro Plan
    path('pro/split/', include('altech_pdf.pro_plan.split.urls')),
    path('pro/merge/', include('altech_pdf.pro_plan.merge.urls')),
    path('pro/delete/', include('altech_pdf.pro_plan.delete.urls')),
    path('pro/reorder/', include('altech_pdf.pro_plan.reorder.urls')),
    path('file/pro/', include('file_manager.pro_plan.urls')),
    path('api/protect/', include('ProtectDocument.free_plan.urls', namespace='free')),

    # Autentificare
    path('auth/', include('custom_auth.urls')),

    # Analytics (opțional, dacă e activ)
    path('analytics/', include('analytics.urls')),

    path('notifications/', include('notifications.urls')),
    path('support/', include('support.urls')),
    path('api/myfiles/', include('myfiles.urls.__init__')),
    
]