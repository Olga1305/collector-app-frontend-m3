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

  getMyDollDetail(id) {
    return this.axios.get(`/mycollection/${id}`).then(({ data: doll }) => doll);
  }

  updateMyDoll(doll) {
    return this.axios.put(`/mycollection/${doll._id}`, doll)
      .then(({ data: doll }) => doll);
  }

  deleteMyDoll(doll) {
    return this.axios.delete(`/mycollection/${doll._id}`, doll)
      .then(({ data: doll }) => doll);
  }

  getMyWhishlist() {
    return this.axios.get(`/mywishlist`).then(({ data: dolls }) => dolls);
  }

  addMyDollToMyCollection( id, user) {
    return this.axios.post(`/mycollection/${id}`, user)
      .then(({ data: user }) => user);
  }

  addMyDollToMyWishlist( id, user) {
    return this.axios.post(`/mywishlist/${id}`, user)
      .then(({ data: user }) => user);
  }

}

const userService = new UserService();

export default userService;
