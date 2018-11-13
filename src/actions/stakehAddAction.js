import {ADD_STAKEH,BASIC_DET} from './types'
import {biorisUrl} from '../appConfig'

//Update Stakeholder
export const addStkh = (param) => dispatch =>{
    console.log(param)
    const url=`${biorisUrl}/stakeholder?param=${JSON.stringify(param)}`
        fetch(url,{method:'PUT'})
        .then(res=>res.json())
        .then(res=>{ 
            console.log(res)
            dispatch({
                type:ADD_STAKEH,payload:res
            })
            dispatch({
                type:BASIC_DET,payload:param
            })

        })
}

// export const addStkh = (param) => {
//     console.log(param)
//     return {
//         type:BASIC_DET,
//         payload:param
//     }
// }