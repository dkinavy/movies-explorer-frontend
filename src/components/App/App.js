import "./App.css";
import React, { useState } from "react";

import Main from "./../Main/Main";
import Header from "./../Main/Header/Header";
import Footer from "./..//Main/Footer/Footer";
import Movies from "./..//Movies/Movies";
import Auth from "./../Auth/Auth";

import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import Login from "./..//Auth/Login/Login";
import Register from "./../Auth/Register/Register";
import Profile from "./../Auth/Profile/Profile";
import Err404 from "./../404/Err404";

import mainApi from "../../utils/MainApi";

function App() {
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [currentUser, setCurrentUser] = useState({});

  const history = useHistory();

  React.useEffect(() => {
    mainApi.getUserInfo().then((data) => {
      setCurrentUser(data);
    });
  }, [isLoggedIn]);

  function onSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/signin");
  }
  function handleClearMessages() {
    setApiError("");
  }
  // const handleReg = (email, password) => {
  //   mainApi
  //     .signUp(email, password)
  //     .then((data) => {
  //       localStorage.setItem('jwt', data.data.token);
  //       setLoggedIn(true);
  //       setAuthResStatus(data.status);
  //       history.push('/movies');
  //     })
  //     .catch((err) => {
  //       setTooltipInfo({
  //         isOpen: true,
  //         icon: errorIcon,
  //         text: "Что-то пошло не так! Попробуйте ещё раз",
  //       });
  //     });
  // };

  const handleReg = (username, email, password) => {
    setIsLoading(true);

    mainApi
      .signUp(username, email, password)
      .then(() => {
        mainApi
          .signIn(email, password)
          .then(() => {
            setLoggedIn(true);
            setCurrentUser({
              name: username,
              email: email,
            });
            history.push("/movies");
          })
          .catch((err) => {
            setApiError("Что-то пошло не так...");
            console.log(err);
          });
      })
      .catch((err) => {
        setApiError("Похоже что такая почта уже зарегистрирована..");
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="App">
      <Route strict path="/(|movies|saved-movies|profile)">
        <Header />
      </Route>
      <Route exact path="/">
        <Main />
      </Route>
      <Route exact strict path="/movies">
        <Movies />
      </Route>
      <Route exact strict path="/saved-movies">
        <Movies saved />
      </Route>

      <Route exact strict path="/signin">
        <Auth title="Рады видеть!">
          <Login />
        </Auth>
      </Route>
      <Route exact strict path="/signup">
        <Auth title="Добро пожаловать!">
          <Register
            onRegister={handleReg}
            isLoading={isLoading}
            onError={apiError}
            onClearMessages={handleClearMessages}
          />
        </Auth>
      </Route>
      <Route exact strict path="/profile">
        <Profile name="Денис" email="dvk@ya.ru" />
      </Route>
      <Route exact strict path="/404">
        <Err404 />
      </Route>
      <Route exact strict path="/(|movies|saved-movies)">
        <Footer />
      </Route>
    </div>
  );
}

export default App;
