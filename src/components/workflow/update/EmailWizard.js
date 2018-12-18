import React, { Component, Fragment } from 'react'
import Select from 'react-select'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {updateActivity, setRecipients, taskEmailRecipients, setIncStakeh} from '../../../actions/workflowAction/updateActAction'

class EmailWizard extends Component {

  constructor(){
    super()
    this.state={
        task_id: null,
        emailTemp:[],
        recipients:[],
        include_assignee: null,
        include_home: null,
        include_owner: null,
        include_stakeholders: null,
        email_template_id: null,
        recipients: null,
        incStakeh:[],
        emailTempName: "",
        receipientDetails:"",
       
        
    }        
}  



componentWillMount(){

  const {
     email_template_id ,
     recipients,
     include_assignee ,
     include_home ,
     include_owner ,
     include_stakeholders,
     stakeholder_fields,
  } = this.props.item

  const recpnts = recipients.map(itm=>({ value: itm.recipient_id, label:decodeURIComponent(itm.recipient_name)} ))
  const stakehF = stakeholder_fields.map(itm=>({ value: itm.stakeholder_field_id, label:decodeURIComponent(itm.stakeholder_field_label)} ))
  
    this.setState({
      email_template_id: email_template_id,
      receipientDetails: recpnts,
      include_assignee: include_assignee,
      include_home: include_home,
      include_owner: include_owner,
      include_stakeholders: include_stakeholders,
      incStakeh:stakehF
    })    

}

// componentDidUpdate(prevProps){
//   if(prevProps.workflowDetail.activityDet!==this.props.workflowDetail.activityDet){
//               console.log(prevProps.workflowDetail.activityDet)
              
//       const {
//           task_id,
//           subject,
//           title,
//           instruction,
//           estimated_duration ,
//            is_important,
//            is_auto_start ,
//            default_assignor_id ,
//            default_assignee_id,
//            default_assignor_name,
//            default_assignee_name,
//            default_supervisor_id ,
//            default_supervisor_name ,
//            default_manager_id ,
//            default_manager_name ,
//            parent_id,
//            prev_task_id ,
//            prev_task_title,
//            additional_tasks ,
//            next_task_id ,
//            next_task_title ,
//            is_decision ,
//            task_results ,
//            acl_id ,
//            stakeholder_fields ,

//                 email_template_id ,
//      recipients ,
//      include_assignee ,
//      include_home ,
//      include_owner ,
//      include_stakeholders,
           
//         } = this.props.item
        
//    this.setState({
//         task_id: task_id,
//         title: title,
//         subject: subject,
//         instruction: instruction,
//         estimated_duration: estimated_duration,
//         is_important: is_important,
//         is_auto_start: is_auto_start,
//         default_assignor_id: default_assignor_id,
//         default_assignee_id: default_assignee_id,
//         default_assignor_name:default_assignor_name,
//         default_assignee_name: default_assignee_name,
//         default_supervisor_id: default_supervisor_id,
//         default_supervisor_name: default_supervisor_name,
//         default_manager_id: default_manager_id,
//         default_manager_name: default_manager_name,
//         parent_id: parent_id,
//         prev_task_id: prev_task_id,
//         prev_task_title: prev_task_title,
//         additional_tasks: additional_tasks,
//         next_task_id: next_task_id,
//         next_task_title: next_task_title,
//         is_decision: is_decision,
//         task_results: task_results,
//         acl_id: acl_id,
//         stakeholder_fields: stakeholder_fields,

//               email_template_id: email_template_id,
//       recipients: recipients,
//       include_assignee: include_assignee,
//       include_home: include_home,
//       include_owner: include_owner,
//       include_stakeholders: include_stakeholders,
//       })    
//       }
//   }


handleEmailTempChange=(value)=>{
  console.log(value)
  this.setState({
    email_template_id:value,
  })
}

handleReceipientsChange=(value)=>{

   const viewSource = value.map(item =>({
    recipient_id: item.value,
    recipient_name: item.label
}))

this.props.setRecipients(viewSource)

  this.setState({
    receipientDetails:value,
  })
}

handleIncStakehsChange=(value)=>{

  const incStake = value.map(item =>({
    stakeholder_field_id: item.value,
    stakeholder_field_label: item.label
}))

this.props.setIncStakeh(incStake)

  this.setState({
    incStakeh:value,
  })
}

handleChange=(event)=>{
  // e.preventDefault()
   const target = event.target
  const inputVal =  target.type==="checkbox"?target.checked:target.value 
  const input = target.name 
  // console.log(input)  

this.setState({
    [input]:inputVal,
  }) 
} 

componentDidMount() {
  const {activityDet} = this.props.workflowDetail
  const {emailObj} = this.props.workflowDetail
  const {recipients} = this.props.item
  const {stakehList} = this.props.stakeholderList

  const emailTemplateName = emailObj.filter(itm => itm.email_template_id === activityDet[0].email_template_id)

if (activityDet[0].email_template_id!==""){

  this.setState({
    email_template_id:[{label : emailTemplateName[0].name, value:emailTemplateName[0].email_template_id}]
        })
}

}

formSubmit=(e)=>{
    e.preventDefault()

    const {user:{bio_access_id:bId}} = this.props.session
    const {activity_Store} = this.props.workflowDetail
    const {recipients, incStakehObj} = this.props.updActReducer
    

     const { 
     email_template_id ,
     include_assignee ,
     include_home ,
     include_owner ,
     include_stakeholders} = this.state


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
      parent_id: null,
      prev_task_id: activity_Store[0].prev_task_id,
      prev_task_title: activity_Store[0].prev_task_title,
      additional_tasks: null,
      next_task_id: activity_Store[0].next_task_id,
      next_task_title: activity_Store[0].next_task_title,
      is_decision: activity_Store[0].is_decision,
      task_results: null,
      acl_id: activity_Store[0].acl_id,
      acl_entries: activity_Store[0].acl_entries,

      email_template_id: email_template_id.value,
      recipients: recipients,
      include_assignee: include_assignee,
      include_home: include_home,
      include_owner: include_owner,
      include_stakeholders: include_stakeholders,
      stakeholder_fields: incStakehObj,
      is_enable_auto_scripting: activity_Store[0].is_enable_auto_scripting,
      auto_scripting: activity_Store[0].auto_scripting,

      bio_access_id: bId,
      action: "SAVE_TASK" 

    }   
    this.props.updateActivity(updateObj)
    console.log(updateObj)
    alert("Successful Update")

}


  render() {

    const {
      include_assignee,
      include_home ,
      include_owner,
      include_stakeholders,
   } = this.state
   

  const {emailObj,customFieldObj} = this.props.workflowDetail
  const optionEmailTemp = emailObj.map((itm => ({ value: itm.email_template_id, label:decodeURIComponent(itm.name)})))
  const optionCstmFldStkhObj = customFieldObj.map((itm => ({ value: decodeURIComponent(itm.custom_field_id), label:decodeURIComponent(itm.custom_field_name)})))
  const { receipientDetails, incStakeh, email_template_id} = this.state
  const {stakehList} = this.props.stakeholderList
  const stakehOptions = stakehList.map(itm=>({ value: itm.stakeholder_id, label:decodeURIComponent(itm.full_name), status: true}))

    return (
      <Fragment>
      <h1 className="h3 display text-primary text-center">Email Notification</h1>
      <form className="mt-3 mr-3 ml-3" onSubmit={this.formSubmit}>
              <div className="row justify-content-center mb-5">
                  <div className="col-xl-3 col-lg-4 col-md-4">
                      <div className="text-center">
                          <img src={require('../../../img/email.svg')} className=" img-dash" alt="emailImage" />
                      </div>
                  </div>

                  <div className="col-xl-9 col-lg-8 col-md-8 col-sm-2">
                    <div className="form-group col">
                          <label>Email Template</label>
                                <Select
                                className="basic-single"
                              onChange={this.handleEmailTempChange}
                              options={optionEmailTemp}
                              value={email_template_id}
                              isClearable
                            />
                    </div>
                 
                    <div className="form-group col">
                          <label>Recepients</label>
                                <Select
                              onChange={this.handleReceipientsChange}
                              options={stakehOptions}
                              value={receipientDetails}
                              isMulti
                              isClearable
                            />
                    </div>

                  {/* <div className="row form-group"> */}
                    <div className="form-group col">
                        <label>
                            <input name="include_assignee" type="checkbox" onChange={this.handleChange} checked={include_assignee}/> Include Assignee
                        </label>
                    </div>

                    <div className="form-group col">
                        <label>
                            <input name="include_home" type="checkbox" onChange={this.handleChange} checked={include_home}/> Include Home
                        </label>
                    </div>

                    <div className="form-group col">
                        <label>
                            <input name="include_owner" type="checkbox" onChange={this.handleChange} checked={include_owner}/> Include Owner
                        </label>
                    </div>

                    <div className="form-group col">
                        <label>
                            <input name="include_stakeholders" type="checkbox" onChange={this.handleChange} checked={include_stakeholders}/> Include Stakeholder
                        </label>
                    </div>
                  {/* </div> */}
                  <div className="form-group col">
                  <div className={include_stakeholders===null||include_stakeholders=== false?"d-none":"autoUpdate row"}>
                      <div className="form-group col">
                        <label>Stakeholders</label>
                          <Select
                              onChange={this.handleIncStakehsChange}
                              options={optionCstmFldStkhObj}
                              value={incStakeh}
                              isMulti
                              isClearable
                            />
                        </div>
                  </div>
                  </div>
                  </div>
          </div> 
          <div className="">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button type="button" className="btn btn-secondary">Close</button>
                </div>
     </form>
      </Fragment>
    )
  }
}

EmailWizard.propTypes={
  session: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,  
  workflowDetail:PropTypes.object.isRequired, 
  stakeholderList: PropTypes.object.isRequired, 
  listWrkFlw: PropTypes.object.isRequired,  
  updateActivity:PropTypes.func.isRequired,  
  updActReducer:PropTypes.object.isRequired, 
  setRecipients:PropTypes.func.isRequired,  
  taskEmailRecipients:PropTypes.func.isRequired,
  setIncStakeh:PropTypes.func.isRequired,
}

const mapStateToProps= state =>({
      session:state.session,
      layout:state.layout,
      workflowDetail:state.workflowDetail,
      listWrkFlw:state.listWrkFlw,
      updActReducer:state.updActReducer,
      stakeholderList: state.stakeholderList,
})
  
export default connect(mapStateToProps, {updateActivity, setRecipients, taskEmailRecipients, setIncStakeh})(EmailWizard)
