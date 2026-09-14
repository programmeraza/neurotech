'use client';

import React, { useEffect } from 'react';
import Nav from '../components/Nav/Nav';
import HeroSection from '../components/HeroSection/HeroSection';
import ExpertiseSection from '../components/ExpertiseSection/ExpertiseSection';
import PortfolioSection from '../components/PortfolioSection/PortfolioSection';
import StatsSection from '../components/StatsSection/StatsSection';
import Footer from '../components/Footer/Footer';
import ConsultationModal from '../components/ConsultationModal/ConsultationModal';

export default function App() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    };
  }, []);

  return (
    <div className="app-content-wrapper">
      <ConsultationModal />
      <Nav />
      <HeroSection />
      <ExpertiseSection />
      <PortfolioSection />
      <StatsSection />
      <Footer />
    </div>
  );
}
