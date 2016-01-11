/**
 * Created by Romain on 17/12/2015.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dbName = 'dbsound';
var port = '27017';
mongoose.connect('mongodb://localhost:' + port + '/' + dbName);


/**
 * Comments
 */
var CommentsSchema = new Schema({
  username: String,
  content: String
}, {collection: 'comment', versionKey: false} );

var getCommentsSchema = function() {
  return mongoose.model('Comment', CommentsSchema);
};

exports.getCommentsSchema = getCommentsSchema;

/**
 * Notes
 */
var NotesSchema = new Schema({
  username: String,
  value: Number
}, {collection: 'note', versionKey: false} );

var getNotesSchema = function() {
  return mongoose.model('Note', NotesSchema);
};

exports.getNotesSchema = getNotesSchema;

/**
 * User
 */
var UserSchema = new mongoose.Schema({
  username: String,
  password: String
}, {collection: 'user', versionKey: false} );

var getUserSchema = function () {
  return mongoose.model('User', UserSchema);
};

exports.getUserSchema = getUserSchema;
