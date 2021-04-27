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
    { name: "hillel", pass: "123" },
    { name: "shirel", pass: "1234" }
]


app.get('/testCookie', async (req, res) => {
    try {
        let user = req.cookies.user
        if (user) {
            let jwtuser = jwt.decode(user, secret);
            const filterusers = detalogin.filter(ele => ele.name === jwtuser.loginName && ele.pass === jwtuser.loginPass)[0];
            if (filterusers) {
                res.send(true)
            } else {
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



app.post('/login', async (req, res) => {
    try {
        const { loginName, loginPass } = req.body
        const filterusers = detalogin.filter(ele => ele.name === loginName && ele.pass === loginPass)[0];
        if (filterusers) {
            const token = jwt.encode({ loginName, loginPass }, secret)
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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('listen on port 8080'))

