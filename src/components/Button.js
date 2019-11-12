// @flow
import React from 'react';

const Button = props => {
    const { kind, ...other } = props;
    const className = kind === false ? "button" : "button-inactive";
    return <button className={className} {...other} />;
  };

export default Button;
  
