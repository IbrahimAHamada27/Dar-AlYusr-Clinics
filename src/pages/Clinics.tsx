import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { dataService } from '../services/dataService';
import { MapPin, Phone, Clock, Calendar, Navigation, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ClinicsProps {
  setActiveTab: (tab: string) => void;
  onSelectClinic?: (clinicId: string) => void;
}

export const Clinics: React.FC<ClinicsProps> = ({ setActiveTab, onSelectClinic }) => {
  const { isRtl, getText, ui } = useLanguage();
  const clinics = dataService.getClinics();

  const handleBookClinic = (clinicId: string) => {
    if (onSelectClinic) onSelectClinic(clinicId);
    setActiveTab('appointments');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Hero Header */}
      <section style={{ backgroundColor: 'var(--primary-light)', padding: '4rem 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span className="section-subtitle">{isRtl ? 'مواقع العيادات والرعاية' : 'Practices & Locations'}</span>
          <h1 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>
            {isRtl ? 'عناوين ومواعيد العيادات' : 'Clinic Locations & Schedules'}
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
            {isRtl
              ? 'اختر الفرع والمدينة الأنسب لك واستكشف مواعيد العمل والخدمات المتاحة.'
              : 'Choose the location that works best for you and book your consultation.'}
          </p>
        </div>
      </section>

      {/* Clinics Detail Section */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {clinics.map(clinic => (
              <div key={clinic.id} className="card" style={{ padding: '2.5rem', backgroundColor: '#ffffff' }}>
                <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
                  {/* Left Clinic Info */}
                  <div style={{ flex: '1 1 450px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                      <span className="badge badge-navy">
                        <MapPin size={14} /> {getText(clinic.city)}
                      </span>
                      <span className="badge badge-teal">
                        <ShieldCheck size={14} /> {isRtl ? 'عيادة معتمدة' : 'Verified Clinic'}
                      </span>
                    </div>

                    <h2 style={{ fontSize: '2rem', color: 'var(--primary-dark)', marginBottom: '0.75rem' }}>
                      {getText(clinic.name)}
                    </h2>

                    <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <MapPin size={18} color="var(--accent-teal)" />
                      <span>{getText(clinic.address)}</span>
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-navy)', marginBottom: '2rem' }}>
                      <Phone size={18} color="var(--accent-teal)" />
                      <span>{clinic.phone}</span>
                    </div>

                    {/* Working Hours */}
                    <div style={{ backgroundColor: 'var(--bg-alt)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '2rem' }}>
                      <h4 style={{ color: 'var(--primary-dark)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={18} color="var(--accent-teal)" />
                        <span>{isRtl ? 'جدول ومواعيد العيادة:' : 'Working Hours Schedule:'}</span>
                      </h4>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {clinic.workingHours.map((wh, idx) => (
                          <li key={idx} style={{ fontSize: '0.95rem', color: 'var(--text-main)', fontWeight: 600 }}>
                            • {getText(wh)}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Available Services Tags */}
                    <div style={{ marginBottom: '2rem' }}>
                      <h4 style={{ fontSize: '0.95rem', color: 'var(--primary-dark)', marginBottom: '0.75rem' }}>
                        {isRtl ? 'الخدمات الطبية المتاحة:' : 'Available Medical Services:'}
                      </h4>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {clinic.services.map(srv => (
                          <span key={srv.id} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', backgroundColor: 'var(--accent-teal-light)', color: 'var(--accent-teal-hover)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.85rem', fontWeight: 600 }}>
                            <CheckCircle2 size={14} />
                            {getText(srv.name)}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => handleBookClinic(clinic.id)}
                        className="btn btn-primary"
                      >
                        <Calendar size={18} />
                        <span>{ui.bookAppointment}</span>
                      </button>

                      {clinic.mapLocationUrl && (
                        <a
                          href={clinic.mapLocationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline"
                        >
                          <Navigation size={18} />
                          <span>{ui.getDirections}</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Map Embed View */}
                  <div style={{ flex: '1 1 350px', minHeight: '300px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-light)' }}>
                    <iframe
                      title={getText(clinic.name)}
                      src={clinic.googleMapsEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0, minHeight: '320px' }}
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
