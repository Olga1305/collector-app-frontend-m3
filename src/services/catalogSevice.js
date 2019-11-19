import axios from 'axios';

class CatalogService {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true
    });
  }

  getAllDolls() {
    return this.axios.get('/catalog')
      .then(({ data: dolls }) => dolls)
  }

  getDollsByBrand(brand) {
    return this.axios.get(`/catalog/${brand}`)
      .then(({ data: dolls }) => dolls)
  }

  getDollById(brand, id) {
    return this.axios.get(`/catalog/${brand}/${id}`)
      .then(({ data: doll }) => doll);
  }  

  getDollsByQuery(query) {
    return this.axios.post(`/searchresults`, {query})
      .then(({ data: dolls }) => dolls);
  }

  getDollsByMold(mold) {
    const splited = mold.split('/');
    return this.axios.get(`/searchresults/mold/${splited[0]}`)
      .then(({ data: dolls }) => dolls);
  }

  getDollsBySkin(skin) {
    return this.axios.get(`/searchresults/skintone/${skin}`)
      .then(({ data: dolls }) => dolls);
  }

}

const catalogService = new CatalogService();

export default catalogService;