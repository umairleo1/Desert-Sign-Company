import client from '../utils/client';
import URL from '../utils/url_path';
import authStorage from '../utils/authStorage';

const jsonID = authStorage.getUserid();

export const signup = async (
  userName,
  fullName,
  email,
  phoneNumber,
  password,
  location,
  fCMToken,
  creditLimit,
  country,
  companyName,
) => {
  return client.post(URL.SIGNUP_URL, {
    userName,
    fullName,
    email,
    phoneNumber,
    password,
    location,
    fCMToken,
    creditLimit,
    country,
    companyName,
  });
};

export const verifyOTP = async (verificationCode, id) => {
  // console.log(URL.VERIFY_OTP_URL + `/${id}`, verificationCode);
  return client.patch(URL.VERIFY_OTP_URL + `/${id}`, {
    verificationCode,
  });
};

export const updatePassword = async (resetPasswordCode, id, password) => {
  // console.log(URL.UPDATE_PASSWORD_URL + `/${id}`, resetPasswordCode), password;
  return client.patch(URL.UPDATE_PASSWORD_URL + `/${id}`, {
    resetPasswordCode,
    password,
  });
};
export const forgetPassword = async email => {
  // const id = jsonID?._W;
  // console.log(id, 'id');
  return client.patch(URL.FORGET_PASS_URL, {email});
};
export const resendOTP = async id => {
  // const id = jsonID?._W;
  // console.log(id, 'id');
  // console.log(id, 'id=======');
  return client.post(URL.RESEND_OTP_URL_VERIFY, {id});
};
export const resendOTPReset = async id => {
  // const id = jsonID?._W;
  // console.log(id, 'id');
  return client.post(URL.RESEND_OTP_URL_RESET, {id});
};

export const logIn = async (userName, password, fCMToken, type) => {
  return client.post(URL.SIGNIN_URL, {userName, password, fCMToken, type});
};
export const valideteUserName = async userName => {
  return client.patch(URL.VERIFY_UNSERNAME_URL, {userName});
};
