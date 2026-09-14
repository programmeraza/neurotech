'use client';

import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { portfolioItems } from './portfolioData';
import './PortfolioSection.css';

export default function PortfolioSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const cases = root.querySelectorAll<HTMLElement>('.pf-case');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('pf-case--in-view');
        });
      },
      { threshold: 0.2 }
    );
    cases.forEach((c) => io.observe(c));

    const inners = root.querySelectorAll<HTMLElement>('.pf-visual-inner');
    let raf: number | null = null;
    const measure = () => {
      raf = null;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      inners.forEach((inner) => {
        const box = inner.parentElement!.getBoundingClientRect();
        const center = box.top + box.height / 2;
        const delta = (center - vh / 2) / vh;
        const px = Math.max(-16, Math.min(16, delta * 32));
        inner.style.transform = `translateY(${px.toFixed(1)}px)`;
      });
    };
    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(measure);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    measure();

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="pf-section" id="work" ref={sectionRef}>
      <div className="pf-head">
        <div className="pf-eyebrow">/ 03 — {t('portfolio.title')}</div>
        <h2 className="pf-heading">{t('portfolio.title')}</h2>
      </div>

      {portfolioItems.map((item, index) => {
        const category = t(`portfolio.cards.${item.id}.category`);
        const title = t(`portfolio.cards.${item.id}.title`);
        const subtitle = t(`portfolio.cards.${item.id}.subtitle`);
        const isRev = index % 2 === 1;

        return (
          <div className={`pf-case ${isRev ? 'pf-case--rev' : ''}`} key={item.id}>
            <div className="pf-visual">
              <div className="pf-visual-inner">
                <div className="pf-noise" />
                <div className="pf-num">
                  {String(index + 1).padStart(2, '0')}/{String(portfolioItems.length).padStart(2, '0')}
                </div>
                <div className="pf-logo-chip">
                  <img src={item.image} alt={title} loading="lazy" draggable={false} />
                </div>
              </div>
            </div>
            <div className="pf-text">
              <div className="pf-cat">{category}</div>
              <h3 className="pf-case-title">{title}</h3>
              <p className="pf-case-desc">{subtitle}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
