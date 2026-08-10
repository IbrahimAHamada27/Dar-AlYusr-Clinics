import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section style="background-color: var(--primary-light); padding: 3.5rem 0;">
      <div className="container" style="text-align: center; max-width: 800px;">
        <span className="section-subtitle">{{ lang.ui().education }}</span>
        <h1 className="section-title">{{ lang.isRtl() ? 'المؤهلات الدرجات الأكاديمية' : 'Academic Degrees & Education' }}</h1>
      </div>
    </section>

    <section style="padding: 5rem 0;">
      <div className="container" style="max-width: 900px;">
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <div *ngFor="let item of data.education()" className="card" style="padding: 2rem; display: flex; gap: 1.5rem; align-items: flex-start;">
            <div style="width: 50px; height: 50px; border-radius: 12px; background-color: var(--primary-navy); color: #ffffff; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0D9488" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            </div>

            <div style="flex: 1;">
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.5rem;">
                <h3 style="font-size: 1.3rem; color: var(--primary-dark); font-weight: 800;">{{ lang.getText(item.degree) }}</h3>
                <span style="background-color: var(--accent-teal-light); color: var(--accent-teal); padding: 0.3rem 0.85rem; border-radius: var(--radius-full); font-weight: 700; font-size: 0.85rem;">
                  {{ item.year }}
                </span>
              </div>
              <p style="font-size: 1rem; color: var(--accent-teal); font-weight: 700; margin-bottom: 0.75rem;">
                {{ lang.getText(item.institution) }}
              </p>
              <p *ngIf="item.description" style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6;">
                {{ lang.getText(item.description) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class EducationComponent {
  lang = inject(LanguageService);
  data = inject(DataService);
}
