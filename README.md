# What is it

* Simple - Adds a .score() method to the JavaScript String object... "String".score("str");
* Fast - fastest that I can find, often drastically faster... run the tests yourself
* Small - We are talking (431 bytes)
* Portable - Works in 100% of the browsers I've tested on multiple platforms
* Independent - Doesn't require any other JavaScript - should work with any framework.
* Tested - Not everyone writes tests (silly people). Testing using Qunit
* Proper - Passes jslint as well as meets the coding practices and principles of opinionated developers :-)

# Overview
This is production ready JavaScript which will score one string against another.

It began as a rewrite of a port of the Quicksilver string ranking algorithm (quicksilver.js aka qs_score.js). 
However, the final product only contains a few characters (if any still remain) from the original algorithm. 
The final product is much faster and has more features including scoring matched cases and first letters higher.

## Installation Notes
Simply include one of the string score JavaScript files and call the .score() method on any string.

This project contains many files but only one is required for use 
[string_score.uglify.js](https://github.com/joshaven/string_score/raw/master/string_score.uglify.js) 
is the smallest and thus is probably be the best choice.  jQuery and Qunit are used for testing purposes only.

# Examples: 
(results are for example only... I may change the scoring algorithm without updating examples)

    "hello world".score("axl") //=> 0  
    "hello world".score("ow")  //=> 0.18181818181818182  

    "hello world".score("h")           //=>0.09090909090909091  
    "hello world".score("he")          //=>0.18181818181818182  
    "hello world".score("hel")         //=>0.2727272727272727  
    "hello world".score("hell")        //=>0.36363636363636365  
    "hello world".score("hello")       //=>0.45454545454545453  
    ...
    "hello world".score("helloworld")  //=>0.90909090909090913  
    "hello world".score("hello worl")  //=>0.9090909090909091  
    "hello world".score("hello world") //=> 1  

    'Hello'.score('h') //=>0.13999999999999999  
    'He'.score('h')    //=>0.35  

    // Same case matches better then wrong case  
    'Hello'.score('h') //=>0.13999999999999999  
    'Hello'.score('H') //=>0.2  

    // Acronym are given more weight  
    "Hillsdale Michigan".score("HiMi") > "Hillsdale Michigan".score("Hills")
    "Hillsdale Michigan".score("Hillsd") >"Hillsdale Michigan".score("HiMi")



# Tested And Operational Under these environments

Fully functional in the 100% of the tested browsers:

* Firefox 3 & 3.5beta (Mac & Windows)
* Firefox 4.0beta (Mac)
* Safari 4 (Mac & Windows)
* Safari 5 (Mac)
* IE: 7 (Windows) **
* Chrome: 2 (Windows)
* Chrome: 9.0 (Mac)
* Opera: 9.64 (Windows)

** IE 7 fails (stop running this script message) with 4000 iterations 
of the benchmark test. All other browsers tested survived this test, 
and in fact survive a larger number of iterations.  The benchmark 
that is causing IE to choke is: 4000 iterations of 446 character 
string scoring a 70 character match.

# Benchmarks
This is the fastest and smallest javascript string scoring plugin 
that I am aware of.  I have taken great joy in squeezing every 
millisecond I can out of this script.  If you are aware of any 
ways to improve this script, please let me know.

string_score.js is faster and smaller then either liquidmetal.js & quicksilver.js

The test: 4000 iterations of 446 character string scoring a 70 character match

* string_score.js: 
  * Firefox 4 (240ms) 
  * Chrome 9 (273rems) 
  * Safari 5 (264ms)
* liquidmetal.js:  
  * Firefox 4 (805ms) 
  * Chrome 9 (345ms) 
  * Safari 5 (1003ms)
* quicksilver.js:  
  * Firefox 4 (2033ms) 
  * Chrome 9 (2769ms) 
  * Safari 5 (3269ms)
* fuzzy_string.js
  * Firefox 4 (OUCH! I am not sure it heats up my laptop and asks if I want to stop the script... fuzzy_string, nice idea but it doesn't like large strings matches.)

** Tests run with jQuery 1.5 on Mac Book Pro 2.4GHz Core 2 Duo running Snow Leopard
*** quicksilver & string_score both use the same test file because they are used in the 
same way, LiquidMetal has to be called differently so the test file was modified to work
with the LiquidMetal Syntax.


# Notes
string_score.js does not have any external dependencies 
other then a reasonably new browser.

The tests located in the tests folder relies the files 
located in the tests folder.

Please share your testing results with me if you are 
able to test under an unlisted browser.

# Credits
Thank you Lachie Cox and Quicksilver for inspiration.

Copyright (C) 2009-2011 [Joshaven Potter](mailto:yourtech@gmail.com)  
Copyright (C) 2010-2011 [Yesudeep Mangalapilly](mailto:yesudeep@gmail.com)  

Special Thanks to Yesudeep Mangalapilly for further optimizations and
establishing the build environment so we can keep the files in sync.

Licensed under the [MIT license](http://www.opensource.org/licenses/mit-license.php).


# TODO
- Add configuration parameters to control scoring weights.
- Update tests to all have messages and sync tests to compairsons
- Update tests to be more story like to ensure good coverage.
