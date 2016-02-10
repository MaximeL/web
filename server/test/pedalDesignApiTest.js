/**
 * Created by Romain on 14/01/2016.
 */

var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var winston = require('winston');
//var config = require('./config-debug');


describe('Pedal Design API test', function () {

  var URL = 'http://localhost:3001';
  var TEST_DB = 'dbsound_test';
  var URL_PEDAL_DESIGN = '/design/';
  var URL_USER = '/api/users/';
  var URL_PEDAL = '/api/pedals/';

  var id_user;
  var id_pedal;

  // connection with the database
  before(function (done) {
    // In our tests we use the dbsound_test
    mongoose.connect('mongodb://localhost:27017/' + TEST_DB);

    var userBody = {
      username: "test_pedal_design_api",
      password: "alligator3",
      email: "test@test.fr"
    };
    var pedalBody = {
      name: "Ma pédale",
      description: "Celle de Tonton",
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
        pedalBody.user = id_user;

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
   *  Test pour les Design
   *  --------------------------------------------------------------------------------------- */

  describe('Design API testing', function () {
    var designBody = {
      background: "metal"
    };

    it('should correctly update a design (potar1)', function (done) {
      designBody.user = id_user;
      designBody.potar1 = "JSON Object Stringifié";
      request(URL)
        .put(URL_PEDAL + id_pedal + URL_PEDAL_DESIGN)
        .send(designBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200) //Status code created
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // Should.js fluent syntax applied
          res.body.should.have.property('_id');

          res.body.design.should.containDeep({background: designBody.background});
          res.body.design.should.containDeep({potar1: designBody.potar1});

          done();
        });
    });

    it('should correctly update a design (potar2)', function (done) {
      designBody.potar2 = "JSON Object Stringifié";
      request(URL)
        .put(URL_PEDAL + id_pedal + URL_PEDAL_DESIGN)
        .send(designBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200) //Status code created
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // Should.js fluent syntax applied
          res.body.should.have.property('_id');

          res.body.design.should.containDeep({background: designBody.background});
          res.body.design.should.containDeep({potar2: designBody.potar2});

          done();
        });
    });

    it('should correctly update a design (potar3)', function (done) {
      designBody.potar3 = "JSON Object Stringifié";
      request(URL)
        .put(URL_PEDAL + id_pedal + URL_PEDAL_DESIGN)
        .send(designBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200) //Status code created
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // Should.js fluent syntax applied
          res.body.should.have.property('_id');

          res.body.design.should.containDeep({background: designBody.background});
          res.body.design.should.containDeep({potar3: designBody.potar3});

          done();
        });
    });

    it('should correctly update a design (potar4)', function (done) {
      designBody.potar4 = "JSON Object Stringifié";
      request(URL)
        .put(URL_PEDAL + id_pedal + URL_PEDAL_DESIGN)
        .send(designBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200) //Status code created
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // Should.js fluent syntax applied
          res.body.should.have.property('_id');
          res.body.design.should.containDeep({background: designBody.background});
          res.body.design.should.containDeep({potar4: designBody.potar4});

          done();
        });
    });

    it('should correctly get a pedal\'s design', function (done) {
      request(URL)
        .get(URL_PEDAL + id_pedal + URL_PEDAL_DESIGN)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200) //Status code success
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // Should.js fluent syntax applied
          res.body.potar1.should.equal("JSON Object Stringifié");
          res.body.potar2.should.equal("JSON Object Stringifié");
          res.body.potar3.should.equal("JSON Object Stringifié");
          res.body.potar4.should.equal("JSON Object Stringifié");
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
  });

  /** ---------------------------------------------------------------------------------------
   *  Gestion du comportement de l'API
   *  --------------------------------------------------------------------------------------- */

  describe('Design API behaviour testing', function () {
    var designBody = {
      user: "azeaze",
      background: "metal"
    };

    it('should not correctly get a design of a pedal which does not exist', function (done) {
      request(URL)
        .get(URL_PEDAL + "azeaze" + URL_PEDAL_DESIGN)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(404) //Status code created
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // Should.js fluent syntax applied
          res.body.should.not.have.property('_id');

          res.body.message.should.equal("Pedal does not exist");
          done();
        });
    });

    it('should not correctly change design with an unexisting user', function (done) {
      request(URL)
        .put(URL_PEDAL + id_pedal + URL_PEDAL_DESIGN)
        .send(designBody)
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
