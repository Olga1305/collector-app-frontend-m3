import React, { Component } from 'react';
import './MyWishlist.css';
import { Spinner } from "react-loading-io";
import userService from '../../services/userService';
import InfoBoxWishlist from '../../components/InfoBoxWishlist';

class MyWishlist extends Component {
  state = {
    dolls: [],
    loading: true, 
  };

  async componentDidMount() {
    try {
      const dolls = await userService.getMyWishlist();      
      this.setState(
        {
          dolls,
          loading: false,
        });
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
      });
    }
  }

  handleDelete = async (id) => {
    try {
      await userService.deleteWishlistDoll(id);
      const dolls = await userService.getMyWishlist();
      this.setState(
        {
          dolls,
        });
    } catch (error) {
      console.log(error);
    }    
  };

  fromWishlistToCollection = async (id) => {
    try {
      const myDoll = await userService.getWishlistDollDetail(id);
      const dollId = myDoll.doll._id;
      userService.addMyDollToMyCollection(dollId);
      await userService.deleteWishlistDoll(id);
      const dolls = await userService.getMyWishlist();
      this.setState(
        {
          dolls,
        });
    } catch (error) {
      console.log(error);
    }    
  }

  render() {
    const { dolls, loading } = this.state;
    return (
      <div>
        {!loading && (
          <div className="MyCollection">
            <h1>My wishlist</h1>
            
            {dolls.map(el => {
              return (
                <InfoBoxWishlist
                  key={`${el._id}`}
                  id={el._id}
                  image={el.doll.closeUpImage}
                  character={el.doll.character}
                  name={el.doll.name}
                  condition={el.condition}
                  kit={el.kit}    
                  handleDelete={this.handleDelete}  
                  fromWishlistToCollection={this.fromWishlistToCollection}            
                ></InfoBoxWishlist>
              );
            })}
          </div>
        )}

        {loading && <div className="loading"><Spinner color={'#5898BE'}/></div>}
      </div>
    );
  }
}

export default MyWishlist;
