'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../i18n';
import './Nav.css';

const LANGUAGES = [
  { code: 'en' as const, label: 'EN' },
  { code: 'ru' as const, label: 'RU' },
  { code: 'uz' as const, label: 'UZ' },
];

function LangSwitcher({ variant }: { variant: 'desktop' | 'mobile' }) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const currentLang = (i18n.resolvedLanguage || 'ru').toUpperCase();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (code: 'en' | 'ru' | 'uz') => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <div className={`lang-selector-wrapper lang-selector-wrapper--${variant}`} ref={ref}>
      <button
        type="button"
        className={`lang-selector ${open ? 'active' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <img src={`/${currentLang.toLowerCase()}.png`} alt="" className="flag-icon" />
        <span>{currentLang}</span>
      </button>
      <ul className={`lang-dropdown ${open ? 'open' : ''}`} role="listbox">
        {LANGUAGES.map(({ code, label }) => (
          <li
            key={code}
            className={`lang-option ${currentLang === label ? 'selected' : ''}`}
            onClick={() => handleChange(code)}
            role="option"
            aria-selected={currentLang === label}
          >
            <img src={`/${code}.png`} alt="" className="flag-icon" />
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Nav() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage || 'ru';
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    let raf: number | null = null;
    const measure = () => {
      raf = null;
      setScrolled(window.scrollY > 20);
    };
    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(measure);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const links = [
    { href: '#home', label: t('hero.service') },
    { href: '#services', label: t('hero.work') },
    { href: '#work', label: t('hero.portfolioNav') },
    { href: '#about', label: t('hero.blog') },
    { href: '#contact', label: t('hero.about') },
  ];

  return (
    <>
      <header className={`nt-nav ${scrolled ? 'nt-nav--scrolled' : ''} ${revealed ? 'nt-nav--revealed' : ''}`}>
        <a href="#home" className="nt-nav-word">
          NEURO<span>TECH</span>
        </a>

        <nav className="nt-nav-links">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nt-nav-link">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nt-nav-actions">
          <LangSwitcher variant="desktop" />
        </div>

        <button
          type="button"
          className={`nt-burger ${menuOpen ? 'nt-burger--open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div className={`nt-menu-overlay ${menuOpen ? 'nt-menu-overlay--show' : ''}`} onClick={() => setMenuOpen(false)} />

      <aside className={`nt-menu-drawer ${menuOpen ? 'nt-menu-drawer--open' : ''}`}>
        <nav className="nt-mobile-links">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nt-mobile-link" onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>
        <LangSwitcher variant="mobile" />
      </aside>
    </>
  );
}
