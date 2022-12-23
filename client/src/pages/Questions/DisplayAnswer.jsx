import React from 'react'
import { Link,useParams } from 'react-router-dom'
import moment from 'moment'
import { useSelector,useDispatch } from 'react-redux'

import Avatar from '../../components/Avatar/Avatar'
import {deleteAnswer} from '../../actions/question'

export const DisplayAnswer = ({question,handleShare}) => {

    const User = useSelector((state) => (state.currentUserReducer)) //retrieving/extracting the user who is logged in which will be stored in redux(i.e.,in reducers folder)
    const { id }  = useParams()  // id of the question which is retrievied from url
    
    const dispatch = useDispatch()

    const handleDelete = (answerId, noOfAnswers) => {
        dispatch(deleteAnswer(id,answerId,noOfAnswers-1))
    }

  return (
    <div>
        {
            question.answer.map((ans) => (
                <div className="display-ans" key={ans._id}>
                    <p>{ans.answerBody}</p>
                    <div className="question-actions-user">
                        <div>
                            <button type="button" onClick={handleShare}>Share</button>

                            {
                                //checking if id of user who logged in is same as id of user who answered the question 
                                User?.result?._id === ans?.userId && (
                                <button type='button' onClick={()=>handleDelete(ans._id, question.noOfAnswers)}>Delete</button>
                                )
                            }
                            
                        </div>
                        <div>
                            <p>Answered {moment(ans.answeredOn).fromNow()}</p>
                            <Link to={`/Users/${ans.userId}`} className='user-link' style={{color: '#0086d8'}}>
                            <Avatar backgroundColor="green" px='8px' py='5px'>{ans.userAnswered.charAt(0).toUpperCase()}</Avatar>
                             <div>
                            {ans.userAnswered}
                            </div>
                            </Link>
                        </div>
                    </div>  
                </div>
            ))
        }
    </div>
  )
}
