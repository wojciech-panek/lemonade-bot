import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

export const { Types: HistoryTypes, Creators: HistoryActions } = createActions(
  {
    clear: ['password'],
    clearSuccess: ['deletedCount'],
    clearError: [],
  },
  { prefix: 'HISTORY/' }
);

export const INITIAL_STATE = new Immutable({
  isLoading: false,
  deletedCount: null,
  error: false,
});

export const clearHandler = state =>
  state.merge({
    isLoading: true,
    deletedCount: null,
    error: false,
  });

export const clearSuccessHandler = (state, { deletedCount }) =>
  state.merge({
    isLoading: false,
    deletedCount,
    error: false,
  });

export const clearErrorHandler = state =>
  state.merge({
    isLoading: false,
    deletedCount: null,
    error: true,
  });

export const reducer = createReducer(INITIAL_STATE, {
  [HistoryTypes.CLEAR]: clearHandler,
  [HistoryTypes.CLEAR_SUCCESS]: clearSuccessHandler,
  [HistoryTypes.CLEAR_ERROR]: clearErrorHandler,
});
