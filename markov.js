/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    // MORE CODE HERE
    this.chain = this.makeChains(words);
    this.string = this.getText();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains(words) {
    let obj = {};
    for (let i = 0; i < words.length; i++) {
      if (obj[words[i]]) {
        obj[words[i]].push(words[i + 1]);
      } else {
        obj[words[i]] = [words[i + 1]];
      }
    }
    return obj;
  }

  /** return random text from chains */

  getText(numWords = 100) {
    // MORE CODE HERE
    let startWordIdx = Math.floor(
      Math.random() * Object.keys(this.chain).length
    );
    let startWord = Object.keys(this.chain)[startWordIdx];

    let nextWordIdx = Math.floor(Math.random() * this.chain[startWord].length);
    let nextWord = this.chain[startWord][nextWordIdx];

    let string = startWord;
    let counter = 0;

    while (counter < numWords) {
      if (nextWord === undefined) {
        break;
      }
      string += ` ${nextWord}`;
      startWord = nextWord;
      nextWordIdx = Math.floor(Math.random() * this.chain[startWord].length);
      nextWord = this.chain[startWord][nextWordIdx];
      console.log("start word", startWord, "nextWord", nextWord);
      counter++;
    }
    return string;
  }
}

module.exports = { MarkovMachine };
