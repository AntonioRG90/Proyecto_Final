from django.urls import re_path as url
from SkiTabApp import views

urlpatterns =[
    url(r'^user/$', views.usersApi),
    url(r'^user/([0-9]+)$', views.usersApi)
]