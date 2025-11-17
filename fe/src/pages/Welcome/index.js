import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "e-ui-react";
import './index.css';

const Welcome = ()=>{
 const navigate = useNavigate();
 const [progress, setProgress] = useState(0);

 useEffect(() => {
  const interval = setInterval(() => {
    if(progress < 100) { setProgress((prevProgress) => prevProgress + 1); } 
    else { clearInterval(interval); 
        navigate('/App/Home');
    }
   }, 50); // Change the interval time as needed
  
   return () => clearInterval(interval);
  }, [progress]);

  return (<>
   <div class="splash-container">
    <div class="splash-content">
        <img src="./assets/logo/logo-flat.png" style={{ width: '100px', height:'auto' }}/>
        <div className="mtop15p">
          <ProgressBar type="danger" progress={progress} height="3" value="" /> 
          <div className="mtop15p"><b>Loading... {progress}%</b></div>
        </div>
    </div>
   </div>  
  </>);
};

export default Welcome;