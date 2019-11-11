import React, { Component } from 'react';
import './InfoBox.css';

import { Link } from "react-router-dom";
import Button from './Button';
import userService from '../services/userService';

class InfoBox extends Component {

    state = {        
        inCollection: false,
        inWishlist: false,
      }

      async componentDidMount() {
        const { id } = this.props;
        
        try {          
          const inCollection = await userService.checkIfDollInCollection(id);
          const inWishlist = await userService.checkIfDollInWishlist(id);          
          this.setState({            
            inCollection,
            inWishlist,            
          });
        } catch (error) {
          console.log(error);          
        }
      }  

      addToCollection = async (id) => {
        try {
          userService.addMyDollToMyCollection(id);
          const inCollection = await userService.checkIfDollInCollection(id);
          const inWishlist = await userService.checkIfDollInWishlist(id);
          this.setState(
            { 
              inCollection,
              inWishlist,
            });
        } catch (error) {
          console.log(error);          
        }      
      }
      
      addToWishlist = async (id) => {
        try {
            userService.addMyDollToMyWishlist(id);
            const inCollection = await userService.checkIfDollInCollection(id);
            const inWishlist = await userService.checkIfDollInWishlist(id);
            this.setState(
              { 
                inCollection,
                inWishlist,
              });
          } catch (error) {
            console.log(error);          
          }      
      }

      render() {

        const { inCollection, inWishlist } = this.state;
        const { brand, id, image, name, character, editionSize, mold, skinTone, releasePrice, } = this.props;

        return (
            <div className="InfoBox">
                <div className="doll-image">
                    <Link to={`/catalog/${brand}/${id}`}>
                       <img src={image} alt="doll"/>
                    </Link>
                    
                </div>
                <div className="doll-info">
                    <Link to={`/catalog/${brand}/${id}`}>
                      <h4>{name} - {character} - LE{editionSize}</h4>
                    </Link>                    
                    <p>Mold: {mold}</p>
                    <p>Skin tone: {skinTone}</p> 
                    <p>Release price: ${releasePrice}</p> 
                    <Button kind={inCollection} disabled={inCollection} onClick={() => this.addToCollection(id)}>
                    + to my collection
                    </Button> 
                    <Button kind={inWishlist} disabled={inWishlist} onClick={() => this.addToWishlist(id)}>
                    + to my wishlist
                    </Button> 
                    
                    
                </div>   

            </div>
        )
    }    

}

export default InfoBox;