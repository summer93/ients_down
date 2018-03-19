function store() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_module').addClass('in');
    $('.my_module_nav').addClass('in').css('display', 'block');
    $('.store_module').addClass('in');
    $('.store_object_nav').addClass('in').css('display', 'block');
    $('.store_module_object').addClass('in');
    $('.store_module_object_nav').addClass('in').css('display', 'block');

    function show(content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {
            'table': 'Store',
            'action': 4000,
            'content': content
        };
        $.ajax({
            url: '/store/action_store_json/',
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
                        if (i == 2) {

                            return true
                        }


                        if (i == 7) {
                            tr.append('<th>操作</th>');
                            return true
                        }
                        tr.append("<th>" + item + "</th>");
                    });
                    $('.table_title').append(tr);

                    var vaule_obj = arg.content.value;

                    $.each(vaule_obj, function (i, item) {
                        var tr = $("<tr/>");
                        $.each(item, function (i, item2) {
                            if (i == 0) {

                                tr.append('<td><input type="checkbox" value=' + item2 + '></td>');
                                return true
                            }
                            if (i == 2) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }
                            if (i == 7) {
                                tr.append('<td><input type="text" style="display: none" value=' + item2 + '><button type="button" class="btn btn-warning del_store">删除</button>|<a href="#myModal" role="button" class="btn show_edit_store" data-toggle="modal">编辑</a></td>');
                                return true

                            }
                            tr.append("<td>" + item2 + "</td>");

                        });
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

    $('.search_store').live('click', function () {
        $('.table_data').children().remove();
        $('.close_searchmodal').click();

        var SearchName = $('[name="SearchName"]').val();
        var SearchTell = $('[name="SearchTell"]').val();
        var SearchAddress = $('[name="SearchAddress"]').val();
        var SearchCompany_id = $('[name="SearchCompany_id"]').val();
        var SearchStatus_id = $('[name="SearchStatus_id"]').val();
        var content =
            {
                'Name': SearchName,
                'Tell': SearchTell,
                'Address': SearchAddress,
                'Company_id': SearchCompany_id,
                'Status_id': SearchStatus_id
            };

        show(content)

    });


    $('.del_store').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var val = {
            'table': 'Store',
            'action': 2000,
            'content': {
                'uuid': uuid
            }
        };


        $.ajax({
            url: '/store/action_store_json/',
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
        $('[name="Tell"]').val('').attr('placeholder', '');
        $('[name="Address"]').val('').attr('placeholder', '');
        $('[name="Company_id"]').val('');
        $('[name="Status_id"]').val('');
        $('.edit_store').css('display', 'none');
        $('.add_store').css('display', '');

    });

    $('.add_store').live('click', function () {
        var token = $.cookie('csrftoken');
        var Name = $('[name="Name"]').val();
        var Tell = $('[name="Tell"]').val();
        var Address = $('[name="Address"]').val();
        var Company_id = $('[name="Company_id"]').val();
        var Status_id = $('[name="Status_id"]').val();
        var val = {
            'table': 'Store',
            'action': 1000,
            'content': {
                'Name': Name,
                'Tell': Tell,
                'Address': Address,
                'Company_id': Company_id,
                'Status_id': Status_id

            }


        };
        $.ajax({
            url: '/store/action_store_json/',
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
                } else if (arg.errors.Tell) {
                    $('[name="Tell"]').attr('placeholder', arg.errors.Tell[0].message);
                } else if (arg.errors.Address) {
                    $('[name="Address"]').attr('placeholder', arg.errors.Address[0].message);


                }
            }
        })


    });

    $('.show_edit_store').live('click', function () {
        $('.add_store').css('display', 'none');
        $('.edit_store').css('display', '');
        uuid = $(this).parent().prevAll('td:last').children('input').val();

        var Company_id = $(this).parent().children('input').val();

        var Address = $(this).parent().prevAll('td:eq(1)').text();
        var Tell = $(this).parent().prevAll('td:eq(2)').text();
        var Name = $(this).parent().prevAll('td:eq(3)').text();
        var Status_id = $(this).parent().prevAll('td:eq(4)').children('input').val();


        $('[name="Name"]').val(Name).attr('placeholder', '');
        $('[name="Tell"]').val(Tell).attr('placeholder', '');
        $('[name="Address"]').val(Address).attr('placeholder', '');
        $('[name="Company_id"]').val(Company_id);
        $('[name="Status_id"]').val(Status_id);


    });

    $('.edit_store').live('click', function () {
        var token = $.cookie('csrftoken');
        var Name = $('[name="Name"]').val();
        var Tell = $('[name="Tell"]').val();
        var Address = $('[name="Address"]').val();
        var Company_id = $('[name="Company_id"]').val();
        var Status_id = $('[name="Status_id"]').val();
        var val = {
            'table': 'Store',
            'action': 3000,
            'content': {
                'uuid': uuid,
                'Status_id': Status_id,
                'Name': Name,
                'Tell': Tell,
                'Address': Address,
                'Company_id': Company_id
            }

        };
        $.ajax({
            url: '/store/action_store_json/',
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
                } else if (arg.errors.Tell) {
                    $('[name="Tell"]').attr('placeholder', arg.errors.Tell[0].message);
                } else if (arg.errors.Address) {
                    $('[name="Address"]').attr('placeholder', arg.errors.Address[0].message);
                }
            }
        })


    });

    $('.all_search_btn').live('click', function () {

        var content = {};
        show(content)


    });

}

function partlive() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_module').addClass('in');
    $('.my_module_nav').addClass('in').css('display', 'block');
    $('.store_module').addClass('in');
    $('.store_object_nav').addClass('in').css('display', 'block');
    $('.store_module_object').addClass('in');
    $('.store_module_object_nav').addClass('in').css('display', 'block');

    function show(content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();

        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {
            'table': 'PartLive',
            'action': 4000,
            'content': content
        };
        $.ajax({
            url: '/store/action_store_json/',
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
                        if (i == 7) {
                            tr.append('<th>操作</th>');
                            return true
                        }
                        tr.append("<th>" + item + "</th>");
                    });
                    $('.table_title').append(tr);
                    var vaule_obj = arg.content.value;
                    $.each(vaule_obj, function (i, item) {
                        var tr = $("<tr/>");
                        $.each(item, function (i, item2) {
                            if (i == 0) {
                                tr.append('<td><input type="checkbox" value=' + item2 + '></td>');
                                return true
                            }
                            if (i == 7) {
                                tr.append('<td><input type="text" style="display: none" value=' + item2 + '><button type="button" class="btn btn-warning del_partlive">删除</button>|<a href="#myModal" role="button" class="btn show_edit_partlive" data-toggle="modal">编辑</a></td>');
                                return true
                            }
                            tr.append("<td>" + item2 + "</td>");

                        });
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

    $('.search_partlive').live('click', function () {
        $('.table_data').children().remove();
        $('.close_searchmodal').click();


        var SearchQR_Code = $('[name="SearchQR_Code"]').val();
        var SearchPart_id = $('[name="SearchPart_id"]').val();

        var content = {
            'QR_Code': SearchQR_Code,
            'Part_id': SearchPart_id

        };
        show(content)
    });

    $('.del_partlive').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var val = {
            'table': 'PartLive',
            'action': 2000,
            'content': {
                'uuid': uuid
            }
        };
        $.ajax({
            url: '/store/action_store_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    var content = {};
                    show(content)
                } else {
                    $('#DeleteError').text(arg.message);
                }
            }
        })
    });

    $('.add_btn').live('click', function () {
        $('[name="QR_Code"]').val('').attr('placeholder', '');
        $('[name="Part_id"]').val('');
        $('.edit_partlive').css('display', 'none');
        $('.add_partlive').css('display', '');

    });

    $('.add_partlive').live('click', function () {
        var token = $.cookie('csrftoken');
        var QR_Code = $('[name="QR_Code"]').val();
        var Part_id = $('[name="Part_id"]').val();

        var val = {
            'table': 'PartLive',
            'action': 1000,
            'content': {
                'QR_Code': QR_Code,
                'Part_id': Part_id

            }

        };
        $.ajax({
            url: '/store/action_store_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),

            success: function (arg) {
                if (arg.status) {
                    var content = {};
                    show(content);
                    $('.close_modal').click();


                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()
                } else if (arg.errors.QR_Code) {
                    $('[name="QR_Code"]').attr('placeholder', arg.errors.QR_Code[0].message);
                }
            }
        })


    });

    $('.show_edit_partlive').live('click', function () {
        $('.add_partlive').css('display', 'none');
        $('.edit_partlive').css('display', '');
        uuid = $(this).parent().prevAll('td:last').children('input').val();

        var Part_id = $(this).parent().children('input').val();
        var QR_Code = $(this).parent().prevAll('td:eq(5)').text();


        $('[name="Part_id"]').val(Part_id).attr('placeholder', '');
        $('[name="QR_Code"]').val(QR_Code);


    });

    $('.edit_partlive').live('click', function () {
        var token = $.cookie('csrftoken');
        var Part_id = $('[name="Part_id"]').val();
        var QR_Code = $('[name="QR_Code"]').val();
        var val = {
            'table': 'PartLive',
            'action': 3000,
            'content': {
                'uuid': uuid,
                'Part_id': Part_id,
                'QR_Code': QR_Code
            }


        };
        $.ajax({
            url: '/store/action_store_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    var content = {};
                    show(content);
                    $('.close_modal').click();
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()
                } else if (arg.errors.QR_Code) {
                    $('[name="QR_Code"]').attr('placeholder', arg.errors.QR_Code[0].message);
                }
            }
        });


    });

    $('.all_search_btn').live('click', function () {

        var content = {};
        show(content)


    });

}

function store_con_partlive() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_module').addClass('in');
    $('.my_module_nav').addClass('in').css('display', 'block');
    $('.store_module').addClass('in');
    $('.store_object_nav').addClass('in').css('display', 'block');
    $('.store_module_object').addClass('in');
    $('.store_module_object_nav').addClass('in').css('display', 'block');

    function show(content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var Store_id = $('[name="Store_id"]').val();
        var select_val = {
            'table': 'StoreConPartLive',
            'action': 4000,
            'content': content
        };
        $.ajax({
            url: '/store/action_store_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(select_val),
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
                        if (i == 6) {

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
                            if (i == 6) {
                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }

                            tr.append("<td>" + item2 + "</td>");

                        });
                        tr.append('<td><button type="button" class="btn btn-warning del_storeconpartlive">删除</button>|<a href="#myModal" role="button" class="btn show_edit_storeconpartlive" data-toggle="modal">编辑</a></td>');
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
        var Store_id = $('[name="Store_id"]').val();
        var content = {
            'Store_id': Store_id,
            'store_type': 'node_store'
        };
        show(content)
    });


    $('.node_store').live('click', function () {
        $('.store_type').val('node_store');
        var Store_id = $('[name="Store_id"]').val();
        var content = {
            'Store_id': Store_id,
            'store_type': 'node_store'
        };
        show(content)
    });

    $('.all_store').live('click', function () {
        $('.store_type').val('all_store');
        var Store_id = $('[name="Store_id"]').val();
        var content = {
            'Store_id': Store_id,
            'store_type': 'all_store'
        };
        show(content)
    });

    $('.all_leaf_node_store').live('click', function () {
        $('.store_type').val('all_leaf_node_store');
        var Store_id = $('[name="Store_id"]').val();
        var content = {
            'Store_id': Store_id,
            'store_type': 'all_leaf_node_store'

        };
        show(content)
    });

    $('.del_storeconpartlive').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var val = {
            'table': 'StoreConPartLive',
            'action': 2000,
            'content': {
                'uuid': uuid
            }
        };

        $.ajax({
            url: '/store/action_store_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    var Store_id = $('[name="Store_id"]').val();
                    var store_type = $('.store_type').val();
                    var content = {
                        'Store_id': Store_id,
                        'store_type': store_type
                    };

                    show(content)
                } else {
                    $('.message').text(arg.message);
                }
            }
        })
    });

    $('.add_btn').live('click', function () {
        $('[name="Number"]').val('').attr('placeholder', '');
        $('[name="PartLive_id"]').val('');
        $('[name="Store_id_edit"]').val($('[name="Store_id"]').val());
        $('.edit_storeconpartlive').css('display', 'none');
        $('.add_storeconpartlive').css('display', '');

    });

    $('.add_storeconpartlive').live('click', function () {
        var token = $.cookie('csrftoken');
        var Number = $('[name="Number"]').val();
        var PartLive_id = $('[name="PartLive_id"]').val();
        var Store_id = $('[name="Store_id_edit"]').val();

        var val = {
            'table': 'StoreConPartLive',
            'action': 1000,
            'content': {
                'Number': Number,
                'PartLive_id': PartLive_id,
                'Store_id': Store_id

            }

        };
        $.ajax({
            url: '/store/action_store_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),

            success: function (arg) {
                if (arg.status) {
                    var Store_id = $('[name="Store_id"]').val();
                    var store_type = $('.store_type').val();
                    var content = {
                        'Store_id': Store_id,
                        'store_type': store_type
                    };

                    show(content);
                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()
                } else if (arg.errors.Number) {
                    $('[name="Number"]').val('').attr('placeholder', arg.errors.Number[0].message);
                }
            }
        });


    });

    $('.show_edit_storeconpartlive').live('click', function () {
        $('.add_storeconpartlive').css('display', 'none');
        $('.edit_storeconpartlive').css('display', '');
        uuid = $(this).parent().prevAll('td:last').children('input').val();

        var PartLive_id = $(this).parent().prevAll('td:eq(9)').children('input').val();
        var Number = $(this).parent().prevAll('td:eq(0)').text();
        var store_id_edit = $(this).parent().prevAll('td:eq(4)').children('input').val();
        $('[name="Store_id_edit"]').val(store_id_edit);


        $('[name="PartLive_id"]').val(PartLive_id);
        $('[name="Number"]').val(Number).attr('placeholder', '');
    });

    $('.edit_storeconpartlive').live('click', function () {
        var token = $.cookie('csrftoken');
        var PartLive_id = $('[name="PartLive_id"]').val();
        var Store_id = $('[name="Store_id_edit"]').val();

        var Number = $('[name="Number"]').val();
        var val = {
            'table': 'StoreConPartLive',
            'action': 3000,
            'content': {
                'uuid': uuid,
                'PartLive_id': PartLive_id,
                'Number': Number,
                'Store_id': Store_id
            }


        };

        $.ajax({
            url: '/store/action_store_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    var Store_id = $('[name="Store_id"]').val();
                    var store_type = $('.store_type').val();
                    var content = {
                        'Store_id': Store_id,
                        'store_type': store_type
                    };
                    show(content);
                    $('.close_modal').click()
                } else if (arg.errors.Number) {
                    $('[name="Number"]').attr('placeholder', arg.errors.Number[0].message);

                }
            }
        });

    });

    $('.search_store').live('click', function () {
        $('.table_data').children().remove();
        $('.close_searchmodal').click();

        var PartLive__QR_Code = $('[name="PartLive__QR_Code"]').val();
        var PartLive__Part__ItemNO = $('[name="PartLive__Part__ItemNO"]').val();
        var PartLive__Part__Name = $('[name="PartLive__Part__Name"]').val();
        var Store_id = $('[name="Store_id"]').val();
        var store_type = $('.store_type').val();

        var content = {
            'Store_id': Store_id,
            'PartLive__QR_Code': PartLive__QR_Code,
            'PartLive__Part__ItemNO': PartLive__Part__ItemNO,
            'PartLive__Part__Name': PartLive__Part__Name,
            'store_type': store_type
        };
        show(content);


    });

    $('.all_search_btn').live('click', function () {
        var store_type = $('.store_type').val();
        var Store_id = $('[name="Store_id"]').val();
        var content = {
            'Store_id': Store_id,
            'store_type': store_type
        };
        show(content)


    });
}

function store_con() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_module').addClass('in');
    $('.my_module_nav').addClass('in').css('display', 'block');
    $('.store_module').addClass('in');
    $('.store_object_nav').addClass('in').css('display', 'block');
    $('.store_module_object').addClass('in');
    $('.store_module_object_nav').addClass('in').css('display', 'block');

    function show(content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {
            'table': 'StoreCon',
            'action': 4000,
            'content': content
        };
        $.ajax({
            url: '/store/action_store_json/',
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
                        tr.append('<td><button type="button" class="btn btn-warning del_storecon">删除</button></td>');
                        $('.table_data').append(tr);
                    });

                } else {
                    $('.message').text(arg.message);
                }
            }
        });
    }

    $(document).ready(function () {
        var content = {};
        show(content)
    });

    $('.del_storecon').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var val = {
            'table': 'StoreCon',
            'action': 2000,
            'content': {
                'uuid': uuid
            }
        };

        $.ajax({
            url: '/store/action_store_json/',
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
        $('[name="Last_id"]').val('');


    });

    $('.add_storecon').live('click', function () {
        var token = $.cookie('csrftoken');
        var Head_id = $('[name="Head_id"]').val();
        var Last_id = $('[name="Last_id"]').val();
        var val = {
            'table': 'StoreCon',
            'action': 1000,
            'content': {
                'Head_id': Head_id,
                'Last_id': Last_id

            }


        };
        $.ajax({
            url: '/store/action_store_json/',
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

function store_status() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_module').addClass('in');
    $('.my_module_nav').addClass('in').css('display', 'block');
    $('.store_module').addClass('in');
    $('.store_object_nav').addClass('in').css('display', 'block');
    $('.store_module_object').addClass('in');
    $('.store_module_object_nav').addClass('in').css('display', 'block');

    function show(content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {
            'table': 'Store_Status',
            'action': 4000,
            'content': content
        };
        $.ajax({
            url: '/store/action_store_json/',
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
                        tr.append('<td><button type="button" class="btn btn-warning del_store_status">删除</button>|<a href="#myModal" role="button" class="btn show_edit_store_status" data-toggle="modal">编辑</a></td>');
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

    $('.del_store_status').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var val = {
            'table': 'Store_Status',
            'action': 2000,
            'content': {
                'uuid': uuid
            }
        };


        $.ajax({
            url: '/store/action_store_json/',
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
        $('[name="NO"]').val('').attr('placeholder', '');
        $('[name="Name"]').val('').attr('placeholder', '');

        $('.edit_store_status').css('display', 'none');
        $('.add_store_status').css('display', '');

    });

    $('.add_store_status').live('click', function () {
        var token = $.cookie('csrftoken');
        var NO = $('[name="NO"]').val();
        var Name = $('[name="Name"]').val();


        var val = {
            'table': 'Store_Status',
            'action': 1000,
            'content': {
                'NO': NO,
                'Name': Name


            }


        };
        $.ajax({
            url: '/store/action_store_json/',
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

    $('.show_edit_store_status').live('click', function () {
        $('.add_store_status').css('display', 'none');
        $('.edit_store_status').css('display', '');
        uuid = $(this).parent().prevAll('td:last').children('input').val();


        var NO = $(this).parent().prevAll('td:eq(1)').text();
        var Name = $(this).parent().prevAll('td:eq(0)').text();


        $('[name="NO"]').val(NO).attr('placeholder', '');
        $('[name="Name"]').val(Name).attr('placeholder', '');


    });

    $('.edit_store_status').live('click', function () {
        var token = $.cookie('csrftoken');
        var NO = $('[name="NO"]').val();
        var Name = $('[name="Name"]').val();

        var val = {
            'table': 'Store_Status',
            'action': 3000,
            'content': {
                'uuid': uuid,
                'NO': NO,
                'Name': Name

            }

        };
        $.ajax({
            url: '/store/action_store_json/',
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

function form_status() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_module').addClass('in');
    $('.my_module_nav').addClass('in').css('display', 'block');
    $('.store_module').addClass('in');
    $('.store_object_nav').addClass('in').css('display', 'block');
    $('.store_module_object').addClass('in');
    $('.store_module_object_nav').addClass('in').css('display', 'block');

    function show(content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {
            'table': 'Form_Status',
            'action': 4000,
            'content': content
        };
        $.ajax({
            url: '/store/action_store_json/',
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
                        tr.append('<td><button type="button" class="btn btn-warning del_form_status">删除</button>|<a href="#myModal" role="button" class="btn show_edit_form_status" data-toggle="modal">编辑</a></td>');
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

    $('.del_form_status').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var val = {
            'table': 'Form_Status',
            'action': 2000,
            'content': {
                'uuid': uuid
            }
        };


        $.ajax({
            url: '/store/action_store_json/',
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
        $('[name="NO"]').val('').attr('placeholder', '');
        $('[name="Name"]').val('').attr('placeholder', '');

        $('.edit_form_status').css('display', 'none');
        $('.add_form_status').css('display', '');

    });

    $('.add_form_status').live('click', function () {
        var token = $.cookie('csrftoken');
        var NO = $('[name="NO"]').val();
        var Name = $('[name="Name"]').val();


        var val = {
            'table': 'Form_Status',
            'action': 1000,
            'content': {
                'NO': NO,
                'Name': Name


            }


        };
        $.ajax({
            url: '/store/action_store_json/',
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

    $('.show_edit_form_status').live('click', function () {
        $('.add_form_status').css('display', 'none');
        $('.edit_form_status').css('display', '');
        uuid = $(this).parent().prevAll('td:last').children('input').val();


        var NO = $(this).parent().prevAll('td:eq(1)').text();
        var Name = $(this).parent().prevAll('td:eq(0)').text();


        $('[name="NO"]').val(NO).attr('placeholder', '');
        $('[name="Name"]').val(Name).attr('placeholder', '');


    });

    $('.edit_form_status').live('click', function () {
        var token = $.cookie('csrftoken');
        var NO = $('[name="NO"]').val();
        var Name = $('[name="Name"]').val();

        var val = {
            'table': 'Form_Status',
            'action': 3000,
            'content': {
                'uuid': uuid,
                'NO': NO,
                'Name': Name

            }

        };
        $.ajax({
            url: '/store/action_store_json/',
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

function store_form() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_module').addClass('in');
    $('.my_module_nav').addClass('in').css('display', 'block');
    $('.store_module').addClass('in');
    $('.store_object_nav').addClass('in').css('display', 'block');
    $('.store_module_object').addClass('in');
    $('.store_module_object_nav').addClass('in').css('display', 'block');

    function show(content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {
            'table': 'StoreForm',
            'action': 4000,
            'content': content
        };
        $.ajax({
            url: '/store/action_store_json/',
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
                        if (i == 2) {

                            return true
                        }
                        if (i == 4) {

                            return true
                        }
                        if (i == 6) {

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
                            if (i == 2) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }
                            if (i == 4) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }
                            if (i == 6) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }


                            tr.append("<td>" + item2 + "</td>");


                        });
                        tr.append('<td><input type="text" style="display: none"><button type="button" class="btn btn-warning del_storeform">删除</button>|<a href="#myModal" role="button" class="btn show_edit_storeform" data-toggle="modal">编辑</a></td>');

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
        var Store_id = $('[name="Store_id"]').val();
        var Status_id = $('[name="Status_id"]').val();

        var content = {
            'Store_id': Store_id,
            'Status_id': Status_id
        };
        show(content)
    });

    $('.change_store').live('click', function () {
        var Store_id = $('[name="Store_id"]').val();

        var Status_id = $('[name="Status_id"]').val();

        var content = {
            'Store_id': Store_id,
            'Status_id': Status_id
        };
        show(content)

    });

    $('.del_storeform').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var val = {
            'table': 'StoreForm',
            'action': 2000,
            'content': {
                'uuid': uuid
            }
        };

        $.ajax({
            url: '/store/action_store_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    var Store_id = $('[name="Store_id"]').val();
                    var Status_id = $('[name="Status_id"]').val();
                    var content = {
                        'Store_id': Store_id,
                        'Status_id': Status_id
                    };
                    show(content)
                } else {
                    $('.message').text(arg.message);
                }
            }
        })
    });

    $('.add_btn').live('click', function () {
        $('[name="Name"]').val('').attr('placeholder', '');
        $('.edit_storeform').css('display', 'none');
        $('.add_storeform').css('display', '');


    });

    $('.add_storeform').live('click', function () {
        var token = $.cookie('csrftoken');
        var Name = $('[name="Name"]').val();
        var Status_id_edit = $('[name="Status_id_edit"]').val();
        var OriginStore_id_edit = $('[name="OriginStore_id_edit"]').val();
        var TargetStore_id = $('[name="TargetStore_id"]').val();
        if (TargetStore_id == '') {
            var TargetStore_id = null
        }
        var val = {

            'table': 'StoreForm',
            'action': 1000,
            'content': {
                'Name': Name,
                'Status_id': Status_id_edit,
                'OriginStore_id': OriginStore_id_edit,
                'TargetStore_id': TargetStore_id

            }


        };
        $.ajax({
            url: '/store/action_store_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),

            success: function (arg) {

                if (arg.status) {
                    var Store_id = $('[name="Store_id"]').val();
                    var Status_id = $('[name="Status_id"]').val();
                    var content = {
                        'Store_id': Store_id,
                        'Status_id': Status_id
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

    $('.show_edit_storeform').live('click', function () {
        $('.add_storeform').css('display', 'none');
        $('.edit_storeform').css('display', '');
        uuid = $(this).parent().prevAll('td:last').children('input').val();


        var Name = $(this).parent().prevAll('td:eq(8)').text();
        var Status_id_edit = $(this).parent().prevAll('td:eq(7)').children('input').val();
        var OriginStore_id_edit = $(this).parent().prevAll('td:eq(5)').children('input').val();
        var TargetStore_id = $(this).parent().prevAll('td:eq(3)').children('input').val();
        if (TargetStore_id == '') {
            var TargetStore_id = null
        }

        $('[name="Name"]').val(Name).attr('placeholder', '');

        $('[name="Status_id_edit"]').val(Status_id_edit);
        $('[name="OriginStore_id_edit"]').val(OriginStore_id_edit);
        $('[name="TargetStore_id"]').val(TargetStore_id);


    });

    $('.edit_storeform').live('click', function () {
        var token = $.cookie('csrftoken');
        var Name = $('[name="Name"]').val();
        var Status_id_edit = $('[name="Status_id_edit"]').val();
        var OriginStore_id_edit = $('[name="OriginStore_id_edit"]').val();
        var TargetStore_id = $('[name="TargetStore_id"]').val();
        if (TargetStore_id == '') {
            var TargetStore_id = null
        }
        var val = {

            'table': 'StoreForm',
            'action': 3000,
            'content': {
                'uuid': uuid,
                'Name': Name,
                'Status_id': Status_id_edit,
                'OriginStore_id': OriginStore_id_edit,
                'TargetStore_id': TargetStore_id

            }

        };
        $.ajax({
            url: '/store/action_store_json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    var Store_id = $('[name="Store_id"]').val();
                    var Status_id = $('[name="Status_id"]').val();
                    var content = {
                        'Store_id': Store_id,
                        'Status_id': Status_id
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

function storeform_con_partlive() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_module').addClass('in');
    $('.my_module_nav').addClass('in').css('display', 'block');
    $('.store_module').addClass('in');
    $('.store_object_nav').addClass('in').css('display', 'block');
    $('.store_module_object').addClass('in');
    $('.store_module_object_nav').addClass('in').css('display', 'block');

    function show(content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {
            'table': 'StoreFormConPartLive',
            'action': 4000,
            'content': content
        };
        $.ajax({
            url: '/store/action_store_json/',
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
                        if (i == 5) {

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
                            if (i == 5) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }


                            tr.append("<td>" + item2 + "</td>");

                        });
                        tr.append('<td><input type="text" style="display: none" value=><button type="button" class="btn btn-warning del_store">删除</button>|<a href="#myModal" role="button" class="btn show_edit_store" data-toggle="modal">编辑</a></td>');

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


    $('.del_store').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var val = {
            'table': 'StoreFormConPartLive',
            'action': 2000,
            'content': {
                'uuid': uuid
            }
        };


        $.ajax({
            url: '/store/action_store_json/',
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
        $('[name="Number"]').val('').attr('placeholder', '').attr('placeholder', '');

        $('.edit_store').css('display', 'none');
        $('.add_store').css('display', '');

    });

    $('.add_store').live('click', function () {
        var token = $.cookie('csrftoken');
        var Number = $('[name="Number"]').val();
        var StoreForm_id = $('[name="StoreForm_id"]').val();
        var PartLive_id = $('[name="PartLive_id"]').val();

        var val = {
            'table': 'StoreFormConPartLive',
            'action': 1000,
            'content': {
                'Number': Number,
                'StoreForm_id': StoreForm_id,
                'PartLive_id': PartLive_id

            }


        };
        $.ajax({
            url: '/store/action_store_json/',
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

                } else if (arg.errors.Number) {
                    $('[name="Number"]').val('').attr('placeholder', arg.errors.Number[0].message);
                }
            }
        })


    });

    $('.show_edit_store').live('click', function () {
        $('.add_store').css('display', 'none');
        $('.edit_store').css('display', '');
        uuid = $(this).parent().prevAll('td:last').children('input').val();

        var Number = $(this).parent().prevAll('td:eq(0)').text();
        var StoreForm_id = $(this).parent().prevAll('td:eq(7)').children('input').val();
        var PartLive_id = $(this).parent().prevAll('td:eq(3)').children('input').val();

        $('[name="Number"]').val(Number);
        $('[name="StoreForm_id"]').val(StoreForm_id);
        $('[name="PartLive_id"]').val(PartLive_id)


    });

    $('.edit_store').live('click', function () {
        var token = $.cookie('csrftoken');
        var Number = $('[name="Number"]').val();
        var StoreForm_id = $('[name="StoreForm_id"]').val();
        var PartLive_id = $('[name="PartLive_id"]').val();
        var val = {
            'table': 'StoreFormConPartLive',
            'action': 3000,
            'content': {
                'uuid': uuid,
                'Number': Number,
                'StoreForm_id': StoreForm_id,
                'PartLive_id': PartLive_id

            }

        };
        $.ajax({
            url: '/store/action_store_json/',
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

                } else if (arg.errors.Number) {
                    $('[name="Number"]').val('').attr('placeholder', arg.errors.Number[0].message);
                }
            }
        })


    });

    $('.all_search_btn').live('click', function () {

        var content = {};
        show(content)


    });

}

function store_crud_interface() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_module').addClass('in');
    $('.my_module_nav').addClass('in').css('display', 'block');
    $('.store_module').addClass('in');
    $('.store_object_nav').addClass('in').css('display', 'block');

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
            url: '/store/action_store_json/',
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
                'Module_id': 'a0345971750c48f9b3938df74094b9b5'

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

                    var content = {'Module_id': 'a0345971750c48f9b3938df74094b9b5'};
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
                'Module_id': 'a0345971750c48f9b3938df74094b9b5'

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
                    var content = {'Module_id': 'a0345971750c48f9b3938df74094b9b5'};
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

function store_interface() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_module').addClass('in');
    $('.my_module_nav').addClass('in').css('display', 'block');
    $('.store_module').addClass('in');
    $('.store_object_nav').addClass('in').css('display', 'block');

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
            url: '/store/action_store_json/',
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

function store_putin() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_module').addClass('in');
    $('.my_module_nav').addClass('in').css('display', 'block');
    $('.store_module').addClass('in');
    $('.store_object_nav').addClass('in').css('display', 'block');
    $('.store_module_function').addClass('in');
    $('.store_module_function_nav').addClass('in').css('display', 'block');


    $('.add_btn').live('click', function () {
        $('[name="Number"]').val('').attr('placeholder', '');
        $('[name="Store_id"]').val('');
        $('[name="PartLive_id"]').val('');
    });
    $('.put_in_btn').live('click', function () {
        var token = $.cookie('csrftoken');
        var Number = $('[name="Number"]').val();
        var Store_id = $('[name="Store_id"]').val();
        var PartLive_id = $('[name="PartLive_id"]').val();
        var val = {
            'action': 'CG-F-01-01',
            'Store_id': Store_id,
            'content': {
                'PartLive_id': PartLive_id,
                'Number': Number

            }

        };
        $.ajax({
            url: '/store/CG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),

            success: function (arg) {
                $('.close_modal').click();
                alert(arg.message);


            }
        });


    })

}

function store_putin_temp() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_module').addClass('in');
    $('.my_module_nav').addClass('in').css('display', 'block');
    $('.store_module').addClass('in');
    $('.store_object_nav').addClass('in').css('display', 'block');
    $('.store_module_function').addClass('in');
    $('.store_module_function_nav').addClass('in').css('display', 'block');

    $('.add_btn').live('click', function () {
        $('[name="Number"]').val('').attr('placeholder', '');
        $('[name="Store_id"]').val('');
        $('[name="PartLive_id"]').val('');
    });
    $('.put_in_btn').live('click', function () {
        var token = $.cookie('csrftoken');
        var Number = $('[name="Number"]').val();
        var Store_id = $('[name="Store_id"]').val();
        var PartLive_id = $('[name="PartLive_id"]').val();
        var val = {
            'action': 'CG-F-02-01',
            'Store_id': Store_id,
            'content': {
                'PartLive_id': PartLive_id,
                'Number': Number

            }

        };
        $.ajax({
            url: '/store/CG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),

            success: function (arg) {

                $('.close_modal').click();
                alert(arg.message);
            }
        });


    })

}

function store_stock() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_module').addClass('in');
    $('.my_module_nav').addClass('in').css('display', 'block');
    $('.store_module').addClass('in');
    $('.store_object_nav').addClass('in').css('display', 'block');
    $('.store_module_function').addClass('in');
    $('.store_module_function_nav').addClass('in').css('display', 'block');

    function show(content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var Store_id = $('[name="Store_id"]').val();
        var select_val = {
            'action': 'CG-F-01-03',
            'Store_id': Store_id,
            'content': content
        };
        $.ajax({
            url: '/store/CG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(select_val),
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
                        if (i == 6) {

                            return true
                        }
                        tr.append("<th>" + item + "</th>");
                    });
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
                            if (i == 6) {
                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }
                            tr.append("<td>" + item2 + "</td>");

                        });
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
        var content = {
            'store_type': 'node_store'
        };
        show(content)
    });


    $('.node_store').live('click', function () {
        $('.store_type').val('node_store');

        var content = {
            'store_type': 'node_store'
        };
        show(content)
    });

    $('.all_store').live('click', function () {
        $('.store_type').val('all_store');
        var content = {
            'store_type': 'all_store'
        };
        show(content)
    });

    $('.all_leaf_node_store').live('click', function () {
        $('.store_type').val('all_leaf_node_store');
        var content = {
            'store_type': 'all_leaf_node_store'
        };
        show(content)
    });


    $('.search_store').live('click', function () {
        $('.table_data').children().remove();
        $('.close_searchmodal').click();

        var PartLive__QR_Code = $('[name="PartLive__QR_Code"]').val();
        var PartLive__Part__ItemNO = $('[name="PartLive__Part__ItemNO"]').val();
        var PartLive__Part__Name = $('[name="PartLive__Part__Name"]').val();
        var store_type = $('.store_type').val();

        var content = {

            'PartLive__QR_Code': PartLive__QR_Code,
            'PartLive__Part__ItemNO': PartLive__Part__ItemNO,
            'PartLive__Part__Name': PartLive__Part__Name,
            'store_type': store_type
        };
        show(content);


    });

    $('.all_search_btn').live('click', function () {
        var store_type = $('.store_type').val();
        var content = {
            'store_type': store_type
        };
        show(content)


    });
}

function store_stock_temp() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_module').addClass('in');
    $('.my_module_nav').addClass('in').css('display', 'block');
    $('.store_module').addClass('in');
    $('.store_object_nav').addClass('in').css('display', 'block');
    $('.store_module_function').addClass('in');
    $('.store_module_function_nav').addClass('in').css('display', 'block');

    function show(content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var Store_id = $('[name="Store_id"]').val();
        var select_val = {
            'action': 'CG-F-02-03',
            'Store_id': Store_id,
            'content': content
        };
        $.ajax({
            url: '/store/CG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(select_val),
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
                        if (i == 6) {

                            return true
                        }
                        tr.append("<th>" + item + "</th>");
                    });
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
                            if (i == 6) {
                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }
                            tr.append("<td>" + item2 + "</td>");

                        });
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

        var content = {
            'store_type': 'node_store'

        };
        show(content)
    });


    $('.node_store').live('click', function () {
        $('.store_type').val('node_store');

        var content = {

            'store_type': 'node_store'
        };
        show(content)
    });

    $('.all_store').live('click', function () {
        $('.store_type').val('all_store');

        var content = {

            'store_type': 'all_store'
        };
        show(content)
    });

    $('.all_leaf_node_store').live('click', function () {
        $('.store_type').val('all_leaf_node_store');

        var content = {

            'store_type': 'all_leaf_node_store'

        };
        show(content)
    });


    $('.search_store').live('click', function () {
        $('.table_data').children().remove();
        $('.close_searchmodal').click();

        var PartLive__QR_Code = $('[name="PartLive__QR_Code"]').val();
        var PartLive__Part__ItemNO = $('[name="PartLive__Part__ItemNO"]').val();
        var PartLive__Part__Name = $('[name="PartLive__Part__Name"]').val();
        var Store_id = $('[name="Store_id"]').val();
        var store_type = $('.store_type').val();

        var content = {
            'Store_id': Store_id,
            'PartLive__QR_Code': PartLive__QR_Code,
            'PartLive__Part__ItemNO': PartLive__Part__ItemNO,
            'PartLive__Part__Name': PartLive__Part__Name,
            'store_type': store_type
        };
        show(content);


    });

    $('.all_search_btn').live('click', function () {
        var store_type = $('.store_type').val();
        var content = {

            'store_type': store_type
        };
        show(content)


    });
}

function edit_partlive() {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_module').addClass('in');
    $('.my_module_nav').addClass('in').css('display', 'block');
    $('.store_module').addClass('in');
    $('.store_object_nav').addClass('in').css('display', 'block');
    $('.store_module_function').addClass('in');
    $('.store_module_function_nav').addClass('in').css('display', 'block');

    function show(content) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var Store_id = $('[name="Store_id"]').val();
        var select_val = {
            'action': 'CG-F-03-04',
            'Store_id': Store_id,
            'content': content
        };
        $.ajax({
            url: '/store/CG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(select_val),
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
                        if (i == 6) {

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
                            if (i == 6) {
                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }

                            tr.append("<td>" + item2 + "</td>");

                        });
                        tr.append('<td><button type="button" class="btn btn-warning del_storeconpartlive">删除</button>|<a href="#myModal" role="button" class="btn show_edit_storeconpartlive" data-toggle="modal">编辑</a></td>');
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

        var content = {
            'store_type': 'node_store'
        };
        show(content)
    });


    $('.node_store').live('click', function () {
        $('.store_type').val('node_store');

        var content = {

            'store_type': 'node_store'
        };
        show(content)
    });

    $('.all_store').live('click', function () {
        $('.store_type').val('all_store');
        var content = {

            'store_type': 'all_store'
        };
        show(content)
    });

    $('.all_leaf_node_store').live('click', function () {
        $('.store_type').val('all_leaf_node_store');

        var content = {

            'store_type': 'all_leaf_node_store'

        };
        show(content)
    });

    $('.del_storeconpartlive').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var val = {
            'action': 'CG-F-03-02',
            'content': {
                'uuid': uuid
            }
        };

        $.ajax({
            url: '/store/CG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    var Store_id = $('[name="Store_id"]').val();
                    var store_type = $('.store_type').val();
                    var content = {
                        'Store_id': Store_id,
                        'store_type': store_type
                    };

                    show(content)
                } else {
                    $('.message').text(arg.message);
                }
            }
        })
    });

    $('.add_btn').live('click', function () {
        $('[name="Number"]').val('').attr('placeholder', '');
        $('[name="PartLive_id"]').val('');
        $('[name="Store_id_edit"]').val($('[name="Store_id"]').val());
        $('.edit_storeconpartlive').css('display', 'none');
        $('.add_storeconpartlive').css('display', '');

    });

    $('.add_storeconpartlive').live('click', function () {
        var token = $.cookie('csrftoken');
        var Number = $('[name="Number"]').val();
        var PartLive_id = $('[name="PartLive_id"]').val();
        var Store_id = $('[name="Store_id_edit"]').val();

        var val = {
            'action': 'CG-F-03-01',
            'Store_id': Store_id,
            'content': {
                'Number': Number,
                'PartLive_id': PartLive_id


            }

        };
        $.ajax({
            url: '/store/CG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),

            success: function (arg) {
                if (arg.status) {
                    var Store_id = $('[name="Store_id"]').val();
                    var store_type = $('.store_type').val();
                    var content = {
                        'Store_id': Store_id,
                        'store_type': store_type
                    };

                    show(content);
                    $('.close_modal').click()
                } else if (arg.message) {

                    $('.message').text(arg.message);
                    $('.close_modal').click()
                } else if (arg.errors.Number) {
                    $('[name="Number"]').val('').attr('placeholder', arg.errors.Number[0].message);
                }
            }
        });


    });

    $('.show_edit_storeconpartlive').live('click', function () {
        $('.add_storeconpartlive').css('display', 'none');
        $('.edit_storeconpartlive').css('display', '');
        uuid = $(this).parent().prevAll('td:last').children('input').val();

        var PartLive_id = $(this).parent().prevAll('td:eq(9)').children('input').val();
        var Number = $(this).parent().prevAll('td:eq(0)').text();
        var store_id_edit = $(this).parent().prevAll('td:eq(4)').children('input').val();
        $('[name="Store_id_edit"]').val(store_id_edit);


        $('[name="PartLive_id"]').val(PartLive_id);
        $('[name="Number"]').val(Number).attr('placeholder', '');
    });

    $('.edit_storeconpartlive').live('click', function () {
        var token = $.cookie('csrftoken');
        var PartLive_id = $('[name="PartLive_id"]').val();
        var Store_id = $('[name="Store_id_edit"]').val();

        var Number = $('[name="Number"]').val();
        var val = {

            'action': 'CG-F-03-03',
            'Store_id': Store_id,
            'content': {
                'uuid': uuid,
                'PartLive_id': PartLive_id,
                'Number': Number

            }


        };

        $.ajax({
            url: '/store/CG_F_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {
                    var Store_id = $('[name="Store_id"]').val();
                    var store_type = $('.store_type').val();
                    var content = {
                        'Store_id': Store_id,
                        'store_type': store_type
                    };
                    show(content);
                    $('.close_modal').click()
                } else if (arg.errors.Number) {
                    $('[name="Number"]').attr('placeholder', arg.errors.Number[0].message);

                }
            }
        });

    });

    $('.search_store').live('click', function () {
        $('.table_data').children().remove();
        $('.close_searchmodal').click();

        var PartLive__QR_Code = $('[name="PartLive__QR_Code"]').val();
        var PartLive__Part__ItemNO = $('[name="PartLive__Part__ItemNO"]').val();
        var PartLive__Part__Name = $('[name="PartLive__Part__Name"]').val();
        var Store_id = $('[name="Store_id"]').val();
        var store_type = $('.store_type').val();

        var content = {
            'Store_id': Store_id,
            'PartLive__QR_Code': PartLive__QR_Code,
            'PartLive__Part__ItemNO': PartLive__Part__ItemNO,
            'PartLive__Part__Name': PartLive__Part__Name,
            'store_type': store_type
        };
        show(content);


    });

    $('.all_search_btn').live('click', function () {
        var store_type = $('.store_type').val();

        var content = {

            'store_type': store_type
        };
        show(content)


    });
}

function store_order_R(Status__NO, action) {

    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_module').addClass('in');
    $('.my_module_nav').addClass('in').css('display', 'block');
    $('.store_module').addClass('in');
    $('.store_object_nav').addClass('in').css('display', 'block');
    $('.store_module_job').addClass('in');
    $('.store_module_job_nav').addClass('in').css('display', 'block');

    function show(Store_id) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {
            'action': 'CG-T-01-04',
            'content': {
                'Status__NO': Status__NO,
                'Store_id': Store_id
            }
        };
        $.ajax({
            url: '/store/CG_T_Json/',
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
                            tr.append("<th>" + item + ' ( 点击查看详细 ) ' + "</th>");
                            return true
                        }
                        if (i == 2) {

                            return true
                        }
                        if (i == 4) {

                            return true
                        }
                        if (i == 6) {

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
                                tr.append("<td class='show_details'>" + item2 + "</td>");
                                return true


                            }
                            if (i == 2) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }
                            if (i == 4) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }
                            if (i == 6) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }


                            tr.append("<td>" + item2 + "</td>");


                        });
                        tr.append('<td><input type="text" style="display: none"><button type="button" class="btn btn-warning recevie_temp_btn">确认收货</button></td>');

                        $('.table_data').append(tr);
                    });

                } else {
                    $('.message').text(arg.message);
                    $('#table').children().remove();
                }
            }
        });
    }

    function show_all_details(StoreForm_id) {
        $('.details_title').children().remove();
        $('.details_data').children().remove();
        var token = $.cookie('csrftoken');

        $('[name="Form_id"]').val(StoreForm_id);


        var val = {
            'action': 'CG-T-02-04',
            'content': {
                'StoreForm_id': StoreForm_id,
                'Status__NO': Status__NO
            }
        };

        $.ajax({
            url: '/store/CG_T_Json/',
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
                        if (i == 2) {

                            return true
                        }
                        if (i == 3) {

                            return true
                        }
                        if (i == 4) {

                            return true
                        }
                        if (i == 5) {

                            return true
                        }


                        tr.append("<th>" + item + "</th>");
                    });

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
                            if (i == 2) {

                                return true
                            }
                            if (i == 3) {

                                return true
                            }
                            if (i == 4) {

                                return true
                            }
                            if (i == 5) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }


                            tr.append("<td>" + item2 + "</td>");

                        });

                        $('.details_data').append(tr);
                    });

                } else {
                    $('.message').text(arg.message);
                }


            }
        })
    }

    $(document).ready(function () {
        var Store_id = $('[name="Store_id"]').val();
        show(Store_id)
    });

    $('.change_store').live('click', function () {

        Store_id = $('[name="Store_id"]').val();

        show(Store_id)

    });


    $('.show_details').live('click', function () {
        var StoreForm_id = $(this).prev().children('input').val();
        show_all_details(StoreForm_id);
        $('.btn_details').click();
    });


    $('.recevie_temp_btn').live('click', function () {
        var token = $.cookie('csrftoken');
        var StoreForm_id = $(this).parent().prevAll('td:last').children('input').val();


        var val = {
            'action': action,
            'content': {
                'StoreForm_id': StoreForm_id
            }
        };
        $.ajax({
            url: '/store/CG_R_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),

            success: function (arg) {

                alert(arg.message);
                $('.message').text('收货状态' + arg.message);
            }
        });


    });


}

function store_order(Status__NO) {
    $('.main-nav-closed').removeClass('main-nav-closed').addClass('main-nav-opened');
    $('.my_module').addClass('in');
    $('.my_module_nav').addClass('in').css('display', 'block');
    $('.store_module').addClass('in');
    $('.store_object_nav').addClass('in').css('display', 'block');
    $('.store_module_forms').addClass('in');
    $('.store_module_forms_nav').addClass('in').css('display', 'block');

    function show(Store_id) {
        $('.table_title').children().remove();
        $('.table_data').children().remove();
        var tr = $("<tr/>");
        var token = $.cookie('csrftoken');
        var val = {
            'action': 'CG-T-01-04',
            'content': {
                'Status__NO': Status__NO,
                'Store_id': Store_id
            }
        };
        $.ajax({
            url: '/store/CG_T_Json/',
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
                            tr.append("<th>" + item + ' ( 点击查看详细 ) ' + "</th>");
                            return true
                        }
                        if (i == 2) {

                            return true
                        }
                        if (i == 4) {

                            return true
                        }
                        if (i == 6) {

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
                                tr.append("<td class='show_details'>" + item2 + "</td>");
                                return true


                            }
                            if (i == 2) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }
                            if (i == 4) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }
                            if (i == 6) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }


                            tr.append("<td>" + item2 + "</td>");


                        });
                        tr.append('<td><input type="text" style="display: none"><button type="button" class="btn btn-warning del_storeform">删除</button>|<a href="#myModal" role="button" class="btn show_edit_storeform" data-toggle="modal">编辑</a></td>');

                        $('.table_data').append(tr);
                    });

                } else {
                    $('.message').text(arg.message);
                    $('#table').children().remove();
                }
            }
        });
    }

    function show_all_details(StoreForm_id) {
        $('.details_title').children().remove();
        $('.details_data').children().remove();
        var token = $.cookie('csrftoken');

        $('[name="Form_id"]').val(StoreForm_id);


        var val = {
            'action': 'CG-T-02-04',
            'content': {
                'StoreForm_id': StoreForm_id,
                'Status__NO': Status__NO
            }
        };

        $.ajax({
            url: '/store/CG_T_Json/',
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
                        if (i == 2) {

                            return true
                        }
                        if (i == 3) {

                            return true
                        }
                        if (i == 4) {

                            return true
                        }
                        if (i == 5) {

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
                            if (i == 2) {

                                return true
                            }
                            if (i == 3) {

                                return true
                            }
                            if (i == 4) {

                                return true
                            }
                            if (i == 5) {

                                tr.append('<td style="display: none"><input type="text"  value=' + item2 + '></td>');
                                return true

                            }


                            tr.append("<td>" + item2 + "</td>");

                        });
                        tr.append('<td><input type="text" style="display: none" value=><button type="button" class="btn btn-warning del_detail">删除</button>|<a href="#myModal_edit" role="button" class="btn show_edit_detail" data-toggle="modal">编辑</a></td>');

                        $('.details_data').append(tr);
                    });

                } else {
                    $('.message').text(arg.message);
                }


            }
        })
    }

    $(document).ready(function () {
        var Store_id = $('[name="Store_id"]').val();
        show(Store_id)
    });

    $('.change_store').live('click', function () {

        Store_id = $('[name="Store_id"]').val();

        show(Store_id)

    });

    $('.del_storeform').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var val = {
            'action': 'CG-T-01-02',
            'content': {
                'uuid': uuid,
                'Status__NO': Status__NO
            }
        };

        $.ajax({
            url: '/store/CG_T_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    var Store_id = $('[name="Store_id"]').val();

                    show(Store_id)
                } else {
                    $('.message').text(arg.message);
                }
            }
        })
    });

    $('.add_form_btn').live('click', function () {
        $('[name="Name"]').val('').attr('placeholder', '');
        $('.edit_storeform').css('display', 'none');
        $('.add_storeform').css('display', '');
        var Store_id = $('[name="Store_id"]').val();
        $('[name="OriginStore_id"]').val(Store_id)


    });

    $('.add_storeform').live('click', function () {
        var token = $.cookie('csrftoken');
        var Name = $('[name="Name"]').val();
        var OriginStore_id = $('[name="OriginStore_id"]').val();
        var TargetStore_id = $('[name="TargetStore_id"]').val();
        if (TargetStore_id == '') {
            var TargetStore_id = null
        }
        var val = {


            'action': 'CG-T-01-01',

            'content': {
                'Name': Name,
                'Status__NO': Status__NO,


                'OriginStore_id': OriginStore_id,
                'TargetStore_id': TargetStore_id

            }

        };
        $.ajax({
            url: '/store/CG_T_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),

            success: function (arg) {

                if (arg.status) {
                    var Store_id = $('[name="Store_id"]').val();
                    if (Store_id == '') {
                        var Store_id = null
                    }
                    show(Store_id);
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

    $('.show_edit_storeform').live('click', function () {
        $('.add_storeform').css('display', 'none');
        $('.edit_storeform').css('display', '');
        uuid = $(this).parent().prevAll('td:last').children('input').val();


        var Name = $(this).parent().prevAll('td:eq(8)').text();
        var OriginStore_id = $(this).parent().prevAll('td:eq(5)').children('input').val();
        var TargetStore_id = $(this).parent().prevAll('td:eq(3)').children('input').val();
        if (TargetStore_id == '') {
            var TargetStore_id = null
        }

        $('[name="Name"]').val(Name).attr('placeholder', '');


        $('[name="OriginStore_id"]').val(OriginStore_id);
        $('[name="TargetStore_id"]').val(TargetStore_id);


    });

    $('.edit_storeform').live('click', function () {
        var token = $.cookie('csrftoken');
        var Name = $('[name="Name"]').val();
        var OriginStore_id = $('[name="OriginStore_id"]').val();
        var TargetStore_id = $('[name="TargetStore_id"]').val();
        if (TargetStore_id == '') {
            var TargetStore_id = null
        }
        var val = {
            'action': 'CG-T-01-03',
            'content': {
                'uuid': uuid,
                'Name': Name,
                'Status__NO': Status__NO,
                'OriginStore_id': OriginStore_id,
                'TargetStore_id': TargetStore_id

            }


        };
        $.ajax({
            url: '/store/CG_T_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {
                    var Store_id = $('[name="Store_id"]').val();
                    if (Store_id == '') {
                        var Store_id = null
                    }
                    show(Store_id);
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
        var StoreForm_id = $(this).prev().children('input').val();
        show_all_details(StoreForm_id);
        $('.btn_details').click();

    });

    $('.del_detail').live('click', function () {
        var token = $.cookie('csrftoken');
        var uuid = $(this).parent().prevAll('td:last').children('input').val();
        var StoreForm_id = $('[name="Form_id"]').val();
        var val = {
            'action': 'CG-T-02-02',
            'content': {
                'uuid': uuid,
                'Status__NO': Status__NO
            }
        };


        $.ajax({
            url: '/store/CG_T_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {

                if (arg.status) {

                    show_all_details(StoreForm_id);
                } else {
                    $('.message').text(arg.message);
                }
            }
        })
    });

    $('.add_detail_btn').live('click', function () {
        $('.close_Modal_details').click();
        $('[name="Number"]').val('').attr('placeholder', '').attr('placeholder', '');
        $('.edit_detail').css('display', 'none');
        $('.add_detail').css('display', '');
    });

    $('.add_detail').live('click', function () {
        var token = $.cookie('csrftoken');
        var Number = $('[name="Number"]').val();
        var PartLive_id = $('[name="PartLive_id"]').val();
        var StoreForm_id = $('[name="Form_id"]').val();

        var val = {
            'action': 'CG-T-02-01',
            'content': {
                'Number': Number,
                'StoreForm_id': StoreForm_id,
                'PartLive_id': PartLive_id,
                'Status__NO': Status__NO

            }
        };
        $.ajax({
            url: '/store/CG_T_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),

            success: function (arg) {


                if (arg.status) {

                    $('.btn_details').click();


                    $('.close_Modal_edit').click();


                    show_all_details(StoreForm_id);

                } else if (arg.errors.Number) {
                    $('[name="Number"]').val('').attr('placeholder', arg.errors.Number[0].message);
                } else if (arg.message) {
                    $('.message').text(arg.message);
                }
            }
        })


    });

    $('.show_edit_detail').live('click', function () {
        $('.close_Modal_details').click();
        $('.add_detail').css('display', 'none');
        $('.edit_detail').css('display', '');
        uuid = $(this).parent().prevAll('td:last').children('input').val();


        var Number = $(this).parent().prevAll('td:eq(0)').text();
        var PartLive_id = $(this).parent().prevAll('td:eq(3)').children('input').val();

        $('[name="Number"]').val(Number);
        $('[name="PartLive_id"]').val(PartLive_id)


    });

    $('.edit_detail').live('click', function () {
        var token = $.cookie('csrftoken');
        var Number = $('[name="Number"]').val();
        var StoreForm_id = $('[name="Form_id"]').val();
        var PartLive_id = $('[name="PartLive_id"]').val();
        var val = {
            'action': 'CG-T-02-03',
            'content': {
                'uuid': uuid,
                'Number': Number,
                'StoreForm_id': StoreForm_id,
                'PartLive_id': PartLive_id,
                'Status__NO': Status__NO

            }

        };
        $.ajax({
            url: '/store/CG_T_Json/',
            type: 'post',
            tradition: true,
            headers: {'X-CSRFToken': token},
            data: JSON.stringify(val),
            success: function (arg) {
                if (arg.status) {

                    $('.btn_details').click();
                    $('.close_Modal_edit').click();
                    show_all_details(StoreForm_id);

                } else if (arg.errors.Number) {
                    $('[name="Number"]').val('').attr('placeholder', arg.errors.Number[0].message);
                } else if (arg.message) {
                    $('.message').text(arg.message);
                }
            }
        })

    });


}


