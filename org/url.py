# from rest_framework import routers
from org import views
from rest_framework import routers
from django.conf.urls import url, include
from org.api import f
from org.api import r

org_routers = routers.DefaultRouter()
org_routers.register(r'user', views.UserViewSet)
org_routers.register(r'company', views.CompanyViewSet)


urlpatterns = [
    url(r'api/', include(org_routers.urls)),

    # 对象页面
    url(r'^objects/Company/', views.company, name='company'),
    url(r'^objects/Department/', views.department, name='department'),
    url(r'^objects/Department_Con/', views.department_con, name='department_con'),
    url(r'^objects/account_type/', views.account_type, name='account_type'),
    url(r'^objects/Role/', views.role, name='role'),
    url(r'^objects/User/', views.user, name='user'),
    url(r'^objects/AuthorityCompany/', views.authority_company, name='authority_company'),
    url(r'^objects/AuthorityDepartment/', views.authority_department, name='authority_department'),
    url(r'^objects/AuthorityRole/', views.authority_role, name='authority_role'),
    url(r'^objects/AuthorityUser/', views.authority_user, name='authority_user'),
    url(r'^objects/User_Con_Company/', views.user_con_company, name='user_con_company'),
    url(r'^objects/User_Con_Role/', views.user_con_role, name='user_con_role'),
    url(r'^objects/User_Con_Department/', views.user_con_department, name='user_con_department'),
    url(r'^objects/Role_Con_Department/', views.role_con_department, name='role_con_department'),

    # 接口测试页面
    url(r'^Org_Interface/', views.Org_Interface, name='Org_Interface'),
    # 接口管理页面
    url(r'^Org_CRUD_Interface/', views.Org_CRUD_Interface, name='Org_CRUD_Interface'),



    # 功能CG-F页面
    url(r'^CG_F/set_department_con/', views.set_department_con, name='set_department_con'),
    url(r'^CG_F/set_department/', views.set_department, name='set_department'),
    url(r'^CG_F/set_role/', views.set_role, name='set_role'),


    # 职能CG-R页面
    url(r'^role_department/', views.role_department, name='role_department'),
    url(r'^user_profile/', views.user_profile, name='user_profile'),
    url(r'^user_settings/', views.user_settings, name='user_settings'),
    url(r'^user_role/', views.user_role, name='user_role'),
    url(r'^add_user/', views.add_user, name='add_user'),



    # 权限设置
    url(r'^set_authority/', views.set_authority, name='set_authority'),
    url(r'^module_manage/', views.module_manage, name='module_manage'),



    # 接口
    url(r'^action_org_json/', views.action_org_json, name='action_org_json'),
    url(r'^ZG_F_Json/', f.ZG_F_Json, name='ZG_F_Json'),
    url(r'^ZG_R_Json/', r.ZG_R_Json, name='ZG_R_Json'),

    url(r'^', views.company),



]
