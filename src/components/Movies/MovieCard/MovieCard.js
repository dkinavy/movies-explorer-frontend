import './MovieCard.css';
import React from 'react';


const MoviesCard = ({
    movie: {
        saved, url, image, title, alt, duration, disliked
    },
}) => (
    <li className="movies__item">

        <a
            href={url}
            className="movies__link"
            target="_blank"
            rel="noreferrer"
        >
            <img
                src={image}
                alt={alt}
                className="movies__image"
            />
        </a>
        <h2 className="movies__title">{title}</h2>

        <button
            type="button"
            aria-label={!saved ? 'Сохранить фильм' : 'Удалить из сохраненных'}
            className={`movies__button-favorite 
            ${saved ? 'movies__button-favorite_delete' : ''}
            ${disliked ? 'movies__button-dislike' : ''}

            `}
        />

        <time dateTime={duration} className="movies__duration">{duration}</time>
    </li>
);



export default MoviesCard;
