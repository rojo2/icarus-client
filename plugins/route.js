const fluxes = ['solar-wind', 'particle', 'electron', 'xray']
const filters = '12345'.split('')
const shows = ['forecast', 'alerts']

export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    if (
      to.path === '/weather' &&
      (!to.query.flux ||
        !to.query.filter ||
        !fluxes.includes(to.query.flux) ||
        !filters.includes(to.query.filter))
    ) {
      return next('/weather?flux=solar-wind&filter=1')
    } else if (
      to.path === '/forecast' &&
      (!to.query.show || !shows.includes(to.query.show))
    ) {
      return next('/forecast?show=forecast')
    }
    return next()
  })
}
