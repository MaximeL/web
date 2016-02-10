/**
 * Created by Romain on 14/01/2016.
 */

var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var winston = require('winston');


describe('Pedal API test', function () {

  var URL = 'http://localhost:3001';
  var TEST_DB = 'dbsound_test';
  var URL_USER = '/api/users/';
  var URL_PEDAL = '/api/pedals/';

  var id_owner;
  // connection with the database
  before(function (done) {
    // In our tests we use the dbsound_test
    mongoose.connect('mongodb://localhost:27017/' + TEST_DB);

    var userBody = {
      username: "test_pedal_api",
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

  /** ---------------------------------------------------------------------------------------
   *  Test pour les Pedals
   *  --------------------------------------------------------------------------------------- */

  describe('Pedal API testing', function () {
    var id_created;
    var pedalBody = {
      name: "Ma pédale",
      description: "Celle de Tonton",
    };

    it('should correctly create a new pedal', function (done) {
      pedalBody.owner = id_owner;
      request(URL)
        .post(URL_PEDAL)
        .send(pedalBody)
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
          res.body.owner.should.equal(id_owner);
          res.body.name.should.equal("Ma pédale");
          res.body.description.should.equal("Celle de Tonton");
          res.body.should.have.property("users");
          res.body.should.have.property("effects");
          done();
        });
    });

    it('should correctly update a pedal (with effects)', function (done) {
      pedalBody.name = 'Ma pédale modifée';
      pedalBody.user = id_owner;
      pedalBody.effects = [
        {data: "JSON Strigifié 1"},
        {data: "JSON Strigifié 2"}
      ];
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
          res.body.name.should.equal('Ma pédale modifée');
          res.body.effects.should.containDeep([{data: "JSON Strigifié 2"}]);
          done();
        });
    });

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
          res.body.name.should.equal(pedalBody.name);
          res.body.description.should.equal(pedalBody.description);
          res.body.should.have.property("effects");
          res.body.should.have.property("users");
          done();
        });
    });

    it('user should correctly had pedal as owned', function (done) {
      request(URL)
        .get(URL_USER + id_owner)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200) //Status code created
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // Should.js fluent syntax applied
          res.body.should.have.property('_id');
          res.body.pedals.should.containDeep([{_id: id_created}]);

          done();
        });
    });

    it('should correctly delete a pedal', function (done) {
      request(URL)
        .delete(URL_PEDAL + id_created)
        .send({user: id_owner})
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

  /** ---------------------------------------------------------------------------------------
   *  Gestion des erreurs de syntaxe pour les Pedals
   *  --------------------------------------------------------------------------------------- */

  describe('Pedal API syntax testing', function () {
    var id_created;
    var pedalTemplate = {
      name: "Ma pédale",
      description: "Celle de Tonton"
    };

    before(function (done) {
      pedalTemplate.owner = id_owner;
      pedalTemplate.user = id_owner;
      request(URL)
        .post(URL_PEDAL)
        .send(pedalTemplate)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(201)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          res.body.should.have.property('_id');
          id_created = res.body._id;

          done();
        });
    });

    it('should not correctly create a pedal, name is missing', function (done) {
      var pedalBody = JSON.parse(JSON.stringify(pedalTemplate));
      delete pedalBody.name;
      request(URL)
        .post(URL_PEDAL)
        .send(pedalBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(400)
        .end(function (err, res) {
          if (err) {
            throw err;
          }

          res.body.should.not.have.property('_id');
          res.body.message.should.equal("incorrect syntax");
          done();
        });
    });

    it('should not correctly create a pedal, description is missing', function (done) {
      var pedalBody = JSON.parse(JSON.stringify(pedalTemplate));
      delete pedalBody.description;
      request(URL)
        .post(URL_PEDAL)
        .send(pedalBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(400)
        .end(function (err, res) {
          if (err) {
            throw err;
          }

          res.body.should.not.have.property('_id');
          res.body.message.should.equal("incorrect syntax");
          done();
        });
    });

    it('should not correctly create a pedal, owner is missing', function (done) {
      var pedalBody = JSON.parse(JSON.stringify(pedalTemplate));
      delete pedalBody.owner;
      request(URL)
        .post(URL_PEDAL)
        .send(pedalBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(400)
        .end(function (err, res) {
          if (err) {
            throw err;
          }

          res.body.should.not.have.property('_id');
          res.body.message.should.equal("incorrect syntax");
          done();
        });
    });


    it('should not correctly update a pedal, name is missing', function (done) {
      var pedalBody = JSON.parse(JSON.stringify(pedalTemplate));
      delete pedalBody.name;
      request(URL)
        .put(URL_PEDAL + id_created)
        .send(pedalBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(400)
        .end(function (err, res) {
          if (err) {
            throw err;
          }

          res.body.should.not.have.property('_id');
          res.body.message.should.equal("incorrect syntax");
          done();
        });
    });

    it('should not correctly update a pedal, description is missing', function (done) {
      var pedalBody = JSON.parse(JSON.stringify(pedalTemplate));
      delete pedalBody.description;
      request(URL)
        .put(URL_PEDAL + id_created)
        .send(pedalBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(400)
        .end(function (err, res) {
          if (err) {
            throw err;
          }

          res.body.should.not.have.property('_id');
          res.body.message.should.equal("incorrect syntax");
          done();
        });
    });

    it('should not correctly update a pedal, owner is missing', function (done) {
      var pedalBody = JSON.parse(JSON.stringify(pedalTemplate));
      delete pedalBody.owner;
      request(URL)
        .put(URL_PEDAL + id_created)
        .send(pedalBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(400)
        .end(function (err, res) {
          if (err) {
            throw err;
          }

          res.body.should.not.have.property('_id');
          res.body.message.should.equal("incorrect syntax");
          done();
        });
    });
  });

  /** ---------------------------------------------------------------------------------------
   *  Gestion du comportement de l'API
   *  --------------------------------------------------------------------------------------- */

  describe('Pedal API behaviour testing', function () {
    var id_created;
    var pedalTemplate = {
      name: "Ma pédale",
      description: "Celle de Tonton"
    };

    before(function (done) {
      pedalTemplate.owner = id_owner;
      request(URL)
        .post(URL_PEDAL)
        .send(pedalTemplate)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(201)
        .end(function (err, res) {
          if (err) {
            throw err;
          }

          res.body.should.have.property('_id');
          id_created = res.body._id;
          done();
        });
    });

    it('should not get a pedal which does not exists', function (done) {
      request(URL)
        .get(URL_PEDAL + "azeaze")
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(404)
        .end(function (err, res) {
          if (err) {
            throw err;
          }

          res.body.should.not.have.property('_id');
          res.body.message.should.equal("unknowned pedal");
          done();
        });
    });


    it('should not correctly create a pedal with an unexisting user', function (done) {
      var pedalBody = JSON.parse(JSON.stringify(pedalTemplate));
      pedalBody.owner = "azeazeazeaze";
      request(URL)
        .post(URL_PEDAL)
        .send(pedalBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(401)
        .end(function (err, res) {
          if (err) {
            throw err;
          }

          res.body.should.not.have.property('_id');
          res.body.message.should.equal("unauthorized");
          done();
        });
    });

    it('should not correctly update a pedal with an unexisting user', function (done) {
      var pedalBody = JSON.parse(JSON.stringify(pedalTemplate));
      pedalBody.owner = "azeazeazeaze";
      pedalBody.name = "Ma pédale modifiée";
      request(URL)
        .put(URL_PEDAL + id_created)
        .send(pedalBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(401)
        .end(function (err, res) {
          if (err) {
            throw err;
          }

          res.body.should.not.have.property('_id');
          res.body.message.should.equal("unauthorized");
          done();
        });
    });

    it('should not correctly delete a pedal with an unexisting user', function (done) {
      request(URL)
        .delete(URL_PEDAL + id_created)
        .send({user: "azeaze"})
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(401)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          console.log(res.body);
          res.body.should.not.have.property('_id');
          res.body.message.should.equal("unauthorized");
          done();
        });
    });
  });

  after(function (done) {
    // on drop la BD de test
    //mongoose.connection.db.dropDatabase(function (err, res) {
    //  console.log("\n" + err);
    //});

    // In our tests we use the dbsound_test
    mongoose.connection.close();
    done();
  });

});
