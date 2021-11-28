from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('doctor/', include('doctor.urls')),
    path('patient/', include('patient.urls')),
    path('login/', include('authentification.urls')),
    path('polyclinic/', include('polyclinic.urls')),
    path('notes/', include('notes.urls'))
]