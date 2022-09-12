require('dotenv').config();
import 
  express, 
  {
    Express, 
    Request, 
    Response,
  } from 'express'

const app: Express = express()
const PORT = process.env.PORT || 3001
app.get('/', 
  (req: Request, res: Response)=> {
    res.send('Working on port 3001')
})

app.listen(PORT, ()=> {
  console.log(`App listening on port ${PORT}`)
})