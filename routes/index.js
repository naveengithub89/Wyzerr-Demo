var _ = require("lodash");
var express = require('express');
var router = express.Router();
var db = require('../db');
var ObjectId = require('mongodb').ObjectID;

//Handles the root route
router.get('/', function(req, res) {
    res.render('home',
    {
         dev:GLOBAL.dev,
         layout:'layout'
    });
});

//Handles the /managemovies route
router.get('/managemovies', function(req, res) {
    //res.json({Name : "Naveen"});
    res.render('managemovies',
    {
         dev:GLOBAL.dev,
         layout:'movieslayout',
         apiServer : 'index'
    });

    //console.log("Entered this function");
});

//Handles the /About route
router.get('/About', function(req, res) {

    res.render('about',
    {
         dev:GLOBAL.dev,
         layout:'aboutlayout',
         apiServer : 'index'
    });
});

//Handles the /readMovies route
router.get('/readMovies', function(req, res) {
     try {
            var collection = db.get().collection('Movies');
            if (!collection)
            {
              	db.createCollection("Movies", function(err, collection){
              	   if (err) throw err;
              	var collection = db.get().collection('Movies');
                 })
            }

            collection.find().toArray(function(err, Movies) {

                var data={};
                var movieList = [];
                if (err) {
                    console.log(err);
                    res.status(500).send(sprintf('Error when trying to read Movies <br>Error message %s',
                        err));
                } else {
                            var intCount = Movies.length;
                            for (var i=0;i<intCount;i++)
                            {
                              movieList.push(Movies[i]);

                            }
                }
                data.movies = movieList;
                res.json(data);
            })
        } catch (e) {
            res.json("no movies");
        }
});

//Handles the add Movie Route
router.post('/addMovie', function(req, res,next) {

           res.set({
                   'Access-Control-Allow-Origin': '*'
               });
            var query = req.body.inputDoc;
            var collection = db.get().collection('Movies');
            if (!collection)
            {
              	db.createCollection("Movies", function(err, collection){
              	   if (err) throw err;
              	var collection = db.get().collection('Movies');
                })
            }

            collection.insertOne( query,function(err) {

                if (err) {
                    res.send(sprintf('Error when trying to create Movie <br>Error message %s',
                        err));
                } else {

                    res.send('OK');
                }
            })
});

//Handles the delete movie route
router.post('/deleteMovie', function(req, res,next) {

           res.set({
                   'Access-Control-Allow-Origin': '*'
               });
            var _id = req.body._id;
            var collection = db.get().collection('Movies');
               collection.remove({"_id": ObjectId(_id)}, function(err, result){
                if (err) {
                          res.send(sprintf('Error when trying to delete Movie <br>Error message %s',
                         err));
                 } else {
                         res.send('OK');
                 }


               });
});

module.exports = router;
