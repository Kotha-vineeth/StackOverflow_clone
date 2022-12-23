const questionsReducer = (state= {data: null}, action) => {
    switch (action.type) {
        case "POST_QUESTION":
            return { ...state }  //we are not returning payload because from backend we are returning only message (i.e.,Posted a Question successfully)
        case "POST_ANSWER":
             return { ...state }
        case 'FETCH_ALL_QUESTIONS':
            return { ...state, data: action.payload}
        default:
            return state
    }
}
export default questionsReducer
