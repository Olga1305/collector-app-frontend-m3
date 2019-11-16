class Helpers {

  isValidId = id => {
    if (id.match(/^[0-9a-fA-F]{24}$/)) return true;
    return false;
  };

  itemsOnEbay = doll => {
    const items = [];
    doll.ebay.forEach(el => {
      items.push(parseInt(el[0].paginationOutput[0].totalEntries[0]));
      return items;
    });
    return items;
  };
  
  calculateAvgEbayPrice = doll => {
    const prices = [];
    doll.ebay.forEach(el => {
      const sum = [];
      let quantity;
      if (el[0].paginationOutput[0].totalEntries[0] === '0') {
        return prices.push(0);
      }
      quantity = el[0].searchResult[0].item.length;
      el[0].searchResult[0].item.forEach(item => {
        if (item.sellingStatus[0].currentPrice[0].__value__) {
          return sum.push(parseInt(item.sellingStatus[0].currentPrice[0].__value__));
        }
        return sum;
      });
      const result = parseInt(
        sum.reduce((a, b) => {
          return a + b;
        }) / quantity,
      );
      prices.push(result);
      return prices;
    });
    return prices;
  };
  
  calculateChange = (release, current) => {
    if (current[0] === 0 && current[1] === 0) {
      return 0;
    }
    if (current[1] > current[0]) {
      return (((current[1] - release) / release) * 100).toFixed(2);
    }
    return (((current[0] - release) / release) * 100).toFixed(2);
  };
  
  generateEbayUrls = doll => {
    const urls = [];
    doll.ebayQueries.forEach(el => {
      const ebayUrl = `https://www.ebay.com/sch/i.html?&_nkw=${encodeURI(el)}`;
      urls.push(ebayUrl);
      return urls;
    });
    return urls;
  };
}

const helpers = new Helpers();

export default helpers;
