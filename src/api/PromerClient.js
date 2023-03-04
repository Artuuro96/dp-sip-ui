import axios from 'axios';

export class PromerClient {
  axios = {};
  
  constructor() {
    this.axios = axios.create({
      baseURL: 'http://localhost:3001',
    });
  }
}
