import './MovieCard.css';
import React from 'react';


const MoviesCard = ({
    movie: {
        saved, url, image, name, alt, duration, durationName, disliked, id
    }, onMovieSave, data
}) => {
    const handleClick = () => {
        onMovieSave(body);
    };
    console.log(data, "data")
    const [body, setMovieData] = React.useState({
        country: data.country.substring(0, 29) || 'Нет данных',
        director: data.director.substring(0, 29) || 'Нет данных',
        duration: data.duration || 0,
        year: data.year || 'Нет данных',
        description: data.description.substring(0, 299) || 'Нет данных',
        image: image,
        trailer: url,
        nameRU: data.nameRU.substring(0, 29) || 'Нет данных',
        nameEN: data.nameEN.substring(0, 29) || 'Нет данных',
        movieId: data.id,
        thumbnail: image
    })


    const getDurationText = (duration) => {
        const hour = 60;

        let durationName = '';
        if (duration <= hour) {
            durationName = `${duration}м`;
        } else if (duration === hour) {
            durationName = '1ч';
        } else {
            const hours = Math.floor(duration / hour);
            const minutes = duration - hours * hour;

            durationName = `${hours}ч ${minutes}м`;
        }

        return durationName;
    };



    return (
        <li className="movies__item">

            <a
                href={url}
                className="movies__link"
                target="_blank"
                rel="noreferrer"
            >
                <img
                    src={data.image}
                    alt={data.alt}
                    className="movies__image"
                />
            </a>
            <h2 className="movies__title">{data.nameRU}</h2>

            <button
                type="button"
                aria-label={!saved ? 'Сохранить фильм' : 'Удалить из сохраненных'}
                className={`movies__button-favorite 
            ${saved ? 'movies__button-favorite_delete' : ''}
            ${disliked ? 'movies__button-dislike' : ''}

            `}
                onClick={handleClick}
            />

            <time dateTime={duration} className="movies__duration">{getDurationText(duration)}</time>
        </li>
    );
}



export default MoviesCard;
