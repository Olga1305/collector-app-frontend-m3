import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class InfoBlock extends Component {
  state = {
    dollsByMold: [],
    redirect: false,
    visibleSearchbar: false,
  };

  render() {
    const { doll, dollsByMold, dollsBySkin } = this.props;

    return (
      <div>
        <p>
          Mold:{' '}
          <Link className="filter-link"
            to={{
              pathname: '/searchresults',
              state: { searched: dollsByMold },
            }}
          >
            {doll.mold}
          </Link>
        </p>
        <p>
          Skin Tone:{' '}
          <Link className="filter-link"
            to={{
              pathname: '/searchresults',
              state: { searched: dollsBySkin },
            }}
          >
            {doll.skinTone}
          </Link>
        </p>
        <p>Body Type: {doll.body}</p>
        <p>Hair: {doll.hair}</p>
        <p>Edition Size: {doll.editionSize}</p>
        <p className="price">Release Price: ${doll.releasePrice}</p>
      </div>
    );
  }
}

export default InfoBlock;
