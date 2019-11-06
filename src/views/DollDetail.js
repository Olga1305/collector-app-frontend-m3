import React, { Component } from 'react';
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

  render() {
    const { doll, loading } = this.state;
    const { match: {params: { brand, id }} } = this.props;
    
    return (
      <>
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
                <button className="button" onClick={() => userService.addMyDollToMyCollection(brand, id)}>+ to my collection</button>
                <button className="button"onClick={ () => userService.addMyDollToMyWishlist(brand, id)}>+ to my wishlist</button>
                
            </div>          


        </div> }
      </>
    );
  }
}

export default DollDetail;

// https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-NAME=FindingService&SERVICE-VERSION=1.13.0&GLOBAL-ID=EBAY-US&SECURITY-APPNAME=OlgaDoku-olgatest-PRD-fb31a1ca7-698edd80&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&itemFilter(0).name=ListingType&itemFilter(0).value(0)=FixedPrice&itemFilter(0).value(1)=StoreInventory&itemFilter(1).name=Currency&itemFilter(1).value=USD&keywords=fashion%20royalty%20adele%20makeda%20spring%20romance%20nrfb
// https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-NAME=FindingService&SERVICE-VERSION=1.13.0&GLOBAL-ID=EBAY-US&SECURITY-APPNAME=OlgaDoku-olgatest-PRD-fb31a1ca7-698edd80&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&itemFilter(0).name=ListingType&itemFilter(0).value(0)=FixedPrice&itemFilter(0).value(1)=StoreInventory&itemFilter(1).name=Currency&itemFilter(1).value=USD&keywords=fashion%20royalty%20adele%20makeda%20spring%20romance