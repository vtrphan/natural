/*
  Copyright (c) 2019, Hugo W.L. ter Doest

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

var natural = require("../lib/natural");
var Analyzer = require("../lib/natural/sentiment/SentimentAnalyzer");

var testConfigurations = [
  {
    "language": "English",
    "stemmer": "PorterStemmer",
    "vocabularyType": "afinn",
    "testSentences": [
      {"sentence": "So is Gemini a joke, you ask? You're never sure whether Andrew Reed's cinematography is straight borrowing from Michael Mann's cool-blue visuals from Heat or mocking the sort of Angelenos that would watch that heist film and see nothing but a decor schematic for every single interior. Or, for that matter, whether composer Keegan DeWitt's is parodying the sax-heavy scores of Skinemax thrillers past or simply copying one in between icy techno interludes. The fact that the performers, especially the exceptional Kirke, keep their tongues firmly planted in their cheeks helps ground things, as does the fact that the jabs are featherweight enough to pass as shrugs. It may feel insubstantial at times, but somewhere out there, there's a twin of this film that lays on the L.A. Self-Owns Itself mojo in thick clumps. Gemini is the good-sibling version. It's worth a whirl.", "score": -0.027972027972027972},
      {"sentence": "Sadly, stereotypes are this film’s stock in trade. Is Melinda a victim or a warrior or just batshit crazy? The movie can't or won’t decide. Taraji will rise again, she always does. But enduing a full 120 minutes of this shitstorm takes its toll. Bitterness, anger, malice, bad blood – that’s acrimony, baby. And that's what you'll feel if you blow the price of ticket on this hack job.", "score": -0.10144927536231885},
      {"sentence": "But as soon as Vic decides to hit the road to Knoxville, his birthplace, sentiment infects the film like a virus. Writer-director Adam Rifkin clearly has affection for his star, but he's put him in a leaky vehicle that sinks way before the journey ends. Sam Elliott handled a similar role with more style, emotion and dramatic heft in last year's The Hero. But Reynolds, let's not forget, really is a movie star. And a great one. The pleasure of his company is still an exuberant gift. He deserves more than an opportunity missed.", "score": -0.06382978723404255},
      {"sentence": "Sadly, stereotypes are this film’s stock in trade. Is Melinda a victim or a warrior or just batshit crazy? The movie can't or won’t decide. Taraji will rise again, she always does. But enduing a full 120 minutes of this shitstorm takes its toll. Bitterness, anger, malice, bad blood – that’s acrimony, baby. And that's what you'll feel if you blow the price of ticket on this hack job.", "score": -0.10144927536231885},
      {"sentence": "G-Eazy released his expansive third album, The Beautiful & Damned, in December with hit singles \"No Limit\" and \"Him & I.\" The album featured guest appearances from Cardi B, A$AP Rocky, Charlie Puth and Halsey, and debuted at Number Three on the Billboard 200.", "score": 0.06818181818181818}
    ]
  },
  {
    "language": "English",
    "stemmer": "PorterStemmer",
    "vocabularyType": "senticon",
    "testSentences": [
      {"sentence": "So is Gemini a joke, you ask? You're never sure whether Andrew Reed's cinematography is straight borrowing from Michael Mann's cool-blue visuals from Heat or mocking the sort of Angelenos that would watch that heist film and see nothing but a decor schematic for every single interior. Or, for that matter, whether composer Keegan DeWitt's is parodying the sax-heavy scores of Skinemax thrillers past or simply copying one in between icy techno interludes. The fact that the performers, especially the exceptional Kirke, keep their tongues firmly planted in their cheeks helps ground things, as does the fact that the jabs are featherweight enough to pass as shrugs. It may feel insubstantial at times, but somewhere out there, there's a twin of this film that lays on the L.A. Self-Owns Itself mojo in thick clumps. Gemini is the good-sibling version. It's worth a whirl.", "score": -0.02696503496503496},
      {"sentence": "Sadly, stereotypes are this film’s stock in trade. Is Melinda a victim or a warrior or just batshit crazy? The movie can't or won’t decide. Taraji will rise again, she always does. But enduing a full 120 minutes of this shitstorm takes its toll. Bitterness, anger, malice, bad blood – that’s acrimony, baby. And that's what you'll feel if you blow the price of ticket on this hack job.", "score": 0.037159420289855076},
      {"sentence": "But as soon as Vic decides to hit the road to Knoxville, his birthplace, sentiment infects the film like a virus. Writer-director Adam Rifkin clearly has affection for his star, but he's put him in a leaky vehicle that sinks way before the journey ends. Sam Elliott handled a similar role with more style, emotion and dramatic heft in last year's The Hero. But Reynolds, let's not forget, really is a movie star. And a great one. The pleasure of his company is still an exuberant gift. He deserves more than an opportunity missed.", "score": 0.009042553191489356},
      {"sentence": "Sadly, stereotypes are this film’s stock in trade. Is Melinda a victim or a warrior or just batshit crazy? The movie can't or won’t decide. Taraji will rise again, she always does. But enduing a full 120 minutes of this shitstorm takes its toll. Bitterness, anger, malice, bad blood – that’s acrimony, baby. And that's what you'll feel if you blow the price of ticket on this hack job.", "score": 0.037159420289855076},
      {"sentence": "G-Eazy released his expansive third album, The Beautiful & Damned, in December with hit singles \"No Limit\" and \"Him & I.\" The album featured guest appearances from Cardi B, A$AP Rocky, Charlie Puth and Halsey, and debuted at Number Three on the Billboard 200.", "score": 0.04025},
      
    ]
  },
  {
    "language": "English",
    "stemmer": "PorterStemmer",
    "vocabularyType": "pattern",
    "testSentences": [
      {"sentence": "So is Gemini a joke, you ask? You're never sure whether Andrew Reed's cinematography is straight borrowing from Michael Mann's cool-blue visuals from Heat or mocking the sort of Angelenos that would watch that heist film and see nothing but a decor schematic for every single interior. Or, for that matter, whether composer Keegan DeWitt's is parodying the sax-heavy scores of Skinemax thrillers past or simply copying one in between icy techno interludes. The fact that the performers, especially the exceptional Kirke, keep their tongues firmly planted in their cheeks helps ground things, as does the fact that the jabs are featherweight enough to pass as shrugs. It may feel insubstantial at times, but somewhere out there, there's a twin of this film that lays on the L.A. Self-Owns Itself mojo in thick clumps. Gemini is the good-sibling version. It's worth a whirl.", "score": -0.007692307692307693},
      {"sentence": "Sadly, stereotypes are this film’s stock in trade. Is Melinda a victim or a warrior or just batshit crazy? The movie can't or won’t decide. Taraji will rise again, she always does. But enduing a full 120 minutes of this shitstorm takes its toll. Bitterness, anger, malice, bad blood – that’s acrimony, baby. And that's what you'll feel if you blow the price of ticket on this hack job.", "score": -0.010144927536231883},
      {"sentence": "But as soon as Vic decides to hit the road to Knoxville, his birthplace, sentiment infects the film like a virus. Writer-director Adam Rifkin clearly has affection for his star, but he's put him in a leaky vehicle that sinks way before the journey ends. Sam Elliott handled a similar role with more style, emotion and dramatic heft in last year's The Hero. But Reynolds, let's not forget, really is a movie star. And a great one. The pleasure of his company is still an exuberant gift. He deserves more than an opportunity missed.", "score": -0.026595744680851064},
      {"sentence": "Sadly, stereotypes are this film’s stock in trade. Is Melinda a victim or a warrior or just batshit crazy? The movie can't or won’t decide. Taraji will rise again, she always does. But enduing a full 120 minutes of this shitstorm takes its toll. Bitterness, anger, malice, bad blood – that’s acrimony, baby. And that's what you'll feel if you blow the price of ticket on this hack job.", "score": -0.010144927536231883},
      {"sentence": "G-Eazy released his expansive third album, The Beautiful & Damned, in December with hit singles \"No Limit\" and \"Him & I.\" The album featured guest appearances from Cardi B, A$AP Rocky, Charlie Puth and Halsey, and debuted at Number Three on the Billboard 200.", "score": 0.022727272727272728}      
    ]
  },
];

describe("The sentiment analyzer analyzes the sentiment of sentences in multiple languages using different types of vocabularies", function() {
  testConfigurations.forEach(config => {
    it("Should analyze a set of sentences with each configuration " +
      "("  + config.language + ", " + config.vocabularyType + ", " + (config.stemmer ? config.stemmer : "without stemmer") + ")", function() {
      var stemmer = null;
      // Create the stemmer
      if (config.stemmer != "") {
        stemmer = natural[config.stemmer];
      }
      // Create analyzer
      var analyzer = new Analyzer(config.language, stemmer, config.vocabularyType);

      config.testSentences.forEach(sentencePlusScore => {
        var words = sentencePlusScore.sentence.split(/\s+/);
        var score = analyzer.getSentiment(words);
        expect(score).toEqual(sentencePlusScore.score);
        if (score != sentencePlusScore.score) {
          console.log(sentencePlusScore.sentence + "\t" + score);
        }
      });

    });
  });
});
