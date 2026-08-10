import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-social-media',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <!-- Hero Header -->
      <section style="background-color: var(--primary-light); padding: 4rem 0;">
        <div className="container" style="text-align: center; max-width: 800px;">
          <span className="section-subtitle">{{ lang.isRtl() ? 'التواصل الأكاديمي والمهني' : 'Digital Network' }}</span>
          <h1 style="color: var(--primary-dark); margin-bottom: 1rem;">
            {{ lang.isRtl() ? 'الملفات المهنية والأكاديمية' : 'Professional & Academic Profiles' }}
          </h1>
          <p style="font-size: 1.1rem; color: var(--text-muted);">
            {{ lang.isRtl()
              ? 'تواصل وتفاعل عبر الشبكات الاجتماعية الرسمية والمنصات الأكاديمية العالمية.'
              : 'Connect with Dr. Ibrahim across professional networks and academic research databases.' }}
          </p>
        </div>
      </section>

      <!-- 1. Academic Profiles Grid -->
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{{ lang.isRtl() ? 'قواعد البيانات البحثية' : 'Research Databases' }}</span>
            <h2>{{ lang.isRtl() ? 'الملفات الأكاديمية والبحثية' : 'Academic & Citation Profiles' }}</h2>
          </div>

          <div className="grid-3">
            <a
              *ngFor="let profile of getAcademicLinks()"
              [href]="profile.url"
              target="_blank"
              rel="noopener noreferrer"
              className="card card-hover"
              style="display: flex; flex-direction: column; justify-content: space-between; border-left: 4px solid var(--accent-teal);"
            >
              <div>
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                  <div
                    style="width: 46px; height: 46px; border-radius: 10px; background-color: var(--bg-alt); display: flex; align-items: center; justify-content: center;"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                  </div>
                  <span className="badge badge-teal">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg> Indexed
                  </span>
                </div>

                <h3 style="font-size: 1.25rem; margin-bottom: 0.4rem; color: var(--primary-dark);">
                  {{ profile.platform }}
                </h3>

                <p *ngIf="profile.description" style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 1.25rem;">
                  {{ lang.getText(profile.description) }}
                </p>
              </div>

              <div style="display: flex; align-items: center; gap: 0.4rem; color: var(--accent-teal); font-weight: 700; font-size: 0.9rem;">
                <span>{{ lang.isRtl() ? 'زيارة الملف الأكاديمي' : 'View Academic Profile' }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
              </div>
            </a>
          </div>
        </div>
      </section>

      <!-- 2. Social Media Grid -->
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{{ lang.isRtl() ? 'التواصل الاجتماعي' : 'Social Channels' }}</span>
            <h2>{{ lang.isRtl() ? 'حسابات التواصل الاجتماعي' : 'Official Social Media' }}</h2>
          </div>

          <div className="grid-3">
            <a
              *ngFor="let social of getSocialLinks()"
              [href]="social.url"
              target="_blank"
              rel="noopener noreferrer"
              className="card card-hover"
              style="display: flex; flex-direction: column; justify-content: space-between; background-color: #ffffff;"
            >
              <div>
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                  <div
                    style="width: 46px; height: 46px; border-radius: 10px; background-color: var(--bg-alt); display: flex; align-items: center; justify-content: center;"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-navy)" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-light)" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
                </div>

                <h3 style="font-size: 1.25rem; margin-bottom: 0.4rem; color: var(--primary-dark);">
                  {{ social.platform }}
                </h3>

                <p *ngIf="social.description" style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 1.25rem;">
                  {{ lang.getText(social.description) }}
                </p>
              </div>

              <div style="display: flex; align-items: center; gap: 0.4rem; color: var(--primary-navy); font-weight: 700; font-size: 0.9rem;">
                <span>{{ lang.isRtl() ? 'متابعة الصفحة' : 'Follow Channel' }}</span>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  `
})
export class SocialMediaComponent {
  lang = inject(LanguageService);
  data = inject(DataService);

  getAcademicLinks() {
    return this.data.socialLinks().filter(s => s.category === 'Academic');
  }

  getSocialLinks() {
    return this.data.socialLinks().filter(s => s.category === 'Social');
  }
}
