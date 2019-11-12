// import Ebay from 'ebay-node-api';
import axios from 'axios';
// import EBAY_CLIENT from '../../env'


class EbayService {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.EBAY_API_URL,
      withCredentials: true
    });
  }

  // constructor() {
  //   this.ebay =  new Ebay({
  //       clientID: 'OlgaDoku-olgatest-PRD-fb31a1ca7-698edd80',        
  //   });      
  // }

  findByKeyword(query) {
    return this.axios.get(`${process.env.EBAY_API_URL}${query}`, {headers: {'Content-Type': 'aplication/jason'}})
    .then(({ data: dolls }) => dolls)
}

    // findByKeyword(query) {
    //     return this.ebay.findItemsByKeywords(query, {headers: {'Content-Type': 'aplication/jason'}}).then(({ data: dolls }) => dolls)
    // }
}


const ebayService = new EbayService();

export default ebayService;