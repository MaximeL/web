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
// Route ➜ /comment
// ---------------
router.route('/')

  // HTTP GET
  .get(function (req, res) {
    console.log('GET all comments of pedal');
    PedalSchema.findOne(
      {"comments": {$exists: true}, "_id": req.params.pedalId},
      {"comments": 1},
      function (err, pedal) {
        if (err) {
          res.status(500);
          return res.json({message: "Can't get all users"});
        }
        console.log("   Ok pour lister les commentaires");
        res.status(200);
        return res.send(pedal.comments);
      });
  })

  // HTTP POST
  .post(function (req, res) {
    console.log('POST a comment');

    // on test l'existence des parametres requis
    if (!req.body.hasOwnProperty('author') || !req.body.hasOwnProperty('content') ||
      req.body.author === "" || req.body.content === "") {
      console.log("   auhtor or content not specified!");
      res.status(400);
      return res.json({message: "incorrect syntax"});
    }

    PedalSchema.findOne({"_id": req.params.pedalId}, function (err, pedale) {
      if (err) {
        res.status(404);
        return res.json({message: "Unknowned pedal"});
      }

      pedale.comments.push({
        _id: req.body.author,
        comment: req.body.content
      });

      pedale.save(function (err) {
        if (err) {
          res.status(404);
          return res.json({message: "incorrect syntax"});
        }
        console.log("   Ok pour l'ajout d'un commentaire");
        res.status(201);
        return res.send(pedale);
      });
    });
  });

module.exports = router;
