import React, { useState } from 'react';
import { Form, Email, Icon, Colors, UrlAsyncFetch  } from 'e-ui-react';

const ForgotPwd = ({ setShowForgotPwd })=>{
 const [ viewScreen, setViewScreen ] = useState("FORGOTPWD_FORM");
 const Title = ()=>{
  return (<div>
    <div><h4 className="bs-header">
    {/*<span onClick={()=>setShowForgotPwd(false)}>
      <Icon type="FontAwesome" name="fa-arrow-left" size="10" style={{ color:"#777", paddingRight:'15px' }} />
  </span> */}
    <span style={{ paddingTop:'5px'}}><b>Have you forgotten your password?</b></span></h4>
    </div>
    <div className="mtop15p mbot15p" style={{ color:'#777', fontWeight: 'bold', lineHeight:'22px' }}>
        Enter Email Address associated with your Account. We will email you a link to reset your Password.
    </div>
  </div>);
 };

 const ForgotPwdEmail = ()=>{
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

   const GoBack = ()=>{
    return (<div align="right" className="mtop15p userAuth-linkButton" style={{ color: Colors.primary }}>
     <span className="userAuth-linkButton-span" onClick={()=>setShowForgotPwd(false)}>Go Back</span> 
    </div>);
   };

 return (<>
    <div>
      {viewScreen==='FORGOTPWD_FORM' && (
        <>
          <Title />
          <Form name="forgotPwdForm" btnSubmit={{
              btnType:'primary',
              label:'Send Reset Password Link',
              size: 11
            }} 
            onSubmit={(form, isValidForm)=>{
              // Error Validation check
              if ( isValidForm ){
                console.log("process.env.NEXUS_URL", process.env.NEXUS_URL);
                UrlAsyncFetch( process.env.NEXUS_URL + 'user/reset/password/link', 'POST', 
                  {
                    "template":"template1",
                    "to": form?.["forgotPwdForm"]?.["email"]?.value
                  } );
                setViewScreen('FORGOTPWD_EMAILSENT');
              }
            }}>
            <ForgotPwdEmail /> 
          </Form>
        </>
      )}
    {viewScreen==='FORGOTPWD_EMAILSENT' && (<>
    <div>
        <h4 className="bs-header"><span style={{ paddingTop:'5px'}}><b>Your Password Reset Request was successfully received</b></span></h4>
      </div>
      <div className="mtop15p mbot15p" style={{ color:'#777', fontWeight: 'bold', lineHeight:'22px' }}>
        An email with instructions on how to reset your password has been sent to your inbox. Please check it. 
        Thank you for choosing our platform; we're committed to assisting you promptly.
      </div>
      </>)}
    <GoBack />
    </div>
 </>);
};

export default ForgotPwd;