const { MarkovMachine } = require("./markov");

describe("make some text", function () {
  test("return markov text", function () {
    let chain = new MarkovMachine("hello world");
    expect(chain.chain).toEqual({
      hello: ["world"],
      world: [undefined],
    });
  });
});
