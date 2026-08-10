import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section style="background-color: var(--primary-light); padding: 3.5rem 0;">
      <div className="container" style="text-align: center; max-width: 800px;">
        <span className="section-subtitle">{{ lang.ui().certificates }}</span>
        <h1 className="section-title">{{ lang.isRtl() ? 'الشهادات والاعتمادات الرسمية' : 'Board Certifications & Fellowships' }}</h1>
      </div>
    </section>

    <section style="padding: 5rem 0;">
      <div className="container">
        <div className="grid-2" style="gap: 2rem;">
          <div *ngFor="let item of data.certificates()" className="card" style="padding: 2rem; display: flex; gap: 1.5rem; align-items: flex-start;">
            <div style="width: 48px; height: 48px; border-radius: 12px; background-color: var(--accent-teal-light); color: var(--accent-teal); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/></svg>
            </div>

            <div style="flex: 1;">
              <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                <h3 style="font-size: 1.2rem; color: var(--primary-dark); font-weight: 800;">{{ lang.getText(item.title) }}</h3>
                <span style="font-weight: 700; color: var(--accent-teal); font-size: 0.9rem;">{{ item.year }}</span>
              </div>
              <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 0.75rem;">
                {{ lang.getText(item.issuingOrganization) }}
              </p>
              <div style="font-size: 0.85rem; color: var(--text-light); font-family: monospace;">
                ID: {{ item.credentialId }}
              </div>
              <div *ngIf="item.verificationUrl" style="margin-top: 1rem;">
                <a [href]="item.verificationUrl" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                  <span>{{ lang.isRtl() ? 'رابط التحقق الرسمي' : 'Verify Credential' }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class CertificatesComponent {
  lang = inject(LanguageService);
  data = inject(DataService);
}
