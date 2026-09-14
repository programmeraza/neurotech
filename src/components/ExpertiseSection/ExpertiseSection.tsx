'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './ExpertiseSection.css';

const CARD_KEYS = ['cloud', 'data', 'cyber', 'workplace', 'strategy', 'modern'];

// Opening/closing a row animates its height over ~0.4s (see .expertise-row-desc
// in the CSS) and shifts every row below it. A tap that lands mid-transition can
// hit whatever row has just moved under the finger, so taps are ignored until
// the current transition has settled — this must match that CSS duration.
const TRANSITION_MS = 420;

export default function ExpertiseSection() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);
  const [locked, setLocked] = useState(false);

  const handleToggle = (index: number, isOpen: boolean) => {
    if (locked) return;
    setLocked(true);
    setOpenIndex(isOpen ? -1 : index);
    setTimeout(() => setLocked(false), TRANSITION_MS);
  };

  return (
    <section className="expertise-section" id="services">
      <div className="expertise-head">
        <div className="expertise-eyebrow">/ 02 — {t('hero.work')}</div>
        <h2 className="expertise-heading">{t('expertise.title')}</h2>
        <div className="expertise-hint">Нажмите, чтобы раскрыть</div>
      </div>

      <div className={`expertise-list ${locked ? 'expertise-list--locked' : ''}`}>
        {CARD_KEYS.map((key, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={key}
              className={`expertise-row ${isOpen ? 'expertise-row--open' : ''}`}
            >
              <div
                className="expertise-row-head"
                onClick={() => handleToggle(index, isOpen)}
              >
                <span className="expertise-idx">{String(index + 1).padStart(2, '0')}</span>
                <span className="expertise-row-title">{t(`expertise.cards.${key}.title`)}</span>
                <span className="expertise-row-plus" aria-hidden="true">
                  <svg viewBox="0 0 24 24" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </div>
              <div className="expertise-row-desc">
                <p>{t(`expertise.cards.${key}.desc`)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
