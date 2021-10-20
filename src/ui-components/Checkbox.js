import React,{useState,useEffect} from 'react'

function Checkbox(props) {
   
    const {required,label,options}=props;
     const [selvalue,setSelvalue] = useState(props.value);
     
    const onInputChange=(e)=>{
        alert(JSON.stringify(selvalue));
        setSelvalue({...selvalue,[e]:selvalue[e]?true:false},
            ()=>{
                alert(JSON.stringify(selvalue));
                props.data(label,selvalue);
            });
        
        
     }
    return (
        <div className="form-group">
            <label >{label}</label><br/>
          {options.map((element,index)=>{
              return (
                  <div className="form-check">
                      
                  <input className="form-check-input" type="checkbox" checked={selvalue}  required={required}  
                  onClick={(e)=>onInputChange(e.target.value)} id={index} value={element}/>
                    <label className="form-check-label" htmlFor={index}>{element}</label>  
                      </div>
                
              )
          })  
        }
        </div>
    )
}

export default Checkbox
