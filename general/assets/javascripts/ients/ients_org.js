function org_company() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_system').addClass('in');
    $('.my_system_nav').addClass('in').css('display', 'block');
    $('.org_module').addClass('in');
    $('.org_object_nav').addClass('in').css('display', 'block');
    $('.org_module_object').addClass('in');
    $('.org_module_object_nav').addClass('in').css('display', 'block');

    function show(content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {
            'table': 'Company',
            'action': 4000,
            'content': content
        };
        $.ajax({

            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    $('#table').css('display', 'block');
                    var title_obj = arg.content.title;
                    $.each(title_obj, function (i, item) {
                        if (i == 0) {
                            tr.append('<th>选择</th>');
                            return true
                        }


                        tr.append("<th>" + item + "</th>");

                    });
                    tr.append('<th>操作</th>');
                    $('.table_title').append(tr);

                    var vaule_obj = arg.content.value;

                    $.each(vaule_obj, function (i, item) {
                        var tr = $("<tr/>");
                        $.each(item, function (i, item2) {
                            if (i == 0) {

                                tr.append('<td><input type="checkbox" value=' + item2 + '></td>');
                                return true
                            }

                            tr.append("<td>" + item2 + "</td>");


                        });
                        tr.append('<td><button type="button" class="btn btn-warning del_org_company">删除</button>|<a href="#myModal" role="button" class="btn show_edit_org_company" data-toggle="modal">编辑</a></td>');
                        $('.table_data').append(tr);
                    });

                } else {
                    $('.message').text(arg.message);
                    $('#table').children().remove();


                }
            }
        });
    }

    $(document).ready(function () {
        var content = {};
        show(content)
    });

    $('.del_org_company').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var val = {
            'table': 'Company',
            'action': 2000,
            'content': {
                'uuid': uuid
            }
        };


        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    var content = {};
                    show(content);
                }
            }
        })
    });

    $('.add_btn').live('click', function () {
        $('[name="Name"]').val('').attr('placeholder', '');

        $('.edit_org_company').css('display', 'none');
        $('.add_org_companys').css('display', '');

    });

    $('.add_org_company').live('click', function () {
        var token = $.cookie('csrftoken');

        var Name = $('[name="Name"]').val();


        var val = {
            'table': 'Company',
            'action': 1000,
            'content': {

                'Name': Name


            }


        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),

            success: function (arg) {


                if (arg.status) {
                    var content = {};
                    show(content);
                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()

                } else if (arg.errors.Name) {
                    $('[name="Name"]').attr('placeholder', arg.errors.Name[0].message);
                }
            }
        })


    });

    $('.show_edit_org_company').live('click', function () {
        $('.add_org_company').css('display', 'none');
        $('.edit_org_company').css('display', '');
        uuid = $(this).parent().prevAll('td:last').children('input').val();


        var Name = $(this).parent().prevAll('td:eq(0)').text();


        $('[name="Name"]').val(Name).attr('placeholder', '');


    });

    $('.edit_org_company').live('click', function () {
        var token = $.cookie('csrftoken');

        var Name = $('[name="Name"]').val();

        var val = {
            'table': 'Company',
            'action': 3000,
            'content': {
                'uuid': uuid,
                'Name': Name

            }

        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    var content = {};
                    show(content);

                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()

                } else if (arg.errors.Name) {
                    $('[name="Name"]').attr('placeholder', arg.errors.Name[0].message);
                }
            }
        })


    });


}

function org_department() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_system').addClass('in');
    $('.my_system_nav').addClass('in').css('display', 'block');
    $('.org_module').addClass('in');
    $('.org_object_nav').addClass('in').css('display', 'block');
    $('.org_module_object').addClass('in');
    $('.org_module_object_nav').addClass('in').css('display', 'block');

    function show(content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {
            'table': 'Department',
            'action': 4000,
            'content': content
        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    $('#table').css('display', 'block');
                    var title_obj = arg.content.title;
                    $.each(title_obj, function (i, item) {
                        if (i == 0) {
                            tr.append('<th>选择</th>');
                            return true
                        }
                        if (i == 1) {
                            return true
                        }


                        tr.append("<th>" + item + "</th>");

                    });
                    tr.append('<th>操作</th>');
                    $('.table_title').append(tr);

                    var vaule_obj = arg.content.value;

                    $.each(vaule_obj, function (i, item) {
                        var tr = $("<tr/>");
                        $.each(item, function (i, item2) {
                            if (i == 0) {

                                tr.append('<td><input type="checkbox" value=' + item2 + '></td>');
                                return true
                            }
                            if (i == 1) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }

                            tr.append("<td>" + item2 + "</td>");


                        });
                        tr.append('<td><button type="button" class="btn btn-warning del_org_department">删除</button>|<a href="#myModal" role="button" class="btn show_edit_org_department" data-toggle="modal">编辑</a></td>');
                        $('.table_data').append(tr);
                    });

                } else {
                    $('.message').text(arg.message);
                    $('#table').children().remove();
                }
            }
        });
    }

    $(document).ready(function () {
        var content = {};
        show(content)
    });

    $('.change_Company').live('click', function () {
        var Company_id = $('[name="Company_change_id"]').val();

        var content = {
            'Company_id': Company_id

        };
        show(content)
    });

    $('.del_org_department').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var val = {
            'table': 'Department',
            'action': 2000,
            'content': {
                'uuid': uuid
            }
        };


        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    var Company_id = $('[name="Company_change_id"]').val();

                    var content = {
                        'Company_id': Company_id

                    };
                    show(content);
                } else {
                    $('.message').text(arg.message);
                }
            }
        })
    });

    $('.add_btn').live('click', function () {
        $('[name="Name"]').val('').attr('placeholder', '');
        var Company_id = $('[name="Company_change_id"]').val();
        $('[name="Company_id"]').val(Company_id);


        $('.edit_org_department').css('display', 'none');
        $('.add_org_department').css('display', '');

    });

    $('.add_org_department').live('click', function () {
        var token = $.cookie('csrftoken');

        var Name = $('[name="Name"]').val();
        var Company_id = $('[name="Company_id"]').val();


        var val = {
            'table': 'Department',
            'action': 1000,
            'content': {

                'Name': Name,
                'Company_id': Company_id


            }


        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),

            success: function (arg) {


                if (arg.status) {
                    var Company_id = $('[name="Company_change_id"]').val();

                    var content = {
                        'Company_id': Company_id

                    };

                    show(content);
                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()
                } else if (arg.errors.Name) {
                    $('[name="Name"]').attr('placeholder', arg.errors.Name[0].message);
                }
            }
        })


    });

    $('.show_edit_org_department').live('click', function () {
        $('.add_org_department').css('display', 'none');
        $('.edit_org_department').css('display', '');
        uuid = $(this).parent().prevAll('td:last').children('input').val();
        var Company_id = $(this).parent().prevAll('td:eq(3)').children('input').val();

        var Name = $(this).parent().prevAll('td:eq(1)').text();


        $('[name="Name"]').val(Name).attr('placeholder', '');
        $('[name="Company_id"]').val(Company_id);


    });

    $('.edit_org_department').live('click', function () {
        var token = $.cookie('csrftoken');

        var Name = $('[name="Name"]').val();
        var Company_id = $('[name="Company_id"]').val();

        var val = {
            'table': 'Department',
            'action': 3000,
            'content': {
                'uuid': uuid,
                'Name': Name,
                'Company_id': Company_id

            }

        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    var Company_id = $('[name="Company_change_id"]').val();

                    var content = {
                        'Company_id': Company_id

                    };
                    show(content);

                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()
                } else if (arg.errors.Name) {
                    $('[name="Name"]').attr('placeholder', arg.errors.Name[0].message);
                }
            }
        })


    });


}

function org_department_con() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_system').addClass('in');
    $('.my_system_nav').addClass('in').css('display', 'block');
    $('.org_module').addClass('in');
    $('.org_object_nav').addClass('in').css('display', 'block');
    $('.org_module_object').addClass('in');
    $('.org_module_object_nav').addClass('in').css('display', 'block');

    function show(content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {
            'table': 'Department_Con',
            'action': 4000,
            'content': content
        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    $('#table').css('display', 'block');
                    var title_obj = arg.content.title;
                    $.each(title_obj, function (i, item) {
                        if (i == 0) {
                            tr.append('<th>选择</th>');
                            return true
                        }


                        tr.append("<th>" + item + "</th>");

                    });
                    tr.append('<th>操作</th>');
                    $('.table_title').append(tr);

                    var vaule_obj = arg.content.value;

                    $.each(vaule_obj, function (i, item) {
                        var tr = $("<tr/>");
                        $.each(item, function (i, item2) {
                            if (i == 0) {

                                tr.append('<td><input type="checkbox" value=' + item2 + '></td>');
                                return true
                            }


                            tr.append("<td>" + item2 + "</td>");


                        });
                        tr.append('<td><button type="button" class="btn btn-warning del_department_con">删除</button></td>');
                        $('.table_data').append(tr);
                    });

                } else {
                    $('.message').text(arg.message);
                    $('#table').children().remove();
                }
            }
        });
    }

    $(document).ready(function () {
        var content = {};
        show(content)
    });

    $('.change_Company').live('click', function () {
        var Company_id = $('[name="Company_change_id"]').val();
        var content = {
            'Company_id': Company_id

        };
        show(content)
    });

    $('.del_department_con').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var val = {
            'table': 'Department_Con',
            'action': 2000,
            'content': {
                'uuid': uuid
            }
        };

        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    var content = {};
                    show(content);
                } else {
                    $('.message').text(arg.message);
                }
            }
        })
    });

    $('.add_btn').live('click', function () {
        $('[name="Head_id"]').val('');
        $('[name="Leef_id"]').val('');


    });

    $('.add_department_con').live('click', function () {
        var token = $.cookie('csrftoken');
        var Head_id = $('[name="Head_id"]').val();
        var Leef_id = $('[name="Leef_id"]').val();
        var val = {
            'table': 'Department_Con',
            'action': 1000,
            'content': {
                'Head_id': Head_id,
                'Leef_id': Leef_id

            }


        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),

            success: function (arg) {


                if (arg.status) {
                    var content = {};
                    show(content);
                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()

                }
            }
        })


    });


}

function org_account_type() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_system').addClass('in');
    $('.my_system_nav').addClass('in').css('display', 'block');
    $('.org_module').addClass('in');
    $('.org_object_nav').addClass('in').css('display', 'block');
    $('.org_module_object').addClass('in');
    $('.org_module_object_nav').addClass('in').css('display', 'block');

    function show(content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {
            'table': 'Account_Type',
            'action': 4000,
            'content': content
        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {


                if (arg.status) {
                    $('#table').css('display', 'block');
                    var title_obj = arg.content.title;
                    $.each(title_obj, function (i, item) {

                        if (i == 0) {
                            tr.append('<th>选择</th>');
                            return true
                        }

                        tr.append("<th>" + item + "</th>");
                    });
                    tr.append('<th>操作</th>');
                    $('.table_title').append(tr);

                    var vaule_obj = arg.content.value;

                    $.each(vaule_obj, function (i, item) {
                        var tr = $("<tr/>");
                        $.each(item, function (i, item2) {
                            if (i == 0) {

                                tr.append('<td><input type="checkbox" value=' + item2 + '></td>');
                                return true
                            }
                            tr.append("<td>" + item2 + "</td>");

                        });
                        tr.append('<td><input type="text" style="display: none" value=></input><button type="button" class="btn btn-warning del_account_type">删除</button>--<a href="#myModal" role="button" class="btn show_edit_account_type" data-toggle="modal">编辑</a></td>');

                        $('.table_data').append(tr);
                    });

                } else {
                    $('.message').text(arg.message);
                    $('#table').children().remove();
                }
            }
        });
    }

    $(document).ready(function () {
        var content = {};
        show(content)
    });

    $('.del_account_type').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var val = {
            'table': 'Account_Type',
            'action': 2000,
            'content': {
                'uuid': uuid
            }
        };

        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    var content = {};
                    show(content);
                } else {
                    $('.message').text(arg.message);
                }
            }
        })
    });

    $('.add_btn').live('click', function () {
        $('[name="Name"]').val('').attr('placeholder', '');
        $('[name="NO"]').val('').attr('placeholder', '');
        $('.edit_account_type').css('display', 'none');
        $('.add_account_type').css('display', '');
    });


    $('.add_account_type').live('click', function () {
        var token = $.cookie('csrftoken');
        var Name = $('[name="Name"]').val();
        var NO = $('[name="NO"]').val();
        var val = {
            'table': 'Account_Type',
            'action': 1000,
            'content': {
                'Name': Name,
                'NO': NO

            }


        };

        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),

            success: function (arg) {

                if (arg.status) {
                    var content = {};
                    show(content);
                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()

                } else if (arg.errors.NO) {
                    $('[name="NO"]').attr('placeholder', arg.errors.NO[0].message);
                } else if (arg.errors.Name) {
                    $('[name="Name"]').attr('placeholder', arg.errors.Name[0].message);
                }
            }
        })


    });

    $('.show_edit_account_type').live('click', function () {
        $('.add_account_type').css('display', 'none');
        $('.edit_account_type').css('display', '');
        uuid = $(this).parent().prevAll('td:last').children('input').val();

        var NO = $(this).parent().prevAll('td:eq(1)').text();
        var Name = $(this).parent().prevAll('td:eq(0)').text();

        $('[name="Name"]').val(Name).attr('placeholder', '');
        $('[name="NO"]').val(NO).attr('placeholder', '');

    });

    $('.edit_account_type').live('click', function () {
        var token = $.cookie('csrftoken');
        var Name = $('[name="Name"]').val();
        var NO = $('[name="NO"]').val();

        var val = {
            'table': 'Account_Type',
            'action': 3000,
            'content': {
                'uuid': uuid,
                'NO': NO,
                'Name': Name
            }

        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    var content = {};
                    show(content);

                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()

                } else if (arg.errors.NO) {
                    $('[name="NO"]').attr('placeholder', arg.errors.NO[0].message);
                } else if (arg.errors.Name) {
                    $('[name="Name"]').attr('placeholder', arg.errors.Name[0].message);
                }
            }
        })

    });

}

function org_role() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_system').addClass('in');
    $('.my_system_nav').addClass('in').css('display', 'block');
    $('.org_module').addClass('in');
    $('.org_object_nav').addClass('in').css('display', 'block');
    $('.org_module_object').addClass('in');
    $('.org_module_object_nav').addClass('in').css('display', 'block');

    function show(content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {
            'table': 'Role',
            'action': 4000,
            'content': content
        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    $('#table').css('display', 'block');
                    var title_obj = arg.content.title;
                    $.each(title_obj, function (i, item) {
                        if (i == 0) {
                            tr.append('<th>选择</th>');
                            return true
                        }
                        if (i == 1) {
                            return true
                        }
                        if (i == 4) {
                            return true
                        }


                        tr.append("<th>" + item + "</th>");

                    });
                    tr.append('<th>操作</th>');
                    $('.table_title').append(tr);

                    var vaule_obj = arg.content.value;

                    $.each(vaule_obj, function (i, item) {
                        var tr = $("<tr/>");
                        $.each(item, function (i, item2) {
                            if (i == 0) {

                                tr.append('<td><input type="checkbox" value=' + item2 + '></td>');
                                return true
                            }
                            if (i == 1) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }
                            if (i == 4) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }

                            tr.append("<td>" + item2 + "</td>");


                        });
                        tr.append('<td><button type="button" class="btn btn-warning del_org_role">删除</button>|<a href="#myModal" role="button" class="btn show_edit_org_role" data-toggle="modal">编辑</a></td>');
                        $('.table_data').append(tr);
                    });

                } else {
                    $('.message').text(arg.message);
                    $('#table').children().remove();
                }
            }
        });
    }

    $(document).ready(function () {
        var content = {};
        show(content)
    });

    $('.change_Company').live('click', function () {
        var Company_id = $('[name="Company_change_id"]').val();

        var content = {
            'Company_id': Company_id

        };
        show(content)
    });

    $('.del_org_role').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var val = {
            'table': 'Role',
            'action': 2000,
            'content': {
                'uuid': uuid
            }
        };


        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    $('#table').css('display', 'block');
                    var Company_id = $('[name="Company_change_id"]').val();

                    var content = {
                        'Company_id': Company_id

                    };
                    show(content);
                } else {
                    $('.message').text(arg.message);
                }
            }
        })
    });

    $('.add_btn').live('click', function () {
        $('[name="Name"]').val('').attr('placeholder', '');
        var Company_id = $('[name="Company_change_id"]').val();
        $('[name="Company_id"]').val(Company_id);


        $('.edit_org_role').css('display', 'none');
        $('.add_org_role').css('display', '');

    });

    $('.add_org_role').live('click', function () {
        var token = $.cookie('csrftoken');

        var Name = $('[name="Name"]').val();
        var Company_id = $('[name="Company_id"]').val();
        var Account_Type_id = $('[name="Account_Type_id"]').val();


        var val = {
            'table': 'Role',
            'action': 1000,
            'content': {

                'Name': Name,
                'Company_id': Company_id,
                'Account_Type_id': Account_Type_id


            }

        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),

            success: function (arg) {


                if (arg.status) {
                    var Company_id = $('[name="Company_change_id"]').val();

                    var content = {
                        'Company_id': Company_id

                    };

                    show(content);
                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()
                } else if (arg.errors.Name) {
                    $('[name="Name"]').attr('placeholder', arg.errors.Name[0].message);
                }
            }
        })


    });

    $('.show_edit_org_role').live('click', function () {
        $('.add_org_role').css('display', 'none');
        $('.edit_org_role').css('display', '');
        uuid = $(this).parent().prevAll('td:last').children('input').val();
        var Company_id = $(this).parent().prevAll('td:eq(4)').children('input').val();
        var Account_Type_id = $(this).parent().prevAll('td:eq(1)').children('input').val();

        var Name = $(this).parent().prevAll('td:eq(2)').text();


        $('[name="Name"]').val(Name).attr('placeholder', '');
        $('[name="Company_id"]').val(Company_id);
        $('[name="Account_Type_id"]').val(Account_Type_id);


    });

    $('.edit_org_role').live('click', function () {
        var token = $.cookie('csrftoken');

        var Name = $('[name="Name"]').val();
        var Company_id = $('[name="Company_id"]').val();
        var Account_Type_id = $('[name="Account_Type_id"]').val();

        var val = {
            'table': 'Role',
            'action': 3000,
            'content': {
                'uuid': uuid,
                'Name': Name,
                'Company_id': Company_id,
                'Account_Type_id': Account_Type_id

            }

        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    var Company_id = $('[name="Company_change_id"]').val();

                    var content = {
                        'Company_id': Company_id

                    };
                    show(content);

                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()
                } else if (arg.errors.Name) {
                    $('[name="Name"]').attr('placeholder', arg.errors.Name[0].message);
                }
            }
        })

    });


}

function org_user() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_system').addClass('in');
    $('.my_system_nav').addClass('in').css('display', 'block');
    $('.org_module').addClass('in');
    $('.org_object_nav').addClass('in').css('display', 'block');
    $('.org_module_object').addClass('in');
    $('.org_module_object_nav').addClass('in').css('display', 'block');

    function show(content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {
            'table': 'User',
            'action': 4000,
            'content': content
        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    $('#table').css('display', 'block');
                    var title_obj = arg.content.title;
                    $.each(title_obj, function (i, item) {
                        if (i == 0) {
                            tr.append('<th>选择</th>');
                            return true
                        }


                        tr.append("<th>" + item + "</th>");

                    });
                    tr.append('<th>操作</th>');
                    $('.table_title').append(tr);

                    var vaule_obj = arg.content.value;

                    $.each(vaule_obj, function (i, item) {
                        var tr = $("<tr/>");
                        $.each(item, function (i, item2) {
                            if (i == 0) {

                                tr.append('<td><input type="checkbox" value=' + item2 + '></td>');
                                return true
                            }


                            tr.append("<td>" + item2 + "</td>");


                        });
                        tr.append('<td><button type="button" class="btn btn-warning del_org_user">删除</button>|<a href="#myModal" role="button" class="btn show_edit_org_user" data-toggle="modal">编辑</a></td>');
                        $('.table_data').append(tr);
                    });

                } else {
                    $('.message').text(arg.message);
                    $('#table').children().remove();
                }
            }
        });
    }

    $(document).ready(function () {
        var content = {};
        show(content)
    });

    $('.del_org_user').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var val = {
            'table': 'User',
            'action': 2000,
            'content': {
                'uuid': uuid
            }
        };


        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    var content = {};
                    show(content);
                } else {
                    $('.message').text(arg.message);
                }
            }
        })
    });


    $('.show_edit_org_user').live('click', function () {
        $('.add_org_user').css('display', 'none');
        $('.edit_org_user').css('display', '');
        uuid = $(this).parent().prevAll('td:last').children('input').val();


        var Design_Rate = $(this).parent().prevAll('td:eq(0)').text();
        var Ui_Zoom = $(this).parent().prevAll('td:eq(1)').text();
        var Ui_Color = $(this).parent().prevAll('td:eq(2)').text();
        var Job_Number = $(this).parent().prevAll('td:eq(3)').text();
        var Phone_Number = $(this).parent().prevAll('td:eq(4)').text();
        var email = $(this).parent().prevAll('td:eq(5)').text();
        var username = $(this).parent().prevAll('td:eq(6)').text();


        $('[name="Design_Rate"]').val(Design_Rate).attr('placeholder', '');
        $('[name="Ui_Zoom"]').val(Ui_Zoom).attr('placeholder', '');
        $('[name="Ui_Color"]').val(Ui_Color).attr('placeholder', '');
        $('[name="Job_Number"]').val(Job_Number).attr('placeholder', '');
        $('[name="Phone_Number"]').val(Phone_Number).attr('placeholder', '');
        $('[name="email"]').val(email).attr('placeholder', '');
        $('[name="username"]').val(username).attr('placeholder', '');


    });

    $('.edit_org_user').live('click', function () {
        var token = $.cookie('csrftoken');

        var Design_Rate = $('[name="Design_Rate"]').val();
        var Ui_Zoom = $('[name="Ui_Zoom"]').val();
        var Ui_Color = $('[name="Ui_Color"]').val();
        var Job_Number = $('[name="Job_Number"]').val();
        var Phone_Number = $('[name="Phone_Number"]').val();
        var email = $('[name="email"]').val();
        var username = $('[name="username"]').val();

        var val = {
            'table': 'User',
            'action': 3000,
            'content': {
                'uuid': uuid,
                'Design_Rate': Design_Rate,
                'Ui_Zoom': Ui_Zoom,
                'Ui_Color': Ui_Color,
                'Job_Number': Job_Number,
                'Phone_Number': Phone_Number,
                'email': email,
                'username': username

            }

        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    var content = {};
                    show(content);

                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()

                } else if (arg.errors.username) {
                    $('[name="username"]').val('').attr('placeholder', arg.errors.username[0].message);
                } else if (arg.errors.email) {
                    $('[name="email"]').val('').attr('placeholder', arg.errors.email[0].message);
                } else if (arg.errors.Phone_Number) {
                    $('[name="Phone_Number"]').val('').attr('placeholder', arg.errors.Phone_Number[0].message);
                } else if (arg.errors.Job_Number) {
                    $('[name="Job_Number"]').val('').attr('placeholder', arg.errors.Job_Number[0].message);
                } else if (arg.errors.Ui_Color) {
                    $('[name="Ui_Color"]').val('').attr('placeholder', arg.errors.Ui_Color[0].message);
                } else if (arg.errors.Ui_Zoom) {
                    $('[name="Ui_Zoom"]').val('').attr('placeholder', arg.errors.Ui_Zoom[0].message);
                } else if (arg.errors.Design_Rate) {
                    $('[name="Design_Rate"]').val('').attr('placeholder', arg.errors.Design_Rate[0].message);
                }
            }
        })


    });


}

function org_authority_company() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_system').addClass('in');
    $('.my_system_nav').addClass('in').css('display', 'block');
    $('.org_module').addClass('in');
    $('.org_object_nav').addClass('in').css('display', 'block');
    $('.org_module_object').addClass('in');
    $('.org_module_object_nav').addClass('in').css('display', 'block');

    function show(content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {
            'table': 'AuthorityCompany',
            'action': 4000,
            'content': content
        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    $('#table').css('display', 'block');
                    var title_obj = arg.content.title;
                    $.each(title_obj, function (i, item) {
                        if (i == 0) {
                            tr.append('<th>选择</th>');
                            return true
                        }
                        if (i == 1) {
                            return true
                        }
                        if (i == 3) {
                            return true
                        }


                        tr.append("<th>" + item + "</th>");

                    });
                    tr.append('<th>操作</th>');
                    $('.table_title').append(tr);

                    var vaule_obj = arg.content.value;

                    $.each(vaule_obj, function (i, item) {
                        var tr = $("<tr/>");
                        $.each(item, function (i, item2) {
                            if (i == 0) {

                                tr.append('<td><input type="checkbox" value=' + item2 + '></td>');
                                return true
                            }
                            if (i == 1) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }
                            if (i == 3) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }

                            tr.append("<td>" + item2 + "</td>");


                        });
                        tr.append('<td><button type="button" class="btn btn-warning del_org_authority_company">删除</button>|<a href="#myModal" role="button" class="btn show_edit_org_authority_company" data-toggle="modal">编辑</a></td>');
                        $('.table_data').append(tr);
                    });

                } else {
                    $('.message').text(arg.message);
                    $('#table').children().remove();
                }
            }
        });
    }

    $(document).ready(function () {
        var content = {};
        show(content)
    });

    $('.change_Company').live('click', function () {
        var Company_id = $('[name="Company_change_id"]').val();

        var content = {
            'Company_id': Company_id

        };
        show(content)
    });

    $('.del_org_authority_company').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var val = {
            'table': 'AuthorityCompany',
            'action': 2000,
            'content': {
                'uuid': uuid
            }
        };


        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    var Company_id = $('[name="Company_change_id"]').val();

                    var content = {
                        'Company_id': Company_id

                    };
                    show(content);
                } else {
                    $('.message').text(arg.message);
                }
            }
        })
    });

    $('.add_btn').live('click', function () {
        $('[name="NO"]').val('').attr('placeholder', '');
        var Company_id = $('[name="Company_change_id"]').val();
        $('[name="Company_id"]').val(Company_id);
        $('.edit_org_authority_company').css('display', 'none');
        $('.add_org_authority_company').css('display', '');

    });

    $('.add_org_authority_company').live('click', function () {
        var token = $.cookie('csrftoken');

        var NO = $('[name="NO"]').val();
        var Company_id = $('[name="Company_id"]').val();
        var ModuleMenu_id = $('[name="ModuleMenu_id"]').val();


        var val = {
            'table': 'AuthorityCompany',
            'action': 1000,
            'content': {

                'NO': NO,
                'Company_id': Company_id,
                'ModuleMenu_id': ModuleMenu_id


            }


        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),

            success: function (arg) {


                if (arg.status) {
                    var Company_id = $('[name="Company_change_id"]').val();

                    var content = {
                        'Company_id': Company_id

                    };

                    show(content);
                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()
                } else if (arg.errors.NO) {
                    $('[name="NO"]').val('').attr('placeholder', arg.errors.NO[0].message);
                }

            }
        })


    });

    $('.show_edit_org_authority_company').live('click', function () {
        $('.add_org_authority_company').css('display', 'none');
        $('.edit_org_authority_company').css('display', '');
        uuid = $(this).parent().prevAll('td:last').children('input').val();
        var ModuleMenu_id = $(this).parent().prevAll('td:eq(2)').children('input').val();
        var Company_id = $(this).parent().prevAll('td:eq(4)').children('input').val();

        var NO = $(this).parent().prevAll('td:eq(0)').text();


        $('[name="NO"]').val(NO).attr('placeholder', '');
        $('[name="ModuleMenu_id"]').val(ModuleMenu_id);
        $('[name="Company_id"]').val(Company_id);


    });

    $('.edit_org_authority_company').live('click', function () {
        var token = $.cookie('csrftoken');

        var NO = $('[name="NO"]').val();
        var Company_id = $('[name="Company_id"]').val();
        var ModuleMenu_id = $('[name="ModuleMenu_id"]').val();

        var val = {
            'table': 'AuthorityCompany',
            'action': 3000,
            'content': {
                'uuid': uuid,
                'NO': NO,
                'Company_id': Company_id,
                'ModuleMenu_id': ModuleMenu_id


            }

        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    var Company_id = $('[name="Company_change_id"]').val();

                    var content = {
                        'Company_id': Company_id

                    };
                    show(content);

                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()
                } else if (arg.errors.NO) {
                    $('[name="NO"]').val('').attr('placeholder', arg.errors.NO[0].message);
                }
            }
        })


    });


}

function org_authority_department() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_system').addClass('in');
    $('.my_system_nav').addClass('in').css('display', 'block');
    $('.org_module').addClass('in');
    $('.org_object_nav').addClass('in').css('display', 'block');
    $('.org_module_object').addClass('in');
    $('.org_module_object_nav').addClass('in').css('display', 'block');

    function show(content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {
            'table': 'AuthorityDepartment',
            'action': 4000,
            'content': content
        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    $('#table').css('display', 'block');
                    var title_obj = arg.content.title;
                    $.each(title_obj, function (i, item) {
                        if (i == 0) {
                            tr.append('<th>选择</th>');
                            return true
                        }
                        if (i == 1) {
                            return true
                        }
                        if (i == 4) {
                            return true
                        }


                        tr.append("<th>" + item + "</th>");

                    });
                    tr.append('<th>操作</th>');
                    $('.table_title').append(tr);

                    var vaule_obj = arg.content.value;

                    $.each(vaule_obj, function (i, item) {
                        var tr = $("<tr/>");
                        $.each(item, function (i, item2) {
                            if (i == 0) {

                                tr.append('<td><input type="checkbox" value=' + item2 + '></td>');
                                return true
                            }
                            if (i == 1) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }
                            if (i == 4) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }

                            tr.append("<td>" + item2 + "</td>");


                        });
                        tr.append('<td><button type="button" class="btn btn-warning del_org_authority_department">删除</button>|<a href="#myModal" role="button" class="btn show_edit_org_authority_department" data-toggle="modal">编辑</a></td>');
                        $('.table_data').append(tr);
                    });

                } else {
                    $('.message').text(arg.message);
                    $('#table').children().remove();
                }
            }
        });
    }

    $(document).ready(function () {
        var content = {};
        show(content)
    });

    $('.change_Department').live('click', function () {
        var Department_id = $('[name="Department_change_id"]').val();

        var content = {
            'Department_id': Department_id

        };
        show(content)
    });

    $('.del_org_authority_department').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var val = {
            'table': 'AuthorityDepartment',
            'action': 2000,
            'content': {
                'uuid': uuid
            }
        };


        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    var Department_id = $('[name="Department_change_id"]').val();

                    var content = {
                        'Department_id': Department_id

                    };
                    show(content);
                } else {
                    $('.message').text(arg.message);
                }
            }
        })
    });

    $('.add_btn').live('click', function () {
        $('[name="NO"]').val('').attr('placeholder', '');
        var Department_id = $('[name="Department_change_id"]').val();
        $('[name="Department_id"]').val(Department_id);
        $('.edit_org_authority_department').css('display', 'none');
        $('.add_org_authority_department').css('display', '');

    });

    $('.add_org_authority_department').live('click', function () {
        var token = $.cookie('csrftoken');

        var NO = $('[name="NO"]').val();
        var Department_id = $('[name="Department_id"]').val();
        var ModuleMenu_id = $('[name="ModuleMenu_id"]').val();


        var val = {
            'table': 'AuthorityDepartment',
            'action': 1000,
            'content': {

                'NO': NO,
                'Department_id': Department_id,
                'ModuleMenu_id': ModuleMenu_id


            }


        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),

            success: function (arg) {


                if (arg.status) {
                    var Department_id = $('[name="Department_change_id"]').val();

                    var content = {
                        'Department_id': Department_id

                    };

                    show(content);
                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()
                } else if (arg.errors.NO) {
                    $('[name="NO"]').val('').attr('placeholder', arg.errors.NO[0].message);
                }

            }
        })


    });

    $('.show_edit_org_authority_department').live('click', function () {
        $('.add_org_authority_department').css('display', 'none');
        $('.edit_org_authority_department').css('display', '');
        uuid = $(this).parent().prevAll('td:last').children('input').val();
        var ModuleMenu_id = $(this).parent().prevAll('td:eq(2)').children('input').val();
        var Department_id = $(this).parent().prevAll('td:eq(5)').children('input').val();

        var NO = $(this).parent().prevAll('td:eq(0)').text();


        $('[name="NO"]').val(NO).attr('placeholder', '');
        $('[name="ModuleMenu_id"]').val(ModuleMenu_id);
        $('[name="Department_id"]').val(Department_id);


    });

    $('.edit_org_authority_department').live('click', function () {
        var token = $.cookie('csrftoken');

        var NO = $('[name="NO"]').val();
        var Department_id = $('[name="Department_id"]').val();
        var ModuleMenu_id = $('[name="ModuleMenu_id"]').val();

        var val = {
            'table': 'AuthorityDepartment',
            'action': 3000,
            'content': {
                'uuid': uuid,
                'NO': NO,
                'Department_id': Department_id,
                'ModuleMenu_id': ModuleMenu_id


            }

        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    var Department_id = $('[name="Department_change_id"]').val();

                    var content = {
                        'Department_id': Department_id

                    };
                    show(content);

                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()
                } else if (arg.errors.NO) {
                    $('[name="NO"]').val('').attr('placeholder', arg.errors.NO[0].message);
                }
            }
        })


    });


}

function org_authority_role() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_system').addClass('in');
    $('.my_system_nav').addClass('in').css('display', 'block');
    $('.org_module').addClass('in');
    $('.org_object_nav').addClass('in').css('display', 'block');
    $('.org_module_object').addClass('in');
    $('.org_module_object_nav').addClass('in').css('display', 'block');

    function show(content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {
            'table': 'AuthorityRole',
            'action': 4000,
            'content': content
        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    $('#table').css('display', 'block');
                    var title_obj = arg.content.title;
                    $.each(title_obj, function (i, item) {
                        if (i == 0) {
                            tr.append('<th>选择</th>');
                            return true
                        }
                        if (i == 1) {
                            return true
                        }
                        if (i == 4) {
                            return true
                        }


                        tr.append("<th>" + item + "</th>");

                    });
                    tr.append('<th>操作</th>');
                    $('.table_title').append(tr);

                    var vaule_obj = arg.content.value;

                    $.each(vaule_obj, function (i, item) {
                        var tr = $("<tr/>");
                        $.each(item, function (i, item2) {
                            if (i == 0) {

                                tr.append('<td><input type="checkbox" value=' + item2 + '></td>');
                                return true
                            }
                            if (i == 1) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }
                            if (i == 4) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }

                            tr.append("<td>" + item2 + "</td>");


                        });
                        tr.append('<td><button type="button" class="btn btn-warning del_org_authority_role">删除</button>|<a href="#myModal" role="button" class="btn show_edit_org_authority_role" data-toggle="modal">编辑</a></td>');
                        $('.table_data').append(tr);
                    });

                } else {
                    $('.message').text(arg.message);
                    $('#table').children().remove();
                }
            }
        });
    }

    $(document).ready(function () {
        var content = {};
        show(content)
    });

    $('.change_Role').live('click', function () {
        var Role_id = $('[name="Role_change_id"]').val();

        var content = {
            'Role_id': Role_id

        };
        show(content)
    });

    $('.del_org_authority_role').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var val = {
            'table': 'AuthorityRole',
            'action': 2000,
            'content': {
                'uuid': uuid
            }
        };


        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    var Role_id = $('[name="Role_change_id"]').val();

                    var content = {
                        'Role_id': Role_id

                    };
                    show(content);
                } else {
                    $('.message').text(arg.message);
                }
            }
        })
    });

    $('.add_btn').live('click', function () {
        $('[name="NO"]').val('').attr('placeholder', '');
        var Role_id = $('[name="Role_change_id"]').val();
        $('[name="Role_id"]').val(Role_id);
        $('.edit_org_authority_role').css('display', 'none');
        $('.add_org_authority_role').css('display', '');

    });

    $('.add_org_authority_role').live('click', function () {
        var token = $.cookie('csrftoken');

        var Role_id = $('[name="Role_id"]').val();
        var ModuleMenu_id = $('[name="ModuleMenu_id"]').val();
        var NO = $('[name="NO"]').val();


        var val = {
            'table': 'AuthorityRole',
            'action': 1000,
            'content': {

                'Role_id': Role_id,
                'ModuleMenu_id': ModuleMenu_id,
                'NO': NO


            }


        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),

            success: function (arg) {


                if (arg.status) {
                    var Role_id = $('[name="Role_change_id"]').val();

                    var content = {
                        'Role_id': Role_id

                    };

                    show(content);
                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()

                } else if (arg.errors.NO) {
                    $('[name="NO"]').val('').attr('placeholder', arg.errors.NO[0].message);
                }
            }
        })


    });

    $('.show_edit_org_authority_role').live('click', function () {
        $('.add_org_authority_role').css('display', 'none');
        $('.edit_org_authority_role').css('display', '');
        uuid = $(this).parent().prevAll('td:last').children('input').val();

        var ModuleMenu_id = $(this).parent().prevAll('td:eq(2)').children('input').val();
        var Role_id = $(this).parent().prevAll('td:eq(5)').children('input').val();


        var NO = $(this).parent().prevAll('td:eq(0)').text();


        $('[name="NO"]').val(NO).attr('placeholder', '');
        $('[name="ModuleMenu_id"]').val(ModuleMenu_id);
        $('[name="Role_id"]').val(Role_id);


    });

    $('.edit_org_authority_role').live('click', function () {
        var token = $.cookie('csrftoken');

        var NO = $('[name="NO"]').val();
        var Role_id = $('[name="Role_id"]').val();
        var ModuleMenu_id = $('[name="ModuleMenu_id"]').val();

        var val = {
            'table': 'AuthorityRole',
            'action': 3000,
            'content': {
                'uuid': uuid,
                'NO': NO,
                'Role_id': Role_id,
                'ModuleMenu_id': ModuleMenu_id


            }

        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    var Role_id = $('[name="Role_change_id"]').val();

                    var content = {
                        'Role_id': Role_id

                    };
                    show(content);

                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()

                } else if (arg.errors.NO) {
                    $('[name="NO"]').val('').attr('placeholder', arg.errors.NO[0].message);
                }
            }
        })


    });


}

function org_authority_user() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_system').addClass('in');
    $('.my_system_nav').addClass('in').css('display', 'block');
    $('.org_module').addClass('in');
    $('.org_object_nav').addClass('in').css('display', 'block');
    $('.org_module_object').addClass('in');
    $('.org_module_object_nav').addClass('in').css('display', 'block');

    function show(content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {
            'table': 'AuthorityUser',
            'action': 4000,
            'content': content
        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    $('#table').css('display', 'block');
                    var title_obj = arg.content.title;
                    $.each(title_obj, function (i, item) {
                        if (i == 0) {
                            tr.append('<th>选择</th>');
                            return true
                        }
                        if (i == 1) {
                            return true
                        }
                        if (i == 3) {
                            return true
                        }


                        tr.append("<th>" + item + "</th>");

                    });
                    tr.append('<th>操作</th>');
                    $('.table_title').append(tr);

                    var vaule_obj = arg.content.value;

                    $.each(vaule_obj, function (i, item) {
                        var tr = $("<tr/>");
                        $.each(item, function (i, item2) {
                            if (i == 0) {

                                tr.append('<td><input type="checkbox" value=' + item2 + '></td>');
                                return true
                            }
                            if (i == 1) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }
                            if (i == 3) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }

                            tr.append("<td>" + item2 + "</td>");


                        });
                        tr.append('<td><button type="button" class="btn btn-warning del_org_authority_user">删除</button>|<a href="#myModal" role="button" class="btn show_edit_org_authority_user" data-toggle="modal">编辑</a></td>');
                        $('.table_data').append(tr);
                    });

                } else {
                    $('.message').text(arg.message);
                    $('#table').children().remove();
                }
            }
        });
    }

    $(document).ready(function () {
        var content = {};
        show(content)
    });

    $('.change_User').live('click', function () {
        var User_id = $('[name="User_change_id"]').val();

        var content = {
            'User_id': User_id

        };
        show(content)
    });

    $('.del_org_authority_user').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var val = {
            'table': 'AuthorityUser',
            'action': 2000,
            'content': {
                'uuid': uuid
            }
        };


        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    var Role_id = $('[name="Role_change_id"]').val();

                    var content = {
                        'Role_id': Role_id

                    };
                    show(content);
                } else {
                    $('.message').text(arg.message);
                }
            }
        })
    });

    $('.add_btn').live('click', function () {
        $('[name="NO"]').val('').attr('placeholder', '');
        var Role_id = $('[name="Role_change_id"]').val();
        $('[name="Role_id"]').val(Role_id);
        $('.edit_org_authority_user').css('display', 'none');
        $('.add_org_authority_user').css('display', '');

    });

    $('.add_org_authority_user').live('click', function () {
        var token = $.cookie('csrftoken');

        var NO = $('[name="NO"]').val();
        var User_id = $('[name="User_id"]').val();
        var ModuleMenu_id = $('[name="ModuleMenu_id"]').val();


        var val = {
            'table': 'AuthorityUser',
            'action': 1000,
            'content': {
                'NO': NO,
                'User_id': User_id,
                'ModuleMenu_id': ModuleMenu_id


            }


        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),

            success: function (arg) {

                if (arg.status) {
                    var User_id = $('[name="User_change_id"]').val();

                    var content = {
                        'User_id': User_id

                    };

                    show(content);
                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()

                } else if (arg.errors.NO) {
                    $('[name="NO"]').val('').attr('placeholder', arg.errors.NO[0].message);
                }
            }
        })


    });

    $('.show_edit_org_authority_user').live('click', function () {
        $('.add_org_authority_user').css('display', 'none');
        $('.edit_org_authority_user').css('display', '');
        uuid = $(this).parent().prevAll('td:last').children('input').val();
        var ModuleMenu_id = $(this).parent().prevAll('td:eq(2)').children('input').val();
        var User_id = $(this).parent().prevAll('td:eq(4)').children('input').val();
        var NO = $(this).parent().prevAll('td:eq(0)').text();


        $('[name="NO"]').val(NO).attr('placeholder', '');

        $('[name="ModuleMenu_id"]').val(ModuleMenu_id);
        $('[name="User_id"]').val(User_id);


    });

    $('.edit_org_authority_user').live('click', function () {
        var token = $.cookie('csrftoken');

        var NO = $('[name="NO"]').val();
        var User_id = $('[name="User_id"]').val();
        var ModuleMenu_id = $('[name="ModuleMenu_id"]').val();

        var val = {
            'table': 'AuthorityUser',
            'action': 3000,
            'content': {
                'uuid': uuid,
                'NO': NO,
                'User_id': User_id,
                'ModuleMenu_id': ModuleMenu_id


            }

        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    var User_id = $('[name="User_change_id"]').val();

                    var content = {
                        'User_id': User_id

                    };
                    show(content);

                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()

                } else if (arg.errors.NO) {
                    $('[name="NO"]').val('').attr('placeholder', arg.errors.NO[0].message);
                }
            }
        })


    });


}

function org_user_con_company() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_system').addClass('in');
    $('.my_system_nav').addClass('in').css('display', 'block');
    $('.org_module').addClass('in');
    $('.org_object_nav').addClass('in').css('display', 'block');
    $('.org_module_object').addClass('in');
    $('.org_module_object_nav').addClass('in').css('display', 'block');

    function show(content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {
            'table': 'User_Con_Company',
            'action': 4000,
            'content': content
        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    $('#table').css('display', 'block');
                    var title_obj = arg.content.title;
                    $.each(title_obj, function (i, item) {
                        if (i == 0) {
                            tr.append('<th>选择</th>');
                            return true
                        }
                        if (i == 1) {
                            return true
                        }
                        if (i == 3) {
                            return true
                        }


                        tr.append("<th>" + item + "</th>");

                    });
                    tr.append('<th>操作</th>');
                    $('.table_title').append(tr);

                    var vaule_obj = arg.content.value;

                    $.each(vaule_obj, function (i, item) {
                        var tr = $("<tr/>");
                        $.each(item, function (i, item2) {
                            if (i == 0) {

                                tr.append('<td><input type="checkbox" value=' + item2 + '></td>');
                                return true
                            }
                            if (i == 1) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }
                            if (i == 3) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }


                            tr.append("<td>" + item2 + "</td>");


                        });
                        tr.append('<td><button type="button" class="btn btn-warning del_org_user_con_company">删除</button>|<a href="#myModal" role="button" class="btn show_edit_org_user_con_company" data-toggle="modal">编辑</a></td>');
                        $('.table_data').append(tr);
                    });

                } else {
                    $('.message').text(arg.message);
                    $('#table').children().remove();
                }
            }
        });
    }

    $(document).ready(function () {
        var content = {};
        show(content)
    });

    $('.change_company').live('click', function () {
        var Company_id = $('[name="Company_change_id"]').val();

        var content = {
            'Company_id': Company_id

        };
        show(content)
    });

    $('.del_org_user_con_company').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var val = {
            'table': 'User_Con_Company',
            'action': 2000,
            'content': {
                'uuid': uuid
            }
        };


        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    var Company_id = $('[name="Company_change_id"]').val();
                    var content = {
                        'Company_id': Company_id

                    };
                    show(content);
                } else {
                    $('.message').text(arg.message);
                }
            }
        })
    });

    $('.add_btn').live('click', function () {
        $('.edit_org_user_con_company').css('display', 'none');
        $('.add_org_user_con_company').css('display', '');

    });

    $('.add_org_user_con_company').live('click', function () {
        var token = $.cookie('csrftoken');


        var User_id = $('[name="User_id"]').val();
        var Company_id = $('[name="Company_id"]').val();


        var val = {
            'table': 'User_Con_Company',
            'action': 1000,
            'content': {

                'User_id': User_id,
                'Company_id': Company_id


            }


        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    var Company_id = $('[name="Company_change_id"]').val();
                    var content = {
                        'Company_id': Company_id
                    };
                    show(content);
                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()
                }
            }
        })


    });

    $('.show_edit_org_user_con_company').live('click', function () {
        $('.add_org_user_con_company').css('display', 'none');
        $('.edit_org_user_con_company').css('display', '');
        uuid = $(this).parent().prevAll('td:last').children('input').val();
        var User_id = $(this).parent().prevAll('td:eq(3)').children('input').val();
        var Company_id = $(this).parent().prevAll('td:eq(1)').children('input').val();


        $('[name="User_id"]').val(User_id);
        $('[name="Company_id"]').val(Company_id);


    });

    $('.edit_org_user_con_company').live('click', function () {
        var token = $.cookie('csrftoken');

        var User_id = $('[name="User_id"]').val();
        var Company_id = $('[name="Company_id"]').val();


        var val = {
            'table': 'User_Con_Company',
            'action': 3000,
            'content': {
                'uuid': uuid,
                'User_id': User_id,
                'Company_id': Company_id

            }

        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    var Company_id = $('[name="Company_change_id"]').val();
                    var content = {
                        'Company_id': Company_id
                    };
                    show(content);
                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()
                }
            }
        })


    });


}

function org_user_con_role() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_system').addClass('in');
    $('.my_system_nav').addClass('in').css('display', 'block');
    $('.org_module').addClass('in');
    $('.org_object_nav').addClass('in').css('display', 'block');
    $('.org_module_object').addClass('in');
    $('.org_module_object_nav').addClass('in').css('display', 'block');

    function show(content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {
            'table': 'User_Con_Role',
            'action': 4000,
            'content': content
        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    $('#table').css('display', 'block');
                    var title_obj = arg.content.title;
                    $.each(title_obj, function (i, item) {
                        if (i == 0) {
                            tr.append('<th>选择</th>');
                            return true
                        }
                        if (i == 1) {
                            return true
                        }
                        if (i == 3) {
                            return true
                        }


                        tr.append("<th>" + item + "</th>");

                    });
                    tr.append('<th>操作</th>');
                    $('.table_title').append(tr);

                    var vaule_obj = arg.content.value;

                    $.each(vaule_obj, function (i, item) {
                        var tr = $("<tr/>");
                        $.each(item, function (i, item2) {
                            if (i == 0) {

                                tr.append('<td><input type="checkbox" value=' + item2 + '></td>');
                                return true
                            }
                            if (i == 1) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }
                            if (i == 3) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }


                            tr.append("<td>" + item2 + "</td>");


                        });
                        tr.append('<td><button type="button" class="btn btn-warning del_org_user_con_role">删除</button>|<a href="#myModal" role="button" class="btn show_edit_org_user_con_role" data-toggle="modal">编辑</a></td>');
                        $('.table_data').append(tr);
                    });

                } else {
                    $('.message').text(arg.message);
                    $('#table').children().remove();
                }
            }
        });
    }

    $(document).ready(function () {
        var content = {};
        show(content)
    });

    $('.change_Company').live('click', function () {
        var Company_id = $('[name="Company_change_id"]').val();

        var content = {
            'Role__Company_id': Company_id

        };
        show(content)
    });

    $('.del_org_user_con_role').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var val = {
            'table': 'User_Con_Role',
            'action': 2000,
            'content': {
                'uuid': uuid
            }
        };


        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    var Company_id = $('[name="Company_change_id"]').val();
                    var content = {
                        'Role__Company_id': Company_id

                    };
                    show(content);
                } else {
                    $('.message').text(arg.message);
                }
            }
        })
    });

    $('.add_btn').live('click', function () {
        $('.edit_org_user_con_role').css('display', 'none');
        $('.add_org_user_con_role').css('display', '');

    });

    $('.add_org_user_con_role').live('click', function () {
        var token = $.cookie('csrftoken');


        var User_id = $('[name="User_id"]').val();
        var Role_id = $('[name="Role_id"]').val();


        var val = {
            'table': 'User_Con_Role',
            'action': 1000,
            'content': {

                'User_id': User_id,
                'Role_id': Role_id


            }


        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    var Company_id = $('[name="Company_change_id"]').val();
                    var content = {
                        'Role__Company_id': Company_id
                    };
                    show(content);
                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()
                }
            }
        })


    });

    $('.show_edit_org_user_con_role').live('click', function () {
        $('.add_org_user_con_role').css('display', 'none');
        $('.edit_org_user_con_role').css('display', '');
        uuid = $(this).parent().prevAll('td:last').children('input').val();
        var User_id = $(this).parent().prevAll('td:eq(4)').children('input').val();
        var Role_id = $(this).parent().prevAll('td:eq(2)').children('input').val();


        $('[name="User_id"]').val(User_id);
        $('[name="Role_id"]').val(Role_id);


    });

    $('.edit_org_user_con_role').live('click', function () {
        var token = $.cookie('csrftoken');


        var Role_id = $('[name="Role_id"]').val();
        var User_id = $('[name="User_id"]').val();


        var val = {
            'table': 'User_Con_Role',
            'action': 3000,
            'content': {
                'uuid': uuid,
                'User_id': User_id,
                'Role_id': Role_id

            }

        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    var Company_id = $('[name="Company_change_id"]').val();
                    var content = {
                        'Role__Company_id': Company_id
                    };
                    show(content);
                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()
                }
            }
        })


    });


}

function org_user_con_department() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_system').addClass('in');
    $('.my_system_nav').addClass('in').css('display', 'block');
    $('.org_module').addClass('in');
    $('.org_object_nav').addClass('in').css('display', 'block');
    $('.org_module_object').addClass('in');
    $('.org_module_object_nav').addClass('in').css('display', 'block');

    function show(content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {
            'table': 'User_Con_Department',
            'action': 4000,
            'content': content
        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    $('#table').css('display', 'block');
                    var title_obj = arg.content.title;
                    $.each(title_obj, function (i, item) {
                        if (i == 0) {
                            tr.append('<th>选择</th>');
                            return true
                        }
                        if (i == 1) {
                            return true
                        }
                        if (i == 3) {
                            return true
                        }


                        tr.append("<th>" + item + "</th>");

                    });
                    tr.append('<th>操作</th>');
                    $('.table_title').append(tr);

                    var vaule_obj = arg.content.value;

                    $.each(vaule_obj, function (i, item) {
                        var tr = $("<tr/>");
                        $.each(item, function (i, item2) {
                            if (i == 0) {

                                tr.append('<td><input type="checkbox" value=' + item2 + '></td>');
                                return true
                            }
                            if (i == 1) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }
                            if (i == 3) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }


                            tr.append("<td>" + item2 + "</td>");


                        });
                        tr.append('<td><button type="button" class="btn btn-warning del_org_user_con_department">删除</button>|<a href="#myModal" role="button" class="btn show_edit_org_user_con_department" data-toggle="modal">编辑</a></td>');
                        $('.table_data').append(tr);
                    });

                } else {
                    $('.message').text(arg.message);
                    $('#table').children().remove();
                }
            }
        });
    }

    $(document).ready(function () {
        var content = {};
        show(content)
    });

    $('.change_Company').live('click', function () {
        var Company_id = $('[name="Company_change_id"]').val();

        var content = {
            'Department__Company_id': Company_id

        };
        show(content)
    });

    $('.del_org_user_con_department').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var val = {
            'table': 'User_Con_Department',
            'action': 2000,
            'content': {
                'uuid': uuid
            }
        };


        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    var Company_id = $('[name="Company_change_id"]').val();
                    var content = {
                        'Department__Company_id': Company_id

                    };
                    show(content);
                } else {
                    $('.message').text(arg.message);
                }
            }
        })
    });

    $('.add_btn').live('click', function () {
        $('.edit_org_user_con_department').css('display', 'none');
        $('.add_org_user_con_department').css('display', '');

    });

    $('.add_org_user_con_department').live('click', function () {
        var token = $.cookie('csrftoken');


        var User_id = $('[name="User_id"]').val();
        var Department_id = $('[name="Department_id"]').val();


        var val = {
            'table': 'User_Con_Department',
            'action': 1000,
            'content': {

                'User_id': User_id,
                'Department_id': Department_id


            }


        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    var Company_id = $('[name="Company_change_id"]').val();
                    var content = {
                        'Department__Company_id': Company_id
                    };
                    show(content);
                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()
                }
            }
        })


    });

    $('.show_edit_org_user_con_department').live('click', function () {
        $('.add_org_user_con_department').css('display', 'none');
        $('.edit_org_user_con_department').css('display', '');
        uuid = $(this).parent().prevAll('td:last').children('input').val();
        var User_id = $(this).parent().prevAll('td:eq(4)').children('input').val();
        var Department_id = $(this).parent().prevAll('td:eq(2)').children('input').val();


        $('[name="User_id"]').val(User_id);
        $('[name="Department_id"]').val(Department_id);


    });

    $('.edit_org_user_con_department').live('click', function () {
        var token = $.cookie('csrftoken');


        var Department_id = $('[name="Department_id"]').val();
        var User_id = $('[name="User_id"]').val();


        var val = {
            'table': 'User_Con_Department',
            'action': 3000,
            'content': {
                'uuid': uuid,
                'User_id': User_id,
                'Department_id': Department_id

            }

        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    var Company_id = $('[name="Company_change_id"]').val();
                    var content = {
                        'Department__Company_id': Company_id
                    };
                    show(content);
                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()
                }
            }
        })


    });


}

function org_role_con_department() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_system').addClass('in');
    $('.my_system_nav').addClass('in').css('display', 'block');
    $('.org_module').addClass('in');
    $('.org_object_nav').addClass('in').css('display', 'block');
    $('.org_module_object').addClass('in');
    $('.org_module_object_nav').addClass('in').css('display', 'block');

    function show(content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {
            'table': 'Role_Con_Department',
            'action': 4000,
            'content': content
        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    $('#table').css('display', 'block');
                    var title_obj = arg.content.title;
                    $.each(title_obj, function (i, item) {
                        if (i == 0) {
                            tr.append('<th>选择</th>');
                            return true
                        }
                        if (i == 1) {
                            return true
                        }
                        if (i == 3) {
                            return true
                        }


                        tr.append("<th>" + item + "</th>");

                    });
                    tr.append('<th>操作</th>');
                    $('.table_title').append(tr);

                    var vaule_obj = arg.content.value;

                    $.each(vaule_obj, function (i, item) {
                        var tr = $("<tr/>");
                        $.each(item, function (i, item2) {
                            if (i == 0) {

                                tr.append('<td><input type="checkbox" value=' + item2 + '></td>');
                                return true
                            }
                            if (i == 1) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }
                            if (i == 3) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }


                            tr.append("<td>" + item2 + "</td>");


                        });
                        tr.append('<td><button type="button" class="btn btn-warning del_org_user_con_role">删除</button>|<a href="#myModal" role="button" class="btn show_edit_org_user_con_role" data-toggle="modal">编辑</a></td>');
                        $('.table_data').append(tr);
                    });

                } else {
                    $('.message').text(arg.message);
                    $('#table').children().remove();
                }
            }
        });
    }

    $(document).ready(function () {
        var content = {};
        show(content)
    });

    $('.change_Company').live('click', function () {
        var Company_id = $('[name="Company_change_id"]').val();

        var content = {
            'Role__Company_id': Company_id

        };
        show(content)
    });

    $('.del_org_user_con_role').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var val = {
            'table': 'Role_Con_Department',
            'action': 2000,
            'content': {
                'uuid': uuid
            }
        };


        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    var Company_id = $('[name="Company_change_id"]').val();
                    var content = {
                        'Role__Company_id': Company_id

                    };
                    show(content);
                } else {
                    $('.message').text(arg.message);
                }
            }
        })
    });

    $('.add_btn').live('click', function () {
        $('.edit_org_user_con_role').css('display', 'none');
        $('.add_org_user_con_role').css('display', '');

    });

    $('.add_org_user_con_role').live('click', function () {
        var token = $.cookie('csrftoken');


        var Department_id = $('[name="Department_id"]').val();
        var Role_id = $('[name="Role_id"]').val();


        var val = {
            'table': 'Role_Con_Department',
            'action': 1000,
            'content': {

                'Department_id': Department_id,
                'Role_id': Role_id


            }


        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    var Company_id = $('[name="Company_change_id"]').val();
                    var content = {
                        'Role__Company_id': Company_id
                    };
                    show(content);
                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()
                }
            }
        })


    });

    $('.show_edit_org_user_con_role').live('click', function () {
        $('.add_org_user_con_role').css('display', 'none');
        $('.edit_org_user_con_role').css('display', '');
        uuid = $(this).parent().prevAll('td:last').children('input').val();
        var Department_id = $(this).parent().prevAll('td:eq(4)').children('input').val();
        var Role_id = $(this).parent().prevAll('td:eq(2)').children('input').val();


        $('[name="Department_id"]').val(Department_id);
        $('[name="Role_id"]').val(Role_id);


    });

    $('.edit_org_user_con_role').live('click', function () {
        var token = $.cookie('csrftoken');


        var Role_id = $('[name="Role_id"]').val();
        var Department_id = $('[name="Department_id"]').val();


        var val = {
            'table': 'Role_Con_Department',
            'action': 3000,
            'content': {
                'uuid': uuid,
                'Department_id': Department_id,
                'Role_id': Role_id

            }

        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    var Company_id = $('[name="Company_change_id"]').val();
                    var content = {
                        'Role__Company_id': Company_id
                    };
                    show(content);
                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()
                }
            }
        })


    });


}

function org_crud_interface() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_system').addClass('in');
    $('.my_system_nav').addClass('in').css('display', 'block');
    $('.org_module').addClass('in');
    $('.org_object_nav').addClass('in').css('display', 'block');

    function show(content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {
            'table': 'ModuleInterface',
            'action': 4000,
            'content': content
        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    $('#table').css('display', 'block');
                    var title_obj = arg.content.title;
                    $.each(title_obj, function (i, item) {

                        if (i == 0) {
                            tr.append('<th>选择</th>');
                            return true
                        }

                        tr.append("<th>" + item + "</th>");
                    });
                    tr.append('<th>操作</th>');
                    $('.table_title').append(tr);

                    var vaule_obj = arg.content.value;

                    $.each(vaule_obj, function (i, item) {
                        var tr = $("<tr/>");
                        $.each(item, function (i, item2) {

                            if (i == 0) {

                                tr.append('<td><input type="checkbox" value=' + item2 + '></td>');
                                return true
                            }
                            if (i == 3) {

                                tr.append('<td><textarea> ' + item2 + '</textarea></td>');
                                return true
                            }
                            if (i == 4) {

                                tr.append('<td><textarea> ' + item2 + '</textarea></td>');
                                return true
                            }

                            if (i == 7) {
                                tr.append('<td style="display: none"><input type="checkbox" value=' + item2 + '></td>');
                                return true
                            }
                            tr.append("<td>" + item2 + "</td>");

                        });
                        tr.append('<td><input type="text" style="display: none" value=></input><button type="button" class="btn btn-warning del_module_interface">删除</button>--<a href="#myModal" role="button" class="btn show_edit_module_interface" data-toggle="modal">编辑</a></td>');

                        $('.table_data').append(tr);
                    });

                } else {
                    $('.message').text(arg.message);
                    $('#table').children().remove();
                }
            }
        });
    }

    $(document).ready(function () {
        var content = {};
        show(content)
    });

    $('.del_module_interface').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var val = {
            'table': 'ModuleInterface',
            'action': 2000,
            'content': {
                'uuid': uuid
            }
        };

        $.ajax({
            url: '/general/action_general_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    var content = {};
                    show(content);
                } else {
                    $('.message').text(arg.message);
                }
            }
        })
    });

    $('.add_btn').live('click', function () {
        $('[name="Name"]').val('').attr('placeholder', '');
        $('[name="URL"]').val('').attr('placeholder', '');
        $('[name="Json_Request"]').val('').attr('placeholder', '');
        $('[name="Json_Success"]').val('').attr('placeholder', '');
        $('[name="Note"]').val('').val('').attr('placeholder', '');

        $('.edit_module_interface').css('display', 'none');
        $('.add_module_interface').css('display', '');
    });

    $('.add_module_interface').live('click', function () {
        var token = $.cookie('csrftoken');
        var Name = $('[name="Name"]').val();
        var URL = $('[name="URL"]').val();
        var Json_Request = $('[name="Json_Request"]').val();
        var Json_Success = $('[name="Json_Success"]').val();
        var Note = $('[name="Note"]').val();
        var val = {
            'table': 'ModuleInterface',
            'action': 1000,
            'content': {
                'Name': Name,
                'URL': URL,
                'Json_Request': Json_Request,
                'Json_Success': Json_Success,
                'Note': Note,
                'Module_id': '4bae57855762437d9bc652e26d5825eb'

            }

        };

        $.ajax({
            url: '/general/action_general_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),

            success: function (arg) {


                if (arg.status) {

                    var content = {'Module_id': '4bae57855762437d9bc652e26d5825eb'};
                    show(content);
                    $('.close_modal').click()


                } else if (arg.errors.Name) {
                    $('[name="Name"]').attr('placeholder', arg.errors.Name[0].message);
                } else if (arg.errors.URL) {
                    $('[name="URL"]').attr('placeholder', arg.errors.URL[0].message);
                } else if (arg.errors.Json_Request) {
                    $('[name="Json_Request"]').attr('placeholder', arg.errors.Json_Request[0].message);
                } else if (arg.errors.Json_Success) {
                    $('[name="Json_Success"]').attr('placeholder', arg.errors.Json_Success[0].message);
                } else if (arg.errors.Note) {
                    $('[name="Note"]').attr('placeholder', arg.errors.Note[0].message);
                }
            }
        })


    });

    $('.show_edit_module_interface').live('click', function () {
        $('.add_module_interface').css('display', 'none');
        $('.edit_module_interface ').css('display', '');
        uuid = $(this).parent().prevAll('td:last').children('input').val();

        var Name = $(this).parent().prevAll('td:eq(6)').text();
        var URL = $(this).parent().prevAll('td:eq(5)').text();
        var Json_Request = $(this).parent().prevAll('td:eq(4)').text();
        var Json_Success = $(this).parent().prevAll('td:eq(3)').text();
        var Note = $(this).parent().prevAll('td:eq(2)').text();


        $('[name="Name"]').val(Name).attr('placeholder', '');
        $('[name="URL"]').val(URL).attr('placeholder', '');
        $('[name="Json_Request"]').val(Json_Request).attr('placeholder', '');
        $('[name="Json_Success"]').val(Json_Success).attr('placeholder', '');
        $('[name="Note"]').val(Note).attr('placeholder', '');

    });

    $('.edit_module_interface').live('click', function () {
        var token = $.cookie('csrftoken');


        var Name = $('[name="Name"]').val().trim();
        var URL = $('[name="URL"]').val().trim();
        var Json_Request = $('[name="Json_Request"]').val().trim();
        var Json_Success = $('[name="Json_Success"]').val().trim();
        var Note = $('[name="Note"]').val().trim();

        var val = {
            'table': 'ModuleInterface',
            'action': 3000,
            'content': {
                'uuid': uuid,
                'Name': Name,
                'URL': URL,
                'Json_Request': Json_Request,
                'Json_Success': Json_Success,
                'Note': Note,
                'Module_id': '4bae57855762437d9bc652e26d5825eb'

            }

        };
        $.ajax({
            url: '/general/action_general_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    var content = {'Module_id': '4bae57855762437d9bc652e26d5825eb'};
                    show(content);
                    $('.close_modal').click()

                } else if (arg.errors.Name) {
                    $('[name="Name"]').attr('placeholder', arg.errors.Name[0].message);
                } else if (arg.errors.URL) {
                    $('[name="URL"]').attr('placeholder', arg.errors.URL[0].message);
                } else if (arg.errors.Json_Request) {
                    $('[name="Json_Request"]').attr('placeholder', arg.errors.Json_Request[0].message);
                } else if (arg.errors.Json_Success) {
                    $('[name="Json_Success"]').attr('placeholder', arg.errors.Json_Success[0].message);
                } else if (arg.errors.Note) {
                    $('[name="Note"]').attr('placeholder', arg.errors.Note[0].message);
                }
            }
        })

    });


}

function org_interface() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_system').addClass('in');
    $('.my_system_nav').addClass('in').css('display', 'block');
    $('.org_module').addClass('in');
    $('.org_object_nav').addClass('in').css('display', 'block');

    function show(content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {
            'table': 'ModuleInterface',
            'action': 4000,
            'content': content
        };
        $.ajax({
            url: '/org/action_org_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    $('#table').css('display', 'block');
                    var title_obj = arg.content.title;
                    $.each(title_obj, function (i, item) {

                        if (i == 0) {
                            tr.append('<th>选择</th>');
                            return true
                        }

                        tr.append("<th>" + item + "</th>");
                    });
                    tr.append('<th>操作</th>');
                    $('.table_title').append(tr);

                    var vaule_obj = arg.content.value;

                    $.each(vaule_obj, function (i, item) {
                        var tr = $("<tr/>");
                        $.each(item, function (i, item2) {

                            if (i == 0) {

                                tr.append('<td><input type="checkbox" value=' + item2 + '></td>');
                                return true
                            }
                            if (i == 3) {

                                tr.append('<td><textarea> ' + item2 + '</textarea></td>');
                                return true
                            }
                            if (i == 4) {

                                tr.append('<td><textarea> ' + item2 + '</textarea></td>');
                                return true
                            }

                            if (i == 7) {
                                tr.append('<td style="display: none"><input type="checkbox" value=' + item2 + '></td>');
                                return true
                            }
                            tr.append("<td>" + item2 + "</td>");

                        });
                        tr.append('<td><a href="#myModal" role="button" class="btn show_test_interface" data-toggle="modal">测试</a></td>');

                        $('.table_data').append(tr);
                    });

                } else {
                    $('.message').text(arg.message);
                    $('#table').children().remove();
                }
            }
        });
    }

    $(document).ready(function () {
        var content = {};
        show(content)
    });


    $('.test_btn').live('click', function () {

        $('[name="URL"]').val('').attr('placeholder', '');
        $('[name="Data_Request"]').val('').attr('placeholder', '');
        $('[name="Data_Response"]').val('').attr('placeholder', '');


    });

    $('.show_test_interface').live('click', function () {


        var URL = $(this).parent().prevAll('td:eq(5)').text();
        var Data_Request = $(this).parent().prevAll('td:eq(4)').text();


        $('[name="URL"]').val(URL).attr('placeholder', '');
        $('[name="Data_Request"]').val(Data_Request).attr('placeholder', '');
        $('[name="Data_Response"]').val('').attr('placeholder', '');


    });

    $('.test_interface').live('click', function () {
        var token = $.cookie('csrftoken');


        var URL = $('[name="URL"]').val();

        var Data_temp = $('[name="Data_Request"]').val().trim();
        var Data_Request = JSON.parse(Data_temp);

        $.ajax({
            url: URL,
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(Data_Request),
            success: function (arg) {

                var Data_Response = JSON.stringify(arg);
                $('[name="Data_Response"]').val(Data_Response).attr('placeholder', '');


            }
        })


    });


}


function showall(menu_list, parent) {
    $.each(menu_list, function (index, val) {
        if (val.childrens.length > 0) {

            var li = $("<li></li>");
            li.append("<a id='change_color' href='javascript:void(0)' >" + val.name + "</a>").append("<ul></ul>").appendTo(parent);
            //递归显示
            showall(val.childrens, $(li).children().eq(1));
        } else {
            $("<li></li>").append("<a id='change_color' class='show_details' href='javascript:void(0)' >" + "<p style=\"color: #404040\" >" + val.name + "</p>" + "<input type='text' value=" + val.id + " style='display: none'>" + "</a>").appendTo(parent);
        }
    });


}


function change_content(val) {
    $('.orgChart').children().remove();
    var token = $.cookie('csrftoken');
    $.ajax({
        url: '/org/ZG_F_Json/',
        type: 'POST',
        tradition: true,
        headers: {'X-CSRFToken': token},
        data: JSON.stringify(val),
        success: function (arg) {

            var showlist = $("<ul id='org' style='display:none'></ul>");
            if (arg.status) {

                showall(arg.content.data, showlist);
                $("#jOrgChart").append(showlist);
                $("#org").jOrgChart({
                    chartElement: '#jOrgChart',//指定在某个dom生成jorgchart
                    dragAndDrop: false //设置是否可拖动
                });


            } else {
                $('.message').text(arg.message);
                $('#table').children().remove();
            }

        }
    });

}


function set_department_con() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_system').addClass('in');
    $('.my_system_nav').addClass('in').css('display', 'block');
    $('.org_module').addClass('in');
    $('.org_object_nav').addClass('in').css('display', 'block');
    $('.org_module_function').addClass('in');
    $('.org_module_function_nav').addClass('in').css('display', 'block');

    $(document).ready(function () {
        var Department_id = $('[name="Department_change_id"]').val();
        var val = {
            'action': 'ZG-F-01-04',
            'content': {
                'Department_id': Department_id
            }
        };
        change_content(val)
    });

    function show_all_details(Department_id) {
        $('[name="Role_id"]').each(function () {
            $(this).children("option").each(function () {
                $(this).css('display', 'inline-block');


            })

        });

        $('.details_title').children().remove();
        $('.details_data').children().remove();
        var token = $.cookie('csrftoken');


        var val = {
            'action': 'ZG-F-07-04',
            'content': {
                'Department_id': Department_id

            }
        };

        $.ajax({
            url: '/org/ZG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {


                var tr = $("<tr/>");


                if (arg.status) {
                    var title_obj = arg.content.title;
                    $.each(title_obj, function (i, item) {

                        if (i == 0) {
                            tr.append('<th style="display: none">选择</th>');
                            return true
                        }
                        if (i == 1) {

                            return true
                        }
                        if (i == 3) {

                            return true
                        }


                        tr.append("<th>" + item + "</th>");
                    });
                    tr.append('<th>操作</th>');
                    $('.details_title').append(tr);

                    var vaule_obj = arg.content.value;

                    $.each(vaule_obj, function (i, item) {
                        var tr = $("<tr/>");
                        $.each(item, function (i, item2) {
                            if (i == 0) {

                                tr.append('<td style="display: none"><input type="checkbox" value=' + item2 + '></td>');
                                return true
                            }
                            if (i == 1) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }
                            if (i == 3) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }


                            tr.append("<td>" + item2 + "</td>");


                        });
                        if (item[3] == null) {
                            tr.append('<td><input type="text" style="display: none" value=><button type="button" class="btn btn-warning del_detail">删除</button>|<a href="#myModal_edit_role" role="button" class="btn add_detail_role_btn" data-toggle="modal">添加岗位</a></td>');

                        } else {
                            tr.append('<td><input type="text" style="display: none" value=><button type="button" class="btn btn-warning del_detail">删除</button>');

                        }


                        $('.details_data').append(tr);
                    });

                } else {
                    $('.message').text(arg.message);
                }


            }
        })


    }


    $('.change_Department').live('click', function () {
        var Department_id = $('[name="Department_change_id"]').val();
        var val = {
            'action': 'ZG-F-01-04',
            'content': {
                'Department_id': Department_id
            }
        };
        change_content(val)
    });

    $('.add_department_con').live('click', function () {
        var token = $.cookie('csrftoken');
        var Head_id = $('[name="Head_id"]').val();
        var Leef_id = $('[name="Leef_id"]').val();
        var val = {

            'action': 'ZG-F-01-01',
            'content': {
                'Head_id': Head_id,
                'Leef_id': Leef_id

            }


        };
        $.ajax({
            url: '/org/ZG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),

            success: function (arg) {


                if (arg.status) {
                    $('.close_modal').click();
                    var Department_id = $('[name="Department_change_id"]').val();
                    var val = {
                        'action': 'ZG-F-01-04',
                        'content': {
                            'Department_id': Department_id
                        }
                    };
                    change_content(val)
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()

                }
            }
        })


    });

    $('.show_details').live('click', function () {
        var Department_id = $(this).children('input').val();
        $('[name="Department_hide_id"]').val(Department_id);
        show_all_details(Department_id);
        $('.btn_details').click();
    });

    $('.del_detail').live('click', function () {
        var token = $.cookie('csrftoken');
        var User_Con_Department_id = $(this).parent().prevAll('td:last').children('input').val();
        var Department_id = $('[name="Department_hide_id"]').val();
        var User_Con_Role_id = $(this).parent().prevAll('td:eq(1)').children('input').val();
        var val = {
            'action': 'ZG-F-07-02',
            'content': {
                'User_Con_Department_id': User_Con_Department_id,
                'User_Con_Role_id': User_Con_Role_id

            }
        };


        $.ajax({
            url: '/org/ZG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {

                    show_all_details(Department_id);
                } else {
                    $('.message').text(arg.message);
                }
            }
        })
    });

    $('.add_detail_user_btn').live('click', function () {

        $('.close_Modal_details').click();

    });

    $('.add_detail_role_btn').live('click', function () {

        $('.close_Modal_details').click();
        var User_id = $(this).parent().prevAll('td:eq(3)').children('input').val();
        $('[name="User_hide_id"]').val(User_id);


        var Department_id = $('[name="Department_hide_id"]').val();

        $('[name="Role_id"]').each(function () {
            $(this).children("option").each(function () {
                var name = $(this).attr("name");

                if (name != Department_id) {

                    $(this).css('display', 'none');
                }

            })

        })


    });

    $('.add_detail_user').live('click', function () {
        var token = $.cookie('csrftoken');


        var User_id = $('[name="User_id"]').val();
        var Department_id = $('[name="Department_hide_id"]').val();

        var val = {
            'action': 'ZG-F-07-01',
            'content': {
                'User_id': User_id,
                'Department_id': Department_id


            }
        };
        $.ajax({
            url: '/org/ZG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),

            success: function (arg) {


                if (arg.status) {

                    $('.btn_details').click();


                    $('.close_Modal_edit').click();


                    show_all_details(Department_id);

                } else if (arg.message) {
                    $('.message').text(arg.message);
                }
            }
        })


    });

    $('.add_detail_role').live('click', function () {
        var token = $.cookie('csrftoken');


        var User_id = $('[name="User_hide_id"]').val();
        var Role_id = $('[name="Role_id"]').val();
        var Department_id = $('[name="Department_hide_id"]').val();


        var val = {
            'action': 'ZG-R-02-01',
            'content': {
                'User_id': User_id,
                'Role_id': Role_id


            }
        };
        $.ajax({
            url: '/org/ZG_R_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),

            success: function (arg) {


                if (arg.status) {

                    $('.btn_details').click();


                    $('.close_Modal_edit').click();


                    show_all_details(Department_id);

                } else if (arg.message) {
                    $('.message').text(arg.message);
                }
            }
        })


    });


}


function set_department() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_system').addClass('in');
    $('.my_system_nav').addClass('in').css('display', 'block');
    $('.org_module').addClass('in');
    $('.org_object_nav').addClass('in').css('display', 'block');
    $('.org_module_function').addClass('in');
    $('.org_module_function_nav').addClass('in').css('display', 'block');


    function show(content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {

            'action': 'ZG-F-06-04',
            'content': content
        };
        $.ajax({
            url: '/org/ZG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    $('#table').css('display', 'block');
                    var title_obj = arg.content.title;
                    $.each(title_obj, function (i, item) {
                        if (i == 0) {
                            tr.append('<th>选择</th>');
                            return true
                        }
                        if (i == 1) {
                            return true
                        }
                        if (i == 3) {
                            tr.append("<th>" + item + ' ( 点击查看用户 ) ' + "</th>");
                            return true
                        }


                        tr.append("<th>" + item + "</th>");

                    });
                    tr.append('<th>操作</th>');
                    $('.table_title').append(tr);

                    var vaule_obj = arg.content.value;

                    $.each(vaule_obj, function (i, item) {
                        var tr = $("<tr/>");
                        $.each(item, function (i, item2) {
                            if (i == 0) {

                                tr.append('<td><input type="checkbox" value=' + item2 + '></td>');
                                return true
                            }
                            if (i == 1) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }
                            if (i == 3) {
                                tr.append("<td class='show_details'>" + item2 + "</td>");
                                return true
                            }

                            tr.append("<td>" + item2 + "</td>");


                        });
                        tr.append('<td><button type="button" class="btn btn-warning del_org_department">删除</button>|<a href="#myModal" role="button" class="btn show_edit_org_department" data-toggle="modal">编辑</a></td>');
                        $('.table_data').append(tr);
                    });

                } else {
                    $('.message').text(arg.message);
                    $('#table').children().remove();
                }
            }
        });
    }

    function show_all_details(Department_id) {
        $('[name="Role_id"]').each(function () {
            $(this).children("option").each(function () {
                $(this).css('display', 'inline-block');


            })

        });

        $('.details_title').children().remove();
        $('.details_data').children().remove();
        var token = $.cookie('csrftoken');


        var val = {
            'action': 'ZG-F-07-04',
            'content': {
                'Department_id': Department_id

            }
        };

        $.ajax({
            url: '/org/ZG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {


                var tr = $("<tr/>");


                if (arg.status) {
                    var title_obj = arg.content.title;
                    $.each(title_obj, function (i, item) {

                        if (i == 0) {
                            tr.append('<th style="display: none">选择</th>');
                            return true
                        }
                        if (i == 1) {

                            return true
                        }
                        if (i == 3) {

                            return true
                        }


                        tr.append("<th>" + item + "</th>");
                    });
                    tr.append('<th>操作</th>');
                    $('.details_title').append(tr);

                    var vaule_obj = arg.content.value;

                    $.each(vaule_obj, function (i, item) {
                        var tr = $("<tr/>");
                        $.each(item, function (i, item2) {
                            if (i == 0) {

                                tr.append('<td style="display: none"><input type="checkbox" value=' + item2 + '></td>');
                                return true
                            }
                            if (i == 1) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }
                            if (i == 3) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }


                            tr.append("<td>" + item2 + "</td>");


                        });
                        if (item[3] == null) {
                            tr.append('<td><input type="text" style="display: none" value=><button type="button" class="btn btn-warning del_detail">删除</button>|<a href="#myModal_edit_role" role="button" class="btn add_detail_role_btn" data-toggle="modal">添加岗位</a></td>');

                        } else {
                            tr.append('<td><input type="text" style="display: none" value=><button type="button" class="btn btn-warning del_detail">删除</button>');

                        }


                        $('.details_data').append(tr);
                    });

                } else {
                    $('.message').text(arg.message);
                }


            }
        })


    }

    $(document).ready(function () {
        var content = {};
        show(content)
    });

    $('.change_Company').live('click', function () {
        var Company_id = $('[name="Company_change_id"]').val();

        var content = {
            'Company_id': Company_id

        };
        show(content)
    });

    $('.del_org_department').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var val = {

            'action': 'ZG-F-06-02',
            'content': {
                'uuid': uuid
            }
        };


        $.ajax({
            url: '/org/ZG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    var Company_id = $('[name="Company_change_id"]').val();

                    var content = {
                        'Company_id': Company_id

                    };
                    show(content);
                } else {
                    $('.message').text(arg.message);
                }
            }
        })
    });

    $('.add_btn').live('click', function () {
        $('[name="Name"]').val('').attr('placeholder', '');
        var Company_id = $('[name="Company_change_id"]').val();
        $('[name="Company_id"]').val(Company_id);


        $('.edit_org_department').css('display', 'none');
        $('.add_org_department').css('display', '');

    });

    $('.add_org_department').live('click', function () {
        var token = $.cookie('csrftoken');

        var Name = $('[name="Name"]').val();
        var Company_id = $('[name="Company_id"]').val();


        var val = {

            'action': 'ZG-F-06-01',
            'content': {

                'Name': Name,
                'Company_id': Company_id


            }


        };
        $.ajax({
            url: '/org/ZG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),

            success: function (arg) {


                if (arg.status) {
                    var Company_id = $('[name="Company_change_id"]').val();

                    var content = {
                        'Company_id': Company_id

                    };

                    show(content);
                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()
                } else if (arg.errors.Name) {
                    $('[name="Name"]').attr('placeholder', arg.errors.Name[0].message);
                }
            }
        })


    });

    $('.show_edit_org_department').live('click', function () {
        $('.add_org_department').css('display', 'none');
        $('.edit_org_department').css('display', '');
        uuid = $(this).parent().prevAll('td:last').children('input').val();
        var Company_id = $(this).parent().prevAll('td:eq(3)').children('input').val();

        var Name = $(this).parent().prevAll('td:eq(1)').text();


        $('[name="Name"]').val(Name).attr('placeholder', '');
        $('[name="Company_id"]').val(Company_id);


    });

    $('.edit_org_department').live('click', function () {
        var token = $.cookie('csrftoken');

        var Name = $('[name="Name"]').val();
        var Company_id = $('[name="Company_id"]').val();

        var val = {
            'action': 'ZG-F-06-03',
            'content': {
                'uuid': uuid,
                'Name': Name,
                'Company_id': Company_id
            }

        };
        $.ajax({
            url: '/org/ZG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    var Company_id = $('[name="Company_change_id"]').val();

                    var content = {
                        'Company_id': Company_id

                    };
                    show(content);

                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()
                } else if (arg.errors.Name) {
                    $('[name="Name"]').attr('placeholder', arg.errors.Name[0].message);
                }
            }
        })


    });

    $('.show_details').live('click', function () {

        var Department_id = $(this).prevAll().eq(2).children('input').val();
        $('[name="Department_hide_id"]').val(Department_id);

        show_all_details(Department_id);
        $('.btn_details').click();
    });

    $('.del_detail').live('click', function () {
        var token = $.cookie('csrftoken');
        var User_Con_Department_id = $(this).parent().prevAll('td:last').children('input').val();
        var Department_id = $('[name="Department_hide_id"]').val();
        var User_Con_Role_id = $(this).parent().prevAll('td:eq(1)').children('input').val();
        var val = {
            'action': 'ZG-F-07-02',
            'content': {
                'User_Con_Department_id': User_Con_Department_id,
                'User_Con_Role_id': User_Con_Role_id

            }
        };


        $.ajax({
            url: '/org/ZG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {

                    show_all_details(Department_id);
                } else {
                    $('.message').text(arg.message);
                }
            }
        })
    });

    $('.add_detail_user_btn').live('click', function () {

        $('.close_Modal_details').click();

    });

    $('.add_detail_role_btn').live('click', function () {

        $('.close_Modal_details').click();
        var User_id = $(this).parent().prevAll('td:eq(3)').children('input').val();
        $('[name="User_hide_id"]').val(User_id);


        var Department_id = $('[name="Department_hide_id"]').val();

        $('[name="Role_id"]').each(function () {
            $(this).children("option").each(function () {
                var name = $(this).attr("name");

                if (name != Department_id) {

                    $(this).css('display', 'none');
                }

            })

        })


    });

    $('.add_detail_user').live('click', function () {
        var token = $.cookie('csrftoken');


        var User_id = $('[name="User_id"]').val();
        var Department_id = $('[name="Department_hide_id"]').val();

        var val = {
            'action': 'ZG-F-07-01',
            'content': {
                'User_id': User_id,
                'Department_id': Department_id


            }
        };
        $.ajax({
            url: '/org/ZG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),

            success: function (arg) {


                if (arg.status) {

                    $('.btn_details').click();


                    $('.close_Modal_edit').click();


                    show_all_details(Department_id);

                } else if (arg.message) {
                    $('.message').text(arg.message);
                }
            }
        })


    });

    $('.add_detail_role').live('click', function () {
        var token = $.cookie('csrftoken');


        var User_id = $('[name="User_hide_id"]').val();
        var Role_id = $('[name="Role_id"]').val();
        var Department_id = $('[name="Department_hide_id"]').val();


        var val = {
            'action': 'ZG-R-02-01',
            'content': {
                'User_id': User_id,
                'Role_id': Role_id


            }
        };
        $.ajax({
            url: '/org/ZG_R_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),

            success: function (arg) {


                if (arg.status) {

                    $('.btn_details').click();


                    $('.close_Modal_edit').click();


                    show_all_details(Department_id);

                } else if (arg.message) {
                    $('.message').text(arg.message);
                }
            }
        })


    });


}

function set_role() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_system').addClass('in');
    $('.my_system_nav').addClass('in').css('display', 'block');
    $('.org_module').addClass('in');
    $('.org_object_nav').addClass('in').css('display', 'block');
    $('.org_module_function').addClass('in');
    $('.org_module_function_nav').addClass('in').css('display', 'block');

    function show(content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {

            'action': 'ZG-F-08-04',
            'content': content
        };
        $.ajax({
            url: '/org/ZG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    $('#table').css('display', 'block');
                    var title_obj = arg.content.title;
                    $.each(title_obj, function (i, item) {
                        if (i == 0) {
                            tr.append('<th>选择</th>');
                            return true
                        }
                        if (i == 1) {
                            return true
                        }
                        if (i == 4) {
                            return true
                        }


                        tr.append("<th>" + item + "</th>");

                    });
                    tr.append('<th>操作</th>');
                    $('.table_title').append(tr);

                    var vaule_obj = arg.content.value;

                    $.each(vaule_obj, function (i, item) {
                        var tr = $("<tr/>");
                        $.each(item, function (i, item2) {
                            if (i == 0) {

                                tr.append('<td><input type="checkbox" value=' + item2 + '></td>');
                                return true
                            }
                            if (i == 1) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }
                            if (i == 4) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }

                            tr.append("<td>" + item2 + "</td>");


                        });
                        tr.append('<td><button type="button" class="btn btn-warning del_org_role">删除</button>|<a href="#myModal" role="button" class="btn show_edit_org_role" data-toggle="modal">编辑</a></td>');
                        $('.table_data').append(tr);
                    });

                } else {
                    $('.message').text(arg.message);
                    $('#table').children().remove();
                }
            }
        });
    }

    $(document).ready(function () {
        var content = {};
        show(content)
    });

    $('.change_Company').live('click', function () {
        var Company_id = $('[name="Company_change_id"]').val();

        var content = {
            'Company_id': Company_id

        };
        show(content)
    });

    $('.del_org_role').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var val = {
            'action': 'ZG-F-08-02',
            'content': {
                'uuid': uuid
            }
        };


        $.ajax({
            url: '/org/ZG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    $('#table').css('display', 'block');
                    var Company_id = $('[name="Company_change_id"]').val();

                    var content = {
                        'Company_id': Company_id

                    };
                    show(content);
                } else {
                    $('.message').text(arg.message);
                }
            }
        })
    });

    $('.add_btn').live('click', function () {
        $('[name="Name"]').val('').attr('placeholder', '');
        var Company_id = $('[name="Company_change_id"]').val();
        $('[name="Company_id"]').val(Company_id);


        $('.edit_org_role').css('display', 'none');
        $('.add_org_role').css('display', '');

    });

    $('.add_org_role').live('click', function () {
        var token = $.cookie('csrftoken');

        var Name = $('[name="Name"]').val();
        var Company_id = $('[name="Company_id"]').val();
        var Account_Type_id = $('[name="Account_Type_id"]').val();


        var val = {
            'action': 'ZG-F-08-01',
            'content': {

                'Name': Name,
                'Company_id': Company_id,
                'Account_Type_id': Account_Type_id


            }

        };
        $.ajax({
            url: '/org/ZG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),

            success: function (arg) {


                if (arg.status) {
                    var Company_id = $('[name="Company_change_id"]').val();

                    var content = {
                        'Company_id': Company_id

                    };

                    show(content);
                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()
                } else if (arg.errors.Name) {
                    $('[name="Name"]').attr('placeholder', arg.errors.Name[0].message);
                }
            }
        })


    });

    $('.show_edit_org_role').live('click', function () {
        $('.add_org_role').css('display', 'none');
        $('.edit_org_role').css('display', '');
        uuid = $(this).parent().prevAll('td:last').children('input').val();
        var Company_id = $(this).parent().prevAll('td:eq(4)').children('input').val();
        var Account_Type_id = $(this).parent().prevAll('td:eq(1)').children('input').val();

        var Name = $(this).parent().prevAll('td:eq(2)').text();


        $('[name="Name"]').val(Name).attr('placeholder', '');
        $('[name="Company_id"]').val(Company_id);
        $('[name="Account_Type_id"]').val(Account_Type_id);


    });

    $('.edit_org_role').live('click', function () {
        var token = $.cookie('csrftoken');

        var Name = $('[name="Name"]').val();
        var Company_id = $('[name="Company_id"]').val();
        var Account_Type_id = $('[name="Account_Type_id"]').val();

        var val = {

            'action': 'ZG-F-08-03',
            'content': {
                'uuid': uuid,
                'Name': Name,
                'Company_id': Company_id,
                'Account_Type_id': Account_Type_id

            }

        };
        $.ajax({
            url: '/org/ZG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    var Company_id = $('[name="Company_change_id"]').val();

                    var content = {
                        'Company_id': Company_id

                    };
                    show(content);

                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()
                } else if (arg.errors.Name) {
                    $('[name="Name"]').attr('placeholder', arg.errors.Name[0].message);
                }
            }
        })

    });



}

function set_authority() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_system').addClass('in');
    $('.my_system_nav').addClass('in').css('display', 'block');


    function show_authority_role(content) {


        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {
            'action': 'ZG-F-03-04',
            'content': content
        };
        $.ajax({
            url: '/org/ZG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {


                    $('#table').css('display', 'block');
                    var title_obj = arg.content.title;
                    $.each(title_obj, function (i, item) {
                        if (i == 0) {
                            tr.append('<th>选择</th>');
                            return true
                        }
                        if (i == 1) {
                            return true
                        }
                        if (i == 4) {
                            return true
                        }


                        tr.append("<th>" + item + "</th>");

                    });
                    tr.append('<th>操作</th>');
                    $('.table_title').append(tr);

                    var vaule_obj = arg.content.value;

                    $.each(vaule_obj, function (i, item) {
                        var tr = $("<tr/>");
                        $.each(item, function (i, item2) {
                            if (i == 0) {

                                tr.append('<td><input type="checkbox" value=' + item2 + '></td>');
                                return true
                            }
                            if (i == 1) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }
                            if (i == 4) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }

                            tr.append("<td>" + item2 + "</td>");


                        });
                        tr.append('<td><button type="button" class="btn btn-warning del_org_authority_role">删除</button>|<a href="#myModal" role="button" class="btn show_edit_org_authority_role" data-toggle="modal">编辑</a></td>');
                        $('.table_data').append(tr);
                    });

                } else {
                    $('.message').text(arg.message);
                    $('#table').children().remove();
                }
            }
        });
    }

    $(document).ready(function () {
        var content = {};
        show_authority_role(content)
    });


    $('.change_Role').live('click', function () {
        var Role_id = $('[name="Role_change_id"]').val();

        var content = {
            'Role_id': Role_id

        };
        show_authority_role(content)
    });

    $('.del_org_authority_role').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var val = {
            'action': 'ZG-F-03-02',
            'content': {
                'uuid': uuid
            }
        };


        $.ajax({
            url: '/org/ZG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    var Role_id = $('[name="Role_change_id"]').val();

                    var content = {
                        'Role_id': Role_id

                    };
                    show_authority_role(content);
                } else {
                    $('.message').text(arg.message);
                }
            }
        })
    });

    $('.add_org_authority_role').live('click', function () {
        var token = $.cookie('csrftoken');

        var Role_id = $('[name="Role_id"]').val();
        var ModuleMenu_id = $('[name="ModuleMenu_id"]').val();
        var NO = $('[name="NO"]').val();


        var val = {

            'action': 'ZG-F-03-01',
            'content': {

                'Role_id': Role_id,
                'ModuleMenu_id': ModuleMenu_id,
                'NO': NO


            }


        };
        $.ajax({
            url: '/org/ZG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),

            success: function (arg) {


                if (arg.status) {
                    var Role_id = $('[name="Role_change_id"]').val();

                    var content = {
                        'Role_id': Role_id

                    };

                    show_authority_role(content);
                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()

                } else if (arg.errors.NO) {
                    $('[name="NO"]').val('').attr('placeholder', arg.errors.NO[0].message);
                }
            }
        })


    });

    $('.show_edit_org_authority_role').live('click', function () {
        $('.add_org_authority_role').css('display', 'none');
        $('.edit_org_authority_role').css('display', '');
        uuid = $(this).parent().prevAll('td:last').children('input').val();

        var ModuleMenu_id = $(this).parent().prevAll('td:eq(2)').children('input').val();
        var Role_id = $(this).parent().prevAll('td:eq(5)').children('input').val();


        var NO = $(this).parent().prevAll('td:eq(0)').text();


        $('[name="NO"]').val(NO).attr('placeholder', '');
        $('[name="ModuleMenu_id"]').val(ModuleMenu_id);
        $('[name="Role_id"]').val(Role_id);


    });

    $('.edit_org_authority_role').live('click', function () {
        var token = $.cookie('csrftoken');

        var NO = $('[name="NO"]').val();
        var Role_id = $('[name="Role_id"]').val();
        var ModuleMenu_id = $('[name="ModuleMenu_id"]').val();

        var val = {
            'action': 'ZG-F-03-03',
            'content': {
                'uuid': uuid,
                'NO': NO,
                'Role_id': Role_id,
                'ModuleMenu_id': ModuleMenu_id


            }

        };
        $.ajax({
            url: '/org/ZG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    var Role_id = $('[name="Role_change_id"]').val();

                    var content = {
                        'Role_id': Role_id

                    };
                    show_authority_role(content);

                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()

                } else if (arg.errors.NO) {
                    $('[name="NO"]').val('').attr('placeholder', arg.errors.NO[0].message);
                }
            }
        })


    });


    function show_authority_department(content) {


        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {
            'action': 'ZG-F-05-04',
            'content': content
        };
        $.ajax({
            url: '/org/ZG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {


                    $('#table').css('display', 'block');
                    var title_obj = arg.content.title;
                    $.each(title_obj, function (i, item) {
                        if (i == 0) {
                            tr.append('<th>选择</th>');
                            return true
                        }
                        if (i == 1) {
                            return true
                        }
                        if (i == 4) {
                            return true
                        }


                        tr.append("<th>" + item + "</th>");

                    });
                    tr.append('<th>操作</th>');
                    $('.table_title').append(tr);

                    var vaule_obj = arg.content.value;

                    $.each(vaule_obj, function (i, item) {
                        var tr = $("<tr/>");
                        $.each(item, function (i, item2) {
                            if (i == 0) {

                                tr.append('<td><input type="checkbox" value=' + item2 + '></td>');
                                return true
                            }
                            if (i == 1) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }
                            if (i == 4) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }

                            tr.append("<td>" + item2 + "</td>");


                        });
                        tr.append('<td><button type="button" class="btn btn-warning del_org_authority_department">删除</button>|<a href="#myModal" role="button" class="btn show_edit_org_authority_department" data-toggle="modal">编辑</a></td>');
                        $('.table_data').append(tr);
                    });

                } else {
                    $('.message').text(arg.message);
                    $('#table').children().remove();
                }
            }
        });
    }

    $('.change_Department').live('click', function () {
        var Department_id = $('[name="Department_change_id"]').val();

        var content = {
            'Department_id': Department_id

        };
        show_authority_department(content)
    });

    $('.del_org_authority_department').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var val = {
            'action': 'ZG-F-05-02',
            'content': {
                'uuid': uuid
            }
        };


        $.ajax({
            url: '/org/ZG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    var Department_id = $('[name="Department_change_id"]').val();

                    var content = {
                        'Department_id': Department_id

                    };
                    show_authority_department(content);
                } else {
                    $('.message').text(arg.message);
                }
            }
        })
    });

    $('.add_org_authority_department').live('click', function () {
        var token = $.cookie('csrftoken');

        var Department_id = $('[name="Department_id"]').val();
        var ModuleMenu_id = $('[name="ModuleMenu_id"]').val();
        var NO = $('[name="NO"]').val();


        var val = {
            'action': 'ZG-F-05-01',
            'content': {

                'Department_id': Department_id,
                'ModuleMenu_id': ModuleMenu_id,
                'NO': NO


            }


        };
        console.log(val);
        $.ajax({
            url: '/org/ZG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),

            success: function (arg) {


                if (arg.status) {
                    var Department_id = $('[name="Department_change_id"]').val();

                    var content = {
                        'Department_id': Department_id

                    };

                    show_authority_department(content);
                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()

                } else if (arg.errors.NO) {
                    $('[name="NO"]').val('').attr('placeholder', arg.errors.NO[0].message);
                }
            }
        })


    });

    $('.show_edit_org_authority_department').live('click', function () {
        $('.add_org_authority_department').css('display', 'none');
        $('.edit_org_authority_department').css('display', '');
        uuid = $(this).parent().prevAll('td:last').children('input').val();

        var ModuleMenu_id = $(this).parent().prevAll('td:eq(2)').children('input').val();
        var Department_id = $(this).parent().prevAll('td:eq(5)').children('input').val();


        var NO = $(this).parent().prevAll('td:eq(0)').text();


        $('[name="NO"]').val(NO).attr('placeholder', '');
        $('[name="ModuleMenu_id"]').val(ModuleMenu_id);
        $('[name="Department_id"]').val(Department_id);


    });

    $('.edit_org_authority_department').live('click', function () {
        var token = $.cookie('csrftoken');

        var NO = $('[name="NO"]').val();
        var Department_id = $('[name="Department_id"]').val();
        var ModuleMenu_id = $('[name="ModuleMenu_id"]').val();

        var val = {
            'action': 'ZG-F-05-03',
            'content': {
                'uuid': uuid,
                'NO': NO,
                'Department_id': Department_id,
                'ModuleMenu_id': ModuleMenu_id


            }

        };
        $.ajax({
            url: '/org/ZG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    var Department_id = $('[name="Department_change_id"]').val();

                    var content = {
                        'Department_id': Department_id

                    };
                    show_authority_department(content);

                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()

                } else if (arg.errors.NO) {
                    $('[name="NO"]').val('').attr('placeholder', arg.errors.NO[0].message);
                }
            }
        })


    });


    function show_authority_company(content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {

            'action': 'ZG-F-02-04',
            'content': content
        };
        $.ajax({
            url: '/org/ZG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    $('#table').css('display', 'block');
                    var title_obj = arg.content.title;
                    $.each(title_obj, function (i, item) {
                        if (i == 0) {
                            tr.append('<th>选择</th>');
                            return true
                        }
                        if (i == 1) {
                            return true
                        }
                        if (i == 3) {
                            return true
                        }


                        tr.append("<th>" + item + "</th>");

                    });
                    tr.append('<th>操作</th>');
                    $('.table_title').append(tr);

                    var vaule_obj = arg.content.value;

                    $.each(vaule_obj, function (i, item) {
                        var tr = $("<tr/>");
                        $.each(item, function (i, item2) {
                            if (i == 0) {

                                tr.append('<td><input type="checkbox" value=' + item2 + '></td>');
                                return true
                            }
                            if (i == 1) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }
                            if (i == 3) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }

                            tr.append("<td>" + item2 + "</td>");


                        });
                        tr.append('<td><button type="button" class="btn btn-warning del_org_authority_company">删除</button>|<a href="#myModal" role="button" class="btn show_edit_org_authority_company" data-toggle="modal">编辑</a></td>');
                        $('.table_data').append(tr);
                    });

                } else {
                    $('.message').text(arg.message);
                    $('#table').children().remove();
                }
            }
        });
    }


    $('.change_Company').live('click', function () {
        var Company_id = $('[name="Company_change_id"]').val();

        var content = {
            'Company_id': Company_id

        };
        show_authority_company(content)
    });

    $('.del_org_authority_company').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var val = {

            'action': 'ZG-F-02-02',
            'content': {
                'uuid': uuid
            }
        };


        $.ajax({
            url: '/org/ZG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    var Company_id = $('[name="Company_change_id"]').val();

                    var content = {
                        'Company_id': Company_id

                    };
                    show_authority_company(content);
                } else {
                    $('.message').text(arg.message);
                }
            }
        })
    });

    $('.add_btn').live('click', function () {


    });

    $('.add_org_authority_company').live('click', function () {
        var token = $.cookie('csrftoken');

        var NO = $('[name="NO"]').val();
        var Company_id = $('[name="Company_id"]').val();
        var ModuleMenu_id = $('[name="ModuleMenu_id"]').val();


        var val = {

            'action': 'ZG-F-02-01',
            'content': {

                'NO': NO,
                'Company_id': Company_id,
                'ModuleMenu_id': ModuleMenu_id


            }


        };
        $.ajax({
            url: '/org/ZG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),

            success: function (arg) {
                console.log(arg);

                if (arg.status) {
                    var Company_id = $('[name="Company_change_id"]').val();

                    var content = {
                        'Company_id': Company_id

                    };

                    show_authority_company(content);
                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()
                } else if (arg.errors.NO) {
                    $('[name="NO"]').val('').attr('placeholder', arg.errors.NO[0].message);
                }

            }
        })


    });

    $('.show_edit_org_authority_company').live('click', function () {
        $('.add_org_authority_company').css('display', 'none');
        $('.edit_org_authority_company').css('display', '');
        uuid = $(this).parent().prevAll('td:last').children('input').val();
        var ModuleMenu_id = $(this).parent().prevAll('td:eq(2)').children('input').val();
        var Company_id = $(this).parent().prevAll('td:eq(4)').children('input').val();

        var NO = $(this).parent().prevAll('td:eq(0)').text();


        $('[name="NO"]').val(NO).attr('placeholder', '');
        $('[name="ModuleMenu_id"]').val(ModuleMenu_id);
        $('[name="Company_id"]').val(Company_id);


    });

    $('.edit_org_authority_company').live('click', function () {
        var token = $.cookie('csrftoken');

        var NO = $('[name="NO"]').val();
        var Company_id = $('[name="Company_id"]').val();
        var ModuleMenu_id = $('[name="ModuleMenu_id"]').val();

        var val = {

            'action': 'ZG-F-02-03',
            'content': {
                'uuid': uuid,
                'NO': NO,
                'Company_id': Company_id,
                'ModuleMenu_id': ModuleMenu_id


            }

        };
        $.ajax({
            url: '/org/ZG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    var Company_id = $('[name="Company_change_id"]').val();

                    var content = {
                        'Company_id': Company_id

                    };
                    show_authority_company(content);

                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()
                } else if (arg.errors.NO) {
                    $('[name="NO"]').val('').attr('placeholder', arg.errors.NO[0].message);
                }
            }
        })


    });


    function show_authority_user(content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {
            'action': 'ZG-F-04-04',
            'content': content
        };
        $.ajax({
            url: '/org/ZG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    $('#table').css('display', 'block');
                    var title_obj = arg.content.title;
                    $.each(title_obj, function (i, item) {
                        if (i == 0) {
                            tr.append('<th>选择</th>');
                            return true
                        }
                        if (i == 1) {
                            return true
                        }
                        if (i == 3) {
                            return true
                        }


                        tr.append("<th>" + item + "</th>");

                    });
                    tr.append('<th>操作</th>');
                    $('.table_title').append(tr);

                    var vaule_obj = arg.content.value;

                    $.each(vaule_obj, function (i, item) {
                        var tr = $("<tr/>");
                        $.each(item, function (i, item2) {
                            if (i == 0) {

                                tr.append('<td><input type="checkbox" value=' + item2 + '></td>');
                                return true
                            }
                            if (i == 1) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }
                            if (i == 3) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }

                            tr.append("<td>" + item2 + "</td>");


                        });
                        tr.append('<td><button type="button" class="btn btn-warning del_org_authority_user">删除</button>|<a href="#myModal" role="button" class="btn show_edit_org_authority_user" data-toggle="modal">编辑</a></td>');
                        $('.table_data').append(tr);
                    });

                } else {
                    $('.message').text(arg.message);
                    $('#table').children().remove();
                }
            }
        });
    }


    $('.change_User').live('click', function () {
        var User_id = $('[name="User_change_id"]').val();

        var content = {
            'User_id': User_id

        };
        show_authority_user(content)
    });

    $('.del_org_authority_user').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var val = {

            'action': 'ZG-F-04-02',
            'content': {
                'uuid': uuid
            }
        };


        $.ajax({
            url: '/org/ZG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    var Role_id = $('[name="Role_change_id"]').val();

                    var content = {
                        'Role_id': Role_id

                    };
                    show_authority_user(content);
                } else {
                    $('.message').text(arg.message);
                }
            }
        })
    });

    $('.add_org_authority_user').live('click', function () {
        var token = $.cookie('csrftoken');

        var NO = $('[name="NO"]').val();
        var User_id = $('[name="User_id"]').val();
        var ModuleMenu_id = $('[name="ModuleMenu_id"]').val();


        var val = {
            'action': 'ZG-F-04-01',
            'content': {
                'NO': NO,
                'User_id': User_id,
                'ModuleMenu_id': ModuleMenu_id


            }


        };
        $.ajax({
            url: '/org/ZG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),

            success: function (arg) {

                if (arg.status) {
                    var User_id = $('[name="User_change_id"]').val();

                    var content = {
                        'User_id': User_id

                    };

                    show_authority_user(content);
                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()

                } else if (arg.errors.NO) {
                    $('[name="NO"]').val('').attr('placeholder', arg.errors.NO[0].message);
                }
            }
        })


    });

    $('.show_edit_org_authority_user').live('click', function () {
        $('.add_org_authority_user').css('display', 'none');
        $('.edit_org_authority_user').css('display', '');
        uuid = $(this).parent().prevAll('td:last').children('input').val();
        var ModuleMenu_id = $(this).parent().prevAll('td:eq(2)').children('input').val();
        var User_id = $(this).parent().prevAll('td:eq(4)').children('input').val();
        var NO = $(this).parent().prevAll('td:eq(0)').text();


        $('[name="NO"]').val(NO).attr('placeholder', '');

        $('[name="ModuleMenu_id"]').val(ModuleMenu_id);
        $('[name="User_id"]').val(User_id);


    });

    $('.edit_org_authority_user').live('click', function () {
        var token = $.cookie('csrftoken');

        var NO = $('[name="NO"]').val();
        var User_id = $('[name="User_id"]').val();
        var ModuleMenu_id = $('[name="ModuleMenu_id"]').val();

        var val = {
            'action': 'ZG-F-04-03',
            'content': {
                'uuid': uuid,
                'NO': NO,
                'User_id': User_id,
                'ModuleMenu_id': ModuleMenu_id


            }

        };
        $.ajax({
            url: '/org/ZG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    var User_id = $('[name="User_change_id"]').val();

                    var content = {
                        'User_id': User_id

                    };
                    show_authority_user(content);

                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()

                } else if (arg.errors.NO) {
                    $('[name="NO"]').val('').attr('placeholder', arg.errors.NO[0].message);
                }
            }
        })


    });


    $('.authority_role').live('click', function () {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        $('.Role_change').css('display', 'inline');
        $('.Department_change').css('display', 'none');
        $('.Company_change').css('display', 'none');

        $('.User_change').css('display', 'none');
        $('.Con_change').css('display', 'none');
        $('.message').text('');
        var content = {};
        show_authority_role(content)

    });
    $('.authority_department').live('click', function () {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        $('.Role_change').css('display', 'none');
        $('.Department_change').css('display', 'inline');
        $('.Company_change').css('display', 'none');

        $('.User_change').css('display', 'none');
        $('.Con_change').css('display', 'none');
        $('.message').text('');
        var content = {};
        show_authority_department(content)

    });

    $('.authority_company').live('click', function () {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        $('.Role_change').css('display', 'none');
        $('.Department_change').css('display', 'none');
        $('.Company_change').css('display', 'inline');

        $('.User_change').css('display', 'none');
        $('.Con_change').css('display', 'none');
        var content = {};
        show_authority_company(content)

    });


    $('.authority_user').live('click', function () {

        $('.table_title').children().remove();
        $('.table_data').children().remove();
        $('.Role_change').css('display', 'none');
        $('.Department_change').css('display', 'none');
        $('.Company_change').css('display', 'none');

        $('.Con_change').css('display', 'none');
        $('.User_change').css('display', 'inline');
        var content = {};
        show_authority_user(content)

    });


}

function role_department() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_system').addClass('in');
    $('.my_system_nav').addClass('in').css('display', 'block');
    $('.org_module').addClass('in');
    $('.org_object_nav').addClass('in').css('display', 'block');
    $('.org_module_job').addClass('in');
    $('.org_module_job_nav').addClass('in').css('display', 'block');

    function show(content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {
            'action': 'ZG-R-04-04',
            'content': content
        };
        $.ajax({
            url: '/org/ZG_R_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    $('#table').css('display', 'block');
                    var title_obj = arg.content.title;
                    $.each(title_obj, function (i, item) {
                        if (i == 0) {
                            tr.append('<th>选择</th>');
                            return true
                        }
                        if (i == 1) {
                            return true
                        }
                        if (i == 3) {
                            return true
                        }


                        tr.append("<th>" + item + "</th>");

                    });
                    tr.append('<th>操作</th>');
                    $('.table_title').append(tr);

                    var vaule_obj = arg.content.value;

                    $.each(vaule_obj, function (i, item) {
                        var tr = $("<tr/>");
                        $.each(item, function (i, item2) {
                            if (i == 0) {

                                tr.append('<td><input type="checkbox" value=' + item2 + '></td>');
                                return true
                            }
                            if (i == 1) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }
                            if (i == 3) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }


                            tr.append("<td>" + item2 + "</td>");


                        });
                        tr.append('<td><button type="button" class="btn btn-warning del_org_role_con_department">删除</button>|<a href="#myModal" role="button" class="btn show_edit_org_role_con_department" data-toggle="modal">编辑</a></td>');
                        $('.table_data').append(tr);
                    });

                } else {
                    $('.message').text(arg.message);
                    $('#table').children().remove();
                }
            }
        });
    }

    $(document).ready(function () {
        var content = {};
        show(content)
    });

    $('.change_Company').live('click', function () {
        var Company_id = $('[name="Company_change_id"]').val();

        var content = {
            'Role__Company_id': Company_id

        };
        show(content)
    });

    $('.del_org_role_con_department').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var val = {
            'action': 'ZG-R-04-02',
            'content': {
                'uuid': uuid
            }
        };


        $.ajax({
            url: '/org/ZG_R_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    var Company_id = $('[name="Company_change_id"]').val();
                    var content = {
                        'Role__Company_id': Company_id

                    };
                    show(content);
                } else {
                    $('.message').text(arg.message);
                }
            }
        })
    });

    $('.add_btn').live('click', function () {
        $('.edit_org_user_role_con_department').css('display', 'none');
        $('.add_org_user_role_con_department').css('display', '');

    });

    $('.add_org_role_con_department').live('click', function () {
        var token = $.cookie('csrftoken');


        var Department_id = $('[name="Department_id"]').val();
        var Role_id = $('[name="Role_id"]').val();


        var val = {
            'action': 'ZG-R-04-01',
            'content': {

                'Department_id': Department_id,
                'Role_id': Role_id


            }


        };
        $.ajax({
            url: '/org/ZG_R_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    var Company_id = $('[name="Company_change_id"]').val();
                    var content = {
                        'Role__Company_id': Company_id
                    };
                    show(content);
                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()
                }
            }
        })


    });

    $('.show_edit_org_role_con_department').live('click', function () {
        $('.add_org_role_con_department').css('display', 'none');
        $('.edit_org_role_con_department').css('display', '');
        uuid = $(this).parent().prevAll('td:last').children('input').val();
        var Department_id = $(this).parent().prevAll('td:eq(4)').children('input').val();
        var Role_id = $(this).parent().prevAll('td:eq(2)').children('input').val();


        $('[name="Department_id"]').val(Department_id);
        $('[name="Role_id"]').val(Role_id);


    });

    $('.edit_org_role_con_department').live('click', function () {
        var token = $.cookie('csrftoken');


        var Role_id = $('[name="Role_id"]').val();
        var Department_id = $('[name="Department_id"]').val();


        var val = {
            'action': 'ZG-R-04-03',
            'content': {
                'uuid': uuid,
                'Department_id': Department_id,
                'Role_id': Role_id

            }

        };
        $.ajax({
            url: '/org/ZG_R_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    var Company_id = $('[name="Company_change_id"]').val();
                    var content = {
                        'Role__Company_id': Company_id
                    };
                    show(content);
                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()
                }
            }
        })


    });


}


function user_profile() {

    // $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    // $('.my_system').addClass('in');
    // $('.my_system_nav').addClass('in').css('display', 'block');
    // $('.org_module').addClass('in');
    // $('.org_object_nav').addClass('in').css('display', 'block');
    // $('.org_module_job').addClass('in');
    // $('.org_module_job_nav').addClass('in').css('display', 'block');


    $('.edit_org_user').live('click', function () {
        var token = $.cookie('csrftoken');


        var User_id = $('[name="User_id"]').val();
        var Design_Rate = $('[name="Design_Rate"]').val();
        var Ui_Zoom = $('[name="Ui_Zoom"]').val();
        var Ui_Color = $('[name="Ui_Color"]').val();
        var Job_Number = $('[name="Job_Number"]').val();
        var Phone_Number = $('[name="Phone_Number"]').val();
        var email = $('[name="email"]').val();
        var username = $('[name="username"]').val();
        var password = $('[name="password"]').val();
        var password2 = $('[name="password2"]').val();


        var val = {

            'action': 'ZG-R-01-03',
            'content': {
                'User_id': User_id,
                'Design_Rate': Design_Rate,
                'Ui_Zoom': Ui_Zoom,
                'Ui_Color': Ui_Color,
                'Job_Number': Job_Number,
                'Phone_Number': Phone_Number,
                'email': email,
                'username': username,
                'password': password,
                'password2': password2

            }

        };
        console.log(val);
        $.ajax({
            url: '/org/ZG_R_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    alert('修改成功!');

                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()

                } else if (arg.errors.password2) {
                    $('[name="password2"]').val('').attr('placeholder', arg.errors.password2[0].message);
                } else if (arg.errors.username) {
                    $('[name="username"]').val('').attr('placeholder', arg.errors.username[0].message);
                } else if (arg.errors.email) {
                    $('[name="email"]').val('').attr('placeholder', arg.errors.email[0].message);
                } else if (arg.errors.Phone_Number) {
                    $('[name="Phone_Number"]').val('').attr('placeholder', arg.errors.Phone_Number[0].message);
                } else if (arg.errors.Ui_Color) {
                    $('[name="Ui_Color"]').val('').attr('placeholder', arg.errors.Ui_Color[0].message);
                } else if (arg.errors.Ui_Zoom) {
                    $('[name="Ui_Zoom"]').val('').attr('placeholder', arg.errors.Ui_Zoom[0].message);
                } else if (arg.errors.Design_Rate) {
                    $('[name="Design_Rate"]').val('').attr('placeholder', arg.errors.Design_Rate[0].message);
                }
            }
        })


    });


}


function user_settings() {


}


function user_role() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_system').addClass('in');
    $('.my_system_nav').addClass('in').css('display', 'block');
    $('.org_module').addClass('in');
    $('.org_object_nav').addClass('in').css('display', 'block');
    $('.org_module_job').addClass('in');
    $('.org_module_job_nav').addClass('in').css('display', 'block');


    function show(content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {

            'action': 'ZG-R-02-04',
            'content': content
        };
        $.ajax({
            url: '/org/ZG_R_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    $('#table').css('display', 'block');
                    var title_obj = arg.content.title;
                    $.each(title_obj, function (i, item) {
                        if (i == 0) {
                            tr.append('<th>选择</th>');
                            return true
                        }
                        if (i == 1) {
                            return true
                        }
                        if (i == 3) {
                            return true
                        }


                        tr.append("<th>" + item + "</th>");

                    });
                    tr.append('<th>操作</th>');
                    $('.table_title').append(tr);

                    var vaule_obj = arg.content.value;

                    $.each(vaule_obj, function (i, item) {
                        var tr = $("<tr/>");
                        $.each(item, function (i, item2) {
                            if (i == 0) {

                                tr.append('<td><input type="checkbox" value=' + item2 + '></td>');
                                return true
                            }
                            if (i == 1) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }
                            if (i == 3) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }


                            tr.append("<td>" + item2 + "</td>");


                        });
                        tr.append('<td><button type="button" class="btn btn-warning del_org_user_con_role">删除</button>|<a href="#myModal" role="button" class="btn show_edit_org_user_con_role" data-toggle="modal">编辑</a></td>');
                        $('.table_data').append(tr);
                    });

                } else {
                    $('.message').text(arg.message);
                    $('#table').children().remove();
                }
            }
        });
    }

    $(document).ready(function () {
        var content = {};
        show(content)
    });

    $('.change_Company').live('click', function () {
        var Company_id = $('[name="Company_change_id"]').val();

        var content = {
            'Role__Company_id': Company_id

        };
        show(content)
    });

    $('.del_org_user_con_role').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var val = {
            'action': 'ZG-R-02-02',
            'content': {
                'uuid': uuid
            }
        };


        $.ajax({
            url: '/org/ZG_R_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    var Company_id = $('[name="Company_change_id"]').val();
                    var content = {
                        'Role__Company_id': Company_id

                    };
                    show(content);
                } else {
                    $('.message').text(arg.message);
                }
            }
        })
    });

    $('.add_btn').live('click', function () {
        $('.edit_org_user_con_role').css('display', 'none');
        $('.add_org_user_con_role').css('display', '');

    });

    $('.add_org_user_con_role').live('click', function () {
        var token = $.cookie('csrftoken');


        var User_id = $('[name="User_con_id"]').val();
        var Role_id = $('[name="Role_con_id"]').val();


        var val = {
            'action': 'ZG-R-02-01',
            'content': {

                'User_id': User_id,
                'Role_id': Role_id


            }


        };
        $.ajax({
            url: '/org/ZG_R_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    var Company_id = $('[name="Company_change_id"]').val();
                    var content = {
                        'Role__Company_id': Company_id
                    };
                    show(content);
                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()
                }
            }
        })


    });

    $('.show_edit_org_user_con_role').live('click', function () {
        $('.add_org_user_con_role').css('display', 'none');
        $('.edit_org_user_con_role').css('display', '');
        uuid = $(this).parent().prevAll('td:last').children('input').val();
        var User_id = $(this).parent().prevAll('td:eq(4)').children('input').val();
        var Role_id = $(this).parent().prevAll('td:eq(2)').children('input').val();


        $('[name="User_con_id"]').val(User_id);
        $('[name="Role_con_id"]').val(Role_id);


    });

    $('.edit_org_user_con_role').live('click', function () {
        var token = $.cookie('csrftoken');


        var Role_id = $('[name="Role_con_id"]').val();
        var User_id = $('[name="User_con_id"]').val();


        var val = {
            'action': 'ZG-R-02-03',
            'content': {
                'uuid': uuid,
                'User_id': User_id,
                'Role_id': Role_id

            }

        };
        $.ajax({
            url: '/org/ZG_R_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    var Company_id = $('[name="Company_change_id"]').val();
                    var content = {
                        'Role__Company_id': Company_id
                    };
                    show(content);
                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()
                }
            }
        })


    });


}


function add_user() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_system').addClass('in');
    $('.my_system_nav').addClass('in').css('display', 'block');
    $('.org_module').addClass('in');
    $('.org_object_nav').addClass('in').css('display', 'block');
    $('.org_module_job').addClass('in');
    $('.org_module_job_nav').addClass('in').css('display', 'block');

    $('.add_user_btn').live('click', function () {
        var token = $.cookie('csrftoken');


        var User_id = $('[name="User_id"]').val();
        var Company_id = $('[name="Company_id"]').val();


        var val = {
            'action': 'ZG-R-03-01',
            'content': {

                'User_id': User_id,
                'Company_id': Company_id


            }


        };
        $.ajax({
            url: '/org/ZG_R_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    $('.close_modal').click();
                    alert('添加成功')
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()
                }
            }
        })


    });


}

