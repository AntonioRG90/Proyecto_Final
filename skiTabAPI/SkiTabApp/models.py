from django.db import models

# Create your models here.

class Users(models.Model):
    UserId = models.AutoField(primary_key=True)
    UserEmail = models.EmailField()
    UserPassword = models.CharField(max_length=500)
    UserRol = models.IntegerField()
    UserStatus = models.BooleanField()