from django.db import models

class Polyclinic (models.Model):
    type = models.CharField(max_length=200)
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    metro = models.CharField(max_length=50)

    @classmethod
    def create(cls, type, name, address, phone, metro):
        polyclinic = cls(type = type, name = name, address = address, phone = phone, metro = metro)
        return polyclinic
