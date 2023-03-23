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
import logo from '../styles/img/logo.png';
import '../styles/Login.css';

const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;

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
    return (
      <div className="login-container">
        <div className="login-logo">
          <img src={ logo } alt="logo" />
        </div>
        <div className="login">
          <Input
            type="text"
            labelName=""
            id="name"
            testId="input-player-name"
            placeholder="Qual é o seu nome?"
            value={ name }
            handleInput={ this.handleChange }
          />
          <Input
            type="email"
            labelName=""
            id="gravatarEmail"
            testId="input-gravatar-email"
            placeholder="Qual é o seu email do gravatar?"
            value={ gravatarEmail }
            handleInput={ this.handleChange }
          />
          <Button
            testId="btn-play"
            buttonClassCss="play"
            btnLabel="Play"
            isDisabled={ !(name.length > 0 && regex.test(gravatarEmail)) }
            handleButton={ this.handleClick }
          />
          {/* <Button
            testId="btn-settings"
            buttonClassCss="Settings"
            btnLabel="Settings"
            handleButton={ () => history.push('/settings') }
          /> */}
        </div>
      </div>
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
