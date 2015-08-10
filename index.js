var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');

require('express-helpers')(app);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(ejsLayouts);

// var filmsController = require('./controller/films');
// app.use('/films', filmsController);

app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
  res.render('films/index.ejs');
});

app.get("/home", function(req, res){
  res.render('films/home.ejs');
});

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
  this.poster = poster
}

app.get("/favorites", function(req, res){
  res.render('favorites/index.ejs');
})

app.get("/", function(req, res){
  res.render('films/index.ejs');
})

app.get("/results", function(req, res){
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

app.get("/show/:id", function(req, res){
  var search = req.params.id
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
    var id = filmInfo.imdbID
    var rating = filmInfo.imdbRating;
    var tomatoes = filmInfo.tomatoRating
    var poster = filmInfo.Poster
    var thisFilm = new Film(title, year, rated, runtime, genre, director, writer, actors, plot, awards, year, rated, id, tomatoes, rating, poster);
    console.log(rating)
    res.render('films/show.ejs', { myFilm: thisFilm })
  });
});

app.listen(3000);