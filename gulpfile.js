import gulp from 'gulp';
import { path } from './config/path.js';

global.app = {
  path: path,
  gulp: gulp
};
// includes =============================
import { clear } from './tasks/clear.js';
import { files } from './tasks/files.js';
import { html } from './tasks/html.js';
import { scss } from './tasks/scss.js';
import { js } from './tasks/js.js';
import { image } from './tasks/image.js';
import { server } from './tasks/server.js';
import { otfToTtf, ttfToWoff, fontsStyle } from './tasks/fonts.js';
// functions ============================
const watcher = () => {
  gulp.watch(path.watch.files, files);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, image);
};

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);
const tasks = gulp.series(fonts, gulp.parallel(files, html, scss, js, image));
const dev = gulp.series(clear, tasks, gulp.parallel(watcher, server));

gulp.task('default', dev);
