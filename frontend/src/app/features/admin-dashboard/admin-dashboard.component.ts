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
    <div>
      <!-- Header Banner -->
      <section style="background-color: var(--primary-dark); color: #ffffff; padding: 2.5rem 0;">
        <div className="container">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
            <div>
              <span className="badge badge-gold" style="margin-bottom: 0.5rem;">
                {{ lang.isRtl() ? 'لوحة التحكم والمحتوى' : 'CMS Admin Dashboard' }}
              </span>
              <h1 style="color: #ffffff; font-size: 2rem; margin: 0;">
                {{ lang.isRtl() ? 'إدارة موقع د. إبراهيم الشرقاوي' : 'Dr. Ibrahim CMS Dashboard' }}
              </h1>
            </div>
            <div className="badge badge-teal" style="font-size: 0.9rem; padding: 0.5rem 1rem;">
              {{ lang.isRtl() ? 'مستوى الوصول: مدير النظام' : 'Access Level: Administrator' }}
            </div>
          </div>
        </div>
      </section>

      <!-- Dashboard Layout -->
      <section className="section">
        <div className="container">
          <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
            <!-- Left Sidebar Navigation -->
            <div style="flex: 0 0 260px;" className="card">
              <div style="display: flex; flex-direction: column; gap: 0.35rem;">
                <button
                  (click)="activeSection = 'overview'"
                  [style.background-color]="activeSection === 'overview' ? 'var(--accent-teal-light)' : 'transparent'"
                  [style.color]="activeSection === 'overview' ? 'var(--accent-teal)' : 'var(--primary-dark)'"
                  style="display: flex; align-items: center; gap: 0.75rem; width: 100%; padding: 0.75rem 1rem; border: none; border-radius: var(--radius-md); font-weight: 700; cursor: pointer;"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
                  <span>{{ lang.isRtl() ? 'نظرة عامة' : 'Overview Stats' }}</span>
                </button>

                <button
                  (click)="activeSection = 'appointments'"
                  [style.background-color]="activeSection === 'appointments' ? 'var(--accent-teal-light)' : 'transparent'"
                  [style.color]="activeSection === 'appointments' ? 'var(--accent-teal)' : 'var(--primary-dark)'"
                  style="display: flex; align-items: center; gap: 0.75rem; width: 100%; padding: 0.75rem 1rem; border: none; border-radius: var(--radius-md); font-weight: 700; cursor: pointer;"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                  <span>{{ lang.isRtl() ? 'حجوزات المواعيد' : 'Appointments (' + appointments.length + ')' }}</span>
                </button>

                <button
                  (click)="activeSection = 'publications'"
                  [style.background-color]="activeSection === 'publications' ? 'var(--accent-teal-light)' : 'transparent'"
                  [style.color]="activeSection === 'publications' ? 'var(--accent-teal)' : 'var(--primary-dark)'"
                  style="display: flex; align-items: center; gap: 0.75rem; width: 100%; padding: 0.75rem 1rem; border: none; border-radius: var(--radius-md); font-weight: 700; cursor: pointer;"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>
                  <span>{{ lang.isRtl() ? 'الأبحاث والمنشورات' : 'Publications' }}</span>
                </button>

                <button
                  (click)="activeSection = 'articles'"
                  [style.background-color]="activeSection === 'articles' ? 'var(--accent-teal-light)' : 'transparent'"
                  [style.color]="activeSection === 'articles' ? 'var(--accent-teal)' : 'var(--primary-dark)'"
                  style="display: flex; align-items: center; gap: 0.75rem; width: 100%; padding: 0.75rem 1rem; border: none; border-radius: var(--radius-md); font-weight: 700; cursor: pointer;"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                  <span>{{ lang.isRtl() ? 'المقالات والتوعية' : 'Articles' }}</span>
                </button>

                <button
                  (click)="activeSection = 'clinics'"
                  [style.background-color]="activeSection === 'clinics' ? 'var(--accent-teal-light)' : 'transparent'"
                  [style.color]="activeSection === 'clinics' ? 'var(--accent-teal)' : 'var(--primary-dark)'"
                  style="display: flex; align-items: center; gap: 0.75rem; width: 100%; padding: 0.75rem 1rem; border: none; border-radius: var(--radius-md); font-weight: 700; cursor: pointer;"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12h12"/></svg>
                  <span>{{ lang.isRtl() ? 'الفروع والعيادات' : 'Clinic Locations' }}</span>
                </button>

                <button
                  (click)="activeSection = 'messages'"
                  [style.background-color]="activeSection === 'messages' ? 'var(--accent-teal-light)' : 'transparent'"
                  [style.color]="activeSection === 'messages' ? 'var(--accent-teal)' : 'var(--primary-dark)'"
                  style="display: flex; align-items: center; gap: 0.75rem; width: 100%; padding: 0.75rem 1rem; border: none; border-radius: var(--radius-md); font-weight: 700; cursor: pointer;"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  <span>{{ lang.isRtl() ? 'رسائل المرضى' : 'Patient Messages (' + messages.length + ')' }}</span>
                </button>
              </div>
            </div>

            <!-- Right Main Content Panel -->
            <div style="flex: 1 1 600px;">
              <!-- OVERVIEW -->
              <div *ngIf="activeSection === 'overview'">
                <div className="grid-4" style="margin-bottom: 2rem;">
                  <div className="card" style="text-align: center;">
                    <div style="font-size: 2.25rem; font-weight: 800; color: var(--accent-teal);">
                      {{ appointments.length }}
                    </div>
                    <div style="fontSize: 0.9rem; color: var(--text-muted);">Total Bookings</div>
                  </div>

                  <div className="card" style="text-align: center;">
                    <div style="font-size: 2.25rem; font-weight: 800; color: var(--primary-navy);">
                      {{ publications.length }}
                    </div>
                    <div style="font-size: 0.9rem; color: var(--text-muted);">Publications</div>
                  </div>

                  <div className="card" style="text-align: center;">
                    <div style="font-size: 2.25rem; font-weight: 800; color: var(--accent-teal);">
                      {{ articles.length }}
                    </div>
                    <div style="font-size: 0.9rem; color: var(--text-muted);">Blog Articles</div>
                  </div>

                  <div className="card" style="text-align: center;">
                    <div style="font-size: 2.25rem; font-weight: 800; color: var(--gold-accent);">
                      {{ messages.length }}
                    </div>
                    <div style="font-size: 0.9rem; color: var(--text-muted);">Inbox Messages</div>
                  </div>
                </div>

                <div className="card" style="background-color: #ffffff;">
                  <h3 style="margin-bottom: 1rem; color: var(--primary-dark);">
                    {{ lang.isRtl() ? 'أحدث حجوزات المواعيد' : 'Recent Appointments' }}
                  </h3>
                  <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
                      <thead>
                        <tr style="border-bottom: 2px solid var(--border-light); text-align: left;">
                          <th style="padding: 0.75rem;">Ref</th>
                          <th style="padding: 0.75rem;">Patient</th>
                          <th style="padding: 0.75rem;">Date & Time</th>
                          <th style="padding: 0.75rem;">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr *ngFor="let app of appointments.slice(0, 5)" style="border-bottom: 1px solid var(--border-light);">
                          <td style="padding: 0.75rem; font-weight: 700;">{{ app.bookingRef }}</td>
                          <td style="padding: 0.75rem;">{{ app.patientName }} ({{ app.patientPhone }})</td>
                          <td style="padding: 0.75rem;">{{ app.date }} at {{ app.timeSlot }}</td>
                          <td style="padding: 0.75rem;"><span className="badge badge-teal">{{ app.status }}</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <!-- APPOINTMENTS CMS -->
              <div *ngIf="activeSection === 'appointments'" className="card" style="background-color: #ffffff;">
                <h3 style="font-size: 1.3rem; margin-bottom: 1.5rem; color: var(--primary-dark);">
                  {{ lang.isRtl() ? 'جدول وإدارة حجوزات المواعيد' : 'Manage Patient Appointments' }}
                </h3>
                <div style="overflow-x: auto;">
                  <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
                    <thead>
                      <tr style="border-bottom: 2px solid var(--border-light);" [style.text-align]="lang.isRtl() ? 'right' : 'left'">
                        <th style="padding: 0.75rem;">Ref</th>
                        <th style="padding: 0.75rem;">Patient</th>
                        <th style="padding: 0.75rem;">Phone</th>
                        <th style="padding: 0.75rem;">Date & Slot</th>
                        <th style="padding: 0.75rem;">Status</th>
                        <th style="padding: 0.75rem;">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr *ngFor="let app of appointments" style="border-bottom: 1px solid var(--border-light);">
                        <td style="padding: 0.75rem; font-weight: 700;">{{ app.bookingRef }}</td>
                        <td style="padding: 0.75rem;">{{ app.patientName }}</td>
                        <td style="padding: 0.75rem;">{{ app.patientPhone }}</td>
                        <td style="padding: 0.75rem;">{{ app.date }} ({{ app.timeSlot }})</td>
                        <td style="padding: 0.75rem;">
                          <select
                            [(ngModel)]="app.status"
                            (change)="updateStatus(app.id, app.status)"
                            style="padding: 0.25rem 0.5rem; border-radius: 4px; border: 1px solid var(--border-light);"
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td style="padding: 0.75rem;">
                          <button (click)="deleteAppt(app.id)" style="background: none; border: none; cursor: pointer; color: #EF4444;" title="Delete">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- PUBLICATIONS CMS -->
              <div *ngIf="activeSection === 'publications'" className="card" style="background-color: #ffffff;">
                <h3 style="font-size: 1.3rem; margin-bottom: 1.5rem; color: var(--primary-dark);">
                  {{ lang.isRtl() ? 'الأبحاث والمنشورات العلمية' : 'Manage Publications' }}
                </h3>
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                  <div *ngFor="let pub of publications" style="border: 1px solid var(--border-light); padding: 1rem; border-radius: var(--radius-md); display: flex; justify-content: space-between; align-items: center;">
                    <div>
                      <div style="font-weight: 700; font-size: 1.05rem; color: var(--primary-dark);">
                        {{ lang.getText(pub.title) }}
                      </div>
                      <div style="font-size: 0.85rem; color: var(--text-light);">
                        {{ pub.journal }} ({{ pub.year }}) • DOI: {{ pub.doi }}
                      </div>
                    </div>
                    <span className="badge badge-teal">{{ pub.type }}</span>
                  </div>
                </div>
              </div>

              <!-- ARTICLES CMS -->
              <div *ngIf="activeSection === 'articles'" className="card" style="background-color: #ffffff;">
                <h3 style="font-size: 1.3rem; margin-bottom: 1.5rem; color: var(--primary-dark);">
                  {{ lang.isRtl() ? 'إدارة المقالات والتوعية الطبية' : 'Manage Blog Articles' }}
                </h3>
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                  <div *ngFor="let art of articles" style="border: 1px solid var(--border-light); padding: 1rem; border-radius: var(--radius-md); display: flex; justify-content: space-between; align-items: center;">
                    <div>
                      <div style="font-weight: 700; font-size: 1.05rem; color: var(--primary-dark);">
                        {{ lang.getText(art.title) }}
                      </div>
                      <div style="font-size: 0.85rem; color: var(--text-light);">
                        Category: {{ lang.getText(art.category) }} • Reading Time: {{ art.readingTime }}
                      </div>
                    </div>
                    <span [class]="art.isPublished ? 'badge badge-teal' : 'badge badge-navy'">
                      {{ art.isPublished ? 'Published' : 'Draft' }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- CLINICS CMS -->
              <div *ngIf="activeSection === 'clinics'" className="card" style="background-color: #ffffff;">
                <h3 style="font-size: 1.3rem; margin-bottom: 1.5rem; color: var(--primary-dark);">
                  {{ lang.isRtl() ? 'إدارة العيادات ومواعيد العمل' : 'Manage Clinic Locations' }}
                </h3>
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                  <div *ngFor="let clinic of clinics" style="border: 1px solid var(--border-light); padding: 1.25rem; border-radius: var(--radius-md);">
                    <div style="font-weight: 700; font-size: 1.15rem; color: var(--primary-dark); margin-bottom: 0.25rem;">
                      {{ lang.getText(clinic.name) }} ({{ lang.getText(clinic.city) }})
                    </div>
                    <div style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 0.5rem;">
                      {{ lang.getText(clinic.address) }} — Phone: {{ clinic.phone }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- MESSAGES INBOX -->
              <div *ngIf="activeSection === 'messages'" className="card" style="background-color: #ffffff;">
                <h3 style="font-size: 1.3rem; margin-bottom: 1.5rem; color: var(--primary-dark);">
                  {{ lang.isRtl() ? 'رسائل المرضى والاستفسارات' : 'Patient Messages Inbox' }}
                </h3>
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                  <div
                    *ngFor="let msg of messages"
                    [style.background-color]="msg.isRead ? 'var(--bg-alt)' : '#ffffff'"
                    style="border: 1px solid var(--border-light); padding: 1.25rem; border-radius: var(--radius-md);"
                  >
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                      <div style="font-weight: 700; font-size: 1.05rem; color: var(--primary-dark);">
                        {{ msg.fullName }} ({{ msg.email }})
                      </div>
                      <div style="display: flex; gap: 0.5rem;">
                        <button *ngIf="!msg.isRead" (click)="markRead(msg.id)" className="btn btn-outline btn-sm">
                          Mark Read
                        </button>
                        <button (click)="deleteMsg(msg.id)" style="color: #EF4444; border: none; background: none; cursor: pointer;">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                        </button>
                      </div>
                    </div>
                    <div style="font-weight: 600; font-size: 0.9rem; color: var(--accent-teal); margin-bottom: 0.5rem;">
                      Subject: {{ msg.subject }}
                    </div>
                    <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.6;">
                      "{{ msg.message }}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class AdminDashboardComponent {
  lang = inject(LanguageService);
  data = inject(DataService);

  activeSection = 'overview';

  appointments = this.data.appointments();
  publications = this.data.getPublications();
  articles = this.data.getArticles();
  clinics = this.data.getClinics();
  messages = this.data.messages();

  updateStatus(id: string, status: string): void {
    this.data.updateAppointmentStatus(id, status);
  }

  deleteAppt(id: string): void {
    this.data.deleteAppointment(id);
    this.appointments = this.data.appointments();
  }

  markRead(id: string): void {
    this.data.markMessageRead(id);
    this.messages = this.data.messages();
  }

  deleteMsg(id: string): void {
    this.data.deleteMessage(id);
    this.messages = this.data.messages();
  }
}
