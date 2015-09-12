var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
	lazy: true
});
var mainBowerFiles = require('main-bower-files');

gulp.task('index', function() {
	return gulp.src('./front/index.html')
		.pipe($.inject(gulp.src(mainBowerFiles(), {
			read: false
		}, {
			relative: true
		}), {
			name: 'bower',
			ignorePath: '/bower_components'
		}))
		.pipe(gulp.dest('./front'));
});

gulp.task('build-jsx', function() {
	return browserify('./front/react/main.js')
		.transform(babelify)
		.bundle()
		.pipe(source('main.js'))
		.pipe(gulp.dest('./front/dist'));
});
