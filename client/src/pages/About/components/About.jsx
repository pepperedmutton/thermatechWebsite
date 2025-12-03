// src/components/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n, buildLocalizedPath } from '../../../i18n/i18n';

export default function About() {
  const { t, locale } = useI18n();

  return (
    <div className="container about-container">
      <h1>
        {t('about.hero.title')} <span className="subtitle">{t('about.hero.subtitle')}</span>
      </h1>
      <div className="about-intro">
        <p>{t('about.intro.paragraph1')}</p>
        <p>{t('about.intro.paragraph2')}</p>
      </div>

      <div className="about-metrics">
        <span className="about-pill">{t('about.metrics.0')}</span>
        <span className="about-pill">{t('about.metrics.1')}</span>
        <span className="about-pill">{t('about.metrics.2')}</span>
        <span className="about-pill">{t('about.metrics.3')}</span>
        <span className="about-pill">{t('about.metrics.4')}</span>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <h3>{t('about.cards.tech.title')}</h3>
          <ul>
            <li>{t('about.cards.tech.item1')}</li>
            <li>{t('about.cards.tech.item2')}</li>
            <li>{t('about.cards.tech.item3')}</li>
            <li>{t('about.cards.tech.item4')}</li>
            <li>{t('about.cards.tech.item5')}</li>
          </ul>
        </div>
        <div className="about-card">
          <h3>{t('about.cards.experience.title')}</h3>
          <ul>
            <li>{t('about.cards.experience.item1')}</li>
            <li>{t('about.cards.experience.item2')}</li>
            <li>{t('about.cards.experience.item3')}</li>
            <li>{t('about.cards.experience.item4')}</li>
          </ul>
        </div>
        <div className="about-card">
          <h3>{t('about.cards.service.title')}</h3>
          <ul>
            <li>{t('about.cards.service.item1')}</li>
            <li>{t('about.cards.service.item2')}</li>
            <li>{t('about.cards.service.item3')}</li>
            <li>{t('about.cards.service.item4')}</li>
          </ul>
        </div>
      </div>

      <div className="about-cta">
        <h3>{t('about.mission.title')}</h3>
        <p>{t('about.mission.body')}</p>
        <Link to={buildLocalizedPath(locale, '/contact')} className="btn-primary">
          {t('about.cta.contact')}
        </Link>
      </div>
    </div>
  );
}
