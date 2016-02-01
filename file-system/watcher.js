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
  let ls = spawn('ls', ['-lh', filename]),
      output = '';
  
  // stdin, stdout, and stderr properties are Streams 
  // that can be used to read or write data.
  // We listen for data events in the stdout stream
  ls.stdout.on('data', function(chunk){
    // Calling toString() explicitly converts the buffer’s contents to a JavaScript string
    output += chunk.toString();
  });
  
  // Listens to a close event in the childprocess
  // After a child process has exited and all its streams have been flushed, 
  // it emits a close event.
  ls.on('close', function(){
    // we parse the output data by splitting on 
    // sequences of one or more whitespace characters
    let parts = output.split(/\s+/);
    console.dir([parts[0], parts[4], parts[8]]);
  }); 

});




console.log("Now watching " + filename + " for changes...");