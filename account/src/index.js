const Cognito = require('./Cognito');
var bodyParser = require('body-parser')
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT;
app = express();

app.use(cors())
app.use(bodyParser.json())

app.listen(PORT, function () {
    console.log('server on! ' + PORT);
});

// 회원가입
app.post('/account/signup', async function (req, res) {
    body = req.body;
    console.log(req.body);
    // res.send(req.body);
    const response = await Cognito.signUp(body.email, body.password);
    console.log(response);
    res.send(response);
});

// 인증
app.post('/account/verify', async function (req, res) {
    body = req.body;
    console.log(req.body);
    const response = await Cognito.verify(body.email, body.code);
    console.log(response);
    res.send(response);
});

// login 
app.post('/account/signin', async function (req, res) {
    body = req.body;
    const response = await Cognito.signIn(body.email, body.password);
    console.log(response);
    res.send(response);
});