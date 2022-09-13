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