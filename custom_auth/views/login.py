from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.utils.translation import gettext_lazy as _

User = get_user_model()

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        # Autentificarea pe bază de email și parolă
        print("DEBUG validate() called with",email, password)
        user = authenticate(email=email, password=password)

        if user is None:
            raise serializers.ValidationError(_("Invalid email or password"))

        if not user.is_active:
            raise serializers.ValidationError(_("User account is disabled."))

        data = super().validate(attrs)

        # Adăugăm date extra în token dacă dorim
        data['email'] = user.email
        data['first_name'] = user.first_name
        data['plan'] = getattr(user, 'plan', 'free')  # dacă ai planuri: free / pro

        return data

class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer