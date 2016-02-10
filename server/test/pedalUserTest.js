var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var winston = require('winston');

describe('Pedal User API test', function () {

  var URL = 'http://localhost:3001';
  var TEST_DB = 'dbsound_test';
  var URL_PEDAL_USER = '/users/';
  var URL_USER = '/api/users/';
  var URL_PEDAL = '/api/pedals/';

  var id_user;
  var id_pedal;

  // connection with the database
  before(function (done) {
    // In our tests we use the dbsound_test
    mongoose.connect('mongodb://localhost:27017/' + TEST_DB);

    var userBody = {
      username: "test_pedal_user_api",
      password: "alligator3",
      email: "test@test.fr"
    };
    var pedalBody = {
      name: "Ma pédale",
      description: "Celle de Tonton"
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
        id_user = res.body._id;
        pedalBody.owner = id_user;

        request(URL)
          .post(URL_PEDAL)
          .send(pedalBody)
          .expect('Content-type', 'application/json; charset=utf-8')
          .expect(201) //Status code created
          .end(function (err, res) {
            if (err) {
              throw err;
            }
            // recupere l'id du post
            id_pedal = res.body._id;
            done();
          });
      });
  });


  /** ---------------------------------------------------------------------------------------
   *  Test pour les Users de pedal
   *  --------------------------------------------------------------------------------------- */

  describe('Pedal Users API testing', function () {
    var pedalBody = {
      users: []
    };

    it('should correctly update users of a pedal', function (done) {
      pedalBody.user = id_user;
      pedalBody.users.push({_id : id_user});
      request(URL)
        .put(URL_PEDAL + id_pedal + URL_PEDAL_USER)
        .send(pedalBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200) //Status code created
        .end(function (err, res) {
          if (err) {
            throw err;
          }

          res.body.users.should.containDeep([{_id: id_user}]);
          done();
        });
    });

    it('should correctly get users of a pedal', function(done) {
      request(URL)
        .get(URL_PEDAL + id_pedal + URL_PEDAL_USER)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200) //Status code created
        .end(function (err, res) {
          if (err) {
            throw err;
          }

          res.body.should.containDeep([{_id: id_user}]);
          done();
        });
    });

    it('User should correctly have pedal in shared', function(done) {
      request(URL)
        .get(URL_USER + id_user)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200) //Status code created
        .end(function (err, res) {
          if (err) {
            throw err;
          }

          res.body.shared.should.containDeep([{_id: id_pedal}]);
          done();
        });
    });
  });

  /** ---------------------------------------------------------------------------------------
   *  Gestion du comportement de l'API
   *  --------------------------------------------------------------------------------------- */

  describe('Pedal users API behaviour testing', function () {
    var pedalBody = {
      users: []
    };

    it('should not correctly get users of a pedal which does not exist', function (done) {
      request(URL)
        .get(URL_PEDAL + "azeaze" + URL_PEDAL_USER)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(404) //Status code created
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // Should.js fluent syntax applied
          res.body.should.not.have.property('_id');

          res.body.message.should.equal("unknowed pedal");
          done();
        });
    });

    it('should not correctly set users with an unexisting user', function (done) {
      pedalBody.user = id_user;
      pedalBody.users.push({_id: "azeaze"});
      request(URL)
        .put(URL_PEDAL + id_pedal + URL_PEDAL_USER)
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
