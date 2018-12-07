import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import NewFolTabHead from './newActivity/NewTabWorkflowHead'
import NewActivityWizard from './newActivity/NewActivityWizard'
import NewEmailWizard from './newActivity/NewEmailTemplate'
import NewAutoScript from './newActivity/NewAutoScript'

import {setWizardPageNew} from '../../actions/createNewActAction'


class NewActivity extends Component {

  handleWizard=(wizardName)=>{
      
    this.props.setWizardPageNew(wizardName)
    }

    nextPage=(param)=>{
      this.props.setWizardPageNew(param)
  }

  prevPage=(param)=>{
      this.props.setWizardPageNew(param)
  }

    
  render() {

    const {wizard_Page, container_Line} = this.props.crtNewReducer
    const {pageTitle} = this.props.layout

    this.components={
      newActivityWizard:NewActivityWizard,
      newEmail:NewEmailWizard,        
      newAutoscript:NewAutoScript,
    }
    const NewDetailsWizard=this.components[wizard_Page]
    return (
      <div>

        <div className="breadcrumb-holder">
            <div className="container-fluid">
                <div className="breadcrumb">
                    <div className="breadcrumb-item"><a href='/' onClick={this.setActivePage} data-pagename="dashboard">Home</a></div>
                    <div className="breadcrumb-item"><a className="breadcrumb-item" href='/' data-pagename="index">{pageTitle}</a></div>
                   
                </div>
            </div>
        </div> 

        <section className="forms">
           <div className="container-fluid">
               <header>
                  <h1 className="h3 display"></h1>
               </header>
               <div className=" row">
                   <div className="col-lg-12">
                       <div className="card">
                       <div className="card-header">
                            <div className="row">
                                <NewFolTabHead
                                    activeEditor={this.handleWizard}
                                    active={wizard_Page}
                                    isContainer={container_Line} 
                                    />                             
                            </div>
                        </div>
                            <div className="card-body">
                               <NewDetailsWizard                                     
                                    // item={item}   
                                    nextPage={this.nextPage}  
                                    active={wizard_Page} 
                                    prevPage={this.prevPage}
                                    />                                   
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </section>
      </div>
    )
  }
}

NewActivity.propTypes={
  session: PropTypes.object.isRequired,  
  layout:PropTypes.object.isRequired,
  setWizardPageNew:PropTypes.func.isRequired,
  crtNewReducer:PropTypes.object.isRequired,
}

const mapStateToProps= state =>({
      session:state.session,      
      layout:state.layout,
      crtNewReducer:state.crtNewReducer
  
})
  
export default connect(mapStateToProps,{setWizardPageNew})(NewActivity)
