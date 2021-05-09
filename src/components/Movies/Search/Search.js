import './Search.css';
import React from 'react';

import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

const SearchForm = () => (
    <section className="search-form">
        <form className="search-form__form">
            <div className="search-form__search">
                <input
                    type="text"
                    className="search-form__input"
                    placeholder="Фильм"
                    minLength="1"
                    maxLength="100"
                    size="1"
                    required
                />
                <button
                    type="button"
                    className="search-form__button"
                >
                    Найти
        </button>
            </div>

        </form>
        <FilterCheckbox />
    </section>
);

export default SearchForm;
