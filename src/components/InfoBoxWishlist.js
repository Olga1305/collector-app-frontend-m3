// @flow
import React from 'react';
import './InfoBoxCollection.css';
import { Link } from 'react-router-dom';

const InfoBoxWishlist = props => {

    return (
        <div className="InfoBoxCollection">
          <div className="my-doll-image">
            <Link to={`/mywishlist/${props.id}`}>
              <img src={props.image} alt="doll" />
            </Link>
          </div>
          <div className="my-doll-info">
            <Link to={`/mywishlist/${props.id}`}>
              <h4>
                {props.name} - {props.character}
              </h4>
            </Link>
            <p>Condition: {props.condition}</p>
            <p>Kit: {props.kit}</p>

            <Link className="button" to={`/mywishlist/${props.id}/update`}>
              Update
            </Link>
            <button className="button" onClick={() => props.handleDelete(props.id)}>
              Delete
            </button>
            <button className="button-large" id="wishlist-btn" onClick={() => props.fromWishlistToCollection(props.id)}>
              + to my collection
            </button>
          </div>
        </div>
    
    );

}

export default InfoBoxWishlist;
