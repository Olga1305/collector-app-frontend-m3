import React from 'react';
import { Link } from 'react-router-dom';
import './Catalog.css';

import MenuBox from '../components/MenuBox';
import fashionRoylaty from '../components/img/fr02.png';
import nuFace from '../components/img/nu02.png';
import poppyParker from '../components/img/pp02.png';

const brandsMenu = [
    {link: '/fashionroyalty', img: fashionRoylaty, title: 'Fashion Royalty'},
    {link: '/nuface', img: nuFace, title: 'Nu Face'},
    {link: '/poppyparker', img: poppyParker, title: 'Poppy Parker'}
]

const Catalog = () => {
  

    return (
      <div>
          <h1>Integrity Toys Catalog</h1>
          <p>Enter in each category and add dolls to your collection or wishlist</p>
          {brandsMenu.map((item, index) => {
                    return (
                        <Link className="menu-link" to={`/catalog${item.link}`} key={`${item.title}-${index}`}>
                            <MenuBox img={item.img} title={item.title} />
                            
                        </Link>
                        )
                })}

      </div>
    );
  
}

export default Catalog;