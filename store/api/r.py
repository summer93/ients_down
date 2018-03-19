# 模块的职能
from django.shortcuts import render, redirect, HttpResponse
from datetime import datetime, timezone, timedelta
from store import models as Store_models
from general import models as general_models
from store.api import f
import general.functions
import json
import uuid
import org

# 存储操作名称和函数直接对应关系
_registered_actions = {}


# 装饰器, 将操作名称存入dict
def actions(name):
    def decorator(f):
        _registered_actions[name] = f

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


@actions('CG-R-01')
def CG_R_01(ret, content):
    '''
    收货
    :param ret: 
    :param content: 
    :param Store_id: 
    :param R_Store_id: 
    :param args: 
    :param kwargs: 
    :return: 
    '''

    PartLive_list = Store_models.StoreFormConPartLive.objects.filter(**content).values('PartLive_id', 'Number')
    Store_id = Store_models.StoreForm.objects.filter(id=content.pop('StoreForm_id')).first().OriginStore

    ret_list = []
    for row in PartLive_list:
        val = f.add_TempStore(ret, row, Store_id)
        ret_list.append(val)
    return ret_list


@actions('CG-R-02')
def CG_R_02(ret, content):
    '''
    退货
    :param ret: 
    :param content: 
    :param Store_id: 
    :param R_Store_id: 
    :param args: 
    :param kwargs: 
    :return: 
    '''
    PartLive_list = Store_models.StoreFormConPartLive.objects.filter(**content).values('PartLive_id', 'Number')
    Store_id = Store_models.StoreForm.objects.filter(id=content.pop('StoreForm_id')).first().OriginStore
    ret_list = []
    for row in PartLive_list:
        val = f.del_TempStore(ret, row, Store_id)
        ret_list.append(val)
    return ret_list


@actions('CG-R-03')
def CG_R_03(ret, content):
    '''
    入库
    :param ret: 
    :param content: 
    :param Store_id: 
    :param R_Store_id: 
    :param args: 
    :param kwargs: 
    :return: 
    '''
    PartLive_list = Store_models.StoreFormConPartLive.objects.filter(**content).values('PartLive_id', 'Number')
    Store_id = Store_models.StoreForm.objects.filter(id=content.pop('StoreForm_id')).first().OriginStore
    ret_list = []
    for row in PartLive_list:
        val = f.add_Store(ret, row, Store_id)
        ret_list.append(val)
    return ret_list


@actions('CG-R-04')
def CG_R_04(ret, content):
    '''
    出货
    :param ret: 
    :param content: 
    :param Store_id: 
    :param R_Store_id: 
    :param args: 
    :param kwargs: 
    :return: 
    '''

    PartLive_list = Store_models.StoreFormConPartLive.objects.filter(**content).values('PartLive_id', 'Number')
    Store_id = Store_models.StoreForm.objects.filter(id=content.pop('StoreForm_id')).first().OriginStore
    ret_list = []
    for row in PartLive_list:
        val = f.del_Store(ret, row, Store_id)
        ret_list.append(val)
    return ret_list


def CG_R_Json(request):
    '''

    :param request: 
    :return: 
    '''
    if request.method == 'GET':
        pass
    if request.method == 'POST':
        ret = {'status': None, 'message': [], 'errors': None, 'content': {}}
        val = json.loads(request.body.decode('utf8'))
        content = val.get('content', None)
        action = val.get('action', None)

        # 进行权限判断
        if general.functions.general_has_authority(request, '/store/CG_R/'):
            try:
                f = _registered_actions[action]
            except KeyError as e:
                ret['status'] = False
                ret['message'] = str(e)
            else:
                val = f(ret, content)
                ret['status'] = True
                ret['message'] = val

        else:
            ret['status'] = False
            ret['message'] = general_models.Message.objects.filter(NO='005').first().Content

        return HttpResponse(json.dumps(ret, cls=Encoder), content_type='application/json')
