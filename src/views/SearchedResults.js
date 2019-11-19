import React, { Component } from 'react';
import './DollsList.css';
import { Spinner } from 'react-loading-io';
import InfoBox from '../components/InfoBox';

class SearchedResults extends Component {
  state = {
    loading: true,
  };

  async componentDidMount() {
    try {
      this.setState({
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
    const { searched } = this.props.location.state;
    const { loading } = this.state;

    return (
      <>
        {loading && (
          <div className="loading">
            <Spinner color={'#5898BE'} />
          </div>
        )}
        {!loading && (
          <div className="doll-list">
            <h1 className="doll-list-h1">Search results</h1>
            <h2>Found items: {searched.length}</h2>
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
        )}
      </>
    );
  }
}

export default SearchedResults;
