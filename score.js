/*!
 * string_score.js: Quicksilver-like string scoring algorithm.
 *
 * Copyright (C) 2009-2011 Joshaven Potter <yourtech@gmail.com>
 * Copyright (C) 2010-2011 Yesudeep Mangalapilly <yesudeep@gmail.com>
 * MIT license: http://www.opensource.org/licenses/mit-license.php
 */String.prototype.score = function(abbreviation) {
  var abbreviation_length, abbreviation_score, c, character_score, final_score, i, index_c_lowercase, index_c_uppercase, index_in_string, min_index, should_award_common_prefix_bonus, string, string_length, total_character_score, _len;
  string = this;
  if (string === abbreviation) {
    return 1.0;
  }
  string_length = string.length;
  total_character_score = 0;
  should_award_common_prefix_bonus = 0;
  for (i = 0, _len = abbreviation.length; i < _len; i++) {
    c = abbreviation[i];
    index_c_lowercase = string.indexOf(c.toLowerCase());
    index_c_uppercase = string.indexOf(c.toUpperCase());
    min_index = Math.min(index_c_lowercase, index_c_uppercase);
    index_in_string = min_index > -1 ? min_index : Math.max(index_c_lowercase, index_c_uppercase);
    if (index_in_string === -1) {
      return 0;
    }
    character_score = 0.1;
    if (string[index_in_string] === c) {
      character_score += 0.1;
    }
    if (index_in_string === 0) {
      character_score += 0.8;
      if (i === 0) {
        should_award_common_prefix_bonus = 1;
      }
    }
    if (string.charAt(index_in_string - 1) === ' ') {
      character_score += 0.8;
    }
    string = string.substring(index_in_string + 1, string_length);
    total_character_score += character_score;
  }
  abbreviation_length = abbreviation.length;
  abbreviation_score = total_character_score / abbreviation_length;
  final_score = ((abbreviation_score * (abbreviation_length / string_length)) + abbreviation_score) / 2;
  if (should_award_common_prefix_bonus && (final_score + 0.1 < 1)) {
    final_score += 0.1;
  }
  return final_score;
};