import React, { useState, useEffect } from 'react';

import MoviesCardList from './../Movies/MovieCardList/MovieCardList';
import SearchForm from './../Movies/Search/Search';
import ButtonMore from './../Movies/ButtonMore/ButtonMore';

const SavedMovies = ({ savedMovies, saved, queryFilters, onMovieSave, onSearch, moviesFiltered }) => {

    console.log("saved", savedMovies)


    return (
        <main className="movies">
            <SearchForm
                queryFilters={queryFilters}
                onSearch={onSearch} />
            <MoviesCardList
                movies={savedMovies}
                onMovieSave={onMovieSave}
            />



        </main>
    );
};


export default SavedMovies;
