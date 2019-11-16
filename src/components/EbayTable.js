// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './InfoBox.css';

import logoEbay from '../assets/logo-ebay.png';


class EbayTable extends Component {


      render() {

        const { itemsOnEbay,
            avgEbayPrices,
            change,
            ebayUrls, } = this.props;

            console.log(this.props)

        return (
          
          
            <div className="EbayTable">
                <h3>Current price increased <span>{change}%</span></h3>              
              <table id="t01">
                <tbody>
                  <tr>
                    <th>
                      <img src={logoEbay} alt="dolls" />
                    </th>
                    <th>Items</th>
                    <th>Avg. price</th>
                    <th>Link</th>
                  </tr>
                  <tr>
                    <td>Complete</td>
                    <td>{itemsOnEbay[0]}</td>
                    <td>${avgEbayPrices[0]}</td>
                    <td>
                      <a className="button-ebay" target="_blank" rel="noopener noreferrer" href={ebayUrls[1]}>
                        See on Ebay
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Nude doll</td>
                    <td>{itemsOnEbay[1]}</td>
                    <td>${avgEbayPrices[1]}</td>
                    <td>
                      <a className="button-ebay" target="_blank" rel="noopener noreferrer" href={ebayUrls[2]}>
                        See on Ebay
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Head only</td>
                    <td>{itemsOnEbay[2]}</td>
                    <td>${avgEbayPrices[2]}</td>
                    <td>
                      <a className="button-ebay" target="_blank" rel="noopener noreferrer" href={ebayUrls[3]}>
                        See on Ebay
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Outfit only</td>
                    <td>{itemsOnEbay[3]}</td>
                    <td>${avgEbayPrices[3]}</td>
                    <td>
                      <a className="button-ebay" target="_blank" rel="noopener noreferrer" href={ebayUrls[4]}>
                        See on Ebay
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>  
            </div>
          
        )
    }    

}

export default EbayTable;