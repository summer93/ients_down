from django.forms import Form
from django.forms import fields
from django.forms import widgets
from django.core.exceptions import ValidationError
from org import models
import re


class ModuleForm(Form):
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
    APPName = fields.CharField(
        required=True,
        max_length=100,
        error_messages={
            'required': 'APP名称不能为空!!!',
            'max_length': 'APP名称过长!!!',

        },
        widget=widgets.TextInput(
            attrs={'class': '', 'placeholder': 'APPName', 'name': 'APPName'}
        )
    )


class ModuleMenuForm(Form):
    Display_ICO = fields.CharField(
        required=True,
        max_length=100,
        error_messages={
            'required': '图标不能为空!!!',
            'max_length': '图标过长!!!',

        },
        widget=widgets.TextInput(
            attrs={'class': '', 'placeholder': 'Display_ICO', 'name': 'Display_ICO'}
        )
    )
    Display_Name = fields.CharField(
        required=True,
        max_length=100,
        error_messages={
            'required': '名称不能为空!!!',
            'max_length': '名称过长!!!',

        },
        widget=widgets.TextInput(
            attrs={'class': '', 'placeholder': 'Display_Name', 'name': 'Display_Name'}
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


class ModuleAuthorityForm(Form):
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
    Mark = fields.CharField(
        required=True,
        max_length=255,
        error_messages={
            'required': '代号不能为空!!!',
            'max_length': '代号过长!!!',

        },
        widget=widgets.TextInput(
            attrs={'class': '', 'placeholder': 'Mark', 'name': 'Mark'}
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


class MessageForm(Form):
    NO = fields.CharField(
        required=True,
        max_length=20,
        error_messages={
            'required': '代码不能为空!!!',
            'max_length': '代码过长!!!',

        },
        widget=widgets.TextInput(
            attrs={'class': '', 'placeholder': 'NO', 'name': 'NO'}
        )
    )
    Content = fields.CharField(
        required=True,
        max_length=100,
        error_messages={
            'required': '错误信息不能为空!!!',
            'max_length': '错误信息过长!!!',

        },
        widget=widgets.TextInput(
            attrs={'class': '', 'placeholder': 'APPName', 'Content': 'Content'}
        )
    )


class LoginForm(Form):
    username = fields.CharField(
        required=True,
        max_length=100,
        error_messages={
            'required': '用户名不能为空!!!',
            'max_length': '用户名过长!!!',

        },
        widget=widgets.TextInput(
            attrs={'class': '', 'placeholder': 'username', 'name': 'username'}
        )
    )
    password = fields.CharField(
        required=True,
        max_length=100,
        error_messages={
            'required': '密码不能为空!!!',
            'max_length': '密码过长!!!',

        },
        widget=widgets.TextInput(
            attrs={'class': '', 'placeholder': 'password', 'name': 'password'}
        )
    )


class RegisterForm(Form):
    username = fields.CharField(
        required=True,
        max_length=100,
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
    password = fields.CharField(
        required=True,
        max_length=100,
        error_messages={
            'required': '密码不能为空!!!',
            'max_length': '密码过长!!!',

        },
        widget=widgets.TextInput(
            attrs={'class': '', 'placeholder': 'password', 'name': 'password'}
        )
    )
    password2 = fields.CharField(
        required=True,
        max_length=100,
        error_messages={
            'required': '密码不能为空!!!',
            'max_length': '密码过长!!!',

        },
        widget=widgets.TextInput(
            attrs={'class': '', 'placeholder': 'password2', 'name': 'password2'}
        )
    )

    def clean_password2(self):  # 查看两次密码是否一致
        password = self.cleaned_data.get('password')
        password2 = self.cleaned_data.get('password2')
        if password and password2:
            if password != password2:
                raise ValidationError('两次密码不匹配！')
            return password2

    def clean_username(self):
        # 对username的扩展验证，查找用户是否已经存在
        username = self.cleaned_data.get('username')
        users = models.User.objects.filter(username=username).count()
        if users:
            raise ValidationError('用户已经存在！')
        return username

    def clean_email(self):
        # 对email的扩展验证，查找email是否已经存在
        email = self.cleaned_data.get('email')
        users = models.User.objects.filter(email=email).count()
        if users:
            raise ValidationError('邮箱已经存在！')
        return email

    def clean_Phone_Number(self):
        # 对Phone_Number的扩展验证，检查电话格式是否正确
        Phone_Number = self.cleaned_data.get('Phone_Number')
        m = re.findall(r"1\d{10}", Phone_Number)
        if not m:
            raise ValidationError('号码格式不正确！')
        return Phone_Number
