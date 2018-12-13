//put all of reducer inside this file
import {combineReducers} from 'redux'
import {LOG_OUT} from '../actions/types'
import authReducer from './authReducer'
import layoutInitReducer from './layoutInitReducer'
import searchReducer from './searchReducer'
// import fabReducer from './fabReducer'

//stakeholder
import stakeholderReducer from './stakeholderReducer/stakeholderListTypeReducer'
import stakeholderView from './stakeholderReducer/stakeholderViewReducer'
import stakeholderUpdate from './stakeholderReducer/stakeholderUpdateReducer'
import stakeholderAdd from './stakeholderReducer/stakeholderAddReducer'

//workflow
import listWorkFlowReducer from './workflowReducer/listWorkFlowReducer'
import workFlowDetailsReducer from './workflowReducer/workflowDetailReducer'
import createNewReducer from './workflowReducer/createNewActReducer'
import updateActReducer from './workflowReducer/updateActReducer'
 

const appReducer = combineReducers({
    session:authReducer,
    layout:layoutInitReducer,
    searchConf:searchReducer,
   
    //stakeholder
    stakeholderlistType:stakeholderReducer,    
    stakeholderView:stakeholderView,
    stakeholderUpdate:stakeholderUpdate,
    stakeholderAdd:stakeholderAdd,

    //workflow
    listWrkFlw: listWorkFlowReducer,
    workflowDetail: workFlowDetailsReducer,
    crtNewReducer: createNewReducer,
    updActReducer: updateActReducer,
  
 })

export const rootReducer = ( state, action ) => {
   if ( action.type === LOG_OUT ) {
     state = undefined
   }
   return appReducer(state, action)
 }
