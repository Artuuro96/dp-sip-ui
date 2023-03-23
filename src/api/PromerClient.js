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

  async importFile(fileImport) {
    try {
      const formData = new FormData();
      formData.append("fileImport", fileImport);
      const response = await this.axios.post('/lands/import-create-lands', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }});
      return response?.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAllLands({
    limit, skip, keyValue
  }) {
    const query = {
      params: {
        limit,
        skip,
        keyValue,
      }
    }

    if (!keyValue || keyValue === '' || keyValue === undefined)
      delete query.params.keyValue
    const response = await this.axios.get('/lands',query);
    return response;
  }

  async createLand(land) {
    try {
      const response = await this.axios.post('/lands', land);
      return response?.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  async findCustomerProfile(customerId) {
    const response = await this.axios.get(`/customers/profile/${customerId}`);
    return response?.data
  }
}
