import express, {Express, Request, Response} from 'express';
import createRandomInvoiceId from '../utils/createRandomInvoiceId';
const Router = require('express-promise-router')
const db = require('../../db')

const router = new Router()

module.exports = router

// Create a new invoice
router.use(express.json())

// Get all invoices
router.get('/', async (req: Request, res: Response)=> {
  try {
    const result = await db.query('SELECT * FROM invoice')
    res.json(result.rows)
  } catch (error) {
    console.log(error)
  }
})

router.post('/', async (req: Request, res: Response)=> {
  let randomId = createRandomInvoiceId()
  const {
    clientname, 
    clientemail,
    description,
    status,
    paymentterms,
    paymentdue,
    streetaddress,
    city,
    postcode,
    country,
    items
   } = req.body;
  const properties = 
  `INSERT INTO invoice(
    invoiceId, 
    clientname,
    clientemail,
    description,
    status,
    paymentterms,
    paymentdue,
    streetaddress,
    city,
    postcode,
    country
  ) VALUES(
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
  ) RETURNING *`
  const values = [
    randomId,
    clientname,
    clientemail,
    description,
    status,
    paymentterms,
    paymentdue,
    streetaddress,
    city,
    postcode,
    country
  ]
  try {
    const result = await db.query(properties, values)
    const invoiceId = result.rows[0].id

    type Item = {
      name: string
      quanity: number
      price: number
      totel: number
    }

    items.forEach(async (item: Item)=> {
      if (!items) return
      await db.query(
        `INSERT INTO items (
          name, quanity, price, total, invoiceId
        )
          VALUES(
            $1, $2, $3, $4, $5
          )
        `, 
        [
          item.name, 
          item.quanity, 
          item.price,
          item.quanity * item.price,
          invoiceId
        ]
      )
    })
    res.status(200).json(result.rows[0])
  } catch (error) {
    console.log(error)
  }
})