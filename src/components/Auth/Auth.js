import React from 'react';

import './Auth.css';

import Logo from '../Main/Logo/Logo';

const Auth = ({ title, children }) => (
    <main className="auth">
        <Logo
            link="/"
            name="Каталог фильмов"
        />
        <h2 className="auth__title">{title}</h2>
        {children}
    </main>
);

export default Auth;
