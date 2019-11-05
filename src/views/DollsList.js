import React, { Component } from 'react';
import './DollsList.css';

import catalogService from '../services/catalogSevice';

import InfoBox from '../components/InfoBox';

class DollsList extends Component {
  state = {
    dolls: [],
    loading: true,
    brand: undefined,
    subBrand: undefined,
  };

  async componentDidMount() {
    const {
      match: {
        params: { brand },
      },
    } = this.props;

    try {
      const dolls = await catalogService.getDollsByBrand(brand);
      let subBrand;
      if (brand === 'fashionroyalty') {
        subBrand = 'Fashion Royalty';
      } else if (brand === 'nuface') {
        subBrand = 'Nu Face';
      } else {
        subBrand = 'Poppy Parker';
      }
      this.setState({
        dolls,
        brand,
        subBrand,      
        loading: false,
      });
      
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
      });
    }
  }


  render() {
    const { brand, subBrand, dolls, loading } = this.state;
    const options = [];

    dolls.forEach((el, index) => {
      options.push(<h2 className="doll-list-h2" key={`${el.year}-${index}`}>{el.year}</h2>);
      el.yearColl.forEach(coll => {
        coll.forEach(name => {
          options.push(
            <div className="collection-name" key={`${name.collName}`}>
              <h3>{name.collName}</h3>
            </div>,
          );
          name.collection.forEach(collection => {
            collection.forEach(doll => {
              options.push(
                <InfoBox
                  key={`${doll._id}`}
                  brand={brand}
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
            });
          });
        });
      });
    });

    return (
      <>
        {!loading && (
          <div className="doll-list">
            <h1 className="doll-list-h1">{subBrand}</h1>
            {options}
          </div>
        )}

        {loading && <div className="loading">Loading...</div>}
      </>
    );
  }
}

export default DollsList;
