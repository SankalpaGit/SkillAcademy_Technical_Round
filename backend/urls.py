from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from authentication.views import api_root

urlpatterns = [
    path('admin/', admin.site.urls),

    # JWT Auth
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # User App
    path('api/users/', include('authentication.urls')),

    # Blog App
    path('api/blog/', include('blog.urls')),

    # Todo App
    path('api/todo/', include('todo.urls')),

    # Password Reset (Django built-in)
    path('auth/', include('django.contrib.auth.urls')),

    # API Root
    path('', api_root, name='api_root'),
]
