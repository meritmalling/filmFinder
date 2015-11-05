var express = require('express');
var router = express.Router();
var request = require('request');
var db = require("../models");

router.get("/", function(req, res){
  db.favorite.findAll().then(function(favorites) {
    res.render('favorites/index', {myFavorites: favorites});
  });
});

router.post("/", function(req, res){
  db.favorite.findOrCreate({where:
  {imdbId: req.body.id, title: req.body.title, year: req.body.year, poster: req.body.poster}}).spread(function(aFavorite, created){
      res.redirect('/favorites');
  }).catch(function(error){
      res.render('Sorry, favorite not found.');
  });
});

router.get("/show/:id", function(req, res){
  var lookup = req.params.id;
    db.favorite.find({where: {imdbId: lookup}}).then(function(favorite) {
      var thisId = favorite.id;
        db.comment.findAll({where: {favoriteId: thisId}}).then(function(comments){
          res.render('favorites/show', {
          myFavorite: favorite,
          myComments: comments
          });
    });
  });
});

router.get('/:id/tags/new', function(req, res) {
  var thisId = req.params.id;
    db.favorite.find({
      where: {imdbId: thisId},
      include: [db.tag]
    }).then(function(favorite) {
        res.render('tags/new', {myFavorite: favorite});
    });
});

router.post('/:id/tags', function(req, res) {
  var newTag = req.body.tagName;
  var favoriteId = req.params.id;
  db.favorite.find({where: {imdbId: favoriteId}}).then(function(favorite) {
    db.tag.findOrCreate({where: {name: newTag}}).spread(function(tag, created) {
      favorite.addTag(tag).then(function() {
        res.redirect('/favorites/'+ favoriteId+'/tags/new/');
      });
    });
  });
});

router.get('/tags/', function(req, res) {
  db.tag.findAll().then(function(tags) {
    res.render('tags/index', {myTags: tags});
  });
});

router.get('/tags/:id', function(req, res) {
  var thisId = req.params.id;
    db.tag.find({
      where: {id: thisId},
      include: [db.favorite]
    }).then(function(tag) {
        res.render('tags/show', {myTag: tag});
    });
});


module.exports = router;