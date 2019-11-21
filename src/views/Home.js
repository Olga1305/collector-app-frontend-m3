import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

import home01 from '../assets/home02.png';
import doll01 from '../assets/erin01.png';
import doll02 from '../assets/adele01.png';
import doll03 from '../assets/poppy03.png';
import doll04 from '../assets/natalia01.png';

const Home = () => {
  return (
    <div className="parallax">
      <div id="group1" className="parallax__group">
        <div className="parallax__layer parallax__layer--base">
          <div className="section top">
            <div className="home-text" id="top-text">
              <h1>Organize your fashion dolls collection in few minutes!</h1>
              <h2>Have many dolls? Start now!</h2>
              <Link className="button-home" id="home-signup" to={'/signup'}>
                Sign up
              </Link>
              <Link className="button-home" to={'/login'}>
                Log in
              </Link>
            </div>
            <div id="top-img">
              <img className="img" src={doll03} alt="doll" />
            </div>
            <div className="home-img" id="manual">
              <img className="img" src={home01} alt="doll" />
            </div>
          </div>
        </div>
      </div>
      <div id="group2" className="parallax__group">
        <div className="parallax__layer parallax__layer--base">
          <div className="section">
            <div className="home-img">
              <img className="img" src={doll04} alt="doll" />
            </div>
            <div className="home-text">
              <h2>Explore the catalog</h2>
              <p>
                Getting all your dolls under control is finally easy. Just explore the catalog and add dolls to your
                collection in one click. <br />
                Track the current Ebay price of each doll directly in Doll Collector.
              </p>
              <Link className="button-home" to={'/catalog'}>
                Catalog
              </Link>
            </div>
          </div>
        </div>
        <div className="parallax__layer parallax__layer--back"></div>
      </div>

      <div id="group3" className="parallax__group">
        <div className="parallax__layer parallax__layer--fore">
          <div className="section">
            <div className="home-text">
              <h2>Create your collection in a moment</h2>
              <p>
                Keep track of what you own. Add the purchasing info and discover the value of your collection. Getting
                organized has never been so simple.
              </p>
            </div>
            <div className="home-img" id="middle-img">
              <img className="img" src={doll02} alt="doll" />
            </div>
          </div>
        </div>
        <div className="parallax__layer parallax__layer--base"></div>
      </div>

      <div id="group4" className="parallax__group">
        <div className="parallax__layer parallax__layer--back"></div>
        <div className="parallax__layer parallax__layer--base">
          <div className="section">
            <div className="home-img">
              <img className="img" src={doll01} alt="doll" />
            </div>
            <div className="home-text">
              <h2>Plan your purchases</h2>
              <p>
                May your collection keep growing! Easily list dolls you looking for and control your wishlist.
                <br />
                Go to Ebay search results directly from your wishlist.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div id="group5" className="parallax__group">
        <div className="parallax__layer parallax__layer--base">
          <div className="section" id="bottom-section">
            <div className="bottom-text">
              <h2>Join right now!</h2>
              <Link className="button-home" id="home-signup" to={'/signup'}>
                Sign up
              </Link>
              <Link className="button-home" to={'/login'}>
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
