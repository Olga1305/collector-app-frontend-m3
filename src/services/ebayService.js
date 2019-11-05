import Ebay from 'ebay-node-api';
// import EBAY_CLIENT from '../../env'


class EbayService {
  constructor() {
    this.ebay =  new Ebay({
        clientID: 'OlgaDoku-olgatest-PRD-fb31a1ca7-698edd80',        
    });      
  }

    findByKeyword(query) {
        return this.ebay.findItemsByKeywords(query).then(({ data: dolls }) => dolls)
    }
}


const ebayService = new EbayService();

export default ebayService;