from django.db import models


class Project(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Task(models.Model):
    name = models.CharField(max_length=100)
    project = models.ForeignKey(Project, related_name='tasks', on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Log(models.Model):
    start = models.BigIntegerField()
    duration = models.BigIntegerField()
    task = models.ForeignKey(Task, related_name='logs', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.start)
