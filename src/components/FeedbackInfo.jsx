import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    const { score, assertions } = this.props;
    return (
      <div className="feedback-sub-content">
        <div>
          <span data-testid="feedback-total-score">
            { `You got ${score} questions right` }
          </span>
        </div>
        <div>
          <span data-testid="feedback-total-question">
            { `Total ${assertions} points` }
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
