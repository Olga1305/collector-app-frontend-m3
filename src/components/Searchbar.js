import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import searchIcon from '../assets/search.png';
import './Searchbar.css';

import catalogService from '../services/catalogSevice';

class Searchbar extends Component {
  state = {
    dolls: [],
    searched: [],
    redirect: false,
  };

  async componentDidMount() {
    try {
      const dolls = await catalogService.getAllDolls();
      this.setState({
        dolls,
      });
    } catch (error) {
      console.log(error);
    }
  }

  findDoll = query => {
    const { dolls } = this.state;
    if (query !== '') {
      const result = dolls.filter(item => {
        return (
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.character.toLowerCase().includes(query.toLowerCase()) ||
          item.subBrand.toLowerCase().includes(query.toLowerCase()) ||
          item.collectionName.toLowerCase().includes(query.toLowerCase())
        );
      });
      this.setState(
        {
          searched: result,
        },
      );
    } else {
      this.setState({
        searched: [],
      });
    }
  };

  handleChange = e => {
    this.findDoll(e.target.value);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
        redirect: true,
      });
  };

  render() {
    const { searched, redirect } = this.state;
    return (
        <>
        {redirect && <Redirect
            to={{
              pathname: "/searchresults",
              state: { searched },
            }}
          />}
         {!redirect && <div>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                className="input search-bar"
                name="search"
                placeholder="Search dolls in catalog"
                onChange={this.handleChange}
              />
              <button type="submit" value="submit">
                <img className="search-icon" src={searchIcon} alt="search" />
              </button>
            </form>
          </div>} 
      </>
    );
  }
}

export default Searchbar;
