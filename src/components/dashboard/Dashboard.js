import React, { Component,Fragment } from 'react'
import Card from '../dashboard/Card'  

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class Dashboard extends Component {


  render() {
    

  return (
      <Fragment>
         <div className="breadcrumb-holder">
            <div className="container-fluid">        
              <div className="breadcrumb"> 
          
                <h4 className="text-primary"><strong>DASHBOARD</strong></h4>   
                
             
              </div>
            </div>
        </div>   

        
             
        

       
            <Card

            />


          
        
  
      </Fragment>
    )
  }
}
Dashboard.propTypes={
  session: PropTypes.object.isRequired,
  stakeholderlistType: PropTypes.object.isRequired,
  stakeholderView: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,
  fab: PropTypes.object.isRequired,
 
  
 
  
   
}

const mapStateToProps= state =>({
      session:state.session,
      stakeholderlistType:state.stakeholderlistType,
      layout:state.layout,
      stakeholderView: state.stakeholderView,
      fab:state.fab,
       
})
  
export default connect(mapStateToProps,{
 
 
  
})(Dashboard)
