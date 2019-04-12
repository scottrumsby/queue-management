module.exports = function(api) {
  if (api.env('test')) {
    return {
      presets: [
        [
          '@babel/preset-env',
          {
            corejs: '3.0',
            targets: {
              node: 'current',
              browsers: [ 'last 5 Chrome versions' ]
            },
            useBuiltIns: 'usage',
          }
        ]
      ]
    }
  }
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          corejs: '3.0',
          modules: false,
          targets: {
            browsers: [
              '> 1%',
              'last 2 versions',
              'not ie <= 10'
            ]
          },
          useBuiltIns: 'usage',
        }
      ]
    ],
  }
}