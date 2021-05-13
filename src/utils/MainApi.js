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
    };
  }

  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
      headers: this.getHeader(),
    }).then(this._getResponseData);
  }

  signIn(email, password) {
    return fetch(`${this._baseAuthUrl}/signin`, {
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

  signUp(email, password) {
    return fetch(`${this._baseAuthUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
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

  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
      headers: this.getHeader(),
    }).then(this._getResponseData);
  }
}

const yandexApi = new Api({
  baseUrl: "http://api.movie-for-day.nomoredomains.club",
  headers: {
    "Content-Type": "application/json",
  },
});

export default yandexApi;
