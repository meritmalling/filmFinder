var express = require('express');
var router = express.Router();
var request = require('request');
var db = require("../models");

var Film = function (title, year, rated, runtime, genre, director, writer, actors, plot, awards, year, rated, id, tomatoes, rating, poster){
this.title = title;
this.year = year;
this.rated = rated;
this.runtime = runtime;
this.genre = genre;
this.director = director;
this.writer = writer;
this.actors = actors;
this.plot = plot;
this.awards = awards;
this.year = year;
this.rated = rated;
this.tomatoes = tomatoes;
this.id = id;
this.rating = rating;
this.poster = poster;
};


router.get("/", function(req, res){
      res.render('films/index.ejs');
});

router.get("/home", function(req, res){
      res.render('films/home.ejs');
});

router.get("/results", function(req, res){
      var search = req.query.q;
      var url = ('http://www.omdbapi.com/?s=' + search);
      request(url, function(error, response, data) {
            var filmInfo = JSON.parse(data);
            var searchResults = filmInfo.Search;
            if (searchResults) {
                  res.render('films/results', { myFilms: searchResults});
            }
      });
});

router.get("/show/:id", function(req, res){
      var search = req.params.id;
      var url = 'http://www.omdbapi.com/?i=' + search + '&tomatoes=true';
      request(url, function(error, response, data) {
            var filmInfo = JSON.parse(data);
            var title = filmInfo.Title;
            var year = filmInfo.Year;
            var rated = filmInfo.Rated;
            var runtime = filmInfo.Runtime;
            var genre = filmInfo.Genre;
            var director = filmInfo.Director;
            var writer = filmInfo.Writer;
            var actors = filmInfo.Actors;
            var plot = filmInfo.Plot;
            var awards = filmInfo.Awards;
            var id = filmInfo.imdbID;
            var rating = filmInfo.imdbRating;
            var tomatoes = filmInfo.tomatoRating;
            var poster = filmInfo.Poster;
            var thisFilm = new Film(title, year, rated, runtime, genre, director, writer, actors, plot, awards, year, rated, id, tomatoes, rating, poster);
                  res.render('films/show.ejs', { myFilm: thisFilm });
        });
});

module.exports = router;