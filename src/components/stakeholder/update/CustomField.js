import React, { Component,Fragment } from 'react' 
import Select from 'react-select'
import {updStkh} from '../../../actions/stakeholderAction/stakehUpdateAction'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import "react-datepicker/dist/react-datepicker.css"

class customField extends Component {
    constructor(){
        super()
        this.state={
            rows: [{}],
            listCustomField:[],
            customVal: null, 
            field: [], 
            cField:null    
        }        
    }  
    
    
    componentDidUpdate(prevProps){
        if(prevProps.stakeholderUpdate.customField!==this.props.stakeholderUpdate.customField){
            const {customField}=this.props.stakeholderUpdate      
                // console.log(listAncestor)                     
                const custom = customField!==undefined?customField.map(itm=>({ value: itm.custom_field_id, label:decodeURIComponent(itm.custom_field_name) })):"Cannot Select"
                // console.log(stakehOptions)
            this.setState({ 
                listCustomField: custom
            })
        } 
        if(prevProps.stakeholderUpdate.stkhDetail!==this.props.stakeholderUpdate.stkhDetail){
            const {stakeholder_Detail:[{custom_field}]}=this.props.stakeholderView    
            const {rows} = this.state          
            // console.log([custom_field].field)  
            // const val = custom_field.map(x=>x)  
            // console.log(val)                
            this.setState({
                rows: custom_field,  
                // cField: val        
            })      
        }
    }

    handleAddRow = () => {
        const item = {
          name: "",
          mobile: ""
        };
        this.setState({
          rows: [...this.state.rows, item]
        });
      };
    

    handleFieldChange=(value)=>{
        // value.length>1?alert('You may only select 1'):this.setState({groupVal: value}) 
        this.setState({customVal: value})   
        // console.log(value)
    } 

    handleChange = idx => e => {
        const { name, value } = e.target      
        const rows = [...this.state.rows]
        rows[idx] = {
          [name]: value
        }        
        this.setState({
          rows
        });
    }

    handleRemoveSpecificRow = (idx) => () => {
        const rows = [...this.state.rows]
        rows.splice(idx, 1)
        this.setState({ rows })
    }

      
    // handleChange=(event)=>{
    //     // e.preventDefault()
    //     const target = event.target
    //     const value = target.type  
    //     const name = target.name   
                
    //     this.setState({
    //         [name]:value
    //     })  
    //     // console.log(input)  
    //     console.log(value)
    // }   

    formSubmit=(e)=>{
        e.preventDefault()
        this.handleAddRow()

    }
      
  render() {

    // const {customField} = this.props.stakeholderUpdate
    const {pageTitle} = this.props.layout
    const item = this.props.item
    const active = this.props.active
    const {listCustomField,cField,rows} = this.state 
    // console.log(rows)
    
    return (
      <Fragment>
        <h1 className="h3 display text-primary text-center">Custom Field</h1>
            <form className="mt-3 mr-3 ml-3" onSubmit={this.formSubmit}>
                <div className="row justify-content-center mb-5">
                    <div className="col-xl-3 col-lg-4 col-md-4">
                        <div className="text-center">
                            <img src={require('../../../img/StakeType/'+ item.stakeh_type_name +'.svg')} alt={item.stakeh_type_name} className=" img-dash" />
                        </div>
                    </div>
                        <div className="col-xl-9 col-lg-8 col-md-8 col-sm-2">
                        
                        <div className="row">

                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Field</th>
                                        <th scope="col">Value</th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    {rows.map((item, idx)  => (
                                       
                                    <tr id="addr0" key={idx}>
                                        <th scope="row">{idx}</th>                                          
                                            <td>                                               
                                            <Select
                                                options={listCustomField}
                                                name="field"
                                                onChange={this.handleChange(idx)}
                                                value={rows[idx].field}                                             
                                                placeholder="Custom Field"/>   
                                            </td>
                                            <td>
                                                <input name="value" type="text" onChange={this.handleChange(idx)}  className="form-control" value={rows[idx].value}  />
                                            </td>
                                            <td>                                               
                                                <button type="submit" onClick={this.handleRemoveSpecificRow(idx)} className="btn btn-danger">Delete</button>
                                            </td>
                                    </tr>                                      
                                    ))}
                                </tbody>
                            </table>
                            </div>
                        
                        </div>
                </div>
                <div className="modal-footer">   
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
customField.propTypes={
    session: PropTypes.object.isRequired,
    stakeholderlistType: PropTypes.object.isRequired,
    stakeholderView: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,   
    stakeholderUpdate: PropTypes.object.isRequired, 
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
    

    
})(customField)