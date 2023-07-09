import axios from 'axios';
import queryString from 'query-string';
import { EthereumAddressInterface, EthereumAddressGetQueryInterface } from 'interfaces/ethereum-address';
import { GetQueryInterface } from '../../interfaces';

export const getEthereumAddresses = async (query?: EthereumAddressGetQueryInterface) => {
  const response = await axios.get(`/api/ethereum-addresses${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createEthereumAddress = async (ethereumAddress: EthereumAddressInterface) => {
  const response = await axios.post('/api/ethereum-addresses', ethereumAddress);
  return response.data;
};

export const updateEthereumAddressById = async (id: string, ethereumAddress: EthereumAddressInterface) => {
  const response = await axios.put(`/api/ethereum-addresses/${id}`, ethereumAddress);
  return response.data;
};

export const getEthereumAddressById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/ethereum-addresses/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteEthereumAddressById = async (id: string) => {
  const response = await axios.delete(`/api/ethereum-addresses/${id}`);
  return response.data;
};
