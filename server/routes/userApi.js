var express = require('express');
var router = express.Router();

var UserModel = require('../model/schema.js').getUserSchema();
var PedaleSchema = require('../model/schema.js').getPedaleSchema();

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
  .get(function (req, res) {
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
  .post(function (req, res) {
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
      res.status(201);
      return res.send(user);
    });
  });

router.route('/auth')
  // Connection
  .get(function (req, res) {
    UserModel.findOne({'username': req.body.username, 'password': req.body.password}, function (err, user) {
      if (err) {
        console.log(err);
        return;
      }

      if(user == null) {
        return res.status(404).json("{message: user not found}")
      }
      res.status(200);
      return res.send(user);
    });
  });

// Update d'un user
router.put('/:id', function (req, res) {
  UserModel.findOne({'_id': req.params.id}, function (err, user) {
    if (err) {
      console.log(err);
      return;
    }

    if (req.body.username !== undefined) {
      user.username = req.body.username;
    }
    if (req.body.password !== undefined) {
      user.password = req.body.password;
    }
    if (req.body.pedals !== undefined) {
      if (req.body.pedals.isArray) {
        for (var i = 0; i < req.body.pedals.length; i++) {
          user.pedals.push(req.body.pedals[i]);
        }
      }
      else {
        user.pedals.push(req.body.pedals);
      }
      user.save(function (err, user) {
        if (err) {
          console.log(err);
          return;
        }
        res.status(200);
        return res.send(user);
      });
    } else {
      user.save(function (err, user) {
        if (err) {
          console.log(err);
          return;
        }
        res.status(200);
        return res.send(user);
      });
    }
  });
  return res.end();
});
module.exports = router;
