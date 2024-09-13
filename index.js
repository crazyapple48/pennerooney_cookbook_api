var express = require("express");
var app = express();
app.get("/", function (req, res) {
    res.send("Hello World");
});
app.get("/api/courses", function (req, res) {
    res.send([1, 2, 3]);
});
app.listen(3000, function () { return console.log("Listening on port 3000"); });
