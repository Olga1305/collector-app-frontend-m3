// @flow
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
                    <p>Condition: {props.condition}</p>
                    <p>Kit: {props.kit}</p> 
                    <p>Purchase price: ${props.purchasePrice}</p> 
                    <Link className="button" to={`/mycollection/${props.id}/update`}>
                     Update
                    </Link>
                    <button className="button" onClick={() => props.handleDelete(props.id)}>Delete</button>
                    
                    
                </div>   

            </div>
        )

}

export default InfoBoxCollection;