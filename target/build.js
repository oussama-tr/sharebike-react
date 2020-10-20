var util = require('util');
var { spawn } = require('child_process');

function puts(error, stdout, stderr) {
  util.puts(stdout, error, stderr);
}

var os = require('os');

let start;

if (os.type() === 'Linux')
  start = spawn(
    'concurrently "nodemon server.js" "cd client/backend && set PORT=3002 && npm start" "cd client/frontend && PORT=3001 npm start"',
    {
      shell: true
    }
  );
else if (os.type() === 'Darwin')
  start = spawn(
    'concurrently "nodemon server.js" "cd client/backend && set PORT=3002 && npm start" "cd client/frontend && PORT=3001 npm start"',
    {
      shell: true
    }
  );
else if (os.type() === 'Windows_NT')
  start = spawn(
    'concurrently "nodemon server.js" "cd client/backend && set PORT=3002 && npm start" "cd client/frontend && set PORT=3001 && npm start"',
    {
      shell: true
    }
  );
else throw new Error('Unsupported OS found: ' + os.type());

start.stdout.on('data', data => {
  console.log(`stdout: ${data}`);
});

start.stderr.on('data', data => {
  console.error(`stderr: ${data}`);
});

start.on('close', code => {
  console.log(`child process exited with code ${code}`);
});
