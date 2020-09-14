export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    if (
      to.path === '/weather' &&
      (!to.query.flux ||
        !to.query.filter ||
        !['solar-wind', 'particle', 'electron', 'xray'].includes(
          to.query.flux
        ) ||
        !'1234'.split('').includes(to.query.filter))
    ) {
      return next('/weather?flux=solar-wind&filter=1')
    } else if (
      to.path === '/forecast' &&
      (!to.query.show || !['forecast', 'alerts'].includes(to.query.show))
    ) {
      return next('/forecast?show=forecast')
    }
    return next()
  })
}
