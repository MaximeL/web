var express = require('express');
var router = express.Router();

var Dao = require('../model/dao');

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

router.route('/')
  // TODO : Différentiation update / création
  .post(function (req, res) {

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
      res.status(200);
      return res.send(pedaleSaved);
    });
  })
  .get(function (req, res) {
    PedaleSchema.find({}, function (err, pedals) {
      if (err) {
        console.log(err);
        res.status(404);
        return;
      }
      res.statusCode(200);
      return res.send(pedals);
    });
  });
module.exports = router;
