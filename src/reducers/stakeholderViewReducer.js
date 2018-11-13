import {STAKEHOLDER_VIEW,STAKEHOLDER_MEMBER,STAKEHOLDER_GROUP,STAKEHOLDER_ACC} from '../actions/types'

const initialState = {
    stakeholder_Detail:[],
    stakeholder_Member:[],
    stakeholder_Group:[],
    stakeholder_Acc:[],   
}

export default (state = initialState, action) => {
  switch (action.type) {

  case STAKEHOLDER_VIEW:
    return { ...state,
        stakeholder_Detail:action.payload,
    }
  case STAKEHOLDER_MEMBER:
    return { ...state,
      stakeholder_Member:action.payload,
    }
  case STAKEHOLDER_GROUP:
    return { ...state,
      stakeholder_Group:action.payload,
    }
  case STAKEHOLDER_ACC:
    return { ...state,
      stakeholder_Acc:action.payload,
    }   
  default:
    return state
  }
}


