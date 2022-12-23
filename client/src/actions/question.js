import React from 'react'
import * as api from '../api'

// questionData consists of { questionTitle,questionBody,questionTags,userPosted: User.result.name }
export const askQuestion = (questionData,navigate) => async(dispatch) => {
   try{
      const { data } = await api.postQuestion(questionData) //sending questionData to postQuestion in index.js in api folder and collects the data sent by server in {data}
      dispatch({ type: 'POST_QUESTION', payload: data})  //goes to reducers folder file named questions.js
      dispatch(fetchAllQuestions()) //fetchAllQuestions() is present below
      navigate('/')  //navigate to home page after u clicked review your question button
   } catch(error){
      console.log(error)
   }
}

export const fetchAllQuestions = () => async (dispatch) => {

   try{ 
     const { data } = await api.getAllQuestions()
     dispatch({ type: 'FETCH_ALL_QUESTIONS', payload: data})
   }
   catch(error){
     console.log(error);
   }
 }

 export const deleteQuestion = (id,navigate) => async (dispatch) => {
  try {
    const { data } = api.deleteQuestion(id)
    dispatch(fetchAllQuestions())  //re-runs and get all the records of database
    navigate('/')
  } catch(error){
    console.log(error)
  }
 }

export const voteQuestion = (id,value,userId) => async (dispatch) => {
  try{
    const { data } = await api.voteQuestion(id, value, userId)
    dispatch(fetchAllQuestions())
  } catch(error) {
    console.loog(error)
  }
}

 export const postAnswer = (answerData) => async (dispatch) => {
   try {
       const { id, noOfAnswers, answerBody, userAnswered, userId } = answerData;
 
       const { data } = await api.postAnswer( id, noOfAnswers, answerBody, userAnswered, userId )  //In data we will get the updated record from database. 
 
       dispatch({ type: 'POST_ANSWER', payload: data})  
 
       dispatch(fetchAllQuestions())
       
   } 
   catch (error) {
       console.log(error)
   }
 }

 export const deleteAnswer = ( id, answerId, noOfAnswers ) => async (dispatch) => {
  try {
       const { data } = api.deleteAnswer(id, answerId, noOfAnswers)
      
       dispatch(fetchAllQuestions())

  } catch(error) {

    console.log(error)
    
  }
 }


 
 