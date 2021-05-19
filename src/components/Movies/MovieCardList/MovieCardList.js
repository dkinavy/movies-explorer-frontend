import './MovieCardList.css';
import React from 'react';

import PropTypes from 'prop-types';

import MoviesCard from '../MovieCard/MovieCard';

function MoviesCardList({ movies, onMovieSave }) {
    const [currentCount, setCurrentCount] = React.useState(0);
    const [extraRow, setExtraRow] = React.useState(3);
    const [moviesToRender, setMoviesToRender] = React.useState([]);
    const getCount = (windowSize) => {
        if (windowSize >= 1280) {
            return { first: 8, extra: 4 };
        } if (windowSize > 320 && windowSize <= 760) {
            return { first: 6, extra: 2 };
        }
        return { first: 5, extra: 5 };
    };

    const renderExtraRow = () => {
        const count = Math.min(movies.length, currentCount + extraRow);
        const extraMovies = movies.slice(currentCount, count);
        setMoviesToRender([...moviesToRender, ...extraMovies]);
        setCurrentCount(count);
    };

    const resizeHandler = () => {
        const windowSize = window.innerWidth;
        setExtraRow(getCount(windowSize));
    };

    React.useEffect(() => {
        window.addEventListener('resize', resizeHandler);

        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    React.useEffect(() => {
        const windowSize = window.innerWidth;
        setExtraRow(getCount(windowSize).extra);
        const count = Math.min(movies.length, getCount(windowSize).first);
        setMoviesToRender(movies.slice(0, count));
        setCurrentCount(count);
    }, [movies]);

    const renderMore = () => renderExtraRow();

    console.log("moviesToRender", moviesToRender);
    return (<ul className="movies-card-list">
        {moviesToRender.map((item) => (
            <MoviesCard
                onMovieSave={onMovieSave}
                key={item.id}
                movie={item}
                data={item}
            />
        ))}
    </ul>)
}

MoviesCardList.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MoviesCardList;
