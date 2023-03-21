import axios from 'axios';
import Cookies from 'universal-cookie';

export class PromerClient {
  axios = {};
  
  constructor() {
    this.cookies = new Cookies();
    const token = this.cookies.get('jwt')
    this.axios = axios.create({
      baseURL: 'http://localhost:3001/v1',
      headers: { 'Authorization': `Bearer ${token}`}
    });;
  }

  async findCustomers() {
    const response = await this.axios.get('/customers');
    return response?.data?.result;
  }

  async createCustomer(newUser) {
    const response = await this.axios.post('/customers', newUser);
    return response;
  }
}
