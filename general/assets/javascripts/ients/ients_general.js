function general_module() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_module').addClass('in');
    $('.my_module_nav').addClass('in').css('display', 'block');
    $('.general_module').addClass('in');
    $('.general_object_nav').addClass('in').css('display', 'block');
    $('.general_module_object').addClass('in');
    $('.general_module_object_nav').addClass('in').css('display', 'block');

    function show(action, content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {
            'table': 'Module',
            'action': action,
            'content': content
        };
        $.ajax({
            url: '/general/action_general_json/',
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
                        tr.append('<td><input type="text" style="display: none" value=></input><button type="button" class="btn btn-warning del_module">删除</button>--<a href="#myModal" role="button" class="btn show_edit_module" data-toggle="modal">编辑</a></td>');

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
        show(4000, content)
    });

    $('.del_module').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var val = {
            'table': 'Module',
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
                    show(4000, content);
                } else {
                    $('.message').text(arg.message);
                }
            }
        })
    });

    $('.add_btn').live('click', function () {
        $('[name="Name"]').val('').attr('placeholder', '');
        $('[name="APPName"]').val('').attr('placeholder', '');
        $('.edit_module').css('display', 'none');
        $('.add_module').css('display', '');
    });


    $('.add_module').live('click', function () {
        var token = $.cookie('csrftoken');
        var Name = $('[name="Name"]').val();
        var APPName = $('[name="APPName"]').val();
        var val = {
            'table': 'Module',
            'action': 1000,
            'content': {
                'Name': Name,
                'APPName': APPName

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
                    show(4000, content);
                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()

                } else if (arg.errors.Name) {
                    $('[name="Name"]').attr('placeholder', arg.errors.Name[0].message);
                } else if (arg.errors.APPName) {
                    $('[name="APPName"]').attr('placeholder', arg.errors.APPName[0].message);
                }
            }
        })


    });

    $('.show_edit_module').live('click', function () {
        $('.add_module').css('display', 'none');
        $('.edit_module').css('display', '');
        uuid = $(this).parent().prevAll('td:last').children('input').val();

        var Name = $(this).parent().prevAll('td:eq(1)').text();
        var APPName = $(this).parent().prevAll('td:eq(0)').text();

        $('[name="Name"]').val(Name).attr('placeholder', '');
        $('[name="APPName"]').val(APPName).attr('placeholder', '');

    });

    $('.edit_module').live('click', function () {
        var token = $.cookie('csrftoken');
        var Name = $('[name="Name"]').val();
        var APPName = $('[name="APPName"]').val();

        var val = {
            'table': 'Module',
            'action': 3000,
            'content': {
                'uuid': uuid,
                'Name': Name,
                'APPName': APPName
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
                    show(4000, content);

                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()

                } else if (arg.errors.Name) {
                    $('[name="Name"]').attr('placeholder', arg.errors.Name[0].message);
                } else if (arg.errors.APPName) {
                    $('[name="APPName"]').attr('placeholder', arg.errors.APPName[0].message);
                }
            }
        })

    });


}

function module_menu() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_module').addClass('in');
    $('.my_module_nav').addClass('in').css('display', 'block');
    $('.general_module').addClass('in');
    $('.general_object_nav').addClass('in').css('display', 'block');
    $('.general_module_object').addClass('in');
    $('.general_module_object_nav').addClass('in').css('display', 'block');

    function show(action, content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {
            'table': 'ModuleMenu',
            'action': action,
            'content': content
        };
        $.ajax({
            url: '/general/action_general_json/',
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
                            if (i == 5) {
                                tr.append('<td style="display: none"><input type="checkbox" value=' + item2 + '></td>');
                                return true
                            }
                            if (i == 7) {
                                tr.append('<td style="display: none"><input type="checkbox" value=' + item2 + '></td>');
                                return true
                            }
                            tr.append("<td>" + item2 + "</td>");

                        });
                        tr.append('<td><input type="text" style="display: none" value=></input><button type="button" class="btn btn-warning del_module_menu">删除</button>--<a href="#myModal" role="button" class="btn show_edit_module_menu" data-toggle="modal">编辑</a></td>');

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
        show(4000, content)
    });

    $('.del_module_menu').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var val = {
            'table': 'ModuleMenu',
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
                    show(4000, content);
                } else {
                    $('.message').text(arg.message);
                }
            }
        })
    });

    $('.add_btn').live('click', function () {
        $('[name="Display_ICO"]').val('').attr('placeholder', '');
        $('[name="Display_Name"]').val('').attr('placeholder', '');
        $('[name="URL"]').val('').attr('placeholder', '');
        $('[name="P_Menu_id"]').val('');
        $('.edit_module_menu').css('display', 'none');
        $('.add_module_menu').css('display', '');
    });

    $('.add_module_menu').live('click', function () {
        var token = $.cookie('csrftoken');
        var Display_ICO = $('[name="Display_ICO"]').val();
        var Display_Name = $('[name="Display_Name"]').val();
        var URL = $('[name="URL"]').val();
        var P_Menu_id = $('[name="P_Menu_id"]').val();
        var Module_id = $('[name="Module_id"]').val();
        var val = {
            'table': 'ModuleMenu',
            'action': 1000,
            'content': {
                'Display_ICO': Display_ICO,
                'Display_Name': Display_Name,
                'URL': URL,
                'P_Menu_id': P_Menu_id,
                'Module_id': Module_id

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
                    show(4000, content);
                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()


                } else if (arg.errors.Display_ICO) {
                    $('[name="Display_ICO"]').attr('placeholder', arg.errors.Display_ICO[0].message);
                } else if (arg.errors.Display_Name) {
                    $('[name="Display_Name"]').attr('placeholder', arg.errors.Display_Name[0].message);
                } else if (arg.errors.URL) {
                    $('[name="URL"]').attr('placeholder', arg.errors.URL[0].message);
                }
            }
        })


    });

    $('.show_edit_module_menu').live('click', function () {
        $('.add_module_menu').css('display', 'none');
        $('.edit_module_menu').css('display', '');
        uuid = $(this).parent().prevAll('td:last').children('input').val();

        var Display_ICO = $(this).parent().prevAll('td:eq(6)').text();
        var Display_Name = $(this).parent().prevAll('td:eq(5)').text();
        var URL = $(this).parent().prevAll('td:eq(4)').text();
        var P_Menu_id = $(this).parent().prevAll('td:eq(2)').children('input').val();
        var Module_id = $(this).parent().prevAll('td:eq(0)').children('input').val();


        $('[name="Display_ICO"]').val(Display_ICO).attr('placeholder', '');
        $('[name="Display_Name"]').val(Display_Name).attr('placeholder', '');
        $('[name="URL"]').val(URL).attr('placeholder', '');
        $('[name="P_Menu_id"]').val(P_Menu_id);
        $('[name="Module_id"]').val(Module_id);

    });

    $('.edit_module_menu').live('click', function () {
        var token = $.cookie('csrftoken');


        var Display_ICO = $('[name="Display_ICO"]').val();
        var Display_Name = $('[name="Display_Name"]').val();
        var URL = $('[name="URL"]').val();
        var P_Menu_id = $('[name="P_Menu_id"]').val();
        var Module_id = $('[name="Module_id"]').val();

        var val = {
            'table': 'ModuleMenu',
            'action': 3000,
            'content': {
                'uuid': uuid,
                'Display_ICO': Display_ICO,
                'Display_Name': Display_Name,
                'URL': URL,
                'P_Menu_id': P_Menu_id,
                'Module_id': Module_id
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
                    show(4000, content);

                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()
                } else if (arg.errors.Display_ICO) {
                    $('[name="Display_ICO"]').attr('placeholder', arg.errors.Display_ICO[0].message);
                } else if (arg.errors.Display_Name) {
                    $('[name="Display_Name"]').attr('placeholder', arg.errors.Display_Name[0].message);
                } else if (arg.errors.URL) {
                    $('[name="URL"]').attr('placeholder', arg.errors.URL[0].message);
                }
            }
        })


    });


}

function module_interface() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_module').addClass('in');
    $('.my_module_nav').addClass('in').css('display', 'block');
    $('.general_module').addClass('in');
    $('.general_object_nav').addClass('in').css('display', 'block');
    $('.general_module_object').addClass('in');
    $('.general_module_object_nav').addClass('in').css('display', 'block');

    function show(action, content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {
            'table': 'ModuleInterface',
            'action': action,
            'content': content
        };
        $.ajax({
            url: '/general/action_general_json/',
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
        show(4000, content)
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
                    show(4000, content);
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
        $('[name="Module_id"]').val('');
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
        var Module_id = $('[name="Module_id"]').val();
        var val = {
            'table': 'ModuleInterface',
            'action': 1000,
            'content': {
                'Name': Name,
                'URL': URL,
                'Json_Request': Json_Request,
                'Json_Success': Json_Success,
                'Note': Note,
                'Module_id': Module_id

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
                    show(4000, content);
                    $('.close_modal').click()

                } else if (arg.message) {

                    $('.message').text(arg.message);
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
        var Module_id = $(this).parent().prevAll('td:eq(0)').children('input').val();


        $('[name="Name"]').val(Name).attr('placeholder', '');
        $('[name="URL"]').val(URL).attr('placeholder', '');
        $('[name="Json_Request"]').val(Json_Request).attr('placeholder', '');
        $('[name="Json_Success"]').val(Json_Success).attr('placeholder', '');
        $('[name="Note"]').val(Note).attr('placeholder', '');
        $('[name="Module_id"]').val(Module_id);

    });

    $('.edit_module_interface').live('click', function () {
        var token = $.cookie('csrftoken');


        var Name = $('[name="Name"]').val().trim();
        var URL = $('[name="URL"]').val().trim();
        var Json_Request = $('[name="Json_Request"]').val().trim();
        var Json_Success = $('[name="Json_Success"]').val().trim();
        var Note = $('[name="Note"]').val().trim();
        var Module_id = $('[name="Module_id"]').val().trim();

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
                'Module_id': Module_id

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
                    show(4000, content);
                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
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

function module_authority() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_module').addClass('in');
    $('.my_module_nav').addClass('in').css('display', 'block');
    $('.general_module').addClass('in');
    $('.general_object_nav').addClass('in').css('display', 'block');
    $('.general_module_object').addClass('in');
    $('.general_module_object_nav').addClass('in').css('display', 'block');

    function show(action, content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {
            'table': 'ModuleAuthority',
            'action': action,
            'content': content
        };
        $.ajax({
            url: '/general/action_general_json/',
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

                            if (i == 5) {
                                tr.append('<td style="display: none"><input type="checkbox" value=' + item2 + '></td>');
                                return true
                            }
                            tr.append("<td>" + item2 + "</td>");

                        });
                        tr.append('<td><input type="text" style="display: none" value=></input><button type="button" class="btn btn-warning del_module_authority">删除</button>--<a href="#myModal" role="button" class="btn show_edit_module_authority" data-toggle="modal">编辑</a></td>');

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
        show(4000, content)
    });


    $('.del_module_authority').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var val = {
            'table': 'ModuleAuthority',
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
                    show(4000, content);
                } else {
                    $('.message').text(arg.message);
                }
            }
        })
    });

    $('.add_btn').live('click', function () {
        $('[name="Name"]').val('').attr('placeholder', '');
        $('[name="Mark"]').val('').attr('placeholder', '');
        $('[name="Note"]').val('').val('').attr('placeholder', '');
        $('[name="Module_id"]').val('');
        $('.edit_module_authority').css('display', 'none');
        $('.add_module_authority').css('display', '');
    });

    $('.add_module_authority').live('click', function () {
        var token = $.cookie('csrftoken');
        var Name = $('[name="Name"]').val();
        var Mark = $('[name="Mark"]').val();
        var Note = $('[name="Note"]').val();
        var Module_id = $('[name="Module_id"]').val();
        var val = {
            'table': 'ModuleAuthority',
            'action': 1000,
            'content': {
                'Name': Name,
                'Mark': Mark,
                'Note': Note,
                'Module_id': Module_id

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
                    show(4000, content);
                    $('.close_modal').click()

                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()
                } else if (arg.errors.Name) {
                    $('[name="Name"]').attr('placeholder', arg.errors.Name[0].message);
                } else if (arg.errors.URL) {
                    $('[name="Mark"]').attr('placeholder', arg.errors.Mark[0].message);
                } else if (arg.errors.Json_Request) {
                    $('[name="Note"]').attr('placeholder', arg.errors.Note[0].message);
                }
            }
        })


    });

    $('.show_edit_module_authority').live('click', function () {
        $('.add_module_authority').css('display', 'none');
        $('.edit_module_authority ').css('display', '');
        uuid = $(this).parent().prevAll('td:last').children('input').val();


        var Name = $(this).parent().prevAll('td:eq(4)').text();
        var Mark = $(this).parent().prevAll('td:eq(3)').text();
        var Note = $(this).parent().prevAll('td:eq(2)').text();
        var Module_id = $(this).parent().prevAll('td:eq(0)').children('input').val();


        $('[name="Name"]').val(Name).attr('placeholder', '');
        $('[name="Mark"]').val(Mark).attr('placeholder', '');
        $('[name="Note"]').val(Note).attr('placeholder', '');
        $('[name="Module_id"]').val(Module_id);

    });

    $('.edit_module_authority').live('click', function () {
        var token = $.cookie('csrftoken');


        var Name = $('[name="Name"]').val();
        var Mark = $('[name="Mark"]').val();
        var Note = $('[name="Note"]').val();
        var Module_id = $('[name="Module_id"]').val();

        var val = {
            'table': 'ModuleAuthority',
            'action': 3000,
            'content': {
                'uuid': uuid,
                'Name': Name,
                'Mark': Mark,
                'Note': Note,
                'Module_id': Module_id

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
                    show(4000, content);

                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()
                } else if (arg.errors.Name) {
                    $('[name="Name"]').attr('placeholder', arg.errors.Name[0].message);
                } else if (arg.errors.URL) {
                    $('[name="Mark"]').attr('placeholder', arg.errors.Mark[0].message);
                } else if (arg.errors.Json_Request) {
                    $('[name="Note"]').attr('placeholder', arg.errors.Note[0].message);
                }
            }
        })


    });


}

function module_message() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_module').addClass('in');
    $('.my_module_nav').addClass('in').css('display', 'block');
    $('.general_module').addClass('in');
    $('.general_object_nav').addClass('in').css('display', 'block');
    $('.general_module_object').addClass('in');
    $('.general_module_object_nav').addClass('in').css('display', 'block');

    function show(action, content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {
            'table': 'Message',
            'action': action,
            'content': content
        };
        $.ajax({
            url: '/general/action_general_json/',
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
                        tr.append('<td><input type="text" style="display: none" value=></input><button type="button" class="btn btn-warning del_message">删除</button>--<a href="#myModal" role="button" class="btn show_edit_message" data-toggle="modal">编辑</a></td>');

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
        show(4000, content)
    });

    $('.del_message').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var val = {
            'table': 'Message',
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
                    show(4000, content);
                } else {
                    $('.message').text(arg.message);
                }
            }
        })
    });

    $('.add_btn').live('click', function () {
        $('[name="NO"]').val('').attr('placeholder', '');
        $('[name="Content"]').val('').attr('placeholder', '');
        $('.edit_message').css('display', 'none');
        $('.add_message').css('display', '');
    });


    $('.add_message').live('click', function () {
        var token = $.cookie('csrftoken');
        var NO = $('[name="NO"]').val();
        var Content = $('[name="Content"]').val();
        var val = {
            'table': 'Message',
            'action': 1000,
            'content': {
                'NO': NO,
                'Content': Content

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
                    show(4000, content);
                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()
                } else if (arg.errors.NO) {
                    $('[name="NO"]').attr('placeholder', arg.errors.NO[0].message);
                } else if (arg.errors.Content) {
                    $('[name="Content"]').attr('placeholder', arg.errors.Content[0].message);
                }
            }
        })


    });

    $('.show_edit_message').live('click', function () {
        $('.add_message').css('display', 'none');
        $('.edit_message').css('display', '');
        uuid = $(this).parent().prevAll('td:last').children('input').val();

        var NO = $(this).parent().prevAll('td:eq(1)').text();
        var Content = $(this).parent().prevAll('td:eq(0)').text();

        $('[name="NO"]').val(NO).attr('placeholder', '');
        $('[name="Content"]').val(Content).attr('placeholder', '');

    });

    $('.edit_message').live('click', function () {
        var token = $.cookie('csrftoken');
        var NO = $('[name="NO"]').val();
        var Content = $('[name="Content"]').val();

        var val = {
            'table': 'Message',
            'action': 3000,
            'content': {
                'uuid': uuid,
                'NO': NO,
                'Content': Content
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
                    show(4000, content);

                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()
                } else if (arg.errors.NO) {
                    $('[name="NO"]').attr('placeholder', arg.errors.NO[0].message);
                } else if (arg.errors.Content) {
                    $('[name="Content"]').attr('placeholder', arg.errors.Content[0].message);
                }
            }
        })

    });


}

function general_interface() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_module').addClass('in');
    $('.my_module_nav').addClass('in').css('display', 'block');
    $('.general_module').addClass('in');
    $('.general_object_nav').addClass('in').css('display', 'block');

    function show(action, content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {
            'table': 'ModuleInterface',
            'action': action,
            'content': content
        };
        $.ajax({
            url: '/general/action_general_json/',
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
        show(4000, content)
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