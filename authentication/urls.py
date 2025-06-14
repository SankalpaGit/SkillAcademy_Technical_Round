# authentication URL configuration
# authentication/urls.py
from django.urls import path
from .views import RegisterView, ProfileView, CustomPasswordResetView, CustomPasswordResetConfirmView
from .views import csrf

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('csrf/', csrf, name='csrf_token'),
    path('password_reset/', CustomPasswordResetView.as_view(), name='password_reset'),
    path('reset-password-confirm/', CustomPasswordResetConfirmView.as_view(), name='password_reset_confirm'),

]
