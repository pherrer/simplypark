"""Purpose: ASGI entry point for async servers. It exposes the application object for ASGI servers.

ASGI config for simply_park project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'simply_park.settings')

application = get_asgi_application()
