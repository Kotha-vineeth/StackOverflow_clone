import Questions from '../models/Questions.js'
import mongoose from 'mongoose'

//asynchronous funcn bcz await funcn is present inside
export const AskQuestion = async (req,res) => {
    const postQuestionData = req.body;
    //const userId=req?.body?.userId
    //here userId is the id of person who posted that que
    const postQuestion = new Questions(postQuestionData); // storing the postQuestionData data in Questions database
    try{
        await postQuestion.save(); //saving in the database.We wrote await because saving in database may take some time,so wait till it complete 
        res.status(200).json("Posted a question successfully") //sending the response in the form of json file 
    } catch(error){
         console.log(error)
         res.status(409).json("Couldn't post a new question")
    }
}
export const getAllQuestions = async (req,res) => {
    try{
        const questionList = await Questions.find() //questionList will have all the records which is present inside Questions schema as we have used find function
        res.status(200).json(questionList);
    } catch(error){
        console.log(error)
        res.status(404).json({message: error.message});

    }
}

export const deleteQuestion = async(req,res) => {
    const { id:_id } = req.params;  //extracting the id given in link

     //checking the id is valid or not(i.e.,checking is there any question with that id in questions database)
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question is unavailable');
    }
    //Else (that is  question of given id exists in questions datbase so do below operations to delete the question)
    try{
        await Questions.findByIdAndRemove( _id );
        res.status(200).json({ message: "successfully deleted" })

    }catch(error){
        res.status(404).json({ message:error.message })
    }
}

export const voteQuestion = async (req,res ) => {
    const { id: _id} = req.params; //id of question 
    const { value,userId } = req.body;
    //checking the id is valid or not(i.e.,checking is there any question with that id in questions database)
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question is unavailable');
    }
    try{ 
        const question = await Questions.findById(_id)  //finding the record of question with _id in questions database
        const upIndex = question.upVote.findIndex((id) => id === String(userId))
        const downIndex = question.downVote.findIndex((id) => id === String(userId))  //checking if user with id = userId is present in downVote array of Question.If not present downIndex equals to -1
       
        if(value === 'upvote'){
            //if user wants to upvote a question and if user has already downvoted the question before, then we are removing the previous downvote
            if(downIndex !== -1) //user already downvoted the question before
            {
                question.downVote = question.downVote.filter((id) => id !== String(userId)) // we are removing that user from downVotes array
            }
            if(upIndex === -1) //that user has not upvoted till now, so we will increase the upvote value by 1 and pushes the user in upVote array
            {
                question.upVote.push(userId)
            }
            else{
                
                //if user has upvoted a question already (i.e., 0 to +1 ) and if he clicks upvote again then value should decrease from +1 to 0.So we are removing the user from upVote array
                question.upVote = question.upVote.filter((id) => id !== String(userId)) 
            }
        }

        else if(value === 'downvote'){
            //if user wants to downvote a question and if user has already upvoted the question before, then we are removing the previous upvote
            if(upIndex !== -1) //user already upvoted the question before
            {
                question.upVote = question.upVote.filter((id) => id !== String(userId)) // we are removing that user from upVote array
            }
            if(downIndex === -1) //that user has not downvoted till now, so we will increase the downvote value by 1 and pushes the user in downVote array
            {
                question.downVote.push(userId)
            }
            else{
                //if user has downvoted a question already (i.e., 0 to -1 ) and if he clicks downvote again then value should increase from -1 to 0.So we are removing the user from downVote array
                question.downVote = question.downVote.filter((id) => id !== String(userId)) 
            }
        }
       await Questions.findByIdAndUpdate( _id,question ) //update the reflected changes in question record with id = _id.So we are updating the entire question record 
       res.status(200).json({ message: "voted successfully..."})
    } catch(error){
        res.status(404).json({ message:error.message })
    }
} 