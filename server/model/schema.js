/**
 * Created by Romain on 17/12/2015.
 */

var Dao = require('../model/dao').getDao();
var Schema = Dao.Schema;


/**
 * Comments
 */
//var CommentsSchema = new Schema({
//  username: String,
//  content: String
//}, {collection: 'comment', versionKey: false});
//
//var getCommentsSchema = function () {
//  return Dao.model('Comment', CommentsSchema);
//};


/**
 * Notes
 */
//var NotesSchema = new Schema({
//  username: String,
//  value: Number
//}, {collection: 'note', versionKey: false});
//
//var getNotesSchema = function () {
//  return Dao.model('Note', NotesSchema);
//};


/**
 * User
 */
var UserSchema = new Schema({
  username: { type : String , unique : true, required : true},
  password: String,
  pedals: [{type: Schema.Types.ObjectId, ref: 'Pedal'}],
  shared: [{_id: {type: Schema.Types.ObjectId, ref: 'Pedal'}, right: Boolean}]
}, {collection: 'user', versionKey: false});

var getUserSchema = function () {
  return Dao.model('User', UserSchema);
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
  ],
  notes: [
    {
      author: {type: Schema.Types.ObjectId, ref: 'User'},
      note: Number
    }
  ],
  comments: [
    {
      author: {type: Schema.Types.ObjectId, ref: 'User'},
      comment: String
    }
  ],
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  users: [{_id: {type: Schema.Types.ObjectId, ref: 'User'}, right: Boolean}]
}, {collection: 'pedale', versionKey: false});

var getPedaleSchema = function () {
  return Dao.model('Pedale', PedaleSchema);
};


//exports.getCommentsSchema = getCommentsSchema;
//exports.getNotesSchema = getNotesSchema;
exports.getUserSchema = getUserSchema;
exports.getPedaleSchema = getPedaleSchema;
