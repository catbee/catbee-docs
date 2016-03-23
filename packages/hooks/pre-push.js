#!/usr/bin/env node
'use strict';

var PROTECTED = 'master';
var PROCESS_COUNT = 3;

var child = require('child_process');
var color = require('cli-color');
var error = color.red;

var spawnOptions = { stdio: 'inherit' };

var parse = child.spawn('git', ['rev-parse', '--abbrev-ref', 'HEAD']);
var test = child.spawn('npm', ['test'], spawnOptions);
var lint = child.spawn('npm', ['run', 'lint', '-s'], spawnOptions);

var count = 0;
var withoutErrors = true;

// Parse git branch name
parse.stdout.on('data', function (stdout) {
  var branch = stdout;

  if (!branch) {
    console.error(error(`Hook error: Empty branch name`));
    incCount(1);
    return;
  }

  if (branch === PROTECTED) {
    console.error(error(`Hook error: Push to ` + PROTECTED + ` was prevented`));
    incCount(1);
    return;
  }

  incCount(0);
});

// Handle test run events
test.on('close', function (code) {
  if (code !== 0) {
    console.error(error('Hook error: Tests failed'));
  }

  incCount(code);
});

// Handle lint run events
lint.on('close', function (code) {
  if (code !== 0) {
    console.error(error('Hook error: Lint failed'));
  }

  incCount(code);
});

function incCount (code) {
  count += 1;

  if (code === 1) {
    withoutErrors = false;
  }

  if (count >= PROCESS_COUNT) {
    var exitCode = withoutErrors ? 0 : 1;
    process.exit(exitCode);
  }
}

parse.on('error', handleError);
test.on('error', handleError);
lint.on('error', handleError);

function handleError (err) {
  console.error('err', err);
  process.exit(1);
}

// Error handler
process.on('uncaughtException', function (err) {
  console.error(err.stack);
  parse.kill('SIGHUP');
});
