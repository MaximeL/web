/**
 * Created by Romain on 11/01/2016.
 */

var express = require('express');
var router = express.Router();

var NotesSchema = require('../model/schema').getNotesSchema();

// ---------------------------
// Middleware for all requests
// ---------------------------
router.use(function(req, res, next) {
  console.log('Middleware called.');
  // allows requests from angularJS frontend applications
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next(); // go to the next route
});

// ---------------
// Route ➜ /note
// ---------------
router.route('/')

  .get(function(req, res) {
    console.log('GET all list of notes');
    NotesSchema.find(function(err, noteList) {
      if(err) {
        console.log(err);
        res.status(404);
        return;
      }
      console.log("   Ok pour lister les meteos wesh t'as vu");
      res.json(noteList);
    });
  })

  .post(function(req, res) {
    console.log('POST a note');

    var note = new NotesSchema();

    // on test l'existence des parametres requis
    // !req.body.hasOwnProperty('number')
    if(!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('value') ||
      req.body.username === "" || req.body.value === "")
    {
      console.log("   username or value not specified man!");
      res.status(400);
      res.json({ message: "Post syntax incorrect, username or value not specified or empty" });
      return;
    }

    note.username = req.body.username;
    note.value = req.body.value;

    note.save(function(err, noteSaved) {
      if(err) {
        res.status(404);
        res.send(err);
        return;
      }
      console.log("   Ok pour l'ajout d'un meteo wesh magueul");
      res.status(201);
      res.json(noteSaved);
    });
  });

// -----------------------------
// Route ➜ /note/:note_id
// -----------------------------
router.route('/:note_id')
  // HTTP GET
  .get(function(req, res) {
    console.log('# GET a note by id');
    NotesSchema.findOne({_id: req.params.note_id}, function(err, note) {
      if(err) {
        console.log(err);
        res.status(404);
        return;
      }
      console.log('---> note ' + req.params.note_id + ' liste via ' + req.url);
      res.json(note);
    });
  })
  // HTTP PUT
  .put(function(req, res) {
    console.log('# PUT an note by id');

    NotesSchema.findById(req.params.note_id, function(err, note) {
      if (err)
        res.send(err);

      note.username = req.body.username;
      note.value = req.body.value;

      note.save(function(err) {
        if (err)
          res.send(err);
        console.log('---> note ' + req.params.note_id + ' mise a jour via ' + req.url);
        res.json(note);
      });
    });
  })
  // HTTP DELETE
  .delete(function(req, res) {
    console.log('# DELETE a note by id');
    NotesSchema.remove({
      _id: req.params.note_id
    }, function(err, note) {
      if (err)
        res.send(err);
      console.log('---> note ' + req.params.note_id + ' supprimee via ' + req.url);
      res.json({message: 'Successfully deleted' });
    });
  });

module.exports = router;
