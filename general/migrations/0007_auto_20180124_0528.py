# Generated by Django 2.0 on 2018-01-24 05:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('general', '0006_auto_20180123_1042'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='NO',
            field=models.CharField(default='7', max_length=20, verbose_name='代码'),
        ),
    ]
