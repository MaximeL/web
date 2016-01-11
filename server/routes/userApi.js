var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var dbName = 'dbsound';
var port = '27017';


var UserModel = require('../model/schema.js').getUserSchema();

// All request node
router.use(function (req, res, next) {
  console.log('User api called.');
  // allows requests from angularJS frontend applications
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next(); // go to the next route
});

// Inscription
router.put('/', function(req, res) {
  if(req.body.username === undefined && req.body.password === undefined) {
    // TODO : Error
  }

  var conn = mongoose.createConnection('localhost', dbName, port);
  conn.on('error', function (err) {
    if (err) {
      console.log(err);
      return;
    }
  });

  conn.once('open', function () {
    var user = new UserModel();

    user.username = req.body.username;
    user.password = req.body.password;

    user.save(function(err, user) {
      if(err) {
        res.status(404);
        res.send(err);
        console.log(err);
        return;
      }
      return res.json({message: 'User created'});
    });
  });
});

// Auth node
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
    UserModel.findOne({ 'username': req.body.username, 'password': req.body.password }, function (err, user) {
      if(err) {
        console.log(err);
        return;
      }
      // TODO :
      res.status(200);
      return res.send(user);
    });
  });
});

module.exports = router;
