from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from SkiTabApp.models import Users
from SkiTabApp.serializers import UsersSerializer

# Create your views here.

@csrf_exempt
def usersApi(request, id=0):
    if request.method =='GET':
        users = Users.objects.all()
        users_serializer = UsersSerializer(users, many=True)
        return JsonResponse(users_serializer.data, safe=False)
    
    elif request.method =='POST':
        user_data = JSONParser().parse(request)
        user_serializer = UsersSerializer(data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JSONParser("Added Successfully!", safe=False)
        return JSONParser("Failed to Add.", safe=False)
    
    elif request.method == 'PUT':
        user_data = JSONParser().parse(request)
        user = Users.objects.get(UserId=user_data['UserId'])
        user_serializer = UsersSerializer(user, data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JSONParser("Updated Successfully!", safe=False)
        return JSONParser("Failed to Update.", safe=False)
    
    elif request.method == 'DELETE':
        user = Users.objects.get(UserId=id)
        user.delete()
        return JsonResponse("Deleted Successfully!", safe=False)