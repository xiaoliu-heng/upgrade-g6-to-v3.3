#!/usr/bin/env node

const yargs = require("yargs");
const glob = require("glob");
const $ = require("gogocode");
const refactor = require("../index");

const options = yargs
  .usage("Usage: up2g6v33 -f <glob file paths>")
  .option("f", {
    alias: "files",
    describe: "Refactor files",
    type: "string",
    demandOption: true,
  }).argv;

glob(options.files, function (err, files) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`You select ${files.length} files. refactoring...`);
  files.forEach(function (file) {
    rewrite(file);
  });
});

function rewrite(filePath) {
  const code = $.loadFile(filePath);
  let newCode = "";

  console.log(refactor);

  for (const r in refactor) {
    if (Object.hasOwnProperty.call(refactor, r)) {
      newCode = refactor[r](code);
    }
  }

  $.writeFile(newCode, filePath);
}
