from rest_framework import serializers
from SkiTabApp.models import Users

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('UserId',
                  'UserEmail',
                  'UserPassword',
                  'UserRol',
                  'UserStatus')
