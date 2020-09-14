const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

const fluxes = ['solar-wind', 'particle', 'electron', 'xray']
const filters = '12345'.split('')
const shows = ['forecast', 'alerts']

const app = new Koa()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  await nuxt.ready()
  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use((ctx) => {
    const { pathname, searchParams } = ctx.request.URL
    if (pathname === '/') {
      return ctx.redirect('/weather?flux=solar-wind&filter=1')
    } else if (pathname === '/weather') {
      const flux = searchParams.get('flux')
      const filter = searchParams.get('filter')
      if (!flux || !fluxes.includes(flux)) {
        return ctx.redirect('/weather?flux=solar-wind&filter=1')
      }
      if (!filter || !filters.includes(filter)) {
        return ctx.redirect('/weather?flux=solar-wind&filter=1')
      }
    } else if (pathname === '/forecast') {
      const show = searchParams.get('show')
      if (!show || !shows.includes(show)) {
        return ctx.redirect('/forecast?show=forecast')
      }
    }
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
