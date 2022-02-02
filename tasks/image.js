/* eslint-disable no-undef */
import browserSync from 'browser-sync';
import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';
import newer from 'gulp-newer';

export const image = () => {
  return app.gulp.src(app.path.src.images)
    .pipe(newer(app.path.build.images))
    .pipe(webp())
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.src(app.path.src.images))
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.src(app.path.src.minImg))
    .pipe(newer(app.path.build.images))
    .pipe(webp())
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.src(app.path.src.minImg))
    .pipe(newer(app.path.build.images))
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      optimizationLevel: 3
    }))
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.src(app.path.src.vector))
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(browserSync.stream());
};
