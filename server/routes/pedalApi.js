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
var noteRouter = require('./noteApi');
var commentRouter = require('./commentApi');
var designRouter = require('./designApi');

router.use('/:pedalId/notes', noteRouter);
router.use('/:pedalId/comments', commentRouter);
router.use('/:pedalId/design', designRouter);

//##########POST > Route -> /api/pedale###########

router.route('/')
  .post(function (req, res) {
    console.log('POST a pedal');
    var pedale = new PedaleSchema();

    pedale.name = req.body.name;
    pedale.description = req.body.description;
    pedale.owner = req.body.owner;

    if (req.body.effects !== undefined && req.body.effects.constructor === Array) {
      for (var i = 0; i < req.body.effects.length; i++) {
        pedale.effects.push({
          data: req.body.effects[i].data
        });
      }

    } else {
      pedale.effects = [];
    }

    pedale.save(function (err) {
      if (err) {
        res.status(400);
        return res.json(err);
      }
      res.status(201);
      return res.send(pedale);
    });
  });

// Actions sur une pédale
router.route('/:id')
  .get(function (req, res) {
    console.log('GET a pedal');
    console.log(req.params.id);
    PedaleSchema.findOne({'_id': req.params.id}, function (err, pedale) {
      if (err) {
        res.status(404);
        return res.json({message: "Unknowned pedal"});
      }
      console.log(err);
      console.log(pedale);
      res.status(200);
      return res.send(pedale);
    });
  })
  .put(function (req, res) {
    console.log('PUT a pedal');
    PedaleSchema.findOne({'_id': req.params.id}, function (err, pedale) {
      if (err) {
        res.status(404);
        return res.json({message: "unknowned pedal."});
      }

      if(req.body.user == undefined || req.body.user != pedale.owner) {
        res.staus(403);
        return res.json({message: "unauthorized"});
      }

      if (req.body.name !== undefined) {
        pedale.name = req.body.name;
      }
      if (req.body.description !== undefined) {
        pedale.description = req.body.description;
      }

      console.log(pedale);
      if (req.body.effects !== undefined && req.body.effects.constructor === Array) {
        pedale.effects = [];

        for (var i = 0; i < req.body.effects.length; i++) {
          pedale.effects.push({
            data: req.body.effects[i].data
          });
        }
      }

      pedale.save(function (err) {
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
  // TODO : verif
  .delete(function (req, res) {
    console.log('DELETE a pedal');
    PedaleSchema.remove({_id: req.params.id}, function (err) {
      if (err) {
        res.status(404);
        return res.json({message: "unknowned pedal"});
      }
      res.status(200);
      return res.json({message: 'Successfully deleted'});
    });
  });
router.route('/:id/users/')
  .get(function (req, res) {
    console.log('GET users of pedal');
    PedaleSchema.findOne(
      {"users": {$exists: true}, "_id": req.params.id},
      {"users": 1},
      function (err, pedal) {
        if (err) {
          res.status(404);
          return res.json({message: "Post syntax incorrect, pedalid not specified or empty"});
        }
        res.status(200);
        return res.send(pedal.users);
      }
    );
  })
  .put(function (req, res) {
    console.log('PUT users of pedal');
    if (req.body.constructor !== Array || req.body.length == 0) {
      res.status(400);
      return res.json({message: "Put syntax incorrect"});
    }

    PedaleSchema.findOne({'_id': req.params.id}, function (err, pedale) {
      if (err) {
        res.status(404);
        return res.json({message: "Unknowned pedal"});
      }

      if(req.body.user == undefined || req.body.user != pedale.owner) {
        res.staus(403);
        return res.json({message: "unauthorized"});
      }

      pedale.users = [];
      for (var i = 0; i < req.body.length; i++) {
        pedale.users.push({
          _id: req.body[i]
        })
      }

      pedale.save(function (err) {
        if (err) {
          res.status(404);
          return res.json({message: "This pedal doesn't exists."});
        }
        res.status(200);
        return res.send(pedale);
      });
    });
  });
module.exports = router;
