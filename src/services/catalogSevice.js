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

  getDollById(id){
    return this.axios.get(`/catalog/${id}`)
      .then(({ data: doll }) => doll);
  }

  

}

const catalogService = new CatalogService();

export default catalogService;