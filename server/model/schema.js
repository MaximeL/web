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
  pedals: [{_id: {type: Schema.Types.ObjectId, ref: 'Pedals'}}],
  shared: [{_id: {type: Schema.Types.ObjectId, ref: 'Pedals'}, right: Boolean}]
}, {collection: 'users', versionKey: false});

var getUserSchema = function () {
  return Dao.model('Users', UserSchema);
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
      _id: {type: Schema.Types.ObjectId, ref: 'Users'},
      rate: Number
    }
  ],
  comments: [
    {
      _id: {type: Schema.Types.ObjectId, ref: 'Users'},
      comment: String
    }
  ],
  owner: {type: Schema.Types.ObjectId, ref: 'Users'},
  users: [
    {
      _id: {type: Schema.Types.ObjectId, ref: 'Users'},
      right: Boolean
    }
  ],
  design: {
    background: String,
    potar1: String,
    potar2: String,
    potar3: String,
    potar4: String
  }
}, {collection: 'pedals', versionKey: false});

var getPedaleSchema = function () {
  return Dao.model('Pedals', PedaleSchema);
};

exports.getUserSchema = getUserSchema;
exports.getPedaleSchema = getPedaleSchema;
