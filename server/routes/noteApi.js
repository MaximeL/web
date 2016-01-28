/**
 * Created by Romain on 11/01/2016.
 */

var express = require('express');
var router = express.Router({mergeParams: true});

var PedalSchema = require('../model/schema').getPedaleSchema();

// ---------------------------
// Middleware for all requests
// ---------------------------
router.use(function (req, res, next) {
  console.log('Middleware called.');
  // allows requests from angularJS frontend applications
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next(); // go to the next route
});

// ---------------
// Route ➜ /pedal/:pedalId/notes
// ---------------
router.route('/')

  // HTTP GET
  .get(function (req, res) {
    console.log('GET all notes of pedal');

    PedalSchema.findOne(
      {"notes": { $exists: true }, "_id": req.params.pedalId },
      {"notes": 1},
      function(err, pedal) {
        if (err) {
          console.log(err);
          res.status(404);
          return res.json({message: "Post syntax incorrect, pedalid not specified or empty"});
        }
        res.status(200);
        return res.json(pedal.notes);
      }
    );
  })

  // HTTP POST TODO : note déjà posée par un user
  .post(function (req, res) {
    console.log('POST a note');

    var pedal = new PedalSchema();

    // on test l'existence des parametres requis
    // !req.body.hasOwnProperty('number')
    if (!req.body.hasOwnProperty('author') || !req.body.hasOwnProperty('note') ||
      req.body.author === "" || req.body.note.NaN) {
      res.status(400);
      return res.json({message: "Post syntax incorrect, author or note value not specified or empty"});
    }

    var note = {
      _id: req.body.author,
      note: req.body.note
    };

    pedal.notes.push(note);

    pedal.save(function (err, noteSaved) {
      if (err) {
        res.status(404);
        return res.json({message: "Post syntax incorrect, pedalid not specified or empty"});
      }
      res.status(201);
      return res.json(noteSaved);
    });
  });

// -----------------------------
// Route ➜ /note/:note_id
// -----------------------------
//router.route('/:note_id')
//  // HTTP GET ID
//  .get(function (req, res) {
//    console.log('# GET a note by id');
//    NotesSchema.findOne({_id: req.params.note_id}, function (err, note) {
//      if (err) {
//        console.log(err);
//        res.status(404);
//        return;
//      }
//      if(note == null) {
//        res.status(404);
//        res.send({message : 'Invalid note'});
//        return;
//      }
//      console.log('---> note ' + req.params.note_id + ' liste via ' + req.url);
//      res.status(200);
//      res.json(note);
//    });
//  })
//  // HTTP PUT
//  .put(function (req, res) {
//    console.log('# PUT an note by id');
//
//    NotesSchema.findById(req.params.note_id, function (err, note) {
//      if (err)
//        res.send(err);
//
//      if(typeof req.body.username !== 'string' || typeof req.body.value !== 'number') {
//        res.status(400);
//        res.send({message: 'Incorrect values'});
//        return;
//      }
//
//      note.username = req.body.username;
//      note.value = req.body.value;
//
//      note.save(function (err) {
//        if (err)
//          res.send(err);
//        console.log('---> note ' + req.params.note_id + ' mise a jour via ' + req.url);
//        res.status(200);
//        res.json(note);
//      });
//    });
//  })
//
//  // HTTP DELETE
//  // TODO preciser une url pour permettre la suppression
//  .delete(function (req, res) {
//    console.log('# DELETE a note by id');
//    NotesSchema.remove({_id: req.params.note_id}, function (err, note) {
//
//      if (err)
//        res.send(err);
//
//      if(note.result.n === 0 ) {    // aucune colonne affectee
//        res.status(404);
//        res.send({message : "Not found"});
//        return;
//      }
//
//      console.log('---> note ' + req.params.note_id + ' supprimee via ' + req.url);
//      res.status(200);
//      res.json({message: 'Successfully deleted'});
//    });
//  });

module.exports = router;
