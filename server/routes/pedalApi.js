var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var PedaleSchema = require('../model/schema').getPedaleSchema();


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


/*
 ------------------------------
 PEDALES
 ------------------------------
 */

//##########POST > Route -> /api/pedale###########

router.post('/', function (req, res) {
  var conn = mongoose.createConnection('localhost', dbName, port);

  // check les erreurs
  conn.on('error', function (err) {
    if (err) {
      console.log(err);
      return;
    }
  });

  conn.once('open', function () {
    var pedale = new PedaleSchema();

    pedale.nom = req.body.nom;
    pedale.description = req.body.description;
    if (req.body.effets.isArray) {
      pedale.effets = req.body.effets;
    } else {
      pedale.effets = [];
    }

    pedale.save(function (err, pedaleSaved) {
      if (err) {
        res.status(404);
        res.send(err);
        return;
      }
      console.log('---> Pedale sauvegardee via ' + req.url);
      res.status(200);
      return res.send(pedaleSaved);
    });
  });
});


//##########GET > Route -> /api/pedale###########

//router.get('/', function (req, res) {
//  console.log(" # ----> GET Pedale");
//
//  PedaleSchema.find(function (err, pedaleList) {
//    if (err) {
//      console.log(err);
//      res.status(404);
//      return;
//    }
//    console.log('---> Liste de pedale enregistrees via ' + req.url + req.body.type);
//    res.json(pedaleList);
//  });
//
//});

module.exports = router;
