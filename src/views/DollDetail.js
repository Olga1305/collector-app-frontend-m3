import React, { Component } from 'react';
import catalogService from '../services/catalogSevice';


class DollDetail extends Component {

  state = {
    doll: {},
    loading: true,
  }

  async componentDidMount() {
    const { match: {params: { id }} } = this.props;
    try {
      const doll = await catalogService.getDollById(id)  
      this.setState({
        doll,
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
    console.log(doll.closeUpImage);
    return (
      <>
        {loading && <div>Loading...</div> }
        {!loading && 
        <div>
            <div>
             {doll.character} {doll.name} - {doll.subBrand}
            </div>
            <div>
              <img src={doll.closeUpImage} alt="doll"/> 
            </div>
            <div>
                <p>Mold: {doll.mold}</p>
                <p>Skin Tone: {doll.skinTone}</p>
                <p>Hair: {doll.hair}</p>
                <p>Edition Size: {doll.editionSize}</p>
                <p>Release Price: ${doll.releasePrice}</p>
              
            </div>
            


        </div> }
      </>
    );
  }
}

export default DollDetail;