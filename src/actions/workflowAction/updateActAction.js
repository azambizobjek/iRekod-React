import {UPDATE_ACTIVITY, LIST_UPDATE_ACTIVITY,SELECTED_RECIPIENTS, LIST_EMAIL_RECIPIENTS, SELECTED_INC_STAKEH} from '../types'

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

export const setIncStakeh=(param)=>{
    return {
        type:SELECTED_INC_STAKEH,
        payload:param
    }
}

export const setRecipients=(param)=>{
    return {
        type:SELECTED_RECIPIENTS,
        payload:param
    }
}

export const taskEmailRecipients=(param)=>{
    return {
        type:LIST_EMAIL_RECIPIENTS,
        payload:param
    }
}




