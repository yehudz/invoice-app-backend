const invoices = require('./invoices')
const items = require('./items')

module.exports = (app: any) => {
  app.use('/api/v2/invoices', invoices)
  app.use('/api/v2/items', items)
}