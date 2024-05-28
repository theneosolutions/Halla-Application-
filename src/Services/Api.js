import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from './ApiList';

// Configure Axios base URL
axios.defaults.baseURL = baseUrl

// Add a request interceptor to handle token injection
axios.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('@UserToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle global error responses
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Log and handle errors
    console.error('Error in response:', error);
    return Promise.reject(error);
  }
);

export const setItemInLocalStorage = async (key, value) => {
  console.log('setItem=======', key, value);
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    // Handle errors here
    console.error('Error setting item in local storage:', error);
  }
};

export const getFromLocalStorage = async key => {
  console.log('getItem=======', key);
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    // Handle errors here
    console.error('Error getting item from local storage:', error);
    return null;
  }
};

// Function to make a request
async function makeRequest(baseUrl, url, body = {}, method, token = false, isFormData = false) {
  try {
    const headers = {
      'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
    };

    if (token) {
      const userToken = await AsyncStorage.getItem('@UserToken');
      headers.Authorization = `Bearer ${userToken}`;
    }

    const config = {
      url: `${baseUrl}${url}`,
      method: method,
      headers: headers,
      params: method === 'GET' ? body : undefined,
      data: method !== 'GET' ? body : undefined,
    };

    const response = await axios(config);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    // Log and handle errors
    console.error('Error in makeRequest:', error);
    return {
      error: error.response ? error.response.data : 'Network Error',
      status: error.response ? error.response.status : 500,
    };
  }
}

export default makeRequest;
