$(document).ready(function(){
  module('String.score');

  test('score', function(){
    expect( 3 );
    equals("hello world".score("axl"), 0);
    equals("hello world".score("ow"), 0.6);
    equals("hello world".score("hello world"), 1);
  });
  

});