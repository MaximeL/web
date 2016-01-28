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
router.use('/:pedalId/notes', noteRouter);
router.use('/:pedalId/comments', commentRouter);

//##########POST > Route -> /api/pedale###########

router.route('/')
  .post(function (req, res) {

    var pedale = new PedaleSchema();

    pedale.nom = req.body.nom;
    pedale.description = req.body.description;
    pedale.owner = req.body.owner;

    if (req.body.effets !== undefined && req.body.effets.constructor === Array) {
      for (var i = 0; i < req.body.effets.length; i++) {
        var elem = req.body.effets[i];
        var keys = Object.keys(elem);

        pedale.effets[i] = {};
        for (var j = 0; j < keys.length; j++) {
          pedale.effets[i][keys[j]] = elem[keys[j]];
        }
      }

    } else {
      pedale.effets = [];
    }

    pedale.save(function (err, pedaleSaved) {
      if (err) {
        res.status(404);
        res.send(err);
        return;
      }
      res.status(201);
      return res.send(pedaleSaved);
    });
  });

// Actions sur une pédale
router.route('/:id')
  .get(function (req, res) {
    PedaleSchema.findOne({'_id': req.params.id}, function (err, pedale) {
      if (err) {
        console.log(err);
        res.status(404);
        return;
      }
      res.status(200);
      return res.send(pedale);
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

        if (req.body.effets !== undefined && req.body.effets.constructor === Array) {
          pedale.effets = [];

          for (var i = 0; i < req.body.effets.length; i++) {
            var elem = req.body.effets[i];
            var keys = Object.keys(elem);

            pedale.effets[i] = {};
            for (var j = 0; j < keys.length; j++) {
              pedale.effets[i][keys[j]] = elem[keys[j]];
            }
          }
        }

        if (req.body.note !== undefined) {
          if (req.body.note.author != undefined && req.body.note.value != undefined && req.body.note.value <= 5 && req.body.note.value > 0) {
            var found = false;
            for (var i = 0; i < pedale.notes.length; i++) {
              if (pedale.notes[i].author == req.body.note.author) {
                pedale.notes[i].note = req.body.note.value;
                found = true;
                break;
              }
            }
            if (!found) {
              var item = {};
              item.author = req.body.note.author;
              item.value = req.body.note.value;
              pedale.notes.push(item);
            }
          }
        }

        if (req.body.comment != undefined) {
          if (req.body.comment.author != undefined && req.body.comment.content != undefined) {
            var item = {};
            item.author = req.body.comment.author;
            item.content = req.body.comment.content;
            pedale.comments.push(item);
          }
        }

        // TODO : Ici ça marche pas
        //  if (req.body.users !== undefined) {
        //    if (req.body.users.constructor === Array) {
        //      pedale.users = [];
        //      for (var j = 0; j < req.body.users.length; j++) {
        //        pedale.users[j] = {};
        //
        //        pedale.users[j]._id = req.body.users[j]._id;
        //        pedale.users[j].right = req.body.users[j].right;
        //      }
        //    }
        //  }

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
    PedaleSchema.remove({_id: req.params.id}, function (err) {
      if (err)
        res.send(err);
      res.json({message: 'Successfully deleted'});
      return res.end();
    });
  });
module.exports = router;
