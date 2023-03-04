import axios from 'axios';

export class AcmaClient {
  axios = {};

  constructor() {
    this.axios = axios.create({
      baseURL: 'http://localhost:3001',
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
}
