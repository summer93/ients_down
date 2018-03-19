from django.db import models
from django.dispatch import receiver
import uuid
from django.contrib.auth.models import AbstractUser, Permission
from general.models import Module
from general.models import ModuleMenu

# Create your models here.
from django.db.models.signals import post_save


class Company(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, default=uuid.uuid4, editable=False)
    Name = models.CharField(max_length=100, verbose_name="名称")

    def __unicode__(self):
        return u'%s' % (self.Name.__str__())

    class Meta:
        verbose_name = "公司"
        verbose_name_plural = "公司汇总"


class Department(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, default=uuid.uuid4, editable=False)
    Company = models.ForeignKey(Company, verbose_name="公司", on_delete=models.CASCADE)
    Name = models.CharField(max_length=20, verbose_name="名称")
    is_First = models.BooleanField(verbose_name="起点", default=False)

    def __unicode__(self):
        return u'%s' % (self.Name.__str__())

    class Meta:
        verbose_name = "部门"
        verbose_name_plural = "部门汇总"
        ordering = ['Company']


class Department_Con(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, default=uuid.uuid4, editable=False)
    Head = models.ForeignKey(Department, related_name='SJBM', verbose_name="上级部门", on_delete=models.CASCADE)
    Leef = models.ForeignKey(Department, related_name='XJBM', verbose_name="下级部门", on_delete=models.CASCADE)

    def __unicode__(self):
        return u'%s' % (self.Head.__str__())

    class Meta:
        verbose_name = "组织架构"
        verbose_name_plural = "组织架构汇总"
        ordering = ['Head']


class Account_Type(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, default=uuid.uuid4, editable=False)
    NO = models.CharField(max_length=20, unique=True, verbose_name="账户类型代码", default='0')
    Name = models.CharField(max_length=20, verbose_name="账户类型名称")


class Role(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, default=uuid.uuid4, editable=False)
    Account_Type = models.ForeignKey(Account_Type, verbose_name='类型', on_delete=models.CASCADE)
    Company = models.ForeignKey(Company, verbose_name="公司", default=None, blank=True, on_delete=models.CASCADE)
    Name = models.CharField(max_length=20, verbose_name="岗位名称")

    class Meta:
        ordering = ['Company']


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, auto_created=True, default=uuid.uuid4, editable=False)
    Ui_Color = models.CharField(max_length=20, verbose_name="界面颜色", default='contrast-fb')
    Ui_Zoom = models.FloatField(verbose_name="界面缩放系数", default=0.8)
    Design_Rate = models.FloatField(verbose_name="设计系数", default=0.8)
    Phone_Number = models.CharField(max_length=20, verbose_name='手机号码')
    Job_Number = models.CharField(max_length=20, verbose_name='工号', default='000000000')
    Avatar = models.ImageField(verbose_name='头像', default='/images/avatar/default.png')

    # class Meta(AbstractUser.Meta):
    #     swappable = 'AUTH_USER_MODEL'


class AuthorityCompany(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, default=uuid.uuid4, editable=False)
    Company = models.ForeignKey(Company, verbose_name="公司", on_delete=models.CASCADE)
    ModuleMenu = models.ForeignKey(ModuleMenu, verbose_name="模块目录", on_delete=models.CASCADE)
    NO = models.CharField(max_length=20, verbose_name="权限代码", default='0')

    class Meta:
        ordering = ['Company']

    def __unicode__(self):
        return u'%s' % (self.Company.__str__())

class AuthorityDepartment(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, default=uuid.uuid4, editable=False)
    Department = models.ForeignKey(Department, verbose_name="公司", on_delete=models.CASCADE)
    ModuleMenu = models.ForeignKey(ModuleMenu, verbose_name="模块目录", on_delete=models.CASCADE)
    NO = models.CharField(max_length=20, verbose_name="权限代码", default='0')

    class Meta:
        ordering = ['Department']

    def __unicode__(self):
        return u'%s' % (self.Department.__str__())


class AuthorityRole(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, default=uuid.uuid4, editable=False)
    Role = models.ForeignKey(Role, verbose_name="岗位", on_delete=models.CASCADE)
    ModuleMenu = models.ForeignKey(ModuleMenu, verbose_name="模块目录", on_delete=models.CASCADE)  # 添加角色的模块
    NO = models.CharField(max_length=20, verbose_name="权限代码", default='0')

    class Meta:
        ordering = ['Role']

    def __unicode__(self):
        return u'%s' % (self.Role.__str__())


class AuthorityUser(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, default=uuid.uuid4, editable=False)
    User = models.ForeignKey(User, verbose_name="角色", on_delete=models.CASCADE)
    ModuleMenu = models.ForeignKey(ModuleMenu, verbose_name="模块目录", on_delete=models.CASCADE)
    NO = models.CharField(max_length=20, verbose_name="权限代码", default='0')

    def __unicode__(self):
        return u'%s' % (self.User.__str__())


class User_Con_Company(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, default=uuid.uuid4, editable=False)
    User = models.ForeignKey(User, verbose_name="用户", on_delete=models.CASCADE)
    Company = models.ForeignKey(Company, verbose_name="公司", on_delete=models.CASCADE)

    class Meta:
        ordering = ['Company']


class User_Con_Role(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, default=uuid.uuid4, editable=False)
    User = models.ForeignKey(User, verbose_name="用户", on_delete=models.CASCADE)
    Role = models.ForeignKey(Role, verbose_name="岗位", on_delete=models.CASCADE)

    class Meta:
        ordering = ['Role__Company']


class User_Con_Department(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, default=uuid.uuid4, editable=False)
    User = models.ForeignKey(User, verbose_name="用户", on_delete=models.CASCADE)
    Department = models.ForeignKey(Department, verbose_name="部门", on_delete=models.CASCADE)

    class Meta:
        ordering = ['Department__Company']


class Role_Con_Department(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, default=uuid.uuid4, editable=False)
    Role = models.ForeignKey(Role, verbose_name="岗位", on_delete=models.CASCADE)
    Department = models.ForeignKey(Department, verbose_name="部门", on_delete=models.CASCADE)

    class Meta:
        ordering = ['Role__Company']
