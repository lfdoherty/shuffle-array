'use strict';

/**
 * Module Dependencies.
 */
var mkdirp = require('mkdirp');
var gulp = require('gulp');
var header = require('gulp-header');
var footer = require('gulp-footer');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var ugifyjs = require('gulp-uglify');
var mocha = require('gulp-mocha');

/**
 * Package
 */
var pkg = require('./package.json');

var name = 'shuffle';

/**
 * String
 */
var prefix = ['/*!',
  ' * <%= pkg.name %> - v<%= pkg.version %>',
  ' *',
  ' * Copyright (c) ' + new Date().getFullYear() + ', <%= pkg.author %>',
  ' * Released under the MIT license.',
  ' */',
  '(function(window) {',
  ''].join('\n');
var postfix = '\n\n}(this));';
var umd = [
  '// AMD',
  'if (typeof window.define === \'function\' && window.define.amd !== undefined) {',
  '  window.define(\'' + pkg.name + '\', [], function () {',
  '    return ' + name + ';',
  '  });',
  '// CommonJS',
  '} else if (typeof module !== \'undefined\' && module.exports !== undefined) {',
  '  module.exports = ' + name + ';',
  '// Browser',
  '} else {',
  '  window.' + name + ' = ' + name + ';',
  '};'
  ].join('\n');

/**
 * Test task
 */
gulp.task('test', function() {
  return gulp.src('./test/test.js')
    .pipe(mocha({'reporter': 'spec'}));
});

/**
 * Register tasks
 */
gulp.task('default', []);
