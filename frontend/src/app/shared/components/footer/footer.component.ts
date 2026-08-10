import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../core/services/language.service';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer style="background-color: var(--primary-dark); color: #ffffff; padding: 4.5rem 0 2rem 0; border-top: 4px solid var(--accent-teal);">
      <div class="container">
        <!-- Emergency Medical Alert Disclaimer Box -->
        <div
          style="background-color: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.4); border-radius: var(--radius-md); padding: 1.25rem 1.5rem; margin-bottom: 3.5rem; display: flex; align-items: flex-start; gap: 1rem;"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2" style="flex-shrink: 0; margin-top: 2px;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
          <div>
            <div style="font-weight: 800; font-size: 1.05rem; color: #F87171; margin-bottom: 0.25rem;">
              {{ lang.isRtl() ? 'إشعار الحالات الطبية الطارئة' : 'Emergency Medical Disclaimer' }}
            </div>
            <div style="font-size: 0.9rem; color: #E2E8F0; line-height: 1.6;">
              {{ lang.getText(settings.emergencyNotice) }}
            </div>
          </div>
        </div>

        <!-- Footer Main Grid -->
        <div class="grid-4" style="margin-bottom: 3.5rem; gap: 2.5rem;">
          <!-- Column 1: Brand & Bio -->
          <div>
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem;">
              <div
                style="width: 42px; height: 42px; border-radius: 10px; background-color: var(--accent-teal); color: #ffffff; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2"><path d="M4.8 2.3A.3.3 0 0 0 4.5 2.6V5A6 6 0 0 0 16.5 5V2.6a.3.3 0 0 0-.3-.3h-1.4a.3.3 0 0 0-.3.3V5a3.5 3.5 0 0 1-7 0V2.6a.3.3 0 0 0-.3-.3H4.8z"/><path d="M10.5 11v6a3.5 3.5 0 0 0 7 0v-1"/><circle cx="17.5" cy="14.5" r="2.5"/></svg>
              </div>
              <div style="font-weight: 800; font-size: 1.25rem; color: #ffffff;">
                {{ lang.getText(profile.name) }}
              </div>
            </div>
            <p style="color: var(--accent-teal); font-weight: 700; font-size: 0.9rem; margin-bottom: 1rem;">
              {{ lang.getText(profile.title) }}
            </p>
            <p style="font-size: 0.88rem; color: #94A3B8; line-height: 1.6;">
              {{ lang.getText(profile.brandTagline) }}
            </p>
          </div>

          <!-- Column 2: Quick Links -->
          <div>
            <h4 style="color: #ffffff; margin-bottom: 1.25rem; font-size: 1.1rem; position: relative;">
              {{ lang.ui().quickLinks }}
            </h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem;">
              <li *ngFor="let link of quickLinks">
                <button (click)="nav(link.id)" style="background: none; border: none; color: #94A3B8; font-size: 0.9rem; cursor: pointer; padding: 0; display: inline-flex; align-items: center; gap: 0.4rem;">
                  <svg *ngIf="!lang.isRtl()" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
                  <svg *ngIf="lang.isRtl()" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
                  <span>{{ link.label }}</span>
                </button>
              </li>
            </ul>
          </div>

          <!-- Column 3: Academic & Research Hub -->
          <div>
            <h4 style="color: #ffffff; margin-bottom: 1.25rem; font-size: 1.1rem;">
              {{ lang.ui().academicLinks }}
            </h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.75rem;">
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style="color: #94A3B8; font-size: 0.9rem; display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
                  <span>LinkedIn Profile</span>
                </a>
              </li>
              <li>
                <a href="https://scholar.google.com" target="_blank" rel="noopener noreferrer" style="color: #94A3B8; font-size: 0.9rem; display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                  <span>Google Scholar</span>
                </a>
              </li>
              <li>
                <a href="https://researchgate.net" target="_blank" rel="noopener noreferrer" style="color: #94A3B8; font-size: 0.9rem; display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>
                  <span>ResearchGate</span>
                </a>
              </li>
              <li>
                <a href="https://orcid.org" target="_blank" rel="noopener noreferrer" style="color: #94A3B8; font-size: 0.9rem; display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/></svg>
                  <span>ORCID Identifier</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Column 4: Contact & Clinics summary -->
          <div>
            <h4 style="color: #ffffff; margin-bottom: 1.25rem; font-size: 1.1rem;">
              {{ lang.isRtl() ? 'التواصل المباشر' : 'Direct Contact' }}
            </h4>
            <div style="display: flex; flex-direction: column; gap: 0.85rem; font-size: 0.9rem; color: #94A3B8;">
              <div style="display: flex; align-items: center; gap: 0.65rem;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span style="color: #ffffff; font-weight: 600;">{{ settings.contactPhone }}</span>
              </div>
              <div style="display: flex; align-items: center; gap: 0.65rem;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <span>{{ settings.contactEmail }}</span>
              </div>
              <div style="display: flex; align-items: center; gap: 0.65rem;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>{{ lang.isRtl() ? 'القاهرة والعبور ومصر القديمة، مصر' : 'Cairo, Obour & Moneeb, Egypt' }}</span>
              </div>

              <div style="margin-top: 1rem;">
                <button
                  (click)="nav('appointments')"
                  className="btn btn-primary btn-sm"
                  style="width: 100%; justify-content: center;"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                  <span>{{ lang.ui().bookAppointment }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Bottom Bar & General Disclaimer -->
        <div style="border-top: 1px solid rgba(255,255,255,0.12); padding-top: 1.75rem; font-size: 0.85rem; color: #64748B;">
          <div style="margin-bottom: 1.25rem; line-height: 1.6; text-align: center; max-width: 900px; margin: 0 auto 1.25rem auto;">
            <strong style="color: #94A3B8;">{{ lang.ui().medicalDisclaimer }}:</strong> {{ lang.getText(settings.disclaimerNotice) }}
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div>
              © 2026 {{ lang.getText(profile.name) }}. {{ lang.ui().allRightsReserved }}
            </div>
            <div style="display: flex; gap: 1.25rem;">
              <span style="cursor: pointer; color: #94A3B8;">{{ lang.ui().privacyPolicy }}</span>
              <span>•</span>
              <span style="cursor: pointer; color: #94A3B8;">{{ lang.ui().termsOfUse }}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  lang = inject(LanguageService);
  data = inject(DataService);

  @Output() tabChange = new EventEmitter<string>();

  profile = this.data.getProfile();
  settings = this.data.settings();

  get quickLinks() {
    const ui = this.lang.ui();
    return [
      { id: 'home', label: ui.home },
      { id: 'about', label: ui.about },
      { id: 'education', label: ui.education },
      { id: 'certificates', label: ui.certificates },
      { id: 'publications', label: ui.publications },
      { id: 'articles', label: ui.articles },
      { id: 'clinics', label: ui.clinics },
      { id: 'contact', label: ui.contact }
    ];
  }

  nav(tab: string): void {
    this.tabChange.emit(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
