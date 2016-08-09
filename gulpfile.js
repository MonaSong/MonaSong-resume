var gulp = require('gulp');
var rename = require('gulp-rename');
var rev = require('gulp-rev');
var revCollctor = require('gulp-rev-collector');
var minifyHtml = require('gulp-minify-html');
var gulpif = require('gulp-if');
var clean = require('gulp-clean');
var del = require('del');

/*gulp.task('rename',function(){
    
})*/

//修改静态文件的版本号
gulp.task('aaa',function(){
    gulp.src("css/style.css")
    .pipe(rev())
    .pipe(gulp.dest('css/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/css'));
});

//修改有静态文件的html的链接
gulp.task('ccc',['aaa'],function(){
    gulp.src(['rev/css/*.json','*.html'])
    .pipe(revCollctor({replaceReved: true}))
    .pipe(gulp.dest('./'))
})

//修改静态文件的名字
gulp.task('rename',function(){
    gulp.src('css/style.css')
    .pipe(rename(function(path){
         var time = new Date().getTime();
         path.basename += "_"+time;
    }))
    .pipe(gulp.dest('css/'))
})

/*gulp.task('clean',['aaa','ccc'], function(){
  del('./dist');
})
*/

gulp.task('del',function(){
    del('./build')
})
gulp.task('rename',['del'],function(){
    gulp.src('css/style.css')
        .pipe(rename(function(path){
            var time = new Date().getTime();
            console.log(path.basename);
            path.basename +='_'+time;
            console.log(path.basename);
        }))
        .pipe(gulp.dest("./build"))
})
