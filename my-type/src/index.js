const express = require('express');
const path = require("path");
const http = require("http");
const AWS = require("aws-sdk");
const app = express();

const port = process.env.PORT;
const DBHOST = process.env.DBHOST;

AWS.config.update({
    region: "us-west-2",
    endpoint: DBHOST
})

const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient()
const email = process.env.EMAIL || 'ttt@doe.com'


const params = {
    TableName: "test",
    KeySchema: [
        {
            AttributeName: "movieInfo.movieNm", KeyType: "HASH",
            AttributeName: "genres.genreNm", KeyType: "HASH",
            AttributeName: "actors.PeopleNm", KeyType: "HASH",
            AttributeName: "edirctors.peopleNm", KeyType: "HASH"
        }],
    AttributeDefinitions: [
        {
            AttributeName: "movieInfo.movieNm", AttributeType: "S",
            AttributeName: "genres.genreNm", AttributeType: "S",
            AttributeName: "actors.PeopleNm", AttributeType: "S",
            AttributeName: "edirctors.peopleNm", AttributeType: "S"
        }],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
}


var inputs = {
    TableName: "test",
    Item: {
        email: { S: "ttt@doe.com" },
        fullname: { S: "Jon Doe" },
        role: { S: "Super Heroe" }
    }
};


const querys = {
    TableName: "test",
    KeyConditionExpression: "#email = :email",
    ExpressionAttributeNames: {
        "#email": "email"
    },
    ExpressionAttributeValues: {
        ":email": email
    }
}



app.get('/my-type', function (req, res) { // '/' 위치에 'get'요청을 받는 경우,
    // res.sendFile(path.join(__dirname, REACT_PATH + 'build/index.html'))
    res.send("main page");
});


// app.get('/create-table', function (req, res) { // '/' 위치에 'get'요청을 받는 경우,
//     // res.sendFile(path.join(__dirname, REACT_PATH + 'build/index.html'))
//     dynamodb.createTable(params, console.log);
//     res.send("main page");
// });
// app.get('/create-item', function (req, res) { // '/' 위치에 'get'요청을 받는 경우,
//     // res.sendFile(path.join(__dirname, REACT_PATH + 'build/index.html'))
//     dynamodb.putItem(inputs, console.log);
//     res.send("main page");
// });
// app.get('/query', function (req, res) { // '/' 위치에 'get'요청을 받는 경우,
//     // res.sendFile(path.join(__dirname, REACT_PATH + 'build/index.html'))
//     docClient.query(querys, console.log);
//     res.send("main page");
// });
app.listen(port, function () { // port변수를 이용하여 3000번 포트에 node.js 서버를 연결합니다.
    console.log('server on! ' + port); //서버가 실행되면 콘솔창에 표시될 메세지입니다.
});

// i'm stuck at the gate 

// module.exports = {
//     aws_region: 'us-east-2',
//     aws_dynamodb_table: 'demoTable'
//     endpoint: 'http://loaclhost:3306'
// };