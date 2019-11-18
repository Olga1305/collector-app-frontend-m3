import React from 'react';
import './Error404.css';


import errorImg from '../assets/error02.png';

const Error404 = () => {
  return (
    <div className="error404">
        <div>
          <img src={errorImg} alt="error"/>
        </div>
        <div>
           <p>Ooops! <br/>Page not found</p>
        </div>   
    </div>
  );
};

export default Error404;