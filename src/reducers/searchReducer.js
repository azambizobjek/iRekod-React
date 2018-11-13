import {BASIC_SEARCH} from '../actions/types'


const initialState={
    basicKey:null

}

export default function(state = initialState, action){
    switch(action.type){
        case BASIC_SEARCH:
        return {
            ...state,
            basicKey:action.payload,
        }
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