function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');
// // var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

function ients_ajax(_url, _data, _success_func) {
    $.ajax({
        url: _url,
        data: {
            json:_data,
        },
        type: "post",
        success: function (data) {
            _success_func(data);
        }
    });
}

function user_login() {
    //用户登录
    var username = $("#username").val();
    var password = $("#password").val();
    var jsonStr = {"username": username, "password": password};
    var user_info_json = JSON.stringify(jsonStr);
    displayWarmMsg("登录中，请稍后...")
    $.ajax({
        url: 'general/login/',
        data: {
            User: user_info_json,
        },
        type: "post",
        success: function (data) {
            switch(data) {
                case '0':
                    displayErrorMsg("失败，密码输入有误！");
                    break;
                default:
                    $("#username").attr("readonly","readonly");
                    $("#password").attr("readonly","readonly");
                    displayMsg("成功，页面刷新中...");
                    location.reload();
            }
        }
    });
}

function user_logout() {
    displayLoading('main-content');
    $.ajax({
        url: 'general/logout/',
        data: {
        },
        type: "post",
        success: function (data) {
            location.reload();
        }
    });
}

function hide_user_login() {
    $("#modal-login").hide();
}

function displayLoading(_divName) {
    //进度条
    $("#" + _divName).html("<div style='text-align: center;margin-top: 200px'><img style='width: 50px' src='assets/images/ajax-loaders/11.gif'></div>");
}

function GoUrl(_url,_param) {
    JuBuShuaXin('main-content', _url);
    $('li').removeClass('active');
    $('a').removeClass('in');
    $(_param.parentNode).addClass('active');
    $(_param.parentNode).parent('ul').parent('li').addClass('active');
}

function JuBuShuaXin(_divName, _url) {
    displayLoading(_divName);
    $.ajax({
        url: _url,
        data: {},
        type: "get",
        success: function (data) {
            $("#" + _divName).html(data);
            addBind();
            setDataTable($(".data-table"));
            setDataTable($(".data-table-column-filter")).columnFilter();
        }
    });
}
