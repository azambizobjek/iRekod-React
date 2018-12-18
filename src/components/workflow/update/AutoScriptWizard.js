import React, { Component, Fragment } from 'react'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {setActivePage} from '../../../actions/layoutInitAction'
import {updateActivity} from '../../../actions/workflowAction/updateActAction'

class AutoScriptWizard extends Component {

  constructor(){
    super()
    this.state={
        is_enable_auto_scripting: null,
        auto_scripting: null,   
    }        
}  

componentWillMount(){

  const {
     is_enable_auto_scripting ,
     auto_scripting ,
     
  } = this.props.item


this.setState({
  is_enable_auto_scripting,
  auto_scripting,
})    

}


// componentDidUpdate(prevProps){
//   if(prevProps.workflowDetail.activityDet!==this.props.workflowDetail.activityDet){
//     console.log(prevProps.workflowDetail.activityDet)
//       const {is_enable_auto_scripting,auto_scripting} = this.props.item

//       this.setState({
//           is_enable_auto_scripting: is_enable_auto_scripting,            
//           auto_scripting: auto_scripting   
//       })      
//   }
// }

handleChange=(event)=>{
  // e.preventDefault()
   const target = event.target
  const inputVal =  target.type==="checkbox"?target.checked:target.value 
  const input = target.name   

this.setState({
    [input]:inputVal,
  }) 
} 

setActivePage=(e)=>{
  e.preventDefault()       
  this.props.setActivePage(e.target.getAttribute('data-pagename'))
}

formSubmit=(e)=>{
  e.preventDefault()

  const {user:{bio_access_id:bId}} = this.props.session
  const {activity_Store} = this.props.workflowDetail
  

   const { 
    is_enable_auto_scripting ,
    auto_scripting ,} = this.state

  const updateObj={
    task_id:activity_Store[0].task_id,
    title: activity_Store[0].title,
    subject: activity_Store[0].subject,
    instruction: activity_Store[0].instruction,
    estimated_duration: activity_Store[0].estimated_duration,
    is_important: activity_Store[0].is_important,
    is_auto_start: activity_Store[0].is_auto_start,
    default_assignor_id: activity_Store[0].default_assignor_id,
    default_assignor_name: activity_Store[0].default_assignor_name,
    default_assignee_id:activity_Store[0].default_assignee_id,
    default_assignee_name: activity_Store[0].default_assignee_name,
    default_supervisor_id: activity_Store[0].default_supervisor_id,
    default_supervisor_name: activity_Store[0].default_supervisor_name,
    default_manager_id: activity_Store[0].default_manager_id,
    default_manager_name: activity_Store[0].default_manager_name,
    parent_id: activity_Store[0].parent_id,
    prev_task_id: activity_Store[0].prev_task_id,
    prev_task_title: activity_Store[0].prev_task_title,
    additional_tasks: null,
    next_task_id: activity_Store[0].next_task_id,
    next_task_title: activity_Store[0].next_task_title,
    is_decision: activity_Store[0].is_decision,
    task_results: null,
    acl_id: activity_Store[0].acl_id,
    acl_entries: activity_Store[0].acl_entries,

    email_template_id: activity_Store[0].email_template_id,
    recipients: activity_Store[0].recipients,
    include_assignee: activity_Store[0].include_assignee,
    include_home: activity_Store[0].include_home,
    include_owner: activity_Store[0].include_owner,
    include_stakeholders: activity_Store[0].include_stakeholders,
    stakeholder_fields: activity_Store[0].stakeholder_fields,

    is_enable_auto_scripting: is_enable_auto_scripting,
    auto_scripting: auto_scripting,

    bio_access_id: bId,
    action: "SAVE_TASK" 

  }   
  this.props.updateActivity(updateObj)
  console.log(updateObj)
  alert("Successful Update")

}

  render() {
    const { is_enable_auto_scripting, auto_scripting} = this.state
    return (
      <Fragment>
      <h1 className="h3 display text-primary text-center">Auto Script</h1>
      <form className="mt-3 mr-3 ml-3" onSubmit={this.formSubmit}>
              <div className="row justify-content-center mb-5">
                  <div className="col-xl-3 col-lg-4 col-md-4">
                      <div className="text-center">
                          <img src={require('../../../img/programming.svg')} className=" img-dash" alt="emailImage" />
                      </div>
                  </div>

                  <div className="col-xl-9 col-lg-8 col-md-8 col-sm-2">
                    <div className="col-6 col-md-4 form-group">
                    <label>
                            <input name="is_enable_auto_scripting" type="checkbox" onChange={this.handleChange} checked={is_enable_auto_scripting}/> Enable Auto Scripting
                          </label>
                    </div>
                 
                    <div className="form-group col">
                      <label>Scripts</label>
                            <textarea name="auto_scripting" rows="10" cols="50" className="form-control" onChange={this.handleChange} value={decodeURIComponent(auto_scripting)}/>       
                    </div>
                  </div>
          </div> 
          <div className="">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button type="button" className="btn btn-secondary" data-pagename="listOfWorkflow" onClick={this.setActivePage}>Close</button>
                </div>
     </form>
      </Fragment>
    )
  }
}

AutoScriptWizard.propTypes={
  session: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,  
  workflowDetail:PropTypes.object.isRequired, 
  updateActivity:PropTypes.func.isRequired, 
  setActivePage: PropTypes.func.isRequired,
}

const mapStateToProps= state =>({
      session:state.session,
      layout:state.layout,
      workflowDetail:state.workflowDetail,
})
  
export default connect(mapStateToProps, {updateActivity, setActivePage})(AutoScriptWizard)

