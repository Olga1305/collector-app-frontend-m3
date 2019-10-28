import React, { Component } from 'react';
import './DollsList.css';


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
        subBrand: undefined,
    }


    async componentDidMount() {
        
        const { match: { params: { brand } } } = this.props;  
    
        try {
          const dolls = await catalogService.getDollsByBrand(brand);
          let subBrand;
          if (brand === 'fashionroyalty') {
            subBrand = 'Fashion Royalty';
          } else if (brand === 'nuface') {
            subBrand = 'Nu Face';
          } else {
            subBrand = 'Poppy Parker';
          }  
          this.setState({
            dolls,
            brand,
            subBrand
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


    // findDollsByYear = (year) => {    
    //   const { dolls } = this.state;    
    //   return dolls.filter(doll => {      
    //       return doll.year === year;
    //     });        
    // } 
    
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

      collectionsByYear.forEach(el => {
        console.log(el.year)
        console.log(el.yearColl)
        el.yearColl.forEach(coll => {
          console.log(coll.collName)
        })

      })

      this.setState({
        finalCollections: collectionsByYear,
        loading: false,                
      })   
      
    }


    render() {
        const { dolls, brand, subBrand, years, collections, finalCollections, loading } = this.state;

        return (
            <div>    
                      
                
                {!loading && <div>
                  <h1>{subBrand}</h1> 
                
                 {finalCollections.map((el, index) => {
                    return (
                      <div>
                         <h2 key={`${el.year}-${index}`}>{el.year}</h2>
                         {el.yearColl.map((coll, index) => {
                           return (
                            <h3 key={`${index}`}>hola{coll.collName}</h3>
                           )
                           

                         })}
                      


                      </div>
                      
                
                        // <InfoBox key={`${doll.name}-${index}`}
                        // brand = {brand}
                        // id = {doll._id}
                        // image={doll.closeUpImage} 
                        // character={doll.character} 
                        // name={doll.name} 
                        // editionSize = {doll.editionSize}
                        // mold={doll.mold} 
                        // skinTone={doll.skinTone}
                        // releasePrice={doll.releasePrice}></InfoBox>

                        )
                 })}
                </div>}

                {loading && <div className="loading">Loading...</div>}
            </div>
        )
    }
}

export default DollsList;