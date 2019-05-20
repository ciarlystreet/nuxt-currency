import pkg from './package'

export default {
  mode: 'spa',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    '@nuxtjs/pwa'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: 'https://api.exchangeratesapi.io/latest',
    proxy: false,
    proxyHeaders: false,
    credentials: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Authorization, Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
      'Access-Control-Max-Age': 86400
    }
  },
  proxy: {
    '/api/': {
      target: 'https://api.exchangeratesapi.io/latest',
      pathRewrite: { '^/api/': '' }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
  // router: {
  //   base: process.env.NODE_ENV === 'production' ? '/dist' : ''
  // }
}
