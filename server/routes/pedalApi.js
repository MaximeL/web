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
    pedale.owner = req.body.owner;

    if (req.body.effets !== undefined && req.body.effets.constructor === Array) {
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
  });

// Update d'une pédale
router.route('/:id')
  .get(function (req, res) {
    PedaleSchema.find({'_id': req.params.id}, function (err, pedals) {
      if (err) {
        console.log(err);
        res.status(404);
        return;
      }
      res.status(200);
      return res.send(pedals);
    });
  })
  .put(function (req, res) {
    PedaleSchema.findOne({'_id': req.params.id}, function (err, pedale) {
        if (err) {
          console.log(err);
          return;
        }

        if (req.body.nom !== undefined) {
          pedale.nom = req.body.nom;
        }
        if (req.body.description !== undefined) {
          pedale.description = req.body.description;
        }
        //TODO
        if (req.body.effets !== undefined) {
          //{
          //  type: String,
          //    precedent: String,
          //  suivant: String
          //}
          pedale.effets = req.body.effets;
        }

        if (req.body.users !== undefined) {
          if (req.body.users.constructor === Array) {
            for (var j = 0; j < req.body.users.length; j++) {
              pedale.users.push(
                {
                  _id: req.body.users[j].id,
                  right: req.body.users[j].right
                }
              );
            }
          }
        }

        pedale.save(function (err, pedale) {
          if (err) {
            console.log(err);
            return;
          }
          res.status(200);
          return res.send(pedale);
        });
      }
    )

  })
  .delete(function (req, res) {
    PedaleSchema.remove({_id: req.params.id}, function (err, note) {
      if (err)
        res.send(err);
      res.json({message: 'Successfully deleted'});
    });
  });
module.exports = router;
