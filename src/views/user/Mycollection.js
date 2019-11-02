import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './Mycollection.css';

import InfoBox from '../../components/InfoBox';

class Mycollection extends Component {
  state = {
    dolls: [],
    loading: true,
    brand: undefined,
    subBrand: undefined,
  };

  render() {
    const { dolls, loading } = this.state;
    return (
      <div>
        {!loading && (
          <div>
            <InfoBox></InfoBox>
          </div>
        )}

        {loading && <div className="loading">Loading...</div>}
      </div>
    );
  }
}

export default Mycollection;
