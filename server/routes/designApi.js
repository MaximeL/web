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
// Route ➜ /pedal/:pedalId/design
// ---------------
router.route('/')

  // HTTP GET
  .get(function (req, res) {
    console.log('GET design of pedal');

    PedalSchema.findOne({"_id": req.params.pedalId}, function (err, pedale) {
        if(err || !pedale) {
          res.status(404);
          return res.json({message: "Pedal does not exist"});
        }

        res.status(200);
        return res.send(pedale.design);
      }
    );
  })

  // HTTP PUT
  .put(function (req, res) {
    console.log('PUT a design');

    PedalSchema.findOne({"_id": req.params.pedalId}, function (err, pedale) {
      if (err) {
        res.status(404);
        return res.json({message: "unknowned pedal"});
      }

      if(req.body.user == undefined || req.body.user != pedale.owner) {
        res.status(401);
        return res.json({message: "unauthorized"});
      }

      // on test l'existence des parametres requis
      if (!req.body.hasOwnProperty('background') ||
        req.body.background === "") {
        res.status(400);
        return res.json({message: "incorrect syntax"});
      }

      pedale.design.background = req.body.background;
      pedale.design.potar1 = req.body.potar1 == "" ? {} : req.body.potar1;
      pedale.design.potar2 = req.body.potar2 == "" ? {} : req.body.potar2;
      pedale.design.potar3 = req.body.potar3 == "" ? {} : req.body.potar3;
      pedale.design.potar4 = req.body.potar4 == "" ? {} : req.body.potar4;

      pedale.save(function (err) {
        if (err) {
          res.status(404);
          return res.json({message: "incorrect syntax"});
        }
        res.status(200);
        return res.send(pedale);
      });
    });
  })
;
module.exports = router;
