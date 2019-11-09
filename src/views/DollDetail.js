import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './DollDetail.css';
import catalogService from '../services/catalogSevice';
import userService from '../services/userService';
import ebayService from '../services/ebayService';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';


class DollDetail extends Component {

  state = {
    doll: {},
    ebay: [],
    loading: true,
    collection: false,
    wishlist: false,
  }
  
  async componentDidMount() {
    const { match: {params: { brand, id }} } = this.props;
    
    try {
      const doll = await catalogService.getDollById(brand, id);
      // const query = encodeURI(doll.ebayQueries[0]+ ' nrfb');      
      // const ebay = await ebayService.findByKeyword(`&keywords=${query}`);  
      // console.log(ebay)
      this.setState({
        doll,
        // ebay,
        loading: false,
      })
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
      .then(() => this.setState({ collection: true }));
  };

  addToWishlist = () => {   
    const { match: {params: { id }} } = this.props; 
    userService
      .addMyDollToMyWishlist(id)
      .then(() => this.setState({ wishlist: true }));
  };

  render() {
    const { doll, loading, collection, wishlist } = this.state;
    const { match: {params: { brand, id }} } = this.props;
    
    return (
      <>
        {collection && <Redirect
            to={{
              pathname: "/mycollection",
            }}
          />}  
        {wishlist && <Redirect
            to={{
              pathname: "/mywishlist",
            }}
          />}    
        {loading && <div>Loading...</div> }
        {!loading && 
        <div className="doll-detail">
            <div>
              <h1>{doll.character} {doll.name} - {doll.subBrand}</h1>             
              
              <Carousel className="carousel"                
                slidesPerPage={1}
                slidesPerScroll={1}
                infinite          
                offset={20}
                arrows                
              >
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
                <button className="button" onClick={() => this.addToCollection()}>+ to my collection</button>
                <button className="button" onClick={() => this.addToWishlist()}>+ to my wishlist</button>
                
            </div>          


        </div> }
      </>
    );
  }
}

export default DollDetail;

// https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-NAME=FindingService&SERVICE-VERSION=1.13.0&GLOBAL-ID=EBAY-US&SECURITY-APPNAME=OlgaDoku-olgatest-PRD-fb31a1ca7-698edd80&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&itemFilter(0).name=ListingType&itemFilter(0).value(0)=FixedPrice&itemFilter(0).value(1)=StoreInventory&itemFilter(1).name=Currency&itemFilter(1).value=USD&keywords=fashion%20royalty%20adele%20makeda%20spring%20romance%20nrfb
// https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-NAME=FindingService&SERVICE-VERSION=1.13.0&GLOBAL-ID=EBAY-US&SECURITY-APPNAME=OlgaDoku-olgatest-PRD-fb31a1ca7-698edd80&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&itemFilter(0).name=ListingType&itemFilter(0).value(0)=FixedPrice&itemFilter(0).value(1)=StoreInventory&itemFilter(1).name=Currency&itemFilter(1).value=USD&keywords=fashion%20royalty%20adele%20makeda%20spring%20romance