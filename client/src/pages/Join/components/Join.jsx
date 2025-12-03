// src/components/Join.jsx
import React from 'react';
import { useI18n } from '../../../i18n/i18n';

const HR_EMAIL = 'hr@starthermatech.com';

function renderWithEmail(template) {
  if (!template) return HR_EMAIL;
  const parts = template.split('{{email}}');
  if (parts.length === 1) return template;
  return (
    <>
      {parts[0]}
      <a href={`mailto:${HR_EMAIL}`}>{HR_EMAIL}</a>
      {parts.slice(1).join('')}
    </>
  );
}

export default function Join() {
  const { t } = useI18n();

  return (
    <div className="container join-container">
      <h2>{t('join.title')}</h2>
      <p>{t('join.intro')}</p>

      <div className="job-list">
        <div className="job-card">
          <div className="job-header">
            <h3>{t('join.jobs.plasma.title')}</h3>
            <span className="job-salary">{t('join.jobs.plasma.salary')}</span>
          </div>
          <p className="job-location">{t('join.jobs.plasma.location')}</p>
          <p className="job-tagline">{t('join.jobs.plasma.tagline')}</p>
          
          <div className="job-section">
            <h4>{t('join.jobs.plasma.work.title')}</h4>
            <ul>
              <li>{t('join.jobs.plasma.work.item1')}</li>
              <li>{t('join.jobs.plasma.work.item2')}</li>
              <li>{t('join.jobs.plasma.work.item3')}</li>
            </ul>
          </div>

          <div className="job-section">
            <h4>{t('join.jobs.plasma.require.title')}</h4>
            <ul>
              <li>{t('join.jobs.plasma.require.item1')}</li>
              <li>{t('join.jobs.plasma.require.item2')}</li>
              <li>{t('join.jobs.plasma.require.item3')}</li>
              <li>{t('join.jobs.plasma.require.item4')}</li>
              <li>{t('join.jobs.plasma.require.item5')}</li>
            </ul>
          </div>

          <div className="job-section">
            <h4>{t('join.jobs.plasma.prefer.title')}</h4>
            <ul>
              <li>{t('join.jobs.plasma.prefer.item1')}</li>
              <li>{t('join.jobs.plasma.prefer.item2')}</li>
              <li>{t('join.jobs.plasma.prefer.item3')}</li>
              <li>{t('join.jobs.plasma.prefer.item4')}</li>
            </ul>
          </div>

          <p className="job-keywords">
            {t('join.jobs.plasma.keywords')}
          </p>

          <p className="job-cta">
            {renderWithEmail(t('join.jobs.plasma.cta'))}
          </p>
        </div>

        <div className="job-card">
          <div className="job-header">
            <h3>{t('join.jobs.hardware.title')}</h3>
            <span className="job-salary">{t('join.jobs.hardware.salary')}</span>
          </div>
          <p className="job-location">{t('join.jobs.hardware.location')}</p>
          <p className="job-tagline">{t('join.jobs.hardware.tagline')}</p>
          
          <div className="job-section">
            <h4>{t('join.jobs.hardware.work.title')}</h4>
            <ul>
              <li>{t('join.jobs.hardware.work.item1')}</li>
              <li>{t('join.jobs.hardware.work.item2')}</li>
              <li>{t('join.jobs.hardware.work.item3')}</li>
              <li>{t('join.jobs.hardware.work.item4')}</li>
              <li>{t('join.jobs.hardware.work.item5')}</li>
            </ul>
          </div>

          <div className="job-section">
            <h4>{t('join.jobs.hardware.require.title')}</h4>
            <ul>
              <li>{t('join.jobs.hardware.require.item1')}</li>
              <li>{t('join.jobs.hardware.require.item2')}</li>
              <li>{t('join.jobs.hardware.require.item3')}</li>
              <li>{t('join.jobs.hardware.require.item4')}</li>
              <li>{t('join.jobs.hardware.require.item5')}</li>
              <li>{t('join.jobs.hardware.require.item6')}</li>
            </ul>
          </div>

          <div className="job-section">
            <h4>{t('join.jobs.hardware.prefer.title')}</h4>
            <ul>
              <li>{t('join.jobs.hardware.prefer.item1')}</li>
              <li>{t('join.jobs.hardware.prefer.item2')}</li>
              <li>{t('join.jobs.hardware.prefer.item3')}</li>
              <li>{t('join.jobs.hardware.prefer.item4')}</li>
              <li>{t('join.jobs.hardware.prefer.item5')}</li>
              <li>{t('join.jobs.hardware.prefer.item6')}</li>
            </ul>
          </div>

          <p className="job-keywords">
            {t('join.jobs.hardware.keywords')}
          </p>

          <p className="job-cta">
            {renderWithEmail(t('join.jobs.hardware.cta'))}
          </p>
        </div>
      </div>

      <a href="mailto:bd@starthermatech.com" className="btn-primary">{t('join.cta.send')}</a>
    </div>
  );
}
