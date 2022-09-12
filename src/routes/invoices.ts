import express, {Express, Request, Response} from 'express';
const Router = require('express-promise-router')
const db = require('../../db')

const router = new Router()

module.exports = router

// Create a new board
router.use(express.json())

// Get all boards
router.get('/', async (req: Request, res: Response)=> {
  try {
    const result = await db.query('SELECT * FROM invoice')
    res.json(result.rows)
  } catch (error) {
    console.log(error)
  }
})