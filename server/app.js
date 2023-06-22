const express =require('express')
const app=express()
const mongoose=require('mongoose')
const usersRouter=require('./routes/user')
const adminRouter=require('./routes/admin')
const bodyParser=require('body-parser')
const cors=require('cors')
// const morgan=require('morgan')
const path = require('path')
const { configDotenv } = require('dotenv')
configDotenv()

const port=process.env.PORT;
const MONGO_URL=process.env.MONGO_URL
app.listen(port,()=>console.log(`app is running on port ${port}`))

app.use(cors())
// app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')))

mongoose.set('strictQuery',false)
mongoose.connect(MONGO_URL).then(()=>{
    console.log('mongodb connected')
}).catch((err)=>{
    console.log('connection failed',err)
})

app.use('/admin', adminRouter);
app.use('/', usersRouter);
