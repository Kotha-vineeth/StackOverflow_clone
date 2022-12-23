import mongoose from 'mongoose'
import Questions from '../models/Questions.js'

export const postAnswer = async(req,res) => {
    const { id: _id } = req.params;  //extracting the id that is sent in url('/post/:id') => it is question id 
    const { noOfAnswers,answerBody, userAnswered, userId } = req.body;

    //checking the id is valid or not(i.e.,checking is there any question with that id in questions database)
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question is unavailable');
    }

    updateNoofQuestions(_id,noOfAnswers) //funcn written below 
    try{
        //Adding the { noOfAnswers,answerBody, userAnswered } in answers array of a particular question in questions database
        //_id is id of question in questions databse
        const updatedQuestion = await Questions.findByIdAndUpdate( _id, { $addToSet: {'answer': [{ answerBody, userAnswered, userId }]}})
        res.status(200).json(updatedQuestion)
    }catch(error){
        res.status(400).json('error in updating')
    }
}

const updateNoofQuestions = async(_id,noOfAnswers) => {
    try{
        //$set will replace the value of 'noOfAnswers' by noOfAnswers+1
        //$addtoSet will add but not replace (used above)
        await Questions.findByIdAndUpdate( _id, { $set: { 'noOfAnswers' : noOfAnswers}})
    }catch(error){
       console.log(error)
    }
}

export const deleteAnswer = async(req,res) => {
    const { id:_id } = req.params; //id of question
    const { answerId, noOfAnswers } = req.body;

    //checking the id is valid or not(i.e.,checking is there any question with that id in questions database)
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question is unavailable');
    }

    //checking the answerId is valid or not(i.e.,checking is there any question with that id in questions database)
    if(!mongoose.Types.ObjectId.isValid(answerId)){
        return res.status(404).send('Answer is unavailable');
    }

    updateNoofQuestions( _id,noOfAnswers )
    try{
        await Questions.updateOne(
            { _id },
            //We will pull the record out from the answer array which is having _id equal to answerId
            //that means we are deleting the specific record of answer having id equals to answerId from answer array 
            { $pull: { 'answer': { _id: answerId } } }
            //after pulling(deleting) is done we update Questions database
        )
        res.status(200).json({ message: "Successfully deleted... "})

    }catch(error)
    {
        res.status(405).json(error)
    }

}