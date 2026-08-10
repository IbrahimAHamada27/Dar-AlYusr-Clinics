import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-publications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section style="background-color: var(--primary-light); padding: 3.5rem 0;">
      <div className="container" style="text-align: center; max-width: 800px;">
        <span className="section-subtitle">{{ lang.ui().publications }}</span>
        <h1 className="section-title">{{ lang.isRtl() ? 'الأبحاث والمنشورات العلمية المحكمة' : 'Peer-Reviewed Scientific Publications' }}</h1>
      </div>
    </section>

    <section style="padding: 5rem 0;">
      <div className="container" style="max-width: 950px;">
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <div *ngFor="let item of data.publications()" className="card" style="padding: 2rem; border-right: 4px solid var(--accent-teal);">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
              <span style="background-color: var(--accent-teal-light); color: var(--accent-teal); padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-weight: 700; font-size: 0.825rem;">
                {{ item.type }}
              </span>
              <span style="font-weight: 700; color: var(--text-muted); font-size: 0.9rem;">{{ item.year }}</span>
            </div>

            <h3 style="font-size: 1.3rem; color: var(--primary-dark); font-weight: 800; margin-bottom: 0.75rem; line-height: 1.35;">
              {{ lang.getText(item.title) }}
            </h3>

            <p style="font-size: 0.95rem; color: var(--accent-teal); font-weight: 700; margin-bottom: 0.5rem;">
              {{ item.authors }}
            </p>

            <p style="font-size: 0.9rem; color: var(--primary-navy); font-style: italic; margin-bottom: 1rem;">
              {{ item.journal }} • DOI: {{ item.doi }}
            </p>

            <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.65; margin-bottom: 1.25rem;">
              {{ lang.getText(item.abstract) }}
            </p>

            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.25rem;">
              <span *ngFor="let kw of item.keywords" style="background-color: var(--bg-alt); color: var(--text-main); padding: 0.25rem 0.65rem; border-radius: 4px; font-size: 0.8rem; font-weight: 600;">
                #{{ kw }}
              </span>
            </div>

            <div *ngIf="item.pdfUrl">
              <a [href]="item.pdfUrl" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                <span>{{ lang.isRtl() ? 'عرض الورقة العلمية (DOI)' : 'View Full Paper' }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class PublicationsComponent {
  lang = inject(LanguageService);
  data = inject(DataService);
}
