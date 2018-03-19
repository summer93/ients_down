# from rest_framework import routers
from flow import views
from rest_framework import routers
from django.conf.urls import url, include

flow_routers = routers.DefaultRouter()
flow_routers.register(r'node', views.NodeViewSet)

urlpatterns = [
    url(r'test/', views.test),
    url(r'api/', include(flow_routers.urls))
]
