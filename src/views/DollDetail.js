// @flow
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './DollDetail.css';

import { Spinner } from 'react-loading-io';
import Carousel from 'react-elastic-carousel';
import { withAuth } from '../Context/AuthContext';
import catalogService from '../services/catalogSevice';
import userService from '../services/userService';
import helpers from '../services/helpers';
import Error404 from './Error404';
import ButtonLarge from '../components/ButtonLarge';
import EbayTable from '../components/EbayTable';

class DollDetail extends Component {
  state = {
    doll: {},
    itemsOnEbay: [],
    avgEbayPrices: [],
    change: undefined,
    ebayUrls: [],
    dollsByMold: [],
    dollsBySkin: [],
    loading: true,
    gotToCollection: false,
    gotToWishlist: false,
    inCollection: false,
    inWishlist: false,
    redirect: false,
    validId: true,
  };

  async componentDidMount() {
    const {
      user,
      match: {
        params: { brand, id },
      },
    } = this.props;
    let itemsOnEbay = [];
    let avgEbayPrices = [];
    let ebayUrls = [];
    let dollsByMold = [];
    let change;

    if (!helpers.isValidId(id)) {
      this.setState({
        validId: false,
        loading: false
      });
    } else {     
    try {
      const doll = await catalogService.getDollById(brand, id);
      itemsOnEbay = helpers.itemsOnEbay(doll);
      avgEbayPrices = helpers.calculateAvgEbayPrice(doll);
      ebayUrls = helpers.generateEbayUrls(doll);
      change = helpers.calculateChange(doll.releasePrice, avgEbayPrices);
      dollsByMold = this.filterByMold(doll.mold);

      if (user) {
        const inCollection = await userService.checkIfDollInCollection(id);
        const inWishlist = await userService.checkIfDollInWishlist(id);
        this.setState({
          doll,
          itemsOnEbay,
          avgEbayPrices,
          change,
          ebayUrls,
          dollsByMold,
          // dollsBySkin,
          inCollection,
          inWishlist,
          loading: false,
        });
      } else {
        this.setState({
          doll,
          itemsOnEbay,
          avgEbayPrices,
          change,
          ebayUrls,
          dollsByMold,
          // dollsBySkin,
          loading: false,
        });
      }
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
      });
    }
   }
  }

  addToCollection = () => {
    const {
      user, match: {
        params: { id },
      },
    } = this.props;
    if (user) {
      userService.addMyDollToMyCollection(id).then(() => this.setState({ gotToCollection: true }));
    } else {
      this.setState({
        redirect: true,
      });
    }
    
  };

  addToWishlist = () => {
    const {
      user, match: {
        params: { id },
      },
    } = this.props;
    if (user) {
      userService.addMyDollToMyWishlist(id).then(() => this.setState({ gotToWishlist: true }));
    } else {
      this.setState({
        redirect: true,
      });
    }    
  };

  filterByMold = mold => {
    const searched = catalogService.getDollsByMold(mold)
    return searched;
  }

  render() {
    const {
      doll,
      itemsOnEbay,
      avgEbayPrices,
      change,
      ebayUrls,
      dollsByMold,
      dollsBySkin,
      loading,
      gotToCollection,
      gotToWishlist,
      inCollection,
      inWishlist,
      redirect,
      validId,
    } = this.state;
    
    return (
      <>
        {!validId && (
          <Error404/>
        )}
       {redirect && (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        )}
        {gotToCollection && (
          <Redirect
            to={{
              pathname: '/mycollection',
            }}
          />
        )}
        {gotToWishlist && (
          <Redirect
            to={{
              pathname: '/mywishlist',
            }}
          />
        )}
        {loading && (
          <div>
            <Spinner color={'#5898BE'} />
          </div>
        )}
        {!loading && validId && (
          <div className="doll-detail">            
            <div className="carousel-wrap">             
            <h1>
              {doll.character} - {doll.name}<br/>{doll.subBrand} {doll.year}
            </h1>
              <Carousel className="carousel">
                {doll.images.map((image, index) => {
                  return <img src={image} alt="doll" key={`${image}-${index}`} />;
                })}
              </Carousel>
            </div>
            <div className="info">
              <h2>Catalog doll</h2>
              <ButtonLarge kind={inCollection} disabled={inCollection} onClick={() => this.addToCollection()}>
                + to my collection
              </ButtonLarge>
              <ButtonLarge kind={inWishlist} disabled={inWishlist} onClick={() => this.addToWishlist()}>
                + to my wishlist
              </ButtonLarge>
              {/* <p>Mold: <Link 
                  to={{
                  pathname: '/searchresults',
                  state: { searched: dollsByMold }
                  }} 
              >{doll.mold}</Link></p> */}
              <p>Mold: {doll.mold}</p>
              <p>Skin Tone: {doll.skinTone}</p>
              <p>Body Type: {doll.body}</p>
              <p>Hair: {doll.hair}</p>
              <p>Edition Size: {doll.editionSize}</p>
              <p className="price">Release Price: ${doll.releasePrice}</p>
              <EbayTable change={change} ebayUrls={ebayUrls} itemsOnEbay={itemsOnEbay} avgEbayPrices={avgEbayPrices} />
            </div>
          </div>
        )}
      </>
    );
  }
}

export default withAuth(DollDetail);
