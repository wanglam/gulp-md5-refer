var path = require('path')
, gutil = require('gulp-util')
, through = require('through2')
, crypto = require('crypto')
, fs = require('fs')
, glob = require('glob');

module.exports = function (md5files) {
    return through.obj(function (file, enc, cb) {
        if (file.isStream()) {
            this.emit('error', new gutil.PluginError('gulp-debug', 'Streaming not supported'));
            return cb();
        }

        if(!file.contents){
            return cb();
        }

        if(Object.prototype.toString.call(md5files) == "[object Array]"){
            md5files.forEach(function(i_ifile){
                i_ifile && glob(i_ifile,function(err, i_files){
                    if(err) return console.log(err);
                    i_files.forEach(function(onefile){
                        file.contents = replaceOneFile(file.contents.toString(),onefile);
                    });
                })
            })
        }else{
            md5files && glob(md5files,function(err, i_files){
                if(err) return console.log(err);
                i_files.forEach(function(onefile){
                    file.contents = replaceOneFile(file.contents.toString(),onefile);
                });
            })
        }

        this.push(file);
        cb();
    }, function (cb) {
        cb();
    });
};


var replaceOneFile = function(content,i_files){
    var extname = path.extname(i_files);
    var md5_filename = i_files;
    var filename = md5_filename.replace(new RegExp("_[\\w\\d]+\\"+extname),extname);
    content = content.replace(new RegExp(filename), md5_filename)
    return new Buffer(content);
}