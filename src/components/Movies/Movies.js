import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import image from '../../images/movie.png';
import MoviesCardList from './MovieCardList/MovieCardList';
import SearchForm from './Search/Search';
import ButtonMore from './ButtonMore/ButtonMore';

const Movies = ({ saved }) => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const data = {
            saved,
            url: 'http://youtube.com',
            image,
            title: 'Пи Джей Харви: A dog  f fd dffd fdddddddd ',
            alt: 'Рудбой',
            duration: '1h 42m',
        };


        const moviesArray = [];
        for (let i = 1; i <= 12; i += 1) {
            if (i === 1) moviesArray.push({ disliked: true, ...data, id: i });
            else { moviesArray.push({ ...data, id: i }); }

        }

        setMovies(moviesArray);
    }, [saved]);


    return (
        <main className="movies">
            <SearchForm />
            <MoviesCardList
                movies={movies}
            />

            <ButtonMore
                arialLabel="Показать больше фильмов"
            >
                Еще
      </ButtonMore>

        </main>
    );
};

Movies.propTypes = {
    saved: PropTypes.bool,
    disliked: PropTypes.bool,
};

Movies.defaultProps = {
    saved: false,
    disliked: false,
};

export default Movies;
