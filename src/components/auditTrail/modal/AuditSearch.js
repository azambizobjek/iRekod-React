import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import 'react-datepicker/dist/react-datepicker.css'
import Tooltip from 'rc-tooltip'
import moment from 'moment'
import {getListAudit} from '../../../actions/auditTrailAction/auditAction'

import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import {setActivePage} from '../../../actions/layoutInitAction'


class AuditSearch extends Component {

  constructor(){
    super()
    
    this.state={
        
        startdate : moment().startOf( 'months'),
        endate : moment().endOf('months'),
        lastevent : moment().subtract(20, 'days').calendar(),

    }
}



  searchLogByToday =()=>{
    const {startDate, endDate }=this.state
    const {user:{bio_access_id:bId}}=this.props.session
    const param = {
        action: "SEARCH_AUDIT_LOG",
        bio_access_id: bId,
        action_types:[],
        date_from:startDate===null?'': moment(startDate).format('DD/MM/YYYY'),
        date_to:endDate===null?'': moment(endDate).format('DD/MM/YYYY'),
        stakeholder_id:"",
        record_id:"",
        audit_types: [],
        record_type_id:""
    }
    this.props.getListAudit(param)
    console.log('Today Search')
    console.log(param)
  }

  
  searchLast20Events =()=>{
    const {lastevent}=this.state
    const {user:{bio_access_id:bId}}=this.props.session
    const param = {
        action: "SEARCH_AUDIT_LOG",
        bio_access_id: bId,
        action_types:[],
        date_from:moment(lastevent).format('DD/MM/YYYY'),
        date_to: moment().format('DD/MM/YYYY'),
        stakeholder_id:"",
        record_id:"",
        audit_types: [],
        record_type_id:""
    }
    this.props.getListAudit(param)
    console.log('Last 20 Events')
    console.log(param)
  }

  searchLogThisMonth =()=>{
    const {startdate, endate }=this.state
    const {user:{bio_access_id:bId}}=this.props.session
    const param = {
        action: "SEARCH_AUDIT_LOG",
        bio_access_id: bId,
        action_types:[],
        date_from: moment(startdate).format('DD/MM/YYYY'),
        date_to:moment(endate).format('DD/MM/YYYY'),
        stakeholder_id:"",
        record_id:"",
        audit_types: [],
        record_type_id:""
    }
    this.props.getListAudit(param)
    console.log('This Month')
    console.log(param)
  }

  searchLogAll =()=>{
    const {user:{bio_access_id:bId}}=this.props.session
    const param = {
        action: "SEARCH_AUDIT_LOG",
        bio_access_id: bId,
        action_types:[],
        date_from: moment('2018-01-01').format('DD/MM/YYYY'),
        date_to: moment().format('DD/MM/YYYY'),
        stakeholder_id:"",
        record_id:"",
        audit_types: [],
        record_type_id:""
    }
    this.props.getListAudit(param)
    console.log('Today Search')
    console.log(param)
  }

  setActivePage=(e)=>{
    e.preventDefault()
    const pgName = e.target.getAttribute('data-pagename')
    this.props.setActivePage(pgName)
  console.log(pgName)
  }


  render() {
      const {audit}=this.props.auditlog

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

                    <h1 className="h3 display">Audit Trail</h1>
                    <div className="d-flex align-items-center">

                    <Tooltip
                    data-pagename="log" placement="top"overlay={<div style={{ height: 20, width: '100%' }}>Search</div>}
                    arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                    >
                    <button data-pagename="log" className="btn btn-sm btn-primary" onClick={this.setActivePage}>
                    <i data-pagename="log" className="fa fa-chevron-left"></i>
                    </button>
                    </Tooltip>
                   
                    <Tooltip
                    placement="top"overlay={<div style={{ height: 20, width: '100%' }}>Search By Today</div>}
                    arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                    >
                    <button className="btn btn-sm btn-primary ml-2" onClick={this.searchLogByToday} >
                    <i className="fa fa-calendar"></i>
                    </button>
                    </Tooltip>
                    
                    <Tooltip
                    placement="top"
                    overlay={<div style={{ height: 20, width: '100%' }}>Last 20 Events</div>}
                    arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                    >
                    <button className="btn btn-sm btn-primary ml-2" onClick={this.searchLast20Events} >
                    <i className="fa fa-calendar-check-o "></i>
                    </button>
                    </Tooltip>
                    
                    <Tooltip
                    placement="top"
                    overlay={<div style={{ height: 20, width: '100%' }}>Search This Month</div>}
                    arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                    >
                    <button className="btn btn-sm btn-primary ml-2" onClick={this.searchLogThisMonth} >
                    <i className="fa fa-calendar-minus-o"></i>
                    </button>
                    </Tooltip>
                    
                    <Tooltip
                    placement="top"
                    overlay={<div style={{ height: 20, width: '100%' }}>Search All</div>}
                    arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                    >
                    <button className="btn btn-sm btn-primary ml-2" onClick={this.searchLogAll} >
                    <i className="fa fa-search"></i>
                    </button>
                    </Tooltip>
                    
                    </div>
                    </div>
                    </header>

                
       
                <div className="row">
              
                <VerticalTimeline>{audit.map((itm,idx)=>
                <VerticalTimelineElement key={idx}
                className="vertical-timeline-element--work"
                iconStyle={{ background: 'rgb(33, 50, 243)', color: '#fff' }}
                icon={ <img src={require(`../../../img/auditTrail/${itm.action_type}.svg`)} alt={itm.action_type}/> }
                >

            <h5 className="vertical-timeline-element-title">{itm.audit_type}</h5>

                <div className="d-flex mt-2">
                      <p className="userIcon"><img src={require(`../../../img/auditTrail/clock.svg`)} alt='' className="img-fluid pr-1"/></p>
                      <p className="vertical-timeline-element-title">{new Date(itm.date_updated).toLocaleString("en-my")}</p>
                    </div>

            <h5 className="vertical-timeline-element-title">{itm.record_title}</h5>
            <a><small>{decodeURIComponent(itm.record_type)}</small></a>
            <a><small>{decodeURIComponent(itm.details)}</small></a>

                </VerticalTimelineElement> 
                )}
                </VerticalTimeline>
                </div>
            </div>
        </section>
        
        {/* <AuditSearch/> */}
    </Fragment>
    )
  }
}
AuditSearch.propTypes={
    auditlog: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    getListAudit:PropTypes.func.isRequired,
    setActivePage: PropTypes.func.isRequired,




  }
  const mapStateToProps= state =>({
    auditlog:state.auditlog,
    session:state.session,


  })
export default connect(mapStateToProps, {setActivePage,     
    getListAudit})(AuditSearch)









