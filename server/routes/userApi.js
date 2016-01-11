var express = require('express');
var router = express.Router();

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

router.route('/')
  // Liste des utilisateurs
  .get(function(req, res) {
    UserModel.find({}, function (err, users) {
      if (err) {
        console.log(err);
        return;
      }
      res.status(200);
      return res.send(users);
    });
  })

  // Inscription
  .put(function (req, res) {
    if (req.body.username === undefined && req.body.password === undefined) {
      // TODO : Error
    }

    var user = new UserModel();

    user.username = req.body.username;
    user.password = req.body.password;

    user.save(function (err, user) {
      if (err) {
        res.status(404);
        res.send(err);
        console.log(err);
        return;
      }
      // TODO : Vérifier le statut
      res.statusCode(201);
      return res.send(user);
    });
  })

  // Connection
  .post(function (req, res) {
    UserModel.findOne({'username': req.body.username, 'password': req.body.password}, function (err, user) {
      if (err) {
        console.log(err);
        return;
      }
      // TODO :
      res.status(200);
      return res.send(user);
    });
  });
module.exports = router;
