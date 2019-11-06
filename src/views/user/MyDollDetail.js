import React, { Component } from 'react';
import './MyDollDetail.css';
import catalogService from '../../services/catalogSevice';
import userService from '../../services/userService';
import ebayService from '../../services/ebayService';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';


class MyDollDetail extends Component {

  state = {
    myDoll: {},
    ebay: [],
    loading: true,
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

  render() {
    const { myDoll, loading } = this.state;
    const { match: {params: { id }} } = this.props;
    
    return (
      <>
        {loading && <div>Loading...</div> }
        {!loading && 
        <div className="doll-detail">
            <div>
              
              <h1>{myDoll.doll.character} {myDoll.doll.name} - {myDoll.doll.subBrand}</h1>             
              
              <Carousel className="carousel"                
                slidesPerPage={1}
                slidesPerScroll={1}
                infinite          
                offset={20}
                arrows                
              >
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
                <p>Condition: {myDoll.state}</p>
                <p>Complete: {myDoll.complete}</p>
                <p>Edition Size: {myDoll.doll.editionSize}</p>
                <p>Release Price: ${myDoll.doll.releasePrice}</p>
                <p>Purchase date: {myDoll.purchaseDate}</p>
                <p>Purchase way: {myDoll.purchaseWay}</p>
                <p>Purchase Price: ${myDoll.purchasePrice}</p>
                <button className="button" >Update</button>
                <button className="button">Delete</button>
                
            </div>          


        </div> }
      </>
    );
  }
}

export default MyDollDetail;