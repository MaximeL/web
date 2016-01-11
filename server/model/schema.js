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


/**
 * User
 */
var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  pedals: [{type: Schema.Types.ObjectId, ref: 'Pedal' }]
  //rights: [{uid: Schema.Types.ObjectId}]
}, {collection: 'user', versionKey: false} );

var getUserSchema = function () {
  return mongoose.model('User', UserSchema);
};

/**
 * Pedale
 */
var PedaleSchema = new Schema({
    nom: String,
    description: String,
    effets: [
      {
        type: String,
        precedent: String,
        suivant: String
      }
    ]
}, {collection: 'pedale', versionKey: false} );

var getPedaleSchema = function() {
    return mongoose.model('Pedale', PedaleSchema);
};


exports.getCommentsSchema = getCommentsSchema;
exports.getNotesSchema = getNotesSchema;
exports.getUserSchema = getUserSchema;
exports.getPedaleSchema = getPedaleSchema;
