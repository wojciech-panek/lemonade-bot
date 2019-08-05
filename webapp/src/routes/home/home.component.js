import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import giphyApi from 'giphy-api';
import { HashLoader } from 'react-spinners';

import messages from './home.messages';
import { renderWhenNotNil, renderWhenTrue } from '../../shared/utils/rendering';
import {
  Container,
  BackgroundOverlay,
  Content,
  GiphyImage,
  Input,
  Button,
  Form,
  FormSummary,
  SuccessMessage,
  ErrorMessage,
} from './home.styles';

export class Home extends PureComponent {
  static propTypes = {
    intl: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    deletedCount: PropTypes.number,
    clearHistory: PropTypes.func.isRequired,
  };

  state = {
    password: '',
    giphyImage: null,
  };

  componentDidMount() {
    this.giphy
      .random({
        tag: 'cleaning',
        rating: 'g',
        fmt: 'json',
      })
      .then(res => {
        this.setState({ giphyImage: res.data.image_url });
      });
  }

  giphy = giphyApi({
    apiKey: process.env.REACT_APP_GIPHY_KEY,
    https: true,
  });

  handleSubmit = e => {
    e.preventDefault();

    this.setState({ password: '' });
    this.props.clearHistory(this.state.password);
  };

  handleChange = e => this.setState({ password: e.target.value });

  renderImage = renderWhenNotNil(() => <GiphyImage src={this.state.giphyImage} />);

  renderLoader = renderWhenTrue(() => <HashLoader loading color={'#fada5e'} size={50} />);

  renderDeletedCount = renderWhenNotNil(() => (
    <SuccessMessage>Cleared messages: {this.props.deletedCount}</SuccessMessage>
  ));

  renderError = renderWhenTrue(() => <ErrorMessage>Oops! Incorrect password or server error</ErrorMessage>);

  render() {
    return (
      <Container>
        <Helmet title={this.props.intl.formatMessage(messages.pageTitle)} />
        <BackgroundOverlay />

        <Content>
          {this.renderImage(this.state.giphyImage)}

          <Form onSubmit={this.handleSubmit}>
            <Input type="password" placeholder="PASSWORD" value={this.state.password} onChange={this.handleChange} />
            <Button type="submit">Clear</Button>

            <FormSummary>
              {this.renderLoader(this.props.isLoading)}
              {this.renderDeletedCount(this.props.deletedCount)}
              {this.renderError(this.props.error)}
            </FormSummary>
          </Form>
        </Content>
      </Container>
    );
  }
}
