
function addBind() {
    //表格高亮选中插件
    $("table tbody tr").hover(
                function () {
                    $(this).removeClass();
                    $(this).addClass('alert alert-warning');
                    //$(this).removeClass('odd');
                },
                function () {
                    $(this).removeClass('alert alert-warning');
                    //$(this).addClass('odd');
                }
            );
    $("table thead tr th").first().addClass('sorting_desc');
}

function displayMsg(_msg) {
    $("[name = msg]").html(_msg);
    $("[name = msg_div]").removeClass();
    $("[name = msg]").removeClass();
    $("[name = msg_div]").addClass('alert');
    $("[name = msg_div]").addClass('alert-success');
    $("[name = msg]").addClass("icon-ok-sign");
    $("[name = msg_div]").delay(3000).hide(0);

}

function displayErrorMsg(_msg) {
    $("[name = msg]").html(_msg);
    $("[name = msg_div]").removeClass();
    $("[name = msg]").removeClass();
    $("[name = msg_div]").addClass('alert');
    $("[name = msg_div]").addClass('alert-error');
    $("[name = msg]").addClass("icon-remove-sign");
    $("[name = msg_div]").delay(3000).hide(0);
}

function displayWarmMsg(_msg) {
    $("[name = msg]").html(_msg);
    $("[name = msg_div]").removeClass();
    $("[name = msg]").removeClass();
    $("[name = msg_div]").addClass('alert');
    $("[name = msg_div]").addClass('alert-warning');
    $("[name = msg]").addClass("icon-exclamation-sign");
    $("[name = msg_div]").delay(3000).hide(0);
}