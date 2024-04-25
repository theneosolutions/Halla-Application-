import api from './Api';
// const baseUrl = 'https://backend.halla.sa';
const baseUrl = 'https://halla.sa';

export const GOOGLE_MAPS_APIKEY = 'AIzaSyAFZBGvY2p25djzXAG-0p3vq42SzGw9WxQ';

export const signUp = async data => {
  const url = `/api/auth/sign-up`;
  const res = await api(baseUrl, url, data, 'POST', false, false);
  return res;
};

export const LoginWithGoogle = async idToken => {
  const url = `/api/auth/google`;
  console.log('url=======', url);
  const res = await api(baseUrl, url, {idToken: idToken}, 'POST', false, false);
  return res;
};

export const signUpPhoneNu = async data => {
  const url = `/api/auth/sign-up/phone`;

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

export const EditEventInfo = async (id, data) => {
  const url = `/api/events/${id}`;
  const res = await api(baseUrl, url, data, 'PATCH', true, false);
  console.log('res---------APILISt', res);
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
  console.log('res-------------', res);
  return res;
};
export const getEventWithUserId = async (user, page = 1, take = 100) => {
  const url = `/api/events/byUserId/${user}?order=DESC&page=${page}&take=${take}`;
  // console.log('+++++++url-----getEventWithUserId', url);
  const res = await api(baseUrl, url, {}, 'GET', true, false);
  return res;
};

export const getEventBySearch = async (search, user) => {
  console.log('🚀 ~ getEventBySearch ~ user, search:', user, search);
  const url = `/api/events/byUserId/${user}?search=${search}`;
  console.log('+++++++url-----getEventBySearch', url);
  const res = await api(baseUrl, url, {}, 'GET', true, false);
  return res;
};
export const getEventCategorywithid = async id => {
  const url = `/api/events/categorize/byUserId/${id}?order=DESC&page=1&take=100&filter=monthly`;
  // console.log('url------------', url);
  const res = await api(baseUrl, url, {}, 'GET', true, false);
  // console.log('res+++++++++++', res);
  return res;
};

export const getProfileWithUserId = async id => {
  const url = `/api/users/${id}`;
  const res = await api(baseUrl, url, {}, 'GET', true, false);
  return res;
};

export const setUserProfileData = async data => {
  const url = `/api/users`;

  const res = await api(baseUrl, url, data, 'PATCH', true, false);
  return res;
};
export const setProfileDataUsername = async data => {
  const url = `/api/users/username`;
  const res = await api(baseUrl, url, data, 'PATCH', true, false);
  return res;
};
export const EventId = async id => {
  const url = `/api/events/${id}`;
  // console.log('🚀 ~ EventId ~ url:', url);
  const res = await api(baseUrl, url, {}, 'GET', true, false);
  // console.log('res======', res?.data?.id);
  return res;
};

export const addEventGuests = async (event, data) => {
  const url = `/api/events/addGuests/${event}`;
  const res = await api(baseUrl, url, data, 'POST', true, false);
  return res;
};

export const SendInvites = async id => {
  const url = `/api/events/send-invites/${id}`;
  const res = await api(baseUrl, url, {}, 'POST', true, false);
  return res;
};

export const addGuestById = async (id, data) => {
  const url = `/api/events/addGuests/${id}`;
  const res = await api(baseUrl, url, data, 'POST', true, false);
  // console.log('🚀 ~ addGuestById ~ res:', res);
  return res;
};

export const guestListByID = async id => {
  const url = `/api/events/guestlist/${id}?order=DESC&page=1&take=100`;

  const res = await api(baseUrl, url, {}, 'GET', true, false);
  return res;
};
export const removeContactByID = async (eventId, contactId) => {
  const url = `/api/events/remove/guest/${eventId}/${contactId}`;
  console.log('🚀 ~ EventId ~ url::::::pppppppp', url);
  const res = await api(baseUrl, url, {}, 'DELETE', true, false);
  return res;
};
export const getpakage = async () => {
  const url = `/api/packages?order=ASC&page=1&take=10`;
  // console.log('url------------------', url);
  const res = await api(baseUrl, url, {}, 'GET', true, false);
  // console.log('res-------------++++++++', res);
  return res;
};

export const getPakageById = async id => {
  const url = `/api/packages/${id}`;
  console.log('url---ssss---------------', url);
  const res = await api(baseUrl, url, {}, 'GET', true, false);
  // console.log('res-------------++++++++', res);
  return res;
};
export const deleteEventbyId = async id => {
  const url = `/api/events/${id}`;
  // console.log('🚀 ~ deleteeventby iidd', url);
  const res = await api(baseUrl, url, {}, 'DELETE', true, false);
  // console.log('res.....', res);
  return res;
};
export const getEventCategoryByUserId = async (id, page, take, filter) => {
  const url = `/api/events/categorize/byUserId/${id}?order=DESC&page=${page}&take=${take}&filter=${filter}`;
  const res = await api(baseUrl, url, {}, 'GET', true, false);
  return res;
};
