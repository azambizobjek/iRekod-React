import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

import { connect } from 'react-redux'
import { toggleErr } from '../../../actions/auditTrailAction/modalAction'
import { getStakehList } from '../../../actions/auditTrailAction/stakehAction'
import { getRecordList } from '../../../actions/auditTrailAction/recAction'
import { getActionTypes } from '../../../actions/auditTrailAction/eventAction'
import {getFilterList} from '../../../actions/auditTrailAction/filterListAction'
import {getListAudit} from '../../../actions/auditTrailAction/auditAction'
import {setActivePage} from '../../../actions/layoutInitAction'

import { Button,Form, FormGroup  } from 'reactstrap'


class index extends Component {
    constructor(){
        super()
        this.state={
            startDate:null,
            endDate: null,
            stakehVal:[],
            recordVal:[],
            actionVal:[],
            filterVal:[],
            // stakeh:[],


        }
    }
    componentDidMount(){
        const {user:{bio_access_id:bId}}=this.props.session
        const {stakehList}=this.props.stakeh
        if(stakehList.length === 0){this.props.getStakehList({bio_access_id:bId,action:'ITEM_LIST'})}
        else {
            const stakeholder = stakehList.map(itm => ({ value: itm.stakeholder_id, label: itm.full_name, stakehType:itm.stakeh_type, stakehTypeName:itm.stakeh_type_name.toLowerCase()}))
            this.setState({stakeh: stakeholder})
            
        }
        const {recordList}=this.props.record
        if(recordList.length === 0){this.props.getRecordList({bio_access_id:bId,action:'ITEM_LIST'})}
        else {
            const record = recordList.map(itm => ({ value: itm.record_id, label: itm.title, recordNo:itm.record_no, recordType: itm.record_type}))
            this.setState({record: record})
        }

        const {actionTypes}=this.props.actionTy
        if(actionTypes.length === 0){this.props.getActionTypes({bio_access_id:bId,action:'ACTION_TYPES'})}
        else {
            const actionTy = actionTypes.map(itm => ({ value: itm.id, label:itm.name}))
             this.setState({actionTy: actionTy})
        }

        const {filterList}=this.props.filter
        if(filterList.length === 0){this.props.getFilterList({bio_access_id:bId,action:'AUDIT_TYPE_LIST'})}
        else {
            const filter = filterList.map(itm => ({ value: itm.lov_item_id, label:itm.value, code : itm.code, displayValue : itm.display_value} ))
            this.setState({filter: filter})
        }
    }

    
    
    componentDidUpdate(prevProps){

        if (prevProps.stakeh.stakehList !== this.props.stakeh.stakehList) {
            // console.log('update')
            const {stakehList}=this.props.stakeh
            // console.log(stakehList)
            const stakeholder = stakehList.map(itm => ({ value: itm.stakeholder_id, label: itm.full_name, stakehType:itm.stakeh_type, stakehTypeName:itm.stakeh_type_name.toLowerCase()}))
            this.setState({stakeh: stakeholder})
  
          }

   

        if (prevProps.record.recordList !== this.props.record.recordList) {
            console.log('update')
            const {recordList}=this.props.record
            const record = recordList.map(itm => ({ value: itm.record_id, label: itm.title, recordNo:itm.record_no, recordType: itm.record_type}))
            this.setState({record: record})
  
          }

           if (prevProps.actionTy.actionTypes !== this.props.actionTy.actionTypes) {
             console.log('update')

             const {actionTypes}=this.props.actionTy
             const actionTy = actionTypes.map(itm => ({ value: itm.id, label:itm.name}))
             this.setState({actionTy: actionTy})
  
          }  
          
          if (prevProps.filter.filterList !== this.props.filter.filterList) {
            console.log('update')

            const {filterList}=this.props.filter
            const filter = filterList.map(itm => ({ value: itm.lov_item_id, label:itm.value, code : itm.code, displayValue : itm.display_value} ))
            this.setState({filter: filter})
  
          }  

          

    }


    handleChange = ({ startDate, endDate }) => {
        startDate = startDate || this.state.startDate
        endDate = endDate || this.state.endDate

        if (startDate.isAfter(endDate)) {
          endDate = startDate
        }

        this.setState({ startDate, endDate })
    }



    handleChangeStart = (startDate) => this.handleChange({ startDate })

    handleChangeEnd = (endDate) => this.handleChange({ endDate })


    handleSelectChangeStakeh = (value)=> this.setState({ stakehVal:value})

    handleSelectChangeRecord = (value)=> this.setState({ recordVal:value})

    handleSelectChangeAction = (value)=> this.setState({ actionVal:value})

    handleSelectChangeFilter = (value)=> this.setState({ filterVal:value})



    formSubmit=(e)=>{
        e.preventDefault()
        const { filterVal, actionVal, startDate, endDate, stakehVal, recordVal}=this.state
        const selAction=actionVal.map((itm )=> itm.value)
        const {user:{bio_access_id}}=this.props.session
        const param = {
            action: "SEARCH_AUDIT_LOG",
            bio_access_id,
            action_types:selAction,
            date_from:startDate===null?'': moment(startDate).format('DD/MM/YYYY'),
            date_to:endDate===null?'': moment(endDate).format('DD/MM/YYYY'),
            stakeholder_id:stakehVal.value,
            record_id:recordVal.value,
            audit_types: filterVal,
            record_type_id:""
        }
        this.props.getListAudit(param)
        this.props.setActivePage('auditSearch')


    }


  render() {

      
      

    return (
        <Fragment>
        <div className="breadcrumb-holder">
            <div className="container-fluid">
            </div>
        </div>

        

        <section>
            <div className="container-fluid">

            <header>
                <div className="d-flex align-items-center justify-content-between">
                <h1 className="h3 display">Audit Trail Search</h1>    
                </div>
            </header>

            <div className="col-lg-12">
            <div className="card">
            <div className=" card-header ">
            <center>
            <img width="100%" src={require('../../../img/auditTrail/searchau.svg')}  alt="doc" className="img-list" />
            </center>
            </div>
            <div className="card-body">
            <h1 className="h3 display text-primary text-center">Search</h1>

             <Form onSubmit={this.formSubmit}
            >

            
            <div className="row">
            <div className="col-md-4">

                <FormGroup>
                    <label>Event Types</label>
                    <Select
                    name="actionTy"
                    placeholder="Select types"
                    loadingPlaceholder="Loading.."
                    value={this.state.actionVal}
                    onChange={this.handleSelectChangeAction}
                    options={this.state.actionTy}
                    isClearable={true}
                    isMulti
                    />
                </FormGroup>
                </div>

            

                <div className="col-md-6">
                <FormGroup>
                    <label>Filter List</label>
                    <Select
                    name="filter"
                    placeholder="Filter List"
                    loadingPlaceholder="Loading.."
                    value={this.state.filterValVal}
                    onChange={this.handleSelectChangeFilter}
                    options={this.state.filter}
                    isClearable={true}
                    />
                </FormGroup>
                </div>




              

               <div className="col-md-4">
                <FormGroup>
                <label>Date Start</label>
                <DatePicker
                    placeholder="Date Start"
                    selected={this.state.startDate}
                    selectsStart
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={this.handleChangeStart}
                    className="form-control"
                    dateFormat="DD/MM/YYYY"
                />
                </FormGroup>
                </div>

                <div className="col-md-6">
                <FormGroup>
                    <label>Stakeholder</label>
                    <Select
                    name="stakeh"
                    placeholder="Select stakeholder"
                    loadingPlaceholder="Loading.."
                    value={this.state.stakehVal}
                    onChange={this.handleSelectChangeStakeh}
                    options={this.state.stakeh}
                    isClearable={true}
                    />
                </FormGroup>
                </div>

                
                


                <div className="col-md-4">
                <FormGroup>
                <label>Date End</label>
                <DatePicker
                    placeholder="Date End"
                    selected={this.state.endDate}
                    selectsEnd
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={this.handleChangeEnd}
                    className="form-control"
                    dateFormat="DD/MM/YYYY"
                />
                </FormGroup>
                </div>

                <div className="col-md-6">
                  <FormGroup>
                    <label>Record No.</label>
                    <Select
                    name="record"
                    placeholder="Select record no."
                    loadingPlaceholder="Loading.."
                    value={this.state.recordVal}
                    onChange={this.handleSelectChangeRecord}
                    options={this.state.record}
                    isClearable={true}
                    />
                </FormGroup>
                </div>



                </div>
                
                <div className="modal-footer">
                <Button  type="submit" color="primary" >Search</Button>{' '}
                </div>
            </Form>
            </div>
            </div>
            </div>

            </div>
            </section>
     </Fragment>

    )
  }
}
index.propTypes={
    modal:PropTypes.object.isRequired,
    toggleErr:PropTypes.func.isRequired,
    getStakehList:PropTypes.func.isRequired,
    getListAudit:PropTypes.func.isRequired,
    getRecordList : PropTypes.func.isRequired,
    getActionTypes : PropTypes.func.isRequired,
    getFilterList : PropTypes.func.isRequired,
    setActivePage: PropTypes.func.isRequired,
    layout:PropTypes.object.isRequired,


  }
const mapStateToProps = (state) => ({
  modal:state.modalConf,
  session:state.session,
  stakeh:state.stakeholder,
  record:state.record,
  actionTy:state.actionTy,
  filter:state.filter,
  layout:state.layout

})
export default connect(mapStateToProps,
    {setActivePage,
    toggleErr,
    getStakehList,
    getRecordList,
    getActionTypes,
    getFilterList,
    getListAudit,
    })
    (index)


