# gulp-md5-refer
>A md5 filename replace plugin in gulp
>git clone [gulp-md5-plus](https://github.com/wanglam/gulp-md5-plus) and 
save it in your node_modules

#Usage

>In my project,I place the final javascript in "dist/js" and the root html file in "./".I need md5 javascript files and modify reference in my html file and output in partical directory.

```javascript
gulp.task('publish',[],function(){
    //delete all md5 file
    del(['dist/js/*_*.js'], function (err) {
        // generate md5 file
        gulp.src('dist/js/*')
        .pipe(md5(10,'./index_template.html','./index.html'))
        .pipe(gulp.dest('dist/js'));    
        
        // replace genral file with md5 file in html file and output in root directory
        gulp.src('index_template.html')
            .pipe(md5refer("dist/js/*_*.js"))
            .pipe(rename("index.html"))
            .pipe(gulp.dest("./"));
    });
    
})

```


http://en.wikipedia.org/wiki/MIT_License[MIT License]


