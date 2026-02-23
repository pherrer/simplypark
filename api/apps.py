# Purpose: App configuration for the API app. It sets default settings like the app name.
from django.apps import AppConfig


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'
