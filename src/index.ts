require('dotenv').config();
import express, { Express } from 'express'

const mountRoutes = require('./routes')

const app: Express = express()
mountRoutes(app)

const PORT = process.env.PORT || 3001

app.listen(PORT, ()=> {
  console.log(`App listening on port ${PORT}`)
})