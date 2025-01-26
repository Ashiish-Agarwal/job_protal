import express from 'express';
import dotenv from 'dotenv';
dotenv.config({})
import mongodb from './utils/db.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userrouter from './routes/user.routes.js';
import CompanyRouter from './routes/company.routes.js';
import JobRouter from './routes/job.Routes.js';
import applicationsrouter from './routes/applications.routes.js';





const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
const corsOptions={
    origin:'http//localhost:5173',
    Credentials:true
}
app.use(cors(corsOptions))
  
const Port = process.env.PORT || 4000


app.get('/',(req,res)=>{

   return res.send('hlw world ll')
}
)
//api is here

app.use("/api/v1/user",userrouter)
app.use("/api/v1/company",CompanyRouter)
app.use('/api/v1/job',JobRouter)
app.use('/api/v1/applications',applicationsrouter)

app.listen(Port,()=>{
    mongodb()
    console.log(`Port: ${Port}`);
})