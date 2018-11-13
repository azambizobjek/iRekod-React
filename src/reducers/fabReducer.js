import {SET_FAB} from '../actions/types'

const initialState = {
    setFab: false,
}

export default (state = initialState, action) => {
  switch (action.type) {

  case SET_FAB:
    return { ...state,
        setFab:action.payload
    }
  default:
    return state
  }
}
