import React, { Component } from 'react';
import './DollDetail.css';
import catalogService from '../services/catalogSevice';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import Icon from 'react-fa';


class DollDetail extends Component {

  state = {
    doll: {},
    loading: true,
  }

  async componentDidMount() {
    const { match: {params: { brand, id }} } = this.props;
    console.log(brand, id)
    try {
      const doll = await catalogService.getDollById(brand, id)  
      this.setState({
        doll,
        loading: false,
      }, () => console.log(doll))
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
      })
    }
  }

  render() {
    const { doll, loading } = this.state;
    const images = [];
    images.push(doll.closeUpImage);
    if(doll.image1) {
      images.push(doll.image1)
    };
    if(doll.image2) {
      images.push(doll.image2)
    };
    if(doll.image3) {
      images.push(doll.image3)
    };
    if(doll.image4) {
      images.push(doll.image4)
    };
    if(doll.accessoriesImage) {
      images.push(doll.accessoriesImage)
    };
    
    return (
      <>
        {loading && <div>Loading...</div> }
        {!loading && 
        <div>
            <div>
              <h1 className="doll-detail">{doll.character} {doll.name} - {doll.subBrand}</h1>             
            </div>
            <div>
              <Carousel className="carousel"                
                slidesPerPage={1}
                slidesPerScroll={1}
                infinite          
                offset={20}
                arrows                
              >
                {images.map((image, index) => {
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
                <button className="button-blue">+ to my collection</button>
                <button className="button-blue">+ to my wishlist</button>
              
            </div>          


        </div> }
      </>
    );
  }
}

export default DollDetail;