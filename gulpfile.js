'use strict';

const gulp = require('gulp');

const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const groupMediaQueries = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-cleancss');
const autoprefixer = require('gulp-autoprefixer');

const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const replace = require('gulp-replace');
const del = require('del');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();

const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');


const paths =  {
  src: './src/',              // paths.src
  build: './build/'           // paths.build
};

const images = 
  paths.src + '/img/*.{gif,png,jpg,jpeg,svg,ico}'
  // paths.src + '/blocks/**/img/*.{gif,png,jpg,jpeg,svg}',
  // '!' + paths.src + '/blocks/sprite-png/png/*',
  // '!' + paths.src + '/blocks/sprite-svg/svg/*',
;

const fonts = 
  paths.src + '/fonts/*.{otf,ttf,woff,woff2}';

function styles() {
  return gulp.src(paths.src + 'scss/style.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass()) // { outputStyle: 'compressed' }
    .pipe( autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
        }))
    .pipe(groupMediaQueries())
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest(paths.build + 'css/'))
}

function scripts() {
  return gulp.src(paths.src + 'js/*.js')
    .pipe(plumber())
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify())
    .pipe(concat('script.min.js'))
    .pipe(gulp.dest(paths.build + 'js/'))
}

function htmls() {
  return gulp.src(paths.src + '*.html')
    .pipe(plumber())
    .pipe(replace(/\n\s*<!--DEV[\s\S]+?-->/gm, ''))
    .pipe(gulp.dest(paths.build));
}

function copyImg() {
  if(images.length) {
    return gulp.src(images)
      // .pipe(newer(dirs.build + '/img')) // потенциально опасно, к сожалению
      // .pipe(rename({dirname: ''}))
      .pipe(gulp.dest(paths.build + '/img'));
  }
  else {
    console.log('Изображения не обрабатываются.');
    callback();
  }
};

function copyFonts() {
  if(fonts.length) {
    return gulp.src(fonts)
      .pipe(gulp.dest(paths.build + '/fonts'));
  }
  else {
    console.log('Шрифты не обрабатываются.');
    callback();
  }
};

function svgSpriteBuild() {
  return gulp.src(paths.src + 'icons/*.svg')
  // minify svg
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    // remove all fill, style and stroke declarations in out shapes
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: {xmlMode: true}
    }))
    // cheerio plugin create unnecessary string '&gt;', so replace it.
    .pipe(replace('&gt;', '>'))
    // build svg sprite
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: "../sprite.svg",
          render: {
            scss: {
              dest: paths.src + '../_sprite.scss',
              template: paths.src + "scss/templates/_sprite_template.scss"
            }
          }
        }
      }
    }))
    .pipe(gulp.dest(paths.src + 'img/'));
};

function clean() {
  return del('build/')
}

function watch() {
  gulp.watch(paths.src + 'scss/**/*.scss', styles);
  gulp.watch(paths.src + 'js/*.js', scripts);
  gulp.watch(paths.src + '*.html', htmls);
  gulp.watch(paths.src + 'icons/*.svg', svgSpriteBuild);
  gulp.watch(paths.src + 'img/*.{gif,png,jpg,jpeg,svg,ico}', copyImg);
  gulp.watch(paths.src + 'fonts/*.{otf,ttf,woff,woff2}', copyFonts);
}

function serve() {
  browserSync.init({
    server: {
      baseDir: paths.build
    }
  });
  browserSync.watch(paths.build + '**/*.*', browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.htmls = htmls;
exports.clean = clean;
exports.watch = watch;
exports.copyImg = copyImg;
exports.copyFonts = copyFonts;
exports.svgSpriteBuild = svgSpriteBuild;


gulp.task('build', gulp.series(
  clean,
  styles,
  scripts,
  htmls,
  svgSpriteBuild,
  copyImg,
  copyFonts
  // gulp.parallel(styles, scripts, htmls)
));

gulp.task('default', gulp.series(
  clean,
  gulp.parallel(styles, scripts, htmls, svgSpriteBuild),
  gulp.parallel(copyImg, copyFonts),
  gulp.parallel(watch, serve)
));
