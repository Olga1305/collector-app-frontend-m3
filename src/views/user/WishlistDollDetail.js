import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Icon } from 'react-fa';
import catalogService from '../../services/catalogSevice';
import userService from '../../services/userService';
import helpers from '../../services/helpers';
import Carousel from 'react-elastic-carousel';
import { Spinner } from 'react-loading-io';
import Error404 from '../Error404';
import InfoBlock from '../../components/InfoBlock';
import EbayTable from '../../components/EbayTable';

class WishlistDollDetail extends Component {
  state = {
    myDoll: {},
    itemsOnEbay: [],
    avgEbayPrices: [],
    change: undefined,
    ebayUrls: [],
    dollsByMold: [],
    dollsBySkin: [],
    loading: true,
    redirect: false,
    validId: true,
  };

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    if (!helpers.isValidId(id)) {
      this.setState({
        validId: false,
        loading: false,
      });
    } else {
      try {
        const myDoll = await userService.getWishlistDollDetail(id);
        const dollsByMold = await catalogService.getDollsByMold(myDoll.doll.mold);
        const dollsBySkin = await catalogService.getDollsBySkin(myDoll.doll.skinTone);
        const itemsOnEbay = helpers.itemsOnEbay(myDoll.doll);
        const avgEbayPrices = helpers.calculateAvgEbayPrice(myDoll.doll);
        const ebayUrls = helpers.generateEbayUrls(myDoll.doll);
        const change = helpers.calculateChange(myDoll.doll.releasePrice, avgEbayPrices);

        this.setState({
          myDoll,
          itemsOnEbay,
          avgEbayPrices,
          change,
          ebayUrls,
          dollsByMold,
          dollsBySkin,
          loading: false,
        });
      } catch (error) {
        console.log(error);
        this.setState({
          loading: false,
        });
      }
    }
  }

  handleDelete = () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    userService.deleteWishlistDoll(id).then(() => this.setState({ redirect: true }));
  };

  fromWishlistToCollection = () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const {
      myDoll: {
        doll: { _id },
      },
    } = this.state;
    userService
      .addMyDollToMyCollection(_id)
      .then(() => userService.deleteWishlistDoll(id))
      .then(() => this.setState({ redirect: true }));
  };

  render() {
    const {
      myDoll,
      itemsOnEbay,
      avgEbayPrices,
      change,
      ebayUrls,
      dollsByMold,
      dollsBySkin,
      loading,
      redirect,
      validId,
    } = this.state;
    const {
      match: {
        params: { id },
      },
    } = this.props;

    return (
      <>
        {!validId && <Error404 />}
        {redirect && (
          <Redirect
            to={{
              pathname: '/mywishlist',
            }}
          />
        )}
        {loading && (
          <div>
            <Spinner color={'#5898BE'} />
          </div>
        )}
        {!loading && validId && (
          <div className="doll">
            <div className="doll-detail">
              <div className="carousel-wrap">
                <h1>
                  {myDoll.doll.subBrand} {myDoll.doll.year}
                  <br />
                  {myDoll.doll.character} - {myDoll.doll.name}
                </h1>
                <Carousel className="carousel">
                  {myDoll.doll.images.map((image, index) => {
                    return <img src={image} alt="doll" key={`${image}-${index}`} />;
                  })}
                </Carousel>
              </div>
              <div className="info">
                <div className="info-wish">
                  <div className="info-title-wish">
                    <h2>My wishlist doll</h2>
                    <Icon className="my-icon" name="trash" onClick={() => this.handleDelete()} />
                  </div>
                  <button className="button-large" id="btn-wish" onClick={() => this.fromWishlistToCollection()}>
                    + to my collection
                  </button>
                </div>
                <div className="info-blocks">
                  <div className="my-info">
                    <h3>Desired features:</h3>
                    <p>Condition: {myDoll.condition}</p>
                    <p>Kit: {myDoll.kit}</p>
                    <Link to={`/mywishlist/${myDoll._id}/update`}>
                      <Icon className="my-icon" name="edit" />
                    </Link>
                  </div>
                  <InfoBlock doll={myDoll.doll} dollsByMold={dollsByMold} dollsBySkin={dollsBySkin} />
                </div>
                <EbayTable
                  change={change}
                  ebayUrls={ebayUrls}
                  itemsOnEbay={itemsOnEbay}
                  avgEbayPrices={avgEbayPrices}
                />
              </div>
            </div>
            <div className="back">
              <Link className="button-profile" id="coll-btn" to="/mywishlist">
                Back to wishlist
              </Link>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default WishlistDollDetail;
