
var path = require("path");



//function to export paths so they can be required in the server file
module.exports = function(app) {
  
  app.get("/notes", function(req, res) {
      res.json(req.body)
    res.sendFile(path.join(__dirname, "../routes/notes.html"));
  });
//Must be last path or pages wil never change
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../routes/.html"));
  });
  // If no matching route is found default to home
};
