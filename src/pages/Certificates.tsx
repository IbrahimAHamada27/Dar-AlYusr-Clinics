import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { dataService } from '../services/dataService';
import type { CertificateItem } from '../types';
import { Award, ExternalLink, CheckCircle, ShieldCheck, X } from 'lucide-react';

export const Certificates: React.FC = () => {
  const { isRtl, getText, ui } = useLanguage();
  const certificates = dataService.getCertificates();
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  return (
    <div>
      {/* Hero Header */}
      <section style={{ backgroundColor: 'var(--primary-light)', padding: '4rem 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span className="section-subtitle">{isRtl ? 'الاعتمادات التخصصية' : 'Verified Credentials'}</span>
          <h1 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>
            {isRtl ? 'الشهادات والاعتمادات المهنية' : 'Certificates & Board Accreditations'}
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
            {isRtl ? 'شهادات تخصصية موثقة من الهيئات والجمعيات الطبية الدولية.' : 'Professional medical certifications issued by accredited boards and societies.'}
          </p>
        </div>
      </section>

      {/* Certificates Grid */}
      <section className="section">
        <div className="container">
          <div className="grid-3">
            {certificates.map(cert => (
              <div key={cert.id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '10px',
                        backgroundColor: 'var(--accent-teal-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Award size={24} color="var(--accent-teal)" />
                    </div>
                    <span className="badge badge-navy">
                      {cert.year}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>
                    {getText(cert.title)}
                  </h3>

                  <div style={{ fontSize: '0.92rem', color: 'var(--accent-teal)', fontWeight: 600, marginBottom: '0.75rem' }}>
                    {getText(cert.issuingOrganization)}
                  </div>

                  <div style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontFamily: 'monospace', marginBottom: '1.25rem' }}>
                    Credential ID: {cert.credentialId}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="btn btn-outline btn-sm"
                    style={{ flex: 1 }}
                  >
                    <CheckCircle size={15} />
                    <span>{ui.viewDetails}</span>
                  </button>

                  {cert.verificationUrl && (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                      title="Verify Online"
                      style={{ padding: '0.45rem 0.65rem' }}
                    >
                      <ExternalLink size={15} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal View for Certificate Details */}
      {selectedCert && (
        <div className="modal-overlay" onClick={() => setSelectedCert(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setSelectedCert(null)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                [isRtl ? 'left' : 'right']: '1.25rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <X size={24} color="var(--primary-dark)" />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <ShieldCheck size={28} color="var(--accent-teal)" />
              <span className="badge badge-teal">{selectedCert.year}</span>
            </div>

            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>
              {getText(selectedCert.title)}
            </h2>

            <div style={{ fontSize: '1.05rem', color: 'var(--accent-teal)', fontWeight: 700, marginBottom: '1.25rem' }}>
              {getText(selectedCert.issuingOrganization)}
            </div>

            <div style={{ backgroundColor: 'var(--bg-alt)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.92rem' }}>
              <div><strong>Credential ID:</strong> {selectedCert.credentialId}</div>
              <div><strong>Verification Status:</strong> Verified Demo Credential</div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {selectedCert.verificationUrl && (
                <a
                  href={selectedCert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  <ExternalLink size={16} />
                  <span>{isRtl ? 'رابط التحقق الأكاديمي' : 'Verify Certificate Online'}</span>
                </a>
              )}
              <button
                onClick={() => setSelectedCert(null)}
                className="btn btn-outline btn-sm"
              >
                {ui.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
