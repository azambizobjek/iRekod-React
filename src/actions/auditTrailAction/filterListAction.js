import { FILTER_LIST } from '../types'

import {biorisUrl} from '../../appConfig'

export const getFilterList=(filterParam)=>dispatch=>{
    const url=`${biorisUrl}/auditLog?param=${JSON.stringify(filterParam)}`
   fetch(url)
   .then(res=>res.json())
   .then(res=>dispatch({type: FILTER_LIST,
    payload: res.results}))

}