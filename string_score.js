// string_score - Quicksilver Like Score
// 
// This is a rewrite of A port of the Quicksilver string ranking algorithm.  
// Special thanks to 'Lachie Cox' for inspiration
// 
// "hello world".score("axl") //=> 0
// "hello world".score("ow")  //=> 0.18181818181818182 
//
// "hello world".score("h")           //=>0.09090909090909091
// "hello world".score("he")          //=>0.18181818181818182
// "hello world".score("hel")         //=>0.2727272727272727
// "hello world".score("hell")        //=>0.36363636363636365
// "hello world".score("hello")       //=>0.45454545454545453
// ...
// "hello world".score("helloworld")  //=>0.90909090909090913
// "hello world".score("hello worl")  //=>0.9090909090909091
// "hello world".score("hello world") //=> 1
//
// // Score is better when the strings are closer
// 'Hello'.score('h') //=>0.13999999999999999
// 'He'.score('h')    //=>0.35
//
// // Same case matches better then wrong case
// 'Hello'.score('h') //=>0.13999999999999999
// 'Hello'.score('H') //=>0.2
//
// The MIT License
// 
// Copyright (c) 2008 Joshaven Potter
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.


// String.prototype.score = function(abbreviation,offset) {
String.prototype.score = function(abbr) {
  
  // fix IE not responding to indexOf
  if(!String.newIndexOf){
    String.prototype.newIndexOf = function(str){
      for(var i=0,len=this.length; i<len; i++){
        if(this[i]==str) return i;
      }
    return -1;
    }
  }
  
  if(this == abbr) return 1.0;
  var scores = [];
  var abbr_length = abbr.length;
  var string=this;
  var string_length = string.length;

  for(var i=0,len=abbr_length;i<len;i++){ // Walk through abbreviation
    loc = string.indexOf(abbr[i]);
    if(loc > -1){ // proper case match
      scores = scores.concat(1.0);
      string = string.substring(loc,string_length); // left-trim up to the match
    } else {
      loc = string.indexOf(abbr[i].charFlopCase);
      if(loc > -1){
        scores = scores.concat(0.7);
        string = string.substring(loc,string_length); // left-trim up to the match
      } else {
        return 0
      }
    }
  }

  for(var i=0,sum=0,l=abbr_length;i<l;i++) sum+=scores[i];
  return sum/this.length;
};

String.prototype.charFlopCase = function(){ u = this.toUpperCase(this); return this === u ? this.toLowerCase(this) : u; }