import React from 'react';
import './InfoBoxCollection.css';

import { Link } from "react-router-dom";

const InfoBoxCollection = props => {

        return (
            <div className="InfoBoxCollection">
                <div className="my-doll-image">
                    <Link to={`/mycollection/${props.id}`}>
                       <img src={props.image} alt="doll"/>
                    </Link>
                    
                </div>
                <div className="my-doll-info">
                    <Link to={`/mycollection/${props.id}`}>
                      <h4>{props.name} - {props.character}</h4>
                    </Link>                    
                    <p>Condition: {props.state}</p>
                    <p>Complete: {props.complete}</p> 
                    <p>Purchase price: ${props.purchasePrice}</p> 
                    <button className="button">Update</button>
                    <button className="button">Delete</button>
                    
                    
                </div>   

            </div>
        )

}

export default InfoBoxCollection;