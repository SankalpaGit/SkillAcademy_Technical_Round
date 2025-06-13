# authentication/views.py
from rest_framework import generics, permissions
from django.contrib.auth.models import User
from .models import Profile
from .serializers import RegisterSerializer, ProfileSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

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
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.profile
