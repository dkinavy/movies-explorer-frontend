// http://api.movie-for-day.nomoredomains.club/

// ?const baseUrl = process.env.DIPLOM_URL || 'http://localhost:3000';

class Api {
  constructor(options) {
    // тело конструктора
    this.options = options;
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // Если есть ответ, то возвращает json, иначе статус ошибки
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  // Отдает заголовок с токеном для мотодов под регой
  getHeader() {
    const token = localStorage.getItem("jwt");
    return {
      ...this._headers,
      Authorization: `Bearer ${token}`,
      //   credentials: "include",
    };
  }

  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
      method: "GET",
      headers: this.getHeader(),
    }).then(this._getResponseData);
  }

  signIn(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    })
      .then(this._getResponseData)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return data;
        } else {
          return;
        }
      });
  }

  signUp(username, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: username,
        password: password,
        email: email,
      }),
    })
      .then(this._getResponseData)
      .then((data) => {
        if (data) {
          return data;
        } else {
          return;
        }
      });
  }
  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this.getHeader(),
    })
      .then(this._getResponseData)
      .then((data) => data);
  }

  getInitialMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',

      headers: this.getHeader(),
      credentials: 'include',
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    });
  }
  static async checkStatus(res, status) {
    if (res.status === status) {
      return res.json();
    }

    const { message } = await res.json();

    const error = new Error(message);
    error.status = res.status;

    throw error;
  }

  saveMovie(data, token) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this.getHeader(),
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    });
  };

  getSavedMovies(token) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: this.getHeader()

    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    });
  };





}




const mainApi = new Api({
  baseUrl: "https://api.movie-for-day.nomoredomains.club",
  headers: {
    "Content-Type": "application/json",
  },
});

export default mainApi;
