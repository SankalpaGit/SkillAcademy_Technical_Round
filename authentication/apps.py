# authentication/apps.py
from django.apps import AppConfig

class AuthenticationConfig(AppConfig):
    name = 'authentication'

    def ready(self):
        import authentication.signals  # update this path
