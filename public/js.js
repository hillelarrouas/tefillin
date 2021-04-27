function init() {
    fetch('/testCookie')
        .then(res => res.json())
        .then(data => {
            if (data == false) {
                errorCookie()
            }
        })
}

function errorCookie() {
    $(".welcomLogin").show();
}


$("#submitlogin").click(function () {
    let loginName = $("#loginName").val()
    let loginPass = $("#loginPass").val()

    if (loginName.length == 0) {
        $(".meseggecardlogin").html('הזן שם משתמש')
        $("#loginName").focus();
    } else if (loginPass.length == 0) {
        $(".meseggecardlogin").html('הזן סיסמה')
        $("#loginPass").focus();
    } else {
        $("#submitlogin").hide()
        $("#gifSearch").show()
        $(".meseggecardlogin").html('')
        fetch('/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                loginName, loginPass
            })
        }).then(res => res.json())
            .then(data => {
                $("#gifSearch").hide()
                $("#submitlogin").show()
                if (data == true) {
                    $(".meseggecardlogin").html('משתמש נמצא')
                }
                else {
                    $(".meseggecardlogin").html('משתמש לא קיים')
                }
            })
    }
});


$("#loginName,#loginPass").on('input', function (e) {
    $(".meseggecardlogin").html('')
})

$("#loginName,#loginPass").on('keypress', function (e) {
    if (e.keyCode == 13) {
        $("#submitlogin").click()
    }
})