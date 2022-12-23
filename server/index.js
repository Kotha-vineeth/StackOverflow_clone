import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import userRoutes from './routes/users.js'
import questionRoutes from './routes/Questions.js'
import answerRoutes from './routes/Answers.js'

const app = express();
dotenv.config()

//middlewares
app.use(express.json({limit: "30mb",extended: true}))
app.use(express.urlencoded({limit: "30mb",extended: true}))
app.use(cors());

//get request to home page
app.get('/',(req,res) => {
   res.send("This is a stack overflow clone API")
})

//if url starts with /user then go to userRoutes
app.use('/user',userRoutes)
//if url starts with /questions then go to questionRoutes
app.use('/questions',questionRoutes)
app.use('/answer',answerRoutes)

//getting port, if port is not available then assign it to server port i.e., 5000
const PORT = process.env.PORT || 5000
const DATABASE_URL = process.env.CONNECTION_URL

mongoose.connect( DATABASE_URL, { useNewUrlParser: true,useUnifiedTopology: true} )
   .then(() => app.listen(PORT, () => {console.log(`server running on port ${PORT}`)}))
   .catch((err) => console.log(err.message))
