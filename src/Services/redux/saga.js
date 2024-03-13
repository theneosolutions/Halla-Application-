import {put, takeLatest, delay} from 'redux-saga/effects';
import * as actions from '../container/action';

function* increase({payload}) {
  console.log('INCREASE_REQUE', payload);
  try {
    yield put(actions.increaseSuccess(payload));
  } catch (e) {
    yield put(actions.increaseFailed());
  }
}

function* homeSaga() {
  yield takeLatest(actions.increaseRequest, increase);
}

export default homeSaga;
