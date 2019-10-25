import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import catalogService from '../services/catalogSevice';
import './Catalog.css';

import MenuBox from '../components/MenuBox';
import fashionRoylaty from '../components/img/fradele.jpg';
import nuFace from '../components/img/nufacelilith.jpg';
import poppyParker from '../components/img/poppyparker.jpg';

const brandsMenu = [
    {link: '/fashionroyalty', img: fashionRoylaty, title: 'Fashion Royalty', description: 'Aute esse nisi nulla qui sunt ad reprehenderit ad est officia incididunt.'},
    {link: '/nuface', img: nuFace, title: 'Nu Face', description: 'Reprehenderit laborum et culpa sunt consectetur amet laboris sit do proident deserunt quis.'},
    {link: '/poppyparker', img: poppyParker, title: 'Poppy Parker', description: 'Labore id aute reprehenderit eiusmod excepteur ea. Culpa ad est ex proident.'}
]

class Catalog extends Component {

  state = {
    dolls: [],
    loading: true,
  }

  async componentDidMount() {
    try {
      const dolls = await catalogService.getAllDolls(); 
      this.setState({
        dolls,
        loading: false
      }, () => console.log(dolls))
    } catch (error) {
      console.log(error);
    }
  }
  
  render() {
    const { dolls, loading } = this.state;
    return (
      <div>
          <h1>Catalog</h1>
          {brandsMenu.map((item, index) => {
                    return (
                        <Link className="menu-link" to={`${item.link}`} key={`${item.title}-${index}`}>
                            <MenuBox img={item.img} title={item.title} />
                            {/* <MenuBox img={item.img} title={item.title} description={item.description}/> */}
                        </Link>
                        )
                })}
        
        {!loading && dolls.map((doll) => {
          return (
            <div key={doll._id}>
              <Link to={`/catalog/${doll._id}`}>{doll.name}</Link>
            </div>
          )
        })}
        {loading && <div>loading...</div>}
      </div>
    );
  }
}

export default Catalog;