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

  getDollsByMold = async (query) => {
    try {
      const dolls = await this.getAllDolls();
      if (query !== '') {
        const result = dolls.filter(item => {
          return (
            item.mold.toLowerCase().includes(query.toLowerCase()) 
          );
        });
        return result;
    }    
  } catch (error) {
      console.log(error);
    }
  }

  getDollsBySkin = async (query) => {
    try {
      const dolls = await this.getAllDolls();
      if (query !== '') {
        const result = dolls.filter(item => {
          return (
            item.skinTone.toLowerCase().includes(query.toLowerCase()) 
          );
        });
        return result;
    }    
  } catch (error) {
      console.log(error);
    }
  }
}

const catalogService = new CatalogService();

export default catalogService;