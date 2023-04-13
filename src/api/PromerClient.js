import axios from 'axios';
import Cookies from 'universal-cookie';

export class PromerClient {
  axios = {};

  constructor() {
    this.cookies = new Cookies();
    const token = this.cookies.get('jwt')
    this.axios = axios.create({
      baseURL: 'https://api.grupopromer.com/v1',
      headers: { 'Authorization': `Bearer ${token}`}
    });;
  }

  async findCustomers({
    limit = 10, skip = 0, keyValue = ''
  }) {
    console.log(limit, skip, keyValue)
    const query = {
      params: {
        limit,
        skip,
        keyValue,
      }
    }
    if (!keyValue || keyValue === '' || keyValue === undefined)
      delete query.params.keyValue
    const response = await this.axios.get('/customers',query);
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
    const response = await this.axios.get('/lands', query);
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

  async updateLand(land) {
    try {
      const response = await this.axios.patch(`/lands/${land._id}`, land);
      return response?.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteLand(landId) {
    try {
      const response = await this.axios.delete(`/lands/${landId}`);
      return response?.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAllContracts({
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
    const response = await this.axios.get('/contracts',query);
    return response;
  }

  async createContract(contract) {
    try {
      const response = await this.axios.post(`/contracts`, contract);
      return response?.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createCredit(credit) {
    try {
      const response = await this.axios.post(`/credit`, credit);
      return response?.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findCreditIdsByCustomerId(customerId) {
    try {
      const response = await this.axios.get(`/credit/customer/${customerId}`);
      return response?.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  
  async findCustomerProfile(customerId, creditId) {
    const response = await this.axios.get(`/customers/profile/${customerId}/credit/${creditId}`);
    return response?.data;
  }

  async createPayment(payment) {
    try {
      const response = await this.axios.post('/payment', payment);
      return response?.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAnalyticsSales(){
    try {
      const response = await this.axios.get(`/analytics/sales`);
      return response.data[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

}
