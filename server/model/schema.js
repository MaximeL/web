/**
 * Created by Romain on 17/12/2015.
 */

var Dao = require('../model/dao').getDao();
var Schema = Dao.Schema;


/**
 * Comments
 */
var CommentsSchema = new Schema({
  username: String,
  content: String
}, {collection: 'comment', versionKey: false} );

var getCommentsSchema = function() {
  return Dao.model('Comment', CommentsSchema);
};


/**
 * Notes
 */
var NotesSchema = new Schema({
  username: String,
  value: Number
}, {collection: 'note', versionKey: false} );

var getNotesSchema = function() {
  return Dao.model('Note', NotesSchema);
};


/**
 * User
 */
var UserSchema = new Schema({
  username: String,
  password: String
}, {collection: 'user', versionKey: false} );

var getUserSchema = function () {
  return Dao.model('User', UserSchema);
};

/**
 * Pedale
 */
var PedaleSchema = new Schema({
    type: String,
    precedent: String,
    suivant: String
}, {collection: 'pedale', versionKey: false} );

var getPedaleSchema = function() {
    return Dao.model('Pedale', PedaleSchema);
};


exports.getCommentsSchema = getCommentsSchema;
exports.getNotesSchema = getNotesSchema;
exports.getUserSchema = getUserSchema;
exports.getPedaleSchema = getPedaleSchema;
