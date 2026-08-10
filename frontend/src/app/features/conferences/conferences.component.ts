import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-conferences',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <!-- Hero Header -->
      <section style="background-color: var(--primary-light); padding: 4rem 0;">
        <div className="container" style="text-align: center; max-width: 800px;">
          <span className="section-subtitle">{{ lang.isRtl() ? 'المشاركات والتحدث' : 'Speaking & Congresses' }}</span>
          <h1 style="color: var(--primary-dark); margin-bottom: 1rem;">
            {{ lang.isRtl() ? 'المؤتمرات والندوات الطبية' : 'Conferences & Symposia' }}
          </h1>
          <p style="font-size: 1.1rem; color: var(--text-muted);">
            {{ lang.isRtl()
              ? 'مشاركات ومحاضرات علمية في أكبر المؤتمرات الطبية الإقليمية والدولية.'
              : 'Keynote lectures, panel chairings, and presentations at medical congresses.' }}
          </p>
        </div>
      </section>

      <!-- Upcoming Conferences -->
      <section *ngIf="getUpcomingConferences().length > 0" className="section">
        <div className="container">
          <div className="section-header" [style.text-align]="lang.isRtl() ? 'right' : 'left'" style="margin: 0 0 2rem 0;">
            <span className="badge badge-gold" style="margin-bottom: 0.5rem;">
              {{ lang.isRtl() ? 'مؤتمرات قادمة' : 'Upcoming Speaking Engagements' }}
            </span>
            <h2>{{ lang.isRtl() ? 'المؤتمرات القادمة' : 'Upcoming Conferences' }}</h2>
          </div>

          <div className="grid-2">
            <div *ngFor="let conf of getUpcomingConferences()" className="card" style="border-top: 4px solid var(--gold-accent); background-color: var(--primary-dark); color: #ffffff;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
                <span className="badge badge-gold">{{ lang.getText(conf.role) }}</span>
                <span style="font-size: 0.85rem; color: var(--gold-accent); font-weight: 600; display: flex; align-items: center; gap: 0.3rem;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                  {{ conf.date }}
                </span>
              </div>

              <h3 style="color: #ffffff; font-size: 1.3rem; margin-bottom: 0.5rem;">
                {{ lang.getText(conf.eventName) }}
              </h3>

              <div style="font-size: 0.9rem; color: #94A3B8; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.4rem;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>{{ lang.getText(conf.location) }}</span>
              </div>

              <div style="background-color: rgba(255,255,255,0.08); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.25rem;">
                <div style="font-size: 0.85rem; color: var(--gold-accent); font-weight: 700; margin-bottom: 0.25rem;">
                  {{ lang.isRtl() ? 'عنوان المحاضرة:' : 'Lecture Topic:' }}
                </div>
                <div style="font-size: 0.95rem; color: #ffffff; font-weight: 600;">
                  "{{ lang.getText(conf.topic) }}"
                </div>
              </div>

              <p *ngIf="conf.description" style="font-size: 0.88rem; color: #CBD5E1; line-height: 1.6; margin-bottom: 1.25rem;">
                {{ lang.getText(conf.description) }}
              </p>

              <a *ngIf="conf.externalLink" [href]="conf.externalLink" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" style="width: 100%; justify-content: center;">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
                <span>{{ lang.isRtl() ? 'موقع المؤتمر الرسمي' : 'Official Event Website' }}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Previous Conferences -->
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{{ lang.isRtl() ? 'أرشيف المشاركات' : 'Past Participation' }}</span>
            <h2>{{ lang.isRtl() ? 'المؤتمرات والمشاركات السابقة' : 'Previous Conferences' }}</h2>
          </div>

          <div className="grid-2">
            <div *ngFor="let conf of getPreviousConferences()" className="card card-hover" style="background-color: #ffffff;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
                <span className="badge badge-teal">{{ lang.getText(conf.role) }}</span>
                <span style="font-size: 0.85rem; color: var(--text-light); font-weight: 600;">
                  {{ conf.date }}
                </span>
              </div>

              <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: var(--primary-dark);">
                {{ lang.getText(conf.eventName) }}
              </h3>

              <div style="font-size: 0.9rem; color: var(--accent-teal); font-weight: 600; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.4rem;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>{{ lang.getText(conf.location) }}</span>
              </div>

              <div style="background-color: var(--bg-alt); padding: 0.85rem 1rem; border-radius: var(--radius-md); margin-bottom: 1rem;">
                <span style="font-size: 0.85rem; color: var(--text-muted);">
                  <strong>{{ lang.isRtl() ? 'الموضوع:' : 'Topic:' }}</strong> {{ lang.getText(conf.topic) }}
                </span>
              </div>

              <p *ngIf="conf.description" style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6;">
                {{ lang.getText(conf.description) }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class ConferencesComponent {
  lang = inject(LanguageService);
  data = inject(DataService);

  getUpcomingConferences() {
    return this.data.conferences().filter(c => c.isUpcoming);
  }

  getPreviousConferences() {
    return this.data.conferences().filter(c => !c.isUpcoming);
  }
}
