import React from 'react'

function Select(props) {
    const {required,label,options,value,errors}=props;
    
    const onInputChange=(e)=>{
        props.data(label,e);
        
     }
    return (
        <div className="form-group">
          <label>{label}{required?<span style={{color:'red'}}>*</span>:""}</label><br/>
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
        {errors!=undefined?<span style={{color:'red'}}>{errors[label]}</span>:""} 
        </div>
    )
}

export default Select
