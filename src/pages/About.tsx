import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { dataService } from '../services/dataService';
import { CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  const { isRtl, getText } = useLanguage();
  const profile = dataService.getProfile();
  const timeline = dataService.getTimeline();

  const interests = [
    { en: 'Internal Medicine', ar: 'الأمراض الباطنية العامة' },
    { en: 'Diabetes Management', ar: 'علاج ورعاية السكري' },
    { en: 'Hypertension', ar: 'ارتفاع ضغط الدم' },
    { en: 'Cardiometabolic Risk', ar: 'مخاطر أمراض القلب والأيض' },
    { en: 'Preventive Healthcare', ar: 'الرعاية الصحية الوقائية' },
    { en: 'Clinical Research', ar: 'البحث العلمي السريري' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{ backgroundColor: 'var(--primary-light)', padding: '4rem 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span className="section-subtitle">{isRtl ? 'السيرة المهنية والسريرية' : 'Doctor Profile & Background'}</span>
          <h1 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>
            {isRtl ? 'عن د. إبراهيم الشرقاوي' : 'About Dr. Ibrahim El Sherqawy'}
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--accent-teal)', fontWeight: 600 }}>
            {isRtl ? 'الرعاية السريرية والتعلم المستمر والبحث العلمي' : 'Clinical Care, Continuous Learning, and Medical Research.'}
          </p>
        </div>
      </section>

      {/* Main Biography Section */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', gap: '3.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: '1 1 350px', maxWidth: '420px' }}>
              <div
                style={{
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-md)',
                  border: '1px solid var(--border-light)'
                }}
              >
                <img
                  src={profile.doctorPortrait}
                  alt={getText(profile.name)}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </div>

            <div style={{ flex: '1 1 500px' }}>
              <h2 style={{ marginBottom: '1.25rem', color: 'var(--primary-dark)' }}>
                {isRtl ? 'السيرة الذاتية والمهنية' : 'Professional Biography'}
              </h2>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                {getText(profile.fullBio)}
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-muted)' }}>
                {isRtl
                  ? 'يركز د. إبراهيم الشرقاوي في ممارسته اليومية على توفير التشخيص المبكر والدقيق لحالات السكري وارتفاع ضغط الدم والاضطرابات الأيضية، مع وضع خطة علاجية مخصصة تناسب أسلوب حياة كل مريض.'
                  : 'Dr. Ibrahim El Sherqawy prioritizes patient empowerment through early diagnostic screening, personalized treatment protocols, and preventive lifestyle modifications.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Career Timeline */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{isRtl ? 'المسار الميداني' : 'Career Progression'}</span>
            <h2>{isRtl ? 'الخبرات والمسيرة المهنية' : 'Professional Experience'}</h2>
          </div>

          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            {timeline.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  marginBottom: '2rem',
                  position: 'relative'
                }}
              >
                {/* Timeline Year Pill */}
                <div style={{ flex: '0 0 140px', textAlign: isRtl ? 'left' : 'right' }}>
                  <span className="badge badge-navy" style={{ fontSize: '0.85rem' }}>
                    {item.period}
                  </span>
                </div>

                {/* Timeline Content Card */}
                <div
                  className="card"
                  style={{
                    flex: 1,
                    backgroundColor: '#ffffff',
                    borderLeft: '4px solid var(--accent-teal)'
                  }}
                >
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.35rem', color: 'var(--primary-dark)' }}>
                    {getText(item.role)}
                  </h3>
                  <div style={{ fontSize: '0.92rem', color: 'var(--accent-teal)', fontWeight: 600, marginBottom: '0.5rem' }}>
                    {getText(item.institution)}
                  </div>
                  {item.description && (
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      {getText(item.description)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Professional Interests */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{isRtl ? 'الاهتمامات التخصصية' : 'Focus Areas'}</span>
            <h2>{isRtl ? 'الاهتمامات المهنية والحالية' : 'Current Professional Interests'}</h2>
          </div>

          <div className="grid-3">
            {interests.map((interest, idx) => (
              <div
                key={idx}
                className="card card-hover"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.25rem 1.5rem'
                }}
              >
                <CheckCircle2 size={24} color="var(--accent-teal)" />
                <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--primary-dark)' }}>
                  {getText(interest)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
