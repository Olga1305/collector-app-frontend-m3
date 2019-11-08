import React from 'react';
import './InfoBoxCollection.css';

import { Link } from "react-router-dom";

const InfoBoxWishlist = props => {

        return (
            <div className="InfoBoxCollection">
                <div className="my-doll-image">
                    <Link to={`/mywishlist/${props.id}`}>
                       <img src={props.image} alt="doll"/>
                    </Link>
                    
                </div>
                <div className="my-doll-info">
                    <Link to={`/mywishlist/${props.id}`}>
                      <h4>{props.name} - {props.character}</h4>
                    </Link>                    
                    <p>Condition: {props.state}</p>
                    <p>Complete: {props.complete}</p> 
                   
                    <button className="button">Update</button>
                    <button className="button">Delete</button>
                    
                    
                </div>   

            </div>
        )

}

export default InfoBoxWishlist;