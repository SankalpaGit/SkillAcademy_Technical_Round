# todo/urls.py
from rest_framework.routers import DefaultRouter
from .views import TodoViewSet

router = DefaultRouter()
router.register(r'', TodoViewSet, basename='todos')

urlpatterns = router.urls
