
module.exports = {
  env: {
    port: 3400,
    baseUrl: process.env.CONTAGRAMA_BASE_URL || 'http://127.0.0.1:3400'
  },
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    credentials: false,
    baseURL: process.env.CONTAGRAMA_BASE_URL || 'http://127.0.0.1:3400/api/'
  },
  srcDir: 'src',
  head: {
    title: 'contagrama: Minimalist Plain Text Dieting',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'contagrama: Minimalist Plain Text Dieting' }
    ]
  },
  css: [
    'element-theme-default/lib/index.css'
  ],
  plugins: [
    { src: '~/plugins/elementui', ssr: true }
  ],
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
