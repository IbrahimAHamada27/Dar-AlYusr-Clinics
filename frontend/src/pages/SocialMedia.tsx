import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { dataService } from '../services/dataService';
import {
  GraduationCap,
  BookOpen,
  Award,
  FileText,
  Database,
  ExternalLink,
  ShieldCheck,
  Share2
} from 'lucide-react';

export const SocialMedia: React.FC = () => {
  const { isRtl, getText } = useLanguage();
  const allLinks = dataService.getSocialLinks();

  const socialProfiles = allLinks.filter(l => l.category === 'social');
  const academicProfiles = allLinks.filter(l => l.category === 'academic');

  const renderSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#0A66C2">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
          </svg>
        );
      case 'facebook':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/>
          </svg>
        );
      case 'instagram':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#E4405F">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        );
      case 'youtube':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF0000">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        );
      default:
        return <Share2 size={24} color="var(--accent-teal)" />;
    }
  };

  const getAcademicIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap': return <GraduationCap size={26} color="var(--accent-teal)" />;
      case 'BookOpen': return <BookOpen size={26} color="var(--accent-teal)" />;
      case 'Award': return <Award size={26} color="var(--gold-accent)" />;
      case 'FileText': return <FileText size={26} color="var(--primary-navy)" />;
      default: return <Database size={26} color="var(--accent-teal)" />;
    }
  };

  return (
    <div>
      {/* Hero Header */}
      <section style={{ backgroundColor: 'var(--primary-light)', padding: '4rem 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span className="section-subtitle">{isRtl ? 'التواصل الأكاديمي والمهني' : 'Digital Network'}</span>
          <h1 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>
            {isRtl ? 'الملفات المهنية والأكاديمية' : 'Professional & Academic Profiles'}
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
            {isRtl
              ? 'تواصل وتفاعل عبر الشبكات الاجتماعية الرسمية والمنصات الأكاديمية العالمية.'
              : 'Connect with Dr. Ibrahim across professional networks and academic research databases.'}
          </p>
        </div>
      </section>

      {/* 1. Academic Profiles Grid */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{isRtl ? 'قواعد البيانات البحثية' : 'Research Databases'}</span>
            <h2>{isRtl ? 'الملفات الأكاديمية والبحثية' : 'Academic & Citation Profiles'}</h2>
          </div>

          <div className="grid-3">
            {academicProfiles.map(profile => (
              <a
                key={profile.id}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-hover"
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: '4px solid var(--accent-teal)' }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '10px',
                        backgroundColor: 'var(--bg-alt)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {getAcademicIcon(profile.iconName)}
                    </div>
                    <span className="badge badge-teal">
                      <ShieldCheck size={13} /> Indexed
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.4rem', color: 'var(--primary-dark)' }}>
                    {profile.platform}
                  </h3>

                  {profile.description && (
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                      {getText(profile.description)}
                    </p>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-teal)', fontWeight: 700, fontSize: '0.9rem' }}>
                  <span>{isRtl ? 'زيارة الملف الأكاديمي' : 'View Academic Profile'}</span>
                  <ExternalLink size={15} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Social Media Grid */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{isRtl ? 'التواصل الاجتماعي' : 'Social Channels'}</span>
            <h2>{isRtl ? 'حسابات التواصل الاجتماعي' : 'Official Social Media'}</h2>
          </div>

          <div className="grid-3">
            {socialProfiles.map(social => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-hover"
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#ffffff' }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '10px',
                        backgroundColor: 'var(--bg-alt)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {renderSocialIcon(social.platform)}
                    </div>
                    <ExternalLink size={16} color="var(--text-light)" />
                  </div>

                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.4rem', color: 'var(--primary-dark)' }}>
                    {social.platform}
                  </h3>

                  {social.description && (
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                      {getText(social.description)}
                    </p>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-navy)', fontWeight: 700, fontSize: '0.9rem' }}>
                  <span>{isRtl ? 'متابعة الصفحة' : 'Follow Channel'}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
