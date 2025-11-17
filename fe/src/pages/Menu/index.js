import React from "react";
import Header from '@Templates/Header/index.js';
import { HeaderMenu } from '@Routes/NavbarList.js';

const Menu = ()=>{
 return (<>
 <Header menulinks={HeaderMenu()} activeId="Menu" />
 Menu Page
 </>);
};

export default Menu;