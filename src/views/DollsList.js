import React, { Component } from 'react';
import './DollsList.css';

import { Link } from "react-router-dom";

import catalogService from '../services/catalogSevice';

import InfoBox from '../components/InfoBox';

class DollsList extends Component {

    state = {
        dolls: [],
        loading: true,
        brand: undefined,
      }

    // async componentDidMount() {
    //     try {
    //       const dolls = await catalogService.getAllDolls()  
    //       this.setState({
    //         dolls,
    //         loading: false
    //       })
    //     } catch (error) {
    //       console.log(error);
    //     }
    // }

    async componentDidMount() {
        console.log(this.props)
        const { match: {params: brand} } = this.props;
        // console.log(brand)
        try {
          const dolls = await catalogService.getDollsByBrand(brand)  
          this.setState({
            dolls,
            loading: false,
            brand
          })
        } catch (error) {
          console.log(error);
          this.setState({
            loading: false,
          })
        }
      }

    render() {
        const { dolls, loading, brand } = this.state;

        return (
            <div>
                
                {!loading && dolls.map((doll, index) => {
                    return (
                        <Link className="link-to-doll" to={`/catalog/${brand}/${doll._id}`} key={`${doll.name}-${index}`}>
                            <InfoBox 
                            image={doll.closeUpImage} 
                            character={doll.character} 
                            name={doll.name} 
                            mold={doll.mold} 
                            releasePrice={doll.releasePrice}/>
                        </Link>
                        )
                })}

                {loading && <div className="loading">Loading...</div>}
            </div>
        )
    }
}

export default DollsList;