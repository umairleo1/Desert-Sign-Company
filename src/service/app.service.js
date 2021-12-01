import client from '../utils/client';
import URL from '../utils/url_path';

export const upDatePassword = async (id, oldPassword, password) => {
  return client.put(URL.UPDATE_PASS_USER + `/${id}`, {oldPassword, password});
};
export const getUser = async id => {
  return client.get(URL.GET_USER_URL + `/${id}`);
};
export const updateUser = async (id, formData) => {
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

export const getAllOrders = async () => {
  return client.get(URL.GET_ALL_ORDERS);
};

export const getAllConsignments = async () => {
  return client.get(URL.GET_ALL_CONSIGNMENTS);
};
export const getAllVehicles = async () => {
  return client.get(URL.GET_ALL_VEHICLES);
};

export const makeConsignment = async order => {
  return client.post(URL.CREATE_CONSIGNMENTS, order);
};

export const allFeaturedProducts = async () => {
  return client.get(URL.GET_ALL_FEATURED_PRODUCTS);
};

export const AllProducts = async () => {
  return client.get(URL.GET_ALL_PRODUCTS);
};

export const AllCategories = async () => {
  return client.get(URL.GET_ALL_CATAGORIES);
};

export const AllNotifications = async id => {
  return client.get(URL.GET_ALL_NOTIFICATION + `/${id}`);
};

export const UpdateConsignment = async (id, orders) => {
  return client.patch(URL.UPDATE_CONSIGNMENT + `/${id}`, {orders: orders});
};
