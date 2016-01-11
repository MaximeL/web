var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var fs = require('fs');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
//si utilisation d'un formulaire pour uploader fichier:

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
  console.log(" # ----> POST Pedale");

  console.log("=============== \n");
  console.log(req.body);

  var pedale = new PedaleSchema();

  pedale.type = req.body.type;
  pedale.precedent = req.body.precedent;
  pedale.suivant = req.body.suivant;

  pedale.save(function (err, pedaleSaved) {
    if (err) {
      res.status(404);
      res.send(err);
      return;
    }
    console.log('---> Pedale sauvegardee via ' + req.url);
    res.json({message: 'Successfully saved', pedaleSaved});
  });

});


//##########GET > Route -> /api/pedale###########

router.get('/', function (req, res) {
  console.log(" # ----> GET Pedale");

  PedaleSchema.find(function (err, pedaleList) {
    if (err) {
      console.log(err);
      res.status(404);
      return;
    }
    console.log('---> Liste de pedale enregistrees via ' + req.url + req.body.type);
    res.json(pedaleList);
  });

});

module.exports = router;
