/* eslint-disable no-undef */
import browserSync from 'browser-sync';
import webpack from 'webpack-stream';
const isProd = process.argv.includes('--production');
const isDev = !isProd;

export const js = () => {
  return app.gulp.src(app.path.src.js, { sourcemaps: isDev })
    .pipe(webpack({
      mode: isProd ? 'production' : 'development',
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      },
      output: {
        filename: '[name].min.js'
      }
    }))
    .pipe(app.gulp.dest(app.path.build.js, { sourcemaps: isDev }))
    .pipe(browserSync.stream());
};
