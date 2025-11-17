import React from "react";
import { Nav } from "e-ui-react";

const Header = ({ activeId, menulinks })=>{
 return ( <nav className="navbar navbar-expand-sm">
 <div className="container-fluid">
   <a className="navbar-brand" href="#">
     <img src={process.env.PROJECT_URL+"assets/logo/logo-flat.png"} style={{ marginTop:'-15px', width: '90px', height:'auto' }}/>
   </a>
   <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
     <span className="navbar-toggler-icon"></span>
   </button>
   <div className="collapse navbar-collapse" id="collapsibleNavbar">
       <div className="me-auto">
           <Nav menulinks={menulinks} activeId={activeId} />
       </div>
       <div  className="d-flex">
       <div className="input-group" style={{ marginRight:'5px' }}>
                   <input type="text" className="form-control " placeholder="Search" />
                   <button className="btn btn-primary" type="submit">Go</button>
       </div>
       </div>
       <div  className="d-flex">
           <button className="btn btn-warning" type="button" style={{ marginRight:'5px' }}>Get my Quotataion</button>
       </div>
   </div>
 </div>
</nav>);
};

export default Header;