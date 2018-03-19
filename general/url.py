# from rest_framework import routers
from org import views
from rest_framework import routers
from django.conf.urls import url, include
from general import views

general_routers = routers.DefaultRouter()

urlpatterns = [
    url(r'api/', include(general_routers.urls)),
    url(r'login/', views.user_login, name='user_login'),
    url(r'logout/', views.user_logout, name='user_logout'),
    url(r'register/', views.user_register, name='user_register'),
    url(r'check_code/', views.check_code, name='check_code'),
    url(r'upload_avatar/', views.upload_avatar, name='upload_avatar'),

    url(r'objects/Module/', views.module, name='module'),
    url(r'objects/ModuleMenu/', views.module_menu, name='module_menu'),
    url(r'objects/ModuleInterface/', views.module_interface, name='module_interface'),
    url(r'objects/ModuleAuthority/', views.module_authority, name='module_authority'),
    url(r'objects/Message/', views.message, name='message'),
    url(r'interface/', views.interface, name='interface'),
    url(r'menu/', views.menu, name='menu'),

    url(r'^action_general_json/', views.action_general_json, name='action_general_json'),

    url(r'^', views.module),

]
