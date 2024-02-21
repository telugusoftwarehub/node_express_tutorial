const express = require('express');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const scretKey = "shhhhhared-secrt";
const app = express();

app.use(bodyParser.json())

app.use(session({
    secret: 'abc',
    resave: false,
    saveUninitialized: true
}))

app.get('/userinfo', (req, res) => {
    const { authToken, username } = req.session;
    if((authToken && authToken.length > 0) && username) {
        res.send(`Hello ${username} welcome to node express!`)
    } else {
        res.send(`Please login`)
    }
    
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const token = jwt.sign(username, scretKey, {expiresIn: '30s'});

    req.session.authToken = token;
    req.session.username = username;

    const response = {
        status: "Success",
        authToken: token
    }
    res.send(response)
})

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.send({
        status: "success",
        msg: "successfully logged out!"
    })
})

app.listen(9090, () => {
    console.log('Server Started!')
})