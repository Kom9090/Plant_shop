/* eslint-disable no-undef */
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';
import GulpCleanCss from 'gulp-clean-css';
import autoPrefixer from 'gulp-autoprefixer';
import gulpGroupCssMediaQueries from 'gulp-group-css-media-queries';
import webpcss from 'gulp-webpcss';
const isProd = process.argv.includes('--production');
const isDev = !isProd;

const sass = gulpSass(dartSass);

export const scss = () => {
  return app.gulp.src(app.path.src.scss, { sourcemaps: isDev })
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(gulpGroupCssMediaQueries())
    .pipe(autoPrefixer())
    .pipe(webpcss({
      webpClass: '.webp',
      noWebpClass: '.no-webp'
    }))
    .pipe(autoPrefixer({
      grid: true,
      overrideBrowserslist: ['last 5 versions'],
      cascade: true
    }))
    .pipe(app.gulp.dest(app.path.build.css, { sourcemaps: isDev }))
    .pipe(GulpCleanCss())
    .pipe(rename(
      { suffix: '.min' }
    ))
    .pipe(app.gulp.dest(app.path.build.css, { sourcemaps: isDev }))
    .pipe(browserSync.stream());
};
