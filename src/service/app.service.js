import client from '../utils/client';
import URL from '../utils/url_path';

export const upDatePassword = async (id, oldPassword, password) => {
  return client.put(URL.UPDATE_PASS_USER + `/${id}`, {oldPassword, password});
};
export const getUser = async id => {
  return client.get(URL.GET_USER_URL + `/${id}`);
};
export const updateUser = async (id, formData) => {
  console.log(formData, 'dataaaaaaaa');
  return client.put(URL.UPDATE_USER_URL + `/${id}`, formData);
};

export const getProducts = async () => {
  return client.get(URL.Products_URL);
};
// export const getSpecificProduct = async name => {
//   return client.get(URL.SEARCH_PRODUCTS, {
//      name:'product two'
//   });
// };
export const getSpecificProduct = async name => {
  // console.log({name}, 'hhhhh');
  return client.get(URL.SEARCH_PRODUCTS + `/${name}`);
};

export const getFeaturedProducts = async () => {
  return client.get(URL.FEATURED_PRODUCT);
};
export const getOrderHistory = async id => {
  return client.get(URL.ORDER_HISTORY + `/${id}`);
};

export const giveOrder = async (
  status,
  consignmentName,
  shippingAddress,
  products,
  customer,
  time,
) => {
  return client.post(URL.ORDER_URL, {
    status,
    consignmentName,
    shippingAddress,
    products,
    customer,
    time,
  });
};