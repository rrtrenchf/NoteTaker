// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

// var tableData = require("../data/tableData");
var notes = require("../db/db.json");
// var index = require("../public/assets/js/index")
// var waitListData = require("../data/waitinglistData");

var fs = require("fs");
const { response } = require("express");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------


  
  app.get("/api/notes", function(req, res) {
  
    console.log("Notedata")
    res.json(notes);
  });

  
  
  
  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------
// get current notes array from file and add newNote to an array
  app.post("/api/notes", function(req, res){
      var newNote = req.body
      var allNotes = [...notes,newNote]
      //this is in memory.
      var notesWithIds = allNotes.map((note, index) => {
        return {...note, id: index + 1}
     })
     notes = notesWithIds

    //This writes it to disk
    fs.writeFileSync("./db/db.json", JSON.stringify(notesWithIds,0,2));
    

      //notes.push(newNote,notesWithIds)
      console.log(allNotes)
      console.log(notesWithIds)
      console.log(newNote)

   
    return res.json(notesWithIds)
    

  });
 

//     // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
//     // It will do this by sending out the value "true" have a table
//     // req.body is available since we're using the body parsing middleware
//     if (tableData.length < 5) {
//       tableData.push(req.body);
//       fs.writeFileSync("./data/tableData.json", JSON.stringify(tableData, 0, 2));
//       res.json(true);
//     }
//     else {
//       waitListData.push(req.body);
//       res.json(false);
//     }

//     var original = ["Ahmed"]
//     var newOne = ["Ahmed", "Josh"]
//   });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  // app.delete("/api/clear", function(req, res) {
  //   // Empty out the arrays of data
  //   notes.length = 0;

  // });
  
  
  app.delete("/api/notes/:id", function(req, res) {
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
  