# 模块的功能
from django.shortcuts import render, redirect, HttpResponse
from datetime import datetime, timezone, timedelta
from store import models as Store_models
from general import models as general_models
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


@actions('CG-F-01-01')
def add_Store(ret, content, Store_id):
    '''
    入库操作
    :param ret: 
    :param content: 
    :param Store_id: 
    :param R_Store_id: 
    :param args: 
    :param kwargs: 
    :return: 
    '''
    R_Store_id = Store_models.StoreCon.objects.filter(Head_id=Store_id, Last__Status__NO='001').first().Last_id
    PartLive_id = content.get('PartLive_id', None)
    try:
        Number = int(content.get('Number', None))
    except Exception as e:
        return 1

    objs = Store_models.StoreConPartLive.objects.filter(Store_id=Store_id,
                                                        PartLive_id=PartLive_id,
                                                        )
    temp_objs = Store_models.StoreConPartLive.objects.filter(Store_id=R_Store_id,
                                                             PartLive_id=PartLive_id,
                                                             )
    objs_Number = getattr(objs.first(), 'Number', 0).__int__()
    temp_objs_Number = getattr(temp_objs.first(), 'Number', 0).__int__()
    # 判断临时库是否存在
    if temp_objs:
        # 临时库存数量大于等于入库单数量进行下一步操作
        if temp_objs_Number >= Number:
            # 判断仓库中是否已经存在该物料，存在加数量，不存在添加
            if objs:
                objs.update(Number=objs_Number + Number)
            else:
                content['Number'] = Number
                content['Store_id'] = Store_id

                res = views.action_add(ret, 'StoreConPartLive', content)

            # 如果临时库存数量等于入库单数量，删除临时库存中该物料对象
            if temp_objs_Number == Number:
                temp_objs.delete()
            else:
                temp_objs.update(Number=temp_objs_Number - Number)
            return 0

        else:
            # 该物料数量不够
            return 2
    else:
        # 不存在该库存物料
        return 3


@actions('CG-F-02-01')
def add_TempStore(ret, content, Store_id):
    '''
    入临时库操作
    :param ret: 
    :param content: 
    :param Store_id: 
    :param R_Store_id: 
    :param args: 
    :param kwargs: 
    :return: 
    '''
    R_Store_id = Store_models.StoreCon.objects.filter(Head_id=Store_id, Last__Status__NO='001').first().Last_id
    PartLive_id = content.get('PartLive_id', None)

    try:
        Number = int(content.get('Number', None))
    except Exception as e:
        return 1

    temp_objs = Store_models.StoreConPartLive.objects.filter(Store_id=R_Store_id,
                                                             PartLive_id=PartLive_id,
                                                             )
    temp_objs_Number = getattr(temp_objs.first(), 'Number', 0).__int__()

    # 判断仓库中是否已经存在该物料，存在加数量，不存在添加
    if temp_objs:
        temp_objs.update(Number=temp_objs_Number + Number)
    else:
        content['Number'] = Number
        content['Store_id'] = R_Store_id
        content['id'] = uuid.uuid4()
        Store_models.StoreConPartLive.objects.create(**content)

    return 0


@actions('CG-F-01-02')
def del_Store(ret, content, Store_id):
    '''
    出库操作
    :param ret: 
    :param content: 
    :param Store_id: 
    :param R_Store_id: 
    :param args: 
    :param kwargs: 
    :return: 
    '''
    PartLive_id = content.get('PartLive_id', None)
    try:
        Number = int(content.get('Number', None))
    except Exception as e:
        return 1

    objs = Store_models.StoreConPartLive.objects.filter(Store_id=Store_id,
                                                        PartLive_id=PartLive_id,
                                                        )

    objs_Number = getattr(objs.first(), 'Number', 0).__int__()
    # 判断仓库是否存在
    if objs:
        # 库存数量大于等于退货单数量进行下一步操作
        if objs_Number >= Number:
            objs.update(Number=objs_Number - Number)
            # 如果库存数量等于入库单数量，删除临时库存中该物料对象
            if objs_Number == Number:
                objs.delete()
            return 0
        else:
            # 该物料数量不够
            return 2

    else:
        # 不存在该库存物料
        return 3


@actions('CG-F-02-02')
def del_TempStore(ret, content, Store_id):
    '''
    出临时库操作
    :param ret: 
    :param content: 
    :param Store_id: 
    :param R_Store_id: 
    :param args: 
    :param kwargs: 
    :return: 
    '''
    R_Store_id = Store_models.StoreCon.objects.filter(Head_id=Store_id, Last__Status__NO='001').first().Last_id
    PartLive_id = content.get('PartLive_id', None)
    try:
        Number = int(content.get('Number', None))
    except Exception as e:
        return 1

    temp_objs = Store_models.StoreConPartLive.objects.filter(Store_id=R_Store_id,
                                                             PartLive_id=PartLive_id,
                                                             )

    temp_objs_Number = getattr(temp_objs.first(), 'Number', 0).__int__()
    # 判断临时库是否存在
    if temp_objs:
        # 临时库存数量大于等于退货单数量进行下一步操作
        if temp_objs_Number >= Number:
            temp_objs.update(Number=temp_objs_Number - Number)
            # 如果临时库存数量等于入库单数量，删除临时库存中该物料对象
            if temp_objs_Number == Number:
                temp_objs.delete()
            return 0
        else:
            # 该物料数量不够
            return 2

    else:
        # 不存在该库存物料
        return 3


@actions('CG-F-01-03')
def show_Store(ret, content, Store_id):
    '''
    获取库存数据
    :param ret: 
    :param content: 
    :param Store_id: 
    :param R_Store_id: 
    :param type: 
    :param args: 
    :param kwargs: 
    :return: 
    '''
    return views.table_StoreConPartLive(ret, content, Store_id)


@actions('CG-F-02-03')
def show_TempStore(ret, content, Store_id):
    '''
    获取临时库存数据
    :param ret: 
    :param content: 
    :param Store_id: 
    :param R_Store_id:  
    :param type:      
    :param args: 
    :param kwargs: 
    :return: 
    '''
    R_Store_id = Store_models.StoreCon.objects.filter(Head_id=Store_id, Last__Status__NO='001').first().Last_id
    return views.table_StoreConPartLive(ret, content, R_Store_id)


# 编辑物料
@actions('CG-F-03-01')
def add_PartLive(ret, content, Store_id):
    '''
    添加物料
    :param ret:
    :param content:
    :param Store_id:
    :return:
    '''
    content['Store_id'] = Store_id
    ret = views.action_add(ret, 'StoreConPartLive', content)
    return ret


@actions('CG-F-03-02')
def delete_PartLive(ret, content, Store_id):
    '''
    删除物料
    :param ret:
    :param content:
    :param Store_id:
    :return:
    '''
    ret = views.action_delete(ret, 'StoreConPartLive', content)
    return ret


@actions('CG-F-03-03')
def put_PartLive(ret, content, Store_id):
    '''
    修改物料
    :param ret:
    :param content:
    :param Store_id:
    :return:
    '''
    content['Store_id'] = Store_id
    ret = views.action_put(ret, 'StoreConPartLive', content)
    return ret


@actions('CG-F-03-04')
def get_PartLive(ret, content, Store_id):
    '''
    获取物料
    :param ret:
    :param content:
    :param Store_id:
    :return:
    '''

    ret = views.action_get(ret, 'StoreConPartLive', content, Store_id)

    return ret


def CG_F_Json(request):
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
        if general.functions.general_has_authority(request, '/store/CG_F/'):

            if request.session['Account_Type'] == '1':
                Store_id = val.get('Store_id', None)

            else:
                Store_id = Store_models.Store.objects.filter(
                    Company__id=request.session['Company_id'],
                    Status__NO='002'
                ).first().id

            try:
                f = _registered_actions[action]
            except KeyError as e:
                ret['status'] = False
                ret['message'] = str(e)
            else:
                val = f(ret, content, Store_id)
                if action == 'CG-F-01-01' or action == 'CG-F-02-01':
                    ret['status'] = True
                    ret['message'] = val
                else:
                    ret = val
        else:
            ret['status'] = False
            ret['message'] = general_models.Message.objects.filter(NO='005').first().Content

        return HttpResponse(json.dumps(ret, cls=Encoder), content_type='application/json')
