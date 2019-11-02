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
            {dolls}
            {/* {dolls.map(doll => {
              return (
                <InfoBox
                  key={`${doll._id}`}
                  id={doll._id}
                  image={doll.closeUpImage}
                  character={doll.character}
                  name={doll.name}
                  editionSize={doll.editionSize}
                  mold={doll.mold}
                  skinTone={doll.skinTone}
                  releasePrice={doll.releasePrice}
                ></InfoBox>
              );
            })} */}
          </div>
        )}

        {loading && <div className="loading">Loading...</div>}
      </div>
    );
  }
}

export default Mycollection;
