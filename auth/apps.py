from django.apps import AppConfig

class AuthConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'auth'
    label = 'custom_auth'  # <- acest label evită conflictul cu 'django.contrib.auth'
