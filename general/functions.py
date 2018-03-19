from org import models as org_models
import json

_registered_choices = {}


# 装饰器, 将权限判断名称存入dict
def choices(name):
    def decorator(f):
        _registered_choices[name] = f
        return f

    return decorator


# 添加用户对具体module对象的操作判断
@choices('authority_model')
def authority_model(Authority_URL, action, Authority_NO_list):
    '''

    :param Authority_URL:
    :param action:
    :param Authority_NO_list:
    :return:
    '''

    status = False

    if action == 4000:

        status = True

    elif action == 3000:
        for row in ['4', '6', '5', '7']:
            if ''.join([Authority_URL, row]) in Authority_NO_list:
                status = True

    elif action == 2000:
        for row in ['2', '6', '3', '7']:
            if ''.join([Authority_URL, row]) in Authority_NO_list:
                status = True

    elif action == 1000:
        for row in ['1', '3', '5', '7']:
            if ''.join([Authority_URL, row]) in Authority_NO_list:
                status = True

    return status


# 对操作单据权限进行判断
@choices('CG-T')
def authority_order(_module, _action, _Status__NO, Authority_list, Authority_NO_list):
    '''

    :param _module:
    :param _action:
    :param _Status__NO:
    :param Authority_list:
    :param Authority_NO_list:
    :return:
    '''

    Authority_URL = ''.join([_module, 'Store_', _Status__NO, 'Order/'])
    status = False

    if _action[-2:] == '04':

        status = True

    elif _action[-2:] == '03':
        for row in ['4', '6', '5', '7']:
            if ''.join([Authority_URL, row]) in Authority_NO_list:
                status = True

    elif _action[-2:] == '02':
        for row in ['2', '6', '3', '7']:
            if ''.join([Authority_URL, row]) in Authority_NO_list:
                status = True

    elif _action[-2:] == '01':
        for row in ['1', '3', '5', '7']:
            if ''.join([Authority_URL, row]) in Authority_NO_list:
                status = True

    return status


# 对单据功能进行判断
@choices('CG-F')
def authority_order_f(_module, _action, _Status__NO, Authority_list, Authority_NO_list):
    '''

    :param _module:
    :param _action:
    :param _Status__NO:
    :param Authority_list:
    :param Authority_NO_list:
    :return:
    '''
    # ......
    return True


# 对单据职能进行权限判断(收货, 退货, 入库, 出库)
@choices('CG-R')
def authority_order_r(_module, _action, _Status__NO, Authority_list, Authority_NO_list):
    '''

    :param _module:
    :param _action:
    :param _Status__NO:
    :param Authority_list:
    :param Authority_NO_list:
    :return:
    '''

    Authority_URL = ''.join([_module, _action, '/'])
    if Authority_URL in Authority_list:
        return True
    else:
        return False


# 对org/api中ZG-F进行权限判断
@choices('ZG-F')
def authority_org_f(_module, _action, _Status__NO, Authority_list, Authority_NO_list):
    '''

    :param _module:
    :param _action:
    :param _Status__NO:
    :param Authority_list:
    :param Authority_NO_list:
    :return:
    '''
    Authority_URL = ''.join([_module, _action, '/'])
    if Authority_URL in Authority_list:
        return True
    else:
        return False


# 对org/api中ZG-R进行权限判断
@choices('ZG-R')
def authority_org_r(_module, _action, _Status__NO, Authority_list, Authority_NO_list):
    '''

    :param _module:
    :param _action:
    :param _Status__NO:
    :param Authority_list:
    :param Authority_NO_list:
    :return:
    '''

    Authority_URL = ''.join([_module, _action, '/'])
    if Authority_URL in Authority_list:
        return True
    else:
        return False


def general_has_authority(request, _module):
    '''
    账户权限判断
    :param request:
    :param _module:
    :return:
    '''

    val = json.loads(request.body.decode('utf8'))

    _action = val.get('action', '')
    Authority_list = request.session['Authority_list']
    Authority_NO_list = request.session['Authority_NO_list']

    # 进行权限判断
    if _module in Authority_list:
        # 判断action是否为数字(1000,2000,3000,4000,) 如果为数字则为对module对象操作
        if str(_action).isdigit():
            # 添加用户对具体module对象的操作判断
            # .......
            _table = val.get('table', None)
            Authority_URL = ''.join([_module, 'objects/', _table, '/'])

            try:
                if Authority_URL in Authority_list:
                    return authority_model(Authority_URL, _action, Authority_NO_list)
                else:
                    return False
            except Exception as e:
                return False

        # 对各api权限进行判断
        else:
            choice = _action[:4]
            content = val.get('content', None)
            _Status__NO = content.get('Status__NO', None) if content else None
            try:
                f = _registered_choices[choice]
            except KeyError as e:
                ret = False
            else:
                ret = f(_module, _action, _Status__NO, Authority_list, Authority_NO_list)
            return ret

    else:
        return False
