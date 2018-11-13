import React, { Component, Fragment } from 'react'
import Dashboard from '../components/Dashboard'
import addStakeholder from '../components/add/AddStakeholder' 
import index from '../components/index'
import ViewDetail from '../components/ViewDetail'
import UpdateDetail from '../components/update/UpdateDetail'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {setNavToggle,setPageClass, setSideNavClass} from '../actions/layoutInitAction'

import {Footer, SideNav, TopNav} from '../layouts'

class Home extends Component {    

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions)
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions)
    }
    updateDimensions=()=>{
        const windowWidth=window.innerWidth
        const pageClass = windowWidth > 1194 ? 'page active' : 'page active-sm'
        const navClass =  windowWidth > 1194 ? 'side-navbar shrink' : 'side-navbar show-sm'

        this.props.setNavToggle(false, pageClass, navClass)
    }

    components={
        'dashboard' : Dashboard,
        'addStakeholder' : addStakeholder,                
        'index' : index,
        'view': ViewDetail,
        'edit': UpdateDetail,
        
        

    }
     

  render() {       
      const {pageClass,activePage:pName}=this.props.layout                
      const Page=this.components[pName]
    return (
        <Fragment>
            <SideNav/>
            <div className={pageClass}>
            <TopNav/>
            <Page/>
            <Footer/>
        </div>
    </Fragment>
    )
  }
}
Home.propTypes={
    layout:PropTypes.object.isRequired,
    setNavToggle:PropTypes.func.isRequired,
    setPageClass:PropTypes.func.isRequired,
    setSideNavClass:PropTypes.func.isRequired,
  }
  const mapStateToProps= state =>({
    layout:state.layout
  })
  export default connect(mapStateToProps, {setPageClass,setSideNavClass,setNavToggle})(Home)