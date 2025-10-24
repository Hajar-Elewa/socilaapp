import  express from 'express'
import 'dotenv/config'
import router from './Modules/routes'
const app:express.Application=express()
import {IError} from './utiles/errors/types'
import { Request,Response,NextFunction } from "express"
import DBConnection from './DB/Models/connectioDB'


const bootstrap =  async()=>{
    const port = process.env.PORT || 5000
    app.use(express.json())
    await DBConnection()
    
   app.use('/api/v1', router)

app.use((err: IError, req: Request, res: Response, next: NextFunction) => {  
  res.status(err.statusCode || 500  ).json({
    msg: err.message,
    stack: err.stack,
    status: err.statusCode || 500
  })
})

  app.use((req, res) => {
  res.status(404).send('Not found')
})
  

   app.listen(port,()=>{
    console.log(`server running on port` , port)
    
   })
}
export default bootstrap