/**
 * Created by Romain on 17/12/2015.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dbName = 'dbsound';
var port = '27017';
mongoose.connect('mongodb://localhost:' + port + '/' + dbName);

var CommentsSchema = new Schema({
  username: String,
  content: String
}, {collection: 'comment', versionKey: false} );

var getCommentsSchema = function() {
  return mongoose.model('Comment', CommentsSchema);
};

exports.getCommentsSchema = getCommentsSchema;
