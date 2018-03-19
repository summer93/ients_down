# 模块的功能
from django.shortcuts import render, redirect, HttpResponse
from datetime import datetime, timezone, timedelta
from store import models as Store_models
from org import models as org_models
from general import models as general_models
from org import views

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


# 处理uuid对象不能直接被序列号
class UUIDEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, uuid.UUID):
            return str(obj)
        return json.JSONEncoder.default(self, obj)


# 构造显示组织机构所需数据
def show_node(Head_id):
    '''
    构造显示组织机构需要的数据
    :param Head_id:
    :return:
    '''

    temp = {
        'id': Head_id,
        'name': org_models.Department.objects.filter(id=Head_id).first().Name,
        'pid': None,
        'childrens': []
    }

    def tree_traversal(temp):
        val = org_models.Department_Con.objects.filter(Head_id=temp['id']).values('Leef_id')

        # 循环所有的Leef
        for row in val:
            arg = {
                'id': row['Leef_id'],
                'name': org_models.Department.objects.filter(id=row['Leef_id']).first().Name,
                'pid': temp['id'],
                'childrens': []
            }
            # 将Leef添加到Head的childrens里
            temp['childrens'].append(arg)

            # 判断该Leef是否存在childrens
            if org_models.Department_Con.objects.filter(Head_id=row['Leef_id']):
                # 进行递归
                val = org_models.Department_Con.objects.filter(Head_id=row['Leef_id']).values('Leef_id')
                tree_traversal(arg)

    tree_traversal(temp)
    res = {'data': []}
    res['data'].append(temp)
    return res


# 设置组织机构

@actions('ZG-F-01-01')
def add_department_con(ret, content, *args, **kwargs):
    '''
    增加组织机构
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    return views.action_add(ret, 'Department_Con', content)


@actions('ZG-F-01-02')
def delete_department_con(ret, content, *args, **kwargs):
    '''
    删除组织机构
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    return views.action_delete(ret, 'Department_Con', content)


@actions('ZG-F-01-03')
def put_department_con(ret, content, *args, **kwargs):
    '''
    修改组织机构
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    return views.action_put(ret, 'Department_Con', content)


@actions('ZG-F-01-04')
def get_department_con(ret, content, *args, **kwargs):
    '''
    # 返回显示组织机构所需数据
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''

    Department_id = content.get('Department_id', None)

    try:
        ret['content'] = show_node(Department_id)
        ret['status'] = True
    except Exception as e:
        ret['status'] = False
        ret['message'] = str(e)

    return ret


# 设置公司权限

@actions('ZG-F-02-01')
def add_authority_company(ret, content, *args, **kwargs):
    '''
    增加公司权限
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    return views.action_add(ret, 'AuthorityCompany', content)


@actions('ZG-F-02-02')
def delete_authority_company(ret, content, *args, **kwargs):
    '''
    删除公司权限
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    return views.action_delete(ret, 'AuthorityCompany', content)


@actions('ZG-F-02-03')
def put_authority_company(ret, content, *args, **kwargs):
    '''
    修改公司权限
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    return views.action_put(ret, 'AuthorityCompany', content)


@actions('ZG-F-02-04')
def get_authority_company(ret, content, *args, **kwargs):
    '''
    查看公司权限
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    return views.action_get(ret, 'AuthorityCompany', content)


# 设置角色权限

@actions('ZG-F-03-01')
def add_authority_role(ret, content, *args, **kwargs):
    '''
    增加角色权限
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    return views.action_add(ret, 'AuthorityRole', content)


@actions('ZG-F-03-02')
def delete_authority_role(ret, content, *args, **kwargs):
    '''
    删除角色权限
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    return views.action_delete(ret, 'AuthorityRole', content)


@actions('ZG-F-03-03')
def put_authority_role(ret, content, *args, **kwargs):
    '''
    修改角色权限
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    return views.action_put(ret, 'AuthorityRole', content)


@actions('ZG-F-03-04')
def get_authority_role(ret, content, *args, **kwargs):
    '''
    查看角色权限
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    return views.action_get(ret, 'AuthorityRole', content)


# 设置用户权限

@actions('ZG-F-04-01')
def add_authority_user(ret, content, *args, **kwargs):
    '''
    增加用户权限
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    return views.action_add(ret, 'AuthorityUser', content)


@actions('ZG-F-04-02')
def delete_authority_user(ret, content, *args, **kwargs):
    '''
    删除用户权限
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    return views.action_delete(ret, 'AuthorityUser', content)


@actions('ZG-F-04-03')
def put_authority_user(ret, content, *args, **kwargs):
    '''
    修改用户权限
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    return views.action_put(ret, 'AuthorityUser', content)


@actions('ZG-F-04-04')
def get_authority_user(ret, content, *args, **kwargs):
    '''
    查看用户权限
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    return views.action_get(ret, 'AuthorityUser', content)


# 设置部门权限

@actions('ZG-F-05-01')
def add_authority_department(ret, content, *args, **kwargs):
    '''
    增加部门权限
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''

    return views.action_add(ret, 'AuthorityDepartment', content)


@actions('ZG-F-05-02')
def delete_authority_department(ret, content, *args, **kwargs):
    '''
    删除岗位权限
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    return views.action_delete(ret, 'AuthorityDepartment', content)


@actions('ZG-F-05-03')
def put_authority_department(ret, content, *args, **kwargs):
    '''
    修改岗位权限
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    return views.action_put(ret, 'AuthorityDepartment', content)


@actions('ZG-F-05-04')
def get_authority_department(ret, content, *args, **kwargs):
    '''
    查看公司权限
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    return views.action_get(ret, 'AuthorityDepartment', content)


# 设置部门

@actions('ZG-F-06-01')
def add_department(ret, content, *args, **kwargs):
    '''
    增加部门
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    return views.action_add(ret, 'Department', content)


@actions('ZG-F-06-02')
def delete_department(ret, content, *args, **kwargs):
    '''
    删除部门
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    return views.action_delete(ret, 'Department', content)


@actions('ZG-F-06-03')
def put_department(ret, content, *args, **kwargs):
    '''
    修改部门
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    return views.action_put(ret, 'Department', content)


@actions('ZG-F-06-04')
def get_department(ret, content, *args, **kwargs):
    '''
    查看部门
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    return views.action_get(ret, 'Department', content)


# 部门内账户操作

@actions('ZG-F-07-01')
def department_user_add(ret, content, *args, **kwargs):
    '''
    为某部门添加账户
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    return views.action_add(ret, 'User_Con_Department', content)


@actions('ZG-F-07-02')
def department_user_delete(ret, content, *args, **kwargs):
    '''
    删除某部门账户
    :param ret:
    :param content:icon-cog101
    :param args:
    :param kwargs:
    :return:
    '''
    User_Con_Department_content = {}
    User_Con_Role_content = {}

    User_Con_Department_content['uuid'] = content.pop('User_Con_Department_id')
    User_Con_Role_content['uuid'] = content.pop('User_Con_Role_id')
    views.action_delete(ret, 'User_Con_Role', User_Con_Role_content)
    return views.action_delete(ret, 'User_Con_Department', User_Con_Department_content)


@actions('ZG-F-07-04')
def department_user_add(ret, content, *args, **kwargs):
    '''
    获取某部门账户
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''

    try:

        User_list = views.action_get(ret, 'User_Con_Department', content)['content']['value']

        objs = []
        for row in list(User_list):
            temp = org_models.User_Con_Role.objects.filter(User_id=row[1]).values('Role__Name', 'id')
            if temp:
                objs.extend(
                    [(row[0], row[1], row[2], temp[0]['id'], temp[0]['Role__Name']), ]
                )
            else:
                objs.extend(
                    [(row[0], row[1], row[2], None, None), ]
                )

        header_title = ['id', 'User_id', '用户名', 'User_Con_Role_id', '岗位']

        ret['status'] = True
        ret['message'] = '{0}{1}'.format('获取', 'Department_Con_User')
        ret['content']['title'] = header_title
        ret['content']['value'] = list(objs)
    except Exception as e:
        ret['status'] = False
        ret['message'] = str(e)
    return ret


# 设置岗位

@actions('ZG-F-08-01')
def add_role(ret, content, *args, **kwargs):
    '''
    增加岗位
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    return views.action_add(ret, 'Role', content)


@actions('ZG-F-08-02')
def delete_role(ret, content, *args, **kwargs):
    '''
    删除岗位
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    return views.action_delete(ret, 'Role', content)


@actions('ZG-F-08-03')
def put_role(ret, content, *args, **kwargs):
    '''
    修改岗位
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    return views.action_put(ret, 'Role', content)


@actions('ZG-F-08-04')
def get_role(ret, content, *args, **kwargs):
    '''
    查看岗位
    :param ret:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    return views.action_get(ret, 'Role', content)


def modify_content(action,content,Company_id):
    '''

    :param action:
    :param content:
    :param Company_id:
    :return:
    '''
    if action.startswith('ZG-F-01'):

        if action == 'ZG-F-01-04':

            content['Department_id'] = org_models.Department.objects.filter(
                Company__id=Company_id,
                is_First=True
            ).first().id
        else:
            pass

    elif action.startswith('ZG-F-06'):
        content['Company_id'] = Company_id
    elif action.startswith('ZG-F-08'):
        content['Company_id'] = Company_id

    elif action == 'ZG-F-03-04':
        content['Role__Company_id'] = Company_id

    elif action == 'ZG-F-04-04':
        content['Company_id'] = Company_id
    elif action == 'ZG-F-05-04':
        content['Department__Company_id'] = Company_id
    else:
        pass

    return content





def ZG_F_Json(request):
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
        if general.functions.general_has_authority(request, '/org/ZG_F/'):

            if request.session['Account_Type'] == '1':
                pass
            else:
                Company_id = request.session['Company_id']
                content = modify_content(action,content,Company_id)
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
