# 模块的功能
from django.shortcuts import render, redirect, HttpResponse
from general import models as general_models
from org import models as org_models
from org import views
import general.functions
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


# 处理uuid对象不能直接被序列号
class UUIDEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, uuid.UUID):
            return str(obj)
        return json.JSONEncoder.default(self, obj)


@actions('ZG-R-01-03')
def user_profile(ret, content, *args, **kwargs):
    '''
    修改账户详细信息
    user_settings
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''

    password = content.pop('password')
    password2 = content.pop('password2')
    User_id = content.pop('User_id')
    ret['errors'] = {'password2': [{'message': '两次密码输入不正确!!!', 'code': ''}]}
    if password or password2:
        if password == password2:
            User_obj = org_models.User.objects.filter(id=User_id).first()
            User_obj.set_password(password2)
            User_obj.save()
        else:
            return ret

    return views.action_put(ret, 'User', content)


@actions('ZG-R-02-01')
def user_role_add(ret, content, *args, **kwargs):
    '''
    添加账户角色
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    return views.action_add(ret, 'User_Con_Role', content)


@actions('ZG-R-02-02')
def user_role_delete(ret, content, *args, **kwargs):
    '''
    删除账户角色
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    return views.action_delete(ret, 'User_Con_Role', content)


@actions('ZG-R-02-03')
def user_role_put(ret, content, *args, **kwargs):
    '''
    修改账户角色
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    return views.action_put(ret, 'User_Con_Role', content)


@actions('ZG-R-02-04')
def user_role_get(ret, content, *args, **kwargs):
    '''
    查看账户角色
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    return views.action_get(ret, 'User_Con_Role', content)


@actions('ZG-R-03-01')
def user_add(ret, content, *args, **kwargs):
    '''
    添加用户
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    return views.action_add(ret, 'User_Con_Company', content)


@actions('ZG-R-04-01')
def role_department_add(ret, content, *args, **kwargs):
    '''
    添加部门岗位
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    return views.action_add(ret, 'Role_Con_Department', content)


@actions('ZG-R-04-02')
def role_department_delete(ret, content, *args, **kwargs):
    '''
    删除部门岗位
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    return views.action_delete(ret, 'Role_Con_Department', content)


@actions('ZG-R-04-03')
def role_department_put(ret, content, *args, **kwargs):
    '''
    修改部门岗位
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    return views.action_put(ret, 'Role_Con_Department', content)


@actions('ZG-R-04-04')
def role_department_get(ret, content, *args, **kwargs):
    '''
    获取部门岗位
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''

    return views.action_get(ret, 'Role_Con_Department', content)


def modify_content(action, content, Company_id):
    '''

    :param action:
    :param content:
    :param Company_id:
    :return:
    '''
    if action.startswith('ZG-R-02-04'):
        content['Role__Company_id'] = Company_id
    elif action.startswith('ZG-R-04-04'):
        content['Role__Company_id'] = Company_id
    elif action.startswith('ZG-R-03-01'):
        content['Company_id'] = Company_id
    else:
        pass

    return content


def ZG_R_Json(request):
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
        if general.functions.general_has_authority(request, '/org/ZG_R/'):

            # 判断账户类型
            if request.session['Account_Type'] == '1':
                pass
            else:
                Company_id = request.session['Company_id']
                content = modify_content(action, content, Company_id)

            try:
                f = _registered_actions[action]
            except KeyError as e:
                ret['status'] = False
                ret['message'] = str(e)
            else:
                ret = f(ret, content)
        else:
            try:
                ret['message'] = general_models.Message.objects.filter(NO='005').first().Content
            except Exception as e:
                ret['message'] = str(e)
        return HttpResponse(json.dumps(ret, cls=UUIDEncoder), content_type='application/json')
