/**
 * Created by Romain on 14/01/2016.
 */

var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var winston = require('winston');
//var config = require('./config-debug');


describe('Routing', function () {
  var url = 'http://localhost:3000';
  // within before() you can run all the operations that are needed to setup your tests. In this case
  // I want to create a connection with the database, and when I'm done, I call done().
  before(function (done) {
    // In our tests we use the test db
    mongoose.connect('mongodb://localhost:27017/dbsound');
    done();
  });
  // use describe to give a title to your test suite, in this case the tile is "Account"
  // and then specify a function in which we are going to declare all the tests
  // we want to run. Each test starts with the function it() and as a first argument
  // we have to provide a meaningful title for it, whereas as the second argument we
  // specify a function that takes a single parameter, "done", that we will use
  // to specify when our test is completed, and that's what makes easy
  // to perform async test!
  describe('Notes', function () {
    /*    it('should return error trying to save duplicate username', function(done) {
     var profile = {
     username: 'vgheri',
     password: 'test',
     firstName: 'Valerio',
     lastName: 'Gheri'
     };
     // once we have specified the info we want to send to the server via POST verb,
     // we need to actually perform the action on the resource, in this case we want to
     // POST on /api/profiles and we want to send some info
     // We do this using the request object, requiring supertest!
     request(url)
     .post('/api/profiles')
     .send(profile)
     // end handles the response
     .end(function(err, res) {
     if (err) {
     throw err;
     }
     // this is should.js syntax, very clear
     res.should.have.status(400);
     done();
     });
     });*/

    var id_created = null;
    var noteBody = {
      value: 3,
      username: 'Berd'
    };

    // TEST POST
    it('should correctly post a new note', function (done) {
      request(url)
        .post('/api/note/')
        .send(noteBody)
        .expect('Content-type',  'application/json; charset=utf-8')
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
      request(url)
        .get('/api/note/' + id_created)
        .expect('Content-type',  'application/json; charset=utf-8')
        .expect(200) //Status code success
        .end(function (err, res) {
          if(err) {
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
    it('should correctly update a note', function(done) {
      noteBody.username = 'Berd2';
      request(url)
        .put('/api/note/' + id_created)
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
    it('should correctly delete a note', function(done) {
      request(url)
        .delete('/api/note/' + id_created)
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
});
