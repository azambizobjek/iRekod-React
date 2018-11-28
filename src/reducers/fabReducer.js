import {FAB_ADD_BTN} from '../actions/types'

const initialState = {
  addChildBtn : false ,
}

export default (state = initialState, action) => {
  switch (action.type) {

  case FAB_ADD_BTN:
    return { ...state,
      addChildBtn:action.payload
    }
  default:
    return state
  }
}
