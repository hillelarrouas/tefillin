function init() {
    fetch('/testCookie')
        .then(res => res.json())
        .then(data => {
            if (data.permission == 'admin') {
                $(".menu").show();
                $(".menu").html(
                    `<div class="menus">דף הבית</div>
                <div class="menus" onclick="getuser()">משתמשים</div>`
                );

            } else if (data.permission == 'public') {
                $(".menu").show();
                $(".menu").html(
                    `<div class="menus">דף הבית</div>`
                );
            }
            else {
                errorCookie()
            }
        })
}

function errorCookie() {
    $(".menu").hide();
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
                    $(".welcomLogin").hide();
                    init()
                }
                else {
                    $(".meseggecardlogin").html('משתמש לא קיים')
                }
            }).catch(err => {
                setTimeout(function () {
                    $("#gifSearch").hide()
                    $(".meseggecardlogin").html('<div>שגיאת שרת</br><span onclick="location.reload()" style="text-decoration: underline;font-weight: 800;cursor: pointer;">לחץ כאן</span> כדי לנסות שוב</div>')
                }, 1000);
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



function getuser() {
    fetch('/getUsers')
        .then(res => res.json())
        .then(data => {
            if (data) {
                updatingcardusers(data)
            }
        })
}


function updatingcardusers(data) {
    showcard(".cardusers")

    let r = `<div class="h1">משתמשים</div>`
    r += `<img src="img/addUser.png"/ style="position: absolute;top: 8px;left: 11px;width: 45px; cursor: pointer;" onclick="showcard('.adduser')">`
    data.forEach(element => {
        r += `<div class="user">
                <img src="img/edit-button.png" class="imgadituser" onclick="editingUser('${element.id}')">
                    <div class="name" style="width: 33.333%;">${element.name}</div>
                    <div class="pass" style="width: 33.333%;">${element.pass}</div>
                    <div class="name" style="width: 33.333%;">${element.permission == "admin" ? "מנהל" : "רגיל"}</div>
        </div>`
    })
    $(".cardusers").html(r)
}



function editingUser(iduser) {
    fetch('/editingUser', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            iduser
        })
    }).then(res => res.json())
        .then(data => {
            $(".cardusers").hide()
            $(".UserEditing").show()
            $(".UserEditing").html(
                `<div class="h1">עריכת משתמש</div>
            <img style="width: 45px;position: absolute;top: 10px;right: 10px;cursor: pointer;" src="img/return.png" onclick="getuser()">
            <div style="max-width: 400px;margin: auto;text-align: right;">
                <div style="font-size: revert;padding: 10px 0 0;">שם משתמש:</div>
                <input type="text" id="UserEditingname" class="input" autocomplete="off" value="${data.name}">
                <div style="font-size: revert;padding: 10px 0 0;">סיסמה:</div>
                <input type="text" id="UserEditingpass" class="input" autocomplete="off" value="${data.pass}">
                <div style="font-size: revert;padding: 10px 0 0;">סוג ניהול:</div>
                <select id="typePermission" class="input" style="direction: rtl;background: none;">
                <option value="${data.permission}" style="display: none;">${data.permission == "admin" ? "מנהל" : "רגיל"}</option>
                <option value="public">רגיל</option>
                <option value="admin">מנהל</option>
              </select>
            </div>
            <button id="UserEditingsubmit" onclick="UserEditingsubmit('${data.id}')">אישור</button>
            <div id="UserEdit" style="display: none;"><img style="width: 45px;" src="img/gifSearch.gif"></div>
            <div class="meseggeUserEdit"></div>`
            )
        })
}


function UserEditingsubmit(iduser) {
    let UserEditingname = $("#UserEditingname").val()
    let UserEditingpass = $("#UserEditingpass").val()
    let typePermission = $("#typePermission").val()

    if (UserEditingname.length == 0) {
        $(".meseggeUserEdit").html('הזן שם משתמש')
        $("#UserEditingname").focus();
    } else if (UserEditingpass.length == 0) {
        $(".meseggeUserEdit").html('הזן סיסמה')
        $("#UserEditingpass").focus();
    } else {
        $("#UserEdit").show()
        $("#UserEditingsubmit").hide()
        $(".meseggeUserEdit").html('')

        fetch('/UserEdit', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                iduser, UserEditingname, UserEditingpass, typePermission
            })
        }).then(res => res.json())
            .then(data => {
                $("#UserEdit").hide()
                $("#UserEditingsubmit").show()
                updatingcardusers(data)
            })
            .catch(err => {
                setTimeout(function () {
                    $("#UserEdit").hide()
                    $(".meseggeUserEdit").html('<div>שגיאת שרת</br><span onclick="location.reload()" style="text-decoration: underline;font-weight: 800; cursor: pointer;">לחץ כאן</span> כדי לנסות שוב</div>')
                }, 1000);
            })
    }
}


function showcard(e) {
    $(".card").hide()
    $(e).show()
}



function adduser() {
    let addusername = $("#addusername").val()
    let adduserpass = $("#adduserpass").val()
    let addusertypePermission = $("#addusertypePermission").val()
    console.log(addusertypePermission)

    if (addusername.length == 0) {
        $(".meseggeadduser").html('הזן שם משתמש')
        $("#addusername").focus();
    } else if (adduserpass.length == 0) {
        $(".meseggeadduser").html('הזן סיסמה')
        $("#adduserpass").focus();
    } else if (addusertypePermission == "nonevalue") {
        $(".meseggeadduser").html('הזן סוג ניהול')
    } else {
        $(".meseggeadduser").html('')
        $("#addusergif").show()
        $("#addusersubmit").hide()

        fetch('/addUser', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                addusername, adduserpass, addusertypePermission
            })
        }).then(res => res.json())
            .then(data => {
                $("#addusername").val('')
                $("#adduserpass").val('')
                $("#addusergif").hide()
                $("#addusersubmit").show()
                updatingcardusers(data)
                console.log(data)
            })
            .catch(err => {
                setTimeout(function () {
                    $("#addusergif").hide()
                    $(".meseggeadduser").html('<div>שגיאת שרת</br><span onclick="location.reload()" style="text-decoration: underline;font-weight: 800; cursor: pointer;">לחץ כאן</span> כדי לנסות שוב</div>')
                }, 1000);
            })
    }
}
