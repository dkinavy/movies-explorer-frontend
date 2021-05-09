import './App.css';
import Main from './../Main/Main';
import Header from './../Main/Header/Header';
import Footer from './..//Main/Footer/Footer';
import Movies from './..//Movies/Movies';
import Auth from './../Auth/Auth'
import { Route } from 'react-router';
import Login from './..//Auth/Login/Login'
import Register from './../Auth/Register/Register';
import Profile from './../Auth/Profile/Profile';
import Err404 from './../404/Err404';

function App() {
  return (
    <div className="App">
      <Route strict path="/(|movies|saved-movies|profile)">
        <Header />
      </Route>
      <Route
        exact
        path="/"
      >
        <Main />
      </Route>
      <Route
        exact
        strict
        path="/movies"
      >
        <Movies />
      </Route>
      <Route
        exact
        strict
        path="/saved-movies"
      >
        <Movies saved />
      </Route>


      <Route exact strict path="/signin">
        <Auth
          title="Рады видеть!"
        >
          <Login />
        </Auth>
      </Route>
      <Route exact strict path="/signup">
        <Auth
          title="Добро пожаловать!"
        >
          <Register />
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
