import React, { Component,Fragment } from 'react'
import ActivityWizard from '../../workflow/update/ActivityWizard'
import EmailWizard from '../../workflow/update/EmailWizard'
import AutoScriptWizard from '../../workflow/update/AutoScriptWizard'
import FolTabHead from '../../workflow/update/TabWorkflowDet'
// import {setRoleStore,setStakehList,setStkhAccDetail,setAncestor,setDescendant} from '../actions/stakehUpdateAction'
import {setWizardPage, setActivityStore} from '../../../actions/workflowAction/workflowDetailAction'
import Breadcrumb from '../../layouts/Breadcrumb'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'


class WorkflowDetails extends Component {

    handleWizard=(wizardName)=>{
    
    const {user:{bio_access_id:bId}}=this.props.session
    const {wrkflSel}=this.props.listWrkFlw

    this.props.setWizardPage(wizardName)
    
    
    const activityObj={
        task_id: wrkflSel,
        action: "ITEM_DETAIL",
        bio_access_id: bId      
    }
    this.props.setActivityStore(activityObj)
    // console.log(activityObj)
    }

    nextPage=(param)=>{
        this.props.setWizardPage(param)
    }

    prevPage=(param)=>{
        this.props.setWizardPage(param)
    }


render() {

  const {wizardPage, containerLine} = this.props.workflowDetail
  const {wrkflSel, selDetails}=this.props.listWrkFlw
// console.log(selDetails[0])
//   const item = selDetails.find(rec=>rec.task_id===wrkflSel)
    // console.log(item)

  
  this.components={
    activity:ActivityWizard,
    email:EmailWizard,        
    autoscript:AutoScriptWizard,
  }
  const DetailsWizard=this.components[wizardPage]

  return (
    
  <Fragment>


       <div className="breadcrumb-holder">
        <div className="container-fluid">
        <Breadcrumb/>
        </div>
        </div>

        {selDetails.map((item,idx)=>   

       <section key={idx} className="forms">
           <div className="container-fluid">
               <header>
                  <h1 className="h3 display">{item.title}</h1>
               </header>
               <div className=" row">
                   <div className="col-lg-12">
                       <div className="card">
                       <div className="card-header">
                            <div className="row">
                                <FolTabHead
                                    activeEditor={this.handleWizard}
                                    active={wizardPage}
                                    isContainer={containerLine} 
                                    />                             
                            </div>
                        </div>
                            <div className="card-body">
                               <DetailsWizard                                     
                                    item={item}   
                                    nextPage={this.nextPage}  
                                    active={wizardPage} 
                                    prevPage={this.prevPage}
                                    />                                   
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </section>
         ) } </Fragment>
  )
}
}

WorkflowDetails.propTypes={
  session: PropTypes.object.isRequired,  
  layout:PropTypes.object.isRequired,
  setWizardPage: PropTypes.func.isRequired,
  setActivityStore: PropTypes.func.isRequired,
  workflowDetail: PropTypes.object.isRequired,
  listWrkFlw: PropTypes.object.isRequired,
}

const mapStateToProps= state =>({
      session:state.session,      
      layout:state.layout,
      workflowDetail:state.workflowDetail,
      listWrkFlw:state.listWrkFlw,
})
  
export default connect(mapStateToProps, { setWizardPage, setActivityStore})(WorkflowDetails)