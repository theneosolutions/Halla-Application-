// import createSagaMiddleware from 'redux-saga';
// import {createStore, applyMiddleware} from 'redux';
// import {combinedReducers} from './reducers';
// import rootSaga from './saga';
// const sagaMiddleware = createSagaMiddleware();
// const middlewares = [sagaMiddleware];
// export const store = createStore(
//   combinedReducers,
//   applyMiddleware(...middlewares),
// );
// sagaMiddleware.run(rootSaga);

import {configureStore} from '@reduxjs/toolkit';
import AppReducer from './AppReducer';
// import thunk from 'redux-thunk';
// import RootReducer from './RootReducer';
// const middleware = [thunk];
export const store = configureStore({
  reducer: {
    appReducer: AppReducer,
  },
  // reducer: RootReducer,
  // middleware,
});
