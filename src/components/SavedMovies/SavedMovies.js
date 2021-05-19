import React, { useState, useEffect } from 'react';

import MoviesCardList from './../Movies/MovieCardList/MovieCardList';
import SearchForm from './../Movies/Search/Search';
import ButtonMore from './../Movies/ButtonMore/ButtonMore';
import Preloader from '../Preloader/Preloader';
const SavedMovies = ({ isMovieAdded, savedBlock, savedMovies, saved, queryFilters, onMovieSave, onSearch, moviesFiltered, isLoading }) => {

    // console.log("saved", savedMovies)


    return (
        <main className="movies">
            <SearchForm
                queryFilters={queryFilters}
                onSearch={onSearch} />
            {isLoading && <Preloader />}

            <MoviesCardList
                movies={savedMovies}
                onMovieSave={onMovieSave}
                savedBlock={savedBlock}
                isLoading={isLoading}
                isMovieAdded={isMovieAdded}
            />



        </main>
    );
};


export default SavedMovies;
