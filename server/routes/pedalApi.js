var express = require('express');
var router = express.Router();

var Dao = require('../model/dao');

var PedaleSchema = require('../model/schema').getPedaleSchema();
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
  res.header("Content-type", "");
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

router.use('/:pedalId/rate', noteRouter);
router.use('/:pedalId/comments', commentRouter);
router.use('/:pedalId/design', designRouter);

//##########POST > Route -> /api/pedale###########

router.route('/')
  .post(function (req, res) {
    console.log('POST a pedal');

    if (!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('description') || !req.body.hasOwnProperty('owner') ||
      req.body.name === "" || req.body.description === "" || req.body.owner === "") {
      res.status(400);
      return res.json({message: "incorrect syntax"});
    }

    UserSchema.findOne({'_id': req.body.owner}, function (err, user) {
      if (user == null) {
        res.status(401);
        return res.json({message: "unauthorized"});
      }
      if (err) {
        res.status(500);
        return res.json({message: "error occured"})
      }
console.log("user found");
      var pedale = new PedaleSchema();

      pedale.name = req.body.name;
      pedale.description = req.body.description;
      pedale.owner = req.body.owner;

      pedale.save(function (err) {
        if (err) {
          res.status(400);
          return res.json(err);
        }

        user.pedals.push({
          _id: pedale._id
        });

        user.save();

        res.status(201);
        return res.send(pedale);
      });
    });
  });

// Actions sur une pédale
router.route('/:id')
  .get(function (req, res) {
    console.log('GET a pedal');

    PedaleSchema.findOne({'_id': req.params.id}, function (err, pedale) {
      if (err) {
        res.status(404);
        return res.json({message: "unknowned pedal"});
      }
      res.status(200);
      return res.send(pedale);
    });
  })
  .put(function (req, res) {
    console.log('PUT a pedal');

    if (!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('description') || !req.body.hasOwnProperty('owner') ||
      req.body.name === "" || req.body.description === "" || req.body.owner === "") {
      res.status(400);
      return res.json({message: "incorrect syntax"});
    }

    PedaleSchema.findOne({'_id': req.params.id}, function (err, pedale) {
        if (err) {
          res.status(404);
          return res.json({message: "unknowned pedal"});
        }

        if (req.body.user == undefined || req.body.user != pedale.owner) {
          res.status(401);
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

  .delete(function (req, res) {
    console.log('DELETE a pedal');
    UserSchema.findOne({'_id': req.body.user}, function (err, user) {
      if (user == null) {
        res.status(401);
        return res.json({message: "unauthorized"});
      }

      if (err) {
        res.status(500);
        return res.json({message: "error occured"});
      }

      PedaleSchema.findOne({'_id': req.params.id}, function (err, pedale) {
        if (err || !pedale) {
          res.status(404);
          return res.json({message: "unknowned pedal"});
        }

        if (pedale.owner != req.body.user) {
          res.status(401);
          return res.json({message: "unauthorized"});
        }

        pedale.remove(function (err) {
          if (err) {
            res.status(404);
            return res.json({message: "unknowned pedal"});
          }
          res.status(200);
          return res.json({message: 'Successfully deleted'});
        });
      });
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
          return res.json({message: "incorrect syntax"});
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
      return res.json({message: "incorrect syntax"});
    }

    PedaleSchema.findOne({'_id': req.params.id}, function (err, pedale) {
      if (err) {
        res.status(404);
        return res.json({message: "unknowned pedal"});
      }

      if (req.body.user == undefined || req.body.user != pedale.owner) {
        res.status(401);
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
