import { FILTER_LIST,DATE_CREATED } from '../../actions/types'

const initialState = {
    filterList:[],

}

export default (state = initialState, action) => {
  switch (action.type) {

  case FILTER_LIST:
    return {
        ...state,
        filterList:action.payload
    }

   

  default:
    return state
  }
}
