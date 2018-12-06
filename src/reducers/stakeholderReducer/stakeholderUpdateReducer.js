import {WIZARD_PAGE,CONTAINER_LINE,ROLE_STORE,STAKEHOLDER_LIST,STAKEHOLDER_VIEW,ITEM_LIST_ANCESTOR,ITEM_LIST_DESCENDANT,STORE_DETAIL,SECURITY_LEVEL,CUSTOM_FIELD} from '../../actions/types'

const initialState = {
    stakehList:[], //Stakeholder List
    wizard_Page:'basic',
    container_Line: true,
    role_Store:[],
    stkhDetail:[],
    listAncestor:[],
    listDescendant:[],
    storeDetail:[],
    securityLevel:[],     
    customField:[]
}

export default (state = initialState, action) => {
  switch (action.type) {

    case WIZARD_PAGE:
    return { ...state,
        wizard_Page:action.payload,
    } 
    case CONTAINER_LINE:
    return { ...state,
      container_Line:action.payload,
    } 
    case ROLE_STORE:
    return { ...state,
      role_Store:action.payload,
    }   
    case STAKEHOLDER_LIST:
    return {
        ...state,
        stakehList:action.payload
    }
    case STAKEHOLDER_VIEW:
    return {
        ...state,
        stkhDetail:action.payload
    }
    case ITEM_LIST_ANCESTOR:
    return {
        ...state,
        listAncestor:action.payload
    }
    case ITEM_LIST_DESCENDANT:
    return {
        ...state,
        listDescendant:action.payload
    }
    case STORE_DETAIL:
    return {
        ...state,
        storeDetail:action.payload
    }
    case SECURITY_LEVEL:
    return {
        ...state,
        securityLevel:action.payload
    }    
    case CUSTOM_FIELD:
    return {
        ...state,
        customField:action.payload
    }    
    default:
    return state
  }
}
