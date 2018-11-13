import React, { Component,Fragment } from 'react' 
import Select from 'react-select'
import Checkbox from 'rc-checkbox'; 
import {updStkh} from '../../actions/stakehUpdateAction'


import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import 'rc-checkbox/assets/index.css';
// import '../css/bootstrap-datepicker3.css'


class securityWizard extends Component {   
    constructor(){
        super()
        this.state={              
            role_list:[],
            roleVal:[],  
            secList:[],  
            secVal:[],       
            internal: null,
            is_blocked: null,
            can_login: null,
            login_username: null,
            password: null,
            role_value: null,
            role_id: null,
            security_level_value: null,
            security_level_id: null,
            active: null,
            date_active_from: null,
            date_active_to: null,            
        }
    }   

    componentWillMount(){
        const {internal,is_blocked,can_login,login_username,password,active,date_active_from,date_active_to} = this.props.item
         
        this.setState({          
            internal: internal,
            is_blocked: is_blocked,
            can_login: can_login,
            login_username: login_username,
            password: password,            
            active: active,
            date_active_from: date_active_from,
            date_active_to: date_active_to,         
        })
    }
    
    handleChange=(e)=>{
        e.preventDefault()
        const target = e.target
        const value =  e.target.type==='checkbox'?target.checked:target.value 
        const input = e.target.name      
                
        this.setState({
            [input]:value
        })  
        // console.log(input)  
        // console.log(value)
    }    

    componentDidUpdate(prevProps){
        if(prevProps.stakeholderUpdate.role_Store!==this.props.stakeholderUpdate.role_Store){
            const {role_Store}=this.props.stakeholderUpdate                    
            const item = this.props.item                 
            const roleOptions = role_Store.map(itm=>({ value: itm.role_id, label:itm.title}))
                // console.log(roleOptions)
            const roleValue = ({value: item.role_id, label:item.role_value})
            this.setState({ 
                role_list:roleOptions,
                roleVal: roleValue
            })
        }
        if(prevProps.stakeholderUpdate.securityLevel!==this.props.stakeholderUpdate.securityLevel){
            const {securityLevel} = this.props.stakeholderUpdate                            
            const item = this.props.item 
            // console.log(securityLevel)   
            const secLevel = securityLevel.map(itm=>({ value: itm.security_level_id, label: itm.title }))
            // console.log(secLevel)   
            const security =({value: item.security_level_id, label:item.security_level_value})
            this.setState({
                secList:secLevel,
                secVal: security
            })
        }          
    }

    handleRoleChange=(value)=>{
        // const inputName = e.target.getAttribute('name')
        this.setState({roleVal:value})
        // console.log(value)
    }

    handleSecLevelChange=(param)=>{
        // const inputName = e.target.getAttribute('name')
        this.setState({secVal:param})
        // console.log(value)
    }

    formSubmit=(e)=>{
        e.preventDefault()
        const {stakehSel} = this.props.stakeholderlistType  
        const {user:{bio_access_id:idAccess}} = this.props.session
        const {date_active_from,date_active_to,login_username,internal,is_blocked,can_login,active,roleVal:{value:role_id,label:role_value},password,secVal:{value:security_level_id,label:security_level_value}}=this.state
        const {stakeh_type_name,stakeh_type,initials,first_name,last_name,full_name,email,date_of_birth} = this.props.item
        // console.log(role_id)

        const formObj={                       
            stakeh_type_name: stakeh_type_name,
            stakeh_type: stakeh_type,
            initials: initials,
            first_name: first_name,
            last_name: last_name,
            full_name: full_name,
            email: email,
            date_of_birth: date_of_birth,

            internal: internal,
            is_blocked: is_blocked,
            can_login: can_login,
            login_username: login_username,
            password: password,
            role_value: role_value,
            role_id: role_id,
            security_level_value: security_level_value,
            security_level_id: security_level_id,
            active: active,
            date_active_from: date_active_from,
            date_active_to: date_active_to,  
            
            version: 0,           
            stakeholder_id: stakehSel,
            bio_access_id: idAccess,
            // acl_id:acl_id,
            // acl_entries:acl_entries,
            // custom_field:custom_field,          
        }
        this.props.updStkh(formObj)
        // console.log(formObj)

        alert("Succesful")
    }
     

  render() {
    
    // const item = this.props.item
    const {stakeh_type_name} = this.props.item    
    const active1 = this.props.active    
    const {role_list,roleVal,secList,secVal,date_active_from,date_active_to,login_username,internal,is_blocked,can_login,active}=this.state
    // console.log(secVal)  
    
    return (
      <Fragment>
        <h1 className="h3 display text-primary text-center">Security</h1>
            <form className="mt-3 ml-3 mr-3" onSubmit={this.formSubmit}>
                <div className="row justify-content-center mb-5">
                    <div className="col-xl-3 col-lg-4 col-md-4">
                        <div className="text-center">
                            <img src={require('../../img/StakeType/'+ stakeh_type_name +'.svg')} alt='folder'className=" img-dash" />
                        </div>
                    </div>
                    <div className="col-xl-9 col-lg-8 col-md-8 col-sm-2">                    
                        <div className="row">
                            <div className="form-group col-sm-6">
                                <label>Role</label>
                                <Select 
                                    options={role_list}
                                    onChange={this.handleRoleChange}
                                    value={roleVal} 
                                    placeholder="Role"/> 
                            </div>
                            <div className="form-group col-sm-6">
                                <label>Security Level</label>
                                <Select 
                                    options={secList}
                                    onChange={this.handleSecLevelChange}
                                    value={secVal} 
                                    placeholder="Security Level"/> 
                            </div>                                                 
                        </div>
                      <div className="form-group">                           
                          <div className="i-checks">
                            <input name="active" type="checkbox" checked={active} onChange={this.handleChange}  />    
                                <label>Active</label>
                          </div>
                        </div>
                        <label>Date Active Range</label>
                            <div className="row">                       
                                <div className="col-sm-6 form-group">
                                    <input name="date_active_from" type="text" placeholder="Date from" className="form-control input-datepicker" onChange={this.handleChange} value={decodeURIComponent(date_active_from)}/>
                                </div>
                                <div className="col-sm-6 form-group">
                                    <input name="date_active_to" type="text" placeholder="Date to" className="form-control input-datepicker" onChange={this.handleChange} value={decodeURIComponent(date_active_to)}/>
                                </div>
                            </div>
                        <div className="form-group row">
                            <div className="i-checks col-sm-2">
                                <input name="internal" type="checkbox" checked={internal} onChange={this.handleChange}   />
                                <label>Internal</label>
                            </div>
                            <div className="i-checks col-sm-2">
                                <input name="is_blocked" type="checkbox" checked={is_blocked} onChange={this.handleChange}   />
                                <label>Is Blocked</label>
                            </div>
                            <div className="i-checks col-sm-2">
                                <input name="can_login" type="checkbox" checked={can_login} onChange={this.handleChange}   />
                                <label>Can Login</label>
                            </div>
                        </div>
                        <div className={can_login===null||can_login=== false?"d-none":"autoUpdate row"}>
                            <div className="col-sm-6 form-group">
                                <label>Username</label>
                                <input type="text" name="login_username" className="form-control" onChange={this.handleChange} value={decodeURIComponent(login_username)}/>
                            </div>
                            <div className="col-sm-6 form-group">
                                <label>Password</label>
                                <input name="" type="password" onChange={this.handleChange} className="form-control" />
                            </div>
                        </div>  
                    </div>
                </div>
                <div className={active1==='security'?"modal-footer":""}>
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button type="button" className="btn btn-secondary">Close</button>                   
                </div>
            </form>
                {/* <Loader
                    modalIsOpen={this.state.openLoader}
                    loaderText={this.state.loaderText}
                /> */}
      </Fragment>
    )
  }
}
securityWizard.propTypes={
    session: PropTypes.object.isRequired,
    stakeholderlistType: PropTypes.object.isRequired,
    stakeholderView: PropTypes.object.isRequired,
    stakeholderUpdate: PropTypes.object.isRequired,   
    layout: PropTypes.object.isRequired,
    updStkh: PropTypes.func.isRequired,
   
    
     
}

const mapStateToProps= state =>({
        session:state.session,
        stakeholderlistType:state.stakeholderlistType,
        layout:state.layout,
        stakeholderView: state.stakeholderView,
        stakeholderUpdate: state.stakeholderUpdate,

         
})
    
export default connect(mapStateToProps,{
    updStkh,
    
    
})(securityWizard)