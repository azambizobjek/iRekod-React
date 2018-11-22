import React, { Component,Fragment } from 'react'
// import Breadcrumb from '../components/Breadcrumb'
import '../css/ViewDetail.css'
import MemberView from '../components/MemberView'
import GroupView from '../components/GroupView'
import AccessView from '../components/AccessView'
import {setActivePage} from '../actions/layoutInitAction' 
import {setStakeholderItemDetail,viewStakehMember,viewStakehGroup,viewStakehAccess} from '../actions/stakehViewDetail'
import {setStakehType,setStakehSel,setStakehNumb} from '../actions/stakehTypeAction'
import {setRoleStore,setStakehList,setStkhAccDetail,setAncestor,setDescendant,setSecLevel} from '../actions/stakehUpdateAction'


import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css';
 

class ViewDetail extends Component {    
  constructor(){
      super()
      this.state={
        aclEntries:[]       
      }
  }

  setPageView=(stkhId,type)=>{    
     
    const {user:{bio_access_id:idAccess}} = this.props.session
    
    // console.log(stkhId)
    // console.log(type)
    
    this.props.setStakehSel(stkhId) 
    this.props.setStakehNumb(type)

    //stkh Detail
    const stakehDet={
        stakeholder_id:stkhId,
        bio_access_id:idAccess,
        action:'ITEM_DETAIL',            
    }
    this.props.setStakeholderItemDetail(stakehDet)    

//      //Member
//      const stakehMember={
//         stakeholder_id:stkhId,
//         bio_access_id:idAccess,
//         action:'ITEM_LIST_MEMBER',             
//    }
//    this.props.viewStakehMember(stakehMember)

//     //Group
//     const stakehGroup={
//             stakeholder_id:stkhId,
//             bio_access_id:idAccess,
//             action:'ITEM_LIST_GROUP',             
//     }
//     this.props.viewStakehGroup(stakehGroup)
  }  

  componentDidUpdate(prevProps){
      if(prevProps.stakeholderView.stakeholder_Detail!==this.props.stakeholderView.stakeholder_Detail){
            const {stakeholder_Detail:[{acl_entries}]}=this.props.stakeholderView
            this.setState({aclEntries:acl_entries})
        }        
    }

  setActivePage=(e)=>{
    e.preventDefault()     
    const {user:{stakeholder_id:bId,bio_access_id:idAccess}} = this.props.session
    const {stakehNumb} = this.props.stakeholderlistType
    // console.log(stakehNumb)

    this.props.setActivePage(e.target.getAttribute('data-pagename'))

    const stakehObj={
        stakeholder_id:bId,
        bio_access_id:idAccess,
        action:'ITEM_LIST_TYPE',
        stakeh_type: parseInt(stakehNumb),
      }
      this.props.setStakehType(stakehObj) 
  }

  updDetail=(e)=>{
      e.preventDefault()   

      this.props.setActivePage(e.target.getAttribute('data-pagename'))
      //console.log(('data-pagename'))

      const {user:{bio_access_id:idAccess}} = this.props.session
      const {stakehSel,stakehNumb} = this.props.stakeholderlistType  
      // console.log(stakehNumb)     
            
      //Role List
      const RoleObj={
          action: "ITEM_LIST",
          bio_access_id: idAccess      
      }
      this.props.setRoleStore(RoleObj)
      
        //Stakeholder List
      const stakehList={
          action:"ITEM_LIST",
          bio_access_id:idAccess
      }
      this.props.setStakehList(stakehList)

        //stkh Detail
      const stakehDet={
          stakeholder_id:stakehSel,
          bio_access_id:idAccess,
          action:'ITEM_DETAIL',            
      }
      this.props.setStkhAccDetail(stakehDet)   

      //Ancestor Group
      const listAncestor={
          bio_access_id: idAccess,
          stakeholder_id: stakehSel,
          action: "ITEM_LIST_ANCESTOR",
          stakeh_type: parseInt(stakehNumb)      
      }
      this.props.setAncestor(listAncestor)

      //Descendant Member
      const listDescendant={
          bio_access_id: idAccess,
          stakeholder_id: stakehSel,
          action: "ITEM_LIST_DESCENDANT",
          stakeh_type: parseInt(stakehNumb)      
      }
      this.props.setDescendant(listDescendant)

      //Security Level
       const SecurityObj={
          action: "ITEM_LIST",
          bio_access_id: idAccess      
      }
      this.props.setSecLevel(SecurityObj)

      //List Group
      const stakehGroup={
        stakeholder_id:stakehSel,
        bio_access_id:idAccess,
        action:'ITEM_LIST_GROUP',             
    }
    this.props.viewStakehGroup(stakehGroup)

    //Member
     const stakehMember={
        stakeholder_id:stakehSel,
        bio_access_id:idAccess,
        action:'ITEM_LIST_MEMBER',             
    }
    this.props.viewStakehMember(stakehMember)

    }

  render() {
   
    const {pageTitle}=this.props.layout
    const {stakeholder_Detail,stakeholder_Member,stakeholder_Group} = this.props.stakeholderView
    const {aclEntries}=this.state
    // console.log(stakeholder_Group)
    // const {stakehSel} = this.props.stakeholderlistType
    // console.log(aclEntries)    
      
    return (
      <Fragment>
        <div className="breadcrumb-holder">
            <div className="container-fluid">
                <div className="breadcrumb">
                    <div className="breadcrumb-item"><a href='/' onClick={this.setActivePage} data-pagename="dashboard">Home</a></div>
                    <div className="breadcrumb-item"><a className="breadcrumb-item" href='/' data-pagename="index" onClick={this.setActivePage}>{pageTitle}</a></div>
                    {stakeholder_Detail.map((item,idx)=><div key={idx} className="breadcrumb-item active">{decodeURIComponent(item.full_name)}</div>)}
                </div>
            </div>
        </div>  

    {/* iterate */}
    {stakeholder_Detail.map((item,idx)=>      

        <div key={idx} className="container-fluid mt-3"> 
             <header>
                 <div className="row">
                     <div className="col-auto mr-auto">
                         <h1 className="h3 display">{decodeURIComponent(item.full_name)}</h1>
                     </div>
                     <div className="col-auto mr-4">
                        <span><Tooltip
                            placement="top"
                            overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Add Stakeholder Child</div>}
                            arrowContent={<div className="rc-tooltip-arrow-inner"></div>} >
                                <img className="btn btn-link mr-3" src={require('../img/add.svg')} alt='' />                                                        
                            </Tooltip></span>
                        <span><Tooltip
                            placement="bottom"
                            overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Edit Details</div>}
                            arrowContent={<div className="rc-tooltip-arrow-inner"></div>} >
                                <img className="btn btn-link" src={require('../img/edit.svg')} alt="Edit Details" data-pagename="edit" onClick={this.updDetail} />                                                        
                            </Tooltip></span>                         
                     </div>                     
                 </div>
             </header>
         
               <div className="content">

                 <div className="row">                       
        
                     <div className="col-lg-4 col-md-4 col-sm-4">
                         <div className="card card-user">
                             <div className="card-image">
                                <img src={require('../img/ImgBackground/'+ item.stakeh_type_name +'.jpg')} alt={item.stakeh_type_name} />
                             </div>
                             <div className="card-body">
                                 <div className="author">
                                     <span>                                        
                                        <img src={require('../img/StakeType/'+ item.stakeh_type_name +'.svg')} className="avatar border-gray" alt="..."/>
                                        <h5 className="title">{decodeURIComponent(item.full_name)}</h5>
                                     </span>
                                 </div>
                                 <p className="description text-center">
                                    <label><img className="userIcon mr-2" src={require('../img/email.svg')} alt="email"/>{decodeURIComponent(item.email)} </label>
                                    <br />
                                    <label ></label>
                                 </p>
                                 <div> 
                                    <hr/>
                                 </div>
                                 <h5 className="title text-center">Associate</h5>                                    
                                    {stakeholder_Member.map((item,idx)=><MemberView 
                                        key={idx} 
                                        stkhId={item.stakeholder_id}  
                                        stakehType={item.stakeh_type}                                     
                                        fullName={item.full_name}
                                        typeName={item.stakeh_type_name}
                                        setActivePage={this.setPageView} />)} 
                             </div>
                         </div>
                     </div>

                     <div className="col-lg-8 col-md-8 col-sm-8">

                         <form id="simpleform" name="simpleform">

                             <div className="col-lg-12 col-md-12 col-sm-12">
                                 <div className="card bg-light">
                                     <div className="card-header card-header-transparent d-flex align-items-center">
                                         <h4>Group</h4>
                                     </div>
                                     <div className="card-body">
                                        <div className='col-lg-12 col-md-12 col-sm-12'>
                                            <div className="row">
                                            {stakeholder_Group.map((item,idx)=><GroupView 
                                                    key={idx} 
                                                    stkhId={item.stakeholder_id}                                       
                                                    fullName={item.full_name}
                                                    typeName={item.stakeh_type_name}
                                                    stakehType={item.stakeh_type}  
                                                    setActivePage={this.setPageView}/>)} 
                                            </div>
                                        </div>
                                     </div>
                                 </div>
                             </div>

                             <div className="col-lg-12 col-md-12 col-sm-12">
                                 <div className="card bg-light flex-column">
                                     <div className="card-header card-header-transparent d-flex align-items-center">
                                         <h4>Access Control</h4>
                                     </div>
                                     <div className="card-body">
                                        <div className="col-lg-12 col-md-12 col-sm-12">                                        
                                            <div className="row">                                                                                                           
                                                {aclEntries!==undefined?aclEntries.map((item,idx)=><AccessView
                                                    key={idx} 
                                                    stkhId={item.stakeholder_id}                                       
                                                    fullName={item.stakeholder_name}
                                                    typeName={item.stakeholder_type_id}                                                      
                                                    setActivePage={this.setPageView}                                   
                                                />):''}
                                            </div>
                                         </div>
                                     </div>                                     
                                 </div>                                 
                             </div>
                             {/* <div className="col-lg-12 col-md-12 col-sm-12">
                                 <div className="card bg-light flex-column">
                                     <div className="card-header card-header-transparent d-flex align-items-center">
                                         <h4>Custom Field</h4>
                                     </div>
                                     <div className="card-body">
                                        <div className="col-lg-12 col-md-12 col-sm-12">                                        
                                            <div className="row">                                                                                                           
                                                
                                            </div>
                                         </div>
                                     </div>                                     
                                 </div>                                 
                             </div>                             */}
                         </form>
                     </div> 
                 </div>              
             </div> 
        </div>)}
      </Fragment>
    )
  }
}
ViewDetail.propTypes={
  session: PropTypes.object.isRequired,  
  layout:PropTypes.object.isRequired,
  stakeholderView: PropTypes.object.isRequired,
  setActivePage: PropTypes.func.isRequired,
  setStakeholderItemDetail: PropTypes.func.isRequired,
  viewStakehMember: PropTypes.func.isRequired,
  viewStakehGroup: PropTypes.func.isRequired,
  viewStakehAccess: PropTypes.func.isRequired,
  stakeholderlistType: PropTypes.object.isRequired,
  setStakehType: PropTypes.func.isRequired,
  setStakehSel: PropTypes.func.isRequired,
  setStakehNumb: PropTypes.func.isRequired,
  setRoleStore: PropTypes.func.isRequired,
  setStakehList: PropTypes.func.isRequired,
  setStkhAccDetail: PropTypes.func.isRequired,
  setAncestor: PropTypes.func.isRequired,
  setDescendant: PropTypes.func.isRequired,
  setSecLevel: PropTypes.func.isRequired,
  
  
}

const mapStateToProps= state =>({
      session:state.session,      
      layout:state.layout,
      stakeholderView: state.stakeholderView,
      stakeholderlistType:state.stakeholderlistType,
})
  
export default connect(mapStateToProps,{
    setActivePage,
    setStakeholderItemDetail,
    viewStakehMember,
    viewStakehGroup,
    viewStakehAccess,
    setStakehType,
    setStakehSel,
    setStakehNumb,
    setRoleStore,
    setStakehList,
    setStkhAccDetail,
    setAncestor,
    setDescendant,
    setSecLevel,
    

})(ViewDetail)
