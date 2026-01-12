from django.db import models


class Project(models.Model):
    """Model representing a portfolio project."""
    title = models.CharField(max_length=200)
    description = models.TextField()
    technology = models.CharField(max_length=200)
    link = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']


class Skill(models.Model):
    """Model representing a skill."""
    name = models.CharField(max_length=100)
    proficiency = models.IntegerField(default=50, help_text="Proficiency level 0-100")

    def __str__(self):
        return self.name
