from django.shortcuts import render, redirect, HttpResponse
from rest_framework import viewsets
from store.serializers import *
from datetime import datetime, timezone, timedelta
import django.utils.timezone as timezones
from store import models as Store_models
from store import forms
from org import models as Org_models
from pdm import models as Pdm_models
from general import models as General_models
from django.contrib.auth.decorators import login_required
import general.common_variable
import general.functions
import general.views
import json
import uuid


# Create your views here.


class PartLiveViewSet(viewsets.ModelViewSet):
    queryset = PartLive.objects.all()
    serializer_class = PartLiveSerializer


class StoreViewSet(viewsets.ModelViewSet):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer


def leaf_node(Head_id, NO):
    '''
    所有叶子仓库uuid
    :param Head_id: 
    :return: 
    '''
    temp = []
    StoreCon_objs = Store_models.StoreCon.objects.filter(Last__Status__NO=NO)

    def tree_traversal(Head_id):
        # 寻找下一级仓库
        val = StoreCon_objs.filter(Head_id=Head_id).values('Last_id')
        # 循环遍历下一级仓库queryset
        for row in val:
            # 判断下一级仓库是在否还存在下一级仓库
            if StoreCon_objs.filter(Head_id=row['Last_id']):
                val = StoreCon_objs.filter(Head_id=row['Last_id']).values('Last_id')
                # 还存下一级仓库则进行递归
                tree_traversal(row['Last_id'])
            else:
                # 不存在下一级仓库则为leaf_node将其存入列表中
                if row['Last_id']:
                    temp.append(row['Last_id'])

    tree_traversal(Head_id)
    return temp


def all_node(Head_id, NO):
    '''
    所有仓库uuid
    :param Head_id: 
    :return: 
    '''
    temp = []
    StoreCon_objs = Store_models.StoreCon.objects.filter(Last__Status__NO=NO)

    def tree_traversal(Head_id):

        # 讲该节点存入列表中
        temp.append(Head_id)
        # 寻找下一级仓库
        val = StoreCon_objs.filter(Head_id=Head_id).values('Last_id')
        # 循环遍历下一级仓库queryset
        for row in val:
            # 判断下一级仓库是在否还存在下一级仓库
            if StoreCon_objs.filter(Head_id=row['Last_id']):
                val = StoreCon_objs.filter(Head_id=row['Last_id']).values('Last_id')
                # 还存下一级仓库则进行递归
                tree_traversal(row['Last_id'])
            else:
                # 不存在下一级仓库则为leaf_node将其存入列表中
                if row['Last_id']:
                    temp.append(row['Last_id'])

    tree_traversal(Head_id)
    return temp


# 存储操作名称和函数直接对应关系
_registered_actions = {}


# 装饰器, 将操作名称存入dict
def actions(name):
    def decorator(f):
        _registered_actions[name] = f
        return f

    return decorator


# 存储查询操作对不同表的操作函数和操作名称的对应关系
_registered_tables = {}


# 装饰器, 将表名存入dict
def table_chose(name):
    def decorator(f):
        _registered_tables[name] = f
        return f

    return decorator


tzutc_8 = timezone(timedelta(hours=8))


# 处理uuid对象和datetime不能直接被序列号
class Encoder(json.JSONEncoder):
    def default(self, obj):

        # 处理uuid对象
        if isinstance(obj, uuid.UUID):
            return str(obj)
        # 处理datetime对象
        if isinstance(obj, datetime):
            return obj.astimezone(tzutc_8).strftime('%Y-%m-%d %H:%M:%S')
        return json.JSONEncoder.default(self, obj)


# 展示store模块各页面
@login_required(login_url='/general/login/')
def Store(request):
    if request.method == 'GET':
        Company_objs = Org_models.Company.objects.values(
            'id', 'Name'
        )
        Status_objs = Store_models.Store_Status.objects.values(
            'id', 'Name'
        )

        return render(request, 'store_Store.html', {
            'Company_objs': Company_objs,
            'Status_objs': Status_objs

        })


@login_required(login_url='/general/login/')
def PartLive(request):
    if request.method == 'GET':
        Part_obj = Pdm_models.Part.objects.values(
            'id', 'Name'
        )
        return render(request, 'store_PartLive.html', {
            'Part_objs': Part_obj,
        })


@login_required(login_url='/general/login/')
def StoreConPartLive(request):
    if request.method == 'GET':
        PartLive_objs = Store_models.PartLive.objects.values(
            'id', 'Part__Name'
        )

        Store_objs = Store_models.Store.objects.values(
            'id', 'Status__Name', 'Name'
        )
        return render(request, 'store_StoreConPartLive.html', {
            'Store_objs': Store_objs,
            'PartLive_objs': PartLive_objs
        })


@login_required(login_url='/general/login/')
def StoreCon(request):
    if request.method == 'GET':
        StoreCon_objs = Store_models.StoreCon.objects.values(
            'Head_id', 'Head__Name', 'Last_id', 'Last__Name'
        )
        Store_objs = Store_models.Store.objects.values(
            'id', 'Status__Name', 'Name'
        )

        return render(request, 'store_StoreCon.html', {
            'StoreCon_objs': StoreCon_objs,
            'Store_objs': Store_objs

        })


@login_required(login_url='/general/login/')
def Store_Status(request):
    if request.method == 'GET':
        return render(request, 'store_Store_Status.html')


@login_required(login_url='/general/login/')
def Form_Status(request):
    if request.method == 'GET':
        return render(request, 'store_Form_Status.html', {})


@login_required(login_url='/general/login/')
def StoreForm(request):
    if request.method == 'GET':
        Form_Status_objs = Store_models.Form_Status.objects.values(
            'id', 'NO', 'Name'
        )

        Store_objs = Store_models.Store.objects.filter(Status__NO='002').values(
            'id', 'Status__Name', 'Name'
        )

        return render(request, 'store_StoreForm.html', {
            'Form_Status_objs': Form_Status_objs,
            'Store_objs': Store_objs,

        })


@login_required(login_url='/general/login/')
def StoreFormConPartLive(request):
    if request.method == 'GET':
        StoreForm_objs = Store_models.StoreForm.objects.values(
            'id', 'Name', 'Status__Name', 'OriginStore__Name'
        )
        PartLive_objs = Store_models.PartLive.objects.values(
            'id', 'QR_Code', 'Part__Name'
        )
        return render(request, 'store_StoreFormConPartLive.html', {
            'StoreForm_objs': StoreForm_objs,
            'PartLive_objs': PartLive_objs

        })


@login_required(login_url='/general/login/')
def Store_Interface(request):
    if request.method == 'GET':
        return render(request, 'store_Interface.html')


@login_required(login_url='/general/login/')
def Store_CRUD_Interface(request):
    if request.method == 'GET':
        return render(request, 'store_CRUD_Interface.html')


@login_required(login_url='/general/login/')
def Store_PutIn(request):
    if request.method == 'GET':
        Store_objs = Store_models.Store.objects.filter(Status__NO='002').values(
            'id', 'Status__Name', 'Name'
        )
        PartLive_objs = Store_models.PartLive.objects.values(
            'id', 'QR_Code', 'Part__Name'
        )

        return render(request, 'store_Store_PutIn.html', {
            'Store_objs': Store_objs,
            'PartLive_objs': PartLive_objs

        })


@login_required(login_url='/general/login/')
def Store_PutInTemp(request):
    if request.method == 'GET':
        Store_objs = Store_models.Store.objects.filter(Status__NO='002').values(
            'id', 'Status__Name', 'Name'
        )
        PartLive_objs = Store_models.PartLive.objects.values(
            'id', 'QR_Code', 'Part__Name'
        )

        return render(request, 'store_Store_PutInTemp.html', {
            'Store_objs': Store_objs,
            'PartLive_objs': PartLive_objs

        })


@login_required(login_url='/general/login/')
def Store_Stock(request):
    if request.method == 'GET':
        Store_objs = Store_models.Store.objects.filter(Status__NO='002').values(
            'id', 'Status__Name', 'Name'
        )
        return render(request, 'store_Store_Stock.html', {
            'Store_objs': Store_objs,
        })


@login_required(login_url='/general/login/')
def Store_StockTemp(request):
    if request.method == 'GET':
        Store_objs = Store_models.Store.objects.filter(Status__NO='002').values(
            'id', 'Status__Name', 'Name'
        )
        return render(request, 'store_Store_StockTemp.html', {
            'Store_objs': Store_objs
        })


def edit_PartLive(request):
    if request.method == 'GET':
        PartLive_objs = Store_models.PartLive.objects.values(
            'id', 'Part__Name'
        )

        Store_objs = Store_models.Store.objects.values(
            'id', 'Status__Name', 'Name'
        )
        if request.session['Account_Type'] == '2':
            Store_objs = Store_models.Store.objects.filter(
                Company__id=request.session['Company_id']
            ).values(
                'id', 'Status__Name', 'Name'
            )

        return render(request, 'edit_PartLive.html', {
            'PartLive_objs': PartLive_objs,
            'Store_objs': Store_objs

        })


@login_required(login_url='/general/login/')
def Store_ReceiveTemp(request):
    if request.method == 'GET':
        Store_objs = Store_models.Store.objects.filter(Status__NO='002').values(
            'id', 'Status__Name', 'Name'
        )
        PartLive_objs = Store_models.PartLive.objects.values(
            'id', 'QR_Code', 'Part__Name'
        )

        return render(request, 'store_Store_ReceiveTemp.html', {
            'Store_objs': Store_objs,
            'PartLive_objs': PartLive_objs

        })


@login_required(login_url='/general/login/')
def Store_RefuseTemp(request):
    if request.method == 'GET':
        Store_objs = Store_models.Store.objects.filter(Status__NO='002').values(
            'id', 'Status__Name', 'Name'
        )
        PartLive_objs = Store_models.PartLive.objects.values(
            'id', 'QR_Code', 'Part__Name'
        )

        return render(request, 'store_Store_RefuseTemp.html', {
            'Store_objs': Store_objs,
            'PartLive_objs': PartLive_objs

        })


@login_required(login_url='/general/login/')
def Store_Receive(request):
    if request.method == 'GET':
        Store_objs = Store_models.Store.objects.filter(Status__NO='002').values(
            'id', 'Status__Name', 'Name'
        )
        PartLive_objs = Store_models.PartLive.objects.values(
            'id', 'QR_Code', 'Part__Name'
        )

        return render(request, 'store_Store_Receive.html', {
            'Store_objs': Store_objs,
            'PartLive_objs': PartLive_objs

        })


@login_required(login_url='/general/login/')
def Store_Remove(request):
    if request.method == 'GET':
        Store_objs = Store_models.Store.objects.filter(Status__NO='002').values(
            'id', 'Status__Name', 'Name'
        )
        PartLive_objs = Store_models.PartLive.objects.values(
            'id', 'QR_Code', 'Part__Name'
        )

        return render(request, 'store_Store_Remove.html', {
            'Store_objs': Store_objs,
            'PartLive_objs': PartLive_objs

        })


# 送货单
@login_required(login_url='/general/login/')
def Store_001Order(request):
    if request.method == 'GET':
        Store_objs = Store_models.Store.objects.filter(Status__NO='002').values(
            'id', 'Status__Name', 'Name'
        )
        StoreForm_objs = Store_models.StoreForm.objects.values(
            'id', 'Name', 'Status__Name', 'OriginStore__Name'
        )
        PartLive_objs = Store_models.PartLive.objects.values(
            'id', 'QR_Code', 'Part__Name'
        )
        return render(request, 'store_Store_001Order.html', {
            'Store_objs': Store_objs,
            'StoreForm_objs': StoreForm_objs,
            'PartLive_objs': PartLive_objs

        })


# 收货单
@login_required(login_url='/general/login/')
def Store_002Order(request):
    if request.method == 'GET':
        Store_objs = Store_models.Store.objects.filter(Status__NO='002').values(
            'id', 'Status__Name', 'Name'
        )
        PartLive_objs = Store_models.PartLive.objects.values(
            'id', 'QR_Code', 'Part__Name'
        )
        return render(request, 'store_Store_002Order.html', {
            'Store_objs': Store_objs,
            'PartLive_objs': PartLive_objs

        })


# 领货单
@login_required(login_url='/general/login/')
def Store_003Order(request):
    if request.method == 'GET':
        Store_objs = Store_models.Store.objects.filter(Status__NO='002').values(
            'id', 'Status__Name', 'Name'
        )
        StoreForm_objs = Store_models.StoreForm.objects.values(
            'id', 'Name', 'Status__Name', 'OriginStore__Name'
        )
        PartLive_objs = Store_models.PartLive.objects.values(
            'id', 'QR_Code', 'Part__Name'
        )
        return render(request, 'store_Store_003Order.html', {
            'Store_objs': Store_objs,
            'StoreForm_objs': StoreForm_objs,
            'PartLive_objs': PartLive_objs

        })


# 退货单
@login_required(login_url='/general/login/')
def Store_004Order(request):
    if request.method == 'GET':
        Store_objs = Store_models.Store.objects.filter(Status__NO='002').values(
            'id', 'Status__Name', 'Name'
        )
        StoreForm_objs = Store_models.StoreForm.objects.values(
            'id', 'Name', 'Status__Name', 'OriginStore__Name'
        )
        PartLive_objs = Store_models.PartLive.objects.values(
            'id', 'QR_Code', 'Part__Name'
        )
        return render(request, 'store_Store_004Order.html', {
            'Store_objs': Store_objs,
            'StoreForm_objs': StoreForm_objs,
            'PartLive_objs': PartLive_objs
        })


# 送料单
@login_required(login_url='/general/login/')
def Store_005Order(request):
    if request.method == 'GET':
        Store_objs = Store_models.Store.objects.filter(Status__NO='002').values(
            'id', 'Status__Name', 'Name'
        )
        StoreForm_objs = Store_models.StoreForm.objects.values(
            'id', 'Name', 'Status__Name', 'OriginStore__Name'
        )
        PartLive_objs = Store_models.PartLive.objects.values(
            'id', 'QR_Code', 'Part__Name'
        )
        return render(request, 'store_Store_005Order.html', {
            'Store_objs': Store_objs,
            'StoreForm_objs': StoreForm_objs,
            'PartLive_objs': PartLive_objs
        })


# 入库单
@login_required(login_url='/general/login/')
def Store_006Order(request):
    if request.method == 'GET':
        Store_objs = Store_models.Store.objects.filter(Status__NO='002').values(
            'id', 'Status__Name', 'Name'
        )
        StoreForm_objs = Store_models.StoreForm.objects.values(
            'id', 'Name', 'Status__Name', 'OriginStore__Name'
        )
        PartLive_objs = Store_models.PartLive.objects.values(
            'id', 'QR_Code', 'Part__Name'
        )
        return render(request, 'store_Store_006Order.html', {
            'Store_objs': Store_objs,
            'StoreForm_objs': StoreForm_objs,
            'PartLive_objs': PartLive_objs
        })


# 领料单
@login_required(login_url='/general/login/')
def Store_007Order(request):
    if request.method == 'GET':
        Store_objs = Store_models.Store.objects.filter(Status__NO='002').values(
            'id', 'Status__Name', 'Name'
        )
        StoreForm_objs = Store_models.StoreForm.objects.values(
            'id', 'Name', 'Status__Name', 'OriginStore__Name'
        )
        PartLive_objs = Store_models.PartLive.objects.values(
            'id', 'QR_Code', 'Part__Name'
        )
        return render(request, 'store_Store_007Order.html', {
            'Store_objs': Store_objs,
            'StoreForm_objs': StoreForm_objs,
            'PartLive_objs': PartLive_objs
        })


# 出库单
@login_required(login_url='/general/login/')
def Store_008Order(request):
    if request.method == 'GET':
        Store_objs = Store_models.Store.objects.filter(Status__NO='002').values(
            'id', 'Status__Name', 'Name'
        )
        StoreForm_objs = Store_models.StoreForm.objects.values(
            'id', 'Name', 'Status__Name', 'OriginStore__Name'
        )
        PartLive_objs = Store_models.PartLive.objects.values(
            'id', 'QR_Code', 'Part__Name'
        )
        return render(request, 'store_Store_008Order.html', {
            'Store_objs': Store_objs,
            'StoreForm_objs': StoreForm_objs,
            'PartLive_objs': PartLive_objs
        })


# 盘库单
@login_required(login_url='/general/login/')
def Store_009Order(request):
    if request.method == 'GET':
        Store_objs = Store_models.Store.objects.filter(Status__NO='002').values(
            'id', 'Status__Name', 'Name'
        )
        StoreForm_objs = Store_models.StoreForm.objects.values(
            'id', 'Name', 'Status__Name', 'OriginStore__Name'
        )
        PartLive_objs = Store_models.PartLive.objects.values(
            'id', 'QR_Code', 'Part__Name'
        )
        return render(request, 'store_Store_009Order.html', {
            'Store_objs': Store_objs,
            'StoreForm_objs': StoreForm_objs,
            'PartLive_objs': PartLive_objs
        })


@table_chose('Store')
def table_Store(ret, content, *args, **kwargs):
    '''
    获取Store表数据
    :param ret: 
    :param content: 
    :param args: 
    :param kwargs: 
    :return: 
    '''
    try:
        Store = Store_models.Store.objects.filter(
            Tell__contains=content.get('Tell', '').strip(),
            Name__contains=content.get('Name', '').strip(),
            Address__contains=content.get('Address', '').strip(),
        )

        if content.get('Company_id', ''):
            Store = Store.filter(
                Company_id=content.get('Company_id', '')

            )
        if content.get('Status_id', ''):
            Store = Store.filter(
                Status_id=content.get('Status_id', '')

            )

        objs = Store.values_list(
            'id', 'Status__Name', 'Status_id', 'Name', 'Tell', 'Address', 'Company__Name', 'Company_id'
        )

        header_title = ['id', '状态', 'Status_id', '名称', '电话', '地址', '公司', 'Company_id']

        ret['content']['title'] = header_title
        ret['content']['value'] = list(objs)
        ret['status'] = True
        ret['message'] = '{0}{1}'.format('获取', 'Store')

    except Exception as e:
        ret['status'] = False
        ret['message'] = str(e)

    return ret


@table_chose('PartLive')
def table_PartLive(ret, content, *args, **kwargs):
    '''
    获取PartLive表数据
    :param ret: 
    :param content: 
    :param args: 
    :param kwargs: 
    :return: 
    '''
    try:

        PartLive = Store_models.PartLive.objects.filter(

            QR_Code__contains=content.get('QR_Code', '').strip(),

        )
        if content.get('Part_id', ''):
            PartLive = PartLive.filter(
                Part_id=content.get('Part_id', '')
            )

        objs = PartLive.values_list(
            'id', 'QR_Code', 'Part__ItemNO', 'Part__Name', 'Part__Material__Name', 'Part__Company__Name',
            'Part__Rev', 'Part__id'
        )
        header_title = ['id', '二维码', '物号', '名称', '材料', '公司', '版本号', 'Part__id']

        ret['content']['title'] = header_title
        ret['content']['value'] = list(objs)
        ret['status'] = True
        ret['message'] = '{0}{1}'.format('获取', 'PartLive')
    except Exception as e:
        ret['status'] = False
        ret['message'] = str(e)

    return ret


@table_chose('StoreConPartLive')
def table_StoreConPartLive(ret, content, Store_id, *args, **kwargs):
    '''
    获取StoreConPartLive表数据
    :param ret: 
    :param content: 
    :param type: 
    :param Store_id: 
    :param args: 
    :param kwargs: 
    :return: 
    '''
    type = content.get('store_type', None)
    try:

        if Store_id:
            obj = Store_models.Store.objects.filter(id=Store_id).first()
            NO = obj.Status.NO
            from django.db.models import Q
            nodes_list = []
            if type == 'node_store':
                nodes_list = [Store_id, ]
            elif type == 'all_store':
                nodes_list = all_node(Store_id, NO)
            elif type == 'all_leaf_node_store':
                nodes_list = leaf_node(Store_id, NO)

            q1 = Q()
            q1.connector = 'OR'
            if nodes_list:
                for row in nodes_list:
                    q1.children.append(('Store_id', row))
            else:
                q1.children.append(('Store_id', None))

            temp_objs = Store_models.StoreConPartLive.objects.filter(q1)
        else:
            temp_objs = Store_models.StoreConPartLive.objects.all()

        StoreConPartLive = temp_objs.filter(
            PartLive__QR_Code__contains=content.get('PartLive__QR_Code', '').strip(),
            PartLive__Part__ItemNO__contains=content.get('PartLive__Part__ItemNO', '').strip(),
            PartLive__Part__Name__contains=content.get('PartLive__Part__Name', '').strip()
        )

        objs = StoreConPartLive.values_list(
            'id', 'PartLive_id', 'PartLive__QR_Code', 'PartLive__Part__ItemNO', 'PartLive__Part__Name',
            'PartLive__Part__Material__Name', 'Store_id',
            'Store__Name', 'Store__Status__Name', 'PartLive__Part__Rev', 'Number'
        )

        header_title = ['id', 'PartLive_id', '二维码', '物号', '名称', '材料', 'Store_id', ' 所在仓库', '状态', '版本号', '数量']

        ret['content']['title'] = header_title
        ret['content']['value'] = list(objs)
        ret['status'] = True
        ret['message'] = '{0}{1}'.format('获取', 'StoreConPartLive')
    except Exception as e:
        ret['status'] = False
        ret['message'] = str(e)

    return ret


@table_chose('StoreCon')
def table_StoreCon(ret, content, *args, **kwargs):
    '''
    获取StoreCon表数据
    :param ret: 
    :param content: 
    :param args: 
    :param kwargs: 
    :return: 
    '''
    try:
        objs = Store_models.StoreCon.objects.values_list(
            'id', 'Head__Status__Name', 'Head__Name', 'Last__Status__Name', 'Last__Name'
        )
        header_title = ['id', '状态', '上一级仓库', '状态', '下一级仓库', ]
        ret['content']['title'] = header_title
        ret['content']['value'] = list(objs)
        ret['status'] = True
        ret['message'] = '{0}{1}'.format('获取', 'StoreCon')
    except Exception as e:
        ret['status'] = False
        ret['message'] = str(e)

    return ret


@table_chose('Store_Status')
def table_Store_Status(ret, content, *args, **kwargs):
    '''
    获取Store_Status表数据
    :param ret: 
    :param content: 
    :param args: 
    :param kwargs: 
    :return: 
    '''
    try:
        objs = Store_models.Store_Status.objects.values_list(
            'id', 'NO', 'Name'
        )
        header_title = ['id', '代码', '名称']
        ret['content']['title'] = header_title
        ret['content']['value'] = list(objs)
        ret['status'] = True
        ret['message'] = '{0}{1}'.format('获取', 'Store_Status')
    except Exception as e:
        ret['status'] = False
        ret['message'] = str(e)

    return ret


@table_chose('Form_Status')
def table_Form_Status(ret, content, *args, **kwargs):
    '''
    获取Store_Status表数据
    :param ret: 
    :param content: 
    :param args: 
    :param kwargs: 
    :return: 
    '''
    try:
        objs = Store_models.Form_Status.objects.values_list(
            'id', 'NO', 'Name'
        )
        header_title = ['id', '代码', '名称']
        ret['content']['title'] = header_title
        ret['content']['value'] = list(objs)
        ret['status'] = True
        ret['message'] = '{0}{1}'.format('获取', 'Form_Status')
    except Exception as e:
        ret['status'] = False
        ret['message'] = str(e)

    return ret


@table_chose('StoreForm')
def table_StoreForm(ret, content, *args, **kwargs):
    '''
    获取StoreCon表数据
    :param ret: 
    :param content: 
    :param args: 
    :param kwargs: 
    :return: 
    '''

    try:
        if content.get('Store_id', ''):
            temp_objs = Store_models.StoreForm.objects.filter(
                OriginStore_id=content.get('Store_id', '')
            )
        else:
            temp_objs = Store_models.StoreForm.objects

        if content.get('Status_id', ''):
            temp_objs = temp_objs.filter(
                Status_id=content.get('Status_id', '')

            )
        objs = temp_objs.values_list(
            'id', 'Name', 'Status_id', 'Status__Name', 'OriginStore_id', 'OriginStore__Name', 'TargetStore_id',
            'TargetStore__Name', 'created_date', 'modified_date'
        )
        header_title = ['id', '名称', 'Status_id', '类型', 'OriginStore_id', '仓库', 'TargetStore_id', '目标仓库', '创建时间',
                        '最后修改时间']
        ret['content']['title'] = header_title
        ret['content']['value'] = list(objs)
        ret['status'] = True
        ret['message'] = '{0}{1}'.format('获取', 'StoreForm')
    except Exception as e:
        ret['status'] = False
        ret['message'] = str(e)
    return ret


@table_chose('StoreFormConPartLive')
def table_StoreFormConPartLive(ret, content, *args, **kwargs):
    '''
    获取StoreCon表数据
    :param ret: 
    :param content: 
    :param args: 
    :param kwargs: 
    :return: 
    '''
    try:
        temp_objs = Store_models.StoreFormConPartLive.objects
        if content.get('StoreForm_id', ''):
            temp_objs = Store_models.StoreFormConPartLive.objects.filter(
                StoreForm_id=content.get('StoreForm_id', '')

            )
        objs = temp_objs.values_list(
            'id', 'StoreForm_id', 'StoreForm__Name', 'StoreForm__Status__Name', 'StoreForm__OriginStore__Name',
            'PartLive_id', 'PartLive__QR_Code', 'PartLive__Part__Name', 'Number'
        )

        header_title = ['id', 'StoreForm_id', '表单名称', '表单类型', '所属仓库', 'PartLive_id', '二维码', '物料', '数量']
        ret['content']['title'] = header_title
        ret['content']['value'] = list(objs)
        ret['status'] = True
        ret['message'] = '{0}{1}'.format('获取', 'StoreFormConPartLive')
    except Exception as e:
        ret['status'] = False
        ret['message'] = str(e)

    return ret


@table_chose('ModuleInterface')
def table_ModuleInterface(ret, content, *args, **kwargs):
    content['Module_id'] = General_models.Module.objects.filter(APPName='store').first().id
    try:
        ret = general.views.table_ModuleInterface(ret, 'ModuleInterface', content)
    except Exception as e:
        ret['status'] = False
        ret['message'] = str(e)
    return ret


@actions(4000)
def action_get(ret, table, content, Store_id, *args, **kwargs):
    '''
    获取数据 get
    :param ret: 
    :param table: 
    :param action: 
    :param content: 
    :param type: 
    :param Store_id: 
    :param args: 
    :param kwargs: 
    :return: 
    '''
    try:
        f = _registered_tables[table]

    except KeyError as e:
        ret['status'] = False
        ret['message'] = str(e)
        return ret
    else:
        return f(ret, content, Store_id, type)


@actions(3000)
def action_put(ret, table, content, *args, **kwargs):
    '''
    修改数据 put
    :param ret: 
    :param table: 
    :param action: 
    :param content: 
    :param args: 
    :param kwargs: 
    :return: 
    '''
    objs = getattr(forms, '{0}{1}'.format(table, 'Form'))(content)
    if objs.is_valid():
        try:
            uuid = content.pop('uuid', None)

            getattr(Store_models, table).objects.filter(id=uuid).update(**content)

            # 当修改单据时跟新存储的最后修改时间
            if table == 'StoreForm':
                getattr(Store_models, table).objects.filter(id=uuid).update(modified_date=timezones.now())

            # 当修改单据内物料时跟新存储的最后修改时间
            if table == 'StoreFormConPartLive':
                Store_models.StoreForm.objects.filter(id=content.get('StoreForm_id', None)).update(
                    modified_date=datetime.now())

            ret['status'] = True
            ret['message'] = '{0}{1}'.format('修改数据', table)
        except Exception as e:
            ret['status'] = False
            ret['message'] = str(e)
    else:
        ret['status'] = False
        print(objs.errors.get_json_data())
        ret['errors'] = objs.errors.get_json_data()

    return ret


@actions(2000)
def action_delete(ret, table, content, *args, **kwargs):
    '''
    删数据 delete
    :param ret: 
    :param table: 
    :param action: 
    :param content: 
    :param args: 
    :param kwargs: 
    :return: 
    '''
    try:
        uuid = content.get('uuid', None)

        # 当删除单据内物料时跟新存储的最后修改时间
        if table == 'StoreFormConPartLive':
            StoreForm_id = Store_models.StoreFormConPartLive.objects.filter(id=uuid).first().StoreForm_id
            Store_models.StoreForm.objects.filter(id=StoreForm_id).update(modified_date=timezones.now())

        getattr(Store_models, table).objects.filter(id=uuid).delete()

        ret['status'] = True
        ret['message'] = '{0}{1}'.format('删除数据', table)
    except Exception as e:
        ret['status'] = False
        ret['message'] = str(e)
    return ret


@actions(1000)
def action_add(ret, table, content, *args, **kwargs):
    '''
    新增数据 add
    :param ret: 
    :param table: 
    :param action: 
    :param content: 
    :param args: 
    :param kwargs: 
    :return: 
    '''

    objs = getattr(forms, '{0}{1}'.format(table, 'Form'))(content)
    if objs.is_valid():
        try:
            import uuid
            content['id'] = uuid.uuid4()
            getattr(Store_models, table).objects.create(**content)

            # 当新增单据内物料时跟新存储的最后修改时间
            if table == 'StoreFormConPartLive':
                Store_models.StoreForm.objects.filter(id=content.get('StoreForm_id', None)).update(
                    modified_date=timezones.now())

            ret['status'] = True
            ret['message'] = '{0}{1}'.format('添加数据', table)
        except Exception as e:
            ret['status'] = False
            ret['message'] = str(e)
    else:
        ret['status'] = False
        print(objs.errors.get_json_data())
        ret['errors'] = objs.errors.get_json_data()

    return ret


def action_store_json(request):
    '''
    
    :param request: 
    :return: 
    '''
    if request.method == 'GET':
        pass
    if request.method == 'POST':
        ret = {'status': None, 'message': None, 'errors': None, 'content': {}}
        val = json.loads(request.body.decode('utf8'))
        content = val.get('content', None)
        action = val.get('action', None)
        table = val.get('table', None)
        Store_id = content.get('Store_id', None)

        # 进行权限判断
        if general.functions.general_has_authority(request, '/store/'):
            try:
                f = _registered_actions[action]
            except KeyError as e:
                ret['status'] = False
                ret['message'] = str(e)
            else:

                ret = f(ret, table, content, Store_id)
        else:
            try:
                ret['message'] = General_models.Message.objects.filter(NO='005').first().Content
            except Exception as e:
                ret['message'] = str(e)

        return HttpResponse(json.dumps(ret, cls=Encoder), content_type='application/json')
