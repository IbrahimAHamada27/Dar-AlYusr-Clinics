import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <!-- Hero Section -->
      <section style="background-color: var(--primary-light); padding: 4rem 0;">
        <div className="container" style="text-align: center; max-width: 800px;">
          <span className="section-subtitle">{{ lang.isRtl() ? 'السيرة المهنية والسريرية' : 'Doctor Profile & Background' }}</span>
          <h1 style="color: var(--primary-dark); margin-bottom: 1rem;">
            {{ lang.isRtl() ? 'عن د. إبراهيم الشرقاوي' : 'About Dr. Ibrahim El Sherqawy' }}
          </h1>
          <p style="font-size: 1.2rem; color: var(--accent-teal); font-weight: 600;">
            {{ lang.isRtl() ? 'الرعاية السريرية والتعلم المستمر والبحث العلمي' : 'Clinical Care, Continuous Learning, and Medical Research.' }}
          </p>
        </div>
      </section>

      <!-- Main Biography Section -->
      <section className="section">
        <div className="container">
          <div style="display: flex; gap: 3.5rem; flex-wrap: wrap; align-items: center;">
            <div style="flex: 1 1 350px; max-width: 420px;">
              <div
                style="border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-md); border: 1px solid var(--border-light);"
              >
                <img
                  [src]="profile.doctorPortrait"
                  [alt]="lang.getText(profile.name)"
                  style="width: 100%; height: auto; display: block;"
                />
              </div>
            </div>

            <div style="flex: 1 1 500px;">
              <h2 style="margin-bottom: 1.25rem; color: var(--primary-dark);">
                {{ lang.isRtl() ? 'السيرة الذاتية والمهنية' : 'Professional Biography' }}
              </h2>
              <p style="font-size: 1.05rem; line-height: 1.8; margin-bottom: 1.5rem; color: var(--text-muted);">
                {{ lang.getText(profile.fullBio) }}
              </p>
              <p style="font-size: 1.05rem; line-height: 1.8; color: var(--text-muted);">
                {{ lang.isRtl()
                  ? 'يركز د. إبراهيم الشرقاوي في ممارسته اليومية على توفير التشخيص المبكر والدقيق لحالات السكري وارتفاع ضغط الدم والاضطرابات الأيضية، مع وضع خطة علاجية مخصصة تناسب أسلوب حياة كل مريض.'
                  : 'Dr. Ibrahim El Sherqawy prioritizes patient empowerment through early diagnostic screening, personalized treatment protocols, and preventive lifestyle modifications.' }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Career Timeline -->
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{{ lang.isRtl() ? 'المسار الميداني' : 'Career Progression' }}</span>
            <h2>{{ lang.isRtl() ? 'الخبرات والمسيرة المهنية' : 'Professional Experience' }}</h2>
          </div>

          <div style="max-width: 850px; margin: 0 auto;">
            <div
              *ngFor="let item of data.timeline()"
              style="display: flex; gap: 1.5rem; margin-bottom: 2rem; position: relative;"
            >
              <!-- Timeline Year Pill -->
              <div style="flex: 0 0 140px;" [style.text-align]="lang.isRtl() ? 'left' : 'right'">
                <span className="badge badge-navy" style="font-size: 0.85rem;">
                  {{ item.period }}
                </span>
              </div>

              <!-- Timeline Content Card -->
              <div
                className="card"
                style="flex: 1; background-color: #ffffff; border-left: 4px solid var(--accent-teal);"
              >
                <h3 style="font-size: 1.2rem; margin-bottom: 0.35rem; color: var(--primary-dark);">
                  {{ lang.getText(item.role) }}
                </h3>
                <div style="font-size: 0.92rem; color: var(--accent-teal); font-weight: 600; margin-bottom: 0.5rem;">
                  {{ lang.getText(item.institution) }}
                </div>
                <p *ngIf="item.description" style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6;">
                  {{ lang.getText(item.description) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Current Professional Interests -->
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{{ lang.isRtl() ? 'الاهتمامات التخصصية' : 'Focus Areas' }}</span>
            <h2>{{ lang.isRtl() ? 'الاهتمامات المهنية والحالية' : 'Current Professional Interests' }}</h2>
          </div>

          <div className="grid-3">
            <div
              *ngFor="let interest of interests"
              className="card card-hover"
              style="display: flex; align-items: center; gap: 1rem; padding: 1.25rem 1.5rem;"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
              <span style="font-weight: 700; font-size: 1.05rem; color: var(--primary-dark);">
                {{ lang.getText(interest) }}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class AboutComponent {
  lang = inject(LanguageService);
  data = inject(DataService);

  @Output() tabChange = new EventEmitter<string>();

  profile = this.data.getProfile();

  interests = [
    { en: 'Internal Medicine', ar: 'الأمراض الباطنية العامة' },
    { en: 'Diabetes Management', ar: 'علاج ورعاية السكري' },
    { en: 'Hypertension', ar: 'ارتفاع ضغط الدم' },
    { en: 'Cardiometabolic Risk', ar: 'مخاطر أمراض القلب والأيض' },
    { en: 'Preventive Healthcare', ar: 'الرعاية الصحية الوقائية' },
    { en: 'Clinical Research', ar: 'البحث العلمي السريري' }
  ];

  nav(tab: string): void {
    this.tabChange.emit(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
