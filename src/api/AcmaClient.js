/* eslint-disable lines-between-class-members */
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Cookies from 'universal-cookie';

export class AcmaClient {
  axios = {};
  cookies = {};

  constructor() {
    this.cookies = new Cookies();
    const token = this.cookies.get('jwt')
    this.axios = axios.create({
      baseURL: 'http://localhost/api/v1',
      headers: { 'Authorization': `Bearer ${token}`}
    });
  }

  async login(username, password) {
    try {
      const body = { username, password }
      const response = await this.axios.post('/auth/login', body);
      return response?.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async refresh() {
    const refreshToken = this.cookies.get('refresh_jwt');
    const response = await this.axios.post('/auth/refresh', {}, {
      headers: { 'Authorization': `Bearer ${refreshToken}`}
    });
    const decodeRefresh = jwtDecode(response.data.refreshToken);
    const decode = jwtDecode(response.data.refreshToken);
    this.cookies.set('jwt', {
      exp: new Date(decode.exp)
    })
    this.cookies.set('refresh_jwt', {
      exp: new Date(decodeRefresh.exp)
    })
    
    return response;
  }

  async verify(token) {
    const response = await this.axios.post('/auth/verify', {}, {
      headers: { 'Authorization': `Bearer ${token}`}
    });
    return response;
  }

  async getAllUsers() {
    const response = await this.axios.get('/user');
    return response;
  }
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YzcyMDA3NS1lZDg0LTQ5MzktOTZlZC0yODBhMTVhNGY4MDciLCJ1c2VybmFtZSI6ImFydHVybzk2IiwibmFtZSI6IkFydHJvIiwibGFzdE5hbWUiOiJSb2RyaWd1ZXoiLCJzZWNvbmRMYXN0TmFtZSI6Ik9sdmVyYSIsImVtYWlsIjoiYXJ0dXJvOTZAZ21haWwuY29tIiwicm9sZXMiOlt7ImlkIjoiZGE4ZWVmYjYtZWZhNy00NzBkLWJjNGEtZmIzOWJhMTdhMDhiIiwibmFtZSI6ImFkbWluIn0seyJpZCI6IjAwMDdhM2U1LWI1YWQtNGIzOS05ZTNiLTFiMzcwZmI1MzljNSIsIm5hbWUiOiJ2ZW5kb3IifV0sImlhdCI6MTY3ODQ2ODQ0NiwiZXhwIjoxNjc4NTU0ODQ2fQ.QE9hbF-CoBWT_8dMB5sq1bW-Kl3mFG_s5aAycW69yzk