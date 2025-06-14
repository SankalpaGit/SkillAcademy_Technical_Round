# authentication/views.py
from rest_framework import generics, permissions
from django.contrib.auth.models import User
from .models import Profile
from .serializers import RegisterSerializer, ProfileSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from django.middleware.csrf import get_token
from rest_framework.reverse import reverse
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny
from django.utils.decorators import method_decorator
from django.contrib.auth.forms import PasswordResetForm
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator

@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'register': reverse('register', request=request, format=format),
        'profile': reverse('profile', request=request, format=format),
        'login': reverse('token_obtain_pair', request=request, format=format),
        'refresh_token': reverse('token_refresh', request=request, format=format),
    })
    
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer


class ProfileView(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.queryset.get(user=self.request.user)
    
def csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})

# used for the password rest for asking mail to sent reset link
class CustomPasswordResetView(APIView):
    permission_classes = [AllowAny]

    @method_decorator(csrf_exempt)
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        if not email:
            return JsonResponse({'error': 'Email is required'}, status=400)

        form = PasswordResetForm(data={'email': email})
        if form.is_valid():
            form.save(
                request=request,
                use_https=False,  # Use HTTP for local development
                email_template_name='registration/password_reset_email.html',
            )
            return JsonResponse({'message': 'Password reset email sent'}, status=200)
        else:
            return JsonResponse({'error': 'Invalid email address'}, status=400)

# used for the password reset confirmation after clicking the link in the email 
class CustomPasswordResetConfirmView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        uid = request.data.get('uid')
        token = request.data.get('token')
        new_password = request.data.get('new_password')

        try:
            # Decode the UID and get the user
            uid = urlsafe_base64_decode(uid).decode()
            user = User.objects.get(pk=uid)
            print(f"User found: {user.username}")
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            print("Invalid user ID")
            return JsonResponse({'error': 'Invalid user ID'}, status=400)

        # Check if the token is valid
        if not default_token_generator.check_token(user, token):
            print("Invalid or expired token")
            return JsonResponse({'error': 'Invalid or expired token'}, status=400)

        # Set the new password and save the user
        user.set_password(new_password)
        user.save()
        print(f"Password updated for user: {user.username}")

        return JsonResponse({'message': 'Password reset successful'}, status=200)
