import axios from 'axios';
import authStorage from './authStorage';

const request = axios.create({
  baseURL: 'http://3.142.47.134:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const onSuccess = function (response) {
  // console.log(response);
  return response.data;
};

const onError = function (error) {
  // console.error('Request Failed:', error.config);
  if (error.response) {
    // Request was made but server responded with something
    // other than 2xx
    // console.error('Status:', error.response.status);
    // console.error('Data:', error.response.data);
    // console.error('Headers:', error.response.headers);
  }

  return Promise.reject({
    errMsg: !error?.response
      ? 'Network Issue!'
      : error?.response?.data?.message ||
        capitalizeFirstLetter(error?.response?.data?.errors[0].param) +
          ' ' +
          error?.response?.data?.errors[0].msg.toLowerCase(),
    status: error?.response?.status || 'not status',
  });
};

request.interceptors.response.use(onSuccess, onError);

request.interceptors.request.use(
  async config => {
    // const user = await authStorage.getRiderToken();
    // const riderToken = await authStorage.getToken();
    // console.log('====================================');
    // console.log('token ', riderToken);
    // console.log('====================================');
    // config.headers['Authorization'] = riderToken;
    // config.headers['ownerToken'] =
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUGllcm1hdHRlbyBHcmllY28iLCJlbWFpbCI6ImFobWVkLmZyaXpodWJAZ21haWwuY29tIiwiaWQiOiI2MDkwZjM5Njg4Y2M2NzE4ZmRhNGFjOTMiLCJtb2RlbCI6Im93bmVycyIsImlhdCI6MTYyODU4ODE4MSwiZXhwIjoxNjMxMTgwMTgxfQ.yYrxK9vjgnYJvHeLxU0M8rLY-WT3uTDZD22Uz1496LY';
    return config;
  },
  error => Promise.reject(error),
);
export default request;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
