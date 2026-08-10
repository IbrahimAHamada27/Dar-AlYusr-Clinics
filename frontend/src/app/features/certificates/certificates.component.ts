import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { DataService } from '../../core/services/data.service';
import { CertificateItem } from '../../core/models';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <!-- Hero Header -->
      <section style="background-color: var(--primary-light); padding: 4rem 0;">
        <div className="container" style="text-align: center; max-width: 800px;">
          <span className="section-subtitle">{{ lang.isRtl() ? 'الاعتمادات التخصصية' : 'Verified Credentials' }}</span>
          <h1 style="color: var(--primary-dark); margin-bottom: 1rem;">
            {{ lang.isRtl() ? 'الشهادات والاعتمادات المهنية' : 'Certificates & Board Accreditations' }}
          </h1>
          <p style="font-size: 1.1rem; color: var(--text-muted);">
            {{ lang.isRtl() ? 'شهادات تخصصية موثقة من الهيئات والجمعيات الطبية الدولية.' : 'Professional medical certifications issued by accredited boards and societies.' }}
          </p>
        </div>
      </section>

      <!-- Certificates Grid -->
      <section className="section">
        <div className="container">
          <div className="grid-3">
            <div *ngFor="let cert of data.certificates()" className="card card-hover" style="display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                  <div
                    style="width: 42px; height: 42px; border-radius: 10px; background-color: var(--accent-teal-light); display: flex; align-items: center; justify-content: center;"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/></svg>
                  </div>
                  <span className="badge badge-navy">
                    {{ cert.year }}
                  </span>
                </div>

                <h3 style="font-size: 1.2rem; margin-bottom: 0.5rem; color: var(--primary-dark);">
                  {{ lang.getText(cert.title) }}
                </h3>

                <div style="font-size: 0.92rem; color: var(--accent-teal); font-weight: 600; margin-bottom: 0.75rem;">
                  {{ lang.getText(cert.issuingOrganization) }}
                </div>

                <div style="font-size: 0.85rem; color: var(--text-light); font-family: monospace; margin-bottom: 1.25rem;">
                  Credential ID: {{ cert.credentialId }}
                </div>
              </div>

              <div style="display: flex; gap: 0.5rem;">
                <button (click)="selectedCert = cert" className="btn btn-outline btn-sm" style="flex: 1;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <span>{{ lang.isRtl() ? 'عرض التفاصيل' : 'View Details' }}</span>
                </button>

                <a *ngIf="cert.verificationUrl" [href]="cert.verificationUrl" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" title="Verify Online" style="padding: 0.45rem 0.65rem;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Modal View for Certificate Details -->
      <div *ngIf="selectedCert" className="modal-overlay" (click)="selectedCert = null">
        <div className="modal-content" (click)="$event.stopPropagation()">
          <button (click)="selectedCert = null" style="position: absolute; top: 1.25rem; background: none; border: none; cursor: pointer;" [style.left]="lang.isRtl() ? '1.25rem' : 'auto'" [style.right]="lang.isRtl() ? 'auto' : '1.25rem'">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-dark)" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>

          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
            <span className="badge badge-teal">{{ selectedCert.year }}</span>
          </div>

          <h2 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--primary-dark);">
            {{ lang.getText(selectedCert.title) }}
          </h2>

          <div style="font-size: 1.05rem; color: var(--accent-teal); font-weight: 700; margin-bottom: 1.25rem;">
            {{ lang.getText(selectedCert.issuingOrganization) }}
          </div>

          <div style="background-color: var(--bg-alt); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; font-size: 0.92rem;">
            <div><strong>Credential ID:</strong> {{ selectedCert.credentialId }}</div>
            <div><strong>Verification Status:</strong> Verified Demo Credential</div>
          </div>

          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <a *ngIf="selectedCert.verificationUrl" [href]="selectedCert.verificationUrl" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
              <span>{{ lang.isRtl() ? 'رابط التحقق الأكاديمي' : 'Verify Certificate Online' }}</span>
            </a>
            <button (click)="selectedCert = null" className="btn btn-outline btn-sm">
              {{ lang.isRtl() ? 'إغلاق' : 'Close' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CertificatesComponent {
  lang = inject(LanguageService);
  data = inject(DataService);

  selectedCert: CertificateItem | null = null;
}
