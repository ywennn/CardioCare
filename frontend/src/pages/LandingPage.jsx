import React from 'react';
import Navbar from '@/components/ui/navbar/Navbar';
import HeroSection from '@/components/ui/section-home/HeroSection';
import StatsSection from '@/components/ui/section-home/StatsSection';
import AboutSection from '@/components/ui/section-home/AboutSection';
import FeaturesSection from '@/components/ui/section-home/FeaturesSection';
import HowItWorksSection from '@/components/ui/section-home/HowItWorksSection';
const LandingPage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <FeaturesSection />
      <HowItWorksSection />
    </>
  );
};

export default LandingPage;
