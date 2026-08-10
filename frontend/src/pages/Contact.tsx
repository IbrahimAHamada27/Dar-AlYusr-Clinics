import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { dataService } from '../services/dataService';
import { Phone, Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';

interface ContactProps {
  setActiveTab: (tab: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ setActiveTab }) => {
  const { isRtl, getText, ui } = useLanguage();
  const settings = dataService.getSettings();
  const clinics = dataService.getClinics();

  // Contact Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !message) return;

    dataService.addMessage({
      fullName,
      email,
      phone,
      subject,
      message
    });

    setSubmitted(true);
    setFullName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');
  };

  return (
    <div>
      {/* Hero Header */}
      <section style={{ backgroundColor: 'var(--primary-light)', padding: '4rem 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span className="section-subtitle">{isRtl ? 'التواصل المباشر' : 'Direct Inquiry'}</span>
          <h1 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>
            {isRtl ? 'تواصل معنا' : 'Get in Touch'}
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
            "{isRtl
              ? 'للحجوزات، أو استفسارات العيادات، أو الاستشارات المهنية والأكاديمية، يسعدنا تواصلكم عبر الخيارات أدناه.'
              : 'For appointments, clinic information, or professional inquiries, please use the appropriate contact option below.'}"
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
            {/* Left Contact Cards */}
            <div style={{ flex: '1 1 350px' }}>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '1.5rem', color: 'var(--primary-dark)' }}>
                {isRtl ? 'معلومات التواصل' : 'Contact Information'}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'var(--accent-teal-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Phone size={22} color="var(--accent-teal)" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.825rem', color: 'var(--text-light)', fontWeight: 600 }}>{isRtl ? 'الهاتف المباشر' : 'Phone Number'}</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-dark)' }}>{settings.contactPhone}</div>
                  </div>
                </div>

                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'var(--accent-teal-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Mail size={22} color="var(--accent-teal)" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.825rem', color: 'var(--text-light)', fontWeight: 600 }}>{isRtl ? 'البريد الإلكتروني' : 'Email Address'}</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-dark)' }}>{settings.contactEmail}</div>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${settings.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card card-hover"
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid #25D366' }}
                >
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#DCF8C6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MessageSquare size={22} color="#075E54" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.825rem', color: 'var(--text-light)', fontWeight: 600 }}>WhatsApp Chat</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#075E54' }}>{settings.whatsappNumber}</div>
                  </div>
                </a>
              </div>

              {/* Clinic Summaries */}
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--primary-dark)' }}>
                {ui.clinicLocations}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {clinics.map(clinic => (
                  <div key={clinic.id} style={{ backgroundColor: 'var(--bg-alt)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                    <div style={{ fontWeight: 700, color: 'var(--primary-dark)', fontSize: '1rem', marginBottom: '0.25rem' }}>
                      {getText(clinic.name)} ({getText(clinic.city)})
                    </div>
                    <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                      {getText(clinic.address)}
                    </div>
                    <button
                      onClick={() => setActiveTab('appointments')}
                      className="btn btn-outline btn-sm"
                      style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem' }}
                    >
                      {ui.bookAppointment}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Contact Form */}
            <div style={{ flex: '1 1 450px' }}>
              <div className="card" style={{ backgroundColor: '#ffffff', padding: '2.25rem' }}>
                <h2 style={{ fontSize: '1.6rem', marginBottom: '1.5rem', color: 'var(--primary-dark)' }}>
                  {isRtl ? 'إرسال رسالة مباشرة' : 'Send a Direct Message'}
                </h2>

                {submitted ? (
                  <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                    <CheckCircle size={48} color="var(--accent-teal)" style={{ marginBottom: '1rem' }} />
                    <h3 style={{ color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
                      {isRtl ? 'تم إرسال رسالتك بنجاح!' : 'Message Sent Successfully!'}
                    </h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                      {isRtl ? 'سيقوم فريق العيادة بالرد على استفسارك في أقرب وقت.' : 'Our clinic reception will review your message and reply promptly.'}
                    </p>
                    <button onClick={() => setSubmitted(false)} className="btn btn-outline btn-sm">
                      {isRtl ? 'إرسال رسالة أخرى' : 'Send Another Message'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                        {isRtl ? 'الاسم الكامل *' : 'Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        placeholder={isRtl ? 'أدخل اسمك' : 'Your full name'}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-light)',
                          fontSize: '0.95rem',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <div className="grid-2" style={{ gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                          {isRtl ? 'البريد الإلكتروني *' : 'Email *'}
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="email@example.com"
                          style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-light)',
                            fontSize: '0.95rem',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                          {isRtl ? 'رقم الهاتف' : 'Phone Number'}
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          placeholder="+20 100 000 0000"
                          style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-light)',
                            fontSize: '0.95rem',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                        {isRtl ? 'الموضوع' : 'Subject'}
                      </label>
                      <input
                        type="text"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        placeholder={isRtl ? 'موضوع الرسالة...' : 'Inquiry subject'}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-light)',
                          fontSize: '0.95rem',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                        {isRtl ? 'الرسالة *' : 'Message *'}
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        placeholder={isRtl ? 'اكتب نص استفسارك هنا...' : 'Write your message details...'}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-light)',
                          fontSize: '0.95rem',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }}>
                      <Send size={18} />
                      <span>{ui.sendMessage}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
