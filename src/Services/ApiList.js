import api from './Api';
const baseUrl = 'https://backend.halla.sa';
export const GOOGLE_MAPS_APIKEY = 'AIzaSyAFZBGvY2p25djzXAG-0p3vq42SzGw9WxQ';

export const signUp = async data => {
  const url = `/api/auth/sign-up`;
  const res = await api(baseUrl, url, data, 'POST', false, false);
  return res;
};
export const signInEmail = async data => {
  const url = `/api/auth/sign-in`;
  const res = await api(baseUrl, url, data, 'POST', false, false);
  return res;
};
export const signInPhone = async data => {
  const url = `/api/auth/sign-in/phone`;
  const res = await api(baseUrl, url, data, 'POST', false, false);
  return res;
};

export const confirmemail = async data => {
  const url = `/api/auth/forgot-password`;
  const res = await api(baseUrl, url, data, 'POST', false, false);
  return res;
};
export const resetpass = async data => {
  const url = `/api/auth/reset-password`;
  const res = await api(baseUrl, url, data, 'POST', false, false);
  return res;
};
export const updatepass = async data => {
  const url = `/api/auth/update-password`;
  const res = await api(baseUrl, url, data, 'POST', true, false);
  return res;
};

export const otpVerify = async data => {
  const url = `/api/auth/otp/verify`;
  const res = await api(baseUrl, url, data, 'POST', false, false);
  return res;
};
export const otpResend = async data => {
  const url = `/api/auth/otp/resend`;
  const res = await api(baseUrl, url, data, 'POST', false, false);
  return res;
};

export const ImageLink = async data => {
  const url = `/api/events/upload-event-image`;
  const res = await api(baseUrl, url, data, 'POST', true, true);
  return res;
};

export const createEventInfo = async data => {
  const url = `/api/events`;
  const res = await api(baseUrl, url, data, 'POST', true, false);
  return res;
};
export const createCardInfo = async data => {
  const url = `/api/cards/create-card`;
  const res = await api(baseUrl, url, data, 'POST', true, false);
  return res;
};

export const GetCardInfo = async () => {
  const url = `/api/cards?order=ASC&page=1&take=10`;
  const res = await api(baseUrl, url, {}, 'GET', true, false);
  return res;
};
export const getEventWithUserId = async user => {
  const url = `/api/events/byUserId/${user}?order=DESC&page=1&take=100&filter=monthly`;
  const res = await api(baseUrl, url, {}, 'GET', true, false);
  return res;
};

export const getProfileWithUserId = async id => {
  const url = `/api/users/${id}`;
  const res = await api(baseUrl, url, {}, 'GET', true, false);
  return res;
};

export const EventId = async id => {
  const url = `/api/events/${id}`;
  console.log("🚀 ~ EventId ~ url:", url)
  const res = await api(baseUrl, url, {}, 'GET', true, false);
  return res;
};



export const addEventGuests = async (event,data) => {
  const url = `/api/events/addGuests/${event}`;
  const res = await api(baseUrl, url, data, 'POST', true, false);
  return res;
};

export const SendInvites = async (id) => {
  const url = `/api/events/send-invites/${id}`;
  const res = await api(baseUrl, url, {}, 'POST', true, false);
  return res;
};
