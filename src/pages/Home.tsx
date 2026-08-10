import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { dataService } from '../services/dataService';
import {
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Stethoscope,
  Activity,
  HeartPulse,
  ShieldCheck
} from 'lucide-react';

interface HomeProps {
  setActiveTab: (tab: string) => void;
  onSelectArticle?: (slug: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setActiveTab, onSelectArticle }) => {
  const { ui, isRtl, getText } = useLanguage();
  const profile = dataService.getProfile();
  const expertise = dataService.getExpertiseAreas();
  const clinics = dataService.getClinics();
  const publications = dataService.getPublications().slice(0, 3);
  const articles = dataService.getArticles();
  const featuredArticle = articles.find(a => a.isFeatured) || articles[0];
  const upcomingConference = dataService.getConferences().find(c => c.isUpcoming);

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const getExpertiseIcon = (name: string) => {
    switch (name) {
      case 'Stethoscope': return <Stethoscope size={28} color="var(--accent-teal)" />;
      case 'Activity': return <Activity size={28} color="var(--accent-teal)" />;
      case 'HeartPulse': return <HeartPulse size={28} color="var(--accent-teal)" />;
      default: return <ShieldCheck size={28} color="var(--accent-teal)" />;
    }
  };

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section style={{ backgroundColor: 'var(--primary-light)', padding: '5rem 0 4rem 0', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '3.5rem', flexWrap: 'wrap' }}>
            {/* Hero Left Content */}
            <div style={{ flex: '1 1 500px', maxWidth: '640px' }}>
              <div
                className="badge badge-teal"
                style={{ marginBottom: '1.25rem' }}
              >
                <ShieldCheck size={15} />
                <span>{getText(profile.title)}</span>
              </div>

              <h1 style={{ color: 'var(--primary-dark)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                {getText(profile.name)}
              </h1>

              <div style={{ fontSize: '1.15rem', color: 'var(--accent-teal)', fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1.4 }}>
                {profile.subSpecialties.map(s => getText(s)).join('  •  ')}
              </div>

              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
                "{getText(profile.brandTagline)}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setActiveTab('appointments')}
                  className="btn btn-primary btn-lg"
                >
                  <Calendar size={20} />
                  <span>{ui.bookAppointment}</span>
                </button>

                <button
                  onClick={() => setActiveTab('about')}
                  className="btn btn-outline btn-lg"
                >
                  <span>{ui.exploreProfile}</span>
                  <ArrowIcon size={18} />
                </button>
              </div>
            </div>

            {/* Hero Right Image */}
            <div style={{ flex: '1 1 380px', display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative', maxWidth: '420px', width: '100%' }}>
                <div
                  style={{
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-lg)',
                    border: '4px solid #ffffff',
                    backgroundColor: '#ffffff'
                  }}
                >
                  <img
                    src={profile.doctorPortrait}
                    alt={getText(profile.name)}
                    style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                  />
                </div>

                {/* Floating Badge on Image */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-20px',
                    [isRtl ? 'right' : 'left']: '-20px',
                    backgroundColor: '#ffffff',
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-md)',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem'
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-teal-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <CheckCircle2 size={24} color="var(--accent-teal)" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--primary-dark)' }}>
                      15+ {isRtl ? 'سنوات خبرة' : 'Years Experience'}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {isRtl ? 'رعاية طبية تخصصية' : 'Evidence-Based Medicine'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK STATISTICS COUNTER */}
      <section style={{ backgroundColor: 'var(--primary-dark)', color: '#ffffff', padding: '3rem 0' }}>
        <div className="container">
          <div className="grid-4" style={{ textAlign: 'center' }}>
            <div style={{ padding: '1rem' }}>
              <div style={{ fontSize: '2.75rem', fontWeight: 800, color: 'var(--gold-accent)', marginBottom: '0.25rem' }}>
                {profile.experienceYears}+
              </div>
              <div style={{ fontSize: '0.95rem', color: '#E2E8F0', fontWeight: 600 }}>
                {ui.yearsExperience}
              </div>
            </div>

            <div style={{ padding: '1rem' }}>
              <div style={{ fontSize: '2.75rem', fontWeight: 800, color: 'var(--gold-accent)', marginBottom: '0.25rem' }}>
                {profile.publicationCount}+
              </div>
              <div style={{ fontSize: '0.95rem', color: '#E2E8F0', fontWeight: 600 }}>
                {ui.scientificPublications}
              </div>
            </div>

            <div style={{ padding: '1rem' }}>
              <div style={{ fontSize: '2.75rem', fontWeight: 800, color: 'var(--gold-accent)', marginBottom: '0.25rem' }}>
                {profile.conferenceCount}+
              </div>
              <div style={{ fontSize: '0.95rem', color: '#E2E8F0', fontWeight: 600 }}>
                {ui.scientificConferences}
              </div>
            </div>

            <div style={{ padding: '1rem' }}>
              <div style={{ fontSize: '2.75rem', fontWeight: 800, color: 'var(--gold-accent)', marginBottom: '0.25rem' }}>
                {profile.certificationCount}+
              </div>
              <div style={{ fontSize: '0.95rem', color: '#E2E8F0', fontWeight: 600 }}>
                {ui.certifications}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT PREVIEW */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 450px' }}>
              <span className="section-subtitle">{isRtl ? 'نبذة عن الطبيب' : 'About the Physician'}</span>
              <h2 style={{ marginBottom: '1.5rem' }}>{ui.commitmentTitle}</h2>
              <p style={{ fontSize: '1.08rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                {getText(profile.bioIntro)}
              </p>
              <button
                onClick={() => setActiveTab('about')}
                className="btn btn-navy"
              >
                <span>{ui.readFullProfile}</span>
                <ArrowIcon size={18} />
              </button>
            </div>
            <div style={{ flex: '1 1 450px' }}>
              <div className="card" style={{ backgroundColor: 'var(--bg-alt)', borderLeft: '4px solid var(--accent-teal)' }}>
                <h3 style={{ marginBottom: '1rem', color: 'var(--primary-dark)' }}>
                  {isRtl ? 'الرؤية والنهج العلاجي' : 'Clinical Philosophy'}
                </h3>
                <p style={{ lineHeight: 1.7, color: 'var(--text-muted)' }}>
                  {getText(profile.fullBio)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. AREAS OF EXPERTISE */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{isRtl ? 'المجالات الطبية' : 'Medical Specialties'}</span>
            <h2>{ui.areasOfExpertise}</h2>
          </div>

          <div className="grid-4">
            {expertise.map(exp => (
              <div key={exp.id} className="card card-hover">
                <div style={{ marginBottom: '1.25rem' }}>
                  {getExpertiseIcon(exp.iconName)}
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>
                  {getText(exp.title)}
                </h3>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>
                  {getText(exp.description)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CLINICS PREVIEW */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{isRtl ? 'المواقع والمواعيد' : 'Locations & Hours'}</span>
            <h2>{ui.clinicLocations}</h2>
            <p style={{ marginTop: '0.5rem' }}>
              {isRtl ? 'اختر العيادة الأقرب لك واطلع على مواعيد الاستشارات المتاحة.' : 'Choose the location that works best for you and book your appointment.'}
            </p>
          </div>

          <div className="grid-2">
            {clinics.map(clinic => (
              <div key={clinic.id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <h3 style={{ color: 'var(--primary-dark)', fontSize: '1.35rem' }}>
                      {getText(clinic.name)}
                    </h3>
                    <span className="badge badge-navy">
                      <MapPin size={13} /> {getText(clinic.city)}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.95rem', marginBottom: '1.25rem', color: 'var(--text-muted)' }}>
                    {getText(clinic.address)}
                  </p>

                  <div style={{ backgroundColor: 'var(--bg-alt)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--primary-navy)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Clock size={16} color="var(--accent-teal)" />
                      <span>{isRtl ? 'مواعيد العمل:' : 'Working Hours:'}</span>
                    </div>
                    {clinic.workingHours.map((wh, idx) => (
                      <div key={idx} style={{ fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                        • {getText(wh)}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={() => setActiveTab('appointments')}
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1 }}
                  >
                    <Calendar size={16} />
                    <span>{ui.bookAppointment}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('clinics')}
                    className="btn btn-outline btn-sm"
                  >
                    <span>{ui.viewDetails}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. LATEST PUBLICATIONS */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{isRtl ? 'الإنتاج العلمي' : 'Research Output'}</span>
            <h2>{ui.latestPublications}</h2>
          </div>

          <div className="grid-3">
            {publications.map(pub => (
              <div key={pub.id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div className="badge badge-teal" style={{ marginBottom: '0.85rem', fontSize: '0.75rem' }}>
                    {pub.type} • {pub.year}
                  </div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                    {getText(pub.title)}
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: 'var(--accent-teal)', fontWeight: 600, marginBottom: '0.75rem' }}>
                    {pub.journal}
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                    {getText(pub.abstract).slice(0, 140)}...
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('publications')}
                  className="btn btn-outline btn-sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>{ui.viewPublication}</span>
                  <ArrowIcon size={16} />
                </button>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button
              onClick={() => setActiveTab('publications')}
              className="btn btn-navy"
            >
              <span>{isRtl ? 'تصفح كافة المنشورات' : 'Explore All Publications'}</span>
              <ArrowIcon size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* 7. FEATURED ARTICLE & UPCOMING CONFERENCE */}
      <section className="section">
        <div className="container">
          <div className="grid-2">
            {/* Featured Article Card */}
            {featuredArticle && (
              <div className="card" style={{ borderTop: '4px solid var(--accent-teal)' }}>
                <span className="section-subtitle">{ui.featuredArticle}</span>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem', marginTop: '0.25rem' }}>
                  {getText(featuredArticle.title)}
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '1rem' }}>
                  {getText(featuredArticle.category)} • {featuredArticle.readingTime} read
                </div>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {getText(featuredArticle.summary)}
                </p>
                <button
                  onClick={() => {
                    if (onSelectArticle) onSelectArticle(featuredArticle.slug);
                    setActiveTab('articles');
                  }}
                  className="btn btn-primary btn-sm"
                >
                  <span>{ui.readArticle}</span>
                  <ArrowIcon size={16} />
                </button>
              </div>
            )}

            {/* Upcoming Conference Banner */}
            {upcomingConference && (
              <div className="card" style={{ backgroundColor: 'var(--primary-dark)', color: '#ffffff' }}>
                <span className="badge badge-gold" style={{ marginBottom: '0.85rem' }}>
                  {isRtl ? 'مؤتمر قادم' : 'Upcoming Conference'}
                </span>
                <h3 style={{ color: '#ffffff', fontSize: '1.3rem', marginBottom: '0.75rem' }}>
                  {getText(upcomingConference.eventName)}
                </h3>
                <div style={{ fontSize: '0.9rem', color: 'var(--gold-accent)', fontWeight: 600, marginBottom: '0.5rem' }}>
                  📅 {upcomingConference.date} | 📍 {getText(upcomingConference.location)}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#E2E8F0', marginBottom: '1.25rem' }}>
                  <strong>{isRtl ? 'الدور:' : 'Role:'}</strong> {getText(upcomingConference.role)} <br />
                  <strong>{isRtl ? 'الموضوع:' : 'Topic:'}</strong> "{getText(upcomingConference.topic)}"
                </div>
                <button
                  onClick={() => setActiveTab('conferences')}
                  className="btn btn-outline btn-sm"
                  style={{ color: '#ffffff', borderColor: '#475569' }}
                >
                  <span>{ui.viewDetails}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section style={{ backgroundColor: 'var(--primary-light)', padding: '4.5rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '1rem', color: 'var(--primary-dark)' }}>
            {ui.finalCtaTitle}
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.7 }}>
            {ui.finalCtaText}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveTab('appointments')}
              className="btn btn-primary btn-lg"
            >
              <Calendar size={20} />
              <span>{ui.bookAppointment}</span>
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className="btn btn-outline btn-lg"
            >
              <span>{ui.contactClinic}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
