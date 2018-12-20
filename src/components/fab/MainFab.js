import React from 'react' 
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css';
 

export default function mainFab({activeBtn,delBtn,fabMenu}) {
//    console.log(addChildBtn)
const sendActive=(e)=>{
    e.preventDefault()
    activeBtn(true)      
}

const deleteBtn=()=>{    
    delBtn()
}
 
 

    

  return (
    <div>
    <div className="fab">
        <span className="fab-action-button">
            <Tooltip
                placement="left"
                overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Home</div>}
                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                 >
                 <img name="view" src={require('../../img/menu.svg')} alt='home' className='img-fluid' onClick={sendActive} />
            </Tooltip>
        </span>

            <ul className="fab-buttons">           
                <li className="fab-buttons-item">
                    <span className={fabMenu?"fab-buttons-link":"d-none"}>
                        <Tooltip
                            placement="left"
                            overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Delete</div>}
                            arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                            >
                             <img name="delete" src={require('../../img/fab-trash.svg')} alt='delete' className='img-fluid' onClick={deleteBtn}   />
                        </Tooltip> 
                    </span>
                </li>
                
            
                
               
            </ul>
    </div>
  </div>
  )

}
