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
    itemsOnEbay: [],
    avgEbayPrices: [],
    ebayUrls: [],
    dollsOnEbay: undefined,
    avgEbayPrice: undefined,
    ebayUrl: '',
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
    let ebayUrl; 
    let itemsOnEbay = [];   
    let avgEbayPrices = [];
    let ebayUrls = [];

    try {
      const doll = await catalogService.getDollById(brand, id);
      if (doll.ebay[0][0].paginationOutput[0].totalEntries[0] === "0") {
        dollsOnEbay = 0;
        avgEbayPrice = 0;
      } else {
        dollsOnEbay = doll.ebay[0][0].searchResult[0].item.length;
        avgEbayPrice = this.calculateAvgEbayPrice(doll); 
        itemsOnEbay = this.itemsOnEbay(doll);
        avgEbayPrices = this.calculateAvgEbayPriceV(doll);
        ebayUrls = this.generateEbayUrls(doll);
        console.log(doll.ebayQueries)
        console.log(itemsOnEbay) 
        console.log(avgEbayPrices)   
        console.log(ebayUrls)   
      }      
      ebayUrl = `https://www.ebay.com/sch/i.html?&_nkw=${doll.ebayQueries[1]}`      
      if (user) {
        const inCollection = await userService.checkIfDollInCollection(id);
        const inWishlist = await userService.checkIfDollInWishlist(id);      
        this.setState({
          doll,
          itemsOnEbay,
          avgEbayPrices,
          ebayUrls,
          dollsOnEbay,
          avgEbayPrice,
          ebayUrl,
          inCollection,
          inWishlist,
          loading: false,
        })
      } else {
        this.setState({
          doll,
          itemsOnEbay,
          avgEbayPrices,
          ebayUrls,
          dollsOnEbay,
          avgEbayPrice,
          ebayUrl,
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

  itemsOnEbay = (doll) => {
    const items = [];
    doll.ebay.forEach((el) => {
      items.push(el[0].searchResult[0].item.length);
      return items;
    });
    return items;
  }

  calculateAvgEbayPriceV = (doll) => {    
    const prices = [];
    doll.ebay.forEach((el) => {
      const sum = [];
      const quantity = el[0].searchResult[0].item.length;
      el[0].searchResult[0].item.forEach(item => {
        if (item.sellingStatus[0].currentPrice[0].__value__) {
          return sum.push(parseInt(item.sellingStatus[0].currentPrice[0].__value__));
        } 
          return sum.push(0);            
      });
      const result = parseInt(sum.reduce((a, b) => { return a + b; })/quantity);
      prices.push(result)
      return prices;
    })
    return prices;        
  }
  
  generateEbayUrls = (doll) => {
    const urls = [];
    doll.ebayQueries.forEach((el) => {
      const ebayUrl = `https://www.ebay.com/sch/i.html?&_nkw=${encodeURI(el)}`
      urls.push(ebayUrl);
      return urls;
    });
    return urls;    
  }

  render() {
    const { doll, itemsOnEbay, avgEbayPrices, ebayUrls, dollsOnEbay, avgEbayPrice, ebayUrl, loading, gotToCollection, gotToWishlist, inCollection, inWishlist } = this.state;
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
               
                <Button kind={inCollection} disabled={inCollection} onClick={() => this.addToCollection()}>
                + to my collection
                </Button> 
                <Button kind={inWishlist} disabled={inWishlist} onClick={() => this.addToWishlist()}>
                + to my wishlist
                </Button>   
                <table id="t01">
                  <tbody>
                    
                  <tr>
                    <th>Ebay(USA)</th>
                    <th>Items</th> 
                    <th>Avg. price</th>
                    <th>Link</th>
                  </tr>
                  <tr>
                    <td>NRFB</td>
                    <td>{itemsOnEbay[0]}</td>
                    <td>${avgEbayPrices[0]}</td>
                    <td><a className="button-ebay" target="_blank" href={ebayUrls[1]}>See on Ebay</a></td>
                  </tr>
                  <tr>
                    <td>Nude doll</td>
                    <td>{itemsOnEbay[1]}</td>
                    <td>${avgEbayPrices[1]}</td>
                    <td><a className="button-ebay" target="_blank" href={ebayUrls[2]}>See on Ebay</a></td>
                  </tr>
                  <tr>
                    <td>Head only</td>
                    <td>{itemsOnEbay[2]}</td>
                    <td>${avgEbayPrices[2]}</td>
                    <td><a className="button-ebay" target="_blank" href={ebayUrls[3]}>See on Ebay</a></td>
                  </tr>
                  <tr>
                    <td>Outfit only</td>
                    <td>{itemsOnEbay[3]}</td>
                    <td>${avgEbayPrices[3]}</td>
                    <td><a className="button-ebay" target="_blank" href={ebayUrls[4]}>See on Ebay</a></td>
                  </tr>

                  </tbody>
                </table>            
                
            </div>          


        </div> }
      </>
    );
  }
}

export default withAuth(DollDetail);
