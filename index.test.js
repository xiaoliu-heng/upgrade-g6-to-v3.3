const fs = require("fs");
const { refactor_import } = require("./index");

let code = "";

beforeEach(() => {
  code = fs.readFileSync("./origin.tsx").toString();
});

afterEach(() => {
  code = "";
});

it("refactor import", () => {
  const result = refactor_import(code);
  console.log(result);
});
