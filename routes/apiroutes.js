
// var tableData = require("../data/tableData");
var notes = require("../db/db.json");
// var index = require("../public/assets/js/index")
// var waitListData = require("../data/waitinglistData");

var fs = require("fs");
const { response } = require("express");


// ===============================================================================
// ROUTING
// ===============================================================================
//function to export routes into server file
module.exports = function(app) {
  // API GET Requests
  
  app.get("/api/notes", function(req, res) {
  
    console.log("Notedata")
    res.json(notes);
  });
// get current notes array from file and add newNote to an array
  app.post("/api/notes", function(req, res){
      var newNote = req.body
      var allNotes = [...notes,newNote]
      //this is in memory. Creates a copy of the existing file so it must be set to a vaiable
      //map method attatches id using indexed position in the notes array, reassigned it back to the notes variable
      var notesWithIds = allNotes.map((note, index) => {
        return {...note, id: index + 1}
     })
     notes = notesWithIds
    //This writes it to disk and 'updates' existing file so it doesn't need to be assigned to a variable
    fs.writeFileSync("./db/db.json", JSON.stringify(notesWithIds,0,2));
    

      
      console.log(allNotes)
      console.log(notesWithIds)
      console.log(newNote)

   
    return res.json(notesWithIds)
    

  });
  
  //req.params.id set to variable id so note can be identified for deletion
  app.delete("/api/notes/:id", function(req, res) {
    //parseInt turns 
    const id = parseInt(req.params.id)
    for(let i=0;i<notes.length;i++){
      if (notes[i].id === id){
        notes.splice(i,1)
      }
    }
   console.log(notes)

    fs.writeFileSync("./db/db.json", JSON.stringify(notes,0,2));
    console.log(id)

    res.json({ ok: true });
  });

  
};
  