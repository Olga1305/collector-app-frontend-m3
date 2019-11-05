import React from 'react';
import { Link } from 'react-router-dom';
import './Catalog.css';

import MenuBox from '../components/MenuBox';
import fashionRoylaty from '../assets/fr03.png';
import nuFace from '../assets/nu03.png';
import poppyParker from '../assets/pp03.png';

const brandsMenu = [
  { link: 'fashionroyalty', img: fashionRoylaty, title: 'Fashion Royalty' },
  { link: 'nuface', img: nuFace, title: 'Nu Face' },
  { link: 'poppyparker', img: poppyParker, title: 'Poppy Parker' },
];

const Catalog = () => {
  return (
    <div>
      <h1>Integrity Toys Catalog</h1>
      <h2 className="cta">Enter in each category and add dolls to your collection or wishlist</h2>
      {brandsMenu.map((item, index) => {
        return (
          <Link className="menu-link" to={`/catalog/${item.link}`} key={`${item.title}-${index}`}>
            <MenuBox img={item.img} title={item.title} />
          </Link>
        );
      })}
    </div>
  );
};

export default Catalog;
