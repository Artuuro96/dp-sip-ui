import Cookies from 'universal-cookie';
import { AcmaClient } from '../api/AcmaClient';

// eslint-disable-next-line consistent-return
export const verify = async () => {
  const cookies = new Cookies();
  const token = cookies.get('jwt');
  const acmaClient = new AcmaClient();
  try {
    return await acmaClient.verify(token);
  } catch (error) {
    console.error('Error verifying token: ', error);
  }
};
