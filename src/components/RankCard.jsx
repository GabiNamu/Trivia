import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RankCard extends Component {
  render() {
    const {
      rank: {
        name,
        score,
        gravatar,
      },
      nameTestId,
      scoreTestId,
    } = this.props;

    return (
      <li className="li-card-ranking">
        <div className="li-card-ranking-container">
          <img
            className="li-card-ranking-image"
            src={ `${gravatar}` }
            alt={ `${name}'s foto` }
          />
          <p
            data-testid={ nameTestId }
          >
            {name}
          </p>
        </div>
        <div className="li-card-ranking-score">
          <p
            data-testid={ scoreTestId }
          >
            {`${score} points`}
          </p>
        </div>
      </li>
    );
  }
}

RankCard.propTypes = {
  nameTestId: PropTypes.string.isRequired,
  scoreTestId: PropTypes.string.isRequired,
  rank: PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    gravatar: PropTypes.string.isRequired,
  }).isRequired,
};

export default RankCard;
