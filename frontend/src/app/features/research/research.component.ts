import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-research',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <!-- Hero Section -->
      <section style="background-color: var(--primary-light); padding: 4rem 0;">
        <div class="container" style="text-align: center; max-width: 800px;">
          <span class="section-subtitle">{{ lang.isRtl() ? 'البحث العلمي والأكاديمي' : 'Scientific Contributions' }}</span>
          <h1 style="color: var(--primary-dark); margin-bottom: 1rem;">
            {{ lang.isRtl() ? 'البحث والاهتمامات العلمية' : 'Research & Scientific Interests' }}
          </h1>
          <p style="font-size: 1.15rem; color: var(--text-muted); line-height: 1.7;">
            "{{ lang.isRtl()
              ? 'يُعد البحث العلمي ركيزة أساسية للتطوير الطبي المستمر. يستعرض هذا القسم الاهتمامات والمشاريع والمساهمات الأكاديمية للدكتور.'
              : 'Scientific research is an essential part of continuous medical development. This section presents the doctor\\'s research interests, projects, and areas of academic contribution.' }}"
          </p>
        </div>
      </section>

      <!-- Research Areas -->
      <section class="section">
        <div class="container">
          <div class="section-header">
            <span class="section-subtitle">{{ lang.isRtl() ? 'المحاور الأكاديمية' : 'Key Pillars' }}</span>
            <h2>{{ lang.isRtl() ? 'مجالات البحث العلمي' : 'Research Areas' }}</h2>
          </div>

          <div class="grid-3">
            <div *ngFor="let area of data.researchAreas()" class="card card-hover">
              <div style="margin-bottom: 1rem;">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>
              </div>
              <h3 style="font-size: 1.2rem; margin-bottom: 0.65rem; color: var(--primary-dark);">
                {{ lang.getText(area.title) }}
              </h3>
              <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.6;">
                {{ lang.getText(area.description) }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Research Projects -->
      <section class="section section-alt">
        <div class="container">
          <div class="section-header">
            <span class="section-subtitle">{{ lang.isRtl() ? 'المشاريع الجارية والمكتملة' : 'Clinical Initiatives' }}</span>
            <h2>{{ lang.isRtl() ? 'المشاريع والأبحاث التطبيقية' : 'Research Projects' }}</h2>
          </div>

          <div class="grid-2">
            <div *ngFor="let project of data.researchProjects()" class="card card-hover" style="background-color: #ffffff;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                <span [class]="project.status === 'Completed' ? 'badge badge-teal' : 'badge badge-gold'">
                  <svg *ngIf="project.status === 'Completed'" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <svg *ngIf="project.status !== 'Completed'" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  {{ project.status }}
                </span>
                <span style="font-size: 0.88rem; font-weight: 700; color: var(--primary-navy);">
                  {{ project.year }}
                </span>
              </div>

              <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--primary-dark);">
                {{ lang.getText(project.title) }}
              </h3>

              <div style="font-size: 0.9rem; color: var(--accent-teal); font-weight: 600; margin-bottom: 1rem;">
                {{ lang.getText(project.institution) }}
              </div>

              <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.7;">
                {{ lang.getText(project.description) }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class ResearchComponent {
  lang = inject(LanguageService);
  data = inject(DataService);
}
