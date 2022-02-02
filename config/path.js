import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const pathSrc = './src';
const pathDocs = './docs';

export const path = {
  build: {
    files: pathDocs + '/files/',
    html: pathDocs,
    css: pathDocs + '/css/',
    js: pathDocs + '/js/',
    images: pathDocs + '/images/',
    fonts: pathDocs + '/fonts/'
  },
  src: {
    files: pathSrc + '/files/**/*.*',
    html: pathSrc + '/*.html',
    scss: pathSrc + '/scss/*.scss',
    js: pathSrc + '/js/*.js',
    images: pathSrc + '/images/*.{jpeg,jpg,png,webp,gif}',
    vector: pathSrc + '/images/**/*.svg',
    minImg: pathSrc + '/images/min/*.{jpeg,jpg,png,svg,webp,gif}'
  },
  watch: {
    files: pathSrc + '/files/**/*.*',
    html: pathSrc + '/**/*.html',
    scss: pathSrc + '/scss/**/*.scss',
    js: pathSrc + '/js/**/*.js',
    images: pathSrc + '/images/**/*.{jpeg,jpg,svg,png,webp,gif}'
  },
  clean: pathDocs,
  pathDocs: pathDocs,
  pathSrc: pathSrc,
  rootFolder: rootFolder,
  ftp: ''
};
