# Generated by Django 2.0 on 2018-02-06 06:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('org', '0030_user_avatar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='Avatar',
            field=models.ImageField(default='/assets/images/avatar/default.png', upload_to='', verbose_name='头像'),
        ),
    ]
