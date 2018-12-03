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
                    <div className="col-sm-6"><strong className="text-primary">34</strong><span></span></div>
                </div>

            </div>
        </div>

        <div className="col-lg-4">      
            <div className="card data-usage">
                <h2 className="display h4">Group</h2>
                <div className="row d-flex align-items-center">
                    <div className="col-sm-6">
                                                            
                        <img src={require('../../img/StakeType/Organization.svg')} alt="group" className="card-img-top img-fluid" data-toggle="tooltip" data-placement="top" title="Group"/>                                      
                        
                    </div>
                    <div className="col-sm-6"><strong className="text-primary">34</strong><span></span></div>
                </div>

            </div>
        </div>

        <div className="col-lg-4">      
            <div className="card data-usage">
                <h2 className="display h4">Group</h2>
                <div className="row d-flex align-items-center">
                    <div className="col-sm-6">
                                                            
                        <img src={require('../../img/StakeType/Branch.svg')} alt="group" className="card-img-top img-fluid" data-toggle="tooltip" data-placement="top" title="Group"/>                                      
                        
                    </div>
                    <div className="col-sm-6"><strong className="text-primary">34</strong><span></span></div>
                </div>

            </div>
        </div>



        </div>
        </div>
    </section>

    <section class="statistics mt-3">
        <div class="container-fluid">
        <div class="row d-flex">

                
        <div className="col-lg-4">      
            <div className="card data-usage">
                <h2 className="display h4">Group</h2>
                <div className="row d-flex align-items-center">
                    <div className="col-sm-6">
                                                            
                        <img src={require('../../img/StakeType/Department.svg')} alt="group" className="card-img-top img-fluid" data-toggle="tooltip" data-placement="top" title="Group"/>                                      
                        
                    </div>
                    <div className="col-sm-6"><strong className="text-primary">34</strong><span></span></div>
                </div>

            </div>
        </div>

        <div className="col-lg-4">      
            <div className="card data-usage">
                <h2 className="display h4">Group</h2>
                <div className="row d-flex align-items-center">
                    <div className="col-sm-6">
                                                            
                        <img src={require('../../img/StakeType/Designation.svg')} alt="group" className="card-img-top img-fluid" data-toggle="tooltip" data-placement="top" title="Group"/>                                      
                        
                    </div>
                    <div className="col-sm-6"><strong className="text-primary">34</strong><span></span></div>
                </div>

            </div>
        </div>

        <div className="col-lg-4">      
            <div className="card data-usage">
                <h2 className="display h4">Group</h2>
                <div className="row d-flex align-items-center">
                    <div className="col-sm-6">
                                                            
                        <img src={require('../../img/StakeType/User.svg')} alt="group" className="card-img-top img-fluid" data-toggle="tooltip" data-placement="top" title="Group"/>                                      
                        
                    </div>
                    <div className="col-sm-6"><strong className="text-primary">34</strong><span></span></div>
                </div>

            </div>
        </div>
                
        </div>
        </div>
    </section>
 
 

    </div>
        
         
  )
}


