const authReducer = (state= {data: null}, action) => {
      switch(action.type){
        case 'AUTH':
          //as soon as we logged in our profile is stored in localStorage
            localStorage.setItem('Profile',JSON.stringify({...action?.data}))  // In localstorage(after inspect,go to applications there u will find local storage) of browser we are storing the user-data named as PROFILE
            return { ...state,data: action?.data }
        case 'LOGOUT':
            localStorage.clear();  //deleted profile in localStorage
            return { ...state,data: null };
        default:
                return state;
      }

}

export default authReducer