import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from '../components/Input';
import Button from '../components/Button';
import fetchToken from '../helpers/fetch';
import {
  ACTION_LOGIN_SAVED,
  ACTION_RESET_PLAYER,
} from '../redux/actions/index';

class Login extends Component {
  state = {
    name: '',
    gravatarEmail: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    ACTION_RESET_PLAYER(dispatch);
  }

  handleChange = ({ target: { id, value } }) => {
    this.setState({
      [id]: value,
    });
  };

  handleClick = async () => {
    const { history, dispatch } = this.props;
    const url = 'https://opentdb.com/api_token.php?command=request';
    const tokenFetch = await fetchToken(url);
    localStorage.setItem('objToken', JSON.stringify(tokenFetch));
    localStorage.setItem('token', tokenFetch.token);
    dispatch(ACTION_LOGIN_SAVED(this.state));
    history.push('/game');
  };

  render() {
    const { name, gravatarEmail } = this.state;
    const { history } = this.props;
    return (
      <>
        <Input
          type="text"
          labelName="Nome: "
          id="name"
          testId="input-player-name"
          placeholder="Digite seu nome"
          value={ name }
          handleInput={ this.handleChange }
        />
        <Input
          type="email"
          labelName="Email: "
          id="gravatarEmail"
          testId="input-gravatar-email"
          placeholder="ada@lovelace.com"
          value={ gravatarEmail }
          handleInput={ this.handleChange }
        />
        <Button
          testId="btn-play"
          btnLabel="Play"
          isDisabled={ !(name.length > 0 && gravatarEmail.length > 0) }
          handleButton={ this.handleClick }
        />
        <Button
          testId="btn-settings"
          btnLabel="Settings"
          handleButton={ () => history.push('/settings') }
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Login);
