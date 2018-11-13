import React, { Component,Fragment } from 'react' 
import {addStkh} from '../../actions/stakehAddAction'

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
     
    handleChange=(e)=>{
        const inputName = e.target.getAttribute('name')
        const inputVal =  e.target.value===""?e.target.value=null:e.target.value  
        // console.log(e.target.value)    
    
      this.setState({
          [inputName]:inputVal
        })  
        //  console.log(inputName)   
        //  console.log(inputVal)
    }    

    componentWillMount(){
        const {pageTitle} = this.props.layout
        // console.log(pageTitle)
        if(pageTitle==="Group"){
            const my = 0            
            this.setState({
                stakeh_type: my,
                stakeh_type_name: pageTitle
            })
        }
        if(pageTitle==="Organization"){
            const my = 1          
            this.setState({
                stakeh_type: my,
                stakeh_type_name: pageTitle
            })
        }
        if(pageTitle==="Branch"){
            const my = 2            
            this.setState({
                stakeh_type: my,
                stakeh_type_name: pageTitle
            })
        }
        if(pageTitle==="Department"){
            const my = 3           
            this.setState({
                stakeh_type: my,
                stakeh_type_name: pageTitle
            })
        }
        if(pageTitle==="Designation"){
            const my = 4          
            this.setState({
                stakeh_type: my,
                stakeh_type_name: pageTitle
            })
        }
        if(pageTitle==="User"){
            const my = 5        
            this.setState({
                stakeh_type: my,
                stakeh_type_name: pageTitle
            })
        }
    }   
    
    formSubmit=(e)=>{
       
        const {user:{bio_access_id:idAccess}} = this.props.session
        // const {internal,is_blocked,can_login,login_username,password,role_value,role_id,security_level_value,security_level_id,active,date_active_from,date_active_to} = this.props.item
        const {stakeh_type,stakeh_type_name,initials,first_name,last_name,full_name,email,date_of_birth} = this.state
        e.preventDefault()

        const formObj={
            stakeh_type_name: parseInt(stakeh_type),
            stakeh_type: parseInt(stakeh_type),
            initials: initials,
            first_name: first_name,
            last_name: last_name,
            full_name: full_name,
            email: email,
            date_of_birth: date_of_birth,

            internal: false,
            is_blocked: false,
            can_login: false,
            login_username: null,
            password: null,
            role_value: null,
            role_id: null,
            security_level_value: null,
            security_level_id: null,
            active: false,
            date_active_from: null,
            date_active_to: null,  

            version: 0,           
            stakeholder_id: null,
            bio_access_id: idAccess,
            // acl_id:acl_id,
            // acl_entries:acl_entries,
            // custom_field:custom_field,     

        }        
        this.props.addStkh(formObj)
        // console.log(formObj)
        
        alert("Successful Created")
 

    }
 
  render() {

    const item = this.props.item
    const active = this.props.active
    const {stakeh_type_name} = this.state
    
    return (
      <Fragment>
        <h1 className="h3 display text-primary text-center">Basic</h1>
            <form className="mt-3 mr-3 ml-3" onSubmit={this.formSubmit}>
                <div className="row justify-content-center mb-5">
                    <div className="col-xl-3 col-lg-4 col-md-4">
                        <div className="text-center">
                            <img src={require('../../img/add.svg')} alt="add" className=" img-dash" />
                        </div>
                    </div>                 
                    <div className="col-xl-9 col-lg-8 col-md-8 col-sm-2">
                        <div className="form-group">
                            <label>Type</label>
                                <input type="text" name="stakeh_type_name" className="form-control" onChange={this.handleChange} value={decodeURIComponent(stakeh_type_name)} disabled/>
                        </div>
                        <div className="row">
                            <div className="col-sm-4 form-group">
                                <label>Initials</label>
                                <input name="initials" type="text" className="form-control" onChange={this.handleChange}  /> 
                            </div>
                            <div className="col-sm-4 form-group">
                                <label>First Name</label>
                                <input name="first_name" type="text" className="form-control" placeholder="Smith"   onChange={this.handleChange} />
                            </div>
                            <div className="col-sm-4 form-group">
                                <label>Last Name</label>
                                <input name="last_name" type="text" className="form-control" placeholder="Johnson" onChange={this.handleChange}  />
                            </div>
                            <div className="col-sm-4 form-group">
                                <label>Full Name</label>
                                <input name="full_name" type="text" className="form-control" placeholder="Smith Johnson" onChange={this.handleChange}  />
                            </div>
                            <div className="col-sm-4 form-group">
                                <label>Email</label>
                                <input name="email" type="email" className="form-control" placeholder="Smith@htech.com..." onChange={this.handleChange}  />
                            </div>
                            <div className="col-sm-4 form-group">
                                <label>Date of Corporation/Birth</label>
                                <input name="date_of_birth" type="text" className="form-control input-datepicker" onChange={this.handleChange} />
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
    addStkh: PropTypes.func.isRequired,
   
    
     
}

const mapStateToProps= state =>({
        session:state.session,
        stakeholderlistType:state.stakeholderlistType,
        layout:state.layout,
        stakeholderView: state.stakeholderView,
         
})
    
export default connect(mapStateToProps,{
    addStkh,
   

    
})(basicWizard)