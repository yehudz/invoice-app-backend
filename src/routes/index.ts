const invoices = require('./invoices')


module.exports = (app: any) => {
  app.use('/api/v2/invoices', invoices)
}