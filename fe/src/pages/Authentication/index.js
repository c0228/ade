import React, { useState } from "react";
import { ContainerFluid, Row, Col, getSubRoute } from "e-ui-react";
import Header from '@Templates/Header/index.js';
import { HeaderMenu } from '@Routes/NavbarList.js';
import Login from "./components/login/index.js";
import Register from "./components/register/index.js";
import ForgotPwd from "./components/forgotPwd/index.js";
import ChangePwd from "./components/changePwd/index.js";
import './index.css';

const Authentication = ()=>{
 const show = getSubRoute(4);
 const userInfo = getSubRoute(5);
 const [showForgotPwd, setShowForgotPwd ] = useState(false);
 return (<>
 <Header menulinks={HeaderMenu()} activeId="Authentication" />
 {show === 'Authentication' && (<>
      <ContainerFluid style={{ marginTop:'8px' }}>
      <Row>
       <Col xxl={6} xl={6} style={{ backgroundColor:'#fff', paddingTop:'2%', paddingLeft:'12%', paddingRight:'12%' }}>
          <Register />
       </Col>
       <Col xxl={6} xl={6} style={{ backgroundColor:'#fff', paddingTop:'2%', paddingLeft:'12%', paddingRight:'12%' }}>
         {showForgotPwd?<ForgotPwd setShowForgotPwd={setShowForgotPwd} />:<Login setShowForgotPwd={setShowForgotPwd} />}  
       </Col> 
      </Row>
      </ContainerFluid>
      </>
   )}
   {show === 'ChangePassword' && (<>
      <ContainerFluid style={{ marginTop:'8px' }}>
      <Row>
       <Col xxl={12} xl={12} style={{ backgroundColor:'#fff' }}>
          <ChangePwd userInfo={userInfo} />
       </Col> 
      </Row>
      </ContainerFluid>
      </>
   )}
 </>);
};

export default Authentication;