import axios from 'axios';

export class PromerClient {
  axios = {};
  
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.PROMER_BASE_URL || 'http://locahost:3000/api/v1',
    });
  }
}
