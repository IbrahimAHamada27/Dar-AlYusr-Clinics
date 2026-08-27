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
        <div class="container" style="text-align: center; max-width: 800px;">
          <span class="section-subtitle">{{ lang.isRtl() ? 'السيرة المهنية والسريرية' : 'Doctor Profile & Background' }}</span>
          <h1 style="color: var(--primary-dark); margin-bottom: 1rem;">
            {{ lang.isRtl() ? 'عن د. أمل محمد عبدالستار حماده' : 'About Dr. Aml Mohamed Abd El-Sattar Hamada' }}
          </h1>
          <p style="font-size: 1.2rem; color: var(--accent-teal); font-weight: 600;">
            {{ lang.isRtl() ? 'الرعاية السريرية والأكاديمية، البحث العلمي، ورعاية الوافدين وحقوق الإنسان' : 'Clinical & Academic Care, Medical Research, International Student Affairs & Human Rights.' }}
          </p>
        </div>
      </section>

      <!-- Main Biography Section -->
      <section class="section">
        <div class="container">
          <div style="display: flex; gap: 3.5rem; flex-wrap: wrap; align-items: center;">
            <div style="flex: 1 1 350px; max-width: 420px;">
              <div
                style="border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-md); border: 1px solid var(--border-light);"
              >
                <img
                  [src]="profile.doctorSecondaryPortrait || profile.doctorPortrait"
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
                  ? 'تركز د. أمل محمد عبدالستار حماده في عملها الأكاديمي والسريري على التميز في أبحاث التشريح وعلم الأجنة ورعاية الطلاب الوافدين وإدارة وحدة حقوق الإنسان بكلية الطب جامعة طنطا، بجانب تقديم أفضل استشارات طب النساء والتوليد.'
                  : 'Dr. Aml Mohamed Abd El-Sattar Hamada prioritizes academic research excellence in human anatomy and embryology, compassionate clinical care in obstetrics & gynecology, and leadership in international student affairs and human rights advocacy.' }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Career Timeline -->
      <section class="section section-alt">
        <div class="container">
          <div class="section-header">
            <span class="section-subtitle">{{ lang.isRtl() ? 'المسار الميداني' : 'Career Progression' }}</span>
            <h2>{{ lang.isRtl() ? 'الخبرات والمسيرة المهنية' : 'Professional Experience' }}</h2>
          </div>

          <div style="max-width: 850px; margin: 0 auto;">
            <div
              *ngFor="let item of data.timeline()"
              style="display: flex; gap: 1.5rem; margin-bottom: 2rem; position: relative;"
            >
              <!-- Timeline Year Pill -->
              <div style="flex: 0 0 140px;" [style.text-align]="lang.isRtl() ? 'left' : 'right'">
                <span class="badge badge-navy" style="font-size: 0.85rem;">
                  {{ item.period }}
                </span>
              </div>

              <!-- Timeline Content Card -->
              <div
                class="card"
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
      <section class="section">
        <div class="container">
          <div class="section-header">
            <span class="section-subtitle">{{ lang.isRtl() ? 'الاهتمامات التخصصية' : 'Focus Areas' }}</span>
            <h2>{{ lang.isRtl() ? 'الاهتمامات المهنية والحالية' : 'Current Professional Interests' }}</h2>
          </div>

          <div class="grid-3">
            <div
              *ngFor="let interest of interests"
              class="card card-hover"
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
    { en: 'Human Anatomy & Embryology', ar: 'التشريح الآدمي وعلم الأجنة' },
    { en: 'Obstetrics & Gynecology (OB-GYN)', ar: 'استشارات النساء والتوليد' },
    { en: 'Polycystic Ovarian Syndrome (PCOS)', ar: 'متلازمة تكيس المبايض والرعاية الأيضية' },
    { en: 'Histology & Cellular Signaling', ar: 'الهستولوجي وإشارات الخلايا ومضادات الأكسدة' },
    { en: 'Human Rights in Healthcare', ar: 'حقوق الإنسان والرعاية الأخلاقية' },
    { en: 'International Student Affairs', ar: 'رعاية الطلاب الوافدين بالجامعة' }
  ];

  nav(tab: string): void {
    this.tabChange.emit(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
