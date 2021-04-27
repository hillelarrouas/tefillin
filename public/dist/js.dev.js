"use strict";

function init() {
  fetch('/testCookie').then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.permission == 'admin') {
      $(".menu").show();
      $(".menu").html("<div class=\"menus\">\u05D3\u05E3 \u05D4\u05D1\u05D9\u05EA</div>\n                <div class=\"menus\" onclick=\"getuser()\">\u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD</div>");
    } else if (data.permission == 'public') {
      $(".menu").show();
      $(".menu").html("<div class=\"menus\">\u05D3\u05E3 \u05D4\u05D1\u05D9\u05EA</div>");
    } else {
      errorCookie();
    }
  });
}

function errorCookie() {
  $(".menu").hide();
  $(".welcomLogin").show();
}

$("#submitlogin").click(function () {
  var loginName = $("#loginName").val();
  var loginPass = $("#loginPass").val();

  if (loginName.length == 0) {
    $(".meseggecardlogin").html('הזן שם משתמש');
    $("#loginName").focus();
  } else if (loginPass.length == 0) {
    $(".meseggecardlogin").html('הזן סיסמה');
    $("#loginPass").focus();
  } else {
    $("#submitlogin").hide();
    $("#gifSearch").show();
    $(".meseggecardlogin").html('');
    fetch('/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        loginName: loginName,
        loginPass: loginPass
      })
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      $("#gifSearch").hide();
      $("#submitlogin").show();

      if (data == true) {
        $(".welcomLogin").hide();
        init();
      } else {
        $(".meseggecardlogin").html('משתמש לא קיים');
      }
    })["catch"](function (err) {
      setTimeout(function () {
        $("#gifSearch").hide();
        $(".meseggecardlogin").html('<div>שגיאת שרת</br><span onclick="location.reload()" style="text-decoration: underline;font-weight: 800;cursor: pointer;">לחץ כאן</span> כדי לנסות שוב</div>');
      }, 1000);
    });
  }
});
$("#loginName,#loginPass").on('input', function (e) {
  $(".meseggecardlogin").html('');
});
$("#loginName,#loginPass").on('keypress', function (e) {
  if (e.keyCode == 13) {
    $("#submitlogin").click();
  }
});

function getuser() {
  fetch('/getUsers').then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data) {
      updatingcardusers(data);
    }
  });
}

function updatingcardusers(data) {
  showcard(".cardusers");
  var r = "<div class=\"h1\">\u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD</div>";
  r += "<img src=\"img/addUser.png\"/ style=\"position: absolute;top: 8px;left: 11px;width: 45px; cursor: pointer;\" onclick=\"showcard('.adduser')\">";
  data.forEach(function (element) {
    r += "<div class=\"user\">\n                <img src=\"img/edit-button.png\" class=\"imgadituser\" onclick=\"editingUser('".concat(element.id, "')\">\n                    <div class=\"name\" style=\"width: 33.333%;\">").concat(element.name, "</div>\n                    <div class=\"pass\" style=\"width: 33.333%;\">").concat(element.pass, "</div>\n                    <div class=\"name\" style=\"width: 33.333%;\">").concat(element.permission == "admin" ? "מנהל" : "רגיל", "</div>\n        </div>");
  });
  $(".cardusers").html(r);
}

function editingUser(iduser) {
  fetch('/editingUser', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      iduser: iduser
    })
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    $(".cardusers").hide();
    $(".UserEditing").show();
    $(".UserEditing").html("<div class=\"h1\">\u05E2\u05E8\u05D9\u05DB\u05EA \u05DE\u05E9\u05EA\u05DE\u05E9</div>\n            <img style=\"width: 45px;position: absolute;top: 10px;right: 10px;cursor: pointer;\" src=\"img/return.png\" onclick=\"getuser()\">\n            <div style=\"max-width: 400px;margin: auto;text-align: right;\">\n                <div style=\"font-size: revert;padding: 10px 0 0;\">\u05E9\u05DD \u05DE\u05E9\u05EA\u05DE\u05E9:</div>\n                <input type=\"text\" id=\"UserEditingname\" class=\"input\" autocomplete=\"off\" value=\"".concat(data.name, "\">\n                <div style=\"font-size: revert;padding: 10px 0 0;\">\u05E1\u05D9\u05E1\u05DE\u05D4:</div>\n                <input type=\"text\" id=\"UserEditingpass\" class=\"input\" autocomplete=\"off\" value=\"").concat(data.pass, "\">\n                <div style=\"font-size: revert;padding: 10px 0 0;\">\u05E1\u05D5\u05D2 \u05E0\u05D9\u05D4\u05D5\u05DC:</div>\n                <select id=\"typePermission\" class=\"input\" style=\"direction: rtl;background: none;\">\n                <option value=\"").concat(data.permission, "\" style=\"display: none;\">").concat(data.permission == "admin" ? "מנהל" : "רגיל", "</option>\n                <option value=\"public\">\u05E8\u05D2\u05D9\u05DC</option>\n                <option value=\"admin\">\u05DE\u05E0\u05D4\u05DC</option>\n              </select>\n            </div>\n            <button id=\"UserEditingsubmit\" onclick=\"UserEditingsubmit('").concat(data.id, "')\">\u05D0\u05D9\u05E9\u05D5\u05E8</button>\n            <div id=\"UserEdit\" style=\"display: none;\"><img style=\"width: 45px;\" src=\"img/gifSearch.gif\"></div>\n            <div class=\"meseggeUserEdit\"></div>"));
  });
}

function UserEditingsubmit(iduser) {
  var UserEditingname = $("#UserEditingname").val();
  var UserEditingpass = $("#UserEditingpass").val();
  var typePermission = $("#typePermission").val();

  if (UserEditingname.length == 0) {
    $(".meseggeUserEdit").html('הזן שם משתמש');
    $("#UserEditingname").focus();
  } else if (UserEditingpass.length == 0) {
    $(".meseggeUserEdit").html('הזן סיסמה');
    $("#UserEditingpass").focus();
  } else {
    $("#UserEdit").show();
    $("#UserEditingsubmit").hide();
    $(".meseggeUserEdit").html('');
    fetch('/UserEdit', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        iduser: iduser,
        UserEditingname: UserEditingname,
        UserEditingpass: UserEditingpass,
        typePermission: typePermission
      })
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      $("#UserEdit").hide();
      $("#UserEditingsubmit").show();
      updatingcardusers(data);
    })["catch"](function (err) {
      setTimeout(function () {
        $("#UserEdit").hide();
        $(".meseggeUserEdit").html('<div>שגיאת שרת</br><span onclick="location.reload()" style="text-decoration: underline;font-weight: 800; cursor: pointer;">לחץ כאן</span> כדי לנסות שוב</div>');
      }, 1000);
    });
  }
}

function showcard(e) {
  $(".card").hide();
  $(e).show();
}

function adduser() {
  var addusername = $("#addusername").val();
  var adduserpass = $("#adduserpass").val();
  var addusertypePermission = $("#addusertypePermission").val();
  console.log(addusertypePermission);

  if (addusername.length == 0) {
    $(".meseggeadduser").html('הזן שם משתמש');
    $("#addusername").focus();
  } else if (adduserpass.length == 0) {
    $(".meseggeadduser").html('הזן סיסמה');
    $("#adduserpass").focus();
  } else if (addusertypePermission == "nonevalue") {
    $(".meseggeadduser").html('הזן סוג ניהול');
  } else {
    $(".meseggeadduser").html('');
    $("#addusergif").show();
    $("#addusersubmit").hide();
    fetch('/addUser', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        addusername: addusername,
        adduserpass: adduserpass,
        addusertypePermission: addusertypePermission
      })
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      $("#addusername").val('');
      $("#adduserpass").val('');
      $("#addusergif").hide();
      $("#addusersubmit").show();
      updatingcardusers(data);
      console.log(data);
    })["catch"](function (err) {
      setTimeout(function () {
        $("#addusergif").hide();
        $(".meseggeadduser").html('<div>שגיאת שרת</br><span onclick="location.reload()" style="text-decoration: underline;font-weight: 800; cursor: pointer;">לחץ כאן</span> כדי לנסות שוב</div>');
      }, 1000);
    });
  }
}