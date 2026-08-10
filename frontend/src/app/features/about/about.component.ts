import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section style="background-color: var(--primary-light); padding: 3.5rem 0;">
      <div className="container" style="text-align: center; max-width: 800px;">
        <span className="section-subtitle">{{ lang.isRtl() ? 'الملف الطبي والسيرة الذاتية' : 'Doctor Profile & Background' }}</span>
        <h1 className="section-title">{{ lang.getText(profile.name) }}</h1>
        <p style="font-size: 1.1rem; color: var(--accent-teal); font-weight: 700;">
          {{ lang.getText(profile.title) }}
        </p>
      </div>
    </section>

    <section style="padding: 5rem 0;">
      <div className="container">
        <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 3.5rem; align-items: flex-start;" class="grid-responsive">
          <div className="card" style="padding: 1.5rem; text-align: center;">
            <img
              [src]="profile.doctorPortrait"
              [alt]="lang.getText(profile.name)"
              style="width: 100%; border-radius: var(--radius-lg); margin-bottom: 1.5rem; aspect-ratio: 4/5; object-fit: cover;"
            />
            <h3 style="font-size: 1.25rem; color: var(--primary-dark); font-weight: 800; margin-bottom: 0.5rem;">
              {{ lang.getText(profile.name) }}
            </h3>
            <p style="fontSize: 0.9rem; color: var(--accent-teal); font-weight: 600; margin-bottom: 1rem;">
              {{ lang.getText(profile.specialty) }}
            </p>
            <button (click)="nav('appointments')" className="btn btn-primary" style="width: 100%; justify-content: center;">
              {{ lang.ui().bookAppointment }}
            </button>
          </div>

          <div>
            <h2 style="font-size: 1.8rem; color: var(--primary-dark); margin-bottom: 1.5rem; font-weight: 800;">
              {{ lang.isRtl() ? 'عن الطبيب والمسيرة الجراحية' : 'Biography & Surgical Practice' }}
            </h2>
            <p style="font-size: 1.05rem; color: var(--text-main); line-height: 1.8; margin-bottom: 1.75rem;">
              {{ lang.getText(profile.fullBio) }}
            </p>

            <h3 style="font-size: 1.35rem; color: var(--primary-dark); margin-bottom: 1.25rem; font-weight: 800;">
              {{ lang.isRtl() ? 'المسار المهني والتاريخ الوظيفي' : 'Career Timeline & Experience' }}
            </h3>

            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
              <div *ngFor="let item of data.timeline()" className="card" style="padding: 1.5rem; border-right: 4px solid var(--accent-teal);">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.5rem;">
                  <h4 style="font-size: 1.1rem; color: var(--primary-dark); font-weight: 800;">{{ lang.getText(item.role) }}</h4>
                  <span style="background-color: var(--accent-teal-light); color: var(--accent-teal); padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.825rem; font-weight: 700;">
                    {{ item.period }}
                  </span>
                </div>
                <p style="font-size: 0.95rem; color: var(--accent-teal); font-weight: 600; margin-bottom: 0.75rem;">
                  {{ lang.getText(item.institution) }}
                </p>
                <p *ngIf="item.description" style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6;">
                  {{ lang.getText(item.description) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class AboutComponent {
  lang = inject(LanguageService);
  data = inject(DataService);

  @Output() tabChange = new EventEmitter<string>();

  profile = this.data.getProfile();

  nav(tab: string): void {
    this.tabChange.emit(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
