// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// var index = require("./public/assets/js/index")

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// // app.use(index)
require("./routes/apiroutes.js")(app)
require("./routes/htmlroutes.js")(app)
// require("../Develop/public/index.html")(app)
// require("../Develop/public/notes.html")(app)

 











//listener
.listen(process.env.PORT || 3000)
