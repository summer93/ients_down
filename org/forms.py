from django.forms import Form
from django.forms import fields
from django.forms import widgets
from org.models import Company
from org.models import Department
from org.models import Role
from org.models import User
from org.models import Department
from org.models import Account_Type
from general.models import Module
from general.models import ModuleMenu
from django.core.exceptions import ValidationError
import re


class CompanyForm(Form):
    Name = fields.CharField(
        required=True,
        max_length=200,
        error_messages={
            'required': '姓名不能为空!!!',
            'max_length': '名称过长!!!',

        },
        widget=widgets.TextInput(
            attrs={'class': '', 'placeholder': 'Name', 'name': 'Name'}
        )
    )


class DepartmentForm(Form):
    Name = fields.CharField(
        required=True,
        max_length=200,
        error_messages={
            'required': '姓名不能为空!!!',
            'max_length': '名称过长!!!',

        },
        widget=widgets.TextInput(
            attrs={'class': '', 'placeholder': 'Name', 'name': 'Name'}
        )
    )
    choice = Company.objects.values_list('id', 'Name')
    Company_id = fields.CharField(
        widget=widgets.Select(
            choices=choice,
            attrs={'class': '', 'name': 'Company_id'}

        )

    )


class Department_ConForm(Form):
    choice = Department.objects.values_list('id', 'Name')
    Head_id = fields.CharField(
        widget=widgets.Select(
            choices=choice,
            attrs={'class': '', 'name': 'Head_id'}
        )
    )
    Leef_id = fields.CharField(
        widget=widgets.Select(
            choices=choice,
            attrs={'class': '', 'name': 'Leef_id'}
        )
    )


class Account_TypeForm(Form):
    NO = fields.CharField(
        required=True,
        max_length=20,
        error_messages={
            'required': '账户类型代码不能为空!!!',
            'max_length': '账户类型代码过长!!!',

        },
        widget=widgets.TextInput(
            attrs={'class': '', 'placeholder': 'NO', 'name': 'NO'}
        )
    )
    Name = fields.CharField(
        required=True,
        max_length=200,
        error_messages={
            'required': '名称不能为空!!!',
            'max_length': '名称过长!!!',

        },
        widget=widgets.TextInput(
            attrs={'class': '', 'placeholder': 'Name', 'name': 'Name'}
        )
    )


class RoleForm(Form):
    Name = fields.CharField(
        required=True,
        max_length=200,
        error_messages={
            'required': '姓名不能为空!!!',
            'max_length': '名称过长!!!',

        },
        widget=widgets.TextInput(
            attrs={'class': '', 'placeholder': 'Name', 'name': 'Name'}
        )
    )
    Type_choice = Account_Type.objects.values_list('id', 'Name')
    Account_Type_id = fields.CharField(
        widget=widgets.Select(
            choices=Type_choice,
            attrs={'class': '', 'name': 'Company_id'}

        )

    )

    Company_choice = Company.objects.values_list('id', 'Name')
    Company_id = fields.CharField(
        widget=widgets.Select(
            choices=Company_choice,
            attrs={'class': '', 'name': 'Company_id'}

        )

    )


class AuthorityCompanyForm(Form):
    company_choice = Company.objects.values_list('id', 'Name')
    Company_id = fields.CharField(
        widget=widgets.Select(
            choices=company_choice,
            attrs={'class': '', 'name': 'Company_id'}

        )

    )
    url_choice = ModuleMenu.objects.values_list('id', 'URL')
    ModuleMenu_id = fields.CharField(
        widget=widgets.Select(
            choices=url_choice,
            attrs={'class': '', 'name': 'ModuleMenu_id'}

        )

    )
    NO = fields.CharField(
        required=True,
        max_length=20,
        error_messages={
            'required': '权限代码不能为空!!!',
            'max_length': '权限代码过长!!!',

        },
        widget=widgets.TextInput(
            attrs={'class': '', 'placeholder': 'NO', 'name': 'NO'}
        )
    )

    def clean_NO(self):
        # 对输入的权限代码进行验证

        NO_list = ['0', '1', '2', '4', '3', '5', '6', '7']
        NO = self.cleaned_data.get('NO')
        if NO not in NO_list:
            raise ValidationError('请输入正确的权限代码!')
        return NO


class AuthorityDepartmentForm(Form):
    department_choice = Department.objects.values_list('id', 'Name')
    Department_id = fields.CharField(
        widget=widgets.Select(
            choices=department_choice,
            attrs={'class': '', 'name': 'Department_id'}

        )

    )
    url_choice = ModuleMenu.objects.values_list('id', 'URL')
    ModuleMenu_id = fields.CharField(
        widget=widgets.Select(
            choices=url_choice,
            attrs={'class': '', 'name': 'ModuleMenu_id'}

        )

    )
    NO = fields.CharField(
        required=True,
        max_length=20,
        error_messages={
            'required': '权限代码不能为空!!!',
            'max_length': '权限代码过长!!!',

        },
        widget=widgets.TextInput(
            attrs={'class': '', 'placeholder': 'NO', 'name': 'NO'}
        )
    )

    def clean_NO(self):
        # 对输入的权限代码进行验证

        NO_list = ['0', '1', '2', '4', '3', '5', '6', '7']
        NO = self.cleaned_data.get('NO')
        if NO not in NO_list:
            raise ValidationError('请输入正确的权限代码!')
        return NO


class AuthorityRoleForm(Form):
    role_choice = Role.objects.values_list('id', 'Name')
    Role_id = fields.CharField(
        widget=widgets.Select(
            choices=role_choice,
            attrs={'class': '', 'name': 'Role_id'}

        )

    )
    url_choice = ModuleMenu.objects.values_list('id', 'URL')
    ModuleMenu_id = fields.CharField(
        widget=widgets.Select(
            choices=url_choice,
            attrs={'class': '', 'name': 'ModuleMenu_id'}

        )

    )
    NO = fields.CharField(
        required=True,
        max_length=20,
        error_messages={
            'required': '权限代码不能为空!!!',
            'max_length': '权限代码过长!!!',

        },
        widget=widgets.TextInput(
            attrs={'class': '', 'placeholder': 'NO', 'name': 'NO'}
        )
    )

    def clean_NO(self):
        # 对输入的权限代码进行验证

        NO_list = ['0', '1', '2', '4', '3', '5', '6', '7']
        NO = self.cleaned_data.get('NO')
        if NO not in NO_list:
            raise ValidationError('请输入正确的权限代码!')
        return NO


class AuthorityUserForm(Form):
    user_choice = User.objects.values_list('id', 'username')
    User_id = fields.CharField(
        widget=widgets.Select(
            choices=user_choice,
            attrs={'class': '', 'name': 'User_id'}

        )

    )
    url_choice = ModuleMenu.objects.values_list('id', 'URL')
    ModuleMenu_id = fields.CharField(
        widget=widgets.Select(
            choices=url_choice,
            attrs={'class': '', 'name': 'ModuleMenu_id'}

        )

    )
    NO = fields.CharField(
        required=True,
        max_length=20,
        error_messages={
            'required': '权限代码不能为空!!!',
            'max_length': '权限代码过长!!!',

        },
        widget=widgets.TextInput(
            attrs={'class': '', 'placeholder': 'NO', 'name': 'NO'}
        )
    )

    def clean_NO(self):
        # 对输入的权限代码进行验证

        NO_list = ['0', '1', '2', '4', '3', '5', '6', '7']
        NO = self.cleaned_data.get('NO')
        if NO not in NO_list:
            raise ValidationError('请输入正确的权限代码!')
        return NO


class UserForm(Form):

    username = fields.CharField(
        required=True,
        max_length=200,
        error_messages={
            'required': '用户名不能为空!!!',
            'max_length': '用户名过长!!!',

        },
        widget=widgets.TextInput(
            attrs={'class': '', 'placeholder': 'username', 'name': 'username'}
        )
    )
    email = fields.EmailField(
        required=True,
        max_length=100,
        error_messages={
            'required': '邮箱不能为空!!!',
            'invalid': '邮箱格式错误!!!'

        },
        widget=widgets.TextInput(
            attrs={'class': '', 'placeholder': 'email', 'name': 'email'}
        )
    )
    Phone_Number = fields.CharField(
        required=True,
        max_length=11,
        error_messages={
            'required': '手机号码不能为空!!!',
            'max_length': '手机号码过长!!!',

        },
        widget=widgets.TextInput(
            attrs={'class': '', 'placeholder': 'Phone_Number', 'name': 'Phone_Number'}
        )
    )
    Job_Number = fields.CharField(
        required=True,
        max_length=10,
        error_messages={
            'required': '工号不能为空!!!',
            'max_length': '工号过长!!!',

        },
        widget=widgets.TextInput(
            attrs={'class': '', 'placeholder': 'Job_Number', 'name': 'Job_Number'}
        )
    )
    Ui_Color = fields.CharField(
        required=True,
        max_length=20,
        error_messages={
            'required': '界面颜色不能为空!!!',
            'max_length': '界面颜色过长!!!',

        },
        widget=widgets.TextInput(
            attrs={'class': '', 'placeholder': 'Ui_Color', 'name': 'Ui_Color'}
        )
    )
    Ui_Zoom = fields.FloatField(
        required=True,
        error_messages={
            'required': '界面缩放系数不能为空!!!',
            'invalid': '格式错误!!!'

        },
        widget=widgets.TextInput(
            attrs={'class': '', 'placeholder': 'Ui_Zoom', 'name': 'Ui_Zoom'}
        )
    )
    Design_Rate = fields.FloatField(
        required=True,
        error_messages={
            'required': '设计系数不能为空!!!',
            'invalid': '格式错误!!!'

        },
        widget=widgets.TextInput(
            attrs={'class': '', 'placeholder': 'Design_Rate', 'name': 'Design_Rate'}
        )
    )



    def clean_Phone_Number(self):
        # 对Phone_Number的扩展验证
        Phone_Number = self.cleaned_data.get('Phone_Number')
        m = re.findall(r"1\d{10}", Phone_Number)
        if not m:
            raise ValidationError('号码格式不正确！')
        return Phone_Number


class User_Con_CompanyForm(Form):
    Company_choice = Company.objects.values_list('id', 'Name')
    Company_id = fields.CharField(
        widget=widgets.Select(
            choices=Company_choice,
            attrs={'class': '', 'name': 'Company_id'}

        )

    )
    user_choice = User.objects.values_list('id', 'username')
    User_id = fields.CharField(
        widget=widgets.Select(
            choices=user_choice,
            attrs={'class': '', 'name': 'User_id'}

        )

    )


class User_Con_RoleForm(Form):
    role_choice = Role.objects.values_list('id', 'Name')
    Role_id = fields.CharField(
        widget=widgets.Select(
            choices=role_choice,
            attrs={'class': '', 'name': 'Role_id'}

        )

    )
    user_choice = User.objects.values_list('id', 'username')
    User_id = fields.CharField(
        widget=widgets.Select(
            choices=user_choice,
            attrs={'class': '', 'name': 'User_id'}

        )

    )


class User_Con_DepartmentForm(Form):
    Department_choice = Department.objects.values_list('id', 'Name')
    Department_id = fields.CharField(
        widget=widgets.Select(
            choices=Department_choice,
            attrs={'class': '', 'name': 'Department_id'}

        )

    )
    user_choice = User.objects.values_list('id', 'username')
    User_id = fields.CharField(
        widget=widgets.Select(
            choices=user_choice,
            attrs={'class': '', 'name': 'User_id'}

        )

    )


class Role_Con_DepartmentForm(Form):
    role_choice = Role.objects.values_list('id', 'Name')
    Role_id = fields.CharField(
        widget=widgets.Select(
            choices=role_choice,
            attrs={'class': '', 'name': 'Role_id'}

        )

    )
    department_choice = Department.objects.values_list('id', 'Name')
    Department_id = fields.CharField(
        widget=widgets.Select(
            choices=department_choice,
            attrs={'class': '', 'name': 'Department_id'}

        )

    )


class ModuleInterfaceForm(Form):
    Name = fields.CharField(
        required=True,
        max_length=100,
        error_messages={
            'required': '名称不能为空!!!',
            'max_length': '名称过长!!!',

        },
        widget=widgets.TextInput(
            attrs={'class': '', 'placeholder': 'Name', 'name': 'Name'}
        )
    )
    URL = fields.CharField(
        required=True,
        max_length=255,
        error_messages={
            'required': '入口地址不能为空!!!',
            'max_length': '入口地址过长!!!',

        },
        widget=widgets.TextInput(
            attrs={'class': '', 'placeholder': 'URL', 'name': 'URL'}
        )
    )
    Json_Request = fields.CharField(
        required=True,
        max_length=255,
        error_messages={
            'required': '提交JSON样例不能为空!!!',
            'max_length': '提交JSON样例过长!!!',

        },
        widget=widgets.TextInput(
            attrs={'class': '', 'placeholder': 'Json_Request', 'name': 'Json_Request'}
        )
    )
    Json_Success = fields.CharField(
        required=True,
        max_length=255,
        error_messages={
            'required': '返回JSON样例不能为空!!!',
            'max_length': '返回JSON样例过长!!!',

        },
        widget=widgets.TextInput(
            attrs={'class': '', 'placeholder': 'Json_Success', 'name': 'Json_Success'}
        )
    )
    Note = fields.CharField(
        required=True,
        max_length=255,
        error_messages={
            'required': '说明不能为空!!!',
            'max_length': '说明过长!!!',

        },
        widget=widgets.TextInput(
            attrs={'class': '', 'placeholder': 'Note', 'name': 'Note'}
        )
    )
