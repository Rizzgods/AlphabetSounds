from django.shortcuts import render
from .models import Project, Skill


def home(request):
    """Home page view displaying portfolio information."""
    projects = Project.objects.all()
    skills = Skill.objects.all()
    
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
