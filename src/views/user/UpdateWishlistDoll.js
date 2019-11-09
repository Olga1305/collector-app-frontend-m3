import React, { Component } from 'react';

import userService from '../../services/userService';

class UpdateWishlistDoll extends Component {
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
      const doll = await userService.getWishlistDollDetail(id);
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
    console.log(doll);
    userService
      .updateWishlistDoll(doll)
      .then(() => {
        push(`/mywishlist/${doll._id}`);
      })
      .catch(() => {});
  };

  
  render() {
    const {
      doll: { condition, kit },
      loading,
    } = this.state;

    return (
      <div>
        
        {loading && <div>Loading...</div>}
        {!loading && (
          <div>          
            <h1>Update my wishlist doll</h1>
            <form onSubmit={this.handleSubmit}>
            <label htmlFor="condition">Condition</label>
            <select name="condition" id="condition" value={condition} onChange={this.handleChange}>
                <option value="Perfect">Perfect</option>
                <option value="Almost perfect">Almost perfect</option>
                <option value="Good">Good</option>
                <option value="With some defects">With some defects</option>
            </select><br/>
            <label htmlFor="kit">Kit</label>
            <select name="kit" id="kit" value={kit} onChange={this.handleChange}>
                <option value="Complete doll">Complete doll</option>
                <option value="Nude doll + partial outfit">Nude doll + partial outfit</option>
                <option value="Nude doll">Nude doll</option>
                <option value="Head only">Head only</option>
                <option value="Outfit only">Outfit only</option>
                <option value="Partial outfit">Partial outfit</option>
            </select><br/>    
            <input type="submit" value="submit"/>
           </form>
          </div>        
        )}
      </div>
    );
  }
}

export default UpdateWishlistDoll;