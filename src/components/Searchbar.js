import React, { Component } from 'react';
import searchIcon from '../assets/search.png';

class Searchbar extends Component {
    
  handleChange = event => {
    this.props.onSearch(event.target.value);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="input search-bar"
            name="search"
            placeholder="Search doll in catalog"
            onChange={this.handleChange}
          />
          <button onSubmit={this.handleSubmit} type="submit" value="submit">
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default Searchbar;

{
  /* <img src={searchIcon} alt="search" /> */
}
