import React, { useState } from "react";
import { Form, Alert, Email, ConfirmPassword, Select, TextBox, Switch, FormToReqBodyFormatter, UrlAsyncFetch, FORM_RESET } from 'e-ui-react';
import StaticProfileForm from "@StaticData/profile-form.json";

const Register = ()=>{
 const [ viewScreen, setViewScreen ] = useState('REGISTER_FORM');
 const [ alertMessage, setAlertMessage ] = useState('');

 const AlertWarning = ()=>{
  return (<>
    {alertMessage?.length>0 && <Alert type="danger" show={true} body={<div>{alertMessage}</div>} />}
  </>);
 };

 const RegisterSuccess = ()=>{
    return (<div>
        <div><h4 className="bs-header"><b>Your Account created Successfully</b></h4></div>
        <div className="mtop15p mbot15p" style={{ color:'#777', fontWeight: 'bold' }}>
            Congratulations! Your account has been created successfully.<br/><br/>
            Thank you for choosing our platform. Take the next step and log in now to embark on an incredible journey.<br/><br/>
            If you encounter any issues or need assistance, during the login process or have forgotten your password, 
            our support team is ready to assist you.
        </div>
    </div>);
 };

 const Title = ()=>{
    return (<div>
        <div><h4 className="bs-header"><b>Create your Account</b></h4></div>
        <div className="mtop15p mbot15p" style={{ color:'#777', fontWeight: 'bold' }}>
            Start your journey by creating your account
        </div>
    </div>);
 };

 const SurName = ()=>{
  return (<TextBox name="surName" label="Surname" placeholder="Enter your Surname" 
   validation={{
      required:{
          value: true,
          errorMessage:"This is a Mandatory Field"
      },
      minLength:{
          value: 5,
          errorMessage:"Message should be greator than 5"
      }
   }} />);
 };

 const Name = ()=>{
  return (<div className="mtop15p">
  <TextBox name="name" label="Name" placeholder="Enter your Name" 
      validation={{
          required:{
              value: true,
              errorMessage:"This is a Mandatory Field"
          },
          minLength:{
              value: 5,
              errorMessage:"Message should be greator than 5"
          }
      }}
  />
  </div>);
 };

const Gender = ()=>{
    return (<div className="mtop15p">
     <Select name="gender" label="Gender" placeholder="Select Gender"
       options={StaticProfileForm?.gender}
       className="navbar-layout"
       width="100%"
       fontSize="12" 
       validation={{
        required:{
           value: true,
           errorMessage:"This is a Mandatory Field"
        }
       }} />
    </div>);
 };

 const RegEmail = ()=>{
    return (<div className="mtop15p">
    <Email name="email"
      validation={
         {
        email:{
            formatCheck: true,
            isEmailExist:{ 
                // If Email Already Exists, Returns 'EXIST'
                // If Email not exists, Returns 'NOT_EXIST'
                url: process.env.NEXUS_URL + "user/validate/email",
                method:"POST",
                value:"NOT_EXIST", // When Value not matches - throws Error Message
                errorMessage:"This Email was already registered. Please try to login into the Account"
            }
        }
    }
    } />
    </div>);
 };

 const RegPassword = ()=>{
    return (<div className="mtop15p">
    <ConfirmPassword name="confirmPwd" validation={{
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

 const AgreeTermsAndConditions = ()=>{
    return (<div className="mtop15p" style={{ color:'#777' }}>
        <Switch type="checkbox" id="agreeTermsAndConditions" name="agreeTermsAndConditions"
            value={[{ id:1, 
                label:"I agree to the terms and conditions. By creating an account, you agree to our terms and conditions and privacy policy.", 
                value:"1" }]} 
            validation={{
                        required:{
                            value: true,
                            errorMessage : "Please Select Terms and Conditions"
                        }
                    }} />
        
    </div>);
 };

 return (<>
    {viewScreen==='REGISTER_FORM' && (<>
        <Form name="registerForm" btnSubmit={{
            align: 'center',
            btnType:'primary',
            label:'Create your Account',
            size: 11
        }}
        onSubmit={async(form, isValidForm, setFormMode)=>{
            // Error Validation check
             setFormMode(FORM_RESET);
            if(isValidForm){  
                const reqBody = FormToReqBodyFormatter(form.registerForm);
                reqBody.userRole = 'CUSTOMER';

               console.log("reqBody", JSON.stringify(reqBody));
               await UrlAsyncFetch( process.env.NEXUS_URL + 'user/register', 
                    'POST', reqBody );
               setViewScreen('REGISTER_SUCCESS');
              console.log("isValidForm", isValidForm);
            }
        }}>
            <Title />
            <AlertWarning />
            <SurName />
            <Name />
            <Gender />
            <RegEmail />
            <RegPassword />
            <AgreeTermsAndConditions />
        </Form>
    </>)}
    {viewScreen==='REGISTER_SUCCESS' && (<>
        <RegisterSuccess />
    </>)}
 </>);
};

export default Register;