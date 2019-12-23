from django.urls import path, include
from rest_framework import routers
from tasks import views

router = routers.DefaultRouter()
router.register(r'projects', views.ProjectViewSet)
router.register(r'tasks', views.TaskViewSet)
router.register(r'logs', views.LogViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('react', include('frontend.urls')),
]

