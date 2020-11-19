/*
  Copyright (c) 2019, Domingo Martín Mancera, Hugo W.L. ter Doest (based on https://github.com/dmarman/lorca)

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/

// Afinn
const englishAfinnVoca = require("afinn-165");

// Senticon
const englishSenticonVoca = require("./English/senticon_en.json");

// Pattern
const englishPatternVoca = require("./English/pattern-sentiment-en.json");

// Negations
const englishNegations = require("./English/negations_en.json").words;


// Mapping from type of vocabulary to language to vocabulary
var languageFiles = {
  "afinn" : {
    "English": [englishAfinnVoca, englishNegations],
  },
  "senticon": {
    "English": [englishSenticonVoca, englishNegations],
  },
  "pattern": {
    "English": [englishPatternVoca, englishNegations],
  }
};


class SentimentAnalyzer {

  constructor(language, stemmer, type) {
    this.language = language;
    this.stemmer = stemmer;

    // this.vocabulary must be a copy of the languageFiles object
    // or in subsequent execution the polarity will be undefined
    // shallow copy - requires ES6
    this.vocabulary = Object.assign({}, languageFiles[type][language][0]);
    if (type === "senticon") {
      Object.keys(this.vocabulary).forEach(word => {
        this.vocabulary[word] = this.vocabulary[word].pol;
      });
    }
    else {
      if (type == "pattern") {
        Object.keys(this.vocabulary).forEach(word => {
          this.vocabulary[word] = this.vocabulary[word].polarity;
        });
        //console.log(JSON.stringify(this.vocabulary, null, 2));
      }
    }

    this.negations = [];
    if (languageFiles[type][language][1] != null) {
      this.negations = languageFiles[type][language][1];
    }

    if (stemmer) {
      var vocaStemmed = {};
      for(var token in this.vocabulary) {
            vocaStemmed[stemmer.stem(token)] = this.vocabulary[token];
      }
      this.vocabulary = vocaStemmed;
    }
  }

  // words is an array of words (strings)
  getSentiment(words) {
    var score = 0;
    var negator = 1;
    var nrHits = 0;

    words.forEach((token) => {
      var lowerCased = token.toLowerCase();
      if (this.negations.indexOf(lowerCased) > -1) {
        negator = -1;
        nrHits++;
      }
      else {
        // First try without stemming
        if (this.vocabulary[lowerCased] != undefined) {
          score += negator * this.vocabulary[lowerCased];
          nrHits++;
        }
        else {
          if (this.stemmer) {
            var stemmedWord = this.stemmer.stem(lowerCased);
            if(this.vocabulary[stemmedWord] != undefined) {
              score += negator * this.vocabulary[stemmedWord];
              nrHits++;
            }
          }
        }
      }
    });

    score = score / words.length;
    //console.log("Number of hits: " + nrHits);

    return score;
  }

}

module.exports = SentimentAnalyzer;
