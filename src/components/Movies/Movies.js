import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import image from '../../images/movie.png';
import MoviesCardList from './MovieCardList/MovieCardList';
import SearchForm from './Search/Search';
import ButtonMore from './ButtonMore/ButtonMore';

const Movies = ({ movies, saved, queryFilters, onMovieSave, onSearch, moviesFiltered }) => {

    const [setMovies, isLoading, moreMovies, , errLoadingMovies, isMoviesFiltered,
    ] = useState([]);


    return (
        <main className="movies">
            <SearchForm
                queryFilters={queryFilters}
                onSearch={onSearch} />
            <MoviesCardList
                movies={movies}
                onMovieSave={onMovieSave}
            />

            <ButtonMore
                arialLabel="Показать больше фильмов"
            >
                Еще
      </ButtonMore>

        </main>
    );
};


export default Movies;
