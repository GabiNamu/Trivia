import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import fetchToken from '../helpers/fetch';
import Button from '../components/Button';

const three = 3;

class Game extends Component {
  state = {
    questions: [],
    questionIndex: 0,
    answers: [],
    nextOn: false,
  };

  async componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const apiCheck = await fetchToken(url);
    if (apiCheck.response_code === three) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.setState({
        questions: apiCheck.results,
      }, this.handleShuffle);
    }
  }

  shuffleArray = (arr) => {
    const arr2 = [];
    arr.forEach((element) => {
      arr2.splice(Math.floor(Math.random() * arr.length), 0, element);
    });
    return arr2;
  };

  handleShuffle = () => {
    const { questions, questionIndex } = this.state;
    if (questions.length > 0) {
      const answers = this.shuffleArray([
        questions[questionIndex].correct_answer,
        ...questions[questionIndex].incorrect_answers,
      ]);
      this.setState({
        answers,
        correctAnswer: questions[questionIndex].correct_answer,
      });
    }
  };

  handleClick = () => {
    this.setState({
      nextOn: true,
    });
  };

  render() {
    const { questions, questionIndex, answers, correctAnswer, nextOn } = this.state;
    return (
      <div>
        <Header />
        <section>
          {
            questions.length > 0
              ? (
                <>
                  <h3
                    data-testid="question-category"
                  >
                    {
                      questions[questionIndex].category
                    }
                  </h3>
                  <h3
                    data-testid="question-text"
                  >
                    {
                      questions[questionIndex]
                        .question
                    }
                  </h3>
                  <section
                    data-testid="answer-options"
                  >
                    {
                      answers.map((each, index) => (
                        <Button
                          key={ each }
                          btnLabel={ each }
                          testId={
                            each === correctAnswer
                              ? 'correct-answer'
                              : `wrong-answer-${index}`
                          }
                          handleButton={ this.handleClick }
                        />
                      ))
                    }
                  </section>
                </>
              )
              : <h1>LOADING...</h1>
          }
        </section>
        {nextOn
          ? (
            <Button
              testId="btn-next"
              disabled={ this.enableButtonNext() }
              btnLabel="Next"
            />)
          : ''}

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questionsRedux: state.gamepage.questions,
  playerScore: state.login.score,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApiOfQuestionsRedux: (token) => dispatch(fetchApiOfQuestions(token)),
  savePlayerPointsRedux: (points) => dispatch(savePlayerPoints(points)),
  savePlayerAssertionsRedux: (assertions) => dispatch(savePlayerAssertions(assertions)),
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
