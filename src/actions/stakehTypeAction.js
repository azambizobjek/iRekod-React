import {STAKEH_TYPE,STAKEH_SEL,STAKEH_VIEW,SHOW_FAB,STAKEH_NUMB,STAKEHOLDER_LIST} from './types'
import {biorisUrl} from '../appConfig'

export const setStakehType = (stakehType) => dispatch =>{
    // console.log(stakehType)
    const url=`${biorisUrl}/stakeholder?param=${JSON.stringify(stakehType)}`
        fetch(url)
        .then(res=>res.json())
        .then(res=>{
            dispatch({
                type:STAKEH_TYPE,payload:res.results
            })
        })
}

//Select stakeholder
export const setStakehSel=(stakehSel)=>{
    return {
        type:STAKEH_SEL,
        payload:stakehSel
    }
}

//Layout 
export const setStakehViewTrue=(param)=>{
    return {
        type:STAKEH_VIEW,
        payload:param
    }
}
export const setStakehViewFalse=(param)=>{
    return {
        type:STAKEH_VIEW,
        payload:param
    }
}

//Fab
export const setShowFab=(param)=>{
    return {
        type:SHOW_FAB,
        payload:param
    }
}

//Stakeh Number Type
export const setStakehNumb=(param)=>{
    return {
        type:STAKEH_NUMB,
        payload:param
    }
}




 
