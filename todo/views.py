# todo/views.py
from rest_framework import viewsets, permissions, filters
from .models import Todo
from .serializers import TodoSerializer
from .permissions import IsOwner

class TodoViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    filter_backends = [filters.SearchFilter]
    search_fields = ['completed']  # for filtering ?search=true/false

    def get_queryset(self):
        return Todo.objects.filter(owner=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
