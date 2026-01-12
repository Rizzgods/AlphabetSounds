from django.shortcuts import render


def home(request):
    """Home page view displaying portfolio information."""
    # Static data for Vercel deployment (no database needed)
    projects = [
        {
            'title': 'E-Commerce Platform',
            'description': 'A full-featured online store with cart, checkout, and payment integration.',
            'technology': 'Django, PostgreSQL, Stripe',
            'link': 'https://github.com/johndoe/ecommerce',
        },
        {
            'title': 'Task Management App',
            'description': 'A collaborative task manager with real-time updates and team features.',
            'technology': 'React, Node.js, MongoDB',
            'link': 'https://github.com/johndoe/taskmanager',
        },
        {
            'title': 'Weather Dashboard',
            'description': 'Beautiful weather app with forecasts, maps, and location-based alerts.',
            'technology': 'Python, Flask, OpenWeather API',
            'link': 'https://github.com/johndoe/weather',
        },
    ]
    
    skills = [
        {'name': 'Python', 'proficiency': 90},
        {'name': 'Django', 'proficiency': 85},
        {'name': 'JavaScript', 'proficiency': 80},
        {'name': 'React', 'proficiency': 75},
        {'name': 'PostgreSQL', 'proficiency': 70},
        {'name': 'Docker', 'proficiency': 65},
    ]
    
    context = {
        'name': 'John Doe',
        'title': 'Full Stack Developer',
        'bio': 'Passionate developer with expertise in building web applications. '
               'I love creating elegant solutions to complex problems.',
        'email': 'john.doe@example.com',
        'github': 'https://github.com/johndoe',
        'linkedin': 'https://linkedin.com/in/johndoe',
        'projects': projects,
        'skills': skills,
    }
    return render(request, 'portfolio/home.html', context)
