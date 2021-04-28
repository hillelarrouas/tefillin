const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jwt-simple');
const mongoose = require('mongoose');

const secret = "jiuhvrg4178htg8thgyth24689680^%$^&#&rwegs7^%$&&"


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'))

const detalogin = [
    { name: "hillel", pass: "123", permission: "admin", id: '5245' },
    { name: "hillel", pass: "1234", permission: "admin", id: '9829' },
    { name: "hillel", pass: "1255", permission: "public", id: '9829' }
]


app.get('/testCookie', (req, res) => {
    try {
        let user = req.cookies.user
        if (user) {
            let jwtuser = jwt.decode(user, secret);
            const filterusers = detalogin.filter(ele => ele.name === jwtuser.filterusers.name && ele.pass === jwtuser.filterusers.pass)[0];
            if (filterusers) {
                res.send(filterusers)
            } else {
                console.log(3)
                res.send(false)
            }
        }
        else {
            console.log(4)
            res.send(false)
        }
    }
    catch (e) {
        console.log(e)
    }
})



app.post('/login', (req, res) => {
    try {
        const { loginName, loginPass } = req.body
        const filterusers = detalogin.filter(ele => ele.name === loginName && ele.pass === loginPass)[0];
        if (filterusers) {
            const token = jwt.encode({ filterusers }, secret)
            res.cookie('user', token, { maxAge: 2592000000, httpOnly: true })
            res.send(true)
        }
        else {
            res.send({ error: 'לא קיים' })
        }
    }
    catch (e) {
        console.log(e)
    }
})


app.get('/getUsers', async (req, res) => {
    try {
        let user = req.cookies.user
        if (user) {
            let jwtuser = jwt.decode(user, secret);
            const filterusers = detalogin.filter(ele => ele.name === jwtuser.filterusers.name && ele.pass === jwtuser.filterusers.pass)[0];
            if (filterusers) {
                if (filterusers.permission == "admin") {
                    res.send(detalogin)
                } else {
                    res.send(false)
                }
            }
            else {
                res.send(false)
            }
        }
        else {
            res.send(false)
        }
    }
    catch (e) {
        console.log(e)
    }
})



app.post('/UserEdit', (req, res) => {
    try {
        const { iduser, UserEditingname, UserEditingpass, typePermission } = req.body
       const d =  detalogin.filter(ele => ele.name === UserEditingname && ele.pass === UserEditingpass && ele.id === iduser)[0]; 
           if (d){
               console.log('ff')
           }
       //     console.log('החליף')

            //     // break
            // }
            // else {
            //     console.log('לא החליף')
            // }
        // })
        detalogin.filter(ele => {
            if (ele.id === iduser) {


                ele.name = UserEditingname
                ele.pass = UserEditingpass
                ele.permission = typePermission
            }
        })
        res.send(detalogin)
    }
    catch (e) {
        console.log(e)
    }
})



app.post('/addUser', (req, res) => {
    try {
        const { addusername, adduserpass, addusertypePermission } = req.body
        let user = req.cookies.user
        if (user) {
            let jwtuser = jwt.decode(user, secret);
            const filterusers = detalogin.filter(ele => ele.name === jwtuser.filterusers.name && ele.pass === jwtuser.filterusers.pass)[0];
            if (filterusers) {
                if (filterusers.permission == "admin") {
                    if (detalogin.filter(ele => ele.name === addusername && ele.pass === adduserpass)[0]) {
                        res.send({ user: false })
                    } else {
                        detalogin.push({ name: addusername, pass: adduserpass, permission: addusertypePermission, id: `${Math.floor(Math.random() * 5485165187)}` })
                        res.send(detalogin)
                    }
                } else {
                    res.send(false)
                }
            }
            else {
                res.send(false)
            }
        }
        else {
            res.send(false)
        }
    }
    catch (e) {
        console.log(e)
    }
})



app.get('/resetCookie', (req, res) => {
    try {
        res.cookie('user', 'token', { maxAge: 0, httpOnly: true })
        res.send(true)
    }
    catch (e) {
        console.log(e)
    }
})


const port = process.env.PORT || 3000;
app.listen(port, () => console.log('listen on port 8080'))

