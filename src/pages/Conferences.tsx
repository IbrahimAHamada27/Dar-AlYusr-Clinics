import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { dataService } from '../services/dataService';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

export const Conferences: React.FC = () => {
  const { isRtl, getText } = useLanguage();
  const conferences = dataService.getConferences();

  const upcoming = conferences.filter(c => c.isUpcoming);
  const previous = conferences.filter(c => !c.isUpcoming);

  return (
    <div>
      {/* Hero Header */}
      <section style={{ backgroundColor: 'var(--primary-light)', padding: '4rem 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span className="section-subtitle">{isRtl ? 'المشاركات والتحدث' : 'Speaking & Congresses'}</span>
          <h1 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>
            {isRtl ? 'المؤتمرات والندوات الطبية' : 'Conferences & Symposia'}
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
            {isRtl
              ? 'مشاركات ومحاضرات علمية في أكبر المؤتمرات الطبية الإقليمية والدولية.'
              : 'Keynote lectures, panel chairings, and presentations at medical congresses.'}
          </p>
        </div>
      </section>

      {/* Upcoming Conferences */}
      {upcoming.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header" style={{ textAlign: isRtl ? 'right' : 'left', margin: '0 0 2rem 0' }}>
              <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>
                {isRtl ? 'مؤتمرات قادمة' : 'Upcoming Speaking Engagements'}
              </span>
              <h2>{isRtl ? 'المؤتمرات القادمة' : 'Upcoming Conferences'}</h2>
            </div>

            <div className="grid-2">
              {upcoming.map(conf => (
                <div key={conf.id} className="card" style={{ borderTop: '4px solid var(--gold-accent)', backgroundColor: 'var(--primary-dark)', color: '#ffffff' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span className="badge badge-gold">{getText(conf.role)}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--gold-accent)', fontWeight: 600 }}>
                      <Calendar size={14} /> {conf.date}
                    </span>
                  </div>

                  <h3 style={{ color: '#ffffff', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                    {getText(conf.eventName)}
                  </h3>

                  <div style={{ fontSize: '0.9rem', color: '#94A3B8', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <MapPin size={16} color="var(--accent-teal)" />
                    <span>{getText(conf.location)}</span>
                  </div>

                  <div style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--gold-accent)', fontWeight: 700, marginBottom: '0.25rem' }}>
                      {isRtl ? 'عنوان المحاضرة:' : 'Lecture Topic:'}
                    </div>
                    <div style={{ fontSize: '0.95rem', color: '#ffffff', fontWeight: 600 }}>
                      "{getText(conf.topic)}"
                    </div>
                  </div>

                  {conf.description && (
                    <p style={{ fontSize: '0.88rem', color: '#CBD5E1', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                      {getText(conf.description)}
                    </p>
                  )}

                  {conf.externalLink && (
                    <a
                      href={conf.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      <ExternalLink size={15} />
                      <span>{isRtl ? 'موقع المؤتمر الرسمي' : 'Official Event Website'}</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Previous Conferences */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{isRtl ? 'أرشيف المشاركات' : 'Past Participation'}</span>
            <h2>{isRtl ? 'المؤتمرات والمشاركات السابقة' : 'Previous Conferences'}</h2>
          </div>

          <div className="grid-2">
            {previous.map(conf => (
              <div key={conf.id} className="card card-hover" style={{ backgroundColor: '#ffffff' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span className="badge badge-teal">{getText(conf.role)}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: 600 }}>
                    {conf.date}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>
                  {getText(conf.eventName)}
                </h3>

                <div style={{ fontSize: '0.9rem', color: 'var(--accent-teal)', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MapPin size={16} />
                  <span>{getText(conf.location)}</span>
                </div>

                <div style={{ backgroundColor: 'var(--bg-alt)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <strong>{isRtl ? 'الموضوع:' : 'Topic:'}</strong> {getText(conf.topic)}
                  </span>
                </div>

                {conf.description && (
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {getText(conf.description)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
