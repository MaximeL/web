/**
 * Created by Romain on 14/01/2016.
 */

var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var winston = require('winston');
//var config = require('./config-debug');


describe('Routing test', function () {

  var URL = 'http://localhost:3000';
  var TEST_DB = 'dbsound_test';
  var URL_PEDAL_NOTE = '/notes/';
  var URL_PEDAL_COMMENT = '/comments/';
  var URL_PEDAL_USER = '/users/';
  var URL_USER = '/api/user/';
  var URL_USER_AUTH = URL_USER + 'auth/';
  var URL_PEDAL = '/api/pedal/';

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

    // TEST POST
    it('should correctly post a new user', function (done) {
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

    // TEST PUT
    it('should correctly update a user', function (done) {
      userBody.username = 'update-test';
      // TODO : Tester les pédales et les partages
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

    /**
     //   *  Gestions des erreurs pour les Users
     //   *  ____________________________________ */
      // TEST POST ERROR
    it('should not post a new user, username already used', function (done) {
      request(URL)
        .post(URL_USER)
        .send(userBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(400) //Status code bas request
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // Should.js fluent syntax applied
          res.body.should.not.have.property('_id');
          done();
        });
    });
  });

  /** ---------------------------------------------------------------------------------------
   *  Test pour les Pedales
   *  --------------------------------------------------------------------------------------- */

  describe('Pedal API testing', function () {
    var id_owner;
    var id_created;
    var pedalBody = {
      nom: "Ma pédale",
      description: "Celle de Tonton",
      effets: [
        {
          data: "{precedent: [\"1\", \"2\", \"3\"],suivant: [\"1\", \"2\", \"3\"],type: \"aze\"}"
        },
        {
          data: "{precedent: [\"1\", \"2\", \"3\"],suivant: [\"1\", \"2\", \"3\"],type: \"aze\"}"
        }
      ]
    };

    before(function (done) {
      var userBody = {
        username: "test",
        password: "alligator3",
        email: "test@test.fr"
      };

      request(URL)
        .post(URL_USER)
        .send(userBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(201) //Status code created
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // recupere l'id du post
          id_owner = res.body._id;
          done();
        });
    });

    // TEST POST
    it('should correctly post a new pedal', function (done) {
      pedalBody.owner = id_owner;
      request(URL)
        .post(URL_PEDAL)
        .send(pedalBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        //.expect(201) //Status code created
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // Should.js fluent syntax applied
          res.body.should.have.property('_id');
          // recupere l'id du post pour tester le get par id
          id_created = res.body._id;
          res.body.owner.should.equal(id_owner);
          res.body.nom.should.equal("Ma pédale");
          res.body.description.should.equal("Celle de Tonton");
          res.body.should.have.property("users");
          res.body.should.have.property("effets");
          done();
        });
    });

    // TEST PUT
    it('should correctly update a pedal', function (done) {
      pedalBody.nom = 'Ma pédale modifée';
      request(URL)
        .put(URL_PEDAL + id_created)
        .send(pedalBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200) //Status code success
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // Should.js fluent syntax applied
          res.body.should.have.property('_id');
          res.body._id.should.equal(id_created);
          res.body.nom.should.equal('Ma pédale modifée');
          done();
        });
    });

    // TEST POST Note
    it('should correctly add a note to a pedal', function (done) {
      var noteBody = {
        author: id_owner,
        note: 5
      };

      request(URL)
        .post(URL_PEDAL + id_created + URL_PEDAL_NOTE)
        .send(noteBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        //.expect(201) //Status code success
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // Should.js fluent syntax applied
          res.body.should.have.property('_id');
          res.body.notes.should.containDeep([{note: 5}]);
          done();
        });
    });

    // TEST POST Comment
    it('should correctly add a comment to a pedal', function (done) {
      var commentBody = {
        author: id_owner,
        content: "Lorem ipsum"
      };

      request(URL)
        .post(URL_PEDAL + id_created + URL_PEDAL_COMMENT)
        .send(commentBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(201) //Status code success
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // Should.js fluent syntax applied
          res.body.should.have.property('_id');
          res.body.comments.should.containDeep([{comment: "Lorem ipsum"}]);
          done();
        });
    });

    // TEST PUT users
    it('should correctly update users of a pedal', function (done) {
      var userBody = [
        id_created
      ];
      request(URL)
        .put(URL_PEDAL + id_created + URL_PEDAL_USER)
        .send(userBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200) //Status code success
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          res.body.users.should.containDeep([{_id: id_created}]);
          done();
        });
    });

    // TEST GET Find USERS
    it('should find users of pedal', function (done) {
      request(URL)
        .get(URL_PEDAL + id_created + URL_PEDAL_USER)
        .send()
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200) //Status code bas request
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          res.body.should.be.instanceof(Array);
          // TODO : Should contains array ...
          //res.body.should.contains
          // Should.js fluent syntax applied
          //res.body.should.not.have.property('_id');
          //res.body.creationDate.should.not.equal(null);
          done();
        });
    });

    // TEST Change user of pedal
    it('should not update users of pedal', function (done) {
      var userBody = [];
      request(URL)
        .put(URL_PEDAL + id_created + URL_PEDAL_USER)
        .send(userBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(400) //Status code bas request
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          done();
        });
    });


    // TEST GET PAR ID
    it('should correctly get a pedal', function (done) {
      request(URL)
        .get(URL_PEDAL + id_created)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200) //Status code success
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          res.body.should.have.property('_id');
          res.body._id.should.equal(id_created);
          res.body.owner.should.equal(id_owner);
          res.body.nom.should.equal("Ma pédale modifée");
          res.body.description.should.equal("Celle de Tonton");
          res.body.should.have.property("effets");
          res.body.should.have.property("users");
          done();
        });
    });

    /**
     *  Gestions des erreurs pour les Pedales
     *  __________________________________________ */

      // TEST POST ERROR
    it('should not post a new comment, properties not specified', function (done) {
      request(URL)
        .post(URL_PEDAL + id_created + URL_PEDAL_COMMENT)
        .send({})
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(400) //Status code bas request
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          done();
        });
    });

    // TEST GET Find USER
    it('should not find a user', function (done) {
      request(URL)
        .get(URL_PEDAL + 1 + URL_PEDAL_USER)
        .send()
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(404) //Status code bas request
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // Should.js fluent syntax applied
          res.body.should.not.have.property('_id');
          //res.body.creationDate.should.not.equal(null);
          done();
        });
    });

    // TEST Change user of pedal
    it('should not update users of a pedal', function (done) {
      var userBody = [];
      request(URL)
        .put(URL_PEDAL + id_created + URL_PEDAL_USER)
        .send(userBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(400) //Status code bas request
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // Should.js fluent syntax applied
          res.body.should.not.have.property('_id');
          //res.body.creationDate.should.not.equal(null);
          done();
        });
    });

    // TEST GET PAR ID ERROR
    it('should return 404 with an incorrect ID', function (done) {
      request(URL)
        .get(URL_PEDAL + 1)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(404) //Status code error
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          done();
        });
    });

    // TEST POST Note invalid schema
    it('should correctly deny bad note schema', function (done) {
      var noteBody = {
        author: "",
        note: 5
      };

      request(URL)
        .post(URL_PEDAL + id_created + URL_PEDAL_NOTE)
        .send(noteBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(400) //Status code success
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // Should.js fluent syntax applied
          res.body.should.have.property('message');
          done();
        });
    });

    // TEST POST Note invalid id
    it('should correctly deny bad id for add a note to a pedal', function (done) {
      var noteBody = {
        author: id_owner,
        note: 5
      };

      request(URL)
        .post(URL_PEDAL + 1 + URL_PEDAL_NOTE)
        .send(noteBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(404) //Status code success
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // Should.js fluent syntax applied
          res.body.should.have.property('message');
          done();
        });
    });

    // TEST POST Comment invalid id
    it('should correctly deny bad id for comment', function (done) {
      var commentBody = {
        author: id_owner,
        content: "Lorem ipsum"
      };

      request(URL)
        .post(URL_PEDAL + "aze" + URL_PEDAL_COMMENT)
        .send(commentBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        //.expect(400) //Status code success
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // Should.js fluent syntax applied
          res.body.should.have.property('message');
          done();
        });
    });

    // TEST POST Node invalid id
    it('should not correctly update a note if incorrect values', function (done) {
      var noteBody = {
        author: "aze",
        note: 5
      };

      request(URL)
        .post(URL_PEDAL + id_created + URL_PEDAL_NOTE)
        .send(noteBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(404) //Status code accepted
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // Should.js fluent syntax applied
          res.body.should.have.property('message');
          done();
        });
    });

    // TEST DELETE ERROR
    it('should not correctly delete a pedal', function (done) {
      request(URL)
        .delete(URL_PEDAL + '12')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(404) //Status code success
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          done();
        });
    });


    // TEST DELETE
    it('should correctly delete a pedal', function (done) {
      request(URL)
        .delete(URL_PEDAL + id_created)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200) //Status code success
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // Should.js fluent syntax applied
          res.body.should.not.have.property('_id');
          res.body.should.have.property('message');
          res.body.message.should.equal('Successfully deleted');
          done();
        });
    });
  });

  after(function (done) {
    mongoose.connection.db.dropDatabase(function (err, res) {
      console.log("\n" + err);
    });


    // In our tests we use the dbsound_test
    mongoose.connection.close();
    done();
  });

});
