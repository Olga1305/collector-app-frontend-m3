import React, { Component } from 'react';

class InfoBlock extends Component {
  render() {
    const { doll } = this.props;

    return (
      <div>
        <p>Mold: {doll.mold}</p>
        <p>Skin Tone: {doll.skinTone}</p>
        <p>Body Type: {doll.body}</p>
        <p>Hair: {doll.hair}</p>
        <p>Edition Size: {doll.editionSize}</p>
        <p className="price">Release Price: ${doll.releasePrice}</p>
      </div>
    );
  }
}

export default InfoBlock;
