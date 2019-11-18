import React from 'react';

const ButtonLarge = props => {
    const { kind, ...other } = props;
    const className = kind === false ? "button-large" : "button-inactive-large";
    return <button className={className} {...other} />;
  };

export default ButtonLarge;
  