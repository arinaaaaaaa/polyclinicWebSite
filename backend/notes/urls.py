from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.createNote),
    path('data/', views.saveFile),
    path('delete/', views.cancelNote)
]