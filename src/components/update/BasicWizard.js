import React, { Component,Fragment } from 'react' 
import {updStkh} from '../../actions/stakehUpdateAction'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class basicWizard extends Component {
    constructor(){
        super()
        this.state={
            stakeh_type_name: null,
            stakeh_type: null,
            initials: null,
            first_name: null,
            last_name: null,
            full_name: null,
            email: null,
            date_of_birth: null,             
        }        
    }  

    componentWillMount(){
        const {stakeh_type,stakeh_type_name,initials,first_name,last_name,full_name,email,date_of_birth} = this.props.item
        // console.log(email)

        this.setState({
            stakeh_type_name: stakeh_type_name,            
            initials: initials,
            first_name: first_name,
            last_name: last_name,
            full_name: full_name,
            email: email,
            date_of_birth: date_of_birth,
            stakeh_type: parseInt(stakeh_type),           
        })      
    }
     
    handleChange=(e)=>{
        const inputName = e.target.getAttribute('name')
        const inputVal =  e.target.value===""?e.target.value=null:e.target.value  
        // console.log(e.target.value)    
    
      this.setState({
          [inputName]:inputVal
        })  
         // console.log(inputName)   
        //  console.log(inputVal)
    }    
    
    formSubmit=(e)=>{
        const {stakehSel} = this.props.stakeholderlistType  
        const {user:{bio_access_id:idAccess}} = this.props.session
        const {internal,is_blocked,can_login,login_username,password,role_value,role_id,security_level_value,security_level_id,active,date_active_from,date_active_to} = this.props.item
        const {stakeh_type,stakeh_type_name,initials,first_name,last_name,full_name,email,date_of_birth} = this.state
        e.preventDefault()

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

    const {pageTitle} = this.props.layout
    const item = this.props.item
    const active = this.props.active
    const {stakeh_type_name, initials, first_name, last_name, full_name, email, date_of_birth, stakeh_type}=this.state  
    // console.log(item)
    
    return (
      <Fragment>
        <h1 className="h3 display text-primary text-center">Basic</h1>
            <form className="mt-3 mr-3 ml-3" onSubmit={this.formSubmit}>
                <div className="row justify-content-center mb-5">
                    <div className="col-xl-3 col-lg-4 col-md-4">
                        <div className="text-center">
                            <img src={require('../../img/StakeType/'+ item.stakeh_type_name +'.svg')} alt={item.stakeh_type_name} className=" img-dash" />
                        </div>
                    </div>

                    {/* <input name="stakeholder_id" hidden="hidden" type="text"  class="form-control"></input> */}
                    <input name="stakeh_type" hidden="hidden"   type="text"  value={decodeURIComponent(stakeh_type)} className="form-control" disabled/>

                    <div className="col-xl-9 col-lg-8 col-md-8 col-sm-2">
                        <div className="form-group">
                            <label>Type</label>
                                <input type="text" name="stakeh_type_name" className="form-control" value={decodeURIComponent(stakeh_type_name)} disabled/>
                        </div>
                        <div className="row">
                            <div className="col-sm-4 form-group">
                                <label>Initials</label>
                                <input name="initials" type="text" className="form-control" onChange={this.handleChange} value={decodeURIComponent(initials)}/> 
                            </div>
                            <div className="col-sm-4 form-group">
                                <label>First Name</label>
                                <input name="first_name" type="text" className="form-control" placeholder="Smith" value={decodeURIComponent(first_name)} onChange={this.handleChange} />
                            </div>
                            <div className="col-sm-4 form-group">
                                <label>Last Name</label>
                                <input name="last_name" type="text" className="form-control" placeholder="Johnson" onChange={this.handleChange} value={decodeURIComponent(last_name)}/>
                            </div>
                            <div className={pageTitle!=="User"?"col-sm-6 form-group":"col-sm-4 form-group"}>
                                <label>Full Name</label>
                                <input name="full_name" type="text" className="form-control" placeholder="Smith Johnson" onChange={this.handleChange} value={decodeURIComponent(full_name)}/>
                            </div>
                            <div className={pageTitle!=="User"?"col-sm-6 form-group":"col-sm-4 form-group"}>
                                <label>Email</label>
                                <input name="email" type="email" className="form-control" placeholder="Smith@htech.com..." onChange={this.handleChange} value={decodeURIComponent(email)}/>
                            </div>
                            <div className={pageTitle!=="User"?"d-none":"col-sm-4 form-group"}>
                                <label>Date of Birth</label>
                                <input name="date_of_birth" type="text" className="form-control input-datepicker" onChange={this.handleChange} value={decodeURIComponent(date_of_birth)}/>
                            </div>                
                        </div>
                    </div>
                </div>
                <div className={active==='basic'?"modal-footer":""}>
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
basicWizard.propTypes={
    session: PropTypes.object.isRequired,
    stakeholderlistType: PropTypes.object.isRequired,
    stakeholderView: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,    
    updStkh: PropTypes.func.isRequired,
   
    
     
}

const mapStateToProps= state =>({
        session:state.session,
        stakeholderlistType:state.stakeholderlistType,
        layout:state.layout,
        stakeholderView: state.stakeholderView,
         
})
    
export default connect(mapStateToProps,{
    updStkh,
    

    
})(basicWizard)