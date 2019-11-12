import axios from 'axios';

class UserService {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });
  }

  updateMyPersonalData( username, email ) {
    return this.axios.put(`/personaldata/update`, username, email)
      .then(({ data: user }) => user);
  }

  addMyDollToMyCollection(id) {
    return this.axios.post(`/mycollection/${id}`)
      .then(({ data: doll }) => doll);
  }

  addMyDollToMyWishlist(id) {
    return this.axios.post(`/mywishlist/${id}`)
      .then(({ data: doll }) => doll);
  }

  getMyCollection() {
    return this.axios.get(`/mycollection`).then(({ data: dolls }) => dolls);
  }

  getMyWishlist() {
    return this.axios.get(`/mywishlist`).then(({ data: dolls }) => dolls);
  }

  getMyDollDetail(id) {
    return this.axios.get(`/mycollection/${id}`).then(({ data: doll }) => doll);
  }

  getWishlistDollDetail(id) {
    return this.axios.get(`/mywishlist/${id}`).then(({ data: doll }) => doll);
  }

  updateMyDoll(doll) {
    return this.axios.put(`/mycollection/${doll._id}`, doll)
      .then(({ data: doll }) => doll);
  }

  updateWishlistDoll(doll) {
    return this.axios.put(`/mywishlist/${doll._id}`, doll)
      .then(({ data: doll }) => doll);
  }

  deleteMyDoll(id) {
    return this.axios.delete(`/mycollection/${id}`)
      .then(({ data: doll }) => doll);
  }

  deleteWishlistDoll(id) {   
    return this.axios.delete(`/mywishlist/${id}`)
      .then(({ data: doll }) => doll);      
  }

  checkIfDollInCollection(id) {
    return this.axios.get(`/mycollection/${id}/check`, id)
      .then(({ data: doll }) => doll);
  }

  checkIfDollInWishlist(id) {
    return this.axios.get(`/mywishlist/${id}/check`, id)
      .then(({ data: doll }) => doll);
  }

}

const userService = new UserService();

export default userService;

