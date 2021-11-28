from django.urls import path
from . import views

urlpatterns = [
    path('auth/', views.login),
    path('logout/', views.logout)
]