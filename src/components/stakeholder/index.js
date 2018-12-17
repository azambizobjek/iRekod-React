import React, { Component, Fragment } from 'react'
import update from 'immutability-helper' 
import Pagination from 'rc-pagination'
import {setStakehSel,setStakehViewTrue,setStakehViewFalse,setShowFab} from '../../actions/stakeholderAction/stakehTypeAction' 
import {setActivePage} from '../../actions/layoutInitAction' 
import {setStakeholderItemDetail,viewStakehMember,viewStakehGroup,viewStakehAccess,setDelBtn} from '../../actions/stakeholderAction/stakehViewDetail'
import {bcDet,bcIndex} from '../../actions/stakeholderAction/stakehBreadCrumbAction'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import BreadCrumb from '../layouts/BreadcrumbStakeh'
import CardRow from '../stakeholder/CardRow'  
import DetailCard from '../stakeholder/DetailCard'
import Fab from '../fab/FabStakeholder'
import MainFab from '../fab/MainFab'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'
import 'rc-pagination/assets/index.css' 
 
 

class index extends Component {
    constructor() {
        super();     
        this.state = {
            stakeholderlistType:[],
            stakehSelect:null,            
        };
    }   

    componentDidUpdate(prevProps){
        if(prevProps.stakeholderlistType.stakehType!==this.props.stakeholderlistType.stakehType){                   
            const {stakehType}=this.props.stakeholderlistType 
            // console.log(stakehType)   
            const liststakeh = stakehType.map(res=>({...res,isSel:false}))
            // console.log(liststakeh)
            
            this.setState({
                stakeholderlistType:liststakeh
            })
        }   
        if(prevProps.stakeholderlistType.stakehSel!==this.props.stakeholderlistType.stakehSel){
            const {stakehSel}=this.props.stakeholderlistType
            this.setState({stakehSelect:stakehSel})
        }   
             
    }

    //Selection 
    markOnSel=(sId)=>{
        
        this.props.setStakehSel(sId)     
        // console.log(sId)
        
        const {stakeholderlistType} = this.state
        // console.log({stakeholder} )
        const itmIdx = stakeholderlistType.findIndex(itm=>itm.stakeholder_id === sId)
        const desIdx = stakeholderlistType.findIndex(itm=>itm.isSel===true)
       

        // console.log(itmIdx)

        const newStakeholderList = desIdx === -1?
        update(stakeholderlistType,{
          [itmIdx]:{isSel:{$set:true}}
        })
        :update(stakeholderlistType,{
          [itmIdx]:{isSel:{$set:true}},
          [desIdx]:{isSel:{$set:false}}
        })       
         
        // console.log(newStakeholderList)

        //select
        if (itmIdx===desIdx){
            this.props.setShowFab(false)
            this.props.setStakehSel(null)            
        }
        else{
            this.props.setShowFab(true)
        }

        this.setState({
            stakeholderlistType: newStakeholderList             
        })
    }
    pageBreadCrumb=(e)=>{
        e.preventDefault()
        this.props.setActivePage(e.target.getAttribute('data-pagename'))
        
    }

    //Fab View Detail
    setActivePage=(FabRec)=>{         
        const {stakehSel:bId} = this.props.stakeholderlistType
        const {user:{bio_access_id:idAccess}} = this.props.session

        this.props.bcIndex(false)
        this.props.bcDet(true) //breadcrumb Detail page 
       
        this.props.setActivePage(FabRec)  //direct page to viewDetail
        // console.log(FabRec)

        //stkh Detail
        const stakehDet={
            stakeholder_id:bId,
            bio_access_id:idAccess,
            action:'ITEM_DETAIL',            
        }
        this.props.setStakeholderItemDetail(stakehDet)    
        
        //Member
       const stakehMember={
            stakeholder_id:bId,
            bio_access_id:idAccess,
            action:'ITEM_LIST_MEMBER',             
       }
       this.props.viewStakehMember(stakehMember)

       //Group
       const stakehGroup={
            stakeholder_id:bId,
            bio_access_id:idAccess,
            action:'ITEM_LIST_GROUP',             
       }
       this.props.viewStakehGroup(stakehGroup)

    //    //Access Control
    //    const stakehAcc={
    //         stakeholder_id:bId,
    //         bio_access_id:idAccess,
    //         action:'ITEM_ACCESS',             
    //     }
    //     this.props.viewStakehAccess(stakehAcc)   
      
    } 

    //Delete Btn
    delBtn=()=>{
        if (window.confirm("Are you sure want to delete it?")){          
            const {stakehSelect} = this.state
            const {stakehNumb,stakehType} = this.props.stakeholderlistType
            const {activePage,pageTitle} = this.props.layout    
            const {user:{stakeholder_id:bId,bio_access_id:idAccess}} = this.props.session      
            //  console.log(stakehNumb)       

            const stakehObj={
                bio_access_id:idAccess,
                stakeholder_ids:[stakehSelect]        
            }
            this.props.setDelBtn(stakehObj)
                alert("Successful Deleted") 
            
            const newStakehList = stakehType.filter(x=>x.stakeholder_id !== stakehSelect) 
            // console.log(arr)
            this.setState({
                stakeholderlistType:newStakehList
            })                         
        }
        else{}     
       
    }

    //Add Stakeholder Child
    child=(page)=>{
     
        this.props.setActivePage(page)   
        // console.log(page)
    }
    
    //LayoutView
    stakehViewList=()=>{        
        this.props.setStakehViewTrue(true)        
    }
    stakehViewCard=()=>{       
        this.props.setStakehViewFalse(false)
    }    

    //change page to New Stakeholder
    pageChange=(param)=>{
        this.props.setActivePage(param)
    }

  
   
    render() {
        
        const {stakehView,showFab,stakehNumb}=this.props.stakeholderlistType
        const {pageTitle}=this.props.layout
        const {stakeholderlistType,current}=this.state         
        // const {stakeholder_Detail}=this.props.stakeholderView 
        // console.log(stakeholderlistType)
        
        return (
            <Fragment>  
                <BreadCrumb/>
                
                 {/* <div className="breadcrumb-holder">
                    <div className="container-fluid">
                        <div className="breadcrumb">
                            <div className="breadcrumb-item"><a href='/' onClick={this.pageBreadCrumb} data-pagename="dashboard">Home</a></div>
                            <div className="breadcrumb-item">{pageTitle}</div>
                            
                        </div>
                    </div>
                </div>              */}

                <section>
                    <div className="container-fluid">
                        <header>
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <h1 className="h3 display"><strong>{pageTitle}</strong></h1>  
                       
                                <div className="d-flex align-items-center">                          

                                    <Tooltip
                                        placement="top"
                                        overlay={<div style={{ height: 20, width: '100%' }}>List View</div>}
                                        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                                        <button className="btn btn-sm btn-primary" onClick={this.stakehViewList}>
                                            <i className="fa fa-tasks"></i>
                                        </button>                            
                                    </Tooltip>

                                    <Tooltip
                                        placement="top"
                                        overlay={<div style={{ height: 20, width: '100%' }}>Card View</div>}
                                        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                                        <button className="btn btn-sm btn-primary ml-2" onClick={this.stakehViewCard}>
                                            <i className="fa fa-th" aria-hidden="true"></i>
                                        </button>
                                    </Tooltip>

                                    <Tooltip
                                        placement="top"
                                        overlay={<div style={{ height: 20, width: '100%' }}>Sort by latest creation</div>}
                                        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                                        <button className="btn btn-sm btn-primary ml-2"  alt="Sort" onClick={this.sortItem}>
                                            <i className="fa fa-sort-amount-asc" aria-hidden="true"></i>
                                        </button>
                                    </Tooltip>
 
                                </div>
                        </div>
                        </header>               
                            <div className="row">    
                            
                                {stakeholderlistType.map(item=>stakehView?
                                 
                                    <DetailCard                                         
                                        key={item.stakeholder_id} 
                                        stakehId={item.stakeholder_id}
                                        name={item.first_name}
                                        typeName={item.stakeh_type_name}
                                        isSel={item.isSel}
                                        markOnSel={this.markOnSel} />:

                                    <CardRow                                         
                                        key={item.stakeholder_id} 
                                        stakehId={item.stakeholder_id}
                                        name={item.first_name}
                                        typeName={item.stakeh_type_name}
                                        isSel={item.isSel}
                                        markOnSel={this.markOnSel} />                             
                                )}     

                                {showFab?<Fab
                                    FabRec={this.setActivePage}
                                    delBtn={this.delBtn}                                   
                                    stakehNumb={stakehNumb} 
                                    addChild={this.child}
                                    addStakeh={this.pageChange} />:""
                                    
                                }

                                
                            </div>    
                            {/* <div className="modal-footer">
                                <Pagination onChange={this.pagination} current={current} total={25} />    
                            </div> */}
                    </div>
                            
                        
                </section>           
            </Fragment>
        )
    }
}
index.propTypes={
    session: PropTypes.object.isRequired,
    stakeholderlistType: PropTypes.object.isRequired,
    stakeholderView: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,    
    setStakehViewTrue: PropTypes.func.isRequired,
    setStakehViewFalse: PropTypes.func.isRequired,   
    setShowFab: PropTypes.func.isRequired,   
    setActivePage: PropTypes.func.isRequired,
    setStakeholderItemDetail: PropTypes.func.isRequired,
    viewStakehMember: PropTypes.func.isRequired,
    viewStakehGroup: PropTypes.func.isRequired,
    viewStakehAccess: PropTypes.func.isRequired,    
    setDelBtn: PropTypes.func.isRequired,   
    bcDet: PropTypes.func.isRequired,
    bcIndex: PropTypes.func.isRequired,
    
    
   
    
     
}

const mapStateToProps= state =>({
        session:state.session,
        stakeholderlistType:state.stakeholderlistType,
        layout:state.layout,
        stakeholderView: state.stakeholderView,
       
         
})
    
export default connect(mapStateToProps,{
    setStakehSel,
    setStakehViewTrue,
    setStakehViewFalse,
    setShowFab,
    setActivePage,
    setStakeholderItemDetail,
    viewStakehMember,
    viewStakehGroup,
    viewStakehAccess,    
    setDelBtn,
    bcDet,
    bcIndex
    
   
   
   
    
   
    
})(index)