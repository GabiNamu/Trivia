import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import FeedbackInfo from '../components/FeedbackInfo';
import '../styles/Feedback.css';

const three = 3;

class Feedbacks extends Component {
  render() {
    const { assertions } = this.props;
    return (
      <div className="feedback-container">
        <Header />
        <div className="feedback-content">
          <h1 data-testid="feedback-text">
            {assertions < three ? 'Could be better...' : 'Well Done!'}
          </h1>
          <FeedbackInfo />
        </div>
        <div className="feedback-button-container">
          <Link to="/">
            <Button
              buttonClassCss="button-play-again"
              testId="btn-play-again"
              btnLabel="Play Again"
            />
          </Link>
          <Link to="/ranking">
            <Button
              className="button-ranking"
              testId="btn-ranking"
              btnLabel="Ranking"
              buttonClassCss="button-ranking"
            />
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  // score: state.player.score,
});

Feedbacks.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedbacks);
