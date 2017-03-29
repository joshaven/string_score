/*!
 * string_score.js: String Scoring Algorithm 0.1.22
 *
 * http://joshaven.com/string_score
 * https://github.com/joshaven/string_score
 *
 * Free to use, modify, etc... see attached license for more info
 * Copyright (C) 2009-2015 Joshaven Potter <yourtech@gmail.com>
 * MIT License: http://opensource.org/licenses/MIT
 * Special thanks to all of the contributors listed here https://github.com/joshaven/string_score
 *
 * Updated: Tue Mar 10 2015
*/

/*jslint nomen:true, white:true, browser:true,devel:true */

/**
 * Scores a string against another string.
 *    'Hello World'.score('he');         //=> 0.5931818181818181
 *    'Hello World'.score('Hello');    //=> 0.7318181818181818
 */
String.prototype.score = function (word, fuzziness) {
  'use strict';

  // If the string is equal to the word, perfect match.
  if (this === word) { return 1; }

  //if it's not a perfect match and is empty return 0
  if (word === "") { return 0; }

  var runningScore = 0,
      charScore,
      finalScore,
      string = this,
      lString = string.toLowerCase(),
      strLength = string.length,
      lWord = word.toLowerCase(),
      wordLength = word.length,
      idxOf,
      startAt = 0,
      fuzzies = 1,
      fuzzyFactor,
      i;

  // Cache fuzzyFactor for speed increase
  if (fuzziness) { fuzzyFactor = 1 - fuzziness; }

  // Walk through word and add up scores.
  // Code duplication occurs to prevent checking fuzziness inside for loop
  if (fuzziness) {
    for (i = 0; i < wordLength; i+=1) {

      // Find next first case-insensitive match of a character.
      idxOf = lString.indexOf(lWord[i], startAt);

      if (idxOf === -1) {
        fuzzies += fuzzyFactor;
      } else {
        if (startAt === idxOf) {
          // Consecutive letter & start-of-string Bonus
          charScore = 0.7;
        } else {
          charScore = 0.1;

          // Acronym Bonus
          // Weighing Logic: Typing the first character of an acronym is as if you
          // preceded it with two perfect character matches.
          if (string[idxOf - 1] === ' ') { charScore += 0.8; }
        }

        // Same case bonus.
        if (string[idxOf] === word[i]) { charScore += 0.1; }

        // Update scores and startAt position for next round of indexOf
        runningScore += charScore;
        startAt = idxOf + 1;
      }
    }
  } else {
    for (i = 0; i < wordLength; i+=1) {
      idxOf = lString.indexOf(lWord[i], startAt);
      if (-1 === idxOf) { return 0; }

      if (startAt === idxOf) {
        charScore = 0.7;
      } else {
        charScore = 0.1;
        if (string[idxOf - 1] === ' ') { charScore += 0.8; }
      }
      if (string[idxOf] === word[i]) { charScore += 0.1; }
      runningScore += charScore;
      startAt = idxOf + 1;
    }
  }

  // Reduce penalty for longer strings.
  finalScore = 0.5 * (runningScore / strLength    + runningScore / wordLength) / fuzzies;

  if ((lWord[0] === lString[0]) && (finalScore < 0.85)) {
    finalScore += 0.15;
  }

  return finalScore;
};

/**
 * Gives back an array of indexes of the unique closest matches,
 * on a string array to a string.
 *    'Hello World'.closest(['el', 'll', 'o', 'll']); //=> [ 0, 1 ]
 */
String.prototype.closest = function (words, fuzziness, one2many) {
  'use strict';

  if (!Array.isArray(words) || words.length < 2) return -1; // Wrong usage

  var results = [], string = this;

  if (!one2many) // Default is compare many to one
    var scores = words.map(function(v){return string.score(v, fuzziness)});
  else
    var scores = words.map(function(v){return v.score(string, fuzziness)});
  var max = Math.max.apply(null, scores);

  // Check if the given word is already present among the results
  function unique(word) {
    for (var i = 0; i < results.length; i++)
      if (words[results[i]] == word)
        return false;
    return true;
  }

  // Generate results
  for (var i = 0; i < scores.length; i++)
    if (scores[i] == max && unique(words[i]))
      results.push(i);

  return results;
};
