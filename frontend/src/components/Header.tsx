import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  Stethoscope,
  Globe,
  Menu,
  X,
  ChevronDown,
  Calendar,
  UserCheck,
  Home as HomeIcon,
  User as UserIcon,
  GraduationCap,
  Award,
  Layers,
  BookOpen,
  Mic,
  FileText,
  Building,
  Share2,
  PhoneCall
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isAdmin,
  setIsAdmin
}) => {
  const { language, toggleLanguage, ui, isRtl } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [academicDropdownOpen, setAcademicDropdownOpen] = useState(false);
  const [researchDropdownOpen, setResearchDropdownOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setAcademicDropdownOpen(false);
    setResearchDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'home', label: ui.home, icon: <HomeIcon size={18} /> },
    { id: 'about', label: ui.about, icon: <UserIcon size={18} /> },
    { id: 'education', label: ui.education, icon: <GraduationCap size={18} /> },
    { id: 'certificates', label: ui.certificates, icon: <Award size={18} /> },
    { id: 'research', label: ui.researchAreas, icon: <Layers size={18} /> },
    { id: 'publications', label: ui.publications, icon: <BookOpen size={18} /> },
    { id: 'conferences', label: ui.conferences, icon: <Mic size={18} /> },
    { id: 'articles', label: ui.articles, icon: <FileText size={18} /> },
    { id: 'clinics', label: ui.clinics, icon: <Building size={18} /> },
    { id: 'socialMedia', label: ui.socialMedia, icon: <Share2 size={18} /> },
    { id: 'contact', label: ui.contact, icon: <PhoneCall size={18} /> },
  ];

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 900 }} className="glass-header">
      {/* Top Demo Disclaimer Bar */}
      <div className="demo-banner">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', flexWrap: 'wrap', width: '100%' }}>
          <span className="demo-banner-tag">{ui.demoContentNotice}</span>
          <span style={{ fontSize: '0.8rem', lineHeight: 1.3 }}>{ui.demoNoticeDesc}</span>
        </div>
      </div>

      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1.5rem' }}>
        {/* Brand Logo & Name */}
        <div
          onClick={() => handleNavClick('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', flexShrink: 0 }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              backgroundColor: 'var(--primary-navy)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-sm)',
              flexShrink: 0
            }}
          >
            <Stethoscope size={24} color="#0D9488" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--primary-dark)', lineHeight: 1.1 }}>
              {isRtl ? 'د. إبراهيم الشرقاوي' : 'Dr. Ibrahim El Sherqawy'}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-teal)', fontWeight: 600 }}>
              {isRtl ? 'استشاري الأمراض الباطنية والباحث الطبي' : 'Consultant Physician & Researcher'}
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.15rem' }} className="desktop-nav">
          <button
            onClick={() => handleNavClick('home')}
            style={{
              background: 'none',
              border: 'none',
              fontWeight: activeTab === 'home' ? 700 : 500,
              color: activeTab === 'home' ? 'var(--accent-teal)' : 'var(--text-main)',
              cursor: 'pointer',
              fontSize: '0.92rem'
            }}
          >
            {ui.home}
          </button>

          <button
            onClick={() => handleNavClick('about')}
            style={{
              background: 'none',
              border: 'none',
              fontWeight: activeTab === 'about' ? 700 : 500,
              color: activeTab === 'about' ? 'var(--accent-teal)' : 'var(--text-main)',
              cursor: 'pointer',
              fontSize: '0.92rem'
            }}
          >
            {ui.about}
          </button>

          {/* Academic Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setAcademicDropdownOpen(!academicDropdownOpen)}
              style={{
                background: 'none',
                border: 'none',
                fontWeight: ['education', 'certificates'].includes(activeTab) ? 700 : 500,
                color: ['education', 'certificates'].includes(activeTab) ? 'var(--accent-teal)' : 'var(--text-main)',
                cursor: 'pointer',
                fontSize: '0.92rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              {ui.academic}
              <ChevronDown size={15} />
            </button>
            {academicDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  [isRtl ? 'right' : 'left']: 0,
                  marginTop: '0.5rem',
                  backgroundColor: '#ffffff',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--border-light)',
                  padding: '0.5rem 0',
                  minWidth: '190px',
                  zIndex: 99
                }}
              >
                <button
                  onClick={() => handleNavClick('education')}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: isRtl ? 'right' : 'left',
                    padding: '0.5rem 1rem',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    fontSize: '0.88rem'
                  }}
                >
                  {ui.education}
                </button>
                <button
                  onClick={() => handleNavClick('certificates')}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: isRtl ? 'right' : 'left',
                    padding: '0.5rem 1rem',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    fontSize: '0.88rem'
                  }}
                >
                  {ui.certificates}
                </button>
              </div>
            )}
          </div>

          {/* Research Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setResearchDropdownOpen(!researchDropdownOpen)}
              style={{
                background: 'none',
                border: 'none',
                fontWeight: activeTab === 'research' ? 700 : 500,
                color: activeTab === 'research' ? 'var(--accent-teal)' : 'var(--text-main)',
                cursor: 'pointer',
                fontSize: '0.92rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              {ui.research}
              <ChevronDown size={15} />
            </button>
            {researchDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  [isRtl ? 'right' : 'left']: 0,
                  marginTop: '0.5rem',
                  backgroundColor: '#ffffff',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--border-light)',
                  padding: '0.5rem 0',
                  minWidth: '190px',
                  zIndex: 99
                }}
              >
                <button
                  onClick={() => handleNavClick('research')}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: isRtl ? 'right' : 'left',
                    padding: '0.5rem 1rem',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    fontSize: '0.88rem'
                  }}
                >
                  {ui.researchAreas}
                </button>
                <button
                  onClick={() => handleNavClick('publications')}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: isRtl ? 'right' : 'left',
                    padding: '0.5rem 1rem',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    fontSize: '0.88rem'
                  }}
                >
                  {ui.publications}
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => handleNavClick('publications')}
            style={{
              background: 'none',
              border: 'none',
              fontWeight: activeTab === 'publications' ? 700 : 500,
              color: activeTab === 'publications' ? 'var(--accent-teal)' : 'var(--text-main)',
              cursor: 'pointer',
              fontSize: '0.92rem'
            }}
          >
            {ui.publications}
          </button>

          <button
            onClick={() => handleNavClick('conferences')}
            style={{
              background: 'none',
              border: 'none',
              fontWeight: activeTab === 'conferences' ? 700 : 500,
              color: activeTab === 'conferences' ? 'var(--accent-teal)' : 'var(--text-main)',
              cursor: 'pointer',
              fontSize: '0.92rem'
            }}
          >
            {ui.conferences}
          </button>

          <button
            onClick={() => handleNavClick('articles')}
            style={{
              background: 'none',
              border: 'none',
              fontWeight: activeTab === 'articles' ? 700 : 500,
              color: activeTab === 'articles' ? 'var(--accent-teal)' : 'var(--text-main)',
              cursor: 'pointer',
              fontSize: '0.92rem'
            }}
          >
            {ui.articles}
          </button>

          <button
            onClick={() => handleNavClick('clinics')}
            style={{
              background: 'none',
              border: 'none',
              fontWeight: activeTab === 'clinics' ? 700 : 500,
              color: activeTab === 'clinics' ? 'var(--accent-teal)' : 'var(--text-main)',
              cursor: 'pointer',
              fontSize: '0.92rem'
            }}
          >
            {ui.clinics}
          </button>

          <button
            onClick={() => handleNavClick('socialMedia')}
            style={{
              background: 'none',
              border: 'none',
              fontWeight: activeTab === 'socialMedia' ? 700 : 500,
              color: activeTab === 'socialMedia' ? 'var(--accent-teal)' : 'var(--text-main)',
              cursor: 'pointer',
              fontSize: '0.92rem'
            }}
          >
            {ui.socialMedia}
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            style={{
              background: 'none',
              border: 'none',
              fontWeight: activeTab === 'contact' ? 700 : 500,
              color: activeTab === 'contact' ? 'var(--accent-teal)' : 'var(--text-main)',
              cursor: 'pointer',
              fontSize: '0.92rem'
            }}
          >
            {ui.contact}
          </button>
        </nav>

        {/* Action Controls: Language Toggle + Admin CMS + Book Appointment */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexShrink: 0 }}>
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="btn btn-outline btn-sm"
            title="Switch Language / تغيير اللغة"
            style={{ padding: '0.4rem 0.65rem', gap: '0.35rem', fontSize: '0.825rem' }}
          >
            <Globe size={15} color="var(--accent-teal)" />
            <span>{language === 'en' ? 'العربية' : 'English'}</span>
          </button>

          {/* Admin Toggle Button (Desktop Only) */}
          <button
            onClick={() => {
              setIsAdmin(!isAdmin);
              if (!isAdmin) handleNavClick('admin');
              else handleNavClick('home');
            }}
            className={isAdmin ? 'btn btn-navy btn-sm desktop-only-btn' : 'btn btn-outline btn-sm desktop-only-btn'}
            style={{ padding: '0.4rem 0.65rem', gap: '0.35rem', fontSize: '0.825rem' }}
          >
            <UserCheck size={15} />
            <span>{isAdmin ? (isRtl ? 'الموقع العام' : 'Public Site') : (isRtl ? 'التحكم CMS' : 'Admin CMS')}</span>
          </button>

          {/* Book Appointment CTA (Desktop Only) */}
          <button
            onClick={() => handleNavClick('appointments')}
            className="btn btn-primary btn-sm desktop-cta"
            style={{ gap: '0.35rem', padding: '0.45rem 0.9rem' }}
          >
            <Calendar size={15} />
            <span>{ui.bookAppointment}</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="mobile-hamburger"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-alt)',
              border: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: 0
            }}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} color="var(--primary-dark)" /> : <Menu size={22} color="var(--primary-dark)" />}
          </button>
        </div>
      </div>

      {/* 100% Solid Fullscreen Mobile Drawer Portal */}
      {mobileMenuOpen && createPortal(
        <div
          dir={isRtl ? 'rtl' : 'ltr'}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#FFFFFF',
            zIndex: 999999,
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto'
          }}
        >
          {/* Mobile Drawer Header */}
          <div
            style={{
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid var(--border-light)',
              backgroundColor: '#FFFFFF'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--primary-navy)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Stethoscope size={22} color="#0D9488" />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--primary-dark)' }}>
                  {isRtl ? 'د. إبراهيم الشرقاوي' : 'Dr. Ibrahim El Sherqawy'}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-teal)', fontWeight: 600 }}>
                  {isRtl ? 'استشاري الأمراض الباطنية' : 'Consultant Physician'}
                </div>
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-alt)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              aria-label="Close Navigation Menu"
            >
              <X size={22} color="var(--primary-dark)" />
            </button>
          </div>

          {/* Mobile Drawer Body Links */}
          <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {/* Admin CMS Access Item inside Drawer */}
            <button
              onClick={() => {
                setIsAdmin(!isAdmin);
                setMobileMenuOpen(false);
                if (!isAdmin) handleNavClick('admin');
                else handleNavClick('home');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary-navy)',
                fontWeight: 700,
                fontSize: '0.95rem',
                border: '1px solid rgba(30, 62, 98, 0.2)',
                marginBottom: '0.5rem',
                cursor: 'pointer'
              }}
            >
              <UserCheck size={18} color="var(--primary-navy)" />
              <span>{isAdmin ? (isRtl ? 'الموقع العام' : 'Public Site') : (isRtl ? 'لوحة التحكم CMS' : 'Admin CMS Dashboard')}</span>
            </button>

            {navItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    width: '100%',
                    textAlign: 'inherit',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    backgroundColor: isActive ? 'var(--accent-teal-light)' : 'transparent',
                    color: isActive ? 'var(--accent-teal)' : 'var(--primary-dark)',
                    fontWeight: isActive ? 800 : 600,
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ color: isActive ? 'var(--accent-teal)' : 'var(--text-light)' }}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Mobile Action Controls */}
            <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <button
                onClick={() => {
                  toggleLanguage();
                  setMobileMenuOpen(false);
                }}
                className="btn btn-outline"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Globe size={18} color="var(--accent-teal)" />
                <span>{language === 'en' ? 'تغيير إلى اللغة العربية' : 'Switch to English'}</span>
              </button>

              <button
                onClick={() => handleNavClick('appointments')}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Calendar size={20} />
                <span>{ui.bookAppointment}</span>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Responsive Style Rules */}
      <style>{`
        @media (max-width: 992px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
          .desktop-only-btn { display: none !important; }
        }
        @media (min-width: 993px) {
          .mobile-hamburger { display: none !important; }
        }
      `}</style>
    </header>
  );
};
