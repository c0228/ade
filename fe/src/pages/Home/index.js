import React from "react";
import Header from '@Templates/Header/index.js';
import { HeaderMenu } from '@Routes/NavbarList.js';

const Home = ()=>{
 return (<>
 <Header menulinks={HeaderMenu()} activeId="Home" />
 Home Page</>);
};

export default Home;