// https://api.nomoreparties.co/beatfilm-movies
/**
 * Url api
 * @type {string}
 */

const apiBaseUrl = 'https://api.nomoreparties.co';
const badStatus = (statusRes, statusMust) => `Не верный статус ответа (${statusRes} != ${statusMust})`;

/**
 * Класс для работы с api сервера базы фильмов
 * Результат ответа зависит от запросов или сообщение об ошибке
 */
class MoviesApi {
    /**
       * Создать Api
       * @param {object} config - Данные (baseUrl - url сервера, headers - заголовки)
       */
    constructor(config) {
        this.baseUrl = config.baseUrl;
        this.headers = new Headers(config.headers);
        this.headerWithContentType = new Headers(config.headers);
        this.headerWithContentType.append('Content-Type', 'application/json');
    }

    /**
       * Получение списка фильмов
       * Нужна авторизация
       * @returns {Promise} - Промис объект с массивом фильмов
       */
    getInitialMovies() {
        return fetch(`${this.baseUrl}/beatfilm-movies`, {
            headers: this.headers,
        }).then((res) => MoviesApi.checkStatus(res, 200));
    }

    /**
       * Функция сравнивания статуса ответа
       * @param res - необработанные данные с сервера
       * @param status - статус который ожидается
       * @returns {Promise} - данные json формате или сообщение об ошибке
       */
    static checkStatus(res, status) {
        if (res.status === status) {
            return res.json();
        }

        throw new Error(badStatus(res.status, status));
    }
}

export default new MoviesApi({
    baseUrl: apiBaseUrl,
    headers: {
        Accept: 'application/json',
    },
});
