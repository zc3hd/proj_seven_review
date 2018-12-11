var nodemon = require('gulp-nodemon');
var path = require('path');
nodemon({
  script: path.join(__dirname,'./app.js'),
  ignore: [
    path.join(__dirname,'../src/'),
    path.join(__dirname,'../webapp/'),
  ],
  env: { 'NODE_ENV': 'development' }  
});
