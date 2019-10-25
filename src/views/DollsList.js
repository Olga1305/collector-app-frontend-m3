import React, { Component } from 'react';
import './DollsList.css';

import { Link } from "react-router-dom";

import catalogService from '../services/catalogSevice';

import InfoBox from '../components/InfoBox';

class DollsList extends Component {

    state = {
        dolls: [],
        loading: true,
      }

    async componentDidMount() {
        try {
          const dolls = await catalogService.getAllDolls()  
          this.setState({
            dolls,
            loading: false
          })
        } catch (error) {
          console.log(error);
        }
    }



    render() {
        const { dolls, loading } = this.state;
        return (
            <div>
                
                {!loading && dolls.map((doll, index) => {
                    return (
                        <Link className="link-to-doll" to={`/catalog/${doll._id}`} key={`${doll.name}-${index}`}>
                            <InfoBox image={doll.closeUpImage} name={doll.name} />
                        </Link>
                        )
                })}

                {loading && <div className="loading">Loading...</div>}
            </div>
        )
    }
}

export default DollsList;