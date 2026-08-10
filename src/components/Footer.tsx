import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { dataService } from '../services/dataService';
import {
  Stethoscope,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  BookOpen,
  Award,
  ShieldAlert,
  Share2,
  Calendar,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const { ui, isRtl, getText } = useLanguage();
  const profile = dataService.getProfile();
  const settings = dataService.getSettings();

  const handleNav = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const ChevronIcon = isRtl ? ChevronLeft : ChevronRight;

  return (
    <footer style={{ backgroundColor: 'var(--primary-dark)', color: '#ffffff', paddingTop: '4rem', paddingBottom: '2.5rem' }}>
      <div className="container">
        {/* Emergency Medical Warning Banner */}
        <div
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem 1.5rem',
            marginBottom: '3.5rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem'
          }}
        >
          <ShieldAlert size={28} color="#EF4444" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#F87171', marginBottom: '0.25rem' }}>
              {isRtl ? 'إشعار الحالات الطبية الطارئة' : 'Emergency Medical Disclaimer'}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#E2E8F0', lineHeight: 1.6 }}>
              {getText(settings.emergencyNotice)}
            </div>
          </div>
        </div>

        {/* Footer Main Grid */}
        <div className="grid-4" style={{ marginBottom: '3.5rem', gap: '2.5rem' }}>
          {/* Column 1: Brand & Bio */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--accent-teal)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Stethoscope size={24} color="#ffffff" />
              </div>
              <div style={{ fontWeight: 800, fontSize: '1.25rem', color: '#ffffff' }}>
                {getText(profile.name)}
              </div>
            </div>
            <p style={{ color: 'var(--accent-teal)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '1rem' }}>
              {getText(profile.title)}
            </p>
            <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.6 }}>
              {getText(profile.brandTagline)}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ color: '#ffffff', marginBottom: '1.25rem', fontSize: '1.1rem', position: 'relative' }}>
              {ui.quickLinks}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { id: 'home', label: ui.home },
                { id: 'about', label: ui.about },
                { id: 'education', label: ui.education },
                { id: 'certificates', label: ui.certificates },
                { id: 'publications', label: ui.publications },
                { id: 'articles', label: ui.articles },
                { id: 'clinics', label: ui.clinics },
                { id: 'contact', label: ui.contact },
              ].map(link => (
                <li key={link.id}>
                  <button onClick={() => handleNav(link.id)} style={linkBtnStyle}>
                    <ChevronIcon size={14} color="var(--accent-teal)" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Academic & Research Hub */}
          <div>
            <h4 style={{ color: '#ffffff', marginBottom: '1.25rem', fontSize: '1.1rem' }}>
              {ui.academicLinks}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={extLinkStyle}>
                  <Share2 size={16} color="var(--accent-teal)" />
                  <span>LinkedIn Profile</span>
                </a>
              </li>
              <li>
                <a href="https://scholar.google.com" target="_blank" rel="noopener noreferrer" style={extLinkStyle}>
                  <GraduationCap size={16} color="var(--accent-teal)" />
                  <span>Google Scholar</span>
                </a>
              </li>
              <li>
                <a href="https://researchgate.net" target="_blank" rel="noopener noreferrer" style={extLinkStyle}>
                  <BookOpen size={16} color="var(--accent-teal)" />
                  <span>ResearchGate</span>
                </a>
              </li>
              <li>
                <a href="https://orcid.org" target="_blank" rel="noopener noreferrer" style={extLinkStyle}>
                  <Award size={16} color="var(--accent-teal)" />
                  <span>ORCID Identifier</span>
                </a>
              </li>
              <li>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={extLinkStyle}>
                  <Share2 size={16} color="var(--accent-teal)" />
                  <span>YouTube Channel</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Clinics summary */}
          <div>
            <h4 style={{ color: '#ffffff', marginBottom: '1.25rem', fontSize: '1.1rem' }}>
              {isRtl ? 'التواصل المباشر' : 'Direct Contact'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem', color: '#94A3B8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Phone size={16} color="var(--accent-teal)" />
                <span style={{ color: '#ffffff', fontWeight: 600 }}>{settings.contactPhone}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Mail size={16} color="var(--accent-teal)" />
                <span>{settings.contactEmail}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <MapPin size={16} color="var(--accent-teal)" />
                <span>{isRtl ? 'الإسكندرية والقاهرة، مصر' : 'Alexandria & Cairo, Egypt'}</span>
              </div>

              <div style={{ marginTop: '1rem' }}>
                <button
                  onClick={() => handleNav('appointments')}
                  className="btn btn-primary btn-sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Calendar size={16} />
                  <span>{ui.bookAppointment}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar & General Disclaimer */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '1.75rem', fontSize: '0.85rem', color: '#64748B' }}>
          <div style={{ marginBottom: '1.25rem', lineHeight: 1.6, textAlign: 'center', maxWidth: '900px', margin: '0 auto 1.25rem auto' }}>
            <strong style={{ color: '#94A3B8' }}>{ui.medicalDisclaimer}:</strong> {getText(settings.disclaimerNotice)}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              © 2026 {getText(profile.name)}. {ui.allRightsReserved}
            </div>
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <span style={{ cursor: 'pointer', color: '#94A3B8' }}>{ui.privacyPolicy}</span>
              <span>•</span>
              <span style={{ cursor: 'pointer', color: '#94A3B8' }}>{ui.termsOfUse}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const linkBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#94A3B8',
  fontSize: '0.9rem',
  cursor: 'pointer',
  padding: 0,
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  transition: 'var(--transition-fast)'
};

const extLinkStyle: React.CSSProperties = {
  color: '#94A3B8',
  fontSize: '0.9rem',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  textDecoration: 'none'
};
