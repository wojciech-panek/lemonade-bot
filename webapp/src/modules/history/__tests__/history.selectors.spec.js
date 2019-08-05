import { expect } from 'chai';
import Immutable from 'seamless-immutable';

import { selectHistoryDomain } from '../history.selectors';

describe('History: selectors', () => {
  const state = Immutable({
    history: {},
  });

  describe('selectHistoryDomain', () => {
    it('should select a domain', () => {
      expect(selectHistoryDomain(state)).to.equal(state.history);
    });
  });
});
