const express = require('express');
const path = require("path");
const http = require("http");

const app = express();

const REACT_PATH = '../frontend-react/'

app.use(express.static(path.join(__dirname, REACT_PATH + 'build')))

function setupHandlers(app) {
    app.set()
}

app.get('/', function (req, res) { // '/' 위치에 'get'요청을 받는 경우,
    res.sendFile(path.join(__dirname, REACT_PATH + 'build/index.html'))
});

app.get('*', function (req, res) { // '/' 위치에 'get'요청을 받는 경우,
    res.sendFile(path.join(__dirname, REACT_PATH + 'build/index.html'))
});

const port = process.env.PORT;
app.listen(port, function () { // port변수를 이용하여 3000번 포트에 node.js 서버를 연결합니다.
    console.log('server on! http://localhost:' + port); //서버가 실행되면 콘솔창에 표시될 메세지입니다.
});