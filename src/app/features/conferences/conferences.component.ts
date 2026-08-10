import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-conferences',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section style="background-color: var(--primary-light); padding: 3.5rem 0;">
      <div className="container" style="text-align: center; max-width: 800px;">
        <span className="section-subtitle">{{ lang.ui().conferences }}</span>
        <h1 className="section-title">{{ lang.isRtl() ? 'المؤتمرات والمشاركات العلمية' : 'Conferences & Keynote Lectures' }}</h1>
      </div>
    </section>

    <section style="padding: 5rem 0;">
      <div className="container">
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <div *ngFor="let item of data.conferences()" className="card" style="padding: 2rem; border-right: 4px solid var(--accent-teal);">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
              <h3 style="font-size: 1.3rem; color: var(--primary-dark); font-weight: 800;">{{ lang.getText(item.eventName) }}</h3>
              <span style="background-color: var(--accent-teal-light); color: var(--accent-teal); padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-weight: 700; font-size: 0.825rem;">
                {{ item.date }}
              </span>
            </div>

            <p style="font-size: 0.95rem; color: var(--accent-teal); font-weight: 700; margin-bottom: 0.5rem;">
              {{ lang.getText(item.role) }} • {{ lang.getText(item.location) }}
            </p>

            <p style="font-size: 1rem; color: var(--primary-navy); font-weight: 600; margin-bottom: 0.75rem;">
              {{ lang.isRtl() ? 'موضوع المحاضرة:' : 'Topic:' }} {{ lang.getText(item.topic) }}
            </p>

            <p *ngIf="item.description" style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6;">
              {{ lang.getText(item.description) }}
            </p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ConferencesComponent {
  lang = inject(LanguageService);
  data = inject(DataService);
}
