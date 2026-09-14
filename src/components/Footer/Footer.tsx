'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaInstagram, FaTelegramPlane } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="ft-section">
      <div className="ft-eyebrow">/ 05 — NEUROTECH</div>

      <div className="ft-cols">
        <div className="ft-col">
          <p className="ft-lead">
            <b>{t('footer.cta.titlePart1')}</b>
            {t('footer.cta.titleHighlight1')}
          </p>
          <p>{t('footer.cta.titleHighlight2')}</p>
        </div>
        <div className="ft-col">
          <p>{t('footer.cta.titleHighlight3')}</p>
          <p>{t('footer.cta.titleHighlight4')}</p>
        </div>
      </div>

      <div className="ft-closer">
        <div className="ft-marquee-wrap">
          <div className="ft-marquee-track">
            <span className="ft-closer-word">NEUROTECH — NEUROTECH — </span>
            <span className="ft-closer-word">NEUROTECH — NEUROTECH — </span>
          </div>
        </div>
      </div>

      <div id="contact" className="ft-bottom">
        <div className="ft-bottom-col">
          <div className="ft-bottom-title">Соцсети</div>
          <div className="ft-social-row">
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="ft-social-icon">
              <FaInstagram />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="ft-social-icon">
              <FaTelegramPlane />
            </a>
          </div>
        </div>
        <div className="ft-bottom-col">
          <div className="ft-bottom-title">Адрес</div>
          <div>{t('footer.address')}</div>
        </div>
        <div className="ft-bottom-col">
          <div className="ft-bottom-title">Контакты</div>
          <a className="ft-contact-link" href="mailto:info@ntec.uz" target="_blank" rel="noopener noreferrer">
            info@ntec.uz
          </a>
          <a className="ft-contact-link" href="tel:+998949900007" target="_blank" rel="noopener noreferrer">
            {t('footer.phone')}
          </a>
        </div>
        <div className="ft-bottom-col">
          <div className="ft-bottom-title">Разработка</div>
          <div>{t('footer.designedBy')}</div>
        </div>
      </div>

      <div className="ft-copyright-row">
        <span>{t('footer.copyright')}.</span>
      </div>
    </footer>
  );
}
