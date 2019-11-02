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
    return this.axios.get(`/mycollection`).then(({ data: dolls }) => dolls);
  }

  getMyWhishlist() {
    return this.axios.get(`/mywishlist`).then(({ data: dolls }) => dolls);
  }
}

const userService = new UserService();

export default userService;
