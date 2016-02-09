var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var winston = require('winston');

describe('Pedal Comment API test', function () {

  var URL = 'http://localhost:3001';
  var TEST_DB = 'dbsound_test_comment';
  var URL_PEDAL_COMMENT = '/comments/';
  var URL_USER = '/api/users/';
  var URL_PEDAL = '/api/pedals/';

  var id_user;
  var id_pedal;

  // connection with the database
  before(function (done) {
    // In our tests we use the dbsound_test
    mongoose.connect('mongodb://localhost:27017/' + TEST_DB);

    var userBody = {
      username: "test",
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
        done();
      });
  });


  /** ---------------------------------------------------------------------------------------
   *  Test pour les Comments
   *  --------------------------------------------------------------------------------------- */

  describe('Comment API testing', function () {
    var id_created;
    var commentBody = {
      content: "Lorem ipsum"
    };

    it('should correctly add a comment', function (done) {
      commentBody.author = id_user;
      request(URL)
        .post(URL_PEDAL + id_pedal + URL_PEDAL_COMMENT)
        .send(commentBody)
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
          res.body.comments.should.containDeep(commentBody);
          done();
        });
    });

    it('should correctly get comments of a pedal', function(done) {
      request(URL)
        .get(URL_PEDAL + id_pedal + URL_PEDAL_COMMENT + id_created)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200) //Status code created
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // Should.js fluent syntax applied
          res.body.should.have.property('_id');
          // recupere l'id du post pour tester le get par id
          res.body._id.should.equal(commentBody.author);
          res.body.comment.should.equal(commentBody.content);
          done();
        });
    });
  });

  /** ---------------------------------------------------------------------------------------
   *  Gestion des erreurs pour les Comments
   *  --------------------------------------------------------------------------------------- */

  describe('Comment API syntax testing', function() {
    var commentTemplate = {
      author: id_user,
      content: "Lorem ipsum"
    };

    it('should not create a new comment, author is missing', function (done) {
      var commentBody = JSON.parse(JSON.stringify(commentTemplate));
      delete commentBody.author;
      request(URL)
        .post(URL_PEDAL + id_pedal + URL_PEDAL_COMMENT)
        .send(commentBody)
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

    it('should not create a new comment, content is missing', function (done) {
      var commentBody = JSON.parse(JSON.stringify(commentTemplate));
      delete commentBody.content;
      request(URL)
        .post(URL_PEDAL + id_pedal + URL_PEDAL_COMMENT)
        .send(commentBody)
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

  describe('Comment API behaviour testing', function () {
    var commentBody = {
      author: "azeaze",
      content: "Lorem ipsum"
    };

    it('should not correctly get a comments of a pedal which does not exist', function (done) {
      request(URL)
        .get(URL_PEDAL + id_pedal + URL_PEDAL_COMMENT)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(404) //Status code created
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // Should.js fluent syntax applied
          res.body.should.have.property('_id');

          res.body.message.should.equal("Pedal does not exist");
          done();
        });
    });

    it('should not correctly create a comment with an unexisting user', function (done) {
      request(URL)
        .post(URL_PEDAL + id_pedal + URL_PEDAL_COMMENT)
        .send(commentBody)
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
    mongoose.connection.db.dropDatabase(function (err, res) {
      console.log("\n" + err);
    });

    // In our tests we use the dbsound_test
    mongoose.connection.close();
    done();
  });

});
