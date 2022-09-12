require('dotenv').config()
const { Client } = require('pg')

const connectionString = process.env.DATABASE_URL

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
})
client.connect()

module.exports = {
  query: (text: any, params: any) => client.query(text, params),
}