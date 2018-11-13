import {ADD_STAKEH,BASIC_DET} from '../actions/types'


const initialState = {
    addStakeh:[],
    basicDet:[],
     
 
}

export default (state = initialState, action) => {
  switch (action.type) {

    case ADD_STAKEH:
    return { ...state,
      addStakeh:action.payload,
    } 
    case BASIC_DET:
    return { ...state,
      basicDet:action.payload,
    }      
    default:
    return state
  }
}
