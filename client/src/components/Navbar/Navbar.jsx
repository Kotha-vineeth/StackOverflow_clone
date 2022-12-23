import React,{ useEffect } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { useDispatch, useSelector  } from 'react-redux'
import decode from 'jwt-decode'

import logo from '../../assets/logo.png'
import search from '../../assets/search-solid.svg'
import Avatar from '../../components/Avatar/Avatar'

import './Navbar.css'
import { setCurrentUser } from '../../actions/currentUser'

const Navbar = () => {
  const dispatch = useDispatch()
  
  var User = useSelector((state) => (state.currentUserReducer)) //stores the current user who has logged in from redux(i.e., from currentUser.js in Reducers folder)
  const navigate = useNavigate()

  const handleLogout = () => {
     dispatch({ type: 'LOGOUT'}); //goto auth in reducers folder
     navigate('/')
     dispatch(setCurrentUser(null)) //making current user as null
  }

  //This is used to ensure avatar and logout button still exists on navbar after logging in irrespective of reloading the browser
  useEffect(() =>{
      const token = User?.token
      //if token is alive we have given expiry time as 1hr.If user has logged in and opened the application for 1hr, after 1hr user will be automatically logged out.This is called token based authentication
      if(token){
        const decodedToken = decode(token)
        if(decodedToken.exp * 1000 < new Date().getTime()){  // Date().getTime() gives present time
            handleLogout()
        }
      }
      dispatch(setCurrentUser( JSON.parse(localStorage.getItem('Profile')))) 
  },[dispatch])

  return (
    <nav className='main-nav'>
       <div className='navbar'>
          <Link to='/' className='nav-item nav-logo'>
            <img src={logo} alt='logo' />
          </Link>
          <Link to='/' className='nav-item nav-btn' >About</Link>
          <Link to='/' className='nav-item nav-btn' >Products</Link>
          <Link to='/' className='nav-item nav-btn' >For Teams</Link>
          <form>
            <input type="text" placeholder='Search...'/>
            <img src={search} alt="search" width="18" className='search-icon'/>
          </form>
          { User === null ?
             <Link to='/Auth' className='nav-item nav-links'>Log in</Link>
             : 
             <>
                { /* User.result._id gives the id of user from Users database who has logged in*/ }
                <Avatar backgroundColor='#009dff' px="10px" py="7px" borderRadius="50%" color='white'><Link to={`/Users/${User.result._id}`} style={{color:"white",textDecoration:'none'}}>{User.result.name.charAt(0).toUpperCase()}</Link></Avatar>
                <button className='nav-item nav-links' onClick={handleLogout}>Log out</button>
             </> 
          }
       </div>
    </nav>
  )
}

export default Navbar