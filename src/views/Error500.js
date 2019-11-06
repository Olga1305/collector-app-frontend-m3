import React from 'react';
import './Error500.css';


import errorImg from '../assets/error05.png';



const Error500 = () => {
  return (
    <div className="error500">        
        <div>
           <p>Internal Server Error</p>
        </div>  
        <div>
          <img src={errorImg} alt="error"/>
        </div> 
    </div>
  );
};

export default Error500;