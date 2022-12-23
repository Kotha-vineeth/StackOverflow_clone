import express from 'express'
import { postAnswer,deleteAnswer } from '../controllers/Answers.js'
import auth from '../middlewares/auth.js'

const router = express.Router();

// patch is used to update particular record in databse
//here we are updating the answer array of a particular question in questions database 
//that means we are updating inside the answers array so we are using pitch
//if auth funcn returns true only, then postAnswer will execute else postAnswer will not execute
router.patch('/post/:id', auth, postAnswer)

//here we r not using router.delete bcz delete is usually used when we want to delete the whole record (i.e. here if we want to delete a question then we use delete) but here we want to delete the particular answer in answer array so we use patch
router.patch('/delete/:id', auth, deleteAnswer)

export default router