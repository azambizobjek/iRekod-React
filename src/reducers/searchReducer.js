import {BASIC_SEARCH,STAKEH_LIST} from '../actions/types'
const _ = require('lodash') // Lodash.


const initialState={
    stakehList:[],
    basicKey:null,


}

export default function(state = initialState, action){
    switch(action.type){
        case STAKEH_LIST:
        return {...state,
            stakehList:action.payload,
        }
        case BASIC_SEARCH:
        const {payload} = action
        const filtered = _.filter(state.stakehList, (x) => _.toLower(x.full_name).includes(_.toLower(payload)))
        return {...state, filtered}
        // case TOGGLE_SIDENAV:
        // return {
        //     ...state,
        //     toggleSideNav:action.payload
        // }
        // case SIDENAV_CLASS:
        // return {
        //     ...state,
        //     navBarClass:action.payload
        // }
        // case ACTIVE_PAGE:
        // return {
        //     ...state,
        //     activePage:action.payload
        // }
        default:
        return state
    }
}