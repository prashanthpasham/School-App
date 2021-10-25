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
    "required":true,
    "defaultValue":"Prashanth",
    "min":2,
    "max":5
  },
  {
    "label":"Status",
    "type":"dropdown",
    "required":true,
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
    "required":true,
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
    "required":true,
    "defaultValue":["Java"],
    "options":[
      "Java",
      "Python",
      "React Js"
    ]
  },
  {
		"label": "Address",
		"type": "group",
		"fields": [{
				"label": "H.No",
				"type": "text",
				"required": true,
				"defaultValue": ""
			}, {
				"label": "State",
				"type": "dropdown",
				"required": true,
				"defaultValue": "ap",
				"options": [{
					"key": "Telangana",
					"value": "ts"
				}, {
					"key": "Andhra Pradesh",
					"value": "ap"
				}]
			},
			{
				"label": "Type of Address",
				"type": "radio",
				"required": true,
				"defaultValue": "home",
				"options": [{
					"key": "Home",
					"value": "home"
				}, {
					"key": "Office",
					"value": "office"
				}]
			},
			{
				"label": "Available Days",
				"type": "checkbox",
				"required": true,
				"defaultValue": ["WeekDays"],
				"options": [
					"WeekDays",
					"Weekend"
				]
			}
		]
	}
];
const [submittedForm,setSubmittedForm]= useState({});
const [loading,setLoading] = useState(false);
useEffect(()=>{
  let json={};
   data.forEach((field)=>{
     if(field.type==='group'){
      field.fields.forEach((grpField)=>{
         fields(grpField,json);
      });
     }else{
      fields(field,json);
     }
   });
   //alert(JSON.stringify(json));
   json['error']={};
   setSubmittedForm(json);
   setLoading(true);
},[]);
const fields = (field,json)=>{
  if(field.type==='text' || field.type==='number'){
    json[field.label]=field.defaultValue;
   }else if(field.type==='dropdown'){
     json[field.label]=field.defaultValue;
   }else if(field.type==='radio'){
    json[field.label]=field.defaultValue;
   }else if(field.type==='checkbox'){
     let options ={};
    field.options.forEach(val=>{
      let check = true;
      for(var k=0;k<field.defaultValue.length;k++){
        if(field.defaultValue[k]===val){
          check = false;
         options[val]=true;
          break;
        }
      }
     if(check){
       options[val]=false;
     }
    });
   // alert(options);
     json[field.label] = options;
   }
}
  
 const selectedValue=(label,value,field)=>{
   let errors=submittedForm.error;
   if(field.type==='checkbox'){
    if(field['required'])
    {
      var valid = false;
     for(var key in value)
     {
       if(value[key]){
        valid = true;
         break;
       }
     }
     if(!valid){
       errors[label] = label +" required!";
     }else{
      errors[label] ="";
     }
    }
   }else{
     if(field['required'] && (value==undefined || value.trim().length==0)){
      errors[label]=label+" required!";
     }else if(field.type=='text'){
      if(value.trim().length<field.min){
        errors[label]=label+" should be minimum of "+field.min+" characters!";
      }else if(value.trim().length>field.max){
        errors[label]=label+" should not exceed "+field.max+" characters!";
      }else{
        errors[label]="";
      }
     }
    }
    setSubmittedForm({...submittedForm,[label]:value,error:errors});
    //alert(JSON.stringify(errors))
  }
  const Element= (field)=>{
    //alert("element called")
    if(field.type==='label'){
      return (
        <div className="col-md-6">
         <label>{field.label}</label>
      </div>
      );
   }else if(field.type==='text' || field.type==='number'){
    return (
      <div className="col-md-6">
    <Input key={field.label} {...field} value={submittedForm[field.label]} errors={submittedForm.error} data={(l,v)=>selectedValue(l,v,field)}/>
    </div>
    );
 }else if(field.type==='dropdown'){
       return (  <div className="col-md-6">
         <Select key={field.label} {...field} value={submittedForm[field.label]} data={(l,v)=>selectedValue(l,v,field)} errors={submittedForm.error}/>
         </div>
         ); 
    }else if(field.type==='radio'){
      return (  <div className="col-md-6">
        <Radio key={field.label} {...field} value={submittedForm[field.label]} data={(l,v)=>selectedValue(l,v,field)} errors={submittedForm.error}/>
        </div>
        ); 
   }else if(field.type==='checkbox'){
    return (  <div className="col-md-6">
      <Checkbox key={field.label} {...field} value={submittedForm[field.label]} data={(l,v)=>selectedValue(l,v,field)} errors={submittedForm.error}/>
      </div>
      ); 
 }
  }
  const Form = ()=>{
    return (
    data.map((element,index)=>{
      if(element.type==='group'){
        return (
          <>
           <h3>{element.label}</h3>
         {element.fields.map((field,indx)=> {
            return  <Element key={indx} {...field}/>
            
         })
        }
        
         </>
         )
      }else{
      return ( 
      <><Element key={index} {...element}/></>
       )
      }
     })
    )
  }
  return (
    <div className="App">
     <h1>Dynamic Form Component</h1>
     <div className="container row" >
     
      {loading? <Form />:"Form Loading..."}
       {JSON.stringify(submittedForm)}
      
       </div>
    </div>
  );
}

export default memo(App);
