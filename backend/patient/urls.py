from django.urls import path
from . import views

urlpatterns = [
    path('join/', views.join),
    path('data/', views.getPatientData),
    path('patient/', views.getPatientByID)
]