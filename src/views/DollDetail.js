// @flow
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './DollDetail.css';

import { Spinner } from "react-loading-io";
import { withAuth } from '../Context/AuthContext';
import catalogService from '../services/catalogSevice';
import userService from '../services/userService';
import Carousel from 'react-elastic-carousel';
import Button from '../components/Button';

class DollDetail extends Component {

  state = {
    doll: {},
    dollsOnEbay: undefined,
    avgEbayPrice: undefined,
    loading: true,
    gotToCollection: false,
    gotToWishlist: false,
    inCollection: false,
    inWishlist: false,
  }
  
  async componentDidMount() {
    const { user, match: {params: { brand, id }} } = this.props;
    let dollsOnEbay;
    let avgEbayPrice;        
    try {
      const doll = await catalogService.getDollById(brand, id);
      if (doll.ebay[0][0].paginationOutput[0].totalEntries[0] === "0") {
        dollsOnEbay = 0;
        avgEbayPrice = 0;
      } else {
        dollsOnEbay = doll.ebay[0][0].searchResult[0].item.length;
        avgEbayPrice = this.calculateAvgEbayPrice(doll);        
      }            
      if (user) {
        const inCollection = await userService.checkIfDollInCollection(id);
        const inWishlist = await userService.checkIfDollInWishlist(id);      
        this.setState({
          doll,
          dollsOnEbay,
          avgEbayPrice,
          inCollection,
          inWishlist,
          loading: false,
        })
      } else {
        this.setState({
          doll,
          dollsOnEbay,
          avgEbayPrice,
          loading: false,
        })
      }   
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
      })
    }
  }

  addToCollection = () => {   
    const { match: {params: { id }} } = this.props; 
    userService
      .addMyDollToMyCollection(id)
      .then(() => this.setState({ gotToCollection: true }));
  };

  addToWishlist = () => {   
    const { match: {params: { id }} } = this.props; 
    userService
      .addMyDollToMyWishlist(id)
      .then(() => this.setState({ gotToWishlist: true }));
  };

  calculateAvgEbayPrice = (doll) => {
    
      const sum = [];
      const quantity = doll.ebay[0][0].searchResult[0].item.length;
      doll.ebay[0][0].searchResult[0].item.forEach(item => {
        if (item.sellingStatus[0].currentPrice[0].__value__) {
          return sum.push(parseInt(item.sellingStatus[0].currentPrice[0].__value__));
        }
        return sum;      
      });
      const result = parseInt(sum.reduce((a, b) => { return a + b; })/quantity);
      return result;
    
  }

  render() {
    const { doll, dollsOnEbay, avgEbayPrice, loading, gotToCollection, gotToWishlist, inCollection, inWishlist } = this.state;
    const { match: {params: { brand, id }} } = this.props;
    
    return (
      <>
        {gotToCollection && <Redirect
            to={{
              pathname: "/mycollection",
            }}
          />}  
        {gotToWishlist && <Redirect
            to={{
              pathname: "/mywishlist",
            }}
          />}    
        {loading && <div><Spinner color={'#5898BE'}/></div> }
        {!loading && 
        <div className="doll-detail">
            <div>
              <h1>{doll.character} {doll.name} - {doll.subBrand}</h1>             
              
              <Carousel className="carousel">                
                {doll.images.map((image, index) => {
                  return (
                    <img src={image} alt="doll" key={`${image}-${index}`} />
                  )
                })}                
              </Carousel>
              
            </div>
            <div className="info">
                <p>Mold: {doll.mold}</p>
                <p>Skin Tone: {doll.skinTone}</p>
                <p>Hair: {doll.hair}</p>
                <p>Edition Size: {doll.editionSize}</p>
                <p>Release Price: ${doll.releasePrice}</p>
                <p>NRFB dolls on Ebay(USA): {dollsOnEbay}</p>
                <p>Average price on Ebay: ${avgEbayPrice}</p>
               
                <Button kind={inCollection} disabled={inCollection} onClick={() => this.addToCollection()}>
                + to my collection
                </Button> 
                <Button kind={inWishlist} disabled={inWishlist} onClick={() => this.addToWishlist()}>
                + to my wishlist
                </Button>               
                
            </div>          


        </div> }
      </>
    );
  }
}

export default withAuth(DollDetail);
