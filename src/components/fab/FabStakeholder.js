import React from 'react' 
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css';
 

export default function Fab({FabRec,delBtn,addChild,stakehNumb,addStakeh}) {
//    console.log(addChildBtn)
const sendActive=(e)=>{
    e.preventDefault()
    FabRec(e.target.name, e.target.alt)      
}

const deleteBtn=()=>{    
    delBtn()
}

const addChildBtn=(e)=>{
    e.preventDefault()
    addChild(e.target.name)
    // console.log(e.target.name)
}

const addStakehBtn=(e)=>{
    e.preventDefault()
    addStakeh(e.target.name)
    // console.log(e.target.name)


}

 

    

  return (
    <div>
    <div className="fab">
        <span className="fab-action-button">
            <Tooltip
                placement="left"
                overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>View Details</div>}
                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                 <img name="viewStakeh" src={require('../../img/fab-content.svg')} alt='view' className='img-fluid' onClick={sendActive}    />
            </Tooltip>
        </span>

            <ul className="fab-buttons">           
                <li className="fab-buttons-item">
                    <span className="fab-buttons-link">
                        <Tooltip
                            placement="left"
                            overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Delete Stakeholder</div>}
                            arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                             <img name="delete" src={require('../../img/fab-trash.svg')} alt='delete' className='img-fluid' onClick={deleteBtn}   />
                        </Tooltip> 
                    </span>
                </li>                
            
                <li className= "fab-buttons-item">
                    <span className={stakehNumb!=="5"?"fab-buttons-link":"d-none"}>
                        <Tooltip
                            placement="left"
                            overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Add Stakeholder Child</div>}
                            arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                             <img name="addChild" src={require('../../img/addChild.svg')} alt='child' className='img-fluid' onClick={addChildBtn}  /> 
                        </Tooltip>
                    </span>
                </li>

                <li className= "fab-buttons-item">
                    <span className="fab-buttons-link">
                        <Tooltip
                            placement="left"
                            overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Add New Stakeholder</div>}
                            arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                             <img name="addStakeholder" src={require('../../img/add.svg')} alt='add' className='img-fluid' onClick={addStakehBtn}   />
                        </Tooltip> 
                    </span>
                </li>
               
            </ul>
    </div>
  </div>
  )

}
