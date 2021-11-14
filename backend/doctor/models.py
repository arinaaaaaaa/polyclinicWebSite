from django.db import models
from django.db.models.deletion import CASCADE
from django.db.models.fields import CharField
from django.contrib.auth.models import User

class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=CASCADE, null=False)
    patronymic = models.CharField(max_length=50, null=True)
    birthDate = models.DateField(null=False)
    speciality = models.CharField(max_length=200, null=False)
    userType = "doctor"

    @classmethod
    def create(cls, username, password, name, surname, patronymic, birthDate, speciality):
        tempUser = User()
        tempUser.username = username
        tempUser.password = password
        tempUser.first_name = name
        tempUser.last_name = surname
        tempUser.save()
        doctor = cls(user = tempUser, patronymic = patronymic, birthDate = birthDate, speciality = speciality)
        return doctor
    