/* eslint-disable no-undef */
import fileinclude from 'gulp-file-include';
import htmlmin from 'gulp-htmlmin';
import browserSync from 'browser-sync';
const isProd = process.argv.includes('--production');

export const html = () => {
  return app.gulp.src(app.path.src.html)
    .pipe(fileinclude())
    .pipe(htmlmin({
      collapseWhitespace: isProd,
      removeComments: isProd
    }))
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(browserSync.stream());
};
