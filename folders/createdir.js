//creates in $base the directory $dirname; Returns string message
//jshint esversion:6
var createDir = (base, dirname)=>{
  //include the fs, path modules
  var fs = require('fs');
  var path = require('path');
  var dir = path.resolve(base, dirname);
  var re ='The directory: '+ dir +'/ already exists';

  if(!fs.existsSync(dir)){
    fs.mkdirSync(dir, 0755);
    re = fs.existsSync(dir) ?'Successfully created: '+ dir :'Unable to create: '+ dir;
  }
  return re;
};


//creates a folder called 'newdir' in the directory where this file is located

//console.log(mkdir);
module.exports = createDir;
