from rest_framework import serializers
from tasks.models import Task, Project, Log


class TaskSerializer(serializers.ModelSerializer):
    logs = serializers.PrimaryKeyRelatedField(many=True, queryset=Log.objects.all())

    class Meta:
        model = Task
        fields = ['name', 'logs', 'project', 'id']


class ProjectSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)
    # tasks = serializers.PrimaryKeyRelatedField(many=True, queryset=Task.objects.all())

    class Meta:
        model = Project
        fields = ['tasks', 'name', 'id']


class LogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Log
        fields = ['start', 'duration', 'task', 'id']
