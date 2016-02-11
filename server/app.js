var express = require('express');
var app = express();
var cors = require('cors');
var path = require('path');
var bodyParser = require('body-parser');

var fileRoutes = require('./routes/fileApi');
var userRoutes = require('./routes/userApi');
var pedalRoutes = require('./routes/pedalApi');
var commentsApi = require('./routes/commentApi');


//pour version sans formulaire (permet l'acces à req.files.filefield) :
var busboyBodyParser = require('busboy-body-parser');

app.use(cors());

app.use(busboyBodyParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/file', fileRoutes);
app.use('/api/users', userRoutes);
app.use('/api/pedals', pedalRoutes);
app.use('/api/comments', commentsApi);

 //catch 404 and forward to error handler
 //app.use(function(req, res, next) {
 //    var err = new Error('Not Found');
 //    err.status = 404;
 //    next(err);
 //});

 //error handlers

 //development error handler
 //will print stacktrace
 //if (app.get('env') === 'development') {
 //    app.use(function(err, req, res, next) {
 //        res.status(err.status || 500);
 //        res.render('error', {
 //            message: err.message,
 //            error: err
 //        });
 //    });
 //}
 //
 //// production error handler
 //// no stacktraces leaked to user
 //app.use(function(err, req, res, next) {
 //    res.status(err.status || 500);
 //    res.render('error', {
 //        message: err.message,
 //        error: {}
 //    });
 //});

module.exports = app;
