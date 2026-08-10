import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { dataService } from '../services/dataService';
import type { PublicationItem } from '../types';
import { BookOpen, Search, ExternalLink, X } from 'lucide-react';

export const Publications: React.FC = () => {
  const { isRtl, getText, ui } = useLanguage();
  const publications = dataService.getPublications();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedPub, setSelectedPub] = useState<PublicationItem | null>(null);

  // Extract unique years & types
  const years = useMemo(() => {
    const set = new Set(publications.map(p => p.year));
    return Array.from(set).sort((a, b) => b - a);
  }, [publications]);

  const types = useMemo(() => {
    const set = new Set(publications.map(p => p.type));
    return Array.from(set);
  }, [publications]);

  // Filter logic
  const filteredPubs = useMemo(() => {
    return publications.filter(pub => {
      const titleStr = getText(pub.title).toLowerCase();
      const authorStr = pub.authors.toLowerCase();
      const journalStr = pub.journal.toLowerCase();
      const keywordStr = pub.keywords.join(' ').toLowerCase();
      const query = searchTerm.toLowerCase();

      const matchesSearch = !query || titleStr.includes(query) || authorStr.includes(query) || journalStr.includes(query) || keywordStr.includes(query);
      const matchesYear = selectedYear === 'ALL' || pub.year.toString() === selectedYear;
      const matchesType = selectedType === 'ALL' || pub.type === selectedType;

      return matchesSearch && matchesYear && matchesType;
    });
  }, [publications, searchTerm, selectedYear, selectedType, getText]);

  return (
    <div>
      {/* Hero Header */}
      <section style={{ backgroundColor: 'var(--primary-light)', padding: '4rem 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span className="section-subtitle">{isRtl ? 'المكتبة الأكاديمية' : 'Academic Library'}</span>
          <h1 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>
            {isRtl ? 'الأبحاث والمنشورات العلمية' : 'Scientific Publications'}
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
            {isRtl
              ? 'مكتبة تفاعلية قابلة للبحث تضم الأبحاث والمراجعات العلمية المنشورة في الدوريات العالمية.'
              : 'Explore peer-reviewed original research, clinical trials, and review articles.'}
          </p>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="section" style={{ paddingTop: '2.5rem', paddingBottom: '1.5rem' }}>
        <div className="container">
          <div
            className="card"
            style={{
              backgroundColor: 'var(--bg-alt)',
              padding: '1.5rem',
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              alignItems: 'center'
            }}
          >
            {/* Search Input */}
            <div style={{ flex: '2 1 300px', position: 'relative' }}>
              <Search
                size={18}
                color="var(--text-light)"
                style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', [isRtl ? 'right' : 'left']: '1rem' }}
              />
              <input
                type="text"
                placeholder={ui.search}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  paddingLeft: isRtl ? '1rem' : '2.5rem',
                  paddingRight: isRtl ? '2.5rem' : '1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Year Filter */}
            <div style={{ flex: '1 1 160px' }}>
              <select
                value={selectedYear}
                onChange={e => setSelectedYear(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                  fontSize: '0.92rem',
                  backgroundColor: '#ffffff',
                  outline: 'none'
                }}
              >
                <option value="ALL">{ui.filterByYear} (All)</option>
                {years.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div style={{ flex: '1 1 180px' }}>
              <select
                value={selectedType}
                onChange={e => setSelectedType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                  fontSize: '0.92rem',
                  backgroundColor: '#ffffff',
                  outline: 'none'
                }}
              >
                <option value="ALL">{ui.allTypes}</option>
                {types.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Clear Button */}
            {(searchTerm || selectedYear !== 'ALL' || selectedType !== 'ALL') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedYear('ALL');
                  setSelectedType('ALL');
                }}
                className="btn btn-outline btn-sm"
              >
                {ui.clearFilters}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Publications List */}
      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            {isRtl ? `تم العثور على ${filteredPubs.length} بحث علمي` : `Showing ${filteredPubs.length} research publications`}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {filteredPubs.map(pub => (
              <div
                key={pub.id}
                className="card card-hover"
                style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <span className="badge badge-teal">{pub.type}</span>
                    <span className="badge badge-navy">{pub.year}</span>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontFamily: 'monospace' }}>
                    DOI: {pub.doi}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-dark)' }}>
                  {getText(pub.title)}
                </h3>

                <div style={{ fontSize: '0.92rem', color: 'var(--accent-teal)', fontWeight: 600 }}>
                  ✍️ {pub.authors} — <em style={{ color: 'var(--primary-dark)' }}>{pub.journal}</em>
                </div>

                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {getText(pub.abstract)}
                </p>

                {/* Keywords Tags */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                  {pub.keywords.map((kw, i) => (
                    <span key={i} style={{ fontSize: '0.78rem', backgroundColor: 'var(--bg-alt)', padding: '0.2rem 0.6rem', borderRadius: '4px', color: 'var(--text-muted)' }}>
                      #{kw}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button
                    onClick={() => setSelectedPub(pub)}
                    className="btn btn-navy btn-sm"
                  >
                    <BookOpen size={15} />
                    <span>{ui.viewPublication}</span>
                  </button>

                  {pub.externalUrl && (
                    <a
                      href={pub.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                    >
                      <ExternalLink size={15} />
                      <span>DOI Link</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publication Detail Modal */}
      {selectedPub && (
        <div className="modal-overlay" onClick={() => setSelectedPub(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '750px' }}>
            <button
              onClick={() => setSelectedPub(null)}
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

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <span className="badge badge-teal">{selectedPub.type}</span>
              <span className="badge badge-navy">{selectedPub.year}</span>
            </div>

            <h2 style={{ fontSize: '1.45rem', marginBottom: '0.75rem', color: 'var(--primary-dark)' }}>
              {getText(selectedPub.title)}
            </h2>

            <div style={{ fontSize: '0.95rem', color: 'var(--accent-teal)', fontWeight: 700, marginBottom: '0.5rem' }}>
              {selectedPub.authors}
            </div>
            <div style={{ fontSize: '0.95rem', fontStyle: 'italic', marginBottom: '1.25rem', color: 'var(--primary-dark)' }}>
              Published in: {selectedPub.journal} ({selectedPub.year})
            </div>

            <div style={{ backgroundColor: 'var(--bg-alt)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>
                {isRtl ? 'الملخص الطبي (Abstract):' : 'Abstract:'}
              </h4>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
                {getText(selectedPub.abstract)}
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '0.4rem', color: 'var(--primary-dark)' }}>Keywords:</h4>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {selectedPub.keywords.map((kw, idx) => (
                  <span key={idx} className="badge badge-navy" style={{ textTransform: 'none' }}>
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {selectedPub.externalUrl && (
                <a
                  href={selectedPub.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  <ExternalLink size={16} />
                  <span>{isRtl ? 'عرض الورقة بموقع المجلة' : 'Read Publisher Article'}</span>
                </a>
              )}
              <button
                onClick={() => setSelectedPub(null)}
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
