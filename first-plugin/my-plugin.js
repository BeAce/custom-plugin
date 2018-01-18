const fs = require('fs');
const path = require('path');
function MyPlugin(options) {}

MyPlugin.prototype.apply = function(compiler) {
  // console.log(compiler);
  // 1
  compiler.plugin("compile", function(params) {
    console.log("The compile is starting to compile...");
  });
  // compiler.plugin("run", function(compiler) {
  //   console.log("The compile is running...");
  // });
  // compiler.plugin("watch-run", function(watching) {
  //   console.log("The compile is being watching...");
  // });
  // 2
  compiler.plugin("compilation", function(compilation, params) {
    // console.log(compilation.assets);
    console.log("The compile is starting a new compilation...");
    // 4
    compilation.plugin("optimize", function() {
      console.log("The compilation is starting to optimize file...");
    });
  });


  compiler.plugin("emit", function(compilation, callback) {
    console.log("The compilation is going to emit files...");
    // let fileList = `In this build:\n\n`;
    // for (let filename in compilation.assets) {
    //   fileList += ('- ' + filename + '\n');
    // }
    // compilation.assets['readme.md'] = {
    //   source: function() {
    //     return fileList;
    //   },
    //   size: function() {
    //     return fileList.length;
    //   }
    // };
    callback();
  });

  // 3
  compiler.plugin("make", function(compiler, callback){
    console.log("the compile is making file...");
    callback();
  });
  // 5
  compiler.plugin("after-compile", function(compilation,callback) {
    console.log("The compile has aleardy compiled");
    callback();
  });

  // compiler.plugin('after-emit', function(compilation) {
  //   console.log('The compliation has aleardy emitted');
  // })
  // compiler.plugin("should-emit", function(compiler, callback){
  //   console.log('should i emit?');
  //   return false;
  // });
  compiler.plugin("done", function(stats) {
    console.log('All compilers have done.');
    const fileData = fs.readFileSync(path.join(path.resolve(__dirname), 'bundle.js'), {encoding: 'utf-8'});
    console.log(fileData);
    const prefix = '/*2018*/\n';
    const author = '\n/* ——By Beace Lee */';
    const finalFileData = `${prefix}${fileData}${author}`;
    fs.writeFileSync(
      path.join(path.resolve(__dirname), 'bundle.js'),
      finalFileData
    );
  })
  compiler.plugin("failed", function(error) {
    console.log('Opps, Compilers have some errors.', error);
  });
  // compiler.plugin("after-plugins", function() {
  //   console.log("after plugins");
  // });
  // compiler.plugin("after-resolvers", function() {
  //   console.log("after resolvers");
  // });
  compiler.plugin("invalid", function() {
    console.log("invalid");
  });
};


module.exports = MyPlugin;
