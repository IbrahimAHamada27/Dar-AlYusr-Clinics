import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Hero Section -->
    <section style="position: relative; padding: 4rem 0 5rem 0; overflow: hidden; background: linear-gradient(135deg, var(--bg-main) 0%, var(--primary-light) 100%);">
      <div className="container">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3.5rem; align-items: center;" class="hero-grid">
          <!-- Left/Right Text Content -->
          <div>
            <div
              style="display: inline-flex; align-items: center; gap: 0.5rem; background-color: var(--accent-teal-light); color: var(--accent-teal); padding: 0.4rem 1rem; border-radius: var(--radius-full); font-weight: 700; font-size: 0.88rem; margin-bottom: 1.25rem;"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
              <span>{{ lang.getText(profile.title) }}</span>
            </div>

            <h1 style="font-size: 2.75rem; font-weight: 900; color: var(--primary-dark); margin-bottom: 1.25rem; line-height: 1.15;">
              {{ lang.getText(profile.name) }}
            </h1>

            <p style="font-size: 1.15rem; color: var(--text-muted); margin-bottom: 2rem; line-height: 1.6; max-width: 580px;">
              {{ lang.getText(profile.brandTagline) }}
            </p>

            <!-- CTA Action Buttons -->
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;" class="hero-cta-group">
              <button (click)="nav('appointments')" class="btn btn-primary btn-lg" style="gap: 0.5rem;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                <span>{{ lang.ui().bookAppointment }}</span>
              </button>

              <button (click)="nav('about')" class="btn btn-outline btn-lg" style="gap: 0.5rem;">
                <span>{{ lang.ui().about }}</span>
                <svg *ngIf="!lang.isRtl()" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                <svg *ngIf="lang.isRtl()" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
              </button>
            </div>

            <!-- Quick Contact Callout -->
            <div style="margin-top: 2rem; display: flex; align-items: center; gap: 0.75rem; color: var(--primary-dark); font-weight: 700; font-size: 0.95rem;">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>{{ lang.isRtl() ? 'للحجز المباشر عبر الهاتفي والواتساب:' : 'Direct Phone & WhatsApp Booking:' }} <strong>01000577622</strong></span>
            </div>
          </div>

          <!-- Doctor Hero Portrait Frame -->
          <div style="position: relative; display: flex; justify-content: center;">
            <div
              style="position: relative; width: 100%; max-width: 440px; border-radius: var(--radius-xl); overflow: hidden; box-shadow: var(--shadow-xl); border: 4px solid #ffffff; background-color: #ffffff;"
            >
              <img
                [src]="profile.doctorPortrait"
                [alt]="lang.getText(profile.name)"
                style="width: 100%; height: auto; display: block; object-fit: cover; aspect-ratio: 4/5;"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Key Statistics Bar -->
    <section style="background-color: var(--primary-dark); color: #ffffff; padding: 2.5rem 0;">
      <div className="container">
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; text-align: center;" class="grid-responsive">
          <div>
            <div style="font-size: 2.5rem; font-weight: 900; color: var(--accent-teal); line-height: 1;">15+</div>
            <div style="font-size: 0.9rem; color: #CBD5E1; margin-top: 0.5rem;">{{ lang.ui().yearsExperience }}</div>
          </div>
          <div>
            <div style="font-size: 2.5rem; font-weight: 900; color: var(--accent-teal); line-height: 1;">40+</div>
            <div style="font-size: 0.9rem; color: #CBD5E1; margin-top: 0.5rem;">{{ lang.ui().publishedResearch }}</div>
          </div>
          <div>
            <div style="font-size: 2.5rem; font-weight: 900; color: var(--accent-teal); line-height: 1;">30+</div>
            <div style="font-size: 0.9rem; color: #CBD5E1; margin-top: 0.5rem;">{{ lang.ui().speakingConferences }}</div>
          </div>
          <div>
            <div style="font-size: 2.5rem; font-weight: 900; color: var(--accent-teal); line-height: 1;">10+</div>
            <div style="font-size: 0.9rem; color: #CBD5E1; margin-top: 0.5rem;">{{ lang.ui().verifiedCertificates }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Expertise & Specialties Grid -->
    <section style="padding: 5rem 0; background-color: var(--bg-main);">
      <div className="container">
        <div style="text-align: center; max-width: 700px; margin: 0 auto 3.5rem auto;">
          <span className="section-subtitle">{{ lang.isRtl() ? 'التخصصات الجراحية المتقدمة' : 'Surgical Specialties & Care' }}</span>
          <h2 className="section-title">{{ lang.isRtl() ? 'خدمات جراحة الأطفال والمناظير والطهارة بالليزر' : 'Specialized Pediatric Surgical Procedures' }}</h2>
        </div>

        <div className="grid-4">
          <div *ngFor="let item of data.expertise()" className="card" style="padding: 2rem; display: flex; flex-direction: column;">
            <div
              style="width: 50px; height: 50px; border-radius: var(--radius-md); background-color: var(--accent-teal-light); color: var(--accent-teal); display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem;"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.8 2.3A.3.3 0 0 0 4.5 2.6V5A6 6 0 0 0 16.5 5V2.6a.3.3 0 0 0-.3-.3h-1.4a.3.3 0 0 0-.3.3V5a3.5 3.5 0 0 1-7 0V2.6a.3.3 0 0 0-.3-.3H4.8z"/><path d="M10.5 11v6a3.5 3.5 0 0 0 7 0v-1"/><circle cx="17.5" cy="14.5" r="2.5"/></svg>
            </div>
            <h3 style="font-size: 1.2rem; margin-bottom: 0.75rem; color: var(--primary-dark);">{{ lang.getText(item.title) }}</h3>
            <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1.5rem; flex: 1;">
              {{ lang.getText(item.description) }}
            </p>
            <button (click)="nav('appointments')" className="btn btn-outline btn-sm" style="width: 100%; justify-content: center;">
              <span>{{ lang.ui().bookAppointment }}</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Clinic Locations Banner -->
    <section style="padding: 4rem 0; background-color: var(--primary-light);">
      <div className="container">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem;">
          <div>
            <span className="section-subtitle">{{ lang.isRtl() ? 'العيادة الرئيسية' : 'Primary Clinic Location' }}</span>
            <h3 style="font-size: 1.75rem; color: var(--primary-dark); font-weight: 800;">
              {{ lang.isRtl() ? 'عيادة مدينة العبور — مول أبو الدهب' : 'Obour City Clinic — Abu El-Dahab Mall' }}
            </h3>
            <p style="font-size: 1rem; color: var(--text-muted); margin-top: 0.5rem;">
              {{ lang.isRtl() ? 'مدينة العبور، الحي الأول، مول أبو الدهب، الدور الثاني (خلف سنتر العبور) • المواعيد: 7:00 م – 10:00 م' : 'Obour City, 1st District, Abu El-Dahab Mall, 2nd Floor (Behind Obour Center) • Sat-Thu 7 PM - 10 PM' }}
            </p>
          </div>
          <button (click)="nav('appointments')" className="btn btn-primary btn-lg">
            <span>{{ lang.ui().bookAppointment }}</span>
          </button>
        </div>
      </div>
    </section>

    <style>
      @media (max-width: 992px) {
        .hero-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        .grid-responsive { grid-template-columns: repeat(2, 1fr) !important; gap: 1.5rem !important; }
      }
      @media (max-width: 576px) {
        .grid-responsive { grid-template-columns: 1fr !important; }
      }
    </style>
  `
})
export class HomeComponent {
  lang = inject(LanguageService);
  data = inject(DataService);

  @Output() tabChange = new EventEmitter<string>();

  profile = this.data.getProfile();

  nav(tab: string): void {
    this.tabChange.emit(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
