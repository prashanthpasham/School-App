import React,{useState} from 'react';

function Input(props) {
    const {readonly,hideonly,type,required,min,max,label,value,errors}=props;
    const [selvalue,setSelvalue]= useState(value);
    const onInputChange=(e)=>{
       setSelvalue(e);
    }
    return (
        <div className="form-group">
        <label>{label}{required?<span style={{color:'red'}}>*</span>:""}</label>
         <input className="form-control" key={label} type={type} value={selvalue} readOnly={readonly} required={required} hidden={hideonly} min={min} max={max}
          onChange={(e)=>onInputChange(e.target.value)} onMouseLeave={()=>props.data(label,selvalue)}/>   
        {errors!=undefined?<span style={{color:'red'}}>{errors[label]}</span>:""}
        </div> 
    )
}
Input.defaultProps={
    readonly:false,
    hideonly:false,
    required:false,
    type:'text',
    min:0,
    max:99999
};
export default Input
