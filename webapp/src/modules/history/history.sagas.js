import { all, put, takeLatest } from 'redux-saga/effects';
import reportError from '../../shared/utils/reportError';
import api from '../../shared/services/api';

import { HistoryTypes, HistoryActions } from './history.redux';

export function* clear({ password }) {
  try {
    const { data } = yield api.post('/clear-history', { password });

    yield put(HistoryActions.clearSuccess(data.deleted));
  } catch (error) {
    yield put(HistoryActions.clearError());

    if (!error.response) {
      /* istanbul ignore next */
      reportError(error);
    }
  }
}

export function* watchHistory() {
  yield all([takeLatest(HistoryTypes.CLEAR, clear)]);
}
