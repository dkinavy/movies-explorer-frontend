import './MovieCardList.css';
import React from 'react';

import PropTypes from 'prop-types';

import MoviesCard from '../MovieCard/MovieCard';

const MoviesCardList = ({ movies }) => (
    <ul className="movies-card-list">
        {movies.map((item) => (
            <MoviesCard
                key={item.id}
                movie={item}
            />
        ))}
    </ul>
);

MoviesCardList.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MoviesCardList;
