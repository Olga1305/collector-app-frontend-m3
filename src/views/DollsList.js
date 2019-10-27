import React, { Component } from 'react';
import './DollsList.css';

import { Link } from "react-router-dom";

import catalogService from '../services/catalogSevice';

import InfoBox from '../components/InfoBox';

class DollsList extends Component {

    state = {
        dolls: [],
        dolls2019: [],
        dolls2018: [],
        loading: true,
        brand: undefined,
      }


    async componentDidMount() {
        // console.log(this.props)
        const { match: {params: brand} } = this.props;      
        try {
          const dolls = await catalogService.getDollsByBrand(brand);  
          this.setState({
            dolls,
            brand
          })
          try {
            // console.log(dolls)
            const dolls2019 = this.findDollsByYear(2019);
            const dolls2018 = this.findDollsByYear(2018);
            console.log(dolls2019)
            this.setState({
              dolls2019,
              dolls2018,
              loading: false,
            })
          }
          catch (ex) {
            console.log(ex);
            this.setState({
              loading: false,
            })
            throw ex;
          } 
        } 
        catch (error) {
          console.log(error);
          this.setState({
            loading: false,
          })
        }
    }    

    findDollsByYear = (year) => {
      const { dolls } = this.state;      
      return dolls.filter(doll => {      
          return doll.year === year;
        });        
    }

    // findCollections = () => {
    //   const { dolls2019 } = this.state;
    //   let collections = [];
    //   dolls2019.forEach(doll => {

    //     if ()

    //   })
    // }

    // findDollsByCollection = (collection) => {
    //   const { dolls2019 } = this.state;      
    //   if (collection !== "") {
    //     const result = dolls2019.filter(doll => {      
    //       return doll.collectionName.toLowerCase().includes(collection.toLowerCase());
    //     });
    //     this.setState({
    //       searched: result
    //     })
    //   } else {
    //     this.setState({
    //       searched: []
    //     })
    //   }            
    // }




    render() {
        const { dolls2019, loading, brand } = this.state;

        return (
            <div>
              <h2>2019</h2>
                
                {!loading && dolls2019.map((doll, index) => {
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