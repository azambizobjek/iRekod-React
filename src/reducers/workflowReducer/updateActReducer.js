import {UPDATE_ACTIVITY, LIST_UPDATE_ACTIVITY} from '../../actions/types'

const initialState={
    updAct:[],
    activityDet : [],
}

export default function(state = initialState, action){
    switch(action.type){ 
        case UPDATE_ACTIVITY:
        return {
            ...state,
            updAct:action.payload,
        }

         case LIST_UPDATE_ACTIVITY:
        return {
            ...state,
            activityDet:action.payload,
        }

        default:
        return state
    }
}
