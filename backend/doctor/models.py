from django.db import models
from django.db.models.deletion import CASCADE
from django.db.models.fields import CharField
from django.contrib.auth.models import User

class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=CASCADE)
    name = models.CharField(max_length=30)
    surname = models.CharField(max_length=50)
    patronymic = models.CharField(max_length=50)
    birthDate = models.DateField()
    speciality = models.CharField(max_length=200)


    