/**
 * Created by Romain on 11/01/2016.
 */

var express = require('express');
var router = express.Router({mergeParams: true});

var PedalSchema = require('../model/schema').getPedaleSchema();
var UserSchema = require('../model/schema').getUserSchema();

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

    PedalSchema.findOne({"_id": req.params.pedalId}, function (err, pedale) {
        if (!pedale) {
          res.status(404);
          return res.json({message: "unknowed pedal"});
        }
        if (err) {
          res.status(500);
          return res.json({message: "error occured"});
        }

        res.status(200);
        return res.json(pedale.rating);
      }
    );
  })

  // HTTP POST
  .post(function (req, res) {
    console.log('POST a note');

    if (!req.body.hasOwnProperty('author') || !req.body.hasOwnProperty('rate') ||
      req.body.author === "" || req.body.rate.NaN || req.body.rate > 5 || req.body.rate < 0) {
      res.status(400);
      return res.json({message: "incorrect syntax"});
    }

    UserSchema.findOne({'_id': req.body.author}, function (err, user) {
      if(err || !user) {
        res.status(401);
        return res.json({message: "unauthorized"});
      }
      PedalSchema.findOne({"_id": req.params.pedalId}, function (err, pedale) {
        if (err) {
          res.status(404);
          return res.json({message: "unknowned pedal"});
        }

        for(var i = 0; i < pedale.rating.length; i++) {
          if(pedale.rating[i]._id == user._id) {
            res.status(401);
            return res.json({message: "user already vote"})
          }
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
    });
  })
;
module.exports = router;
