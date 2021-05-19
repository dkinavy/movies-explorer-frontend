import './Search.css';
import React, { useState, useEffect } from 'react';

import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

const SearchForm = ({ onSearch, queryFilters }) => {
    const [query, setQuery] = useState('');
    const [shortFilms, setShortFilms] = useState(false);
    // useEffect(() => {
    //     setQuery(queryFilters.query);
    //     setShortFilms(queryFilters.shortFilms);
    // }, [queryFilters]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (e.target.closest('form').checkValidity()) {
            onSearch({
                query,
                shortFilms,
            });
        }
    };
    const handleChange = (e) => {
        e.target.setCustomValidity('');
        setQuery(e.target.value);
    };

    const handleShortFilmsClick = ({ checked }) => {
        setShortFilms(checked);
        onSearch({
            query,
            shortFilms: checked,
        });
    };

    const handleFocus = (e) => {
        if (query.length === 0) {
            e.target.setCustomValidity('Нужно ввести ключевое слово');
        }
    };

    return (
        <section className="search-form">
            <form className="search-form__form" onSubmit={handleSubmit}>
                <div className="search-form__search">
                    <input
                        type="text"
                        className="search-form__input"
                        placeholder="Фильм"
                        minLength="1"
                        maxLength="100"
                        size="1"
                        required
                        value={query}
                        onFocus={handleFocus}
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        className="search-form__button"
                    >
                        Найти
        </button>
                </div>

            </form>
            <FilterCheckbox />
        </section>)
};

export default SearchForm;
