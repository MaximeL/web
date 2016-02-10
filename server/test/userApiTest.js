var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var winston = require('winston');

describe('User API test', function () {

  var URL = 'http://localhost:3001';
  var TEST_DB = 'dbsound_test_user';
  var URL_USER = '/api/users/';
  var URL_USER_AUTH = URL_USER + 'auth/';

  // connection with the database
  before(function (done) {
    // In our tests we use the dbsound_test
    mongoose.connect('mongodb://localhost:27017/' + TEST_DB);
    done();
  });


  /** ---------------------------------------------------------------------------------------
   *  Test pour les Users
   *  --------------------------------------------------------------------------------------- */

  describe('User API testing', function () {
    var id_created;
    var userBody = {
      username: "test",
      password: "alligator3",
      email: "test@test.fr"
    };

    it('should correctly create a new user', function (done) {
      request(URL)
        .post(URL_USER)
        .send(userBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(201) //Status code created
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // Should.js fluent syntax applied
          res.body.should.have.property('_id');
          // recupere l'id du post pour tester le get par id
          id_created = res.body._id;
          res.body.username.should.equal("test");
          res.body.should.not.have.property("password");
          done();
        });
    });

    it('should correctly get a user', function(done) {
      request(URL)
        .get(URL_USER + id_created)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200) //Status code created
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // Should.js fluent syntax applied
          res.body.should.have.property('_id');
          // recupere l'id du post pour tester le get par id
          res.body.username.should.equal(userBody.username);
          res.body.should.not.have.property("password");
          done();
        });
    });

    it('should correctly update a user', function (done) {
      userBody.username = 'update-test';
      request(URL)
        .put(URL_USER + id_created)
        .send(userBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200) //Status code success
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // Should.js fluent syntax applied
          res.body._id.should.equal(id_created);
          res.body.username.should.equal("update-test");
          res.body.should.have.property("pedals");
          res.body.should.have.property("shared");
          res.body.should.not.have.property("password");
          done();
        });
    });

    // Liste des utilisateurs
    it('should correctly get all users', function (done) {
      request(URL)
        .get(URL_USER)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200) //Status code success
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          res.body.should.be.instanceof(Array);
          done();
        });
    });

    it('should correctily authenticate user', function (done) {
      request(URL)
        .post(URL_USER_AUTH)
        .send(userBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200) //Status code created
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          res.body._id.should.equal(id_created);
          res.body.username.should.equal("update-test");
          res.body.should.have.property("pedals");
          res.body.should.have.property("shared");
          res.body.should.not.have.property("password");
          done();
        });
    });
  });

  /** ---------------------------------------------------------------------------------------
   *  Gestion des erreurs pour les Users
   *  --------------------------------------------------------------------------------------- */

  describe('User API syntax testing', function() {
    var userTemplate = {
      username: "test",
      password: "alligator3",
      email: "test@test.fr"
    };

    it('should not create a new user, username is missing', function (done) {
      var userBody = JSON.parse(JSON.stringify(userTemplate));
      delete userBody.username;
      request(URL)
        .post(URL_USER)
        .send(userBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(400)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // Should.js fluent syntax applied
          res.body.should.not.have.property('_id');
          res.body.message.should.equal("incorrect syntax");
          done();
        });
    });

    it('should not create a new user, password is missing', function (done) {
      var userBody = JSON.parse(JSON.stringify(userTemplate));
      delete userBody.password;
      request(URL)
        .post(URL_USER)
        .send(userBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(400)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // Should.js fluent syntax applied
          res.body.should.not.have.property('_id');
          res.body.message.should.equal("incorrect syntax");
          done();
        });
    });

    it('should not create a new user, email is missing', function (done) {
      var userBody = JSON.parse(JSON.stringify(userTemplate));
      delete userBody.email;
      request(URL)
        .post(URL_USER)
        .send(userBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(400)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // Should.js fluent syntax applied
          res.body.should.not.have.property('_id');
          res.body.message.should.equal("incorrect syntax");
          done();
        });
    });


    it('should not authenticate a new user, username is missing', function (done) {
      var userBody = JSON.parse(JSON.stringify(userTemplate));
      delete userBody.email;
      delete userBody.username;
      request(URL)
        .post(URL_USER)
        .send(userBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(400)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // Should.js fluent syntax applied
          res.body.should.not.have.property('_id');
          res.body.message.should.equal("incorrect syntax");
          done();
        });
    });

    it('should not authenticate a new user, password is missing', function (done) {
      var userBody = JSON.parse(JSON.stringify(userTemplate));
      delete userBody.email;
      delete userBody.password;
      request(URL)
        .post(URL_USER)
        .send(userBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(400)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // Should.js fluent syntax applied
          res.body.should.not.have.property('_id');
          res.body.message.should.equal("incorrect syntax");
          done();
        });
    });
  });

  /** ---------------------------------------------------------------------------------------
   *  Gestion du comportement de l'API
   *  --------------------------------------------------------------------------------------- */
  describe('User API behaviour testing', function() {
    var userTemplate = {
      username: "test2",
      password: "alligator3",
      email: "test@test.fr"
    };

    // Créé un utilisateur dans la base de données
    before(function (done) {
      request(URL)
        .post(URL_USER)
        .send(userTemplate)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(201) //Status code created
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          done();
        });
    });

    it('should not get an user who does not exists', function(done) {
      request(URL)
        .get(URL_USER + "azedqsdqsd")
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(404)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // Should.js fluent syntax applied
          res.body.should.not.have.property('_id');
          res.body.message.should.equal("User unknowned");
          done();
        });
    });

    it('should not create a new user with an username witch does already exists' , function (done) {
      var userBody = JSON.parse(JSON.stringify(userTemplate));
      request(URL)
        .post(URL_USER)
        .send(userBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(405)
        .end(function (err, res) {
          if (err) {
            console.log(err);
            throw err;
          }
          // Should.js fluent syntax applied
          res.body.should.not.have.property('_id');
          res.body.message.should.equal("username already exists");
          done();
        });
    });

    it('should not authenticate a user who does not exists' , function (done) {
      var userBody = JSON.parse(JSON.stringify(userTemplate));
      userBody.username = "test3";
      request(URL)
        .post(URL_USER_AUTH)
        .send(userBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(404)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // Should.js fluent syntax applied
          res.body.should.not.have.property('_id');
          res.body.message.should.equal("User does not exist");
          done();
        });
    });

    it('should not authenticate a user with a bad password', function (done) {
      var userBody = JSON.parse(JSON.stringify(userTemplate));
      userBody.password = "alligator";
      request(URL)
        .post(URL_USER_AUTH)
        .send(userBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(404)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // Should.js fluent syntax applied
          res.body.should.not.have.property('_id');
          res.body.message.should.equal("User does not exist");
          done();
        });
    });
  });

  after(function (done) {
    // on drop la BD de test
    mongoose.connection.db.dropDatabase(function (err, res) {
      console.log("\n" + err);
    });

    // In our tests we use the dbsound_test
    mongoose.connection.close();
    done();
  });

});
