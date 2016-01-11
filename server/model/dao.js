/**
 * Created by Romain on 11/01/2016.
 */

var mongoose = require('mongoose');

var dbName = 'dbsound';
var port = '27017';

var getDao = function() {
  return mongoose.connect('mongodb://localhost:' + port + '/' + dbName);
};

exports.getDao = getDao;
