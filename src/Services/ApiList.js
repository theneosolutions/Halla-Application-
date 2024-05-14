import api from './Api';

const baseUrl = 'https://halla.sa';

export const GOOGLE_MAPS_APIKEY = 'AIzaSyAFZBGvY2p25djzXAG-0p3vq42SzGw9WxQ';

const makeApiRequest = async (url, data, method, token = false, isFormData = false) => {
  try {
    const response = await api(baseUrl, url, data, method, token, isFormData);
    console.log("🚀 ~ makeApiRequest ~ response:", response);

    // Check if the response contains an error object
    if (response.error) {
      // If error object exists, throw the error object
      throw response.error
    }

    // If no error object, return response data
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ makeApiRequest ~ error:", error);

    // Check if error is an object with a status code
    if (error.statusCode && error.message) {
      throw error;
    }

    // If error object does not have a status code, throw a generic error
    throw new Error("An error occurred while making the API request");
  }
};



export const signUp = async data => makeApiRequest('/api/auth/sign-up', data, 'POST');
export const loginWithGoogle = async idToken => makeApiRequest('/api/auth/google', { idToken }, 'POST');
export const signUpPhoneNu = async data => makeApiRequest('/api/auth/sign-up/phone', data, 'POST');
export const signInEmail = async data => makeApiRequest('/api/auth/sign-in', data, 'POST');
export const signInPhone = async data => makeApiRequest('/api/auth/sign-in/phone', data, 'POST');
export const confirmEmail = async data => makeApiRequest('/api/auth/forgot-password', data, 'POST');
export const resetPass = async data => makeApiRequest('/api/auth/reset-password', data, 'POST');
export const updatePass = async data => makeApiRequest('/api/auth/update-password', data, 'POST', true);
export const otpVerify = async data => makeApiRequest('/api/auth/otp/verify', data, 'POST');
export const otpResend = async data => makeApiRequest('/api/auth/otp/resend', data, 'POST');
export const imageLink = async data => makeApiRequest('/api/events/upload-event-image', data, 'POST', true, true);
export const createEventInfo = async data => makeApiRequest('/api/events', data, 'POST', true);
export const editEventInfo = async (id, data) => makeApiRequest(`/api/events/${id}`, data, 'PATCH', true);
export const createCardInfo = async data => makeApiRequest('/api/cards/create-card', data, 'POST', true);
export const getCardInfo = async () => makeApiRequest('/api/cards?order=ASC&page=1&take=10', {}, 'GET', true);
export const getEventWithUserId = async (user, page = 1, take = 100) => makeApiRequest(`/api/events/byUserId/${user}?order=DESC&page=${page}&take=${take}`, {}, 'GET', true);
export const getEventBySearch = async (search, user) => makeApiRequest(`/api/events/byUserId/${user}?search=${search}`, {}, 'GET', true);
export const getEventDetailInfo = async (status, eventId) => makeApiRequest(`/api/events/get-contact-list/${eventId}?status=${status}`, {}, 'GET', true);
export const getEventCategorywithid = async id => makeApiRequest(`/api/events/categorize/byUserId/${id}?order=DESC&page=1&take=100&filter=monthly`, {}, 'GET', true);
export const getProfileWithUserId = async id => makeApiRequest(`/api/users/${id}`, {}, 'GET', true);
export const setUserProfileData = async data => makeApiRequest('/api/users', data, 'PATCH', true);
export const setProfileDataUsername = async data => makeApiRequest('/api/users/username', data, 'PATCH', true);
export const eventId = async id => makeApiRequest(`/api/events/${id}`, {}, 'GET', true);
export const addEventGuests = async (event, data) => makeApiRequest(`/api/events/addGuests/${event}`, data, 'POST', true);
export const sendInvites = async id => makeApiRequest(`/api/events/send-invites/${id}`, {}, 'POST', true);
export const addGuestById = async (id, data) => makeApiRequest(`/api/events/addGuests/${id}`, data, 'POST', true);
export const guestListById = async id => makeApiRequest(`/api/events/guestlist/${id}?order=DESC&page=1&take=100`, {}, 'GET', true);
export const removeContactById = async (eventId, contactId) => makeApiRequest(`/api/events/remove/guest/${eventId}/${contactId}`, {}, 'DELETE', true);
export const getPackage = async () => makeApiRequest('/api/packages?order=ASC&page=1&take=10', {}, 'GET', true);
export const getPackageById = async id => makeApiRequest(`/api/packages/${id}`, {}, 'GET', true);
export const deleteEventById = async id => makeApiRequest(`/api/events/${id}`, {}, 'DELETE', true);
export const getEventCategoryByUserId = async (id, page, take, filter) => makeApiRequest(`/api/events/categorize/byUserId/${id}?order=DESC&page=${page}&take=${take}&filter=${filter}`, {}, 'GET', true);
export const getEventUserChat = async (userId, eventId) => makeApiRequest(`/api/events/chats/user/${userId}/event/${eventId}`, {}, 'GET', true);
