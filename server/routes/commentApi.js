/**
 * Created by Romain on 11/01/2016.
 */

var express = require('express');
var router = express.Router();

var CommentsSchema = require('../model/schema').getCommentsSchema();

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
    console.log('GET all list of comments');
    CommentsSchema.find(function (err, commentsList) {
      if (err) {
        console.log(err);
        res.status(404);
        return;
      }
      console.log("   Ok pour lister les commentaires");
      res.json(commentsList);
    });
  })

  // HTTP POST
  .post(function (req, res) {
    console.log('POST a comment');

    var comment = new CommentsSchema();

    // on test l'existence des parametres requis
    // !req.body.hasOwnProperty('number')
    if (!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('content') ||
      req.body.username === "" || req.body.content === "") {
      console.log("   username or content not specified!");
      res.status(400);
      res.json({message: "Post syntax incorrect, username or content not specified or empty"});
      return;
    }

    comment.username = req.body.username;
    comment.content = req.body.content;

    comment.save(function (err, commentSaved) {
      if (err) {
        res.status(404);
        res.send(err);
        return;
      }
      console.log("   Ok pour l'ajout d'un commentaire");
      res.status(201);
      res.json(commentSaved);
    });
  });

// -----------------------------
// Route ➜ /comment/:comment_id
// -----------------------------
router.route('/:comment_id')
  // HTTP GET
  .get(function (req, res) {
    console.log('# GET a comment by id');
    CommentsSchema.findOne({_id: req.params.comment_id}, function (err, comment) {
      if (err) {
        console.log(err);
        res.status(404);
        return;
      }
      if(comment == null) {
        res.status(404);
        res.send({message : 'Invalid comment'});
        return;
      }
      console.log('---> Comment ' + req.params.comment_id + ' liste via ' + req.url);
      res.json(comment);
    });
  })
  // HTTP PUT
  .put(function (req, res) {
    console.log('# PUT an comment by id');

    CommentsSchema.findById(req.params.comment_id, function (err, comment) {
      if (err)
        res.send(err);

      if(typeof req.body.username !== 'string') {
        res.status(400);
        res.send({message: 'Username is not a string'});
        return;
      }

      comment.username = req.body.username;
      comment.content = req.body.content;

      comment.save(function (err) {
        if (err)
          res.send(err);
        console.log('---> Comment ' + req.params.comment_id + ' mise a jour via ' + req.url);
        res.json(comment);
      });
    });
  })

  // HTTP DELETE
  // TODO preciser une url pour permettre la suppression
  .delete(function (req, res) {
    console.log('# DELETE a comment by id');
    CommentsSchema.remove({_id: req.params.comment_id}, function (err, comment) {
      if (err)
        res.send(err);

      if(comment.result.n === 0 ) {    // aucune colonne affectee
        res.status(404);
        res.send({message : "Not found"});
        return;
      }

      console.log('---> Comment ' + req.params.comment_id + ' supprimee via ' + req.url);
      res.json({message: 'Successfully deleted'});
    });
  });

module.exports = router;
///**
// * Created by Romain on 11/01/2016.
// */
//
//var express = require('express');
//var router = express.Router();
//
//var CommentsSchema = require('../model/schema').getCommentsSchema();
//
//// ---------------------------
//// Middleware for all requests
//// ---------------------------
//router.use(function (req, res, next) {
//  console.log('Middleware called.');
//  // allows requests from angularJS frontend applications
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  next(); // go to the next route
//});
//
//// ---------------
//// Route ➜ /comment
//// ---------------
//router.route('/')
//
//  .get(function (req, res) {
//    console.log('GET all list of comments');
//    CommentsSchema.find(function (err, commentsList) {
//      if (err) {
//        console.log(err);
//        res.status(404);
//        return;
//      }
//      console.log("   Ok pour lister les commentaires");
//      res.json(commentsList);
//    });
//  })
//
//  .post(function (req, res) {
//    console.log('POST a comment');
//
//    var comment = new CommentsSchema();
//
//    // on test l'existence des parametres requis
//    // !req.body.hasOwnProperty('number')
//    if (!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('content') ||
//      req.body.username === "" || req.body.content === "") {
//      console.log("   username or content not specified!");
//      res.status(400);
//      res.json({message: "Post syntax incorrect, username or content not specified or empty"});
//      return;
//    }
//
//    comment.username = req.body.username;
//    comment.content = req.body.content;
//
//    comment.save(function (err, commentSaved) {
//      if (err) {
//        res.status(404);
//        res.send(err);
//        return;
//      }
//      console.log("   Ok pour l'ajout d'un commentaire");
//      res.status(201);
//      res.json(commentSaved);
//    });
//  });
//
//// -----------------------------
//// Route ➜ /comment/:comment_id
//// -----------------------------
//router.route('/:comment_id')
//  // HTTP GET
//  .get(function (req, res) {
//    console.log('# GET a comment by id');
//    CommentsSchema.findOne({_id: req.params.comment_id}, function (err, comment) {
//      if (err) {
//        console.log(err);
//        res.status(404);
//        return;
//      }
//      console.log('---> Comment ' + req.params.comment_id + ' liste via ' + req.url);
//      res.json(comment);
//    });
//  })
//  // HTTP PUT
//  .put(function (req, res) {
//    console.log('# PUT an comment by id');
//
//    CommentsSchema.findById(req.params.comment_id, function (err, comment) {
//      if (err)
//        res.send(err);
//
//      comment.username = req.body.username;
//      comment.content = req.body.content;
//
//      comment.save(function (err) {
//        if (err)
//          res.send(err);
//        console.log('---> Comment ' + req.params.comment_id + ' mise a jour via ' + req.url);
//        res.json(comment);
//      });
//    });
//  })
//  // HTTP DELETE
//  // TODO preciser une url pour permettre la suppression
//  .delete(function (req, res) {
//    console.log('# DELETE a comment by id');
//    CommentsSchema.remove({
//      _id: req.params.comment_id
//    }, function (err, comment) {
//      if (err)
//        res.send(err);
//      console.log('---> Comment ' + req.params.comment_id + ' supprimee via ' + req.url);
//      res.json({message: 'Successfully deleted'});
//    });
//  });
//
//module.exports = router;
