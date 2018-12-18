import React, { Component } from 'react'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {setActivePage} from '../../actions/layoutInitAction'

class Breadcrumb extends Component {

    setActivePage=(e)=>{
        e.preventDefault()       
  
        this.props.setActivePage(e.target.getAttribute('data-pagename'))
        // console.log(e.target.getAttribute('data-pagename'))
     
        
     
    } 

  render() {
    const {pageTitle}=this.props.layout
    const {stakeholderDetail,breadCrumb_View} = this.props.stakeholderView

    return (
        <ul className="breadcrumb">
            <a className="breadcrumb-item" href='/' onClick={this.setActivePage} data-pagename="dashboard">Home</a>
                <a className="breadcrumb-item" href='/' data-pagename="index" onClick={this.setActivePage}>{pageTitle}</a>
                {stakeholderDetail.map((item,idx)=><li key={idx} className={breadCrumb_View?"breadcrumb-item active":"d-none"}>{item.full_name}</li>)}
        </ul>

 
 
    )
  }
}
Breadcrumb.propTypes={
    session: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,
    setActivePage: PropTypes.func.isRequired,
    stakeholderView: PropTypes.object.isRequired,
    
  }
  const mapStateToProps= state =>({
    session:state.session,
    layout:state.layout,
    stakeholderView: state.stakeholderView,
    


  })
  export default connect(mapStateToProps,{setActivePage})(Breadcrumb)
