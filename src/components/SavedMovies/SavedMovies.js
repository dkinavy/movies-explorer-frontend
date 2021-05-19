import React, { useState, useEffect } from 'react';

import MoviesCardList from './../Movies/MovieCardList/MovieCardList';
import SearchForm from './../Movies/Search/Search';
import ButtonMore from './../Movies/ButtonMore/ButtonMore';
import Preloader from '../Preloader/Preloader';
const SavedMovies = ({ isMovieAdded, savedBlock, savedMovies, saved, queryFilters, onMovieSave, onSearch, moviesFiltered, isLoading }) => {

    // console.log("saved", savedMovies)
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
                movies={filterIsOn ? filterShortFilm(savedMovies) : savedMovies}
                onMovieSave={onMovieSave}
                savedBlock={savedBlock}
                isLoading={isLoading}
                isMovieAdded={isMovieAdded}
            />



        </main>
    );
};


export default SavedMovies;
