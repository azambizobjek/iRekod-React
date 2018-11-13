import {BASIC_SEARCH} from './types'


export const basicSearch=(searchKey)=>{
   return {
       type:BASIC_SEARCH,
       payload:searchKey
   }
}
// export const setSideNavClass=(sideNavClass)=>{
//     return {
//         type:SIDENAV_CLASS,
//         payload:sideNavClass
//     }
//  }
// export const setNavToggle=(toggleVal, pageClass, navClass)=>dispatch=>{
//     if(toggleVal){
//         dispatch(setSideNavClass(navClass))
//         dispatch(setPageClass(pageClass))
//         dispatch({type:TOGGLE_SIDENAV,payload:toggleVal})
//     }else{
//         dispatch(setSideNavClass('side-navbar'))
//         dispatch(setPageClass('page'))
//         dispatch({type:TOGGLE_SIDENAV,payload:toggleVal})
//     }
//  }
//  export const setActivePage=(pageName)=>{
//     return {
//         type:ACTIVE_PAGE,
//         payload:pageName
//     }
//  }