import * as api from '../api'
import { setCurrentUser } from './currentUser'

export const signup = (authData,navigate) => async (dispatch) => {
    try{
        //In data we will be storing the data that has come from the backend server of signUp page
        const { data } = await api.signUp(authData) //goes to signUp present in index.js in api folder'
        dispatch({ type: 'AUTH',data})  //stores in redux i.e., goes to auth.js present in reducers folder
        dispatch(setCurrentUser( JSON.parse(localStorage.getItem('Profile')) ))  
        navigate('/')
    }
    catch(error)
    {
        console.log(error)
    }
}
export const login = (authData,navigate) => async (dispatch) => {
    try{
        //In data we will be storing the data that has come from the backend server of signUp page
        const { data } = await api.logIn(authData) //goes to logIn present in index.js in api folder'
        dispatch({ type: 'AUTH',data})  //goes to auth.js present in reducers folder
        dispatch(setCurrentUser( JSON.parse(localStorage.getItem('Profile')) ))
        navigate('/')
    }
    catch(error)
    {
        console.log(error)
    }
}