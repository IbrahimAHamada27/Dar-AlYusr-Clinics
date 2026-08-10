import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { DataService } from '../../core/services/data.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-clinics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <!-- Hero Header -->
      <section style="background-color: var(--primary-light); padding: 4rem 0;">
        <div className="container" style="text-align: center; max-width: 800px;">
          <span className="section-subtitle">{{ lang.isRtl() ? 'مواقع العيادات والرعاية' : 'Practices & Locations' }}</span>
          <h1 style="color: var(--primary-dark); margin-bottom: 1rem;">
            {{ lang.isRtl() ? 'عناوين ومواعيد العيادات' : 'Clinic Locations & Schedules' }}
          </h1>
          <p style="font-size: 1.1rem; color: var(--text-muted);">
            {{ lang.isRtl()
              ? 'اختر الفرع والمدينة الأنسب لك واستكشف مواعيد العمل والخدمات المتاحة.'
              : 'Choose the location that works best for you and book your consultation.' }}
          </p>
        </div>
      </section>

      <!-- Clinics Detail Section -->
      <section className="section">
        <div className="container">
          <div style="display: flex; flex-direction: column; gap: 3rem;">
            <div *ngFor="let clinic of data.getClinics()" className="card" style="padding: 2.5rem; background-color: #ffffff;">
              <div style="display: flex; gap: 2.5rem; flex-wrap: wrap;">
                <!-- Left Clinic Info -->
                <div style="flex: 1 1 450px;">
                  <div style="display: flex; items-center: center; gap: 0.75rem; margin-bottom: 1rem;">
                    <span className="badge badge-navy">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                      {{ lang.getText(clinic.city) }}
                    </span>
                    <span className="badge badge-teal">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
                      {{ lang.isRtl() ? 'عيادة معتمدة' : 'Verified Clinic' }}
                    </span>
                  </div>

                  <h2 style="font-size: 2rem; color: var(--primary-dark); margin-bottom: 0.75rem;">
                    {{ lang.getText(clinic.name) }}
                  </h2>

                  <p style="font-size: 1.05rem; color: var(--text-muted); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    <span>{{ lang.getText(clinic.address) }}</span>
                  </p>

                  <div style="display: flex; align-items: center; gap: 0.6rem; font-size: 1.05rem; font-weight: 700; color: var(--primary-navy); margin-bottom: 2rem;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    <span>{{ clinic.phone }}</span>
                  </div>

                  <!-- Working Hours -->
                  <div style="background-color: var(--bg-alt); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 2rem;">
                    <h4 style="color: var(--primary-dark); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      <span>{{ lang.isRtl() ? 'جدول ومواعيد العيادة:' : 'Working Hours Schedule:' }}</span>
                    </h4>
                    <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.4rem;">
                      <li *ngFor="let wh of clinic.workingHours" style="font-size: 0.95rem; color: var(--text-main); font-weight: 600;">
                        • {{ lang.getText(wh) }}
                      </li>
                    </ul>
                  </div>

                  <!-- Available Services Tags -->
                  <div style="margin-bottom: 2rem;">
                    <h4 style="font-size: 0.95rem; color: var(--primary-dark); margin-bottom: 0.75rem;">
                      {{ lang.isRtl() ? 'الخدمات الطبية المتاحة:' : 'Available Medical Services:' }}
                    </h4>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                      <span *ngFor="let srv of clinic.services" style="display: inline-flex; align-items: center; gap: 0.35rem; background-color: var(--accent-teal-light); color: var(--accent-teal-hover); padding: 0.35rem 0.75rem; border-radius: var(--radius-full); font-size: 0.85rem; font-weight: 600;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                        {{ lang.getText(srv.name) }}
                      </span>
                    </div>
                  </div>

                  <!-- Action Buttons -->
                  <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                    <button (click)="bookClinic(clinic.id)" className="btn btn-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                      <span>{{ lang.ui().bookAppointment }}</span>
                    </button>

                    <a *ngIf="clinic.mapLocationUrl" [href]="clinic.mapLocationUrl" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
                      <span>{{ lang.ui().getDirections }}</span>
                    </a>
                  </div>
                </div>

                <!-- Right Map Embed View -->
                <div style="flex: 1 1 350px; min-height: 300px; border-radius: var(--radius-lg); overflow: hidden; border: 1px solid var(--border-light);">
                  <iframe
                    [title]="lang.getText(clinic.name)"
                    [src]="getMapUrl(clinic.googleMapsEmbedUrl)"
                    width="100%"
                    height="100%"
                    style="border: 0; min-height: 320px;"
                    allowfullscreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class ClinicsComponent {
  lang = inject(LanguageService);
  data = inject(DataService);
  sanitizer = inject(DomSanitizer);

  @Output() tabChange = new EventEmitter<string>();
  @Output() selectClinic = new EventEmitter<string>();

  bookClinic(clinicId: string): void {
    this.selectClinic.emit(clinicId);
    this.tabChange.emit('appointments');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getMapUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
