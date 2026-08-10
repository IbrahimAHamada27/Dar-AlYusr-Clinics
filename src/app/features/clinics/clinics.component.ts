import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-clinics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section style="background-color: var(--primary-light); padding: 3.5rem 0;">
      <div className="container" style="text-align: center; max-width: 800px;">
        <span className="section-subtitle">{{ lang.ui().clinics }}</span>
        <h1 className="section-title">{{ lang.isRtl() ? 'مواقع العيادات ومواعيد العمل' : 'Clinic Locations & Schedules' }}</h1>
      </div>
    </section>

    <section style="padding: 5rem 0;">
      <div className="container">
        <div style="display: flex; flex-direction: column; gap: 2.5rem;">
          <div *ngFor="let clinic of data.getClinics()" className="card" style="padding: 2.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem;" class="grid-responsive">
            <div>
              <span style="background-color: var(--accent-teal-light); color: var(--accent-teal); padding: 0.3rem 0.85rem; border-radius: var(--radius-full); font-weight: 700; font-size: 0.85rem; display: inline-block; margin-bottom: 1rem;">
                {{ lang.getText(clinic.city) }}
              </span>

              <h2 style="font-size: 1.6rem; color: var(--primary-dark); font-weight: 800; margin-bottom: 1rem;">
                {{ lang.getText(clinic.name) }}
              </h2>

              <p style="font-size: 1rem; color: var(--text-main); line-height: 1.6; margin-bottom: 1.25rem;">
                <strong>{{ lang.isRtl() ? 'العنوان تفصيلاً:' : 'Address:' }}</strong> {{ lang.getText(clinic.address) }}
              </p>

              <p style="font-size: 1.1rem; color: var(--primary-dark); font-weight: 700; margin-bottom: 1.5rem;">
                {{ lang.isRtl() ? 'رقم الهاتف والواتساب:' : 'Phone & WhatsApp:' }} <span style="color: var(--accent-teal);">{{ clinic.phone }}</span>
              </p>

              <button (click)="nav('appointments')" className="btn btn-primary btn-lg">
                <span>{{ lang.ui().bookAppointment }}</span>
              </button>
            </div>

            <div style="background-color: var(--bg-alt); padding: 1.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
              <h4 style="font-size: 1.15rem; color: var(--primary-dark); font-weight: 800; margin-bottom: 1rem;">
                {{ lang.isRtl() ? 'مواعيد العمل:' : 'Working Hours:' }}
              </h4>

              <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.75rem; padding: 0; margin-bottom: 1.5rem;">
                <li *ngFor="let wh of clinic.workingHours" style="font-size: 0.95rem; color: var(--text-main); font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span>{{ lang.getText(wh) }}</span>
                </li>
              </ul>

              <h4 style="font-size: 1.1rem; color: var(--primary-dark); font-weight: 800; margin-bottom: 0.75rem;">
                {{ lang.isRtl() ? 'الخدمات المتاحة بالفرع:' : 'Services Available:' }}
              </h4>

              <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                <div *ngFor="let srv of clinic.services" style="font-size: 0.9rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.5rem;">
                  <span style="color: var(--accent-teal);">•</span>
                  <span>{{ lang.getText(srv.name) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <style>
      @media (max-width: 992px) {
        .grid-responsive { grid-template-columns: 1fr !important; }
      }
    </style>
  `
})
export class ClinicsComponent {
  lang = inject(LanguageService);
  data = inject(DataService);

  @Output() tabChange = new EventEmitter<string>();

  nav(tab: string): void {
    this.tabChange.emit(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
