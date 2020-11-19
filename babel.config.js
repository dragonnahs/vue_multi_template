
const plugins = []
if (process.env.VUE_APP_DEVELOP_ENV === 'false') {
  plugins.push('transform-remove-console')
}

module.exports = {
  presets: [
    [
      '@vue/app',
      {
        'useBuiltIns': 'entry',
        polyfills: [
          'es6.promise',
          'es6.symbol'
        ]
      }
    ]
  ],
  plugins
}