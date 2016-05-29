var gobble = require('gobble');

var AUTOPREFIXER_BROWSERS = [
  'Android 2.3', 'Android >= 4',
  'Chrome >= 35', 'Firefox >= 31',
  'Explorer >= 9', 'iOS >= 7',
  'Opera >= 12', 'Safari >= 7.1',
];

var production = Boolean(gobble.env() === 'production');

var statics = gobble('demo');

var styles = gobble('src').transform('sass', {
  src: 'index.scss',
  dest: 'tooltips.css',
  // map: true
}).transform('postcss', {
  plugins:  [
    require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS })
  ],
  dest: function ( src ) {
    return src.replace( '.css', '.min.css' );
  },
  map: false
}).transform('postcss', {
  plugins: [require('cssnano')],
  map: true
});

var processQueue = [styles, statics];

if (production) {
  processQueue = [styles];
}

module.exports = gobble(processQueue);
