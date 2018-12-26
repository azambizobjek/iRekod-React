import {UPDATE_ACTIVITY, LIST_UPDATE_ACTIVITY, SELECTED_RECIPIENTS, SELECTED_INC_STAKEH, LIST_EMAIL_RECIPIENTS, VIEW_RECIPIENTS} from '../../actions/types'

const initialState={
    updAct:[],
    det : [],
    selRecipients: [],
    incStakehObj:[],
    emailRecipients:[],
    rec:[]
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
            det:action.payload,
        }

        case SELECTED_RECIPIENTS:
        return {
            ...state,
            selRecipients:action.payload,
        }
        case LIST_EMAIL_RECIPIENTS:
        return {
            ...state,
            emailRecipients:action.payload,
        }
        case SELECTED_INC_STAKEH:
        return {
            ...state,
            incStakehObj:action.payload,
        }

        case VIEW_RECIPIENTS:
        return {
            ...state,
            rec:action.payload,
        }

        default:
        return state
    }
}
