//put all of reducer inside this file

import {combineReducers} from 'redux'
import {LOG_OUT} from '../actions/types'
import authReducer from './authReducer'
import layoutInitReducer from './layoutInitReducer'
import searchReducer from './searchReducer'
import stakeholderReducer from './stakeholderListTypeReducer'
import fabReducer from './fabReducer'
import stakeholderView from './stakeholderViewReducer'
import stakeholderUpdate from './stakeholderUpdateReducer'
import stakeholderAdd from './stakeholderAddReducer'
 

const appReducer = combineReducers({
    session:authReducer,
    layout:layoutInitReducer,
    searchConf:searchReducer,
    stakeholderlistType:stakeholderReducer,
    fab:fabReducer,
    stakeholderView:stakeholderView,
    stakeholderUpdate:stakeholderUpdate,
    stakeholderAdd:stakeholderAdd,
  
 })

export const rootReducer = ( state, action ) => {
   if ( action.type === LOG_OUT ) {
     state = undefined
   }
   return appReducer(state, action)
 }
