import express from 'express'
import { AskQuestion,getAllQuestions,deleteQuestion,voteQuestion } from '../controllers/Questions.js'
import auth from '../middlewares/auth.js' 

const router = express.Router()

//if /questions/Ask is post request then goto AskQuestion which is present in controllers
//if auth funcn returns true only, then AskQuestion will execute else AskQuestion will not execute
router.post('/Ask', auth, AskQuestion) //url is http://localhost:3000/Questions/Ask
router.get('/get', getAllQuestions) //get request
router.delete('/delete/:id', auth, deleteQuestion)  //delete request
router.patch('/vote/:id', auth, voteQuestion)

export default router