import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import catalogService from '../services/catalogSevice';
import './Catalog.css';

import MenuBox from '../components/MenuBox';
import fashionRoylaty from '../components/img/fradele.jpg';
import nuFace from '../components/img/nufaceerin.jpg';
import poppyParker from '../components/img/poppyparker.jpg';

const brandsMenu = [
    {link: '/fashionroyalty', img: fashionRoylaty, title: 'Fashion Royalty'},
    {link: '/nuface', img: nuFace, title: 'Nu Face'},
    {link: '/poppyparker', img: poppyParker, title: 'Poppy Parker'}
]

class Catalog extends Component {

//   state = {
//     dolls: [],
//     loading: true,
//   }

//   async componentDidMount() {
//     try {
//       const dolls = await catalogService.getAllDolls(); 
//       this.setState({
//         dolls,
//         loading: false
//       })
//     } catch (error) {
//       console.log(error);
//     }
//   }
  
  render() {
    // const { dolls, loading } = this.state;
    return (
      <div>
          <h1>Integrity Toys Catalog</h1>
          {brandsMenu.map((item, index) => {
                    return (
                        <Link className="menu-link" to={`/catalog${item.link}`} key={`${item.title}-${index}`}>
                            <MenuBox img={item.img} title={item.title} />
                            {/* <MenuBox img={item.img} title={item.title} description={item.description}/> */}
                        </Link>
                        )
                })}
{/*         
        {!loading && dolls.map((doll) => {
          return (
            <div key={doll._id}>
              <Link to={`/catalog/${doll._id}`}>{doll.name}</Link>
            </div>
          )
        })}
        {loading && <div>loading...</div>} */}
      </div>
    );
  }
}

export default Catalog;