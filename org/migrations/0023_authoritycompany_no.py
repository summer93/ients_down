# Generated by Django 2.0 on 2018-01-24 10:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('org', '0022_auto_20180124_0536'),
    ]

    operations = [
        migrations.AddField(
            model_name='authoritycompany',
            name='NO',
            field=models.CharField(default='0', max_length=20, verbose_name='权限代码'),
        ),
    ]
