import { combineReducers } from 'redux'
import uiReducer from './uiReducer'
import authReducer from './authReducer'
import studentReducer from './studentReducer'
import gradeReducer from './gradeReducer'
import compromiseReducer from './compromiseReducer'



const rootReducer = combineReducers({
    uiReducer, authReducer, studentReducer, gradeReducer, compromiseReducer
})

export default rootReducer