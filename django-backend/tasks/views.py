from tasks.models import Task, Project, Log
from tasks.serializers import TaskSerializer, ProjectSerializer, LogSerializer
from rest_framework.response import Response
from rest_framework import viewsets
import json


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    # def list(self, request):
    #     foo = { 'hello': 'world' }
    #     j = json.dumps(foo)
    #     return Response(j)


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class LogViewSet(viewsets.ModelViewSet):
    queryset = Log.objects.all()
    serializer_class = LogSerializer



