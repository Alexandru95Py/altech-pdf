from rest_framework.views import APIView
from rest_framework.response import Response

class HomeView(APIView):
    def get(self, request):
        return Response({
            "message": "Welcome to the Analytics API",
            "routes": {
                "register": "/auth/register/",
                "me": "/auth/me/",
                "login": "/auth/login/",
                "refresh": "/auth/refresh/",
                "analytics": "/analytics/",
                "split": "/split/",
                "merge": "/merge/"
            }
        })
