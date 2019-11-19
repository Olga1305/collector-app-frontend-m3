import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import searchIcon from '../assets/search.png';
import './Searchbar.css';

import catalogService from '../services/catalogSevice';

class Searchbar extends Component {
  state = {
    searched: [],
    query: '',
    redirect: false,
    visibleSearchbar: false,
  };

  showSearchbar = () => {
    const { visibleSearchbar } = this.state;
    this.setState({
      visibleSearchbar: !visibleSearchbar,
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { query } = this.state;
    try {
      const searched = await catalogService.getDollsByQuery(query);
      this.setState({
        searched,
        query: '',
        redirect: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { searched, query, visibleSearchbar, redirect } = this.state;
    return (
      <>
        {redirect && visibleSearchbar && (
          <>
            <Redirect
              to={{
                pathname: '/searchresults',
                state: { searched },
              }}
            />
            <div className="search mobile-search">
              <form className="search-bar visibleSearchbar" onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  name="query"
                  value={query}
                  placeholder="Search dolls in catalog"
                  onChange={this.handleChange}
                />
                <button type="submit" value="submit">
                  <img className="search-icon" src={searchIcon} alt="search" />
                </button>
              </form>
            </div>
          </>
        )}
        {redirect && !visibleSearchbar && (
          <>
            <Redirect
              to={{
                pathname: '/searchresults',
                state: { searched },
              }}
            />
            <div className="search">
              <form className="search-bar" onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  name="query"
                  value={query}
                  placeholder="Search dolls in catalog"
                  onChange={this.handleChange}
                />
                <button type="submit" value="submit">
                  <img className="search-icon" src={searchIcon} alt="search" />
                </button>
              </form>
              <img className="search-mobile" onClick={this.showSearchbar} src={searchIcon} alt="search" />
            </div>
          </>
        )}
        {!redirect && visibleSearchbar && (
          <div className="search mobile-search">
            <form className="search-bar visibleSearchbar" onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="query"
                value={query}
                placeholder="Search dolls in catalog"
                onChange={this.handleChange}
              />
              <button type="submit" value="submit">
                <img className="search-icon" src={searchIcon} alt="search" />
              </button>
            </form>
          </div>
        )}
        {!redirect && !visibleSearchbar && (
          <div className="search">
            <form className="search-bar" onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="query"
                value={query}
                placeholder="Search dolls in catalog"
                onChange={this.handleChange}
              />
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
