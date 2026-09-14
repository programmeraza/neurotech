'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../i18n';
import './HeroSection.css';

const BRAND_LOGOS = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png'];
// Each icon is tiny (62px) and the strip loops via a -50% translate, so one
// "set" needs to be wider than the widest realistic viewport on its own —
// otherwise the two concatenated copies together are still shorter than the
// screen and the belt just runs out into empty background instead of
// reading as an infinite loop. Repeating the 7 logos 5x comfortably covers
// ultra-wide desktop monitors; the array below is that one set, duplicated
// once more for the seamless wrap.
const BRAND_SET = Array.from({ length: 5 }, () => BRAND_LOGOS).flat();

export default function HeroSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section id="home" className="hero-root" ref={sectionRef}>
      <div className="hero-grid-bg" />
      <div className="hero-orbit hero-orbit--1" />
      <div className="hero-orbit hero-orbit--2" />

      <div className={`hero-inner ${revealed ? 'hero-inner--revealed' : ''}`}>
        <div className="hero-kicker">
          <span className="hero-kicker-dot" />
          NEUROTECH / AI &amp; IT
        </div>

        <h1 className="hero-title">{t('hero.titlePart1')}</h1>

        <p className="hero-subtitle">{t('hero.subtitle')}</p>

        <button
          type="button"
          className="hero-cta"
          onClick={() => window.dispatchEvent(new CustomEvent('open-consultation'))}
        >
          {t('hero.bookCall')}
        </button>
      </div>

      <div className="hero-scroll-cue" aria-hidden="true">
        <span className="hero-scroll-line" />
      </div>

      <div className="hero-brand-rail">
        <div className="hero-brand-track">
          {[...BRAND_SET, ...BRAND_SET].map((src, i) => (
            <img key={i} src={`/${src}`} alt="" className="hero-brand-logo" />
          ))}
        </div>
      </div>
    </section>
  );
}
