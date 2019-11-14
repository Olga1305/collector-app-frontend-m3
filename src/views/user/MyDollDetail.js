// @flow
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './MyDollDetail.css';
import { Link } from 'react-router-dom';
import userService from '../../services/userService';
import Carousel from 'react-elastic-carousel';


class MyDollDetail extends Component {

  state = {
    myDoll: {},
    ebay: [],
    loading: true,
    redirect: false,
  }  
  

  async componentDidMount() {
    const { match: {params: { id }} } = this.props;
    
    try {
      const myDoll = await userService.getMyDollDetail(id);

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

  handleDelete = () => {   
    const { match: {params: { id }} } = this.props; 
    userService
      .deleteMyDoll(id)
      .then(() => this.setState({ redirect: true }));
  };

  render() {
    const { myDoll, loading, redirect } = this.state;
    const { match: {params: { id }} } = this.props;
    
    return (
      <>
        {redirect && <Redirect
            to={{
              pathname: "/mycollection",
            }}
          />}
        {loading && <div>Loading...</div> }
        {!loading && 
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
                <h2>My collection doll:</h2>                
                <p>Mold: {myDoll.doll.mold}</p>
                <p>Skin Tone: {myDoll.doll.skinTone}</p>
                <p>Hair: {myDoll.doll.hair}</p>                
                <p>Condition: {myDoll.condition}</p>
                <p>Kit: {myDoll.kit}</p>
                <p>Edition Size: {myDoll.doll.editionSize}</p>
                <p>Release Price: ${myDoll.doll.releasePrice}</p>
                <p>Purchase date: {myDoll.purchaseDate}</p>
                <p>Purchase way: {myDoll.purchaseWay}</p>
                <p>Purchase Price: ${myDoll.purchasePrice}</p>
                <Link className="button" to={`/mycollection/${myDoll._id}/update`}>Update</Link> 
                <button className="button" onClick={() => this.handleDelete()}>Delete</button>
                
            </div>          


        </div> }
      </>
    );
  }
}

export default MyDollDetail;
