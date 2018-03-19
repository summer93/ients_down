from django.db import models
import uuid


# Create your models here.


class Module(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, default=uuid.uuid4, editable=False)
    Name = models.CharField(max_length=100, verbose_name="名称")
    APPName = models.CharField(max_length=100, verbose_name="APP名称")

    def __unicode__(self):
        return u'%s' % (self.Name.__str__() + '#' + self.APPName.__str__())

    class Meta:
        verbose_name = "模块"
        verbose_name_plural = "模块汇总"


class ModuleMenu(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, default=uuid.uuid4, editable=False)
    Display_ICO = models.CharField(max_length=100, verbose_name="图标")  # 例如 icon-cog
    Display_Name = models.CharField(max_length=100, verbose_name="名称")
    URL = models.CharField(max_length=255, verbose_name="入口地址")  # 相对目录不含域名
    P_Menu = models.ForeignKey('self', verbose_name="上级菜单", blank=True, default=None, on_delete=models.CASCADE)
    Module = models.ForeignKey(Module, verbose_name="模块", blank=True, default=None, on_delete=models.CASCADE)

    def __unicode__(self):
        return u'%s' % (self.Display_Name.__str__() + '#' + self.P_Menu.Display_Name.__str__())

    class Meta:
        verbose_name = "模块菜单"
        verbose_name_plural = "模块菜单汇总"
        ordering = ['Display_ICO']


class ModuleInterface(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, default=uuid.uuid4, editable=False)
    Name = models.CharField(max_length=100, verbose_name="名称")
    URL = models.CharField(max_length=255, verbose_name="入口地址")  # 相对目录不含域名
    Json_Request = models.CharField(max_length=255, verbose_name="提交JSON样例", blank=True, default=None)
    Json_Success = models.CharField(max_length=255, verbose_name="返回JSON样例", blank=True, default=None)
    Note = models.CharField(max_length=255, verbose_name="说明", blank=True, default=None)
    Module = models.ForeignKey(Module, verbose_name="模块", blank=True, default=None, on_delete=models.CASCADE)

    def __unicode__(self):
        return u'%s' % (self.Name.__str__() + '#' + self.URL.__str__())

    class Meta:
        verbose_name = "模块接口"
        verbose_name_plural = "模块接口汇总"


class ModuleAuthority(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, default=uuid.uuid4, editable=False)
    Name = models.CharField(max_length=100, verbose_name="名称")
    Mark = models.CharField(max_length=255, verbose_name="代号")
    Note = models.CharField(max_length=255, verbose_name="说明", blank=True, default=None)
    Module = models.ForeignKey(Module, verbose_name="模块", blank=True, default=None, on_delete=models.CASCADE)

    def __unicode__(self):
        return u'%s' % (self.Module.APPName.__str__() + '#' + self.Mark.__str__())

    class Meta:
        verbose_name = "模块权限"
        verbose_name_plural = "模块权限汇总"


class Message(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, default=uuid.uuid4, editable=False)
    NO = models.CharField(max_length=20, verbose_name="代码", unique=True)
    Content = models.CharField(max_length=100, verbose_name="错误信息")

    class Meta:
        ordering = ['NO']
