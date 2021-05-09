import './AboutProject.css';
import React from 'react';

const AboutProject = () => (
    <section className="about-project">
        <h2 className="about-project__name">О проекте</h2>
        <div className="about-project__descriptions">
            <div className="about-project__description">
                <h3 className="about-project__description-heading">
                    Дипломный проект включал 5 этапов
        </h3>
                <p className="about-project__description-text">
                    Составление плана, работу над бэкендом, вёрстку, добавление
                    функциональности и финальные доработки.
        </p>
            </div>
            <div className="about-project__description">
                <h3 className="about-project__description-heading">
                    На выполнение диплома ушло 5 недель
        </h3>
                <p className="about-project__description-text">
                    У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
                    соблюдать, чтобы успешно защититься.
        </p>
            </div>
        </div>
        <ul className="about-project__timelines">
            <li className="about-project__timeline">
                <p className="about-project__timeline-heading about-project_timeline_green">
                    1 неделя
        </p>
                <p className="about-project__timeline-heading about-project_timeline_grey">
                    4 недели
        </p>
            </li>
            <li className="about-project__timeline-description">
                <p className="about-project__timeline-description-text">
                    Back-end
        </p>
                <p className="about-project__timeline-description-text">
                    Front-end
        </p>
            </li>
        </ul>
    </section>
);

export default AboutProject;
