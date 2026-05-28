import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavLogo from './NavLogo';
import NavLinks from './NavLinks';
import NavActions from './NavActions';
import MobileMenuButton from './MobileMenuButton';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white border-b transition-all duration-300
          ${
            scrolled
              ? 'border-slate-200 shadow-[0_1px_12px_rgba(37,99,235,0.07)]'
              : 'border-slate-100 shadow-none'
          }`}
      >
        <nav className="max-w-275 mx-auto px-6 h-16 flex items-center justify-between">
          <NavLogo />
          <NavLinks />
          <NavActions />
          <MobileMenuButton
            isOpen={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          />
        </nav>

        <MobileMenu
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
          key={pathname}
        />
      </header>

      <div className="h-16" />
    </>
  );
}
