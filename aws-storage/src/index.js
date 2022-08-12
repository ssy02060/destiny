const express = require('express');
app = express();
const PORT = process.env.PORT;
app.get('/', function (req, res) {
    res.send("hello from aws-storage service");
});
app.listen(PORT, function () {
    console.log('server on! ' + PORT);
});