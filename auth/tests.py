from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from django.contrib.auth.models import User

class AuthTests(APITestCase):
    
    def test_register_user(self):
        url = reverse('register')
        data = {
            "username": "testuser",
            "email": "testuser@example.com",
            "password": "securepass123"
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, "testuser")

    def test_login_user(self):
        User.objects.create_user(username="testuser", email="test@example.com", password="securepass123")
        url = reverse('token_obtain_pair')
        data = {
            "username": "testuser",
            "password": "securepass123"
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_get_me(self):
        user = User.objects.create_user(username="testuser", password="securepass123")
        self.client.login(username="testuser", password="securepass123")
        url = reverse('me')
        self.client.force_authenticate(user=user)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["username"], "testuser")

    def test_register_with_existing_email(self):
        # Cream un utilizator inițial
        User.objects.create_user(username="existinguser", email="testuser@example.com", password="pass123")

        data = {
            "username": "newuser",
            "email": "testuser@example.com",  # același email
            "password": "newpass123"
        }
        url = reverse('register')
        response = self.client.post(url, data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("email", response.data)

    def test_register_with_existing_username(self):
        # Cream un utilizator inițial
        User.objects.create_user(username="testuser", email="other@example.com", password="pass123")

        data = {
            "username": "testuser",  # același username
            "email": "newemail@example.com",
            "password": "newpass123"
        }
        url = reverse('register')
        response = self.client.post(url, data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("username", response.data)
