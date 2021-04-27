"use strict";

var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');

var jwt = require('jwt-simple');

var mongoose = require('mongoose');

var secret = "jiuhvrg4178htg8thgyth24689680^%$^&#&rwegs7^%$&&";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express["static"]('public'));
var detalogin = [{
  name: "hillel",
  pass: "123",
  permission: "admin",
  id: '5245'
}, {
  name: "hillel",
  pass: "1234",
  permission: "admin",
  id: '9829'
}];
app.get('/testCookie', function (req, res) {
  try {
    var user = req.cookies.user;

    if (user) {
      var jwtuser = jwt.decode(user, secret);
      var filterusers = detalogin.filter(function (ele) {
        return ele.name === jwtuser.filterusers.name && ele.pass === jwtuser.filterusers.pass;
      })[0];

      if (filterusers) {
        res.send(filterusers);
      } else {
        console.log(3);
        res.send(false);
      }
    } else {
      console.log(4);
      res.send(false);
    }
  } catch (e) {
    console.log(e);
  }
});
app.post('/login', function (req, res) {
  try {
    var _req$body = req.body,
        loginName = _req$body.loginName,
        loginPass = _req$body.loginPass;
    var filterusers = detalogin.filter(function (ele) {
      return ele.name === loginName && ele.pass === loginPass;
    })[0];

    if (filterusers) {
      var token = jwt.encode({
        filterusers: filterusers
      }, secret);
      res.cookie('user', token, {
        maxAge: 2592000000,
        httpOnly: true
      });
      res.send(true);
    } else {
      res.send({
        error: 'לא קיים'
      });
    }
  } catch (e) {
    console.log(e);
  }
});
app.get('/getUsers', function _callee(req, res) {
  var user, jwtuser, filterusers;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          try {
            user = req.cookies.user;

            if (user) {
              jwtuser = jwt.decode(user, secret);
              filterusers = detalogin.filter(function (ele) {
                return ele.name === jwtuser.filterusers.name && ele.pass === jwtuser.filterusers.pass;
              })[0];

              if (filterusers) {
                if (filterusers.permission == "admin") {
                  res.send(detalogin);
                } else {
                  res.send(false);
                }
              } else {
                res.send(false);
              }
            } else {
              res.send(false);
            }
          } catch (e) {
            console.log(e);
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.post('/editingUser', function (req, res) {
  try {
    var iduser = req.body.iduser;
    var filterusers = detalogin.filter(function (ele) {
      return ele.id === iduser;
    })[0];
    res.send(filterusers);
  } catch (e) {
    console.log(e);
  }
});
app.post('/UserEdit', function (req, res) {
  try {
    var _req$body2 = req.body,
        iduser = _req$body2.iduser,
        UserEditingname = _req$body2.UserEditingname,
        UserEditingpass = _req$body2.UserEditingpass,
        typePermission = _req$body2.typePermission;
    detalogin.filter(function (ele) {
      if (ele.id === iduser) {
        ele.name = UserEditingname;
        ele.pass = UserEditingpass;
        ele.permission = typePermission;
      }
    });
    res.send(detalogin);
  } catch (e) {
    console.log(e);
  }
});
app.post('/addUser', function (req, res) {
  try {
    var _req$body3 = req.body,
        addusername = _req$body3.addusername,
        adduserpass = _req$body3.adduserpass,
        addusertypePermission = _req$body3.addusertypePermission;
    var user = req.cookies.user;

    if (user) {
      var jwtuser = jwt.decode(user, secret);
      var filterusers = detalogin.filter(function (ele) {
        return ele.name === jwtuser.filterusers.name && ele.pass === jwtuser.filterusers.pass;
      })[0];

      if (filterusers) {
        if (filterusers.permission == "admin") {
          detalogin.push({
            name: addusername,
            pass: adduserpass,
            permission: addusertypePermission,
            id: "".concat(Math.floor(Math.random() * 5485165187))
          });
          res.send(detalogin);
        } else {
          res.send(false);
        }
      } else {
        res.send(false);
      }
    } else {
      res.send(false);
    }
  } catch (e) {
    console.log(e);
  }
});
var port = process.env.PORT || 3000;
app.listen(port, function () {
  return console.log('listen on port 8080');
});