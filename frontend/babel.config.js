module.exports = function(api) {
  if (api.env('test')) {
    return {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
              browsers: [
                'last 5 Chrome versions'
              ]
            },
            useBuiltIns: 'usage',
            corejs: '3.0'
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
          modules: false,
          targets: {
            browsers: [
              '> 1%',
              'last 2 versions',
              'not ie <= 10'
            ]
          },
          useBuiltIns: 'usage',
          corejs: '3.0'
        }
      ]
    ],
    plugins: []
  }
}