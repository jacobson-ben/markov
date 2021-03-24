/** Command-line tool to generate Markov text. */

const { default: axios } = require("axios");
const fsP = require("fs/promises");
const { MarkovMachine } = require("./markov");
console.log(MarkovMachine);
async function printTextFile(path) {
  let contents;
  try {
    contents = await fsP.readFile(path, "utf8");
  } catch (err) {
    process.exit(1);
  }
  generateMarkov(contents);
}
async function printUrl(url) {
  let response;
  try {
    response = (await axios.get(url)).data;
  } catch (err) {
    console.log("Could not retrieve URL");
  }
  generateMarkov(response);
}

function generateMarkov(text) {
  let mm = new MarkovMachine(text);
  console.log(mm);
}

let argv = process.argv;
async function decideWhichFx() {
  if (argv[2] == "file") {
    await printTextFile(argv[3]);
  } else if (argv[2] == "url") {
    await printUrl(argv[3]);
  } else {
    console.log("An error occured");
    process.exit(1);
  }
}

module.export = {
  generateMarkov,
};

decideWhichFx();
