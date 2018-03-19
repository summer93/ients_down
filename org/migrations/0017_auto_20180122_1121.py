# Generated by Django 2.0 on 2018-01-22 11:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('general', '0005_auto_20180122_1109'),
        ('org', '0016_auto_20180122_1114'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='authorityrole',
            name='Modules',
        ),
        migrations.AddField(
            model_name='authorityrole',
            name='ModuleMenu',
            field=models.ForeignKey(default='949121e7c20343daa7eb46617764754e', on_delete=django.db.models.deletion.CASCADE, to='general.ModuleMenu', verbose_name='模块目录'),
            preserve_default=False,
        ),
    ]