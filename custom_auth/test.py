from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from custom_auth.models import CustomUser as User

class AuthTests(APITestCase):

    def test_register_user(self):
        url = reverse("register")
        data = {
            "email": "newuser@example.com",
            "password": "testpass123",
            "first_name": "New",
            "last_name": "User"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_register_with_existing_email(self):
        # Creează utilizator existent
        User.objects.create_user(
            email="testuser@example.com",
            password="pass123",
            first_name="Existing",
            last_name="Email"
        )

        # Încerci să te înregistrezi din nou cu același email
        url = reverse("register")
        data = {
            "email": "testuser@example.com",
            "password": "newpass123",
            "first_name": "Duplicate",
            "last_name": "User"
        }

        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_user(self):
        User.objects.create_user(email="test@example.com", password="securepass123", )
        url = reverse("token_obtain_pair")
        data = {
            "email": "test@example.com",
            "password": "securepass123"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)

    def test_get_me(self):
        user = User.objects.create_user(email="me@test.com", password="securepass123")
        self.client.force_authenticate(user=user)
        url = reverse("me")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["email"], "me@test.com")

    def test_change_password_success(self):
        user = User.objects.create_user(email="change@test.com", password="oldpass123")
        self.client.force_authenticate(user=user)
        url = reverse("change_password")
        data = {
            "old_password": "oldpass123",
            "new_password": "newpass456"
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user.refresh_from_db()
        self.assertTrue(user.check_password("newpass456"))

    def test_change_password_wrong_old_password(self):
        user = User.objects.create_user(email="wrong@test.com", password="oldpass123",)
        self.client.force_authenticate(user=user)
        url = reverse("change_password")
        data = {
            "old_password": "wrongpass",
            "new_password": "newpass456"
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)