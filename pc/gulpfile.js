const { dest, series } = require('gulp')
const babel = require('gulp-babel');
const minify = require('gulp-minify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const paths = {
    scripts: {
        dest: 'dist/js',
    }
}

const entry = [
    'node_modules/@babel/polyfill/dist/polyfill.js',
    'src/js/today-before-bundle.js'
];

const scripts = () => {
    const bundler = browserify({
        entries: entry,
        extensions: ['.babel'],
        debug: false
    })
        .transform('babelify', { presets: ['@babel/preset-env'], plugins: ['@babel/transform-runtime'] });

    console.log(entry);

    return bundler.bundle()
        .on('error', function (err) {
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(source('today.bundle.js'))
        .pipe(buffer())
        .pipe(minify({
            ext: {
                min: '.min.js'
            },
            mangle: false,
            preserveComments: false,
            ignoreFiles: ['-min.js'],
            noSource: true
        }))
        .pipe(dest(paths.scripts.dest))
}

scripts();
//exports.bundle = bundle;
