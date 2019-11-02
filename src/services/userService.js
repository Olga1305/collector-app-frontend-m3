import axios from 'axios';

class UserService {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });
  }

//   getProfile() {
//     return this.axios.get('/profile').then(({ data: user }) => user);
//   }

  getMyCollection() {
    return this.axios.get(`/mycollection`).then(({ data: user }) => user);
  }

  getMyWhishlist() {
    return this.axios.get(`/mywishlist`).then(({ data: dolls }) => dolls);
  }

  addMyDollToMyCollection(brand, id, user) {
    return this.axios.post(`/catalog/${brand}/${id}`, user)
      .then(({ data: user }) => user);
  }
}

const userService = new UserService();

export default userService;
