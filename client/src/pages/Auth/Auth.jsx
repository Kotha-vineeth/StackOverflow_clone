import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './Auth.css' 
import icon from '../../assets/icon.png'
import AboutAuth from './AboutAuth'
import {signup,login} from '../../actions/auth'

const Auth = () => {

  const [isSignup,setIsSignup] = useState(false)
  {/* Intially isSignup = false which means we are in login page*/}
  {/* If isSignup = true which means we are in SignUp page*/}
  
  const[name,setName] = useState('')
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSwitch = () => {
    setIsSignup(!isSignup)
  }

  const handleSubmit = (e) => {
     e.preventDefault()
     if(!email && !password)
     {
        alert("Enter Email and Password")
     }
     if(isSignup)
     {
        if(!name)
        {
            alert("Enter a name to continue")
        }
        //dipatch the action signup(i.e.,auth.js) which is present in actions folder
        //signup is an action
        dispatch(signup({ name,email,password },navigate))
     }
     else
     {
        //dipatch the action which is present in auth.js in actions folder
        dispatch(login({ email,password },navigate))
     }

  }

  return (
    <setion class='auth-section'>

        {isSignup && <AboutAuth />}

        <div class='auth-container-2'>
            { !isSignup && <img src={icon} alt='stack overflow' className='login-logo' />}
            <form onSubmit={handleSubmit}>
                {
                    isSignup && [
                        <label htmlFor='name'>
                        <h4>Display Name</h4>
                        <input type="text" name='name' id='name' onChange={(e) => {setName(e.target.value)}}/>
                        </label>
                    ]
                }
                {/* htmlFor value and id value should be equal */}
                <label htmlFor="email">
                    <h4>Email</h4>
                    <input type="email" name='email' id='email' onChange={(e) => {setEmail(e.target.value)}}/>
                </label>
                <label htmlFor="password">
                    <div style={{display : "flex",justifyContent : "space-between"}}>
                    <h4>Password</h4>
                    { !isSignup && <p style={{color: "#007ac6",fontSize:'13px'}}>Forgot Password?</p>}
                    </div>
                    <input type="password" name='password' id='password' onChange={(e) => {setPassword(e.target.value)}}/>
                    { isSignup && <p style={{color: "#666767", fontSize: "13px"}}>Passwords must contain at least eight <br/>characters, including at least 1 letter and 1<br/> number.</p>}
                </label>

                {
                    isSignup && [
                        <label htmlFor='check'>
                            <input type="checkbox" id='check'/>
                            <p style={{fontSize: "13px"}}>Opt-in to receive occasional product<br/> updates, user research invitations, company<br/> announcements, and digests.</p>
                        </label>
                    ]
                }
                <button type='submit' className='auth-btn'>{isSignup ? 'Sign up' : 'Log In'}</button>

                {
                    isSignup && [
                        <p style={{color: "#666767", fontSize: "13px"}}>
                            By clicking “Sign up”, you agree to our
                            <span style={{color: "#007ac6"}}> terms of<br/> service</span>,
                            <span style={{color: "#007ac6"}}> privacy policy </span>
                            and<span style={{color: "#007ac6"}}> cookie policy</span>
                        </p>
                    ]
                }
            </form>
            <p>
                {isSignup ? 'Already have an account?' : "Don't have an account?"}
                <button type='button' className='handle-switch-btn' onClick={handleSwitch}>{isSignup ? "Log In" : "Signup"}</button>
            </p> 
        </div>

    </setion>
  )
}

export default Auth