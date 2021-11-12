from django.contrib.auth.models import User
from django.db import models
from django.db.models.deletion import CASCADE

class Patient(models.Model):
    user = models.OneToOneField(User, on_delete = CASCADE, null = False)
    patronymic = models.CharField(max_length = 50, null = True)
    polis = models.CharField(max_length = 16, null = False)
    birthDate = models.DateField(null = False)

    @classmethod
    def create(cls, name, surname, patronymic, birthDate, email, polis, username, password):
        tempUser = User.objects.create_user(username = username, email = email, password = password, first_name = name, last_name = surname)
        tempUser.save()
        patient = cls(user = tempUser, patronymic = patronymic, birthDate = birthDate, polis = polis)
        patient.save()
        return patient