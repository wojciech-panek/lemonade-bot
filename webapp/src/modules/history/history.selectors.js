import { createSelector } from 'reselect';
import { prop } from 'ramda';

export const selectHistoryDomain = prop('history');

export const selectHistoryIsLoading = createSelector(
  selectHistoryDomain,
  prop('isLoading')
);

export const selectHistoryDeletedCount = createSelector(
  selectHistoryDomain,
  prop('deletedCount')
);

export const selectHistoryError = createSelector(
  selectHistoryDomain,
  prop('error')
);
