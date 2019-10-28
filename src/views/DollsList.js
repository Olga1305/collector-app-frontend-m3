import React, { Component } from 'react';
import './DollsList.css';

import { Link } from "react-router-dom";

import catalogService from '../services/catalogSevice';

import InfoBox from '../components/InfoBox';

class DollsList extends Component {

    state = {
        dolls: [],
        years: [],
        collections: [],
        finalCollections: [],
        loading: true,
        brand: undefined,
    }


    async componentDidMount() {
        
        const { match: { params: { brand } } } = this.props;  
    
        try {
          const dolls = await catalogService.getDollsByBrand(brand);  
          this.setState({
            dolls,
            brand
          })
          try {            
            this.findYearsAndCollections();
            try {
              this.findFinalCollections();
              console.log(this.state)
              
            }
            catch (error) {
              console.log(error);
              this.setState({
                loading: false,
              })
            } 
          }
          catch (error) {
            console.log(error);
            this.setState({
              loading: false,
            })
          } 
        } 
        catch (error) {
          console.log(error);
          this.setState({
            loading: false,
          })
        }
    }    


    findYearsAndCollections = () => {
      const { dolls } = this.state;
      const allYears = [];
      const years = [];
      const allCollections = [];
      const collections = [];

      dolls.forEach(doll => {
        if (doll.year !== "") {
          allYears.push(doll.year);
        } else {
          return allYears;}
      });

      if (allYears.length > 0) {        
        allYears.forEach(item => {
          if (years.indexOf(item) === -1) {
            years.push(item);
          } 
          return years;               
        });
      }

      dolls.forEach(doll => {
        if (doll.collectionName !== "") {
          allCollections.push(doll.collectionName);
        } else {
          return allCollections;}
      });

      if (allCollections.length > 0) {        
         allCollections.forEach(item => {
          if (collections.indexOf(item) === -1) {
            collections.push(item);
          } 
          return collections;               
        });
      }  

      this.setState({
        years,
        collections,                
    })              
    }


    findDollsByYear = (year) => {    
      const { dolls } = this.state;    
      return dolls.filter(doll => {      
          return doll.year === year;
        });        
    } 
    
    findCollectionsByYear = (arr, year) => {    
      const result = {year: year, yearColl: []};
      result.yearColl.push(arr.filter(el => {          
          return el.collection[0][0].year === year;
        }));  
        
      return result;      
    }    

    findDollsByCollection = (collection) => {   
        const { dolls } = this.state; 
        const result = {collName: collection, collection: []};   
        result.collection.push(dolls.filter(doll => {      
          return doll.collectionName.includes(collection);
        }));   
        return result;      
    }

    findFinalCollections = () => {
      const { years, collections } = this.state;
      const dollsByCollection = [];
      const collectionsByYear = [];

      collections.forEach(collection => {
        dollsByCollection.push(this.findDollsByCollection(collection))
      })

      years.forEach(year => {
        collectionsByYear.push(this.findCollectionsByYear(dollsByCollection, year))
      })

      console.log(dollsByCollection)
      console.log(collectionsByYear)
      console.log(collectionsByYear[0].year)

      this.setState({
        finalCollections: collectionsByYear,
        loading: false,                
      })   
      
    }


    render() {
        const { dolls, brand, years, collections, finalCollections, loading } = this.state;

        return (
            <div>    
                       
                
                {!loading && finalCollections.map((el, index) => {
                    return (
                      <h1>hola</h1> 
                      
                      // <h2 key={`${index}`}>{el.year}</h2>
                      // {year.map((collection) => {
                      //   // return (
                      //     <h3>{collection[0].collectionName}</h3>
                      //   // )
                        

                      // })}
                      
                    

                        // <Link className="link-to-doll" to={`/catalog/${brand}/${doll._id}`} key={`${doll.name}-${index}`}>
                        //     <InfoBox 
                        //     image={doll.closeUpImage} 
                        //     character={doll.character} 
                        //     name={doll.name} 
                        //     mold={doll.mold} 
                        //     releasePrice={doll.releasePrice}/>
                        // </Link>
                        )
                })}

                {loading && <div className="loading">Loading...</div>}
            </div>
        )
    }
}

export default DollsList;