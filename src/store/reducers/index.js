import changeNum from './IncDecNum'
import AllUsers from './SignUp_In'
import { combineReducers } from 'redux'
const rootReducer = combineReducers({
    changeNum,
    AllUsers,
})

export default rootReducer