"use strict"; 

const fs = require('fs'),
      spawn = require('child_process').spawn,
      filename = process.argv[2];

if (!filename) {
  throw Error("A file to watch must be specified!");
}

fs.watch(filename, function() {
  // first param of spawn is the program name
  // second param is an array of command-line arguments.
  // object returned by spawn() is a ChildProcess
  let ls = spawn('ls', ['-lh', filename]);
  // stdin, stdout, and stderr properties are Streams 
  // that can be used to read or write data.
  // we send standard output from the child process directly
  // to our own standard output stream.
  ls.stdout.pipe(process.stdout);
});

console.log("Now watching " + filename + " for changes...");