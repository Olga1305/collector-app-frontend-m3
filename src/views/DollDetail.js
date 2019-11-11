import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './DollDetail.css';

import catalogService from '../services/catalogSevice';
import userService from '../services/userService';
import ebayService from '../services/ebayService';
import Carousel from 'react-elastic-carousel';
import Button from '../components/Button';


class DollDetail extends Component {

  state = {
    doll: {},
    ebay: [],
    loading: true,
    gotToCollection: false,
    gotToWishlist: false,
    inCollection: false,
    inWishlist: false,
  }
  
  async componentDidMount() {
    const { match: {params: { brand, id }} } = this.props;
    
    try {
      const doll = await catalogService.getDollById(brand, id);
      const inCollection = await userService.checkIfDollInCollection(id);
      const inWishlist = await userService.checkIfDollInWishlist(id);
      // const query = encodeURI(doll.ebayQueries[0]+ ' nrfb');      
      // const ebay = await ebayService.findByKeyword(`&keywords=${query}`);  
      // console.log(ebay)
      this.setState({
        doll,
        // ebay,
        inCollection,
        inWishlist,
        loading: false,
      }, () => console.log(this.state))
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

  render() {
    const { doll, loading, gotToCollection, gotToWishlist, inCollection, inWishlist } = this.state;
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
        {loading && <div>Loading...</div> }
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

export default DollDetail;



// https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-NAME=FindingService&SERVICE-VERSION=1.13.0&GLOBAL-ID=EBAY-US&SECURITY-APPNAME=OlgaDoku-olgatest-PRD-fb31a1ca7-698edd80&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&itemFilter(0).name=ListingType&itemFilter(0).value(0)=FixedPrice&itemFilter(0).value(1)=StoreInventory&itemFilter(1).name=Currency&itemFilter(1).value=USD&keywords=fashion%20royalty%20adele%20makeda%20spring%20romance%20nrfb
// https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-NAME=FindingService&SERVICE-VERSION=1.13.0&GLOBAL-ID=EBAY-US&SECURITY-APPNAME=OlgaDoku-olgatest-PRD-fb31a1ca7-698edd80&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&itemFilter(0).name=ListingType&itemFilter(0).value(0)=FixedPrice&itemFilter(0).value(1)=StoreInventory&itemFilter(1).name=Currency&itemFilter(1).value=USD&keywords=fashion%20royalty%20adele%20makeda%20spring%20romance