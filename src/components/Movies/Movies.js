import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import image from '../../images/movie.png';
import MoviesCardList from './MovieCardList/MovieCardList';
import SearchForm from './Search/Search';
import ButtonMore from './ButtonMore/ButtonMore';
import Preloader from '../Preloader/Preloader';

const Movies = ({ moreMovies, isLoading, isMovieAdded, savedBlock, movies, saved, queryFilters, onMovieSave, onMovieDelete, onSearch, moviesFiltered }) => {

    const [filterIsOn, setFilterIsOn] = useState(false);

    const onFilterClick = () => {
        setFilterIsOn(!filterIsOn);
    };


    const filterShortFilm = (moviesToFilter) => moviesToFilter.filter((item) => item.duration < 40);


    return (
        <main className="movies">
            <SearchForm
                queryFilters={queryFilters}
                onSearch={onSearch}
                onFilterClick={onFilterClick} />

            {isLoading && <Preloader />}
            <MoviesCardList

                movies={filterIsOn ? filterShortFilm(movies) : movies}
                onMovieSave={onMovieSave}
                onMovieDelete={onMovieDelete}

                savedBlock={savedBlock}
                isMovieAdded={isMovieAdded}
            />



        </main>
    );
};


export default Movies;
