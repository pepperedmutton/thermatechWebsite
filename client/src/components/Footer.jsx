import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import logo from '../assets/images/logo.jpg';
import { useI18n, buildLocalizedPath as buildPathHelper } from '../i18n/i18n';

export default function Footer() {
  const { locale, t } = useI18n();
  const links = [
    { to: '/products#contact-diagnostics', label: t('common.footer.links.contactDiagnostics') },
    { to: '/products#non-contact-diagnostics', label: t('common.footer.links.opticalDiagnostics') },
    { to: '/products#ion-sources', label: t('common.footer.links.ionSources') },
    { to: '/products#thrust-measurement', label: t('common.footer.links.thrust') },
    { to: '/products#services', label: t('common.footer.links.services') },
  ];
  const contacts = [
    t('common.footer.contact.address'),
    t('common.footer.contact.email'),
    t('common.footer.contact.hotline'),
    t('common.footer.contact.postcode'),
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        
        <div className={styles.footerColumn}>
          <img src={logo} alt={t('common.brand.short')} className={styles.logo} />
          <h3 className={styles.companyName}>{t('common.footer.companyName')}</h3>
          <p className={styles.companySlogan}>{t('common.footer.companyTagline')}</p>
          
        </div>

        <div className={styles.footerColumn}>
          <h4 className={styles.columnTitle}>
            <Link
              to={buildPathHelper(locale, '/products')}
              onClick={() => { window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); }}
            >
              {t('common.footer.products')}
            </Link>
          </h4>
          <ul className={styles.linkList}>
            {links.map((item) => (
              <li key={item.to}><Link to={buildPathHelper(locale, item.to)}>{item.label}</Link></li>
            ))}
          </ul>
        </div>

        <div className={styles.footerColumn}>
          <h4 className={styles.columnTitle}>{t('common.footer.contactTitle')}</h4>
          <ul className={styles.linkList}>
            {contacts.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>

      </div>

      <div className={styles.footerBottomBar}>
        <nav className={styles.bottomLinks}>
          <Link to={buildPathHelper(locale, '/')}>{t('common.footer.bottom.home')}</Link>
          <span>|</span>
          <Link to={buildPathHelper(locale, '/about')}>{t('common.footer.bottom.about')}</Link>
          <span>|</span>
          <Link to={buildPathHelper(locale, '/products')}>{t('common.footer.bottom.products')}</Link>
          <span>|</span>
          <Link to={buildPathHelper(locale, '/news')}>{t('common.footer.bottom.news')}</Link>
          <span>|</span>
          <Link to={buildPathHelper(locale, '/join')}>{t('common.footer.bottom.join')}</Link>
          <span>|</span>
          <Link to={buildPathHelper(locale, '/contact')}>{t('common.footer.bottom.contact')}</Link>
          <span>|</span>
          <Link to={buildPathHelper(locale, '/sitemap')}>{t('common.footer.bottom.sitemap')}</Link>
        </nav>
        <p className={styles.copyright}>
          {t('common.footer.copyright')}
        </p>
        <p className={styles.icp}>
          <a href="https://beian.miit.gov.cn" target="_blank" rel="noreferrer">{t('common.footer.icp')}</a>
        </p>
      </div>
    </footer>
  );
}
