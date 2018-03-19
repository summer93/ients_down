from django.shortcuts import render, redirect, HttpResponse
from rest_framework import viewsets
from general.functions import general_has_authority
from django.contrib.auth.decorators import login_required
from org.serializers import *
from org import models as org_models
from general import models as general_models
from org import forms
import general.views
import json
import general


# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class CompanyViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


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


# 处理uuid对象不能直接被序列号
class UUIDEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, uuid.UUID):
            return str(obj)
        return json.JSONEncoder.default(self, obj)


# 展示org模块各页面
@login_required(login_url='/general/login/')
def company(request):
    return render(request, 'company.html')


@login_required(login_url='/general/login/')
def department(request):
    Company_objs = org_models.Company.objects.values(
        'id', 'Name'
    )
    return render(request, 'department.html', {
        'Company_objs': Company_objs
    })


@login_required(login_url='/general/login/')
def department_con(request):
    Department_objs = org_models.Department.objects.values(
        'id', 'Company__Name', 'Name'
    )
    Company_objs = org_models.Company.objects.values(
        'id', 'Name'
    )

    return render(request, 'department_con.html', {
        'Department_objs': Department_objs,
        'Company_objs': Company_objs
    })


@login_required(login_url='/general/login/')
def account_type(request):
    return render(request, 'account_type.html', {

    })


@login_required(login_url='/general/login/')
def role(request):
    Company_objs = org_models.Company.objects.values(
        'id', 'Name'
    )
    Account_Type_objs = org_models.Account_Type.objects.values(
        'id', 'Name'
    )
    return render(request, 'role.html', {
        'Company_objs': Company_objs,
        'Account_Type_objs': Account_Type_objs
    })


@login_required(login_url='/general/login/')
def user(request):
    return render(request, 'user.html', {

    })


@login_required(login_url='/general/login/')
def authority_company(request):
    Company_objs = org_models.Company.objects.values(
        'id', 'Name'
    )
    ModuleMenu_objs = general_models.ModuleMenu.objects.values(
        'id', 'URL'
    )
    return render(request, 'authority_company.html', {
        'Company_objs': Company_objs,
        'ModuleMenu_objs': ModuleMenu_objs
    })

def authority_department(request):
    Department_objs = org_models.Department.objects.values(
        'id', 'Name'
    )
    ModuleMenu_objs = general_models.ModuleMenu.objects.values(
        'id', 'URL'
    )
    return render(request, 'authority_department.html', {
        'Department_objs': Department_objs,
        'ModuleMenu_objs': ModuleMenu_objs
    })


@login_required(login_url='/general/login/')
def authority_role(request):
    Role_objs = org_models.Role.objects.values(
        'id', 'Company__Name', 'Name'
    )
    ModuleMenu_objs = general_models.ModuleMenu.objects.values(
        'id', 'URL'
    )
    return render(request, 'authority_role.html', {

        'Role_objs': Role_objs,
        'ModuleMenu_objs': ModuleMenu_objs

    })


@login_required(login_url='/general/login/')
def authority_user(request):
    UserConCompany_objs = org_models.User_Con_Company.objects.values(
        'id', 'User_id', 'User__username', 'Company__Name'
    )
    ModuleMenu_objs = general_models.ModuleMenu.objects.values(
        'id', 'URL'
    )
    return render(request, 'authority_user.html', {

        'UserConCompany_objs': UserConCompany_objs,
        'ModuleMenu_objs': ModuleMenu_objs

    })


@login_required(login_url='/general/login/')
def user_con_company(request):
    Company_objs = org_models.Company.objects.values(
        'id', 'Name'
    )
    User_objs = org_models.User.objects.values(
        'id', 'username'
    )

    return render(request, 'user_con_company.html', {
        'Company_objs': Company_objs,
        'User_objs': User_objs

    })


@login_required(login_url='/general/login/')
def user_con_role(request):
    Company_objs = org_models.Company.objects.values(
        'id', 'Name'
    )
    User_objs = org_models.User.objects.values(
        'id', 'username'
    )
    Role_objs = org_models.Role.objects.values(
        'id', 'Company__Name', 'Name'
    )

    return render(request, 'user_con_role.html', {
        'Company_objs': Company_objs,
        'Role_objs': Role_objs,
        'User_objs': User_objs

    })


@login_required(login_url='/general/login/')
def user_con_department(request):
    Company_objs = org_models.Company.objects.values(
        'id', 'Name'
    )
    User_objs = org_models.User.objects.values(
        'id', 'username'
    )
    Department_objs = org_models.Department.objects.values(
        'id', 'Company__Name', 'Name'
    )

    return render(request, 'user_con_department.html', {
        'Company_objs': Company_objs,
        'Department_objs': Department_objs,
        'User_objs': User_objs

    })


@login_required(login_url='/general/login/')
def role_con_department(request):
    Company_objs = org_models.Company.objects.values(
        'id', 'Name'
    )
    Department_objs = org_models.Department.objects.values(
        'id', 'Company__Name', 'Name'
    )
    Role_objs = org_models.Role.objects.values(
        'id', 'Company__Name', 'Name'
    )
    return render(request, 'role_con_department.html', {
        'Company_objs': Company_objs,
        'Department_objs': Department_objs,
        'Role_objs': Role_objs

    })


@login_required(login_url='/general/login/')
def Org_Interface(request):
    if request.method == 'GET':
        return render(request, 'org_Interface.html')


@login_required(login_url='/general/login/')
def Org_CRUD_Interface(request):
    if request.method == 'GET':
        return render(request, 'org_CRUD_Interface.html')


@login_required(login_url='/general/login/')
def set_department_con(request):
    Company_objs = org_models.Company.objects.values(
        'id', 'Name'
    )

    Department_first_objs = org_models.Department.objects.filter(is_First=True).values(
        'id', 'Company__Name', 'Name'
    )
    if request.session['Account_Type'] == '1':
        Department_temp = org_models.Department.objects
        RoleConDepartment_temp = org_models.Role_Con_Department.objects
        UserConCompany_temp = org_models.User_Con_Company.objects
    else:
        Department_temp = org_models.Department.objects.filter(Company__id=request.session['Company_id'])
        RoleConDepartment_temp = org_models.Role_Con_Department.objects.filter(
            Role__Company__id=request.session['Company_id'])
        UserConCompany_temp = org_models.User_Con_Company.objects.filter(Company_id=request.session['Company_id'])

    Department_objs = Department_temp.values(
        'id', 'Company__Name', 'Name'
    )
    RoleConDepartment_objs = RoleConDepartment_temp.values(
        'Role_id', 'Role__Company__Name', 'Department_id', 'Department__Name', 'Role__Name'
    )
    UserConCompany_objs = UserConCompany_temp.values(
        'User_id', 'User__username', 'Company__Name'
    )

    return render(request, 'set_department_con.html', {
        'Company_objs': Company_objs,
        'Department_first_objs': Department_first_objs,
        'Department_objs': Department_objs,
        'RoleConDepartment_objs': RoleConDepartment_objs,
        'UserConCompany_objs': UserConCompany_objs
    })


@login_required(login_url='/general/login/')
def set_department(request):
    Company_objs = org_models.Company.objects.values(
        'id', 'Name'
    )

    if request.session['Account_Type'] == '1':
        RoleConDepartment_temp = org_models.Role_Con_Department.objects
        UserConCompany_temp = org_models.User_Con_Company.objects
    else:
        RoleConDepartment_temp = org_models.Role_Con_Department.objects.filter(
            Role__Company__id=request.session['Company_id'])
        UserConCompany_temp = org_models.User_Con_Company.objects.filter(Company_id=request.session['Company_id'])

    RoleConDepartment_objs = RoleConDepartment_temp.values(
        'Role_id', 'Role__Company__Name', 'Department_id', 'Department__Name', 'Role__Name'
    )
    UserConCompany_objs = UserConCompany_temp.values(
        'User_id', 'User__username', 'Company__Name'
    )

    return render(request, 'set_department.html', {
        'Company_objs': Company_objs,
        'RoleConDepartment_objs': RoleConDepartment_objs,
        'UserConCompany_objs': UserConCompany_objs,

    })

@login_required(login_url='/general/login/')
def set_role(request):
    Company_objs = org_models.Company.objects.values(
        'id', 'Name'
    )
    Account_Type_objs = org_models.Account_Type.objects.values(
        'id', 'Name'
    )

    return render(request, 'set_role.html', {
        'Company_objs': Company_objs,
        'Account_Type_objs': Account_Type_objs

    })

@login_required(login_url='/general/login/')
def user_settings(request):
    User_objs = org_models.User.objects.filter(id=request.session['User_id']).first()

    return render(request, 'user_settings.html', {
        'User_objs': User_objs

    })


@login_required(login_url='/general/login/')
def role_department(request):
    if request.session['Account_Type'] == '1':
        Department_temp = org_models.Department.objects
        Role_temp = org_models.Role.objects
    else:
        Department_temp = org_models.Department.objects.filter(
            Company_id=request.session['Company_id']
        )
        Role_temp = org_models.Role.objects.filter(
            Company_id=request.session['Company_id']
        )

    Department_objs = Department_temp.values(
        'id', 'Company__Name', 'Name'
    )
    Role_objs = Role_temp.values(
        'id', 'Company__Name', 'Name'
    )

    Company_objs = org_models.Company.objects.values(
        'id', 'Name'
    )

    return render(request, 'role_department.html', {
        'Department_objs': Department_objs,
        'Role_objs': Role_objs,
        'Company_objs': Company_objs,

    })


@login_required(login_url='/general/login/')
def user_profile(request):
    User_id = request.session['User_id']
    User_objs = org_models.User.objects.filter(id=User_id).first()
    return render(request, 'user_profile.html', {
        'User_objs': User_objs

    })


@login_required(login_url='/general/login/')
def user_role(request):
    if request.session['Account_Type'] == '1':
        Role_temp = org_models.Role.objects
        UserConCompany_temp = org_models.User_Con_Company.objects
    else:
        Role_temp = org_models.Role.objects.filter(
            Company_id=request.session['Company_id']
        )
        UserConCompany_temp = org_models.User_Con_Company.objects.filter(
            Company_id=request.session['Company_id']
        )

    Role_objs = Role_temp.values(
        'id', 'Company__Name', 'Name'
    )
    UserConCompany_objs = UserConCompany_temp.values(
        'User_id', 'User__username', 'Company__Name'
    )
    Company_objs = org_models.Company.objects.values(
        'id', 'Name'
    )

    return render(request, 'user_role.html', {
        'Company_objs': Company_objs,
        'Role_objs': Role_objs,
        'UserConCompany_objs': UserConCompany_objs,

    })


@login_required(login_url='/general/login/')
def add_user(request):
    if request.session['Account_Type'] == '1':
        Company_objs = org_models.Company.objects.values(
            'id', 'Name'
        )
    else:
        Company_objs = None
    return render(request, 'add_user.html', {
        'Company_objs': Company_objs
    })


@login_required(login_url='/general/login/')
def set_authority(request):
    if request.session['Account_Type'] == '1':
        Role_temp = org_models.Role.objects
        Department_temp = org_models.Department.objects
        UserConCompany_temp = org_models.User_Con_Company.objects
    else:
        Role_temp = org_models.Role.objects.filter(
            Company_id=request.session['Company_id']
        )
        Department_temp = org_models.Department.objects.filter(
            Company_id=request.session['Company_id']
        )
        UserConCompany_temp = org_models.User_Con_Company.objects.filter(
            Company__id=request.session['Company_id']
        )

    Role_objs = Role_temp.values(
        'id', 'Company__Name', 'Name'
    )
    Department_objs = Department_temp.values(
        'id', 'Company__Name', 'Name'
    )
    UserConCompany_objs = UserConCompany_temp.values(
        'User_id', 'User__username', 'Company__Name'
    )
    Company_objs = org_models.Company.objects.values(
        'id', 'Name'
    )
    ModuleMenu_objs = general_models.ModuleMenu.objects.values(
        'id', 'URL'
    )

    return render(request, 'set_authority.html', {
        'Company_objs': Company_objs,
        'Role_objs': Role_objs,
        'Department_objs': Department_objs,
        'UserConCompany_objs': UserConCompany_objs,
        'ModuleMenu_objs': ModuleMenu_objs,

    })


@login_required(login_url='/general/login/')
def module_manage(request):
    return render(request, 'module_manage.html', {

    })


@table_chose('Department_Con')
def table_Department_Con(ret, table, content, *args, **kwargs):
    '''
    获取Department_Con表数据
    :param ret: 
    :param content: 
    :param args: 
    :param kwargs: 
    :return: 
    '''
    try:

        if content.get('Company_id', ''):
            temp_objs = org_models.Department_Con.objects.filter(
                Head__Company_id=content.get('Company_id', '')
            )
        else:
            temp_objs = org_models.Department_Con.objects
        objs = temp_objs.values_list(
            'id', 'Head__Company__Name', 'Head__Name', 'Leef__Company__Name', 'Leef__Name'
        )

        header_title = ['id', '公司', '上级部门', '公司', '下级部门', ]
        ret['content']['title'] = header_title
        ret['content']['value'] = list(objs)
        ret['status'] = True
        ret['message'] = '{0}{1}'.format('获取', 'StoreCon')
    except Exception as e:
        ret['status'] = False
        ret['message'] = str(e)

    return ret


@table_chose('Department')
def table_Department(ret, table, content, *args, **kwargs):
    '''
    获取Department表数据
    :param ret: 
    :param table: 
    :param content: 
    :param args: 
    :param kwargs: 
    :return: 
    '''
    try:

        if content.get('Company_id', ''):
            temp_objs = org_models.Department.objects.filter(
                Company_id=content.get('Company_id', '')
            )
        else:
            temp_objs = org_models.Department.objects
        objs = temp_objs.values_list(
            'id', 'Company_id', 'Company__Name', 'Name', 'is_First'
        )
        # header_title = [row.verbose_name for row in org_models.Department._meta.fields]
        header_title = ['id', 'Company_id', '公司', '部门名称', '起点部门First']

        ret['status'] = True
        ret['message'] = '{0}{1}'.format('获取', table)
        ret['content']['title'] = header_title
        ret['content']['value'] = list(objs)
    except Exception as e:
        ret['status'] = False
        ret['message'] = str(e)

    return ret


@table_chose('Company')
def table_Company(ret, table, content, *args, **kwargs):
    '''
    获取Company表数据
    :param ret: 
    :param table: 
    :param content: 
    :param args: 
    :param kwargs: 
    :return: 
    '''
    try:
        objs = getattr(org_models, table).objects.values_list(
            'id', 'Name'
        )
        header_title = [row.verbose_name for row in org_models.Company._meta.fields]

        ret['status'] = True
        ret['message'] = '{0}{1}'.format('获取', table)
        ret['content']['title'] = header_title
        ret['content']['value'] = list(objs)
    except Exception as e:
        ret['status'] = False
        ret['message'] = str(e)

    return ret


@table_chose('Account_Type')
def table_Account_Type(ret, table, content, *args, **kwargs):
    '''

    :param ret:
    :param table:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    try:
        objs = getattr(org_models, table).objects.values_list(
            'id', 'NO', 'Name'
        )
        # header_title = [row.verbose_name for row in org_models.User._meta.fields]
        header_title = ['id', '账户类型代码', '账户类型名称']
        ret['status'] = True
        ret['message'] = '{0}{1}'.format('获取', table)
        ret['content']['title'] = header_title
        ret['content']['value'] = list(objs)
    except Exception as e:
        ret['status'] = False
        ret['message'] = str(e)

    return ret


@table_chose('Role')
def table_Role(ret, table, content, *args, **kwargs):
    '''
    获取Role表数据
    :param ret: 
    :param table: 
    :param content: 
    :param args: 
    :param kwargs: 
    :return: 
    '''
    try:
        if content.get('Company_id', ''):
            temp_objs = org_models.Role.objects.filter(
                Company_id=content.get('Company_id', '')
            )
        else:
            temp_objs = org_models.Role.objects
        objs = temp_objs.values_list(
            'id', 'Company_id', 'Company__Name', 'Name', 'Account_Type_id', 'Account_Type__Name'
        )
        # header_title = [row.verbose_name for row in org_models.Company._meta.fields]
        header_title = ['id', 'Company_id', '公司', '岗位名称', 'Account_Type_id', '账户类型']

        ret['status'] = True
        ret['message'] = '{0}{1}'.format('获取', table)
        ret['content']['title'] = header_title
        ret['content']['value'] = list(objs)
    except Exception as e:
        ret['status'] = False
        ret['message'] = str(e)

    return ret


@table_chose('User')
def table_User(ret, table, content, *args, **kwargs):
    '''
    获取User表数据
    :param ret: 
    :param table: 
    :param content: 
    :param args: 
    :param kwargs: 
    :return: 
    '''
    try:
        objs = getattr(org_models, table).objects.values_list(
            'id', 'username', 'email', 'Phone_Number', 'Job_Number', 'Ui_Color', 'Ui_Zoom', 'Design_Rate',

        )
        # header_title = [row.verbose_name for row in org_models.User._meta.fields]
        header_title = ['id', '用户名', '邮箱', '手机号码', '工号', '界面颜色', '界面缩放系数', '设计系数']
        ret['status'] = True
        ret['message'] = '{0}{1}'.format('获取', table)
        ret['content']['title'] = header_title
        ret['content']['value'] = list(objs)
    except Exception as e:
        ret['status'] = False
        ret['message'] = str(e)

    return ret


@table_chose('AuthorityCompany')
def table_AuthorityCompany(ret, table, content, *args, **kwargs):
    '''
    获取AuthorityCompany表数据
    :param ret: 
    :param table: 
    :param content: 
    :param args: 
    :param kwargs: 
    :return: 
    '''
    try:
        if content.get('Company_id', ''):
            temp_objs = org_models.AuthorityCompany.objects.filter(
                Company_id=content.get('Company_id', '')
            )
        else:
            temp_objs = org_models.AuthorityCompany.objects
        objs = temp_objs.values_list(
            'id', 'Company_id', 'Company__Name', 'ModuleMenu_id', 'ModuleMenu__URL', 'NO'
        )
        # header_title = [row.verbose_name for row in org_models.Company._meta.fields]
        header_title = ['id', 'Company_id', '公司', 'ModuleMenu_id', 'URL', '权限代码']

        ret['status'] = True
        ret['message'] = '{0}{1}'.format('获取', table)
        ret['content']['title'] = header_title
        ret['content']['value'] = list(objs)
    except Exception as e:
        ret['status'] = False
        ret['message'] = str(e)

    return ret


@table_chose('AuthorityDepartment')
def table_AuthorityDepartment(ret, table, content, *args, **kwargs):
    '''
    获取AuthorityDepartment表数据
    :param ret:
    :param table:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    try:
        if content.get('Department_id', ''):
            temp_objs = org_models.AuthorityDepartment.objects.filter(
                Department_id=content.get('Department_id', '')
            )
        elif content.get('Department__Company_id', ''):
            temp_objs = org_models.AuthorityDepartment.objects.filter(
                Department__Company__id=content.get('Department__Company_id', '')
            )
        else:
            temp_objs = org_models.AuthorityDepartment.objects
        objs = temp_objs.values_list(
            'id', 'Department_id', 'Department__Company__Name','Department__Name', 'ModuleMenu_id', 'ModuleMenu__URL', 'NO'
        )
        # header_title = [row.verbose_name for row in org_models.Company._meta.fields]
        header_title = ['id', 'Department_id', '公司','部门', 'ModuleMenu_id', 'URL', '权限代码']

        ret['status'] = True
        ret['message'] = '{0}{1}'.format('获取', table)
        ret['content']['title'] = header_title
        ret['content']['value'] = list(objs)
    except Exception as e:
        ret['status'] = False
        ret['message'] = str(e)

    return ret



@table_chose('AuthorityRole')
def table_AuthorityRole(ret, table, content, *args, **kwargs):
    '''
    获取AuthorityRole表数据
    :param ret: 
    :param table: 
    :param content:
    :param args: 
    :param kwargs: 
    :return: 
    '''
    try:
        if content.get('Role_id', ''):
            temp_objs = org_models.AuthorityRole.objects.filter(
                Role_id=content.get('Role_id', '')
            )
        elif content.get('Role__Company_id', ''):
            temp_objs = org_models.AuthorityRole.objects.filter(
                Role__Company__id=content.get('Role__Company_id', '')
            )

        else:
            temp_objs = org_models.AuthorityRole.objects
        objs = temp_objs.values_list(
            'id', 'Role_id', 'Role__Company__Name', 'Role__Name', 'ModuleMenu_id', 'ModuleMenu__URL', 'NO'
        )
        # header_title = [row.verbose_name for row in org_models.Company._meta.fields]
        header_title = ['id', 'Role_id', '公司', '岗位名称', 'ModuleMenu_id', 'URL', '权限代码']

        ret['status'] = True
        ret['message'] = '{0}{1}'.format('获取', table)
        ret['content']['title'] = header_title
        ret['content']['value'] = list(objs)
    except Exception as e:
        ret['status'] = False
        ret['message'] = str(e)

    return ret


@table_chose('AuthorityUser')
def table_AuthorityUser(ret, table, content, *args, **kwargs):
    '''
    获取AuthorityRole表数据
    :param ret: 
    :param table: 
    :param content: 
    :param args: 
    :param kwargs: 
    :return: 
    '''
    try:
        if content.get('User_id', ''):
            objs = org_models.AuthorityUser.objects.filter(
                User_id=content.get('User_id', '')
            ).values_list(
                'id', 'User_id', 'User__username', 'ModuleMenu_id', 'ModuleMenu__URL', 'NO'
            )


        elif content.get('Company_id', ''):
            user_list = org_models.User_Con_Company.objects.filter(
                Company_id=content.get('Company_id', '')
            ).values_list('User_id')
            objs = []
            for row in list(user_list):
                objs.extend(org_models.AuthorityUser.objects.filter(User_id=row[0]).values_list(
                    'id', 'User_id', 'User__username', 'ModuleMenu_id', 'ModuleMenu__URL', 'NO'
                ))




        else:
            objs = org_models.AuthorityUser.objects.values_list(
                'id', 'User_id', 'User__username', 'ModuleMenu_id', 'ModuleMenu__URL', 'NO'
            )

        # header_title = [row.verbose_name for row in org_models.Company._meta.fields]
        header_title = ['id', 'User_id', '用户名', 'Modules_id', 'URL', '权限代码']

        ret['status'] = True
        ret['message'] = '{0}{1}'.format('获取', table)
        ret['content']['title'] = header_title
        ret['content']['value'] = list(objs)
    except Exception as e:
        ret['status'] = False
        ret['message'] = str(e)

    return ret


@table_chose('User_Con_Company')
def table_User_Con_Company(ret, table, content, *args, **kwargs):
    '''
    获取User_Con_Company表数据
    :param ret:
    :param table:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    try:

        if content.get('Company_id'):
            temp_objs = org_models.User_Con_Company.objects.filter(
                Company__id=content.get('Company_id', '')
            )
        else:
            temp_objs = org_models.User_Con_Company.objects
        objs = temp_objs.values_list(
            'id', 'User_id', 'User__username', 'Company_id', 'Company__Name'
        )
        # header_title = [row.verbose_name for row in org_models.Company._meta.fields]
        header_title = ['id', 'User_id', '账户', 'Company_id', '公司']

        ret['status'] = True
        ret['message'] = '{0}{1}'.format('获取', table)
        ret['content']['title'] = header_title
        ret['content']['value'] = list(objs)
    except Exception as e:
        ret['status'] = False
        ret['message'] = str(e)
    return ret


@table_chose('User_Con_Role')
def table_User_Con_Role(ret, table, content, *args, **kwargs):
    '''
    获取User_Con_Role表数据
    :param ret: 
    :param table: 
    :param content: 
    :param args: 
    :param kwargs: 
    :return: 
    '''
    try:

        if content.get('Role__Company_id'):
            temp_objs = org_models.User_Con_Role.objects.filter(
                Role__Company__id=content.get('Role__Company_id', '')
            )
        else:
            temp_objs = org_models.User_Con_Role.objects
        objs = temp_objs.values_list(
            'id', 'User_id', 'User__username', 'Role_id', 'Role__Company__Name', 'Role__Name'
        )
        # header_title = [row.verbose_name for row in org_models.Company._meta.fields]
        header_title = ['id', 'User_id', '用户名', 'Role_id', '公司', '岗位名称']

        ret['status'] = True
        ret['message'] = '{0}{1}'.format('获取', table)
        ret['content']['title'] = header_title
        ret['content']['value'] = list(objs)
    except Exception as e:
        ret['status'] = False
        ret['message'] = str(e)
    return ret


@table_chose('User_Con_Department')
def table_User_Con_Department(ret, table, content, *args, **kwargs):
    '''
    获取User_Con_Role表数据
    :param ret:
    :param table:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    try:

        if content.get('Department__Company_id'):
            temp_objs = org_models.User_Con_Department.objects.filter(
                Department__Company__id=content.get('Department__Company_id', '')
            )
        elif content.get('Department_id'):
            temp_objs = org_models.User_Con_Department.objects.filter(
                Department_id=content.get('Department_id', '')
            )

        else:
            temp_objs = org_models.User_Con_Department.objects
        objs = temp_objs.values_list(
            'id', 'User_id', 'User__username', 'Department_id', 'Department__Company__Name', 'Department__Name'
        )
        # header_title = [row.verbose_name for row in org_models.Company._meta.fields]
        header_title = ['id', 'User_id', '用户名', 'Department_id', '公司', '部门名称']

        ret['status'] = True
        ret['message'] = '{0}{1}'.format('获取', table)
        ret['content']['title'] = header_title
        ret['content']['value'] = list(objs)
    except Exception as e:
        ret['status'] = False
        ret['message'] = str(e)
    return ret


@table_chose('Role_Con_Department')
def table_Role_Con_Department(ret, table, content, *args, **kwargs):
    '''
    获取Role_Con_Department表数据
    :param ret:
    :param table:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    try:

        if content.get('Role__Company_id'):
            temp_objs = org_models.Role_Con_Department.objects.filter(
                Role__Company__id=content.get('Role__Company_id', '')
            )
        elif content.get('Department_id'):
            temp_objs = org_models.Role_Con_Department.objects.filter(
                Department_id=content.get('Department_id', '')
            )

        else:
            temp_objs = org_models.Role_Con_Department.objects
        objs = temp_objs.values_list(
            'id', 'Department_id', 'Department__Name', 'Role_id', 'Role__Company__Name', 'Role__Name'
        )

        # header_title = [row.verbose_name for row in org_models.Company._meta.fields]
        header_title = ['id', 'Department_id', '部门', 'Role_id', '公司', '岗位名称']

        ret['status'] = True
        ret['message'] = '{0}{1}'.format('获取', table)
        ret['content']['title'] = header_title
        ret['content']['value'] = list(objs)
    except Exception as e:
        ret['status'] = False
        ret['message'] = str(e)
    return ret


@table_chose('ModuleInterface')
def table_ModuleInterface(ret, table, content, *args, **kwargs):
    '''

    :param ret:
    :param table:
    :param content:
    :param args:
    :param kwargs:
    :return:
    '''
    content['Module_id'] = general_models.Module.objects.filter(APPName='org').first().id
    try:
        ret = general.views.table_ModuleInterface(ret, 'ModuleInterface', content)
    except Exception as e:
        ret['status'] = False
        ret['message'] = str(e)
    return ret


@actions(4000)
def action_get(ret, table, content, *args, **kwargs):
    '''
    获取数据 get
    :param ret: 
    :param table: 
    :param content: 
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

        return f(ret, table, content)


@actions(3000)
def action_put(ret, table, content, *args, **kwargs):
    '''
    修改数据 put
    :param ret: 
    :param table: 
    :param content: 
    :param args: 
    :param kwargs: 
    :return: 
    '''
    objs = getattr(forms, '{0}{1}'.format(table, 'Form'))(content)
    if objs.is_valid():
        try:
            uuid = content.pop('uuid', None)
            getattr(org_models, table).objects.filter(id=uuid).update(**content)

            ret['status'] = True
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
    删除数据 delete
    :param ret: 
    :param table: 
    :param content: 
    :param args: 
    :param kwargs: 
    :return: 
    '''

    try:
        uuid = content.get('uuid', None)
        getattr(org_models, table).objects.filter(id=uuid).delete()
        ret['status'] = True
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
            getattr(org_models, table).objects.create(**content)
            ret['status'] = True
        except Exception as e:
            ret['status'] = False
            ret['message'] = str(e)
    else:

        ret['status'] = False
        print(objs.errors.get_json_data())
        ret['errors'] = objs.errors.get_json_data()

    return ret


def action_org_json(request):
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

        # 进行权限判断
        if general.functions.general_has_authority(request, '/org/'):
            try:
                f = _registered_actions[action]
            except KeyError as e:
                ret['status'] = False
                ret['message'] = str(e)
            else:
                ret = f(ret, table, content)
        else:
            try:
                ret['message'] = general_models.Message.objects.filter(NO='005').first().Content
            except Exception as e:
                ret['message'] = str(e)

        return HttpResponse(json.dumps(ret, cls=UUIDEncoder), content_type='application/json')
