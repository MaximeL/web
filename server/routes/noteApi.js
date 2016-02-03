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
      {"notes": {$exists: true}, "_id": req.params.pedalId},
      {"notes": 1},
      function (err, pedal) {
        if (err) {
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
    PedalSchema.findOne({"_id": req.params.pedalId}, function (err, pedale) {
      if (err) {
        res.status(404);
        return res.json({message: "Unknowned pedal"});
      }
      // on test l'existence des parametres requis
      if (!req.body.hasOwnProperty('author') || !req.body.hasOwnProperty('note') ||
        req.body.author == "" || req.body.note.NaN || req.body.note > 5 || req.body.note < 0) {
        res.status(400);
        return res.json({message: "Post syntax incorrect, note is not specified, empty or invalid"});
      }

      pedale.notes.push({
        _id: req.body.author,
        note: req.body.note
      });

      pedale.save(function (err) {
        if (err) {
          res.status(404);
          return res.json({message: "Post syntax incorrect, pedalid not specified or empty"});
        }
        res.status(201);
        return res.send(pedale);
      });
    });
  })
;
module.exports = router;
