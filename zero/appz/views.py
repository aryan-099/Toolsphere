from django.shortcuts import render, redirect
from django.contrib.auth import login as auth_login, authenticate, logout as auth_logout
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib import messages
from django.contrib.auth.decorators import login_required

# Landing Page
def landing(request):
    return render(request, 'landing.html')

# User Registration
from django.contrib.auth.models import User

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            if User.objects.filter(username=username).exists():
                messages.error(request, 'Username already exists. Please choose a different one.')
            else:
                form.save()
                messages.success(request, f'Account created for {username}!')
                return redirect('user_login')  # Redirect to login after successful registration
        else:
            messages.error(request, 'Registration failed. Please try again.')
    else:
        form = UserCreationForm()
    return render(request, 'register.html', {'form': form})

# User Login
def user_login(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            auth_login(request, user)
            return redirect('home')  # Redirect to home page after login
        else:
            messages.error(request, 'Invalid credentials')
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})

# User Logout
def logout(request):
    auth_logout(request)
    return redirect('user_login')

# Home Page (protected)
def home(request):
    return render(request, 'appz/index.html')

def calculator(request):
    return render(request, 'appz/calculator.html')

def bmi(request):
    return render(request, 'appz/bmi.html')

def area(request):
    return render(request, 'appz/area.html')

def currency(request):
    return render(request, 'appz/currency.html')

def length(request):
    return render(request, 'appz/length.html')

def volume(request):
    return render(request, 'appz/volume.html')

def temperature(request):
    return render(request, 'appz/temperature.html')

def time(request):
    return render(request, 'appz/time.html')

def speed(request):
    return render(request, 'appz/speed.html')

def numeral(request):
    return render(request, 'appz/numeral.html')

def homeloan(request):
    return render(request, 'appz/homeloan.html')
