import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './MyCollection.css';

import userService from '../../services/userService';

import InfoBoxCollection from '../../components/InfoBoxCollection';

class MyCollection extends Component {
  state = {
    dolls: [],
    loading: true,    
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

  handleDelete = async (id) => {
    try {
      await userService.deleteMyDoll(id);
      const dolls = await userService.getMyCollection();
      this.setState(
        {
          dolls,
        });
    } catch (error) {
      console.log(error);
    }    
  };

  render() {
    const { dolls, loading } = this.state;
    return (
      <div>
        {!loading && (
          <div className="MyCollection">
            <h1>My collection</h1>
            
            {dolls.map(el => {
              return (
                <InfoBoxCollection
                  key={`${el._id}`}
                  id={el._id}
                  image={el.doll.closeUpImage}
                  character={el.doll.character}
                  name={el.doll.name}
                  condition={el.condition}
                  kit={el.kit}
                  purchasePrice={el.purchasePrice}
                  handleDelete={this.handleDelete}
                ></InfoBoxCollection>
              );
            })}
          </div>
        )}

        {loading && <div className="loading">Loading...</div>}
      </div>
    );
  }
}

export default MyCollection;
