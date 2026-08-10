import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-research',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section style="background-color: var(--primary-light); padding: 3.5rem 0;">
      <div className="container" style="text-align: center; max-width: 800px;">
        <span className="section-subtitle">{{ lang.ui().researchAreas }}</span>
        <h1 className="section-title">{{ lang.isRtl() ? 'الاهتمامات والمشاريع البحثية' : 'Scientific Research Focus' }}</h1>
      </div>
    </section>

    <section style="padding: 5rem 0;">
      <div className="container">
        <h2 style="font-size: 1.75rem; color: var(--primary-dark); font-weight: 800; margin-bottom: 2rem;">
          {{ lang.ui().researchAreas }}
        </h2>
        <div className="grid-2" style="margin-bottom: 4rem; gap: 2rem;">
          <div *ngFor="let item of data.researchAreas()" className="card" style="padding: 2rem; border-top: 4px solid var(--accent-teal);">
            <h3 style="font-size: 1.3rem; color: var(--primary-dark); font-weight: 800; margin-bottom: 1rem;">
              {{ lang.getText(item.title) }}
            </h3>
            <p style="font-size: 1rem; color: var(--text-muted); line-height: 1.7;">
              {{ lang.getText(item.description) }}
            </p>
          </div>
        </div>

        <h2 style="font-size: 1.75rem; color: var(--primary-dark); font-weight: 800; margin-bottom: 2rem;">
          {{ lang.ui().ongoingProjects }}
        </h2>
        <div className="grid-1" style="gap: 1.5rem;">
          <div *ngFor="let proj of data.researchProjects()" className="card" style="padding: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
              <h3 style="font-size: 1.25rem; color: var(--primary-dark); font-weight: 800;">{{ lang.getText(proj.title) }}</h3>
              <span [style.background-color]="proj.status === 'Completed' ? 'var(--accent-teal-light)' : 'rgba(234, 179, 8, 0.15)'"
                    [style.color]="proj.status === 'Completed' ? 'var(--accent-teal)' : '#D97706'"
                    style="padding: 0.3rem 0.85rem; border-radius: var(--radius-full); font-weight: 700; font-size: 0.85rem;">
                {{ proj.status }}
              </span>
            </div>
            <p style="font-size: 0.95rem; color: var(--accent-teal); font-weight: 600; margin-bottom: 1rem;">
              {{ lang.getText(proj.institution) }} • {{ proj.year }}
            </p>
            <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6;">
              {{ lang.getText(proj.description) }}
            </p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ResearchComponent {
  lang = inject(LanguageService);
  data = inject(DataService);
}
