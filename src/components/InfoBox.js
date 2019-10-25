import React from 'react';
import './InfoBox.css';

const InfoBox = props => {

        return (
            <div className="InfoBox">
                <div className="doll-image">
                    <img src={props.image} alt="doll"/>
                </div>
                <div className="doll-info">
                    <h2>{props.name}</h2>
                    {/* <h3>{props.tagline}</h3>
                    <p><span>Created by:</span> {props.contributed_by}</p>  */}
                </div>   

            </div>
        )

}

export default InfoBox;