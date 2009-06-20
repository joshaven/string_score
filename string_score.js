/*
 * string_score.js - Quicksilver Like Score
 * 
 * This javascript will score a string against another string. It began as a rewrite of A port of the 
 * Quicksilver string ranking algorithm (quicksilver.js aka qs_score.js).  The final product only
 * contains a few characters from the original algorithm
 *
 * Special thanks to 'Lachie Cox' for inspiration
 * 
 * Examples: (results are for example only... I may change the scoring algorithm without updating examples)
 * "hello world".score("axl") //=> 0
 * "hello world".score("ow")  //=> 0.14545454545454548
 * "hello world".score("hello world") //=> 1
 *
 *
 * The MIT License
 * 
 * Copyright (c) 2009 Joshaven Potter <yourtech@gmail.com>
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
*/

String.prototype.score = function(abbr) {
  function lowestValidIndex(a,b){ var min=Math.min(a,b); if(min>-1)return min; return Math.max(a,b); }
  if(this == abbr) return 1.0;
  var scores = [];
  var abbr_length = abbr.length;
  var string=this;
  var string_length = string.length;

  for(var i=0,len=abbr_length;i<len;i++){ // Walk through abbreviation
    // var match_char = abbr.charAt(i);
    
    // find the first case insensitive match of a charactor
    var location = lowestValidIndex(string.indexOf(abbr.charAt(i).toLowerCase()), string.indexOf(abbr.charAt(i).toUpperCase()));

    if(location === -1) return 0; // Bail out if no match is found
    
    scores.push(0.5); // set base score

    // case bonus
    if(string.charAt(location)===abbr.charAt(i)) scores[scores.length-1]+=0.1;
    
    // Consecutive Letter Bonus
    // increate the score when matching first char of string OR when matching first letter of a word
    if(location===0) scores[scores.length-1]+=0.4;
    
    // Acronym Bonus
    // Weighting Logic: Typeing the first letter of an acronym is at most as if you preceeded it by two perfect letter matches
    if(string.charAt(location-1)===' ')
      scores[scores.length-1] += 0.4 * Math.min(location, 5); // cap bonus at 0.4 * 5  
      
    // Left Trim the already matched part of the string (forces sequential matches)
    string = string.substring(location+1 ,string_length); 
  }

  for(i=0,sum=0,l=abbr_length;i<l;i++) sum+=scores[i];
  return sum/this.length;
};
