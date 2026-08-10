import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { dataService } from '../services/dataService';
import type {
  DoctorProfile,
  PublicationItem,
  ArticleItem,
  ClinicLocation,
  AppointmentBooking,
  ContactMessage
} from '../types';
import {
  LayoutDashboard,
  UserCheck,
  Calendar,
  BookOpen,
  FileText,
  Building,
  Inbox,
  RefreshCw,
  Trash2,
  Save,
  CheckCircle
} from 'lucide-react';

interface AdminProps {
  setIsAdmin: (val: boolean) => void;
  setActiveTab: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminProps> = ({ setIsAdmin, setActiveTab }) => {
  const { isRtl, getText } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>('dashboard');

  // Local state initialized from dataService
  const [profile, setProfile] = useState<DoctorProfile>(dataService.getProfile());
  const [publications, setPublications] = useState<PublicationItem[]>(dataService.getPublications());
  const [articles, setArticles] = useState<ArticleItem[]>(dataService.getArticles());
  const [clinics, setClinics] = useState<ClinicLocation[]>(dataService.getClinics());
  const [appointments, setAppointments] = useState<AppointmentBooking[]>(dataService.getAppointments());
  const [messages, setMessages] = useState<ContactMessage[]>(dataService.getMessages());

  const [savedSuccess, setSavedSuccess] = useState(false);

  const showSaveNotice = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetData = () => {
    if (window.confirm(isRtl ? 'هل أنت تأكد من استعادة البيانات التجريبية الافتراضية؟' : 'Are you sure you want to reset all site data to default demo data?')) {
      dataService.resetToDemoData();
      setProfile(dataService.getProfile());
      setPublications(dataService.getPublications());
      setArticles(dataService.getArticles());
      setClinics(dataService.getClinics());
      setAppointments(dataService.getAppointments());
      setMessages(dataService.getMessages());
      showSaveNotice();
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    dataService.saveProfile(profile);
    showSaveNotice();
  };

  const handleUpdateApptStatus = (id: string, status: AppointmentBooking['status']) => {
    dataService.updateAppointmentStatus(id, status);
    setAppointments(dataService.getAppointments());
    showSaveNotice();
  };

  const handleDeleteAppt = (id: string) => {
    if (window.confirm('Delete appointment?')) {
      dataService.deleteAppointment(id);
      setAppointments(dataService.getAppointments());
    }
  };

  const handleMarkMsgRead = (id: string) => {
    dataService.markMessageRead(id);
    setMessages(dataService.getMessages());
  };

  const handleDeleteMsg = (id: string) => {
    dataService.deleteMessage(id);
    setMessages(dataService.getMessages());
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-alt)', minHeight: 'calc(100vh - 140px)', padding: '2rem 0' }}>
      <div className="container">
        {/* Top Header Bar */}
        <div
          className="card"
          style={{
            backgroundColor: 'var(--primary-dark)',
            color: '#ffffff',
            padding: '1.5rem 2rem',
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div>
            <div className="badge badge-gold" style={{ marginBottom: '0.4rem' }}>
              ADMIN CMS DASHBOARD
            </div>
            <h1 style={{ color: '#ffffff', fontSize: '1.75rem' }}>
              {isRtl ? 'لوحة إدارة الموقع والمحتوى' : 'Dr. Ibrahim CMS Control Panel'}
            </h1>
            <p style={{ color: '#94A3B8', fontSize: '0.9rem' }}>
              {isRtl ? 'تعديل السيرة الذاتية، الأبحاث، المقالات، العيادات والمواعيد المترددة.' : 'Manage profile, publications, blog articles, clinics & appointments.'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleResetData}
              className="btn btn-outline btn-sm"
              style={{ color: 'var(--gold-accent)', borderColor: 'var(--gold-accent)' }}
            >
              <RefreshCw size={16} />
              <span>{isRtl ? 'استعادة البيانات الافتراضية' : 'Reset Demo Data'}</span>
            </button>

            <button
              onClick={() => { setIsAdmin(false); setActiveTab('home'); }}
              className="btn btn-primary btn-sm"
            >
              <span>{isRtl ? 'معاينة الموقع العام' : 'Preview Public Site'}</span>
            </button>
          </div>
        </div>

        {/* Save Notice Notification */}
        {savedSuccess && (
          <div
            style={{
              backgroundColor: 'var(--accent-teal-light)',
              border: '1px solid var(--accent-teal)',
              color: 'var(--accent-teal-hover)',
              padding: '1rem 1.5rem',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.5rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <CheckCircle size={20} />
            <span>{isRtl ? 'تم حفظ التعديلات بنجاح وتحديث الموقع!' : 'Changes saved successfully to LocalStorage!'}</span>
          </div>
        )}

        {/* Main Dashboard Layout */}
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {/* Sidebar Menu */}
          <div style={{ flex: '0 0 250px', width: '100%' }}>
            <div className="card" style={{ padding: '0.75rem', backgroundColor: '#ffffff' }}>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <li>
                  <button
                    onClick={() => setActiveSection('dashboard')}
                    style={sidebarBtnStyle(activeSection === 'dashboard')}
                  >
                    <LayoutDashboard size={18} />
                    <span>{isRtl ? 'لوحة الملخص' : 'Overview'}</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection('profile')}
                    style={sidebarBtnStyle(activeSection === 'profile')}
                  >
                    <UserCheck size={18} />
                    <span>{isRtl ? 'الملف الطبي والأرقام' : 'Doctor Profile'}</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection('appointments')}
                    style={sidebarBtnStyle(activeSection === 'appointments')}
                  >
                    <Calendar size={18} />
                    <span>{isRtl ? 'إدارة المواعيد' : 'Appointments'} ({appointments.length})</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection('publications')}
                    style={sidebarBtnStyle(activeSection === 'publications')}
                  >
                    <BookOpen size={18} />
                    <span>{isRtl ? 'الأبحاث والمنشورات' : 'Publications'} ({publications.length})</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection('articles')}
                    style={sidebarBtnStyle(activeSection === 'articles')}
                  >
                    <FileText size={18} />
                    <span>{isRtl ? 'المقالات الطبية' : 'Blog Articles'} ({articles.length})</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection('clinics')}
                    style={sidebarBtnStyle(activeSection === 'clinics')}
                  >
                    <Building size={18} />
                    <span>{isRtl ? 'العيادات والمواعيد' : 'Clinics Manager'} ({clinics.length})</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection('messages')}
                    style={sidebarBtnStyle(activeSection === 'messages')}
                  >
                    <Inbox size={18} />
                    <span>{isRtl ? 'رسائل المرضى' : 'Messages'} ({messages.filter(m => !m.isRead).length})</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content Area */}
          <div style={{ flex: '1 1 500px' }}>
            {/* OVERVIEW SECTION */}
            {activeSection === 'dashboard' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="grid-3">
                  <div className="card" style={{ backgroundColor: '#ffffff' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: 600, marginBottom: '0.25rem' }}>
                      TOTAL APPOINTMENTS
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-dark)' }}>
                      {appointments.length}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--accent-teal)' }}>
                      {appointments.filter(a => a.status === 'Pending').length} Pending Review
                    </div>
                  </div>

                  <div className="card" style={{ backgroundColor: '#ffffff' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: 600, marginBottom: '0.25rem' }}>
                      PUBLICATIONS
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-dark)' }}>
                      {publications.length}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--accent-teal)' }}>
                      Peer-reviewed indexed
                    </div>
                  </div>

                  <div className="card" style={{ backgroundColor: '#ffffff' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: 600, marginBottom: '0.25rem' }}>
                      BLOG ARTICLES
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-dark)' }}>
                      {articles.length}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--accent-teal)' }}>
                      {articles.filter(a => a.isPublished).length} Published Live
                    </div>
                  </div>
                </div>

                {/* Recent Appointments Quick Table */}
                <div className="card" style={{ backgroundColor: '#ffffff' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--primary-dark)' }}>
                    {isRtl ? 'أحدث الحجوزات المقدمة' : 'Recent Patient Appointments'}
                  </h3>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                      <thead>
                        <tr style={{ backgroundColor: 'var(--bg-alt)', borderBottom: '1px solid var(--border-light)', textAlign: isRtl ? 'right' : 'left' }}>
                          <th style={{ padding: '0.75rem' }}>Ref Code</th>
                          <th style={{ padding: '0.75rem' }}>Patient Name</th>
                          <th style={{ padding: '0.75rem' }}>Clinic</th>
                          <th style={{ padding: '0.75rem' }}>Date & Time</th>
                          <th style={{ padding: '0.75rem' }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appointments.slice(0, 5).map(app => (
                          <tr key={app.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                            <td style={{ padding: '0.75rem', fontWeight: 700, fontFamily: 'monospace' }}>{app.bookingRef}</td>
                            <td style={{ padding: '0.75rem' }}>{app.patientName} ({app.patientPhone})</td>
                            <td style={{ padding: '0.75rem' }}>{getText(app.clinicName)}</td>
                            <td style={{ padding: '0.75rem' }}>{app.date} {app.timeSlot}</td>
                            <td style={{ padding: '0.75rem' }}>
                              <span className={app.status === 'Confirmed' ? 'badge badge-teal' : 'badge badge-navy'}>
                                {app.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* PROFILE SECTION */}
            {activeSection === 'profile' && (
              <div className="card" style={{ backgroundColor: '#ffffff' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: 'var(--primary-dark)' }}>
                  {isRtl ? 'تعديل البيانات الأساسية والإحصائيات' : 'Edit Doctor Profile & Statistics'}
                </h3>
                <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div className="grid-2" style={{ gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                        Doctor Name (EN)
                      </label>
                      <input
                        type="text"
                        value={profile.name.en}
                        onChange={e => setProfile({ ...profile, name: { ...profile.name, en: e.target.value } })}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                        اسم الطبيب (AR)
                      </label>
                      <input
                        type="text"
                        value={profile.name.ar}
                        onChange={e => setProfile({ ...profile, name: { ...profile.name, ar: e.target.value } })}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div className="grid-4" style={{ gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                        Years Experience
                      </label>
                      <input
                        type="number"
                        value={profile.experienceYears}
                        onChange={e => setProfile({ ...profile, experienceYears: Number(e.target.value) })}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                        Publications Count
                      </label>
                      <input
                        type="number"
                        value={profile.publicationCount}
                        onChange={e => setProfile({ ...profile, publicationCount: Number(e.target.value) })}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                        Conferences Count
                      </label>
                      <input
                        type="number"
                        value={profile.conferenceCount}
                        onChange={e => setProfile({ ...profile, conferenceCount: Number(e.target.value) })}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                        Certificates Count
                      </label>
                      <input
                        type="number"
                        value={profile.certificationCount}
                        onChange={e => setProfile({ ...profile, certificationCount: Number(e.target.value) })}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: 'fit-content' }}>
                    <Save size={18} />
                    <span>{isRtl ? 'حفظ التعديلات' : 'Save Profile Changes'}</span>
                  </button>
                </form>
              </div>
            )}

            {/* APPOINTMENTS CMS */}
            {activeSection === 'appointments' && (
              <div className="card" style={{ backgroundColor: '#ffffff' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: 'var(--primary-dark)' }}>
                  {isRtl ? 'إدارة حجز المواعيد والطلبات' : 'Appointments Management'}
                </h3>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ backgroundColor: 'var(--bg-alt)', borderBottom: '1px solid var(--border-light)', textAlign: isRtl ? 'right' : 'left' }}>
                        <th style={{ padding: '0.75rem' }}>Ref Code</th>
                        <th style={{ padding: '0.75rem' }}>Patient Info</th>
                        <th style={{ padding: '0.75rem' }}>Clinic & Date</th>
                        <th style={{ padding: '0.75rem' }}>Status</th>
                        <th style={{ padding: '0.75rem' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map(app => (
                        <tr key={app.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                          <td style={{ padding: '0.75rem', fontWeight: 700, fontFamily: 'monospace' }}>{app.bookingRef}</td>
                          <td style={{ padding: '0.75rem' }}>
                            <div style={{ fontWeight: 700 }}>{app.patientName}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{app.patientPhone} | {app.patientEmail}</div>
                          </td>
                          <td style={{ padding: '0.75rem' }}>
                            <div>{getText(app.clinicName)}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--accent-teal)' }}>{app.date} @ {app.timeSlot}</div>
                          </td>
                          <td style={{ padding: '0.75rem' }}>
                            <select
                              value={app.status}
                              onChange={e => handleUpdateApptStatus(app.id, e.target.value as any)}
                              style={{ padding: '0.35rem 0.5rem', borderRadius: '4px', border: '1px solid var(--border-light)', fontSize: '0.85rem' }}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td style={{ padding: '0.75rem' }}>
                            <button
                              onClick={() => handleDeleteAppt(app.id)}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444' }}
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* PUBLICATIONS CMS */}
            {activeSection === 'publications' && (
              <div className="card" style={{ backgroundColor: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-dark)' }}>
                    {isRtl ? 'الأبحاث والمنشورات العلمية' : 'Manage Publications'}
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {publications.map(pub => (
                    <div key={pub.id} style={{ border: '1px solid var(--border-light)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--primary-dark)' }}>
                          {getText(pub.title)}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
                          {pub.journal} ({pub.year}) • DOI: {pub.doi}
                        </div>
                      </div>
                      <span className="badge badge-teal">{pub.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ARTICLES CMS */}
            {activeSection === 'articles' && (
              <div className="card" style={{ backgroundColor: '#ffffff' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: 'var(--primary-dark)' }}>
                  {isRtl ? 'إدارة المقالات والتوعية الطبية' : 'Manage Blog Articles'}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {articles.map(art => (
                    <div key={art.id} style={{ border: '1px solid var(--border-light)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--primary-dark)' }}>
                          {getText(art.title)}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
                          Category: {getText(art.category)} • Reading Time: {art.readingTime}
                        </div>
                      </div>
                      <span className={art.isPublished ? 'badge badge-teal' : 'badge badge-navy'}>
                        {art.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CLINICS CMS */}
            {activeSection === 'clinics' && (
              <div className="card" style={{ backgroundColor: '#ffffff' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: 'var(--primary-dark)' }}>
                  {isRtl ? 'إدارة العيادات ومواعيد العمل' : 'Manage Clinic Locations'}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {clinics.map(clinic => (
                    <div key={clinic.id} style={{ border: '1px solid var(--border-light)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--primary-dark)', marginBottom: '0.25rem' }}>
                        {getText(clinic.name)} ({getText(clinic.city)})
                      </div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                        {getText(clinic.address)} — Phone: {clinic.phone}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MESSAGES INBOX */}
            {activeSection === 'messages' && (
              <div className="card" style={{ backgroundColor: '#ffffff' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: 'var(--primary-dark)' }}>
                  {isRtl ? 'رسائل المرضى والاستفسارات' : 'Patient Messages Inbox'}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {messages.map(msg => (
                    <div
                      key={msg.id}
                      style={{
                        border: '1px solid var(--border-light)',
                        backgroundColor: msg.isRead ? 'var(--bg-alt)' : '#ffffff',
                        padding: '1.25rem',
                        borderRadius: 'var(--radius-md)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--primary-dark)' }}>
                          {msg.fullName} ({msg.email})
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          {!msg.isRead && (
                            <button onClick={() => handleMarkMsgRead(msg.id)} className="btn btn-outline btn-sm">
                              Mark Read
                            </button>
                          )}
                          <button onClick={() => handleDeleteMsg(msg.id)} style={{ color: '#EF4444', border: 'none', background: 'none', cursor: 'pointer' }}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--accent-teal)', marginBottom: '0.5rem' }}>
                        Subject: {msg.subject}
                      </div>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                        "{msg.message}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const sidebarBtnStyle = (isActive: boolean): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  width: '100%',
  padding: '0.75rem 1rem',
  border: 'none',
  borderRadius: 'var(--radius-md)',
  backgroundColor: isActive ? 'var(--accent-teal-light)' : 'transparent',
  color: isActive ? 'var(--accent-teal)' : 'var(--primary-dark)',
  fontWeight: isActive ? 700 : 500,
  fontSize: '0.92rem',
  cursor: 'pointer',
  textAlign: 'inherit',
  transition: 'var(--transition-fast)'
});

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem 1rem',
  borderRadius: 'var(--radius-md)',
  border: '1px solid var(--border-light)',
  fontSize: '0.95rem',
  outline: 'none'
};
