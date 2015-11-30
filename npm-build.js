var colors = require('colors');
var exec = require('child_process').exec;
var envSep = ~process.platform.indexOf('win') ? ';' : ':';
var startTime = null;

process.env.PATH = 'bin' + envSep + process.env.PATH;

makeDist();

function makeDist() {
  startTime = new Date().getTime();
  exec('rm -rf dist/ public/app.js && mkdir dist', function(err, stdout, stderr){
    console.log('=> Removed dist\n');
    transpileApp();
  });
};

function transpileApp() {
  exec('babel index.js --out-file dist/index.js && babel -d dist/app app && babel webpack.config.js --out-file dist/webpack.config.js', function(err, stdout, stderr){
    console.log(stdout);
    console.log('=> Transpiled Dist');
    makeWebpack();
  });
};

function makeWebpack() {
  exec('NODE_ENV=production webpack --config ./webpack.production.config.js --progress --profile --colors', function(err, stdout, stderr){
    console.log('\n=> Made Production Webpack');
    console.log('\n=> Finished - ' + (startTime - new Date().getTime()) + 'ms\n');
  });
};
