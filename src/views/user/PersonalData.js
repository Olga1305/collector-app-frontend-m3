import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../Context/AuthContext';
import userService from '../../services/userService';

import './Profile.css';
import bronze from '../../assets/bronze.png';
import silver from '../../assets/silver.png';
import gold from '../../assets/gold.png';
import diamond from '../../assets/diamond.png';
import royalty from '../../assets/crown.png';
import star from '../../assets/star.png';
import bronzeBw from '../../assets/bronze_bw01.png';
import silverBw from '../../assets/silver_bw01.png';
import goldBw from '../../assets/gold_bw01.png';
import diamondBw from '../../assets/diamond_bw01.png';
import royaltyBw from '../../assets/crown_bw01.png';
import starBw from '../../assets/star_bw01.png';

const levels = [
  { id: 1, name: 'Bronze (0 - 10 dolls)', image: bronze, bwImg: bronzeBw },
  { id: 2, name: 'Silver (11 - 30 dolls)', image: silver, bwImg: silverBw },
  { id: 3, name: 'Gold (31 - 60 dolls)', image: gold, bwImg: goldBw },
  { id: 4, name: 'Diamond (61 - 100 dolls)', image: diamond, bwImg: diamondBw },
  { id: 5, name: 'Royalty (101 - 150 dolls)', image: royalty, bwImg: royaltyBw },
  { id: 6, name: 'Star (150+ dolls)', image: star, bwImg: starBw },
];

class PersonalData extends Component {
  state = {
    level: undefined,
    avatar: undefined,
    avatars: [],
    loading: true,
  };

  async componentDidMount() {
    try {
      const dolls = await userService.getMyCollection();
      const level = this.detectLevel(dolls.length);
      const avatars = this.avatarsArr(level.id);
      console.log(avatars)
      this.setState({
        level: level.name,
        avatar: level.image,
        avatars,
        loading: false,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
      });
    }
  }

  detectLevel = num => {
    let level;
    if (num < 11) {
      level = levels[0];
      return level;
    }
    if (num > 10 && num < 31) {
      level = levels[1];
      return level;
    }
    if (num > 30 && num < 61) {
      level = levels[2];
      return level;
    }
    if (num > 60 && num < 101) {
      level = levels[3];
      return level;
    }
    if (num > 100 && num < 151) {
      level = levels[4];
      return level;
    }
    if (num > 150) {
      level = levels[5];
      return level;
    }
  };

  avatarsArr = level => {
    let options = [];
    levels.forEach(item => {
      if (item.id <= level) {
        options.push(item.image);
      }
      if (item.id > level) {
        options.push(item.bwImg);
      }
      return options;
    });
    return options;
  };

  render() {
    const { user } = this.props;
    const { level, avatar, avatars, loading } = this.state;

    return (
      <>
        {loading && <div className="loading">Loading...</div>}
        {!loading && (
          <div className="profile">
            <h1>Personal data</h1>
            <div className="avatar">
              <img src={avatar} alt="avatar" />
            </div>
            <p>Level: {level}</p>
            <div className="ltl-avatars">
            {avatars.map((el, index) => {
              return (
                <div className="ltl-avtr" key={`${index}`}>
                  <img src={el} alt="avatar" />
                </div>
              );
            })}

            </div>
            

            <div className="profile-btns">
              

              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <Link className="button-profile" to="/profile">
                Update data
              </Link>
              <br />
              <Link className="button-profile" to="/profile">
                Back to profile
              </Link>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default withAuth(PersonalData);
