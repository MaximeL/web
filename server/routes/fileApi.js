var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var fs = require('fs');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
//si utilisation d'un formulaire pour uploader fichier:
var formidable = require('formidable');


// ---------------------------
// Middleware for all requests
// ---------------------------
router.use(function(req, res, next) {
	  console.log('Middleware called.');
	  // allows requests from angularJS frontend applications
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next(); // go to the next route
});


// ---------------------------
// POST > Route ➜ /api/file
// ---------------------------
router.post('/', function(req, res) {

    var fileToSave = req.files.filefield;    // champ à renseigner
    // console.log("Contenu du fichier \n" + fileToSave);

    // on cree une connexion avec la BD
    var conn = mongoose.createConnection('localhost', 'dbsound', 27017);

    // check les erreurs
    conn.on('error', function(err){
        if(err) {
          console.log(err);
          return;
        }
    });

    // enregistrement du ficher via la connexion
    conn.once('open', function() {
        var gfs = Grid(conn.db);

        var writeStream = gfs.createWriteStream({
            filename: fileToSave.name,
            mode: 'w',
            content_type: fileToSave.mimetype
        });

        writeStream.on('close', function() {
            return res.status(200).send({
               message: 'Upload success'
            });
        });

        writeStream.write(fileToSave.data);
        writeStream.end();
    });
});


// -------------------------------
// POST > Route ➜ /api/form/file
// commenter line 8 et 9 de app.js
// 	  busboyBodyParser
// -------------------------------
router.post('/form/', function(req, res) {

    var form = new formidable.IncomingForm();
    // stockage en local aussi
    form.uploadDir = __dirname + "/data";
    form.keepExtensions = true;

    form.parse(req, function(err, fields, files) {
        if (!err) {
            console.log('File uploaded : ' + files.file.path);
            console.log('File name: ' 	   + files.file.name);
            console.log('File type: ' 	   + files.file.type);
            console.log('File size: ' 	   + files.file.size);

            Grid.mongo = mongoose.mongo;
            var conn = mongoose.createConnection('localhost', 'dbsound', 27017);

            conn.once('open', function () {
                var gfs = Grid(conn.db);
                var writeStream = gfs.createWriteStream({
                    filename: files.file.name
                });
                fs.createReadStream(files.file.path).pipe(writeStream);
            });
        }
    });

    form.on('end', function() {
        res.send('Completed ...');
    });
});


// -------------------------------
// GET > Route ➜ /api/file/:fileid
// -------------------------------
router.get('/:fileid', function(req, res) {

    // on cree une connexion avec la BD
    var conn = mongoose.createConnection('localhost', 'dbsound', 27017);

    // check les erreurs
    conn.on('error', function(err){
        if(err) {
            console.log(err);
            return;
        }
    });

    // recupere le ficher via la connexion
    conn.once('open', function() {
        var gfs = Grid(conn.db);
        gfs.findOne({ _id: req.params.fileid }, function(err, file) {
            if(err) return res.status(400).send(err);
            if(!file) return res.status(404).send(err);

            res.set('Content-Type', file.contentType);
            res.set('Content-Disposition', 'attachment; filename="' + file.filename + '"');

            var readStream = gfs.createReadStream({
                _id: file._id
                // mode: 'r'
            });

            readStream.on('error', function(err) {
                console.log('Error while processing stream' + err);
                throw err;
            });

            readStream.pipe(res);
        });
    });
});


// ---------------------------
// Pour utilisation via form
// GET > Route ➜ /api
// ---------------------------
router.get('/', function(req, res){
    res.send(
        '<form method="post" action="/api/file/form" enctype="multipart/form-data">'
        + '<input type="file" id="file" name="file"><br/>'
        + '<input type="submit" value="submit">'
        + '</form>'
        );
});


module.exports = router;
