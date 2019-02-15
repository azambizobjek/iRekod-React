import React, { Component,Fragment } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {setActivePage} from '../../../actions/layoutInitAction'
import {toggleAdv } from '../../../actions/auditTrailAction/modalAction'
import {getListAudit} from '../../../actions/auditTrailAction/auditAction'
import { Card } from 'reactstrap'
import moment from 'moment'



class PrintPage extends Component {


    constructor(){
      super();
      this.state = {
        audit:[]
      };
    }

    componentDidMount(){
      
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
    
    }
  



    setActivePage=(e)=>{
        e.preventDefault()
        const pgName = e.target.getAttribute('data-pagename')
        this.props.setActivePage(pgName)
      // console.log(pgName)

       if(pgName==='printReport'){
            this.props.toggleAdv(true)
          }
          else if(pgName==='printStat'){
            this.props.toggleAdv(true)
          }
          else if(pgName==='printUsage'){
            this.props.toggleAdv(true)
          }

  
    
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

                    <h1 className="h3 display">Print Audit Report</h1>    
               
                    </div>
                    </header>


                  <div className="row">
                  <div className="col-6 col-md-4 col-lg-2 col-xl-3">
                  <Card  data-pagename="printReport" onClick={this.setActivePage}>
                  <div className="text-center">
                  <img data-pagename="printReport" width="100%" src={require('../../../img/auditTrail/letter.svg')}  alt="doc" className="img-card mt-2"/>
                  </div>
                  <div className="card-body" data-pagename="printReport">
                  <hr/>
                   <p className="text-center" data-pagename="printReport">List of Records Report</p>
                   </div>
                  </Card>
                  
                 
                  </div>

                  {/* <ReportCard/> */}
           
                  
                  <div className="col-6 col-md-4 col-lg-2 col-xl-3">
                  <Card  data-pagename="printStat" onClick={this.setActivePage}>
                  <div className="text-center">
                  <img data-pagename="printStat" width="100%" src={require('../../../img/auditTrail/graph.svg')}  alt="doc" className="img-card mt-2" />
                  </div>
                  <div className="card-body" data-pagename="printReport">
                  <hr/>
                  <p className="text-center" data-pagename="printStat">Record Statistic Report</p>
                  </div>
                  </Card>
                  </div>
                  
                  <div className="col-6 col-md-4 col-lg-2 col-xl-3">
                  <Card  data-pagename="printUsage" onClick={this.setActivePage}>
                  <div className="text-center">
                  <img data-pagename="printUsage" width="100%" src={require('../../../img/auditTrail/system.svg')}  alt="doc" className="img-card mt-2" />
                  </div>
                  <div className="card-body" data-pagename="printReport">
                  <hr/>
                  <p className="text-center" data-pagename="printUsage">System Usage Report</p>
                  </div>
                  </Card>
                  </div>
                  
                  </div>       
            </div>
        </section>
      </Fragment>
    )
  }
}
PrintPage.propTypes={
    auditlog: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    setActivePage: PropTypes.func.isRequired,
    toggleAdv: PropTypes.func.isRequired,
    getListAudit:PropTypes.func.isRequired,
  
  }
  const mapStateToProps= state =>({
    session:state.session,
    auditlog:state.auditlog

  
  })
  export default connect(mapStateToProps, {setActivePage, toggleAdv, getListAudit  })(PrintPage)
