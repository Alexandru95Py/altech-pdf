from rest_framework import serializers

class CVDataSerializer(serializers.Serializer):
    full_name = serializers.CharField(max_length=100)
    about = serializers.CharField(style={'base_template': 'textarea.html'})
    education = serializers.CharField(style={'base_template': 'textarea.html'})
    experience = serializers.CharField(style={'base_template': 'textarea.html'})
    skills = serializers.CharField(style={'base_template': 'textarea.html'})
    languages = serializers.CharField(style={'base_template': 'textarea.html'})
    links = serializers.CharField(required=False, allow_blank=True)
    photo = serializers.ImageField(required=False, allow_null=True)