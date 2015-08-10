$(function(){
  // alert('hi');

  var rating =  parseInt(($('#js-rating').text()), 10)
  var filmStars = function(){
    for (var i = 0 ; i < rating; i++){
      $('#rating-div').append("<img id='star' src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Gold_Star.svg/2000px-Gold_Star.svg.png'>")
      }
    }

$( document ).ready(function() {
    filmStars();
});

});