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
  var URL_NOTE = '/api/note/';
  //var URL_COMMENT = '/api/comment/';

  // connection with the database
  before(function (done) {
    // In our tests we use the dbsound_test
    mongoose.connect('mongodb://localhost:27017/' + TEST_DB);
    done();
  });


  /** ---------------------------------------------------------------------------------------
   *  Test pour les Notes
   *  --------------------------------------------------------------------------------------- */

  describe('Note API testing', function () {

    var id_created = null;
    var noteBody = {
      value: 3,
      username: 'Berd'
    };

    // TEST POST
    it('should correctly post a new note', function (done) {
      request(URL)
        .post(URL_NOTE)
        .send(noteBody)
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
          res.body.value.should.equal(3);
          res.body.username.should.equal('Berd');
          //res.body.creationDate.should.not.equal(null);
          done();
        });
    });

    // TEST GET PAR ID
    it('should correctly get a note', function (done) {
      request(URL)
        .get(URL_NOTE + id_created)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200) //Status code success
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          res.body.should.have.property('_id');
          res.body._id.should.equal(id_created);
          res.body.value.should.equal(3);
          res.body.username.should.equal('Berd');
          done();
        });
    });

    // TEST PUT
    it('should correctly update a note', function (done) {
      noteBody.username = 'Berd2';
      request(URL)
        .put(URL_NOTE + id_created)
        .send(noteBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200) //Status code success
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // Should.js fluent syntax applied
          res.body.should.have.property('_id');
          res.body.username.should.equal('Berd2');
          done();
        });
    });

    // TEST DELETE
    it('should correctly delete a note', function (done) {
      request(URL)
        .delete(URL_NOTE + id_created)
        .send(noteBody)
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
   *  Test pour les Commentaires
   *  --------------------------------------------------------------------------------------- */
  describe('Comment API testing', function () {

    var id_created = null;
    var commentBody = {
      content: "Le commentaire de la mort qui tue tout",
      username: 'Berd'
    };

    // TEST POST
    it('should correctly post a new comment', function (done) {
      request(URL)
        .post(URL_COMMENT)
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
          res.body.content.should.equal('Le commentaire de la mort qui tue tout');
          res.body.username.should.equal('Berd');
          //res.body.creationDate.should.not.equal(null);
          done();
        });
    });

    //TEST GET PAR ID
    it('should correctly get a comment', function (done) {
      request(URL)
        .get(URL_COMMENT + id_created)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200) //Status code success
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          res.body.should.have.property('_id');
          res.body._id.should.equal(id_created);
          res.body.content.should.equal('Le commentaire de la mort qui tue tout');
          res.body.username.should.equal('Berd');
          done();
        });
    });

    // TEST PUT
    it('should correctly update a comment', function (done) {
      commentBody.content = 'Le commentaire de la mort qui tue vraiment tout';
      request(URL)
        .put(URL_COMMENT + id_created)
        .send(commentBody)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200) //Status code success
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // Should.js fluent syntax applied
          res.body.should.have.property('_id');
          res.body.content.should.equal('Le commentaire de la mort qui tue vraiment tout');
          done();
        });
    });

    // TEST DELETE
    it('should correctly delete a comment', function (done) {
      request(URL)
        .delete(URL_COMMENT + id_created)
        .send(commentBody)
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
   *  Test pour les Users
   *  --------------------------------------------------------------------------------------- */

  /** ---------------------------------------------------------------------------------------
   *  Test pour les Pedales
   *  --------------------------------------------------------------------------------------- */


});
