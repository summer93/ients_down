# Generated by Django 2.0 on 2018-01-04 02:33

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0026_auto_20180104_0233'),
    ]

    operations = [
        migrations.AlterField(
            model_name='storeform',
            name='created_date',
            field=models.DateTimeField(default=datetime.datetime(2018, 1, 4, 2, 33, 25, 14610), verbose_name='创建时间'),
        ),
    ]
