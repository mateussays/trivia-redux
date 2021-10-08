import React from 'react';
import { func } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './styles.module.css';

import { getRanking } from '../../utils/localStorage';

import CardList from './components/CardList';

function Ranking({ dispatchReset }) {
  const ranking = getRanking();

  return (
    <section className={ styles.container }>
      <h1 data-testid="ranking-title" className={ styles.title }>Ranking</h1>
      <ol className={ styles.list }>
        {
          ranking.map((player, index) => (
            <CardList key={ index } { ...player } position={ index + 1 } />
          ))
        }
      </ol>
      <Link
        data-testid="btn-go-home"
        onClick={ dispatchReset }
        to="/"
        className="btn-primary"
      >
        Jogar Novamente
      </Link>
    </section>
  );
}

Ranking.propTypes = {
  dispatchReset: func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchReset: () => dispatch({ type: 'RESET_GAME' }),
});

export default connect(null, mapDispatchToProps)(Ranking);
