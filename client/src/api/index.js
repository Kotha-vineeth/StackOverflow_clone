import axios from 'axios'

//here we are connecting to backend
//'http://localhost:5000'
const API = axios.create({ baseURL: 'https://stack-overflow-clone-1bvj6uzki-kotha-vineeth.vercel.app'})

//Here for every request we r sending the token.If token is valid then continue else no.Example : If we want to post a question we r sending the request to server along with token.First it check if token is valid then it allows to change in database else no. 
API.interceptors.request.use((req) => {
  if(localStorage.getItem('Profile')){
      req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`
  }
  return req;
})

//sending post request to server(i.e., backend) 
//sends the authData as parameter to server(i.e, index.js file in server)
export const logIn = (authData) => API.post('/user/login',authData) // goes to index.js file in server and searches for '/user/login'
export const signUp = (authData) => API.post('/user/signup',authData)

//id means id of question
//patch means update request to server

export const postQuestion = (questionData) => API.post('/questions/Ask',questionData)
export const getAllQuestions = () => API.get('/questions/get');
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`)
export const voteQuestion = (id,value,userId) => API.patch(`/questions/vote/${id}`, { value, userId })

export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId) => API.patch(`/answer/post/${id}`, { noOfAnswers, answerBody, userAnswered, userId });
export const deleteAnswer = (id, answerId, noOfAnswers) => API.patch(`/answer/delete/${id}`, {answerId, noOfAnswers})

export const fetchAllUsers = () => API.get('/user/getAllUsers');
export const updateProfile = (id, updateData) => API.patch(`/user/update/${id}`,updateData)
