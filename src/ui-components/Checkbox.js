import React,{useState,useEffect} from 'react'

function Checkbox(props) {
   
    const {required,label,options,errors}=props;
     const [selvalue,setSelvalue] = useState(props.value);
    
    const onInputChange=(e)=>{
     //   alert(JSON.stringify(selvalue));
        selvalue[e.name]=e.checked;
        setSelvalue({...selvalue});
       // alert(JSON.stringify(selvalue))
            props.data(label,selvalue);
        
        
     }
    return (
        <div className="form-group">
             <label>{label}{required?<span style={{color:'red'}}>*</span>:""}</label><br/>
          {options.map((element,index)=>{
              return (
                  <div className="form-check">
                      
                  <input className="form-check-input" name={element} type="checkbox"  required={required}  
                  onChange={(e)=>onInputChange(e.target)} id={index} checked={selvalue[element]}/>
                    <label className="form-check-label" htmlFor={index}>{element}</label>  
                      </div>
                
              )
          })  
        }
        {errors!=undefined?<span style={{color:'red'}}>{errors[label]}</span>:""}
        </div>
    )
}

export default Checkbox
