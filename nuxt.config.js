module.exports = {
  srcDir: 'src',
  head: {
    title: 'contagrama: Minimalist Plain Text Dieting',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'contagrama: Minimalist Plain Text Dieting' }
    ]
  },
  build: {
    loaders: [
      {
        test: /\.txt$/,
        loader: 'raw-loader'
      }
    ],
    extend (config, { isDev }) {
      if (!isDev) {
        config.output.publicPath = './_nuxt/'
      } else {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          exclude: /(node_modules)/
        })
      }
    }
  }
}
