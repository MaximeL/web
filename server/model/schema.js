/**
 * Created by Romain on 17/12/2015.
 */

var Dao = require('../model/dao').getDao();
var Schema = Dao.Schema;

/**
 * User
 */
var UserSchema = new Schema({
  username: {type: String, unique: true, required: true},
  email: String,
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
  name: String,
  description: String,
  effects: [
    {
      data: String
    }
  ],
  rating: [
    {
      _id: {type: Schema.Types.ObjectId, ref: 'User'},
      rate: Number
    }
  ],
  comments: [
    {
      _id: {type: Schema.Types.ObjectId, ref: 'User'},
      comment: String
    }
  ],
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  users: [
    {
      _id: {type: Schema.Types.ObjectId, ref: 'User'},
      right: Boolean
    }
  ]
}, {collection: 'pedale', versionKey: false});

var getPedaleSchema = function () {
  return Dao.model('Pedale', PedaleSchema);
};

exports.getUserSchema = getUserSchema;
exports.getPedaleSchema = getPedaleSchema;
