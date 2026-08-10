import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { dataService } from '../services/dataService';
import { GraduationCap, Award } from 'lucide-react';

export const Education: React.FC = () => {
  const { isRtl, getText } = useLanguage();
  const education = dataService.getEducation();

  const devAreas = [
    {
      title: { en: 'Clinical Training', ar: 'التدريب السريري التخصصي' },
      desc: { en: 'Advanced residency and fellowship clinical rotations in internal medicine and intensive care.', ar: 'برامج تدريب سري ري مكثفة بقسم الباطنة العامة والرعاية المركزة.' }
    },
    {
      title: { en: 'Research Methodology', ar: 'مناهج البحث العلمي' },
      desc: { en: 'Methodological training in biostatistics, clinical trial design, and cohort research.', ar: 'تدريب أكاديمي في الإحصاء الطبي وتصميم الأبحاث والدراسات السريرية.' }
    },
    {
      title: { en: 'Medical Education', ar: 'التعليم الطبي المستمر' },
      desc: { en: 'Participation in faculty development workshops and continuous professional medical education.', ar: 'المشاركة في ورش عمل تطوير التعليم الطبي والتدريس الجامعي.' }
    },
    {
      title: { en: 'Cardiometabolic Care', ar: 'الرعاية الأيضية المتقدمة' },
      desc: { en: 'Specialized clinical training in diabetes technologies, CGM systems, and lipidology.', ar: 'تدريب تخصصي على أحدث تقنيات أجهزة السكري والتحكم في دهون الدم.' }
    }
  ];

  return (
    <div>
      {/* Hero Header */}
      <section style={{ backgroundColor: 'var(--primary-light)', padding: '4rem 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span className="section-subtitle">{isRtl ? 'المؤهلات والأكاديميا' : 'Academic Credentials'}</span>
          <h1 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>
            {isRtl ? 'التعليم والدرجات الأكاديمية' : 'Academic Education'}
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
            {isRtl ? 'مسيرة دراسية وأكاديمية قائمة على التميز الميداني والبحثي المستمر.' : 'A solid academic foundation built on medical distinction and continuous learning.'}
          </p>
        </div>
      </section>

      {/* Degrees Section */}
      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="grid-1" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {education.map(item => (
              <div key={item.id} className="card card-hover" style={{ borderLeft: '5px solid var(--accent-teal)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.75rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', color: 'var(--primary-dark)', marginBottom: '0.25rem' }}>
                      {getText(item.degree)}
                    </h3>
                    <div style={{ fontSize: '1rem', color: 'var(--accent-teal)', fontWeight: 600 }}>
                      {getText(item.institution)}
                    </div>
                  </div>
                  <span className="badge badge-navy" style={{ fontSize: '0.9rem' }}>
                    <GraduationCap size={16} /> {item.year}
                  </span>
                </div>

                {item.description && (
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, marginTop: '0.5rem' }}>
                    {getText(item.description)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Development */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{isRtl ? 'التطوير الأكاديمي' : 'Professional Growth'}</span>
            <h2>{isRtl ? 'التطوير الطبي والأكاديمي' : 'Academic Development'}</h2>
          </div>

          <div className="grid-2">
            {devAreas.map((area, idx) => (
              <div key={idx} className="card" style={{ backgroundColor: '#ffffff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <Award size={22} color="var(--accent-teal)" />
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-dark)' }}>
                    {getText(area.title)}
                  </h3>
                </div>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {getText(area.desc)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
