import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <!-- Hero Header -->
      <section style="background-color: var(--primary-light); padding: 4rem 0;">
        <div className="container" style="text-align: center; max-width: 800px;">
          <span className="section-subtitle">{{ lang.isRtl() ? 'المؤهلات والأكاديميا' : 'Academic Credentials' }}</span>
          <h1 style="color: var(--primary-dark); margin-bottom: 1rem;">
            {{ lang.isRtl() ? 'التعليم والدرجات الأكاديمية' : 'Academic Education' }}
          </h1>
          <p style="font-size: 1.1rem; color: var(--text-muted);">
            {{ lang.isRtl() ? 'مسيرة دراسية وأكاديمية قائمة على التميز الميداني والبحثي المستمر.' : 'A solid academic foundation built on medical distinction and continuous learning.' }}
          </p>
        </div>
      </section>

      <!-- Degrees Section -->
      <section className="section">
        <div className="container" style="max-width: 900px;">
          <div style="display: flex; flex-direction: column; gap: 2rem;">
            <div *ngFor="let item of data.education()" className="card card-hover" style="border-left: 5px solid var(--accent-teal);">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 0.75rem;">
                <div>
                  <h3 style="font-size: 1.35rem; color: var(--primary-dark); margin-bottom: 0.25rem;">
                    {{ lang.getText(item.degree) }}
                  </h3>
                  <div style="font-size: 1rem; color: var(--accent-teal); font-weight: 600;">
                    {{ lang.getText(item.institution) }}
                  </div>
                </div>
                <span className="badge badge-navy" style="font-size: 0.9rem;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                  {{ item.year }}
                </span>
              </div>

              <p *ngIf="item.description" style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6; margin-top: 0.5rem;">
                {{ lang.getText(item.description) }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Academic Development -->
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{{ lang.isRtl() ? 'التطوير الأكاديمي' : 'Professional Growth' }}</span>
            <h2>{{ lang.isRtl() ? 'التطوير الطبي والأكاديمي' : 'Academic Development' }}</h2>
          </div>

          <div className="grid-2">
            <div *ngFor="let area of devAreas" className="card" style="background-color: #ffffff;">
              <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/></svg>
                <h3 style="font-size: 1.15rem; color: var(--primary-dark);">
                  {{ lang.getText(area.title) }}
                </h3>
              </div>
              <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.6;">
                {{ lang.getText(area.desc) }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class EducationComponent {
  lang = inject(LanguageService);
  data = inject(DataService);

  devAreas = [
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
}
