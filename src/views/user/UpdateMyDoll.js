import React, { Component } from 'react';
import { Spinner } from 'react-loading-io';
import './Forms.css';

import userService from '../../services/userService';

class UpdateMyDoll extends Component {
  state = {
    doll: {},
    loading: true,
  };

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    try {
      const doll = await userService.getMyDollDetail(id);
      this.setState({
        doll,
        loading: false,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
      });
    }
  }

  handleChange = e => {
    const { doll } = this.state;
    this.setState({
      doll: {
        ...doll,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { doll } = this.state;
    const {
      history: { push },
    } = this.props;
    userService
      .updateMyDoll(doll)
      .then(() => {
        push(`/mycollection/${doll._id}`);
      })
      .catch(() => {});
  };

  render() {
    const {
      doll,
      doll: { condition, kit, purchasePrice, purchaseWay },
      loading,
    } = this.state;
    return (
      <>
        {loading && (
          <div>
            <Spinner color={'#5898BE'} />
          </div>
        )}
        {!loading && (
          <div className="form-container">
            <form id="doll" onSubmit={this.handleSubmit}>
              <div className="form-header">
                <h1>Update my doll</h1>
                <div>
                  <img className="doll-icon" src={doll.doll.closeUpImage} alt="doll" />
                </div>

                <h2>
                  {doll.doll.character} {doll.doll.name}
                </h2>
              </div>
              <div className="sep"></div>
              <div className="inputs">
                <label htmlFor="condition">Condition</label>
                <select type="text" name="condition" id="condition" value={condition} onChange={this.handleChange}>
                  <option value="Perfect">Perfect</option>
                  <option value="Almost perfect">Almost perfect</option>
                  <option value="Good">Good</option>
                  <option value="With some defects">With some defects</option>
                </select>
                <br />
                <label htmlFor="kit">Kit</label>
                <select type="text" name="kit" id="kit" value={kit} onChange={this.handleChange}>
                  <option value="Complete doll">Complete doll</option>
                  <option value="Nude doll + partial outfit">Nude doll + partial outfit</option>
                  <option value="Nude doll">Nude doll</option>
                  <option value="Head only">Head only</option>
                  <option value="Outfit only">Outfit only</option>
                  <option value="Partial outfit">Partial outfit</option>
                </select>
                <br />

                <label htmlFor="purchasePrice">Purchase price</label>
                <input
                  type="number"
                  min="0"
                  name="purchasePrice"
                  id="purchasePrice"
                  value={purchasePrice || ''}
                  onChange={this.handleChange}
                />
                <br />
                <label htmlFor="purchaseWay">Purchase way</label>
                <select
                  type="text"
                  name="purchaseWay"
                  id="purchaseWay"
                  value={purchaseWay || ''}
                  onChange={this.handleChange}
                >
                  <option value="Ebay">Ebay</option>
                  <option value="W Club Exclusive">W Club Exclusive</option>
                  <option value="W Club Forum">W Club Forum</option>
                  <option value="Integrity Toys Shop">Integrity Toys Shop</option>
                  <option value="Integrity Toys Dealer">Integrity Toys Dealer</option>
                  <option value="IT Convention">IT Convention</option>
                  <option value="Other">Other</option>
                </select>
                <br />
                <input id="submit" type="submit" value="submit" />
              </div>
            </form>
          </div>
        )}
      </>
    );
  }
}

export default UpdateMyDoll;
