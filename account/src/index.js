const express = require('express');
app = express();
const PORT = process.env.PORT;

//
app.get('/', function (req, res) {
    res.send("hello from account service!!");
});

app.get('/hello', function (req, res) {
    res.send("hello");
});

app.get('/login', function (req, res) {
    res.send("login successfully");
});
//client로 요청을 기다린다
app.listen(PORT, function () {
    console.log('server on! ' + PORT);
});