from django.db import models

import uuid

# Create your models here.


class Node(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, default=uuid.uuid4, editable=False)
    Name = models.CharField(max_length=256, verbose_name="名称", null=True, blank=True)