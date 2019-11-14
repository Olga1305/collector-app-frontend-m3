// @flow
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './MyCollection.css';

import { Spinner } from "react-loading-io";
import userService from '../../services/userService';
import InfoBoxCollection from '../../components/InfoBoxCollection';

class MyCollection extends Component {
  state = {
    dolls: [],
    releaseValue: undefined,
    purchaseValue: undefined,
    loading: true,    
  };

  async componentDidMount() {
    try {
      const dolls = await userService.getMyCollection();
      const releaseValue = this.calculateReleasePricesSum(dolls);
      const purchaseValue = this.calculatePurchasePricesSum(dolls);
      this.setState(
        {
          dolls,
          releaseValue,
          purchaseValue,
          loading: false,
        });
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
      });
    }
  }

  calculateReleasePricesSum = (dolls) => {
    let sum = [];
    dolls.forEach(item => {
      if (item.doll.releasePrice) {
        return sum.push(item.doll.releasePrice);
      }
      return sum;
    });
    const result = sum.reduce((a, b) => { return a + b; });
    return result;
  }

  calculatePurchasePricesSum = (dolls) => {
    let sum = [];
    dolls.forEach(item => {
      if (item.purchasePrice) {
        return sum.push(item.purchasePrice);
      }
      return sum;
    });
    const result = sum.reduce((a, b) => { return a + b; });
    return result;
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
    const { dolls, releaseValue, purchaseValue, loading } = this.state;
    return (
      <div>
        {!loading && (
          <div className="MyCollection">
            <h1>My collection</h1>
            <div className="data">
              <p>Items in collection: {dolls.length}</p>
              <p>Release prices sum: ${releaseValue}</p>
              <p>Purchase prices sum: ${purchaseValue}</p>
            </div>
            
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

        {loading && <div className="loading"><Spinner color={'#5898BE'}/></div>}
      </div>
    );
  }
}

export default MyCollection;
