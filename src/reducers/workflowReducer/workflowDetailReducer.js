import{LIST_ACTIVITY, LIST_EMAIL, WIZARD_PAGE, SET_ACTIVITY_STORE, SET_EMAIL_STORE, LIST_SUBJECT_ITEM, SET_CONTAINER_LINE, 
    LIST_ADD_TASK,LIST_CUSTOM_FIELD_STKH, LIST_TASK_RESULT_STATUS,LIST_SELECTED_TASK_RESULT_TITLE, LIST_SELECTED_TASK_RESULT_STATUS} from '../../actions/types'

const initialState={
    activityDet : [],
    listEmailDetails: [],
    wizard_Page:'activity',
    activity_Store:[],
    emailObj:[], 
    itemListSubject:[],
    container_Line: true,
    addTask: [],
    customFieldObj: [],
    taskResulStatusObj:[],
    tskRsltTitle:[],
    tskRsltStatus:[]
  
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
            wizard_Page:action.payload,
        }

        case SET_ACTIVITY_STORE:
        return { 
            ...state,
            activity_Store:action.payload,
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
            container_Line:action.payload,
        } 
        case LIST_ADD_TASK:
        return { 
            ...state,
            addTask:action.payload,
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
        default:
        return state
    }
}
