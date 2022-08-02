const express = require('express');
const path = require("path");
const http = require("http");
const AWS = require("aws-sdk");
const app = express();

const port = process.env.PORT;
const REACT_PATH = process.env.REACT_PATH;
const DBHOST = process.env.DBHOST;

AWS.config.update({
    region: "us-west-2",
    endpoint: DBHOST
})

const dynamodb = new AWS.DynamoDB();

const params = {
    TableName: "test",
    KeySchema: [
        {
            AttributeName: "email", KeyType: "HASH"
        }],
    AttributeDefinitions: [
        {
            AttributeName: "email", AttributeType: "S"
        }],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
}


app.get('/', function (req, res) { // '/' 위치에 'get'요청을 받는 경우,
    // res.sendFile(path.join(__dirname, REACT_PATH + 'build/index.html'))
    res.send("main page");
});

app.get('/create-table', function (req, res) { // '/' 위치에 'get'요청을 받는 경우,
    // res.sendFile(path.join(__dirname, REACT_PATH + 'build/index.html'))
    dynamodb.createTable(params, console.log);
    res.send("main page");
});



app.listen(port, function () { // port변수를 이용하여 3000번 포트에 node.js 서버를 연결합니다.
    console.log('server on! http://localhost:' + port); //서버가 실행되면 콘솔창에 표시될 메세지입니다.
});