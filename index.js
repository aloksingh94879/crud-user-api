const express= require('express')
const { StatusCodes } = require('http-status-codes')
require('dotenv').config()

const cors=require("cors")

//importing db config method
const  connectDb = require('./db/config')

const PORT= process.env.PORT

const app= express()

//body parsrr config
app.use(express.urlencoded({ extended:true }))
app.use(express.json())
app.use(cors())

//index route
app.get(`/`, (req,res) => {
return res.status(StatusCodes.OK).json({ status: true, msg: `crud user api`})
})

//api route
app.use(`/api/user`, require(`./router/userroute`))

//default route
app.all(`*`, async(req, res)=>{
  return res.status(StatusCodes.NOT_FOUND).json({ status:false , msg:` requested path not found`})
})

//listener

app.listen(PORT, ()=>{
   if(process.env.MODE==="development"){
    connectDb(process.env.MONGO_DEV)
   }
   if(process.env.MODE==="production"){
    connectDb(process.env.MONGO_PROD)}
  console.log(`server is sconncted and runniung at @http://localhost:${PORT}`)
})