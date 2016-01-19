var express = require('express');
var router = express.Router();

var UserSchema = require('../model/schema.js').getUserSchema();

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
    var query = UserSchema.find({}).select('-password');
    query.exec(function (err, users) {
      if (err) {
        console.log(err);
        return;
      }
      // TODO : Supprimer les mots de passe
      res.status(200);
      return res.send(users);
    });
  })
  // Inscription
  .post(function (req, res) {
    if (req.body.username === undefined && req.body.password === undefined) {
      // TODO : Error
    }

    var user = new UserSchema();

    user.username = req.body.username;
    user.password = req.body.password;

    user.save(function (err, user) {
      if (err) {
        res.status(404);
        res.send(err);
        console.log(err);
        return;
      }
      user.password = undefined;
      res.status(201);
      return res.send(user);
    });
  });

router.route('/auth')
  // Connection
  .post(function (req, res) {
    var query = UserSchema.findOne({'username': req.body.username, 'password': req.body.password}).select('-password');
    query.exec(function (err, user) {
      if (err) {
        console.log(err);
        return;
      }

      if (user == null) {
        return res.status(404).json("{message: user not found}")
      }
      res.status(200);
      return res.send(user);
    });
  });

// Update d'un user
router.put('/:id', function (req, res) {
  UserSchema.findOne({'_id': req.params.id}, function (err, user) {
    console.log(user);
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
        if (req.body.pedals.constructor === Array) {
          for (var i = 0; i < req.body.pedals.length; i++) {
            user.pedals.push(req.body.pedals[i]);
          }
        }
        else {
          user.pedals.push(req.body.pedals);
        }
      }

      if (req.body.shared !== undefined) {
        if (req.body.shared.constructor === Array) {
          for (var j = 0; j < req.body.shared.length; j++) {
            console.log(req.body.shared[j]);
            user.shared.push(
              {
                _id: req.body.shared[j].id,
                right: req.body.shared[j].right
              }
            );
          }
        }
      }

      user.save(function (err, user) {
        if (err) {
          console.log(err);
          return;
        }
        user.password = undefined;
        console.log(user);
        res.status(200);
        return res.send(user);
      });
    }
  );
});
module.exports = router;
