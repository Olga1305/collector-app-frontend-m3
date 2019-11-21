import axios from 'axios';

class AuthService {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true
    })
  }

  signup(user) {
    const { username, email, password } = user;
    return this.auth.post('/signup', {username, email, password})
      .then(({ data }) => data);
  }

  login(user) {
    const { email, password } = user;
    return this.auth.post('/login', {email, password})
      .then(({ data }) => data);
  }

  sociallogin(user) {
    const { _profile: { email } } = user;
    return this.auth.post(`/sociallogin/${email}`)
      .then(({ data }) => data);
  }

  logout() {
    return this.auth.get('/logout', {})
      .then(response => response.data)
  }

  updateMyPersonalData(user) {
    const { username, email } = user;
    return this.auth.put(`/personaldata/update`, {username, email})
      .then(({ data }) => data);
  }

  me(user) {
    return this.auth.get('/me')
    .then(response => response.data)
  }
}

const authService = new AuthService();

export default authService;