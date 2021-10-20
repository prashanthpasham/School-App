import logo from './logo.svg';
import './App.css';
import Input from './ui-components/Input';
import {useState,memo,useEffect} from 'react';
import Select from './ui-components/Select';
import Radio from './ui-components/Radio';
import Checkbox from './ui-components/Checkbox';

function App() {
  const data = [{
    "label":"UserName",
    "type":"text",
    "required":false,
    "defaultValue":"Prashanth"
  },
  {
    "label":"Status",
    "type":"dropdown",
    "required":false,
    "defaultValue":"active",
    "options":[
      {
        "key":"Active",
        "value":"active"
      },{
        "key":"InActive",
        "value":"inactive"
      }
    ]
  },
  {
    "label":"Gender",
    "type":"radio",
    "required":false,
    "defaultValue":"male",
    "options":[
      {
        "key":"Male",
        "value":"male"
      },{
        "key":"Female",
        "value":"female"
      }
    ]
  },
  {
    "label":"Languages",
    "type":"checkbox",
    "required":false,
    "defaultValue":["Java"],
    "options":[
      "Java",
      "Python",
      "React Js"
    ]
  }
];
const [submittedForm,setSubmittedForm]= useState({});
useEffect(()=>{
  let json={};
   data.forEach((field)=>{
     if(field.type==='text' || field.type==='number'){
      json[field.label]=field.defaultValue;
     }else if(field.type==='dropdown'){
       json[field.label]=field.defaultValue;
     }else if(field.type==='radio'){
      json[field.label]=field.defaultValue;
     }else if(field.type==='checkbox'){
       let options =[];
      field.options.forEach(val=>{
        //let check = false;
        for(var k=0;k<field.defaultValue.length;k++){
          if(field.defaultValue[k]===val){
           // check = true;
           options.push(val);
            break;
          }
        }
       // options[val]=check;
      });
       json[field.label] = options;
     }
   });
   //alert(JSON.stringify(json));
   setSubmittedForm(json);
},[]);
  
 const selectedValue=(label,value)=>{
    setSubmittedForm({...submittedForm,[label]:value});
  }
  const Element= (field)=>{
    //alert("element called")
    if(field.type==='label'){
      return (
        <div className="col-sm-12 col-md-6 col-lg-4">
         <label>{field.label}</label>
      </div>
      );
   }else if(field.type==='text' || field.type==='number'){
    return (
      <div className="col-sm-12 col-md-6 col-lg-4">
    <Input key={field.label} {...field} value={submittedForm[field.label]} data={(l,v)=>selectedValue(l,v)}/>
    </div>
    );
 }else if(field.type==='dropdown'){
       return (  <div className="col-sm-12 col-md-6 col-lg-4">
         <Select key={field.label} {...field} value={submittedForm[field.label]} data={(l,v)=>selectedValue(l,v)}/>
         </div>
         ); 
    }else if(field.type==='radio'){
      return (  <div className="col-sm-12 col-md-6 col-lg-4">
        <Radio key={field.label} {...field} value={submittedForm[field.label]} data={(l,v)=>selectedValue(l,v)}/>
        </div>
        ); 
   }else if(field.type==='checkbox'){
    return (  <div className="col-sm-12 col-md-6 col-lg-4">
      <Checkbox key={field.label} {...field} value={submittedForm[field.label]} data={(l,v)=>selectedValue(l,v)}/>
      </div>
      ); 
 }
  }
  const Form = ()=>{
    return (
    data.map((element,index)=>{
      return ( <><Element key={index} {...element}/></> )
     })
    )
  }
  return (
    <div className="App">
     <h1>Dynamic Form Component</h1>
     <div className="col-sm-12 col-md-12 col-lg-12" style={{marginLeft:'100px'}}>
       <Form />
       
       </div>
    </div>
  );
}

export default memo(App);
