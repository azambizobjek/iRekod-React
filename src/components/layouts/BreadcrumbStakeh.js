import React, { Component } from 'react'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {setActivePage} from '../../actions/layoutInitAction' 
import {setStakehType} from '../../actions/stakeholderAction/stakehTypeAction'

class BreadcrumbStakeh extends Component {

    setActivePage=(e)=>{
        e.preventDefault()     
        const {user:{stakeholder_id:bId,bio_access_id:idAccess}} = this.props.session
        const {stakehNumb} = this.props.stakeholderlistType
  
        this.props.setActivePage(e.target.getAttribute('data-pagename'))        
       
        const stakehObj={
            stakeholder_id:bId,
            bio_access_id:idAccess,
            action:'ITEM_LIST_TYPE',
            stakeh_type: parseInt(stakehNumb),
          }
          this.props.setStakehType(stakehObj) 
        
     
    }    

  render() {
    const {pageTitle}=this.props.layout
    const {stakeholderDetail} = this.props.stakeholderView
    const {bcIndex,bcDet,bcUpd} = this.props.stakeholderBreadCrumb

    return (

    <div className="breadcrumb-holder">
        <div className="container-fluid">
            <ul className="breadcrumb">
                <a className="breadcrumb-item" href='/' onClick={this.Page} data-pagename="dashboard">Home</a> 
                <a className={bcIndex?"breadcrumb-item active":"breadcrumb-item"} href='/' data-pagename="index" onClick={this.setActivePage}>{pageTitle}</a> 
                <a className={bcDet?"breadcrumb-item active":"d-none"} href='/' data-pagename="viewStakeh" onClick={this.setActivePage}>Details</a>
                {stakeholderDetail.map((item,idx)=><div key={idx} className={bcUpd?"breadcrumb-item active":"d-none"}>{decodeURIComponent(item.full_name)}</div>)}
            </ul>
        </div>
    </div> 

 
 
    )
  }
}
BreadcrumbStakeh.propTypes={
    session: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,
    stakeholderlistType: PropTypes.object.isRequired,
    setActivePage: PropTypes.func.isRequired,
    stakeholderView: PropTypes.object.isRequired,
    stakeholderBreadCrumb: PropTypes.object.isRequired,   
    setStakehType: PropTypes.func.isRequired,
    
  }
  const mapStateToProps= state =>({
    session:state.session,
    layout:state.layout,
    stakeholderView: state.stakeholderView,
    stakeholderBreadCrumb: state.stakeholderBreadCrumb,
    stakeholderlistType: state.stakeholderlistType
    


  })
  export default connect(mapStateToProps,{setActivePage,setStakehType})(BreadcrumbStakeh)
