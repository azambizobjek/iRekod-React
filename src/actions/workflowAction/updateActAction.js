import {UPDATE_ACTIVITY, LIST_UPDATE_ACTIVITY} from '../types'

import {biorisUrl} from '../../appConfig'

export const updateActivity = (param) => dispatch =>{
    const url=`${biorisUrl}/tasks?param=${JSON.stringify(param)}`
        fetch(url,{method:'POST'})
        .then(res=>res.json())
        .then(res=>{
            dispatch({
                type:UPDATE_ACTIVITY,
                payload:param
            })
        })
}

export const setActivityDetailsUpdate=(activityDet)=>dispatch=>{
    const url=`${biorisUrl}/tasks?param=${JSON.stringify(activityDet)}`
    fetch(url)
    .then(res=>res.json())
    .then(res=>{
        dispatch({
            type: LIST_UPDATE_ACTIVITY,
            payload: res.results
            })
            })

}


