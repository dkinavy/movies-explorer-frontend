import './Err404.css';
import React from 'react';

import { Link } from 'react-router-dom';

const Err404 = () => (
    <main className="error404">
        <div className="error404__info">
            <h2 className="error404__title">404</h2>
            <p className="error404__description">Страница не найдена</p>
        </div>
        <Link to="/" className="error404__link-back">Назад</Link>
    </main>
);


export default Err404;
