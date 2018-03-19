# 模块的表单
from django.shortcuts import render, redirect, HttpResponse
from datetime import datetime, timezone, timedelta
from general import models as general_models
from store import models as Store_models
from store import views
import general.functions
import org
import uuid
import json

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


# 操作表单

@actions('CG-T-01-01')
def add_Order(ret, content):
    '''
    添加表单
    :param ret: 
    :param content: 
    :param Store_id: 
    :return: 
    '''

    content['Status_id'] = Store_models.Form_Status.objects.filter(NO=content.pop('Status__NO', None)).first().id
    ret = views.action_add(ret, 'StoreForm', content)

    return ret


@actions('CG-T-01-02')
def delete_Order(ret, content):
    '''
    删除表单
    :param ret: 
    :param content: 
    :param Store_id: 
    :return: 
    '''
    ret = views.action_delete(ret, 'StoreForm', content)
    return ret


@actions('CG-T-01-03')
def edit_Order(ret, content):
    '''
    修改表单
    :param ret: 
    :param content: 
    :param Store_id: 
    :return: 
    '''

    content['Status_id'] = Store_models.Form_Status.objects.filter(NO=content.pop('Status__NO', None)).first().id
    ret = views.action_put(ret, 'StoreForm', content)
    return ret


@actions('CG-T-01-04')
def show_Order(ret, content):
    '''
    获取表单
    :param ret: 
    :param content: 
    :param Store_id: 
    :return: 
    '''

    content['Status_id'] = Store_models.Form_Status.objects.filter(NO=content.pop('Status__NO', None)).first().id
    return views.table_StoreForm(ret, content)


# 操作表单具体内容

@actions('CG-T-02-01')
def add_Order_content(ret, content):
    '''
    增加表单物料
    :param ret: 
    :param content: 
    :param Store_id: 
    :return: 
    '''
    content.pop('Status__NO', None)
    return views.action_add(ret, 'StoreFormConPartLive', content)


@actions('CG-T-02-02')
def delete_Order_content(ret, content):
    '''
    删除表单某条物料
    :param ret: 
    :param content: 
    :param Store_id: 
    :return: 
    '''
    content.pop('Status__NO', None)
    return views.action_delete(ret, 'StoreFormConPartLive', content, )


@actions('CG-T-02-03')
def put_Order_content(ret, content):
    '''
    更新表单某条物料
    :param ret: 
    :param content: 
    :param Store_id: 
    :return: 
    '''
    content.pop('Status__NO', None)
    return views.action_put(ret, 'StoreFormConPartLive', content, )


@actions('CG-T-02-04')
def get_Order_content(ret, content):
    '''
    获取表单具体物料内容
    :param ret: 
    :param content: 
    :param Store_id: 
    :return: 
    '''
    content.pop('Status__NO', None)
    return views.table_StoreFormConPartLive(ret, content)


def modify_content(action,content,Store_id):
    '''

    :param action:
    :param content:
    :param Store_id:
    :return:
    '''
    if action == 'CG-T-01-01' or action == 'CG-T-01-03':
        content['OriginStore_id'] = Store_id
    elif action == 'CG-T-01-04' or action == 'CG-T-01-02':
        content['Store_id'] = Store_id
    else:
        pass
    return content




def CG_T_Json(request):
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

        # 进行权限判断
        if general.functions.general_has_authority(request, '/store/CG_T/'):

            # 判断账户类型
            if request.session['Account_Type'] == '1':
                pass
            # 如果账户是普通账户则显示所在公司仓库资料
            else:
                Store_id = Store_models.Store.objects.filter(Company__id=request.session['Company_id'],
                                                             Status__NO='002').first().id
                content = modify_content(action,content,Store_id)
            try:
                f = _registered_actions[action]
            except KeyError as e:
                ret['status'] = False
                ret['message'] = str(e)
            else:
                ret = f(ret, content)
        else:
            ret['status'] = False
            ret['message'] = general_models.Message.objects.filter(NO='005').first().Content

        return HttpResponse(json.dumps(ret, cls=Encoder), content_type='application/json')
