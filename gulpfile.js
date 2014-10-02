var SITE_DIR = './';

var EXPRESS_PORT = 4000;
var EXPRESS_DOCS_ROOT = __dirname + '/' + SITE_DIR + '_site';

var LIVERELOAD_PORT = 35729;


// Load plugins
var gulp = require('gulp'),
  jade = require('gulp-jade'),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  jshint = require('gulp-jshint'),
  ngmin = require('gulp-ngmin'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  clean = require('gulp-clean'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  cache = require('gulp-cache'),
  livereload = require('gulp-livereload'),
  server = livereload(),
  gutil = require('gulp-util'),
  pkg = require('./package.json'),
  wait = require('gulp-wait'),
  exec = require('gulp-exec');


// Main watch task for development
gulp.task('dev', ['build-jekyll'], function() {
  var server = livereload();

  // Watch source files inside site submodule
  gulp.watch([
	      // Because .styl compiles into .css, do not watch .css, else you will
	      // an infinite loop
	      'styl/**/*.styl',
	      'jade/**/*.jade',
	      '**/*.html',
	      '**/*.md',
        // Only watch the js from app/
	      'app/**/*.js',
	      // Do NOT watch the compile _site directory, else the watch will create
	      // an infinite loop
	      '!_site/**',
	      '!build/**',
	      '!bower_components/**',
	      '!node_modules/**'
	  ],
	  ['build-jekyll']
	).on('change',
    function(file){
      server.changed(file.path);
    }
  );

  // Start the express server
  gulp.start('site');
});


// jekyll build the docs site
gulp.task('build-jekyll', ['site-jade', 'site-styl', 'site-js'], function() {
  var jekyllCommand = 'jekyll build --source ' + SITE_DIR +  ' --destination ' + SITE_DIR + '_site/';
  // gulp-exec bugfix:
  // Need to call gulp.src('') exactly, before using .pipe(exec())
  return gulp.src('')
    .pipe(exec(jekyllCommand))
    // This delay does not seem to be working
    .pipe(wait(1500))
    .pipe(livereload(server));
});


// Compile .styl for the site submodule
gulp.task('site-jade', function() {
  var jaderef = require('gulp-jade/node_modules/jade');

  jaderef.filters.code = function( block ) {
      return block
          .replace( /&/g, '&amp;'  )
          .replace( /</g, '&lt;'   )
          .replace( />/g, '&gt;'   )
          .replace( /"/g, '&quot;' )
          .replace( /#/g, '&#35;'  )
          .replace( /\\/g, '\\\\'  )
          .replace( /\n/g, '\\n'   );
  }

  return gulp.src(SITE_DIR + "jade/**/*.jade")
    .pipe(jade())
    .pipe(gulp.dest(SITE_DIR + "build/templates/"));
});


// Compile .styl for the site submodule
gulp.task('site-styl', function() {
  var stylus = require('gulp-stylus');

  return gulp.src(SITE_DIR + "styl/**/*.styl")
    .pipe(stylus())
    .pipe(autoprefixer())
    .pipe(minifycss())
    .pipe(concat('main.css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(SITE_DIR + "build/"));
});


// Concat all app/ js files and minify them
gulp.task('site-js', function() {
  return gulp.src([
    "app/**/*.js"
  ])
    .pipe(jshint())
    .pipe(concat('main.js'))
    .pipe(gulp.dest(SITE_DIR + "build/"))
    .pipe(ngmin())
    .pipe(uglify({ mangle: false }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(SITE_DIR + "build/"));
});


gulp.task('site', function(done) {
	var express = require('express'),
		app = express();
	app.use(require('connect-livereload')());
	app.use(express.static(EXPRESS_DOCS_ROOT));
	app.listen(EXPRESS_PORT);
	gutil.log('Server running at Docs for', gutil.colors.cyan('http://localhost:'+EXPRESS_PORT+'/'));
});
