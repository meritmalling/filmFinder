var express = require('express');
var router = express.Router();
var request = require('request');
var db = require("../models");

router.post("/", function(req, res){
  var lookup = req.body.id;
  var commentText = req.body.comment;
    db.comment.create({
    favoriteId: lookup,
    comment: commentText
    }).then(function(comment){
        res.redirect('/favorites');
    });
});

module.exports = router;