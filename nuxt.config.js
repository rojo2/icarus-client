export default {
  mode: 'universal',
  components: true,
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
    '@/scss/fonts.scss',
    '@/scss/globals.scss'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
  ],
  styleResources: {
    scss: [
      '~/scss/variables.scss'
    ]
  },
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
