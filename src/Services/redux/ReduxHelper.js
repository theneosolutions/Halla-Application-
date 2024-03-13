import {useDispatch, useSelector} from 'react-redux';
import * as appActions from './AppReducer';
export const useAppSelector = () => useSelector(state => state.appReducer);
export const useAppDispatch = () => {
  const dispatch = useDispatch();
  // Create a function to generate dispatch functions
  const createDispatcher = action => data => dispatch(action(data));
  const actionsToDispatch = {
    dispatchEvent: appActions.eventToOccur,
    dispatchLocalLang: appActions.setLocalLang,
    dispatchUserData: appActions.setLoggedUserData,
    dispatchBrandName: appActions.setBrandName,
    dispatchBrandColors: appActions.setBrandColors,
    dispatchBrandLogo: appActions.setBrandLogo,
    dispatchBrandScreensList: appActions.setBrandScreensList,
    dispatchNotificationData: appActions.setNotificationData,
    dispatchNotificationOppend: appActions.setNotificationOppend,
  };
  // Use the createDispatcher function to generate the dispatch functions
  const dispatchers = {};
  for (const key in actionsToDispatch) {
    if (Object.prototype.hasOwnProperty.call(actionsToDispatch, key)) {
      dispatchers[key] = createDispatcher(actionsToDispatch[key]);
    }
  }
  return dispatchers;
};
