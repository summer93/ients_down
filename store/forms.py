from django.forms import Form
from django.forms import fields
from django.forms import widgets
from org.models import Company
from pdm.models import Part
from store.models import Store
from store.models import PartLive
from store.models import Form_Status
from store import models


class StoreForm(Form):
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
    Tell = fields.CharField(
        required=True,
        max_length=200,
        error_messages={
            'required': '电话不能为空!!!',
            'max_length': '号码过长!!!'
        },
        widget=widgets.TextInput(
            attrs={'class': '', 'placeholder': 'Tell', 'name': 'Tell'}
        )
    )
    Address = fields.CharField(
        required=True,
        max_length=100,
        error_messages={
            'required': '地址不能为空!!!'
        },
        widget=widgets.TextInput(
            attrs={'class': '', 'placeholder': 'Address', 'name': 'Address'}
        )
    )

    choice = Company.objects.values_list('id', 'Name')
    Company_id = fields.CharField(
        widget=widgets.Select(
            choices=choice,
            attrs={'class': '', 'name': 'Company_id'}

        )

    )


class PartLiveForm(Form):
    choice = Part.objects.values_list('id', 'Name')
    Part_id = fields.CharField(
        widget=widgets.Select(
            choices=choice,
            attrs={'class': '', 'name': 'Part_id'}
        )
    )
    QR_Code = fields.CharField(
        required=True,
        max_length=256,
        error_messages={
            'required': '二维码不能为空!!!',
            'max_length': '二维码太长了!!!'
        },
        widget=widgets.TextInput(
            attrs={'class': '', 'placeholder': 'QR_Code', 'name': 'QR_Code'}
        )
    )


class StoreConPartLiveForm(Form):
    PartLive_choice = PartLive.objects.values_list('id', 'Part__Name')
    PartLive_id = fields.CharField(
        widget=widgets.Select(
            choices=PartLive_choice,
            attrs={'class': '', 'name': 'PartLive_id'}
        )
    )
    Number = fields.IntegerField(
        required=True,
        error_messages={
            'required': '数量不能为空!!!',
            'invalid': '请输入数字!!!',

        }
    )


class StoreConForm(Form):
    choice = Store.objects.values_list('id', 'Name')
    Head_id = fields.CharField(
        widget=widgets.Select(
            choices=choice,
            attrs={'class': '', 'name': 'Part_id'}
        )
    )
    Last_id = fields.CharField(
        widget=widgets.Select(
            choices=choice,
            attrs={'class': '', 'name': 'Part_id'}
        )
    )


class Store_StatusForm(Form):
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
    Name = fields.CharField(
        required=True,
        max_length=20,
        error_messages={
            'required': '名称不能为空!!!',
            'max_length': '名称过长!!!',

        },
        widget=widgets.TextInput(
            attrs={'class': '', 'placeholder': 'Name', 'name': 'Name'}
        )
    )


class Form_StatusForm(Form):
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
    Name = fields.CharField(
        required=True,
        max_length=20,
        error_messages={
            'required': '名称不能为空!!!',
            'max_length': '名称过长!!!',

        },
        widget=widgets.TextInput(
            attrs={'class': '', 'placeholder': 'Name', 'name': 'Name'}
        )
    )


class StoreFormForm(Form):
    Store_choice = Store.objects.filter(Status__NO='002').values_list('id', 'Name')
    Status_choice = Form_Status.objects.values_list('id', 'Name')
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

    Status_id = fields.CharField(
        required=False,
        widget=widgets.Select(
            choices=Status_choice,
            attrs={'class': '', 'name': 'Status_id'}
        )
    )
    OriginStore_id = fields.CharField(
        required=False,
        widget=widgets.Select(
            choices=Store_choice,
            attrs={'class': '', 'name': 'OriginStore_id'}
        )
    )
    TargetStore_id = fields.CharField(
        required=False,
        widget=widgets.Select(
            choices=Store_choice,
            attrs={'class': '', 'name': 'TargetStore_id'}
        )
    )


class StoreFormConPartLiveForm(Form):
    StoreForm_choice = models.StoreForm.objects.values_list('id', 'Name')
    PartLive_choice = PartLive.objects.values_list('id', 'Part__Name')
    Number = fields.IntegerField(
        required=True,
        error_messages={
            'required': '数量不能为空!!!',
            'invalid': '请输入数字!!!',

        },
        widget=widgets.TextInput(
            attrs={'class': '', 'placeholder': 'Number', 'name': 'Number'}
        )
    )
    StoreForm_id = fields.CharField(
        required=True,
        widget=widgets.Select(
            choices=StoreForm_choice,
            attrs={'class': '', 'name': 'StoreForm_id'}
        )
    )
    PartLive_id = fields.CharField(
        required=True,
        widget=widgets.Select(
            choices=PartLive_choice,
            attrs={'class': '', 'name': 'PartLive_id'}
        )
    )
