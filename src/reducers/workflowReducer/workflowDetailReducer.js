import{ LIST_ACTIVITY, LIST_EMAIL, WIZARD_PAGE, SET_ACTIVITY_STORE, SET_EMAIL_STORE, LIST_SUBJECT_ITEM, SET_CONTAINER_LINE, TASK_RESULT_DETAIL,
        LIST_CUSTOM_FIELD_STKH, LIST_TASK_RESULT_STATUS,LIST_SELECTED_TASK_RESULT_TITLE, LIST_SELECTED_TASK_RESULT_STATUS
    } from '../../actions/types'

const initialState={
    activityDet : [],
    listEmailDetails: [],
    wizardPage:'activity',
    activityStore:[],
    emailObj:[], 
    itemListSubject:[],
    containerLine: true,     
    customFieldObj: [],
    taskResulStatusObj:[],
    tskRsltTitle:[],
    tskRsltStatus:[],
    taskResultDetail:[],

  
}

export default function(state = initialState, action){
    switch(action.type){
        case LIST_ACTIVITY:
        return {
            ...state,
            activityDet:action.payload,
        }

        case LIST_EMAIL:
        return {
            ...state,
            listEmailDetails:action.payload,
        }
        
        case WIZARD_PAGE:
        return {
            ...state,
            wizardPage:action.payload,
        }

        case SET_ACTIVITY_STORE:
        return { 
            ...state,
            activityStore:action.payload,
        }  
        case SET_EMAIL_STORE:
        return { 
            ...state,
            emailObj:action.payload,
        }  
        case LIST_SUBJECT_ITEM:
        return { 
            ...state,
            itemListSubject:action.payload,
        }  
        case SET_CONTAINER_LINE:
        return { 
            ...state,
            containerLine:action.payload,
        }       
        case LIST_CUSTOM_FIELD_STKH:
        return { 
            ...state,
            customFieldObj:action.payload,
        } 
        case LIST_TASK_RESULT_STATUS:
        return { 
            ...state,
            taskResulStatusObj:action.payload,
        } 
        case LIST_SELECTED_TASK_RESULT_STATUS:
        return { 
            ...state,
            tskRsltStatus:action.payload,
        } 
        case LIST_SELECTED_TASK_RESULT_TITLE:
        return { 
            ...state,
            tskRsltTitle:action.payload,
        }
        case TASK_RESULT_DETAIL:
        return { 
            ...state,
            taskResultDetail:action.payload,
        } 
        default:
        return state
    }
}
