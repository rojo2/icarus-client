module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Icarus',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      {
        name: 'twitter:site',
        content: '@icarusalerts'
      },
      {
        name: 'twitter:creators',
        content: ['@rojo_2', '@kaleidosnet']
      },
      {
        name: 'keywords',
        content: [
          'sun',
          'solar',
          'wind',
          'particles',
          'sunspots',
          'space',
          'weather'
        ]
      },
      {
        name: 'author',
        content: 'Aitor Moreno-Melcón'
      },
      {
        name: 'author',
        content: 'Omar Moreno-Melcón'
      },
      {
        name: 'author',
        content: 'Pablo Ruiz-Múzquiz'
      },
      {
        name: 'author',
        content: 'Ángela Rivera-Campos'
      }
    ],
    link: [
      {
        rel: 'author',
        type: 'text/plain',
        href: 'http://icarus.live/humans.txt'
      },
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/images/favicon.ico'
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/images/favicon.png'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/css/base.css',
    '@/assets/css/animations.css',
    '@/assets/css/graph.css',
    '@/assets/css/index.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/route'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
