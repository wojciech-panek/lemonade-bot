import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { hot } from 'react-hot-loader';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { compose } from 'ramda';

import { Home } from './home.component';
import {
  HistoryActions,
  selectHistoryIsLoading,
  selectHistoryDeletedCount,
  selectHistoryError,
} from '../../modules/history';

const mapStateToProps = createStructuredSelector({
  isLoading: selectHistoryIsLoading,
  deletedCount: selectHistoryDeletedCount,
  error: selectHistoryError,
});

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      clearHistory: HistoryActions.clear,
    },
    dispatch
  );

export default compose(
  hot(module),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl,
  withRouter
)(Home);
