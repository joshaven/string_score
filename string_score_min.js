 /*
  * string_score.js Javascript Plugin > Quicksilver Like Score
  * http://github.com/joshaven/string_score/tree/master
  *
  * Copyright (c) 2009 Joshaven Potter <yourtech@gmail.com>
  * Licensed under the MIT license.
  * http://www.opensource.org/licenses/mit-license.php
  *
  * Date: 2009-06-20
  * Version 1.0
  */
String.prototype.score=function(d){function e(a,b){var m=Math.min(a,b);if(m>-1)return m;return Math.max(a,b);}if(this==d)return 1.0;var f=[];var g=d.length;var h=this;var j=h.length;for(var i=0,k=g;i<k;i++){var location=e(h.indexOf(d.charAt(i).toLowerCase()),h.indexOf(d.charAt(i).toUpperCase()));if(location===-1)return 0;f.push(0.5);if(h.charAt(location)===d.charAt(i))f[f.length-1]+=0.1;if(location===0)f[f.length-1]+=0.4;if(h.charAt(location-1)==='\x20')f[f.length-1]+=0.4*Math.min(location,5);h=h.substring(location+1,j);}for(i=0,sum=0,l=g;i<l;i++)sum+=f[i];return sum/this.length;};