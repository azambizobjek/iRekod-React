import {MAIN_FAB,SET_SEL_ALL,CHANGE_ISMULTI,SHOW_MULTIFAB} from './types'

 
export const activeFab=(param)=>{
    return {
        type:MAIN_FAB,
        payload:param
    }
}

export const changeMultiSel=(multiStatus)=>dispatch=>{
    dispatch({
        type:CHANGE_ISMULTI,
        payload:multiStatus
    })
     if(!multiStatus){
        dispatch(setSelAll(false))
    }
}

export const setSelAll=(sellAllStats)=>{
    return {
        type:SET_SEL_ALL,
        payload:sellAllStats
    }
}

export const showMultiFab=(multiStatus)=>{
    return {
        type:SHOW_MULTIFAB,
        payload:multiStatus
    }
 }