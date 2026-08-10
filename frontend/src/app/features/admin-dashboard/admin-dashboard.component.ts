import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../core/services/language.service';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section style="background-color: var(--primary-dark); color: #ffffff; padding: 2.5rem 0;">
      <div className="container" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--accent-teal); font-weight: 700;">CMS DASHBOARD</div>
          <h1 style="font-size: 1.75rem; font-weight: 800;">{{ lang.isRtl() ? 'لوحة إدراة البيانات والمحتوى الطبي' : 'Medical Content Management System' }}</h1>
        </div>
        <button (click)="data.resetToDefaults()" className="btn btn-outline btn-sm" style="color: #ffffff; border-color: rgba(255,255,255,0.3);">
          {{ lang.isRtl() ? 'استعادة البيانات الافتراضية' : 'Reset Demo Data' }}
        </button>
      </div>
    </section>

    <section style="padding: 3rem 0; background-color: var(--bg-main);">
      <div className="container">
        <!-- Admin Navigation Tabs -->
        <div style="display: flex; gap: 0.5rem; border-bottom: 2px solid var(--border-light); margin-bottom: 2rem; overflow-x: auto; padding-bottom: 0.5rem;">
          <button *ngFor="let tab of tabs"
                  (click)="activeTab = tab.id"
                  [style.border-bottom-color]="activeTab === tab.id ? 'var(--accent-teal)' : 'transparent'"
                  [style.color]="activeTab === tab.id ? 'var(--accent-teal)' : 'var(--text-main)'"
                  [style.font-weight]="activeTab === tab.id ? 800 : 600"
                  style="padding: 0.6rem 1.1rem; border: none; border-bottom: 3px solid transparent; background: none; cursor: pointer; white-space: nowrap; font-size: 0.95rem;">
            {{ tab.label }}
          </button>
        </div>

        <!-- TAB: APPOINTMENTS -->
        <div *ngIf="activeTab === 'appointments'" className="card" style="padding: 2rem;">
          <h3 style="font-size: 1.3rem; color: var(--primary-dark); font-weight: 800; margin-bottom: 1.5rem;">
            {{ lang.isRtl() ? 'طلبات حجز المواعيد المسجلة' : 'Appointment Bookings' }}
          </h3>

          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
              <thead>
                <tr style="background-color: var(--primary-light); text-align: inherit;">
                  <th style="padding: 0.75rem 1rem;">Ref</th>
                  <th style="padding: 0.75rem 1rem;">{{ lang.isRtl() ? 'المريض' : 'Patient' }}</th>
                  <th style="padding: 0.75rem 1rem;">{{ lang.isRtl() ? 'الهاتف' : 'Phone' }}</th>
                  <th style="padding: 0.75rem 1rem;">{{ lang.isRtl() ? 'العيادة' : 'Clinic' }}</th>
                  <th style="padding: 0.75rem 1rem;">{{ lang.isRtl() ? 'الموعد' : 'Date & Time' }}</th>
                  <th style="padding: 0.75rem 1rem;">{{ lang.isRtl() ? 'الحالة' : 'Status' }}</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let appt of data.appointments()" style="border-bottom: 1px solid var(--border-light);">
                  <td style="padding: 0.75rem 1rem; font-weight: 700; color: var(--accent-teal);">{{ appt.bookingRef }}</td>
                  <td style="padding: 0.75rem 1rem;">{{ appt.patientName }}</td>
                  <td style="padding: 0.75rem 1rem;">{{ appt.patientPhone }}</td>
                  <td style="padding: 0.75rem 1rem;">{{ lang.getText(appt.clinicName) }}</td>
                  <td style="padding: 0.75rem 1rem;">{{ appt.date }} {{ appt.timeSlot }}</td>
                  <td style="padding: 0.75rem 1rem;">
                    <span style="background-color: var(--accent-teal-light); color: var(--accent-teal); padding: 0.25rem 0.65rem; border-radius: 4px; font-weight: 700; font-size: 0.8rem;">
                      {{ appt.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- TAB: MESSAGES -->
        <div *ngIf="activeTab === 'messages'" className="card" style="padding: 2rem;">
          <h3 style="font-size: 1.3rem; color: var(--primary-dark); font-weight: 800; margin-bottom: 1.5rem;">
            {{ lang.isRtl() ? 'رسائل واستفسارات التواصل' : 'Contact Messages' }}
          </h3>

          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div *ngFor="let msg of data.messages()" style="padding: 1.25rem; border-radius: var(--radius-md); background-color: var(--bg-alt); border: 1px solid var(--border-light);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <h4 style="font-weight: 800; color: var(--primary-dark);">{{ msg.fullName }} ({{ msg.phone }})</h4>
                <span style="font-size: 0.8rem; color: var(--text-muted);">{{ msg.createdAt | date:'short' }}</span>
              </div>
              <p style="font-size: 0.9rem; color: var(--accent-teal); font-weight: 700; margin-bottom: 0.5rem;">
                Subject: {{ msg.subject }}
              </p>
              <p style="font-size: 0.925rem; color: var(--text-main); line-height: 1.5;">
                {{ msg.message }}
              </p>
            </div>
          </div>
        </div>

        <!-- TAB: PROFILE EDIT -->
        <div *ngIf="activeTab === 'profile'" className="card" style="padding: 2rem;">
          <h3 style="font-size: 1.3rem; color: var(--primary-dark); font-weight: 800; margin-bottom: 1.5rem;">
            {{ lang.isRtl() ? 'تعديل السيرة الذاتية واللقب المهني' : 'Edit Profile Info' }}
          </h3>
          <p style="color: var(--text-muted);">{{ lang.isRtl() ? 'يمكنك تحديث بيانات الطبيب واللقب المهني مباشرة.' : 'Update doctor name and professional title details.' }}</p>
        </div>
      </div>
    </section>
  `
})
export class AdminDashboardComponent {
  lang = inject(LanguageService);
  data = inject(DataService);

  activeTab = 'appointments';

  tabs = [
    { id: 'appointments', label: this.lang.isRtl() ? 'طلبات الحجز (Appointments)' : 'Appointments' },
    { id: 'messages', label: this.lang.isRtl() ? 'رسائل الزوار (Messages)' : 'Messages' },
    { id: 'profile', label: this.lang.isRtl() ? 'الملف الشخصي (Profile)' : 'Profile' }
  ];
}
