from django.urls import path
from . import views

urlpatterns = [
    path('', views.landing, name='landing'),
    path('home/', views.home, name='home'),  # Removed login_required
    path('calculator/', views.calculator, name='calculator'),
    path('bmi/', views.bmi, name='bmi'),
    path('area/', views.area, name='area'),
    path('currency/', views.currency, name='currency'),
    path('length/', views.length, name='length'),
    path('volume/', views.volume, name='volume'),
    path('temperature/', views.temperature, name='temperature'),
    path('time/', views.time, name='time'),
    path('speed/', views.speed, name='speed'),
    path('numeral/', views.numeral, name='numeral'),
    path('homeloan/', views.homeloan, name='homeloan'),
    path('register/', views.register, name='register'),
    path('user_login/', views.user_login, name='user_login'),
    path('logout/', views.logout, name='logout'),
]
