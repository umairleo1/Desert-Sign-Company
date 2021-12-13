import AsyncStorage from '@react-native-async-storage/async-storage';

const key = 'authToken';

const storeToken = async value => {
  try {
    const jsonObj = JSON.stringify(value);

    await AsyncStorage.setItem(key, jsonObj);
  } catch (e) {
    console.log('Error storing the auth token', e);
  }
};
const storeUserid = async value => {
  await AsyncStorage.setItem('userid', JSON.stringify(value));
};
const getUserid = async () => {
  try {
    const value = await AsyncStorage.getItem('userid');
    return value != null ? JSON.parse(value) : null;
  } catch (e) {
    console.log('error geting id ', e);
  }
};

const setIsVerified = async value => {
  await AsyncStorage.setItem('isverified', JSON.stringify(value));
};
const getIsVerified = async () => {
  try {
    const value = await AsyncStorage.getItem('isverified');
    return value != null ? JSON.parse(value) : null;
  } catch (e) {
    console.log('error geting id ', e);
  }
};

// const storeToken = async (authToken) => {

//   try {
//     await SecureStore.setItem(key, authToken);
//   } catch (error) {
//     console.log('Error storing the auth token', error);
//   }
// };

const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('authToken');
    // console.log('====================================');
    // console.log(value, 'token');
    // console.log('====================================');
    return value != null ? JSON.parse(value) : null;
  } catch (e) {
    console.log('Error getting the authh token', e);
  }
};

const storeFcmToken = async fcmToken => {
  try {
    await AsyncStorage.setItem(key, fcmToken);
  } catch (error) {
    console.log('Error storing the fcm token', error);
  }
};

const getFcmToken = async () => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.log('Error getting the fcm token', error);
  }
};

// const getToken = async () => {
//   try {
//     return await SecureStore.getItem(key);
//   } catch (error) {
//     console.log('Error getting the authh token', error);
//   }
// };

// const getUser = async () => {
//   const token = await getToken();
//   return token ? jwtDecode(token) : null;
// };

const removeValue = async () => {
  try {
    await AsyncStorage.removeItem(key);
    await AsyncStorage.removeItem('isverified');
    await AsyncStorage.removeItem('userid');
  } catch (e) {
    // remove error
  }

  console.log('Done.');
};

export default {
  storeToken,
  getToken,
  storeUserid,
  getUserid,
  setIsVerified,
  getIsVerified,
  removeValue,
  storeFcmToken,
  getFcmToken,
  // getUser,
  // removeToken,
};
