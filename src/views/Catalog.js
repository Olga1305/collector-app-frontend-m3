import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import catalogService from '../services/catalogSevice';



class Catalog extends Component {

  state = {
    dolls: [],
    loading: true,
  }

  async componentDidMount() {
    try {
      const dolls = await catalogService.getAllDolls(); 
      this.setState({
        dolls,
        loading: false
      }, () => console.log(dolls))
    } catch (error) {
      console.log(error);
    }
  }
  
  render() {
    const { dolls, loading } = this.state;
    return (
      <div className="App">
        <h1>Catalog</h1>
        {!loading && dolls.map((doll) => {
          return (
            <div key={doll._id}>
              <Link to={`/catalog/${doll._id}`}>{doll.name}</Link>
            </div>
          )
        })}
        {loading && <div>loading...</div>}
      </div>
    );
  }
}

export default Catalog;