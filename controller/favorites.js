var express = require('express');
var router = express.Router();
var request = require('request');
var db = require("../models");

router.get("/", function(req, res){
      db.favorite.findAll().then(function(favorites) {
            res.render('favorites/index.ejs', {myFavorites: favorites});
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
      var lookup = req.params.id
            db.favorite.find({where: {imdbId: lookup}}).then(function(favorite) {
                  var thisId = favorite.id
                  db.comment.findAll({where: {favoriteId: thisId}}).then(function(comments){
                        res.render('favorites/show.ejs', {
                        myFavorite: favorite,
                        myComments: comments
                        });
                  });
      });
});

module.exports = router;