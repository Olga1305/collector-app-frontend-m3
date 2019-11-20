import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

import doll01 from '../assets/poppy01.png';
import doll02 from '../assets/poppy02.png';
import doll03 from '../assets/poppy03.png';

const Home = () => {
  return (
    <div>
      <div className="parallax">
        <div id="group1" className="parallax__group">
          <div className="parallax__layer parallax__layer--base">
            <div className="title">
              <div>
                <p>Love your stuff. Organize, Connect! </p>
              </div>
              <img className="img" src={doll01} />
            </div>
          </div>
        </div>
        <div id="group2" className="parallax__group">
          <div className="parallax__layer parallax__layer--base">
            <div className="title">
              <img className="img" src={doll02} />
              <p>2 Base Layer</p>
            </div>
          </div>
          <div className="parallax__layer parallax__layer--back"></div>
        </div>

        <div id="group3" className="parallax__group">
          <div className="parallax__layer parallax__layer--fore">
            <div className="title">
              <img className="img" src={doll03} />3 Foreground Layer
            </div>
          </div>
          <div className="parallax__layer parallax__layer--base"></div>
        </div>

        <div id="group6" className="parallax__group">
          <div className="parallax__layer parallax__layer--back"></div>
          <div className="parallax__layer parallax__layer--base">
            <div className="title">
              <img className="img" src={doll01} />6 Base Layer
            </div>
          </div>
        </div>

        <div id="group7" className="parallax__group">
          <div className="parallax__layer parallax__layer--base">
            <div cclassName="title">Base Layer</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
