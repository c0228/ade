import React, { useState } from "react";
import { Form, Alert, Email, Password, FormToReqBodyFormatter, UrlAsyncFetch, Colors  } from 'e-ui-react';
import { useAuth } from "@Provider/AuthProvider.js";

const Login = ({ setShowForgotPwd })=>{
 const [ alertMessage, setAlertMessage ] = useState('');

 const AlertWarning = ()=>{
  return (<>
    {alertMessage?.length>0 && <Alert type="danger" show={true} body={<div>{alertMessage}</div>} />}
  </>);
 };

 const Title = ()=>{
  return (<div>
        <div><h4 className="bs-header"><b>Login to your Account</b></h4></div>
        <div className="mtop15p mbot15p" style={{ color:'#777', fontWeight: 'bold' }}>
            Welcome back! Please login to your Account
        </div>
    </div>);
 };

 const LoginEmail = ()=>{
  console.log("process.env.NEXUS_URL", process.env.NEXUS_URL);
  return (<Email name="email" validation={{
    email:{
        formatCheck: true,
        isEmailExist:{ 
            // If Email Already Exists, Returns 'EXIST'
            // If Email not exists, Returns 'NOT_EXIST'
            url: process.env.NEXUS_URL + "user/validate/email",
            method:"POST",
            value:"EXIST", // When Value not matches - throws Error Message
            errorMessage:"This Email is not registered. Please create your Account."
        }
    }
  }} />);
 };

 const LoginPwd = ()=>{
  return (<div className="mtop15p">
    <Password type="password" label="Account Password" name="accPwd" 
        placeholder="Enter Account Password" 
        validation={{
        required:{
            value: true,
            errorMessage:"This is a Mandatory Field"
        },
        minLength:{
            value: 8,
            errorMessage:"Password should be greator than 8"
        },
        maxLength:{
            value: 16,
            errorMessage:"Message should be lessthan 16"
        },
        passwordContains:["Lowercase","Uppercase","Number", "Symbol"]
        }} />
  </div>);
 };

 const ForgotPwd = ()=>{
  return (<div align="right" className="mtop15p userAuth-linkButton" style={{ color: Colors.primary }}>
   <span className="userAuth-linkButton-span" onClick={()=>setShowForgotPwd(true)}>Forgot Password?</span> 
  </div>);
 };

 const { login } = useAuth();

 return (<>
    <Title />  
    <Form name="loginForm" btnSubmit={{
        align: 'right',
        btnType:'primary',
        label:'Login to your Account',
        size: 11
    }} 
    onSubmit={async(form, isValidForm, setFormMode)=>{
        if(isValidForm){  
            // Error Validation check
            const response = await UrlAsyncFetch( process.env.NEXUS_URL + 'user/login', 
                'POST', FormToReqBodyFormatter(form.loginForm) );
            console.log("logicResposne", response);
            if(response?.data?.length>0){
                // Add Hour Expiry Timeout
                    let currentDate = new Date();
                    currentDate.setHours(currentDate.getHours() + 1);
                // Add to Session

                    /*
                    sessionStorage.setItem("USER_LOGIN", JSON.stringify({
                        expire: currentDate,
                        data: JSON.stringify(response)
                    }));
                    */
                    login({
                        expire: currentDate,
                        data: JSON.stringify(response?.data?.[0])
                    });

                    // console.log("Stored in sessionStorage:", sessionStorage.getItem("USER_LOGIN"));
                    window.location.href=process.env.PROJECT_URL+'Customer/MyDashboard';
            } else {
                setAlertMessage("We recognized the Account Password was not matched with associated Email Address. Please verify and try again.");
            }
            
        }
    }}>
        <AlertWarning />
        <LoginEmail />     
        <LoginPwd />
        <ForgotPwd />
    </Form>
 </>);
};

export default Login;