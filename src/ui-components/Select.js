import React from 'react'

function Select(props) {
    const {required,label,options,value}=props;
    
    const onInputChange=(e)=>{
        props.data(label,e);
        
     }
    return (
        <div className="form-group">
          <label>{label}</label>
          <select className="form-select" key={label} onChange={(e)=>onInputChange(e.target.value)}
           required={required} value={value} >
              {
                  options.map((item,index)=>{
                      return (
                      <option key={index} value={item.value}>{item.key}</option>
                      )
                  })
              }
        </select>   
        </div>
    )
}

export default Select
