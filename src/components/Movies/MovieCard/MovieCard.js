import "./MovieCard.css";
import React from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

const MoviesCard = ({
  movie: { saved, url, image, name, alt, duration, durationName, disliked, id },
  onMovieSave,
  onMovieDelete,
  data,
  savedBlock,
  isMovieAdded,
  savedMovies,
}) => {
  const currentUser = React.useContext(CurrentUserContext);

  const isAdded = isMovieAdded(data);
  const handleClick = () => {
    if (!isAddedCard) {
      onMovieSave(body);
      setIsAddedCard(true);
    } else if (savedBlock) {
      onMovieSave(body);
      setIsAddedCard(false);
    } else {
      console.log(isAdded, "isAdded");
      data.movieId = savedMovies.find(
        (savedMovie) => savedMovie.movieId === data.id
      )._id;
      console.log("data", data);
      onMovieDelete(data);
      setIsAddedCard(false);
    }
  };
  //   console.log(currentUser._id);
  const [isAddedCard, setIsAddedCard] = React.useState(false);

  React.useEffect(() => {
    if (!savedBlock && savedMovies?.length > 0) {
      if (!isAddedCard) {
        setIsAddedCard(
          savedMovies.some((savedMovie) => savedMovie.movieId === data.id)
        );
      } else {
        setIsAddedCard(false);
      }
    }
  }, []);

  const [body, setMovieData] = React.useState({
    country: "Нет данных",
    director: data.director.substring(0, 29) || "Нет данных",
    duration: data.duration || 0,
    year: data.year || "Нет данных",
    description: data.description.substring(0, 299) || "Нет данных",
    image: image,
    trailer: url,
    nameRU: data.nameRU.substring(0, 29) || "Нет данных",
    nameEN: "Нет данных",
    movieId: data._id || data.id,
    thumbnail: image,
  });

  const getDurationText = (duration) => {
    const hour = 60;

    let durationName = "";
    if (duration <= hour) {
      durationName = `${duration}м`;
    } else if (duration === hour) {
      durationName = "1ч";
    } else {
      const hours = Math.floor(duration / hour);
      const minutes = duration - hours * hour;

      durationName = `${hours}ч ${minutes}м`;
    }

    return durationName;
  };

  return (
    <li key={data._id} className="movies__item">
      <a href={url} className="movies__link" target="_blank" rel="noreferrer">
        <img src={data.image} alt={data.alt} className="movies__image" />
      </a>
      <h2 className="movies__title">{data.nameRU}</h2>

      <button
        type="button"
        aria-label={!saved ? "Сохранить фильм" : "Удалить из сохраненных"}
        className={`movies__button-favorite 
                ${isAddedCard && !savedBlock ? "movies__button-dislike" : ""}
                ${savedBlock ? "movies__button-favorite_delete" : ""}
            

            `}
        onClick={handleClick}
      />

      <time dateTime={duration} className="movies__duration">
        {getDurationText(duration)}
      </time>
    </li>
  );
};

export default MoviesCard;
