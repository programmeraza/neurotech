'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './ConsultationModal.css';

export default function ConsultationModal() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [projectType, setProjectType] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const modalRef = useRef<HTMLDivElement>(null);

  const projectTypes = [
    { id: 'mobile', translationKey: 'modal.types.mobile', defaultLabel: 'Мобильное приложение' },
    { id: 'desktop', translationKey: 'modal.types.desktop', defaultLabel: 'Автоматизация бизнеса' },
    { id: 'web', translationKey: 'modal.types.web', defaultLabel: 'RAG архитектура' },
    { id: 'saas', translationKey: 'modal.types.saas', defaultLabel: 'SaaS решение' },
    { id: 'crm', translationKey: 'modal.types.crm', defaultLabel: 'CRM / ERP системы' },
    { id: 'ai', translationKey: 'modal.types.ai', defaultLabel: 'AI решение' },
    { id: 'other', translationKey: 'modal.types.other', defaultLabel: 'Другое' }
  ];

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setStatus('idle');
      document.body.style.overflow = 'hidden';
    };

    window.addEventListener('open-consultation', handleOpen);
    return () => {
      window.removeEventListener('open-consultation', handleOpen);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contact) {
      alert(t('modal.validationAlert'));
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, contact, projectType }),
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setContact('');
        setProjectType('');
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-window" ref={modalRef}>

        <button className="modal-close-btn" onClick={handleClose} aria-label="Close modal">
          <span className="close-line" />
          <span className="close-line" />
        </button>

        <div className="modal-header">
          <h2>{t('modal.title')}</h2>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">

          <div className="form-group">
            <label htmlFor="name">{t('modal.nameLabel')}</label>
            <input
              type="text"
              id="name"
              placeholder={t('modal.namePlaceholder')}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact">{t('modal.contactLabel')}</label>
            <input
              type="text"
              id="contact"
              placeholder={t('modal.contactPlaceholder')}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>{t('modal.projectTypeLabel')}</label>
            <div className="project-types-grid">
              {projectTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  className={`project-type-pill ${projectType === type.id ? 'active' : ''}`}
                  onClick={() => setProjectType(type.id)}
                >
                  {t(type.translationKey, type.defaultLabel)}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className={`modal-submit-btn ${status === 'loading' ? 'loading' : ''} ${status === 'success' ? 'success' : ''}`}
            disabled={status === 'loading' || status === 'success'}
          >
            {status === 'idle' && (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="send-icon">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                <span>{t('modal.submitBtn')}</span>
              </>
            )}
            {status === 'loading' && <span>{t('modal.sending')}</span>}
            {status === 'success' && <span>{t('modal.success')}</span>}
            {status === 'error' && <span>{t('modal.error')}</span>}
          </button>

          <div className="modal-form-footer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lock-icon">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>{t('modal.securityText')}</span>
          </div>

        </form>

      </div>
    </div>
  );
}