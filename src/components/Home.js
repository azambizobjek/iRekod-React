import React, { Component, Fragment } from 'react'
import Dashboard from '../components/dashboard/Dashboard'
import addStakeholder from '../components/stakeholder/add/AddStakeholder' 
import index from '../components/stakeholder/index'
import ViewDetail from '../components/stakeholder/view/ViewDetail'
import UpdateDetail from '../components/stakeholder/update/UpdateDetail'
import addChild from '../components/stakeholder/addChild/AddStakeholder'
import search from '../components/stakeholder/search/search'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {setNavToggle,setPageClass, setSideNavClass} from '../actions/layoutInitAction'

import {Footer, SideNav, TopNav} from '../components/layouts'

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
        'child': addChild,  
        'search': search,   
        
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