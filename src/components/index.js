import React, { Component, Fragment } from 'react'
import update from 'immutability-helper' 
import Pagination from 'rc-pagination'
import {setStakehSel,setStakehViewTrue,setStakehViewFalse,setShowFab,setStakehType} from '../actions/stakehTypeAction' 
import {setActivePage,setPageTitle} from '../actions/layoutInitAction' 
import {setStakeholderItemDetail,viewStakehMember,viewStakehGroup,viewStakehAccess,setDelBtn} from '../actions/stakehViewDetail'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import CardRow from '../components/CardRow'  
import DetailCard from '../components/DetailCard'
import Fab from '../components/fab/Fab'
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
            const {stakehNumb} = this.props.stakeholderlistType
            const {activePage,pageTitle} = this.props.layout    
            const {user:{stakeholder_id:bId,bio_access_id:idAccess}} = this.props.session      
            //  console.log(stakehNumb)       

            const stakehObj={
                bio_access_id:idAccess,
                stakeholder_ids:[stakehSelect]        
            }
            this.props.setDelBtn(stakehObj)
                alert("Successful Deleted")  
            // this.props.setActivePage(activePage)
            // this.props.setPageTitle(pageTitle)

            // const callObj={
            //     stakeholder_id:bId,
            //     bio_access_id:idAccess,
            //     action:'ITEM_LIST_TYPE',
            //     stakeh_type: parseInt(stakehNumb),
            //   }
        
            // this.props.setStakehType(callObj) 
            // this.forceUpdate();
            

        }
        else{}

       
       
        
    }

    //Add Stakeholder Child
    child=(page)=>{
     
        this.props.setActivePage(page)   
        // console.log(test)
    }
    
    //LayoutView
    stakehViewList=()=>{        
        this.props.setStakehViewTrue(true)        
    }
    stakehViewCard=()=>{       
        this.props.setStakehViewFalse(false)
    }    

    //change page to New Stakeholder
    pageChange=(e)=>{
        e.preventDefault()   
  
        this.props.setActivePage(e.target.getAttribute('data-pagename'))
        //console.log(('data-pagename'))
    }

  
   
    render() {
        
        const {stakehView,showFab,stakehNumb}=this.props.stakeholderlistType
        const {pageTitle}=this.props.layout
        const {stakeholderlistType,current}=this.state
        const {addChildBtn} = this.props.fab
        // const {stakeholder_Detail}=this.props.stakeholderView 
        // console.log(stakeholderlistType)
        
        return (
            <Fragment>  
                 <div className="breadcrumb-holder">
                    <div className="container-fluid">
                        <div className="breadcrumb">
                            <div className="breadcrumb-item"><a href='/' onClick={this.pageBreadCrumb} data-pagename="dashboard">Home</a></div>
                            <div className="breadcrumb-item">{pageTitle}</div>
                            
                        </div>
                    </div>
                </div>             

                <section>
                    <div className="container-fluid">
                        <header>
                            <div className="row">
                                <h1 className="h3 display col-auto mr-auto"> 
                                    {pageTitle}
                                </h1>                            
                                    <div className="col-auto mr-4">
                                        <div className="form-group">                                            
                                            <div className="col-auto row">
                                                <div className="mr-4 ml-3">
                                                    <Tooltip
                                                        placement="top"
                                                        overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>List View</div>}
                                                        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                                                        >
                                                            <img onClick={this.stakehViewList} className="btn btn-light" src={require('../img/list.svg')} alt="List"/>                                                        
                                                        </Tooltip>  
                                                </div>
                                                <div className="mr-4">  
                                                    <Tooltip
                                                        placement="bottom"
                                                        overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Card View</div>}
                                                        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                                                        >
                                                            <img onClick={this.stakehViewCard} className="btn btn-light" src={require('../img/card.svg')} alt="Card"/>                                                        
                                                        </Tooltip>    
                                                </div>                                   
                                                <div className="mr-4">    
                                                    <Tooltip
                                                        placement="top"
                                                        overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>New Stakeholder</div>}
                                                        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                                                        >
                                                            <img className="btn btn-delete btn-light" src={require('../img/add.svg')} alt="add" data-pagename="addStakeholder" onClick={this.pageChange}/>                                                       
                                                    </Tooltip>                                 
                                                </div>
                                            </div>
                                        </div>
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
                                    addChild={this.child}
                                    stakehNumb={stakehNumb} />:''}

                                
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
    fab: PropTypes.object.isRequired,
    setStakehViewTrue: PropTypes.func.isRequired,
    setStakehViewFalse: PropTypes.func.isRequired,   
    setShowFab: PropTypes.func.isRequired,   
    setActivePage: PropTypes.func.isRequired,
    setStakeholderItemDetail: PropTypes.func.isRequired,
    viewStakehMember: PropTypes.func.isRequired,
    viewStakehGroup: PropTypes.func.isRequired,
    viewStakehAccess: PropTypes.func.isRequired,    
    setDelBtn: PropTypes.func.isRequired,    
    setStakehType: PropTypes.func.isRequired, 
    setPageTitle: PropTypes.func.isRequired, 
   
    
     
}

const mapStateToProps= state =>({
        session:state.session,
        stakeholderlistType:state.stakeholderlistType,
        layout:state.layout,
        stakeholderView: state.stakeholderView,
        fab:state.fab,
         
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
    setStakehType,
    setPageTitle
   
   
    
   
    
})(index)