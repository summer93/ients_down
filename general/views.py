from django.shortcuts import render, render_to_response, redirect
import json
from django.contrib import auth
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from general import models as general_models
from org import models as org_models
# Create your views here.
from django.views.decorators.csrf import csrf_exempt

from general import common_variable
from general import forms
from general import functions
from general import random_check_code
import org
import uuid
import os


@login_required(login_url='/general/login/')
def home(request):
    website_title = 'Enterprise Ecosystem'
    request.session['website_title'] = website_title

    username = auth.get_user(request)
    return render(request, 'index.html', locals())


def user_login(request):
    if request.method == 'GET':
        return render(request, 'login.html', {

        })

    if request.method == 'POST':
        ret = {'status': None, 'message': None, 'errors': None, 'next_url': None}
        val = json.loads(request.body.decode('utf8'))
        username = val.get('username', None)
        password = val.get('password', None)
        code = val.get('code', '')
        save_time = val.get('save_time', None)

        if code.upper() == request.session.get('code', '').upper():

            obj = forms.LoginForm(val)
            if obj.is_valid():
                user = auth.authenticate(username=username, password=password)
                if user:
                    ret['status'] = True
                    try:
                        ret['next_url'] = request.META['HTTP_REFERER'].split('=')[1]
                    except Exception as e:
                        ret['next_url'] = '/'

                    auth.login(request, user)
                    request.session['User_username'] = username
                    request.session['User_id'] = org_models.User.objects.filter(username=username).first().id.__str__()
                    request.session['User_Avatar'] = org_models.User.objects.filter(
                        username=username).first().Avatar.__str__()

                    common_variable.post_authority(request)


                    if save_time:
                        request.session.set_expiry(int(save_time))

                else:
                    ret['status'] = False
                    ret['message'] = '用户名或密码错误!'
            else:
                ret['status'] = False
                ret['errors'] = obj.errors.get_json_data()
        else:
            ret['status'] = False
            ret['message'] = '验证码错误!'

        return HttpResponse(json.dumps(ret), content_type='application/json')


def user_logout(request):
    if request.method == 'GET':
        auth.logout(request)
        return render(request, 'login.html', {

        })


def user_register(request):
    if request.method == 'GET':
        return render(request, 'register.html', {

        })
    if request.method == 'POST':
        ret = {'status': None, 'message': None, 'errors': None, 'next_url': None}
        val = json.loads(request.body.decode('utf8'))
        username = val.get('username', None)
        email = val.get('email', None)
        Phone_Number = val.get('Phone_Number', None)
        password = val.get('password', None)
        code = val.get('code', '')

        if code.upper() == request.session.get('code', '').upper():
            obj = forms.RegisterForm(val)
            if obj.is_valid():
                user = org_models.User.objects.create_user(
                    username=username,
                    password=password,
                    email=email,
                    Phone_Number=Phone_Number
                )
                user.save()
                ret['status'] = True
                ret['next_url'] = '/'
                request.session['User_username'] = username
                request.session['User_id'] = org_models.User.objects.filter(username=username).first().id.__str__()
                request.session['User_Avatar'] = org_models.User.objects.filter(
                    username=username).first().Avatar.__str__()
                common_variable.post_authority(request)

                auth.login(request, user)
            else:
                ret['status'] = False
                ret['errors'] = obj.errors.get_json_data()

        else:
            ret['status'] = False
            ret['message'] = '验证码错误!'
        return HttpResponse(json.dumps(ret), content_type='application/json')


def check_code(request):
    from io import BytesIO

    img, code = random_check_code.rd_check_code()
    stream = BytesIO()
    img.save(stream, 'png')
    request.session['code'] = code
    return HttpResponse(stream.getvalue())


def upload_avatar(request):
    file_obj = request.FILES.get('HeadPicture')
    file_name = file_obj.name.split('.')[0]
    file_format = file_obj.name.split('.')[1]
    username = request.session['User_username']
    new_file_name = ''.join([username, '-', file_obj.name])
    save_path = os.path.join('general/assets/images/avatar', new_file_name)
    with open(save_path, 'wb') as f:
        for chunk in file_obj.chunks():
            f.write(chunk)
    request.session['User_Avatar'] = 'images/avatar/' + new_file_name

    org_models.User.objects.filter(id=request.session['User_id']).update(
        Avatar=os.path.join('/images/avatar', new_file_name)
    )

    file_path = '/static/images/avatar/' + new_file_name
    return HttpResponse(file_path)


@login_required(login_url='/general/login/')
def module(request):
    if request.method == 'GET':
        return render(request, 'module.html')


@login_required(login_url='/general/login/')
def module_menu(request):
    if request.method == 'GET':
        module_objs = general_models.Module.objects.values(
            'id', 'Name'
        )
        module_menu_objs = general_models.ModuleMenu.objects.values(
            'id', 'Display_Name'
        )

        return render(request, 'module_menu.html', {
            'module_objs': module_objs,
            'module_menu_objs': module_menu_objs

        })


@login_required(login_url='/general/login/')
def module_interface(request):
    module_objs = general_models.Module.objects.values(
        'id', 'Name'
    )

    return render(request, 'module_interface.html', {
        'module_objs': module_objs,
    })


@login_required(login_url='/general/login/')
def module_authority(request):
    module_objs = general_models.Module.objects.values(
        'id', 'Name'
    )
    return render(request, 'module_authority.html', {
        'module_objs': module_objs,
    })


@login_required(login_url='/general/login/')
def message(request):
    return render(request, 'message.html', {

    })


@login_required(login_url='/general/login/')
def interface(request):
    return render(request, 'interface.html', {

    })


@login_required(login_url='/general/login/')
def menu(request):
    return render(request, 'menu.html', {

    })


_registered_actions = {}


def actions(name):
    def decorator(f):
        _registered_actions[name] = f
        return f

    return decorator


_registered_tables = {}


def table_chose(name):
    def decorator(f):
        _registered_tables[name] = f
        return f

    return decorator


class UUIDEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, uuid.UUID):
            return str(obj)
        return json.JSONEncoder.default(self, obj)


@table_chose('Module')
def table_Module(ret, table, content, *args, **kwargs):
    '''
    获取Module表数据
    :param ret: 
    :param table: 
    :param content: 
    :param args: 
    :param kwargs: 
    :return: 
    '''
    try:
        objs = getattr(general_models, table).objects.values_list(
            'id', 'Name', 'APPName'
        )
        header_title = [row.verbose_name for row in general_models.Module._meta.fields]

        ret['status'] = True
        ret['message'] = '{0}{1}'.format('获取', table)
        ret['content']['title'] = header_title
        ret['content']['value'] = list(objs)
    except Exception as e:
        ret['status'] = False
        ret['message'] = str(e)

    return ret


@table_chose('ModuleMenu')
def table_ModuleMenu(ret, table, content, *args, **kwargs):
    '''
    获取ModuleMenu表数据
    :param ret: 
    :param table: 
    :param content: 
    :param args: 
    :param kwargs: 
    :return: 
    '''
    try:
        objs = getattr(general_models, table).objects.values_list(
            'id', 'Display_ICO', 'Display_Name', 'URL', 'P_Menu__Display_Name', 'P_Menu_id', 'Module__Name',
            'Module_id'
        )
        header_title = [row.verbose_name for row in general_models.ModuleMenu._meta.fields]

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
    获取ModuleInterface表数据
    :param ret: 
    :param table: 
    :param content: 
    :param args: 
    :param kwargs: 
    :return: 
    '''
    try:
        temp_objs = getattr(general_models, table).objects
        if content.get('Module_id', ''):
            temp_objs = temp_objs.filter(
                Module_id=content.get('Module_id', '')
            )
        objs = temp_objs.values_list(
            'id', 'Name', 'URL', 'Json_Request', 'Json_Success', 'Note', 'Module__Name', 'Module_id'
        )
        header_title = [row.verbose_name for row in general_models.ModuleInterface._meta.fields]

        ret['status'] = True
        ret['message'] = '{0}{1}'.format('获取', table)
        ret['content']['title'] = header_title
        ret['content']['value'] = list(objs)

    except Exception as e:
        ret['status'] = False
        ret['message'] = str(e)

    return ret


@table_chose('ModuleAuthority')
def table_ModuleAuthority(ret, table, content, *args, **kwargs):
    '''
    获取ModuleAuthority表数据
    :param ret: 
    :param table: 
    :param content: 
    :param args: 
    :param kwargs: 
    :return: 
    '''
    try:
        objs = getattr(general_models, table).objects.values_list(
            'id', 'Name', 'Mark', 'Note', 'Module__Name', 'Module_id'
        )
        header_title = [row.verbose_name for row in general_models.ModuleAuthority._meta.fields]

        ret['status'] = True
        ret['message'] = '{0}{1}'.format('获取', table)
        ret['content']['title'] = header_title
        ret['content']['value'] = list(objs)
    except Exception as e:
        ret['status'] = False
        ret['message'] = str(e)

    return ret


@table_chose('Message')
def table_Message(ret, table, content, *args, **kwargs):
    '''
    获取Message表数据
    :param ret: 
    :param table: 
    :param content: 
    :param args: 
    :param kwargs: 
    :return: 
    '''
    try:
        objs = getattr(general_models, table).objects.values_list(
            'id', 'NO', 'Content'
        )
        header_title = [row.verbose_name for row in general_models.Message._meta.fields]

        ret['status'] = True
        ret['message'] = '{0}{1}'.format('获取', table)
        ret['content']['title'] = header_title
        ret['content']['value'] = list(objs)
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
            getattr(general_models, table).objects.filter(id=uuid).update(**content)

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
        getattr(general_models, table).objects.filter(id=uuid).delete()
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
            getattr(general_models, table).objects.create(**content)
            ret['status'] = True
        except Exception as e:
            ret['status'] = False
            ret['message'] = str(e)
    else:

        ret['status'] = False
        print(objs.errors.get_json_data())
        ret['errors'] = objs.errors.get_json_data()

    return ret


def action_general_json(request):
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
        if functions.general_has_authority(request, '/general/'):
            try:
                f = _registered_actions[action]
            except KeyError as e:
                ret['status'] = False
                ret['message'] = str(e)
            else:
                ret = f(ret, table, content)

        else:

            ret['status'] = False
            try:
                ret['message'] = general_models.Message.objects.filter(NO='005').first().Content
            except Exception as e:
                ret['message'] = str(e)

        return HttpResponse(json.dumps(ret, cls=UUIDEncoder), content_type='application/json')
