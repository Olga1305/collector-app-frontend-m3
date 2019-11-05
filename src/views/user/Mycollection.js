import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './Mycollection.css';

import userService from '../../services/userService';

import InfoBox from '../../components/InfoBox';

class Mycollection extends Component {
  state = {
    dolls: [],
    loading: true,
    brand: undefined,
    subBrand: undefined,
  };

  async componentDidMount() {
    try {
      const dolls = await userService.getMyCollection();
      
      this.setState(
        {
          dolls,
          loading: false,
        },
        () => console.log("my coll", dolls),
      );
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { dolls, loading } = this.state;
    return (
      <div>
        {!loading && (
          <div>
            
            {dolls.map(el => {
              return (
                <InfoBox
                  key={`${el.doll._id}`}
                  id={el.doll._id}
                  image={el.doll.closeUpImage}
                  character={el.doll.character}
                  name={el.doll.name}
                  editionSize={el.doll.editionSize}
                  mold={el.doll.mold}
                  skinTone={el.doll.skinTone}
                  releasePrice={el.doll.releasePrice}
                ></InfoBox>
              );
            })}
          </div>
        )}

        {loading && <div className="loading">Loading...</div>}
      </div>
    );
  }
}

export default Mycollection;
