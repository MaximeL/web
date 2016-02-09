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
      {"rating": {$exists: true}, "_id": req.params.pedalId},
      {"rating": 1},
      function (err, pedal) {
        if (err) {
          res.status(404);
          return res.json({message: "incorrect syntax"});
        }
        res.status(200);
        return res.json(pedal.rating);
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
      if (!req.body.hasOwnProperty('author') || !req.body.hasOwnProperty('rate') ||
        req.body.author === "" || req.body.rate.NaN || req.body.rate > 5 || req.body.rate < 0) {
        res.status(400);
        return res.json({message: "incorrect syntax"});
      }

      pedale.rating.push({
        _id: req.body.author,
        rate: req.body.rate
      });

      pedale.save(function (err) {
        if (err) {
          res.status(404);
          return res.json({message: "incorrect syntax"});
        }
        res.status(201);
        return res.send(pedale);
      });
    });
  })
;
module.exports = router;
