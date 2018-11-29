import React, { Component,Fragment } from 'react'

export default class Dashboard extends Component {
  render() {
    return (
      <Fragment>
        <div className="breadcrumb">
          <h4 className="modal-title">DASHBOARD</h4>
        </div>

        <section className="statistics">
          <div className="container-fluid">
            <div className="row d-flex">

              <div className="col-lg-4">
                      {/* Group */}
                      <div className="card data-usage">
                          <h2 className="display h4">Group</h2>
                          <div className="row d-flex align-items-center">
                              <div className="col-sm-6">
                                  <div className="card">                                      
                                    <img src={require('../img/StakeType/Group.svg')} alt="Card image cap" className="card-img-top img-fluid" data-toggle="tooltip" data-placement="top" title="Group"/>                                      
                                  </div>
                              </div>
                              <div className="col-sm-6"><strong className="text-primary">34</strong><span></span></div>
                          </div>

                      </div>
                  </div>

                   <div className="col-lg-4">
                      {/* Group */}
                      <div className="card data-usage">
                          <h2 className="display h4">Organization</h2>
                          <div className="row d-flex align-items-center">
                              <div className="col-sm-6">
                                  <div className="card">                                      
                                    <img src={require('../img/StakeType/Group.svg')} alt="Card image cap" className="card-img-top img-fluid" data-toggle="tooltip" data-placement="top" title="Group"/>                                      
                                  </div>
                              </div>
                              <div className="col-sm-6"><strong className="text-primary">34</strong><span></span></div>
                          </div>

                      </div>
                  </div>

                   <div className="col-lg-4">
                      {/* Group */}
                      <div className="card data-usage">
                          <h2 className="display h4">Group</h2>
                          <div className="row d-flex align-items-center">
                              <div className="col-sm-6">
                                  <div className="card">                                      
                                    <img src={require('../img/StakeType/Group.svg')} alt="Card image cap" className="card-img-top img-fluid" data-toggle="tooltip" data-placement="top" title="Group"/>                                      
                                  </div>
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
                      {/* Group */}
                      <div className="card data-usage">
                          <h2 className="display h4">Group</h2>
                          <div className="row d-flex align-items-center">
                              <div className="col-sm-6">
                                  <div className="card">                                      
                                    <img src={require('../img/StakeType/Group.svg')} alt="Card image cap" className="card-img-top img-fluid" data-toggle="tooltip" data-placement="top" title="Group"/>                                      
                                  </div>
                              </div>
                              <div className="col-sm-6"><strong className="text-primary">34</strong><span></span></div>
                          </div>

                      </div>
                  </div>

                   <div className="col-lg-4">
                      {/* Group */}
                      <div className="card data-usage">
                          <h2 className="display h4">Group</h2>
                          <div className="row d-flex align-items-center">
                              <div className="col-sm-6">
                                  <div className="card">                                      
                                    <img src={require('../img/StakeType/Group.svg')} alt="Card image cap" className="card-img-top img-fluid" data-toggle="tooltip" data-placement="top" title="Group"/>                                      
                                  </div>
                              </div>
                              <div className="col-sm-6"><strong className="text-primary">34</strong><span></span></div>
                          </div>

                      </div>
                  </div>

                   <div className="col-lg-4">
                      {/* Group */}
                      <div className="card data-usage">
                          <h2 className="display h4">Group</h2>
                          <div className="row d-flex align-items-center">
                              <div className="col-sm-6">
                                  <div className="card">                                      
                                    <img src={require('../img/StakeType/Group.svg')} alt="Card image cap" className="card-img-top img-fluid" data-toggle="tooltip" data-placement="top" title="Group"/>                                      
                                  </div>
                              </div>
                              <div className="col-sm-6"><strong className="text-primary">34</strong><span></span></div>
                          </div>

                      </div>
                  </div>
 





        
            </div>
          </div>
        </section>
  
      </Fragment>
    )
  }
}
