import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { dataService } from '../services/dataService';
import type { ArticleItem } from '../types';
import { Clock, User, ShieldAlert, ArrowRight, ArrowLeft, X } from 'lucide-react';

interface ArticlesProps {
  selectedSlug?: string;
}

export const Articles: React.FC<ArticlesProps> = ({ selectedSlug }) => {
  const { isRtl, getText, ui } = useLanguage();
  const articles = dataService.getArticles();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Active article state for full reading modal
  const initialArticle = selectedSlug ? articles.find(a => a.slug === selectedSlug) || null : null;
  const [activeArticle, setActiveArticle] = useState<ArticleItem | null>(initialArticle);

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const categories = [
    { en: 'ALL', ar: 'جميع التصنيفات' },
    { en: 'Hypertension', ar: 'ارتفاع ضغط الدم' },
    { en: 'Preventive Medicine', ar: 'الطب الوقائي' },
    { en: 'Diabetes', ar: 'السكري' }
  ];

  const filteredArticles = selectedCategory === 'ALL'
    ? articles
    : articles.filter(a => getText(a.category).toLowerCase().includes(selectedCategory.toLowerCase()) || a.category.en === selectedCategory);

  return (
    <div>
      {/* Hero Header */}
      <section style={{ backgroundColor: 'var(--primary-light)', padding: '4rem 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span className="section-subtitle">{isRtl ? 'التثقيف الطبي' : 'Patient Education'}</span>
          <h1 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>
            {isRtl ? 'المقالات والتوعية الطبية' : 'Medical Articles & Health Blog'}
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
            {isRtl
              ? 'مقالات وإرشادات صحية موثوقة مبنية على أحدث الأدلة الطبية لتوعية المرضى.'
              : 'Evidence-based health articles and patient education guides for better wellness.'}
          </p>
        </div>
      </section>

      {/* Category Pills Bar */}
      <section className="section" style={{ paddingTop: '2rem', paddingBottom: '1rem' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {categories.map((cat, idx) => {
              const catLabel = isRtl ? cat.ar : cat.en;
              const isSelected = selectedCategory === cat.en;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(cat.en)}
                  className={isSelected ? 'btn btn-primary btn-sm' : 'btn btn-outline btn-sm'}
                >
                  {catLabel}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Articles Cards Grid */}
      <section className="section" style={{ paddingTop: '1.5rem' }}>
        <div className="container">
          <div className="grid-3">
            {filteredArticles.map(art => (
              <div
                key={art.id}
                className="card card-hover"
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 0, overflow: 'hidden' }}
              >
                {/* Cover Image */}
                <div style={{ height: '200px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={art.coverImage}
                    alt={getText(art.title)}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '1rem', [isRtl ? 'right' : 'left']: '1rem' }}>
                    <span className="badge badge-teal" style={{ backgroundColor: 'rgba(255,255,255,0.92)' }}>
                      {getText(art.category)}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '0.825rem', color: 'var(--text-light)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><User size={13} /> {getText(art.author)}</span>
                      <span>•</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={13} /> {art.readingTime}</span>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', lineHeight: 1.4, color: 'var(--primary-dark)' }}>
                      {getText(art.title)}
                    </h3>

                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                      {getText(art.summary)}
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveArticle(art)}
                    className="btn btn-navy btn-sm"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <span>{ui.readArticle}</span>
                    <ArrowIcon size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Article Reader Modal */}
      {activeArticle && (
        <div className="modal-overlay" onClick={() => setActiveArticle(null)}>
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '850px', maxHeight: '92vh' }}
          >
            <button
              onClick={() => setActiveArticle(null)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                [isRtl ? 'left' : 'right']: '1.25rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              <X size={26} color="var(--primary-dark)" />
            </button>

            {/* Medical Education Disclaimer Warning */}
            <div
              style={{
                backgroundColor: 'var(--accent-teal-light)',
                border: '1px solid rgba(13, 148, 136, 0.3)',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem 1rem',
                marginBottom: '1.5rem',
                fontSize: '0.85rem',
                color: 'var(--accent-teal-hover)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem'
              }}
            >
              <ShieldAlert size={20} />
              <span>
                {isRtl
                  ? 'إخلاء مسؤولية: المقالات التثقيفية مخصصة للتوعية ولا تغني بأي حال عن الاستشارة والمتابعة الطبية المباشرة.'
                  : 'Medical Disclaimer: Educational articles do not replace professional diagnosis or direct medical consultation.'}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span className="badge badge-teal">{getText(activeArticle.category)}</span>
              <span className="badge badge-navy">{activeArticle.readingTime} read</span>
            </div>

            <h1 style={{ fontSize: '1.8rem', color: 'var(--primary-dark)', marginBottom: '0.75rem', lineHeight: 1.3 }}>
              {getText(activeArticle.title)}
            </h1>

            <div style={{ fontSize: '0.88rem', color: 'var(--text-light)', marginBottom: '1.5rem' }}>
              By {getText(activeArticle.author)} • Published on {activeArticle.date}
            </div>

            {/* Cover Photo */}
            <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '2rem', maxHeight: '350px' }}>
              <img
                src={activeArticle.coverImage}
                alt={getText(activeArticle.title)}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Article Content Render */}
            <div
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.85,
                color: 'var(--text-main)',
                whiteSpace: 'pre-line',
                marginBottom: '2rem'
              }}
            >
              {getText(activeArticle.content)}
            </div>

            {/* References */}
            {activeArticle.references && activeArticle.references.length > 0 && (
              <div style={{ backgroundColor: 'var(--bg-alt)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }}>
                <h4 style={{ marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>
                  {isRtl ? 'المراجع والمصادر الطبية:' : 'Medical References:'}
                </h4>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  {activeArticle.references.map((ref, i) => (
                    <li key={i}>{ref}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={() => setActiveArticle(null)}
              className="btn btn-outline btn-sm"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {ui.close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
