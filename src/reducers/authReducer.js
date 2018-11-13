import{LOGIN_SUCCESS,LOGIN_FAIL,AUTH_LOADING} from '../actions/types'

const initialState={
    user:{},
    isAuth:false,
    authLoading:false
}

export default function(state = initialState, action){
    switch(action.type){
        case LOGIN_SUCCESS:
        return {
            ...state,
            user:action.payload,
            isAuth:true,
            authLoading:false
        }

        case AUTH_LOADING:
        return {
            ...state,
            authLoading:true
         }
        case LOGIN_FAIL:
        return{
            ...state,
            isAuth:false,
            authLoading:false
        }
        default:
        return state
    }
}