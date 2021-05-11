import './Portfolio.css';
import React from 'react';

const Portfolio = () => (
    <section className="portfolio">
        <p className="portfolio__title">Портфолио</p>
        <nav>
            <ul className="portfolio__sites">
                <li className="portfolio__site">
                    <a
                        href="https://github.com/"
                        className="portfolio__site-link"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Статичный сайт
          </a>
                </li>
                <li className="portfolio__site">
                    <a
                        href="https://github.com/"
                        className="portfolio__site-link"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Адаптивный сайт
          </a>
                </li>
                <li className="portfolio__site">
                    <a
                        href="https://github.com/"
                        className="portfolio__site-link"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Одностраничное приложение
          </a>
                </li>
            </ul>
        </nav>
    </section>
);

export default Portfolio;
