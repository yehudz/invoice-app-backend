import 
  express, 
  {
    Express, 
    Request, 
    Response
  } from 'express'

const app: Express = express()

app.get('/', 
  (req: Request, res: Response)=> {
    res.send('Working on port 3001')
})

app.listen(3001, ()=> {
  console.log("App listening on port 3001")
})