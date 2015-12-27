var gulp = require("gulp");
var browserify = require("gulp-browserify");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");

const ENTRY_POINT = "src/app.jsx";

gulp.task("transpile", function() {
    gulp.src(ENTRY_POINT)
      .pipe(browserify({
        debug: true,
        transform: ["babelify", "reactify"]
      }))
      .pipe(uglify())
      .pipe(concat("bundle.js"))
      .pipe(gulp.dest("public/"));
});

gulp.task("default",["transpile"]);

gulp.task("watch", ["transpile"], function() {
    gulp.watch("src/**/*.*", ["transpile"]);
});
