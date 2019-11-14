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
    visibleSearchbar: false,
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

  showSearchbar = () => {
    const { visibleSearchbar } = this.state;
    this.setState({
        visibleSearchbar: !visibleSearchbar,
    });
  };

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
      this.setState({
        searched: result,
      });
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
    const { searched, visibleSearchbar, redirect } = this.state;
    return (
      <>
        {redirect && (
          <Redirect
            to={{
              pathname: '/searchresults',
              state: { searched },
            }}
          />
        )}
        {!redirect && visibleSearchbar && (
            <div className="search mobile-search">            
            <form className="search-bar visibleSearchbar" onSubmit={this.handleSubmit}>
              <input type="text" name="search" placeholder="Search dolls in catalog" onChange={this.handleChange} />
              <button type="submit" value="submit">
                <img className="search-icon" src={searchIcon} alt="search" />
              </button>
            </form>    
          </div>
        )}
        {!redirect && !visibleSearchbar &&(
          <div className="search">            
            <form className="search-bar" onSubmit={this.handleSubmit}>
              <input type="text" name="search" placeholder="Search dolls in catalog" onChange={this.handleChange} />
              <button type="submit" value="submit">
                <img className="search-icon" src={searchIcon} alt="search" />
              </button>
            </form>
            <img className="search-mobile" onClick={this.showSearchbar} src={searchIcon} alt="search" />
          </div>
        )}
      </>
    );
  }
}

export default Searchbar;
