import { combineReducers } from 'redux'
import carReducer from './car-reducer'
import userReducer from './user-reducer'

export default combineReducers({
    carReducer,
    userReducer
})