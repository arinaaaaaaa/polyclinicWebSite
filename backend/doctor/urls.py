from django.urls import path
from . import views

urlpatterns = [
    path('data/', views.getDoctorData),
    path('speciality/', views.getDoctorBySpeciality),
    path('dates/<int:id>/', views.getWorkDates),
    path('freetime/<int:id>/', views.getFreeTime)
]