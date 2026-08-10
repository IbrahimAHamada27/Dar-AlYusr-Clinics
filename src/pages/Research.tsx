import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { dataService } from '../services/dataService';
import { CheckCircle, Clock, Layers } from 'lucide-react';

export const Research: React.FC = () => {
  const { isRtl, getText } = useLanguage();
  const researchAreas = dataService.getResearchAreas();
  const researchProjects = dataService.getResearchProjects();

  return (
    <div>
      {/* Hero Section */}
      <section style={{ backgroundColor: 'var(--primary-light)', padding: '4rem 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span className="section-subtitle">{isRtl ? 'البحث العلمي والأكاديمي' : 'Scientific Contributions'}</span>
          <h1 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>
            {isRtl ? 'البحث والاهتمامات العلمية' : 'Research & Scientific Interests'}
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            "{isRtl
              ? 'يُعد البحث العلمي ركيزة أساسية للتطوير الطبي المستمر. يستعرض هذا القسم الاهتمامات والمشاريع والمساهمات الأكاديمية للدكتور.'
              : 'Scientific research is an essential part of continuous medical development. This section presents the doctor\'s research interests, projects, and areas of academic contribution.'}"
          </p>
        </div>
      </section>

      {/* Research Areas */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{isRtl ? 'المحاور الأكاديمية' : 'Key Pillars'}</span>
            <h2>{isRtl ? 'مجالات البحث العلمي' : 'Research Areas'}</h2>
          </div>

          <div className="grid-3">
            {researchAreas.map(area => (
              <div key={area.id} className="card card-hover">
                <div style={{ marginBottom: '1rem' }}>
                  <Layers size={26} color="var(--accent-teal)" />
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem', color: 'var(--primary-dark)' }}>
                  {getText(area.title)}
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {getText(area.description)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Projects */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{isRtl ? 'المشاريع الجارية والمكتملة' : 'Clinical Initiatives'}</span>
            <h2>{isRtl ? 'المشاريع والأبحاث التطبيقية' : 'Research Projects'}</h2>
          </div>

          <div className="grid-2">
            {researchProjects.map(project => {
              const isCompleted = project.status === 'Completed';
              return (
                <div key={project.id} className="card card-hover" style={{ backgroundColor: '#ffffff' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span className={isCompleted ? 'badge badge-teal' : 'badge badge-gold'}>
                      {isCompleted ? <CheckCircle size={14} /> : <Clock size={14} />}
                      {project.status}
                    </span>
                    <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
                      {project.year}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>
                    {getText(project.title)}
                  </h3>

                  <div style={{ fontSize: '0.9rem', color: 'var(--accent-teal)', fontWeight: 600, marginBottom: '1rem' }}>
                    🏛️ {getText(project.institution)}
                  </div>

                  <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                    {getText(project.description)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
