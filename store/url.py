# from rest_framework import routers
from store import views
from rest_framework import routers

store_routers = routers.DefaultRouter()
store_routers.register(r'part_live', views.PartLiveViewSet)
store_routers.register(r'store', views.StoreViewSet)

from django.conf.urls import url, include
from django.contrib import admin
from store.api import f, r, t

urlpatterns = [

    url(r'api/', include(store_routers.urls)),

    # 对象页面
    url(r'^objects/Store/', views.Store, name='Store'),
    url(r'^objects/PartLive/', views.PartLive, name='PartLive'),
    url(r'^objects/StoreConPartLive/', views.StoreConPartLive, name='StoreConPartLive'),
    url(r'^objects/StoreCon/', views.StoreCon, name='StoreCon'),
    url(r'^objects/Store_Status/', views.Store_Status, name='Store_Status'),

    # 表单对象
    url(r'^objects/Form_Status/', views.Form_Status, name='Form_Status'),
    url(r'^objects/StoreForm/', views.StoreForm, name='StoreForm'),
    url(r'^objects/StoreFormConPartLive/', views.StoreFormConPartLive, name='StoreFormConPartLive'),

    # 接口测试页面
    url(r'^Store_Interface/', views.Store_Interface, name='Store_Interface'),

    # 接口管理页面
    url(r'^Store_CRUD_Interface/', views.Store_CRUD_Interface, name='Store_CRUD_Interface'),

    # 功能CG-F页面
    url(r'^CG_F/Store_PutIn/', views.Store_PutIn, name='Store_PutIn'),
    url(r'^CG_F/Store_PutInTemp/', views.Store_PutInTemp, name='Store_PutInTemp'),
    url(r'^CG_F/Store_Stock/', views.Store_Stock, name='Store_Stock'),
    url(r'^CG_F/Store_StockTemp/', views.Store_StockTemp, name='Store_StockTemp'),
    url(r'^CG_F/edit_PartLive/', views.edit_PartLive, name='edit_PartLive'),

    # 职能CG-R页面
    url(r'^CG_R/Store_ReceiveTemp/', views.Store_ReceiveTemp, name='Store_ReceiveTemp'),
    url(r'^CG_R/Store_RefuseTemp/', views.Store_RefuseTemp, name='Store_RefuseTemp'),
    url(r'^CG_R/Store_Receive/', views.Store_Receive, name='Store_Receive'),
    url(r'^CG_R/Store_Remove/', views.Store_Remove, name='Store_Remove'),

    # 表单CG-T页面
    url(r'^CG_T/Store_001Order/', views.Store_001Order, name='Store_001Order'),
    url(r'^CG_T/Store_002Order/', views.Store_002Order, name='Store_002Order'),
    url(r'^CG_T/Store_003Order/', views.Store_003Order, name='Store_003Order'),
    url(r'^CG_T/Store_004Order/', views.Store_004Order, name='Store_004Order'),
    url(r'^CG_T/Store_005Order/', views.Store_005Order, name='Store_005Order'),
    url(r'^CG_T/Store_006Order/', views.Store_006Order, name='Store_006Order'),
    url(r'^CG_T/Store_007Order/', views.Store_007Order, name='Store_007Order'),
    url(r'^CG_T/Store_008Order/', views.Store_008Order, name='Store_008Order'),
    url(r'^CG_T/Store_009Order/', views.Store_009Order, name='Store_009Order'),

    # 接口
    url(r'^action_store_json/', views.action_store_json, name='action_store_json'),
    url(r'^CG_F_Json/', f.CG_F_Json, name='CG_F_Json'),
    url(r'^CG_R_Json/', r.CG_R_Json, name='CG_R_Json'),
    url(r'^CG_T_Json/', t.CG_T_Json, name='CG_T_Json'),

    url(r'^', views.Store),

]
