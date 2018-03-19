from django.db import models
from org.models import *
# from django.contrib.auth.models import User
import uuid
# Create your models here.


class Units(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, default=uuid.uuid4, editable=False)
    Name = models.CharField(max_length=20, verbose_name="名称")
    Company = models.ForeignKey(Company, verbose_name="公司", null=True, blank=True, on_delete=models.CASCADE)

    def __unicode__(self):
        return u'%s' % (self.Name.__str__())

    class Meta:
        verbose_name = "单位"
        verbose_name_plural = "单位汇总"


class Materials(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, default=uuid.uuid4, editable=False)
    Name = models.CharField(max_length=20, verbose_name="名称")
    Company = models.ForeignKey(Company, verbose_name="公司", null=True, blank=True, on_delete=models.CASCADE)

    def __unicode__(self):
        return u'%s' % (self.Name.__str__())

    class Meta:
        verbose_name = "材料"
        verbose_name_plural = "材料汇总"


class DrawingSize(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, default=uuid.uuid4, editable=False)
    Name = models.CharField(max_length=20, verbose_name="名称")
    Size = models.CharField(max_length=20, verbose_name="尺寸", null=True, blank=True)

    def __unicode__(self):
        return u'%s' % (self.Name.__str__())

    class Meta:
        verbose_name = "图幅"
        verbose_name_plural = "图幅汇总"


class PDM_Status(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, default=uuid.uuid4, editable=False)
    NO = models.CharField(max_length=20, verbose_name="代码", unique=True)
    Name = models.CharField(max_length=20, verbose_name="名称")

    def __unicode__(self):
        return u'%s' % (self.Name.__str__())

    class Meta:
        verbose_name = "状态"
        verbose_name_plural = "状态汇总"


class Drawing(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, default=uuid.uuid4, editable=False)
    DocNO = models.CharField(max_length=20, verbose_name="资料号", unique=True)
    Name = models.CharField(max_length=20, verbose_name="名称")
    Size = models.ForeignKey(DrawingSize, verbose_name="图幅", on_delete=models.CASCADE)
    FileName = models.CharField(max_length=100, verbose_name="地址")
    Regtime = models.DateTimeField(verbose_name="创建时间", null=True, blank=True)
    Updatetime = models.DateTimeField(verbose_name="更新时间", null=True, blank=True)
    Rev = models.IntegerField(verbose_name="版本号", default=0)
    Status = models.ForeignKey(PDM_Status, verbose_name="状态", null=True, blank=True, on_delete=models.CASCADE)
    isActive = models.BooleanField(verbose_name="是否生效", default=True)

    def __unicode__(self):
        return u'%s' % (self.Name.__str__())

    class Meta:
        verbose_name = "图纸"
        verbose_name_plural = "图纸汇总"


class Part(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, default=uuid.uuid4, editable=False)
    ItemNO = models.CharField(max_length=30, verbose_name="物号", unique=True)
    DocNO = models.CharField(max_length=30, verbose_name="资料号", null=True, blank=True)
    Name = models.CharField(max_length=200, verbose_name="名称")
    EName = models.CharField(max_length=100, verbose_name="英文名称", null=True, blank=True)
    # isProduct = models.BooleanField(verbose_name="产品", default=False)
    # isParts = models.BooleanField(verbose_name="部件", default=False)
    # isFinish = models.BooleanField(verbose_name="完成", default=False)
    DUser = models.ForeignKey(User, verbose_name="创建人", null=True, blank=True, on_delete=models.CASCADE)
    # Ratetime = models.DateField(verbose_name="考核时间", null=True, blank=True)
    Regtime = models.DateTimeField(verbose_name="创建时间", null=True, blank=True)
    Updatetime = models.DateTimeField(verbose_name="更新时间", null=True, blank=True)
    Material = models.ForeignKey(Materials, verbose_name="材料", null=True, blank=True, on_delete=models.CASCADE)
    Weight = models.FloatField(verbose_name="重量", default=0)
    Unit = models.ForeignKey(Units, verbose_name="单位", null=True, blank=True, on_delete=models.CASCADE)
    # Token = models.CharField(max_length=64, verbose_name="Token", null=True, blank=True)
    Company = models.ForeignKey(Company, verbose_name="公司", null=True, blank=True, on_delete=models.CASCADE)
    Note = models.CharField(max_length=200, verbose_name="备注", null=True, blank=True)
    Rev = models.IntegerField(verbose_name="版本号", default=0)
    Status = models.ForeignKey(PDM_Status, verbose_name="状态", null=True, blank=True, on_delete=models.CASCADE)
    isActive = models.BooleanField(verbose_name="是都生效", default=True)

    def __unicode__(self):
        return u'%s' % (self.ItemNO.__str__() + '#' + self.Name.__str__())

    class Meta:
        verbose_name = "产品"
        verbose_name_plural = "产品汇总"
        unique_together = ("ItemNO", "Company")
