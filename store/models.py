from django.db import models
from org.models import *
from pdm.models import *
# import django.utils.timezone as timezone
import uuid


# Create your models here.


class PartLive(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, default=uuid.uuid4, editable=False)
    Part = models.ForeignKey(Part, verbose_name="零件", null=True, blank=True, on_delete=models.CASCADE)
    QR_Code = models.CharField(max_length=256, verbose_name="二维码", null=True, blank=True)

    class Meta:
        ordering = ['Part__ItemNO']


class Store_Status(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, default=uuid.uuid4, editable=False)
    NO = models.CharField(max_length=20, verbose_name="代码", unique=True)
    Name = models.CharField(max_length=20, verbose_name="名称")

    def __unicode__(self):
        return u'%s' % (self.Name.__str__())

    class Meta:
        verbose_name = "类型"
        verbose_name_plural = "类型汇总"
        ordering = ['NO']


class Store(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, default=uuid.uuid4, editable=False)
    Status = models.ForeignKey(Store_Status, verbose_name="类型", null=True, blank=True, on_delete=models.CASCADE)
    Name = models.CharField(max_length=200, verbose_name="名称")
    Tell = models.CharField(max_length=200, verbose_name="电话")
    Address = models.CharField(max_length=100, verbose_name="地址", null=True, blank=True)
    Company = models.ForeignKey(Company, verbose_name="公司", null=True, blank=True, on_delete=models.CASCADE)

    class Meta:
        ordering = ['Name']


class StoreCon(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, default=uuid.uuid4, editable=False)
    Head = models.ForeignKey(Store, verbose_name="上一级仓库", null=True, blank=True, on_delete=models.CASCADE,
                             related_name='HeadStore')
    Last = models.ForeignKey(Store, verbose_name="下一级仓库", null=True, blank=True, on_delete=models.CASCADE,
                             related_name='LastStore')
    Status = models.CharField(max_length=100, verbose_name="状态", null=True, blank=True)
    isActive = models.BooleanField(verbose_name="是否生效", default=True)

    class Meta:
        ordering = ['Head']


class StoreConPartLive(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, default=uuid.uuid4, editable=False)
    Store = models.ForeignKey(Store, verbose_name="仓库", null=True, blank=True, on_delete=models.CASCADE)
    PartLive = models.ForeignKey(PartLive, verbose_name="物料", null=True, blank=True, on_delete=models.CASCADE)
    Number = models.IntegerField(verbose_name="数量", default=0)

    class Meta:
        ordering = ['PartLive__Part__ItemNO']


class Form_Status(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, default=uuid.uuid4, editable=False)
    NO = models.CharField(max_length=20, verbose_name="代码", unique=True)
    Name = models.CharField(max_length=20, verbose_name="名称")

    def __unicode__(self):
        return u'%s' % (self.Name.__str__())

    class Meta:
        verbose_name = "类型"
        verbose_name_plural = "类型汇总"


class StoreForm(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, default=uuid.uuid4, editable=False)
    Name = models.CharField(max_length=20, verbose_name="名称")
    Status = models.ForeignKey(Form_Status, verbose_name="类型", null=True, blank=True, on_delete=models.CASCADE, )
    OriginStore = models.ForeignKey(Store, verbose_name="仓库", null=True, blank=True, on_delete=models.CASCADE,
                                    related_name='OriginStore')
    TargetStore = models.ForeignKey(Store, verbose_name="目标仓库", null=True, blank=True, on_delete=models.CASCADE,
                                    related_name='TargetStore')
    created_date = models.DateTimeField(verbose_name='创建时间', auto_now_add=True)
    modified_date = models.DateTimeField(verbose_name='最后修改时间', auto_now=True)

    class Meta:
        ordering = ['OriginStore']


class StoreFormConPartLive(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, default=uuid.uuid4, editable=False)
    StoreForm = models.ForeignKey(StoreForm, verbose_name="表单", null=True, blank=True, on_delete=models.CASCADE)
    PartLive = models.ForeignKey(PartLive, verbose_name="物料", null=True, blank=True, on_delete=models.CASCADE)
    Number = models.IntegerField(verbose_name="数量", default=0)

    class Meta:
        ordering = ['StoreForm']
