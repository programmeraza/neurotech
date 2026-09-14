'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './StatsSection.css';

const STATS = [
  { key: 'satisfied', to: 30, decimals: 0, suffix: '+' },
  { key: 'retention', to: 90, decimals: 0, suffix: '%' },
  { key: 'rating', to: 4.7, decimals: 2, suffix: '' },
] as const;

function useCountUp(active: boolean, to: number, decimals: number, delay: number) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf: number;
    const timeout = setTimeout(() => {
      const duration = 1400;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(to * eased);
        if (t < 1) raf = requestAnimationFrame(tick);
        else setValue(to);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timeout);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [active, to, delay]);

  return decimals ? value.toFixed(decimals) : String(Math.round(value));
}

function StatItem({ to, decimals, suffix, active, delay, label }: {
  to: number;
  decimals: number;
  suffix: string;
  active: boolean;
  delay: number;
  label: string;
}) {
  const display = useCountUp(active, to, decimals, delay);
  return (
    <div className="stats-item">
      <div className="stats-number">
        <span>{display}</span>{suffix}
      </div>
      <p className="stats-label">{label}</p>
    </div>
  );
}

export default function StatsSection() {
  const { t } = useTranslation();
  const [active, setActive] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="stats-section" id="about" ref={sectionRef}>
      <div className="stats-bg-word" aria-hidden="true">029</div>
      <div className="stats-eyebrow">/ 04 — {t('stats.titlePart1')}</div>
      <h2 className="stats-heading">{t('stats.titlePart1')}</h2>

      <div className="stats-rail">
        {STATS.map((s, i) => (
          <StatItem
            key={s.key}
            to={s.to}
            decimals={s.decimals}
            suffix={s.suffix}
            active={active}
            delay={i * 150}
            label={t(`stats.${s.key}`)}
          />
        ))}
      </div>
    </section>
  );
}
