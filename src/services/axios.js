import axios from 'axios';

import { API_URL, BEARER_TOKEN } from '@env'

export const SERVER_URL = API_URL;

console.log(`API_URL : ${SERVER_URL}`);

const config = {
    headers: { Authorization: `Bearer ${BEARER_TOKEN}` }
};

/** All API call Interface */
let GetData = {

  /** GET PRODUCTS */
  getProducts() {
    return axios.get(`${SERVER_URL}/products`, config).then(res => res).catch(err => err.response)
  },

  /** GET CATEGORIES */
  getCategories() {
    return axios.get(`${SERVER_URL}/categories`, config).then(res => res).catch(err => err.response)
  },

  /** POST PRODUCT */
  postProduct(data) {
    return axios.get(`${SERVER_URL}/products`, data, config).then(res => res).catch(err => err.response)
  },

}

export {GetData};