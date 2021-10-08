import React from 'react';
import { func } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './styles.module.css';

import { setPlayerInRanking } from '../../utils/localStorage';

import Header from '../Game/components/Header';

class Feedback extends React.Component {
  feedbackInfos() {
    const minimunAssertions = 3;
    const state = JSON.parse(localStorage.getItem('state'));
    const { player: { score, assertions } } = state;
    return (
      <section>
        <span className={ styles.title }>Feedback</span>
        <p data-testid="feedback-text" className={ styles.title2 }>
          {assertions < minimunAssertions ? 'Podia ser melhor :(' : 'Mandou bem! '}
        </p>
        <p className={ styles.score }>
          Pontuação Final:
          <span data-testid="feedback-total-score">
            { score }
          </span>
        </p>
        <p className={ styles.score }>
          Número de acertos:
          <span data-testid="feedback-total-question">
            { assertions }
          </span>
        </p>
      </section>
    );
  }

  buttonPlayAgain(dispatchReset) {
    return (
      <Link onClick={ dispatchReset } to="/">
        <button
          type="button"
          data-testid="btn-play-again"
          className="btn-primary"
        >
          Jogar Novamente
        </button>
      </Link>
    );
  }

  buttonRanking() {
    return (
      <Link to="/ranking">
        <button
          type="button"
          data-testid="btn-ranking"
          className="btn-primary"
        >
          Ver Ranking
        </button>
      </Link>
    );
  }

  render() {
    const { dispatchReset } = this.props;
    setPlayerInRanking();

    return (
      <section>
        <Header />
        <div className={ styles.container }>
          {this.feedbackInfos()}
          <div className={ styles.container2 }>
            {this.buttonPlayAgain(dispatchReset)}
            {this.buttonRanking()}
          </div>
        </div>
      </section>
    );
  }
}

Feedback.propTypes = {
  dispatchReset: func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchReset: () => dispatch({ type: 'RESET_GAME' }),
});

export default connect(null, mapDispatchToProps)(Feedback);
