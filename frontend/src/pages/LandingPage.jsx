import React from 'react';
import Navbar from '@/components/ui/navbar/Navbar';
import HeroSection from '@/components/ui/section-home/HeroSection';
import FAQSection from '@/components/ui/section-home/FAQSection';
import AboutSection from '@/components/ui/section-home/AboutSection';
import FeaturesSection from '@/components/ui/section-home/FeaturesSection';
import HowItWorksSection from '@/components/ui/section-home/HowItWorksSection';
import Footer from '@/components/ui/footer/Footer';
const LandingPage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <HowItWorksSection />
      <FAQSection />
      <Footer/>
    </>
  );
};

export default LandingPage;
