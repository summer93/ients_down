# from rest_framework import routers
from pdm import views
from rest_framework import routers
from django.conf.urls import url, include

pdm_routers = routers.DefaultRouter()
pdm_routers.register(r'part', views.PartViewSet)
pdm_routers.register(r'drawing', views.DrawingViewSet)


urlpatterns = [
    url(r'api/', include(pdm_routers.urls))
]
