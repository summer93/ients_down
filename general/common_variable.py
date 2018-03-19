from org import models as org_models


# IENTS_AUTHORITY = []      # 权限清单


class Authority_content:

    def __init__(self, arg):
        self.arg = arg
        self.temp_URL_list = []
        self.temp_NO_list = []

    @property
    def URL_list(self):
        for row in self.arg:
            self.temp_URL_list.append(row[0])
        return self.temp_URL_list

    @property
    def NO_list(self):
        for row in self.arg:
            self.temp_NO_list.append(row[0] + row[1])
        return self.temp_NO_list


def post_authority(request):
    '''
    存储权限URL
    :param request:
    :return:
    '''

    User_id = request.session.get('User_id', None)

    User_obj = org_models.User.objects.filter(id=User_id).first()
    try:
        Company_obj = org_models.User_Con_Company.objects.filter(User_id=User_id).first().Company
    except Exception as e:
        Company_obj = None

    try:
        UserConRole_obj = org_models.User_Con_Role.objects.filter(User_id=User_id)
        Role_obj = UserConRole_obj.first().Role
        Account_Type = Role_obj.Account_Type.NO

    except Exception as e:
        Account_Type = None


    # 所属公司权限对象
    AuthorityCompany_obj = Authority_content(
        org_models.AuthorityCompany.objects.filter(
            Company=Company_obj
        ).values_list('ModuleMenu__URL', 'NO'))

    # UserConCompany_obj = org_models.User_Con_Company.objects.filter(User_id=User_id)
    # AuthorityCompany_URL_list = []
    # AuthorityCompany_NO_list = []
    # for row in UserConCompany_obj:
    #     AuthorityCompany_obj = Authority_content(
    #         org_models.AuthorityCompany.objects.filter(
    #             Company=row.Company
    #         ).values_list('ModuleMenu__URL', 'NO'))
    #     AuthorityCompany_URL_list.extend(AuthorityCompany_obj.URL_list)
    #     AuthorityCompany_NO_list.extend(AuthorityCompany_obj.NO_list)



    # 所属角色权限列表
    UserConRole_obj = org_models.User_Con_Role.objects.filter(User_id=User_id)
    AuthorityRole_URL_list = []
    AuthorityRole_NO_list = []
    for row in UserConRole_obj:
        AuthorityRole_obj = Authority_content(
            org_models.AuthorityRole.objects.filter(
                Role=row.Role
            ).values_list('ModuleMenu__URL', 'NO'))
        AuthorityRole_URL_list.extend(AuthorityRole_obj.URL_list)
        AuthorityRole_NO_list.extend(AuthorityRole_obj.NO_list)

    # 所属部门权限列表
    UserConDepartment_obj = org_models.User_Con_Department.objects.filter(User_id=User_id)
    AuthorityDepartment_URL_list = []
    AuthorityDepartment_NO_list = []
    for row in UserConDepartment_obj:
        AuthorityDepartment_obj = Authority_content(
            org_models.AuthorityDepartment.objects.filter(
                Department=row.Department
            ).values_list('ModuleMenu__URL', 'NO'))
        AuthorityDepartment_URL_list.extend(AuthorityDepartment_obj.URL_list)
        AuthorityDepartment_NO_list.extend(AuthorityDepartment_obj.NO_list)

    # 所属用户权限对象
    AuthorityUser_obj = Authority_content(
        org_models.AuthorityUser.objects.filter(
            User=User_obj
        ).values_list('ModuleMenu__URL', 'NO'))
    AuthorityUser_URL_list = AuthorityUser_obj.URL_list
    AuthorityUser_NO_list = AuthorityUser_obj.NO_list


    # 进行权限URL合并
    All_user_set = set(AuthorityRole_URL_list) | set(AuthorityUser_URL_list) | set(
        AuthorityDepartment_URL_list)
    All_user_NO_set = set(AuthorityRole_NO_list) | set(AuthorityUser_NO_list) | set(
        AuthorityDepartment_NO_list)

    Authority_list = list(All_user_set & set(AuthorityCompany_obj.URL_list))
    Authority_NO_list = list(All_user_NO_set & set(AuthorityCompany_obj.NO_list))

    # 奖用户拥的权限加入session中
    try:
        request.session['Authority_list'] = Authority_list
        request.session['Authority_NO_list'] = Authority_NO_list
        request.session['Company_id'] = Company_obj.id.__str__()
        request.session['Company_Name'] = Company_obj.Name
        request.session['Account_Type'] = Account_Type
    except Exception as e:
        request.session['Company_Name'] = None
        request.session['Random_Str'] = User_obj.id.__str__()
