import React, { Component,Fragment } from 'react' 
// import {updStkh} from '../../actions/stakehUpdateAction'
import Select from 'react-select'

import 'rc-checkbox/assets/index.css'
import { Button } from 'reactstrap'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'

import {setActivePage} from '../../../actions/layoutInitAction'
import {setSelDetails} from '../../../actions/workflowAction/authListWorkFlow'
import {setListAddTask, setListTaskResultTitle, setListTaskResultStatus} from '../../../actions/workflowAction/workflowDetailAction'
import {updateActivity, setActivityDetailsUpdate} from '../../../actions/workflowAction/updateActAction'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class ActivityWizard extends Component {
    constructor(){
        super()
        this.state={
            task_id: null,
            title: null,
            subject: null,
            instruction: null,
            estimated_duration: null,
            is_important: false,
            is_auto_start: false,
            default_assignor_id: null,
            default_assignor_name: null,
            default_assignee_id: null,
            default_assignee_name: null,
            default_supervisor_id: null,
            default_supervisor_name: null,
            default_manager_id: null,
            default_manager_name: null,
            parent_id: null,
            prev_task_id: null,
            prev_task_title: null,
            additional_tasks: null,
            next_task_id: null,
            next_task_title: null,
            is_decision: false,
            task_results: null,
            acl_id: null,
            stakeholder_fields: null,   
            default_assignor_name: [],
            // default_assignee_name: [],
            default_supervisor_name: [],
            default_manager_name: [],
            prevTask: [],
            nextTask:[],
            addTaskTitle:[],
            taskResultStatus: [],
            taskResultTitle: [],
            addTaskOption:[],
            number: 1,
            resultTask: [],
            taskResStat:[],
            accViewVal:[],
            accUpdVal:[],
            accRmvVal:[],
            accModVal:[],             
            resultTitle:[],
            resultStatus:[],                    

        }        
    }  

    componentWillMount(){
        const {task_results} = this.props.item
        const resultTitle = task_results.map(itm=>({label:itm.task_title, value:itm.task_id}))
        const resultStatus = task_results.map(itm=>({label:itm.result_id, value:itm.task_id}))          
        this.setState({
            task_results:task_results,            
            resultTitle:resultTitle,
            resultStatus:resultStatus,
        
        })            
    }

    componentDidUpdate(prevProps){
        if(prevProps.listWrkFlw.selDetails!==this.props.listWrkFlw.selDetails){        

            const {task_results} = this.state
            const { default_assignee_name, default_assignee_id, default_assignor_name,  default_assignor_id, default_manager_name, default_manager_id, prev_task_title, prev_task_id, default_supervisor_name, default_supervisor_id, 
                    next_task_title, next_task_id, task_id, subject, title, instruction, estimated_duration, is_important, is_auto_start, parent_id, is_decision, acl_id , stakeholder_fields 
                } = this.props.item      
            
            const assigneeValue = ({value: default_assignee_id, label:default_assignee_name})
            const assignorValue=({value: default_assignor_id, label:default_assignor_name})
            const managerValue=({value: default_manager_id, label:default_manager_name})
            const supervisorValue=({value: default_supervisor_id, label:default_supervisor_name})
            const nextTitleValue=({value: next_task_id, label:next_task_title})
            const prevTitleValue=({value: prev_task_id, label:prev_task_title})

            this.setState({
                task_id: task_id,
                title: title,
                subject: subject,
                instruction: instruction,
                estimated_duration: estimated_duration,
                is_important: is_important,
                is_auto_start: is_auto_start,
                default_assignor_id: assignorValue,
                default_assignee_id: assigneeValue,
                default_assignor_name:assignorValue,
                default_assignee_name: assigneeValue,
                default_supervisor_id: supervisorValue,
                default_supervisor_name: supervisorValue,
                default_manager_id: managerValue,
                default_manager_name: managerValue,
                parent_id: parent_id,
                prev_task_id: prevTitleValue,
                prev_task_title: prevTitleValue,
                next_task_id: nextTitleValue,
                next_task_title: nextTitleValue,
                is_decision: is_decision,
                task_results: task_results,
                acl_id: acl_id,
                stakeholder_fields: stakeholder_fields,           
            })    
        }          
    }

     
    handleChange=(event)=>{
        const target = event.target
        const inputVal =  target.type==="checkbox"?target.checked:target.value 
        const input = target.name   
    
      this.setState({
          [input]:inputVal,
        }) 
        console.log(inputVal)
        console.log(input)
    } 

    handleTextChange=(e)=>{
        const inputName = e.target.getAttribute('name')
        const inputVal =  e.target.value
        // ===""?e.target.value=null:e.target.value  
        // console.log(e.target.value)    
    
      this.setState({
          [inputName]:inputVal
        })  
         console.log(inputName)   
         console.log(inputVal)
    }
    


    handleAssignorChange=(value)=>{
      this.setState({
        default_assignor_name:value,
      })
      // console.log(value)
    }

    handleAssigneeChange=(value)=>{
        this.setState({
        default_assignee_name:value
        })
    }

    handleManagerChange=(value)=>{
        this.setState({
        default_manager_name:value
        })
    }

    handleSupervisorChange=(value)=>{
        this.setState({
        default_supervisor_name:value
        })
    }

    handlePrevTaskChange=(value)=>{

        {value===null || value === ''? 
        this.setState({
            prev_task_title:''
        }):
        this.setState({
            prev_task_title:value
        })
    }
        // this.setState({
        //     prev_task_title:value
        //   })
    }

    handleNextTaskChange=(value)=>{
        {value=== null || value === ''?
        this.setState({
            next_task_title:''
        }):
        this.setState({
            next_task_title:value
        })
    }
        // this.setState({
        //     next_task_title:value
        //   })
    }

    handleAdditionalTask=(value)=>{
        const nom = this.state.number
        const addTask = value
        this.setState({
            addTaskTitle:value,
            addTaskOption:value.label,
            number:nom+1
        })

        this.props.setListAddTask(addTask)
    }    

    handleViewChange=(value)=>{
        this.setState({accViewVal:value})
        console.log(value)
    }

    handleUpdChange=(value)=>{
        this.setState({accUpdVal:value})
        // console.log(value)
    }

    handleRemoveChange=(value)=>{
        this.setState({accRmvVal:value})
        // console.log(value)
    }

    handleModifyChange=(value)=>{
        this.setState({accModVal:value})
        // console.log(value)
    }     

    setActivePage=(e)=>{
        e.preventDefault()       
        this.props.setActivePage(e.target.getAttribute('data-pagename'))
    } 

    // //Handle Task Result (Title) Change
    handleTaskResultTitle= idx => selected=>{
        const {label,value} = selected
        const {task_results,task_id} = this.state         
        const resultStatus = ({label:label, value:value})  
        const new_task_results = [...this.state.task_results]
        new_task_results[idx] = {
            task_result_id: task_results[idx].task_result_id,  
            parent_id: task_id,//task_results[idx].parent_id,
            task_id: value,//task_results[idx].task_id,
            task_title: label,//task_results[idx].task_title,
            result_id: task_results[idx].result_id,
            sort_order: task_results[idx].sort_order
        }            
        this.setState({
            task_results:new_task_results,
            resultStatus:resultStatus,  
        })

        // this.props.setListTaskResultTitle(tskRsltTitle)
    }

    //Handle Task Result (Status) Change
    handleTaskResultStatus= idx => selected =>{             
        const {label,value}  = selected      
        const {task_results,task_id} = this.state         
        const resultStatus = ({label:label, value:value})  
        const new_task_results = [...this.state.task_results]        
        new_task_results[idx] = {
            task_result_id: task_results[idx].task_result_id,  
            parent_id: task_id,//task_results[idx].parent_id,
            task_id: task_results[idx].task_id,
            task_title: task_results[idx].task_title,
            result_id: label,
            sort_order: task_results[idx].sort_order
          }
        // console.log(new_task_results);
        this.setState({
            task_results:new_task_results,
            resultStatus:resultStatus,             
                          
        })

        // this.props.setListTaskResultStatus(tskRsltStatus)
    }

    handleAddRow= () => {
        const {task_results} = this.state
      
        const item = {
            sort_order: task_results.length + 1,        
            // task_id:itm.task_id                         
        }

        this.setState({
            task_results: [...task_results,item]
        })
       
    }

     //Save Button
  formSubmit=(e)=>{
    e.preventDefault()
       
    const {user:{bio_access_id:bId}} = this.props.session
    const {wrkflSel} = this.props.listWrkFlw
    // const {activityDet} = this.props.workflowDetail
    const {activityDet} = this.props.workflowDetail
    // console.log(activityDet)
     
  
    const {     
        default_assignor_name,
        default_manager_name,
        default_supervisor_name,
        title,
        subject,
        instruction,
        estimated_duration,
        is_important,
        is_auto_start,
        is_decision,
        next_task_title,
        prev_task_title,
        default_assignee_name,
        task_results
    } = this.state  

    const {
        email_template_id ,
        recipients ,
        include_assignee ,
        include_home ,
        include_owner ,
        include_stakeholders,
        is_enable_auto_scripting ,
        auto_scripting,
        acl_id,   
    } = this.props.item

    const taskResultItem =
        task_results.map(itm=>({
            sort_order:itm.sort_order,
            result_id:itm.result_id,
            task_id:itm.task_id       
        }))

    const updateObj={
      task_id:wrkflSel,
      title: title,
      subject: subject,
      instruction: instruction,
      estimated_duration: parseInt(estimated_duration),
      is_important: is_important,
      is_auto_start: is_auto_start,
      default_assignor_id: default_assignor_name.value,
      default_assignor_name: default_assignor_name.label,
      default_assignee_id:default_assignee_name.value,
      default_assignee_name: default_assignee_name.label,
      default_supervisor_id: default_supervisor_name.value,
      default_supervisor_name: default_supervisor_name.label,
      default_manager_id: default_manager_name.value,
      default_manager_name: default_manager_name.label,
      parent_id: null,
      prev_task_id: prev_task_title.value,
      prev_task_title: prev_task_title.label,
      additional_tasks: null,
      next_task_id: next_task_title.value,
      next_task_title
      : next_task_title.label,
      is_decision: is_decision,
      task_results: taskResultItem,
      acl_id: acl_id,
      acl_entries: this.Aclselected(),

      email_template_id: activityDet[0].email_template_id,
      recipients: activityDet[0].recipients,
      include_assignee: activityDet[0].include_assignee,
      include_home: activityDet[0].include_home,
      include_owner: activityDet[0].include_owner,
      include_stakeholders: activityDet[0].include_stakeholders,
      stakeholder_fields: activityDet[0].stakeholder_fields,
      is_enable_auto_scripting: activityDet[0].is_enable_auto_scripting,
      auto_scripting: activityDet[0].auto_scripting,

      bio_access_id: bId,
      action: "SAVE_TASK" 

    }
    console.log(taskResultItem)

    this.props.updateActivity(updateObj)
    this.props.setActivityDetailsUpdate(updateObj)
    console.log(updateObj)
    // alert("Successful Update")

    const selDetails={
        task_id: wrkflSel,
        action: "ITEM_DETAIL",
        bio_access_id: bId       
    }
    this.props.setSelDetails(selDetails)

    
}


    //Get Value Access Control
    componentDidMount() {
        // console.log('9999')


        //aclEntries. When change tab header, remain its value
        const {acl_entries} = this.props.item

                    if(acl_entries!==undefined){
                    function acl_multi(array) {
        
                        const res = {
                            view: [],
                            update: [],
                            remove: [],
                            modify_access: []
                        }
                    
                        const keys = Object.keys(array[0])
                    
                        for (let i = 0; i < array.length; i++) {
                            keys.forEach(function (key) {
                                if (key !== 'stakeholder_name' && key !== 'stakeholder_id' && key !== 'stakeholder_type_id') {
                                    if (array[i][key]) {
                                        res[key].push({
                                            stakeholder_name: array[i].stakeholder_name,
                                            stakeholder_id: array[i].stakeholder_id,
                                            stakeholder_type_id: array[i].stakeholder_type_id                                       
                                        })
                                    }
                                }
                            })
                        }
                        return res
                    }   
        
                    let { view, update, remove, modify_access: aclMod } = acl_multi(acl_entries) // returns object. Push to array if so desired 
                    //  console.log(acl_entries)
                    
                    const accView = view.map(itm=>({value: itm.stakeholder_id, label:decodeURIComponent(itm.stakeholder_name), type: itm.stakeholder_type_id}))
                    //  console.log(view)
        
                    const accUpd = update.map(itm=>({value: itm.stakeholder_id, label:decodeURIComponent(itm.stakeholder_name),   type: itm.stakeholder_type_id}))
                    //  console.log(accView)
        
                    const accRmv = remove.map(itm=>({value: itm.stakeholder_id, label:decodeURIComponent(itm.stakeholder_name), type: itm.stakeholder_type_id}))
                    //  console.log(accView)
        
                    const accMod = aclMod.map(itm=>({value: itm.stakeholder_id, label:decodeURIComponent(itm.stakeholder_name),   type: itm.stakeholder_type_id}))
                    //  console.log(accView)
                    
                    this.setState({ 
                        accViewVal:accView,
                        accUpdVal:accUpd,
                        accRmvVal:accRmv,
                        accModVal:accMod,
                    })       
                }

        //assignee, assignor, supervisor, manager, previous task, next task. When change tab header, remain its value    
        const {
            default_assignee_name, default_assignee_id, 
            default_assignor_name,  default_assignor_id,
            default_manager_name, default_manager_id,
            prev_task_title, prev_task_id, 
            default_supervisor_name, default_supervisor_id, 
            next_task_title, next_task_id,
            task_id,subject,title,instruction,estimated_duration,
            is_important,is_auto_start,parent_id,is_decision,
            task_results,acl_id,stakeholder_fields
        } = this.props.item
        
            
        const assigneeValue = ({value: default_assignee_id, label:default_assignee_name})
        const assignorValue=({value: default_assignor_id, label:default_assignor_name})
        const managerValue=({value: default_manager_id, label:default_manager_name})
        const supervisorValue=({value: default_supervisor_id, label:default_supervisor_name})
        const nextTitleValue=({value: next_task_id, label:next_task_title})
        const prevTitleValue=({value: prev_task_id, label:prev_task_title})         
        
        this.setState({
                task_id: task_id,
                title: title,
                subject: subject,
                instruction: instruction,
                estimated_duration: estimated_duration,
                is_important: is_important,
                is_auto_start: is_auto_start,
                is_decision: is_decision,
                task_results: task_results,
                acl_id: acl_id,
                stakeholder_fields: stakeholder_fields,
                default_assignee_name:assigneeValue,
                default_assignor_name:assignorValue,
                default_manager_name:managerValue,
                default_supervisor_name:supervisorValue,
                prev_task_title:prevTitleValue,
                next_task_title:nextTitleValue
            })    
          
    }

 
    //Access Control
    Aclselected=()=>{
        const {accViewVal, accUpdVal, accRmvVal, accModVal} = this.state    
        // console.log(accViewVal)
        
       
        // console.log(accViewVal)
        const viewSource = accViewVal.map(item =>({
            stakeholder_id: item.value,
            stakeholder_name: item.label,
            stakeholder_type_id: item.value,
            attach: false,
            modify_access: false,
            remove: false,
            remove_child: false,
            update: false,
            update_child: false,
            view: true,
            view_child: false,
            index: -1,
            depth: 0,
            expanded: false,
            expandable: true,
            checked: null,
            leaf: false,
            cls: null,
            iconCls: null,
            icon: null,
            root: false,
            isLast: false,
            isFirst: false,
            allowDrop: true,
            allowDrag: true,
            loaded: false,
            loading: false,
            href: null,
            hrefTarget: null,
            qtip: null,
            qtitle: null,
            qshowDelay: 0,
            children: null
        }))       

        // console.log(viewSource)   
        const update = this.acl_builder(accUpdVal, viewSource, 'update')    
        // console.log(update)    
        const remove = this.acl_builder(accRmvVal, update, 'remove')
        // console.log(remove)   
        const modAcl = this.acl_builder(accModVal, remove, 'modify_access')
        // console.log(modAcl)                        

        if (modAcl === undefined)
        {
            // modAcl = null  
            this.setState({
                acl_id:null
            })           
        }

        // console.log(modAcl) 

        return modAcl
    }

    ///////////////////////////////////recursive function//////////////////////////////////////////
    acl_builder=(selData,aclEntries,type)=>{  
        // console.log(selData)         
        // console.log(aclEntries)          
        selData.map(item=>
           { const TargetItem = aclEntries.findIndex(rec=>rec.stakeholder_id===item.value) 
            // console.log(TargetItem)
            if ( TargetItem!==-1) {
                aclEntries[TargetItem][type] = true
            } 
            else {
                var aclObj =
                    {                             
                        stakeholder_id: null,
                        stakeholder_name: null,
                        stakeholder_type_id: null,
                        attach: false,
                        modify_access: false,
                        remove: false,
                        remove_child: false,
                        update: false,
                        update_child: false,
                        view: false,
                        view_child: false,
                        index: -1,
                        depth: 0,
                        expanded: false,
                        expandable: true,
                        checked: null,
                        leaf: false,
                        cls: null,
                        iconCls: null,
                        icon: null,
                        root: false,
                        isLast: false,
                        isFirst: false,
                        allowDrop: true,
                        allowDrag: true,
                        loaded: false,
                        loading: false,
                        href: null,
                        hrefTarget: null,
                        qtip: null,
                        qtitle: null,
                        qshowDelay: 0,
                        children: null
                    }
            aclObj.stakeholder_id= item.value  
            aclObj.stakeholder_name=  item.label  
            aclObj.stakeholder_type_id= item.type  
            aclObj[type]=true
            aclEntries.push(aclObj)
            }              
        })          
        return aclEntries   
    }
  

    
  render() {

    const {resultTitle,resultStatus,task_results} = this.state         
    // console.log(task_results)    
    const {stakehList} = this.props.listWrkFlw
    const {itemListSubject, addTask, taskResulStatusObj } = this.props.workflowDetail
    const { default_assignee_name, default_assignor_name, default_manager_name, default_supervisor_name, addTaskTitle, prev_task_title,taskResStat, 
        accViewVal, accUpdVal, accRmvVal, accModVal, next_task_title,rowTaskResult} = this.state
           
    const {subject,title,instruction,estimated_duration,is_important,is_auto_start,is_decision} = this.state

    const optionStakehList = stakehList.map((itm => ({ value: itm.stakeholder_id, label:decodeURIComponent(itm.full_name)})))
    const optionListItemBySubject = itemListSubject.map((itm => ({ label:decodeURIComponent(itm.title), value:decodeURIComponent(itm.task_id)})))
    const optionResultTask = itemListSubject.map((itm => ({ label:decodeURIComponent(itm.title), value:decodeURIComponent(itm.task_id)})))      
    const taskVal = task_results.map(itm=>itm.task_title)  
    const optionTaskResultStatus = taskResulStatusObj.map((itm => ({ label:decodeURIComponent(itm.lovi_value), value:decodeURIComponent(itm.lov_item_id)})))
    
    
    return (
      <Fragment>
        <h1 className="h3 display text-primary text-center">Activity</h1>
            <form className="mt-3 mr-3 ml-3" onSubmit={this.formSubmit}>
                <div className="row justify-content-center mb-5">
                    <div className="col-xl-3 col-lg-4 col-md-4">
                        <div className="text-center">
                            <img src={require('../../../img/management.svg')} className=" img-dash" alt="activityImage" />
                        </div>
                    </div>

                    <input hidden="hidden" type="text"  className="form-control" disabled/>

                    <div className="col-xl-9 col-lg-8 col-md-8 col-sm-2">

                    {/* Basic */}
                    <div className="border">
                        <div className="col-6 col-md-4 form-group">
                          <label>
                            <input name="is_important" type="checkbox" onChange={this.handleChange} checked={is_important}/> Is important
                          </label>
                        </div>

                        <div className="col-6 col-md-4 form-group">
                          <label>
                            <input name="is_auto_start" type="checkbox" onChange={this.handleChange} checked={is_auto_start}/> Auto Start
                          </label>
                        </div>
                      </div>
                    </div>

                <div className="col">
                    <div className="row" >
                        <div className="form-group col">
                          <label>Subject</label>
                            <input  name="subject" type="text" className="form-control" onChange={this.handleTextChange} value={decodeURIComponent(subject)}/> 
                        </div>
                </div>

                        <div className="form-group">
                          <label>Title</label>
                            <input  name="title" type="text" className="form-control" value={decodeURIComponent(title)} onChange={this.handleTextChange}/> 
                        </div>

                        <div className="form-group">
                          <label>Instruction</label>
                            <textarea name="instruction" rows="4" cols="50" className="form-control" onChange={this.handleTextChange} value={decodeURIComponent(instruction)}/> 
                        </div>

                        <div className="form-group">
                          <label>Duration (days)</label>
                            <input name="estimated_duration" type="number" className="form-control" min="0" onChange={this.handleTextChange} value={decodeURIComponent(estimated_duration)}/> 
                        </div>

                      
                        {/* stakeholder */}
                        <div className="row form-group">
                            <div className="col-sm-4 form-group">
                                <label>Assignee</label>
                                {/* <input name="default_assignee_name" type="text" className="form-control" placeholder="Smith"  onChange={this.handleChange} value={decodeURIComponent(default_assignee_name)}/> */}
                                <Select
                              className="basic-single"
                              onChange={this.handleAssigneeChange}
                              options={optionStakehList}
                              value={default_assignee_name}
                              isClearable
                            />
                            </div>

                            <div className="col-sm-4 form-group">
                                <label>Supervisor</label>
                                {/* <input name="default_supervisor_name" type="text" className="form-control" placeholder="Johnson" onChange={this.handleChange} value={decodeURIComponent(default_supervisor_name)}/> */}
                                <Select
                              className="basic-single"
                              onChange={this.handleSupervisorChange}
                              options={optionStakehList}
                              value={default_supervisor_name}
                              isClearable
                            />
                            </div>

                            <div className="col-sm-4 form-group">
                                <label>Manager</label>
                                {/* <input name="default_manager_name" type="text" className="form-control" placeholder="Smith Johnson" onChange={this.handleChange} value={decodeURIComponent(default_manager_name)}/> */}
                                <Select
                              className="basic-single"
                              onChange={this.handleManagerChange}
                              options={optionStakehList}
                              value={default_manager_name}
                              isClearable
                            />
                            </div>
                    </div>

                    {/* task */}
                        <div className="row form-group">
                            
                            <div className="col form-group">
                                <label>Previous Task</label>
                                {/* <input name="prev_task_title" type="text" className="form-control" onChange={this.handleChange} value={decodeURIComponent(prev_task_title)}/>  */}
                                <Select
                              className="basic-single"
                              onChange={this.handlePrevTaskChange}
                              options={optionListItemBySubject}
                              value={prev_task_title}
                              isClearable
                            />
                            </div>

                            <div className="col form-group">
                                <label>Next Task</label>
                                {/* <input name="additional_tasks" type="text" className="form-control" placeholder="Smith Johnson" onChange={this.handleChange} value={decodeURIComponent(next_task_title)}/> */}
                                <Select
                              className="basic-single"
                              onChange={this.handleNextTaskChange}
                              options={optionListItemBySubject}
                              value={next_task_title}
                              isClearable
                            />
                            </div>
                        </div>

                        <div className="row form-group">

                            <div className="col form-group">
                                <label>Additional Task: Title</label>
                                {/* <input name="additional_tasks" type="text" className="form-control" placeholder="Johnson" onChange={this.handleChange} value={decodeURIComponent(default_assignor_name)}/> */}
                                <Select 
                                    options={optionListItemBySubject}
                                    onChange={this.handleAdditionalTask}
                                    value={addTaskTitle} 
                                    isMulti
                                    placeholder="Title"
                                    /> 
                                    
                            </div>
                        </div>

                        <div className="row form-group">
                        <div className="col-12">

                        {addTask.map((itm,idx)=>
                            <div className="list-group">
                                <a className="list-group-item list-group-item-action flex-column align-items-start">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 key={idx} className="mb-1">{itm.value}</h5>
                                            {/* <h5 className="mb-1 text-muted">{idx}</h5> */}
                                    </div> 
                                </a>

                            </div>
                        )}
                        </div>
                        </div>
                       
                       <div className="row">
                            <div className="col-auto mr-auto form-group ">
                                <label> <input name="is_decision" type="checkbox" onChange={this.handleChange} checked={is_decision}/> Has Decision</label>
                            </div>

                            <div className={is_decision===null||is_decision=== false?"d-none":"col-auto"}>                        
                                <span>
                                    <Tooltip                            
                                        overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Add Task</div>}
                                        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                                        <img src={require('../../../img/addTask.svg')} alt="addTask"  className='btn btn-link' onClick={this.handleAddRow}/>
                                    </Tooltip>
                                </span>                         
                            </div>    
                        </div>      
                        
                        <table className={is_decision===null||is_decision=== false?"d-none":"table table-hover mb-3"}>
                            <thead>
                                <tr>
                                    <th scope="col">No.</th>
                                    <th scope="col">Task Result: Title</th>
                                    <th scope="col">Task Result: Status</th>                                    
                                </tr>
                            </thead>
                            
                            <tbody>
                                {task_results.map((itm,idx)=> (  
                                <tr key={idx}>
                                    <td>{itm.sort_order}</td>
                                    <td>
                                        <Select                                         
                                        options={optionResultTask.filter(itm=> taskVal.includes(itm.label)< 1)}
                                        name="taskTitle"
                                        onChange={this.handleTaskResultTitle(idx)}                                         
                                        value={resultTitle[idx]}                                        
                                        placeholder="Title"
                                        // isDisabled
                                        />
                                    </td>
                                    <td>
                                        <Select 
                                        options={optionTaskResultStatus}
                                        name="taskStatus"
                                        onChange={this.handleTaskResultStatus(idx)}                                       
                                        value={resultStatus[idx]}                                          
                                        placeholder="Status"
                                        />
                                    </td>
                                    <td></td>                                 
                                                               
                                </tr>  
                               ))}                              
                            </tbody>
                        </table>                     

                        {/* ACL  */}
                        <div className="row form-group">

                            <div className="col form-group">
                                <label>View</label>
                                <Select
                              className="basic-single"
                              onChange={this.handleViewChange}
                              options={optionStakehList}
                              value={accViewVal}
                              isClearable
                              isMulti
                            />
                            </div>
                            <div className="col form-group">
                                <label>Update</label>
                                <Select
                              className="basic-single"
                              onChange={this.handleUpdChange}
                              options={optionStakehList}
                              value={ accUpdVal}
                              isClearable
                              isMulti
                            />                            
                            </div>
                        </div>

                        <div className="row">

                            <div className="col form-group">
                                <label>Remove</label>
                                <Select
                              className="basic-single"
                              onChange={this.handleRemoveChange}
                              options={optionStakehList}
                              value={accRmvVal}
                              isClearable
                              isMulti
                            />                            
                            </div>
                            <div className="col form-group">
                                <label>Modify Access</label>
                                <Select
                              className="basic-single"
                              onChange={this.handleModifyChange}
                              options={optionStakehList}
                              value={accModVal}
                              isClearable
                              isMulti
                            />                            
                            </div>
                        </div>

                        </div>

                      </div>
                <div className="">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button type="button" className="btn btn-secondary" onClick={this.setActivePage} data-pagename="listOfWorkflow">Close</button>
                </div>
            </form>

      </Fragment>
    )
  }
}
ActivityWizard.propTypes={
    session: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,  
    workflowDetail:PropTypes.object.isRequired,  
    listWrkFlw:PropTypes.object.isRequired,
    stakeholderList: PropTypes.object.isRequired,
    setListAddTask:PropTypes.func.isRequired,
    setListTaskResultTitle:PropTypes.func.isRequired,
    setListTaskResultStatus:PropTypes.func.isRequired,
    updateActivity: PropTypes.func.isRequired,
    updActReducer: PropTypes.object.isRequired,
    setActivityDetailsUpdate: PropTypes.func.isRequired,
    setActivePage: PropTypes.func.isRequired,
    setSelDetails: PropTypes.func.isRequired,
}

const mapStateToProps= state =>({
        session:state.session,
        layout:state.layout,
        workflowDetail:state.workflowDetail,
        listWrkFlw:state.listWrkFlw,
        updActReducer:state.updActReducer,
        stakeholderList: state.stakeholderList,
})
    
export default connect(mapStateToProps, {setListAddTask, setListTaskResultTitle, setListTaskResultStatus, 
    updateActivity, setActivityDetailsUpdate, setActivePage, setSelDetails})(ActivityWizard)