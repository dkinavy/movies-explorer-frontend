import "./App.css";
import React, { useState } from "react";

import Main from "./../Main/Main";
import Header from "./../Main/Header/Header";
import Footer from "./..//Main/Footer/Footer";
import Movies from "./..//Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import CurrentUserContext from "../context/CurrentUserContext";

import Auth from "./../Auth/Auth";

import {
  Route,
  Switch,
  useHistory,
  Redirect,
  useLocation,
} from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Login from "./..//Auth/Login/Login";
import Register from "./../Auth/Register/Register";
import Profile from "./../Auth/Profile/Profile";
import Err404 from "./../404/Err404";

import mainApi from "../../utils/MainApi";
import MoviesApi from "../../utils/MoviesApi";

import searchFilter from "../../utils/searchFilter";

function App() {
  ////////////////////////////
  const [movies, setMovies] = useState([]);
  const [moviesFiltered, setMoviesFiltered] = useState([]);
  const [isMoviesFiltered, setIsMoviesFiltered] = useState(false);
  // const [moviesSaved, setMoviesSaved] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isNoMoviesFound, setIsNoMoviesFound] = React.useState(false);
  const [isNoSavedMoviesFound, setIsNoSavedMoviesFound] = React.useState(false);
  const [foundSavedMoviesData, setFoundSavedMoviesData] = React.useState([]);
  const [moviesData, setMoviesData] = React.useState([]);
  const [isSavedMoviesEmpty, setIsSavedMoviesEmpty] = React.useState(false);
  const [isLoadingMoviesData, setIsLoadingMoviesData] = React.useState(false);
  const [loadingError, setLoadingError] = React.useState("");

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [getSavedMoviesResStatus, setGetSavedMoviesResStatus] =
    React.useState(null);

  const [currentUser, setCurrentUser] = useState({});
  const [queryFilters, setQueryFilters] = useState({
    query: "",
    shortFilms: false,
  });

  const [editIsSuccess, setEditIsSuccess] = React.useState(false);
  const [editIsFailed, setEditIsFailed] = React.useState(false);

  function isMovieAdded(movie) {
    if (savedMovies) return savedMovies.find((item) => item.id === movie.id);
    else return false;
  }

  const history = useHistory();
  const location = useLocation();

  const getCurrentUser = () => {
    const token = localStorage.getItem("jwt");
    mainApi
      .getUserInfo(token)
      .then((userData) => {
        if (userData) {
          setCurrentUser(userData);
          localStorage.setItem("currentUser", JSON.stringify(userData));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  React.useEffect(() => {
    const path = location.pathname;
    const token = localStorage.getItem("jwt");
    if (token) {
      mainApi
        .checkToken(token)
        .then((res) => {
          console.log("проверили токен", res);
          if (res) {
            setLoggedIn(true);
            getCurrentUser();
            //setCurrentUser(res);
            getSavedMovies();

            setSavedMovies(JSON.parse(localStorage.getItem("savedMovies")));
            setMoviesFiltered(
              JSON.parse(localStorage.getItem("filtered-previously-movies"))
            );
            localStorage.setItem("currentUser", JSON.stringify(res));
            history.push(path);
          }
        })
        .catch((err) => {
          console.error(err);
          localStorage.removeItem("jwt");
          history.push("/");
        });
    }
  }, []);
  // React.useEffect(() => {
  //   handleTokenCheck();
  // }, []);

  // function handleTokenCheck() {
  //   const jwt = localStorage.getItem("jwt");
  //   if (jwt) {
  //     mainApi.checkToken(jwt).then(() => {
  //       setLoggedIn(true);

  //       history.push("/movies");
  //     });
  //   }
  // }
  //////////////////////////////////////////////////////////////

  // React.useEffect(() => {
  //   if (isLoggedIn) {

  //     mainApi.getUserInfo().then((data) => {
  //       setCurrentUser(data);

  //     });
  //     setLoggedIn(true);
  //     getSavedMovies();
  //     console.log('test')
  //   }
  // }, [isLoggedIn]);
  /////////////////////////////////////////////////////////////////////////////////
  // const location = useLocation();
  // React.useEffect(() => {
  //   setQueryFilters({ query: '', shortFilms: false });
  // }, [location]);

  ///////////////////////////////
  React.useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);
      Promise.all([
        mainApi.getUserInfo(),
        MoviesApi.getInitialMovies(),
        mainApi.getInitialMovies(),
      ])
        .then(([{ name, email }, items, savedItems]) => {
          // setCurrentUser({
          //   name,
          //   email,
          // });

          localStorage.setItem(
            "user",
            JSON.stringify({
              name,
              email,
            })
          );

          localStorage.setItem(
            "movies",
            JSON.stringify(
              items.reduce((acc, i) => {
                if (
                  !i.id ||
                  !i.image ||
                  !i.nameRU ||
                  !i.duration ||
                  !i.trailerLink
                ) {
                  return acc;
                }

                return [
                  ...acc,
                  Object.assign(i, {
                    alt: i.nameRU.replace(/"/g, ""),
                    name: i.nameRU,
                    url: i.trailerLink,
                    image: `https://api.nomoreparties.co${i.image.url}`,
                  }),
                ];
              }, [])
            )
          );

          getSavedMovies();

          setSavedMovies(JSON.parse(localStorage.getItem("savedMovies")));
        })
        .catch((err) => {
          if (err.status !== 401) {
            //setIsErrorApiMovies(true);
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [isLoggedIn]);

  const getSavedMovies = () => {
    mainApi
      .getSavedMovies()
      .then((data) => {
        console.log("data", data);
        const savedArray = data.cards.map((item) => ({
          ...item,
          id: item.movieId,
        }));
        console.log(savedArray);
        localStorage.setItem("savedMovies", JSON.stringify(savedArray));

        setSavedMovies(savedArray);
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("savedMovies");
        setLoadingError(
          "Во время запроса произошла ошибка. " +
            "Возможно, проблема с соединением или сервер недоступен. " +
            "Подождите немного и попробуйте ещё раз"
        );
      });
  };

  const markAsSaved = (foundMoviesArr) => {
    const initialSavedMoviesIdsArr = getInitialSavedMoviesIds();
    foundMoviesArr.forEach((foundMovie) => {
      console.log(foundMovie.id);
      foundMovie.saved = initialSavedMoviesIdsArr.some(
        (savedMovieId) => savedMovieId === foundMovie.id
      );
    });

    foundSavedMoviesData.forEach((savedMovie) => {
      foundMoviesArr.forEach((foundMovie) => {
        if (foundMovie._id === savedMovie.movieId) {
          foundMovie._id = savedMovie._id;
        }
      });
    });
    return foundMoviesArr;
  };

  const getInitialSavedMoviesIds = () => {
    const initialSavedMoviesIds = [];

    foundSavedMoviesData.forEach((savedMovie) => {
      initialSavedMoviesIds.push(savedMovie.movieId);
    });

    return initialSavedMoviesIds;
  };

  const handleSearchMoviesData = (searchQueries = {}) => {
    setIsLoading(true);
    setTimeout(() => {
      const localMoviesData = JSON.parse(localStorage.getItem("movies"));
      if (localMoviesData) {
        const filteredMovies = searchFilter(searchQueries, localMoviesData);
        // console.log(searchQueries)
        // console.log(filteredMovies)
        if (filteredMovies.length === 0) {
          setIsNoMoviesFound(true);
        } else {
          setIsNoMoviesFound(false);
        }

        localStorage.setItem(
          "filtered-previously-movies",
          JSON.stringify(markAsSaved(filteredMovies))
        );
        setMoviesFiltered(markAsSaved(filteredMovies));
        setMoviesData(markAsSaved(filteredMovies));
      }
      setIsLoading(false);
    }, 600);
  };

  function handleMoreMovies() {
    startPreloader(() =>
      setMovies(
        moviesFiltered.slice(0, movies.length + getCountCardsRow(movies.length))
      )
    );
  }

  function filterMovies({ inputMovies, inputMoviesSaved, query, shortFilms }) {
    return inputMovies.reduce((acc, item) => {
      if (inputMoviesSaved) {
        Object.assign(item, {
          saved: inputMoviesSaved.some(
            (itemSaved) => itemSaved.movieId === item.id
          ),
        });
      }

      if (
        ((query && item.nameRU.toLowerCase().indexOf(query) !== -1) ||
          !query) &&
        (!shortFilms || (shortFilms && item.duration <= 40))
      ) {
        return [...acc, item];
      }

      return acc;
    }, []);
  }

  function startPreloader(callback) {
    setIsLoading(true);
    setTimeout(async () => {
      setIsLoading(false);
      callback();
    }, 500);
  }

  function getCountCardsRow(moviesViewedSum) {
    let cardsRow = 3;
    if (window.innerWidth < 500) {
      cardsRow = 1;
    } else if (window.innerWidth < 768) {
      if (moviesViewedSum % 2) {
        cardsRow = 3;
      } else {
        cardsRow = 2;
      }
    } else if (moviesViewedSum % 3) {
      cardsRow = 4;
    }

    return cardsRow;
  }

  ///////////////////////////////////////////////////////

  function onSignOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("movies");
    localStorage.removeItem("savedMovies");
    localStorage.removeItem("filtered-previously-movies");
    setLoggedIn(false);
    history.push("/signin");
  }
  function handleClearMessages() {
    setApiError("");
  }

  const handleSaveMovie = (movie) => {
    const localMoviesSaved = JSON.parse(localStorage.getItem("savedMovies"));
    const movieSaved = localMoviesSaved.filter((i) => i.id === movie.id)[0];
    if (movieSaved) {
      DeleteSavedMovie(movie);
    } else {
      SaveMovie(movie);
    }
  };

  const SaveMovie = (data) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      mainApi
        .saveMovie(data, token)
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          handleSearchSavedMoviesData();
        });
    } else {
      history.push("/signin");
    }
  };

  const DeleteSavedMovie = (id) => {
    const token = localStorage.getItem("jwt");

    if (token) {
      mainApi
        .deleteMovie(id.movieId)
        .then((res) => {
          markAsUnsaved(id);
          getSavedMovies();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          const isAfterDelete = true;
          handleSearchSavedMoviesData(isAfterDelete);
        });
    }
  };

  const handleSearchSavedMoviesData = (
    searchQueries = {},
    isAfterDelete = false
  ) => {
    setIsLoading(true);
    setTimeout(() => {
      // const localMoviesData = JSON.parse(localStorage.getItem('movies'));
      // if (localMoviesData) {
      //   const filteredMovies = searchFilter(searchQueries, localMoviesData);
      //   // console.log(searchQueries)
      //   // console.log(filteredMovies)
      //   if (filteredMovies.length === 0) {
      //     setIsNoMoviesFound(true);
      //   } else {
      //     setIsNoMoviesFound(false);
      //   }

      //   localStorage.setItem('filtered-previously-movies', JSON.stringify(markAsSaved(filteredMovies)));

      //   setMoviesData(markAsSaved(filteredMovies));

      const token = localStorage.getItem("jwt");

      if (token) {
        mainApi
          .getSavedMovies(token)
          .then((res) => {
            setGetSavedMoviesResStatus(res.status);

            if (res.cards.length === 0) {
              setIsSavedMoviesEmpty(true);
              setFoundSavedMoviesData(res.cards);
              return;
            } else {
              setIsSavedMoviesEmpty(false);
            }

            const savedMoviesData = res.cards;

            const filteredSavedMovies = searchFilter(
              searchQueries,
              savedMoviesData
            );

            if (filteredSavedMovies.length === 0) {
              setIsNoSavedMoviesFound(true);
            } else {
              setIsNoSavedMoviesFound(false);
            }
            setFoundSavedMoviesData(filteredSavedMovies);
            setSavedMovies(filteredSavedMovies);
            console.log("res", res);
            console.log("foundSavedMoviesData", foundSavedMoviesData);
          })
          .catch((err) => {
            console.log(err);
          });
      }

      setIsLoading(false);
    }, 600);
  };

  const markAsUnsaved = (id) => {
    moviesData.forEach((movie) => {
      if (movie.saved) {
        if (movie._id === id) {
          delete movie.saved;
          delete movie._id;
        }
      }
    });
  };

  function handleLogin(email, password) {
    // setIsLoading(true);

    mainApi
      .signIn(email, password)
      .then(() => {
        setLoggedIn(true);
        mainApi
          .getUserInfo()
          .then((data) => {
            // setCurrentUser(
            //   {
            //     name: data.name,
            //     email: data.email
            //   }
            // );
            //console.log("ffvdfvfdvd", currentUser)
            history.push("/movies");
            setLoggedIn(true);
          })
          .catch(() => {
            setApiError("Что-то пошло не так...");
          });
      })
      .catch((err) => {
        setApiError("Что-то пошло не так...");
      })
      .finally(() => setIsLoading(false));
  }

  const handleReg = (username, email, password) => {
    setIsLoading(true);

    mainApi
      .signUp(username, email, password)
      .then(() => {
        mainApi
          .signIn(email, password)
          .then(() => {
            setLoggedIn(true);
            // setCurrentUser({
            //   name: username,
            //   email: email,
            // });
            history.push("/movies");
          })
          .catch((err) => {
            setApiError("Что-то пошло не так...");
            //console.log(err);
          });
      })
      .catch((err) => {
        setApiError("Похоже что такая почта уже зарегистрирована..");
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };
  const changeProfileData = (name, email) => {
    // const { name, email } = newUserData;
    mainApi
      .saveUserInfo(name, email)
      .then((data) => {
        setCurrentUser({ name, email });
        setEditIsSuccess(true);
        setEditIsFailed(false);
        setTimeout(() => {
          setEditIsSuccess(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setEditIsFailed(true);
        setTimeout(() => {
          setEditIsFailed(false);
        }, 3000);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Route
          strict
          exact
          path={["/", "/movies", "/saved-movies", "/profile"]}
        >
          <Header isLoggedIn={isLoggedIn} />
        </Route>

        <Switch>
          <Route exact strict path="/">
            <Main />
          </Route>

          <ProtectedRoute
            exact
            path="/movies"
            isLoggedIn={isLoggedIn}
            component={Movies}
            moviesFiltered={moviesFiltered}
            moreMovies={handleMoreMovies}
            onSearch={handleSearchMoviesData}
            isMoviesFiltered={isMoviesFiltered}
            movies={moviesFiltered}
            savedMovies={savedMovies}
            queryFilters={queryFilters}
            isNoMoviesFound={isNoMoviesFound}
            onMovieSave={handleSaveMovie}
            onMovieDelete={DeleteSavedMovie}
            savedBlock={false}
            onSubmit={handleSearchMoviesData}
            moviesData={markAsSaved(moviesData)}
            isMovieAdded={isMovieAdded}
            isLoading={isLoading}
          ></ProtectedRoute>

          <ProtectedRoute
            exact
            path="/saved-movies"
            isLoggedIn={isLoggedIn}
            isSavedMoviesEmpty={isSavedMoviesEmpty}
            component={SavedMovies}
            isLoadingData={isLoadingMoviesData}
            isNoSavedMoviesFound={isNoSavedMoviesFound}
            savedMovies={savedMovies}
            onSearch={handleSearchSavedMoviesData}
            isLoading={isLoading}
            // onDeleteSavedMovie={handleDeleteSavedMovie}
            getSavedMoviesResStatus={getSavedMoviesResStatus}
            isMovieAdded={isMovieAdded}
            savedBlock={true}
            onMovieSave={DeleteSavedMovie}
          ></ProtectedRoute>
          <ProtectedRoute
            exact
            path="/profile"
            isLoggedIn={isLoggedIn}
            component={Profile}
            changeUserInfo={changeProfileData}
            logOutHandler={onSignOut}
            editIsSuccess={editIsSuccess}
            editIsFailed={editIsFailed}
            currentUser={currentUser}
          />
          <Route exact strict path="/signin">
            {!isLoggedIn && (
              <Auth title="Рады видеть!">
                <Login
                  onLogin={handleLogin}
                  onError={apiError}
                  onClearMessages={handleClearMessages}
                />
              </Auth>
            )}
            {isLoggedIn && <Redirect to="/movies" />}
          </Route>

          <Route exact strict path="/signup">
            {!isLoggedIn && (
              <Auth title="Добро пожаловать!">
                <Register
                  onRegister={handleReg}
                  isLoading={isLoading}
                  onError={apiError}
                  onClearMessages={handleClearMessages}
                />
              </Auth>
            )}
            {isLoggedIn && <Redirect to="/movies" />}
          </Route>

          <Route>
            <Err404 />
          </Route>
        </Switch>

        <Route exact strict path={["/", "/movies", "/saved-movies"]}>
          <Footer />
        </Route>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
