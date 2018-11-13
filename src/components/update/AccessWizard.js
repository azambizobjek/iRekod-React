import React, { Component,Fragment } from 'react' 
import Select from 'react-select'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class accessWizard extends Component {   
    constructor(){
        super()
        this.state={
             multiSel:[],
             accessList:[],
             accViewVal:[],
             accUpdVal:[],
             accRmvVal:[],
             accModVal:[],             
             stakehList:[],
             
        }
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

    componentDidUpdate(prevProps){
        if(prevProps.stakeholderUpdate.stakehList!==this.props.stakeholderUpdate.stakehList){
            const {stakehList}=this.props.stakeholderUpdate      
                // console.log(stakehList)                     
                const stakehOptions = stakehList.map(itm=>({ value: itm.stakeholder_id, label:decodeURIComponent(itm.full_name), status: true}))
                // console.log(stakehOptions)
            this.setState({ 
                stakehList:stakehOptions
            })
        } 
        // if(prevProps.stakeholderUpdate.stkhDetail!==this.props.stakeholderUpdate.stkhDetail){
          
        // }      
    }  

    componentWillMount(){
        const {stakeholder_Detail:[{acl_entries}]}=this.props.stakeholderView  
              
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
             console.log(acl_entries)
            
            const accView = view.map(itm=>({value: itm.stakeholder_id, label:decodeURIComponent(itm.stakeholder_name), view: true}))
             console.log(view)

            const accUpd = update.map(itm=>({value: itm.stakeholder_id, label:decodeURIComponent(itm.stakeholder_name), update: true}))
            //  console.log(accView)

            const accRmv = remove.map(itm=>({value: itm.stakeholder_id, label:decodeURIComponent(itm.stakeholder_name), remove: true}))
            //  console.log(accView)

            const accMod = aclMod.map(itm=>({value: itm.stakeholder_id, label:decodeURIComponent(itm.stakeholder_name)}))
            //  console.log(accView)
            
            this.setState({ 
                accViewVal:accView,
                accUpdVal:accUpd,
                accRmvVal:accRmv,
                accModVal:accMod,
            })
        }            


    }

    



  render() {

  
    // console.log(acl_entries)
    const active = this.props.active
    const item = this.props.item
    const {accViewVal, accUpdVal, accRmvVal, accModVal, stakehList} = this.state
    //console.log(item)
   
   

    return (
      <Fragment>
        <h1 className="h3 display text-primary text-center">Access Control</h1>
            <form className="mt-3 ml-3 mr-3" onSubmit={this.formSubmit}>
                <div className="row justify-content-center mb-5">
                    <div className="col-xl-3 col-lg-4 col-md-4">
                        <div className="text-center">
                            <img src={require('../../img/add.svg')} alt='folder'className=" img-dash" />
                        </div>
                    </div>
                    <div className="col-xl-9 col-lg-8 col-md-8 col-sm-2">
                        <div className="row">
                            <div className="js-view col-lg-6 col-md-6 col-sm-6">
                                <label className="test">View</label>
                                <Select 
                                    options={stakehList}
                                    onChange={this.handleViewChange}
                                    value={accViewVal} 
                                    isMulti
                                    placeholder="View"/>                                 
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <label>Update</label>
                                <Select 
                                    options={stakehList}
                                    onChange={this.handleUpdChange}
                                    value={accUpdVal} 
                                    isMulti
                                    placeholder="Update"/>                                
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 mt-2">
                                <label>Remove</label>
                                <Select 
                                    options={stakehList}
                                    onChange={this.handleRemoveChange}
                                    value={accRmvVal} 
                                    isMulti
                                    placeholder="Remove"/>                                  
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 mt-2">
                                <label>Modify</label>
                                <Select 
                                    options={stakehList}
                                    onChange={this.handleModifyChange}
                                    value={accModVal} 
                                    isMulti
                                    placeholder="Modify"/>                                          
                            </div>
                        </div> 
                    </div>
                </div>
                <div className={active==='access'?"modal-footer":""}>
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button type="button" className="btn btn-secondary" >Close</button>
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
accessWizard.propTypes={
    session: PropTypes.object.isRequired,
    stakeholderlistType: PropTypes.object.isRequired,
    stakeholderView: PropTypes.object.isRequired,
    layout:PropTypes.object.isRequired,
    stakeholderUpdate: PropTypes.object.isRequired,
   
    
     
}

const mapStateToProps= state =>({
        session:state.session,
        stakeholderlistType:state.stakeholderlistType,
        layout:state.layout,
        stakeholderView: state.stakeholderView,
        stakeholderUpdate: state.stakeholderUpdate,
        
         
})
    
export default connect(mapStateToProps,{
    

    
})(accessWizard)