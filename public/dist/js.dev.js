"use strict";

function init() {
  fetch('/testCookie').then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data == false) {
      errorCookie();
    }
  });
}

function errorCookie() {
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
        $(".meseggecardlogin").html('משתמש נמצא');
      } else {
        $(".meseggecardlogin").html('משתמש לא קיים');
      }
    });
  }
});
$("#loginName,#loginPass").on('keypress', function (e) {
  $(".meseggecardlogin").html('');

  if (e.keyCode == 13) {
    $("#submitlogin").click();
  }
});