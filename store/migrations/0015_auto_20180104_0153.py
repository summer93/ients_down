# Generated by Django 2.0 on 2018-01-04 01:53

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0014_auto_20171227_0220'),
    ]

    operations = [
        migrations.AddField(
            model_name='storeform',
            name='add_date',
            field=models.DateTimeField(default=django.utils.timezone.now, verbose_name='创建日期'),
        ),
        migrations.AddField(
            model_name='storeform',
            name='mod_date',
            field=models.DateTimeField(auto_now=True, verbose_name='最后修改日期'),
        ),
    ]
