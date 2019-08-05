import { expect } from 'chai';
import Immutable from 'seamless-immutable';

import { reducer as historyReducer, HistoryActions, HistoryTypes } from '../history.redux';

describe('History: redux', () => {
  const state = Immutable({});

  describe('reducer', () => {
    it('should return initial state', () => {
      expect(historyReducer(undefined, {})).to.deep.equal(state);
    });

    it('should return state on unknown action', () => {
      expect(historyReducer(state, { type: 'unknown-action' })).to.deep.equal(state);
    });
  });
});
