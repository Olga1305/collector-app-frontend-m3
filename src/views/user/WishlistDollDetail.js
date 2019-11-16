// @flow
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './MyDollDetail.css';
import { Link } from 'react-router-dom';
import userService from '../../services/userService';
import helpers from '../../services/helpers';
import Carousel from 'react-elastic-carousel';
import Error404 from '../Error404';

class WishlistDollDetail extends Component {

  state = {
    myDoll: {},
    ebay: [],
    loading: true,
    redirect: false,
    validId: true,
  }    

  async componentDidMount() {
    const { match: {params: { id }} } = this.props;
    if (!helpers.isValidId(id)) {
      this.setState({
        validId: false,
        loading: false
      });
    } else {  
    try {
      const myDoll = await userService.getWishlistDollDetail(id);

      this.setState({
        myDoll,
        loading: false,
      })
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
      })
    }
   }
  }

  handleDelete = () => {   
    const { match: {params: { id }} } = this.props; 
    userService
      .deleteWishlistDoll(id)
      .then(() => this.setState({ redirect: true }));
  };

  fromWishlistToCollection = () => {
    const { match: { params: { id }} } = this.props;
    const { myDoll: { doll: { _id }} } = this.state;
    userService
      .addMyDollToMyCollection(_id)      
      .then(() => userService.deleteWishlistDoll(id))
      .then(() => this.setState({ redirect: true }));
  }


  render() {
    const { myDoll, loading, redirect, validId } = this.state;
    const { match: {params: { id }} } = this.props;
    
    return (
      <>        
        {!validId && (
          <Error404/>
        )}
        {redirect && <Redirect
            to={{
              pathname: "/mywishlist",
            }}
          />}
        {loading && <div>Loading...</div> }
        {!loading && validId &&
        <div className="doll-detail">
            <div>
              
              <h1>{myDoll.doll.character} {myDoll.doll.name} - {myDoll.doll.subBrand}</h1>             
              
              <Carousel className="carousel">
                {myDoll.doll.images.map((image, index) => {
                  return (
                    <img src={image} alt="doll" key={`${image}-${index}`} />
                  )
                })}                
              </Carousel>
              
            </div>
            <div className="info">
                <h2>My wishlist doll:</h2>                
                <p>Mold: {myDoll.doll.mold}</p>
                <p>Skin Tone: {myDoll.doll.skinTone}</p>
                <p>Hair: {myDoll.doll.hair}</p>                
                <p>Condition: {myDoll.condition}</p>
                <p>Kit: {myDoll.kit}</p>
                <p>Edition Size: {myDoll.doll.editionSize}</p>
                <p>Release Price: ${myDoll.doll.releasePrice}</p>
                <Link className="button-large" to={`/mywishlist/${myDoll._id}/update`}>Update</Link>
                <button className="button-large" onClick={() => {if (window.confirm('Are you sure you wish to delete this item?')) this.handleDelete() } }>Delete</button>
                <button className="button-large" id="wishlist-btn" onClick={() => this.fromWishlistToCollection()}>
                  + to my collection
                </button>
            </div>          


        </div> }
      </>
    );
  }
}

export default WishlistDollDetail;