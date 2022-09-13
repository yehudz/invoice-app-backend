import express, {Request, Response} from 'express';
const Router = require('express-promise-router')
const db = require('../../db')

const router = new Router()

module.exports = router

router.use(express.json())

router.get('/:id', async (req: Request, res: Response)=> {
  const { id } = req.params
  const items = await db.query(
    "SELECT * FROM items WHERE invoice_id = $1", [id])
  res.json(items.rows)
})

router.post('/', async (req: Request, res: Response)=> {
  const { name, quantity, price, invoice_id } = req.body
  try {
    const newItem = await db.query(
    `INSERT INTO items (
      name, quantity, price, total, invoice_id
    ) VALUES (
      $1, $2, $3, $4, $5
    ) RETURNING *`, [name, quantity, price, price*quantity, invoice_id]
  )
  res.status(200).json(newItem.rows[0])
  } catch (error) {
    console.log(error)
  }
})