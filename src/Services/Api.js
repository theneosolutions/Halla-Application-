import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const getDefaultHeaders = () => ({
  'Content-Type': 'application/json',
});
async function makeRequest(
  baseUrl,
  url,
  body = {},
  method,
  token = false,
  isFormData = false,
) {
  let headers = getDefaultHeaders();
  if (isFormData) {
    headers['Content-Type'] = 'multipart/form-data';
  }
  if (token) {
    console.log('>>>>>token', token, userToken);
    const userToken = await getFromLocalStorage('@UserToken');
    headers['Authorization'] = `Bearer ${userToken}`;
    console.log('cool', userToken);
  }
  const fullUrl = `${baseUrl}${url}`;
  const config = {
    url: fullUrl,
    method: method,
    headers: headers,
    params: method === 'GET' ? body : undefined,
    data: method !== 'GET' ? body : undefined,
  };
  console.log('🚀 ~ config:', config);
  return axios(config).then(
    res => {
      return {
        ...res,
        apiSuccess: true,
      };
    },
    err => {
      // showErrorToast('Slow or no internet connnection', 2000);
      return {
        ...err,
        apiSuccess: false,
      };
    },
  );
}
export default makeRequest;
