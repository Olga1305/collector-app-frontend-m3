// @flow
import React, { Component } from 'react';
import './DollsList.css';

import InfoBox from '../components/InfoBox';

class SearchedResults extends Component {
  render() {
    const { searched } = this.props.location.state;

    return (
      <div className="doll-list">
        <h1 className="doll-list-h1">Search results</h1>
        {searched.map(doll => {
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
        })}
      </div>
    );
  }
}

export default SearchedResults;
