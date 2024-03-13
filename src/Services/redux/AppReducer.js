import {createSlice} from '@reduxjs/toolkit';
import {initialState} from './initialState';
export const AppSlice = createSlice({
  name: 'AppReducer',
  initialState,
  reducers: {
    showLoader: (state, action) => {
      state.loader = action.payload;
    },
    eventToOccur: (state, action) => {
      state.eventText = action.payload;
    },
    scrollEvent: (state, action) => {
      state.scrollPoints = action.payload;
    },
    setLoggedUserData: (state, action) => {
      state.userData = {...state.userData, ...action.payload};
    },
    setConferenceId: (state, action) => {
      state.conferenceId = action.payload;
    },
    setNewSessionsCount: (state, action) => {
      state.newSessionsCount = {...state.newSessionsCount, ...action.payload};
    },
    setNotificationOppend: (state, action) => {
      state.notificationOppend = action.payload;
    },
    setSelectedCirclesData: (state, action) => {
      state.selectedCirclesData = action.payload;
    },
    setLocalEnvironment: (state, action) => {
      state.localEnvironment = action.payload;
    },
    setLocalLang: (state, action) => {
      state.localLang = action.payload;
    },
    setDeeplinkData: (state, action) => {
      state.deeplinkData = {...state.deeplinkData, ...action.payload};
    },
    setNotificationData: (state, action) => {
      state.notificationData = {...state.notificationData, ...action.payload};
    },
    setOpportunitiesFilterData: (state, action) => {
      state.opportunitiesFilterData = {
        ...state.opportunitiesFilterData,
        ...action.payload,
      };
    },
    setBuildersFilterData: (state, action) => {
      state.buildersFilterData = {
        ...state.buildersFilterData,
        ...action.payload,
      };
    },
    setBuildersSnapshotFilterData: (state, action) => {
      state.buildersSnapshotFilterData = {
        ...state.buildersSnapshotFilterData,
        ...action.payload,
      };
    },
    setBuildersTableFilterData: (state, action) => {
      state.buildersTableFilterData = {
        ...state.buildersTableFilterData,
        ...action.payload,
      };
    },
    setSessionEventFilterData: (state, action) => {
      state.sessionEventFilterData = {
        ...state.sessionEventFilterData,
        ...action.payload,
      };
    },
    setPreviousLocation: (state, action) => {
      state.previousLocation = action.payload;
    },
    setMaximizedVideo: (state, action) => {
      state.maximizedVideo = {...state.maximizedVideo, ...action.payload};
    },
    setConferenceStarted: (state, action) => {
      state.conferenceStarted = action.payload;
    },
    setIncomingCallStatus: (state, action) => {
      state.incomingCallStatus = action.payload;
    },
  },
});
export const {
  showLoader,
  scrollEvent,
  eventToOccur,
  setLocalLang,
  setDeeplinkData,
  setConferenceId,
  setMaximizedVideo,
  setLoggedUserData,
  setPreviousLocation,
  setNotificationData,
  setLocalEnvironment,
  setNewSessionsCount,
  setConferenceStarted,
  setIncomingCallStatus,
  setBuildersFilterData,
  setNotificationOppend,
  setSelectedCirclesData,
  setSessionEventFilterData,
  setOpportunitiesFilterData,
  setBuildersTableFilterData,
  setBuildersSnapshotFilterData,
} = AppSlice.actions;
export default AppSlice.reducer;
