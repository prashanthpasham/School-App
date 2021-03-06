import React,{useState} from 'react'

function Radio(props) {
    const {required,label,options,value,errors}=props;
    const [selvalue,setSelvalue] = useState(value);
    const onInputChange=(e)=>{
        setSelvalue(e);
        props.data(label,e);
        
     }
    return (
        <div className="form-group">
            <label>{label}{required?<span style={{color:'red'}}>*</span>:""}</label><br/>
          {options.map((element,index)=>{
              return (
                  <div className="form-check">
                  <input className="form-check-input" type="radio" checked={selvalue===element.value} required={required} value={element.value} 
                  onChange={(e)=>onInputChange(e.target.value)} id={index}/>
                    <label className="form-check-label" for={index}>{element.key}</label>  
                      </div>
                
              )
          })  
        }
         {errors!=undefined?<span style={{color:'red'}}>{errors[label]}</span>:""}
        </div>
    )
}

export default Radio
