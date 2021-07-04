import { combineReducers } from 'redux'
import carReducer from './car-reducer'
import authReducer from './auth-reducer'

export default combineReducers({
    carReducer,
    authReducer
})