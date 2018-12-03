import React from 'react'  

export default function Card({stakehId,name,typeName,isSel,markOnSel}) {
  const sendStakehId=()=>{
    markOnSel(stakehId)       
  }
   
  
   
  return (         
    <div>
    <section className="statistics">
        <div className="container-fluid">
        <div className="row d-flex">

        <div className="col-lg-4">      
            <div className="card data-usage">
                <h2 className="display h4">Group</h2>
                <div className="row d-flex align-items-center">
                    <div className="col-sm-6">
                                                            
                        <img src={require('../../img/StakeType/Group.svg')} alt="group" className="card-img-top img-fluid" data-toggle="tooltip" data-placement="top" title="Group"/>                                      
                        
                    </div>
                    <div className="col-sm-6"><h3 className="h4 display">Total</h3><strong className="text-primary">7</strong><span></span></div>
                </div>

            </div>
        </div>

        <div className="col-lg-4">      
            <div className="card data-usage">
                <h2 className="display h4">Organization</h2>
                <div className="row d-flex align-items-center">
                    <div className="col-sm-6">
                                                            
                        <img src={require('../../img/StakeType/Organization.svg')} alt="Organization" className="card-img-top img-fluid" data-toggle="tooltip" data-placement="top" title="Organization"/>                                      
                        
                    </div>
                    <div className="col-sm-6"><h3 className="h4 display">Total</h3><strong className="text-primary">21</strong><span></span></div>
                </div>

            </div>
        </div>

        <div className="col-lg-4">      
            <div className="card data-usage">
                <h2 className="display h4">Branch</h2>
                <div className="row d-flex align-items-center">
                    <div className="col-sm-6">
                                                            
                        <img src={require('../../img/StakeType/Branch.svg')} alt="Branch" className="card-img-top img-fluid" data-toggle="tooltip" data-placement="top" title="Branch"/>                                      
                        
                    </div>
                    <div className="col-sm-6"><h3 className="h4 display">Total</h3><strong className="text-primary">5</strong><span></span></div>
                </div>

            </div>
        </div>



        </div>
        </div>
    </section>

    <section className="statistics mt-3">
        <div className="container-fluid">
        <div className="row d-flex">

                
        <div className="col-lg-4">      
            <div className="card data-usage">
                <h2 className="display h4">Department</h2>
                <div className="row d-flex align-items-center">
                    <div className="col-sm-6">
                                                            
                        <img src={require('../../img/StakeType/Department.svg')} alt="Department" className="card-img-top img-fluid" data-toggle="tooltip" data-placement="top" title="Department"/>                                      
                        
                    </div>
                    <div className="col-sm-6"><h3 className="h4 display">Total</h3><strong className="text-primary">7</strong><span></span></div>
                </div>

            </div>
        </div>

        <div className="col-lg-4">      
            <div className="card data-usage">
                <h2 className="display h4">Designation</h2>
                <div className="row d-flex align-items-center">
                    <div className="col-sm-6">
                                                            
                        <img src={require('../../img/StakeType/Designation.svg')} alt="Designation" className="card-img-top img-fluid" data-toggle="tooltip" data-placement="top" title="Designation"/>                                      
                        
                    </div>
                    <div className="col-sm-6"><h3 className="h4 display">Total</h3><strong className="text-primary">4</strong><span></span></div>
                </div>

            </div>
        </div>

        <div className="col-lg-4">      
            <div className="card data-usage">
                <h2 className="display h4">User</h2>
                <div className="row d-flex align-items-center">
                    <div className="col-sm-6">                                                            
                        <img src={require('../../img/StakeType/User.svg')} alt="User" className="card-img-top img-fluid" data-toggle="tooltip" data-placement="top" title="User"/>                                      
                    </div>
                  
                    <div className="col-sm-6"><h3 className="h4 display">Total</h3><strong className="text-primary">12</strong><span></span></div>
                </div>

            </div>
        </div>
                
        </div>
        </div>
    </section>
 
 

    </div>
        
         
  )
}


