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
      <section style="background-color: #0f172a; color: #ffffff; padding: 2.5rem 0;">
        <div class="container">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
            <div>
              <span class="badge badge-gold" style="margin-bottom: 0.5rem;">
                ⚙️ {{ lang.isRtl() ? 'لوحة التحكم الإدارية CMS' : 'Hospital Admin CMS' }}
              </span>
              <h1 style="color: #ffffff; font-size: 2rem; margin: 0; font-weight: 900;">
                {{ lang.isRtl() ? 'إدارة مواعيد واستفسارات مستشفى دار اليسر' : 'Dar El Yosser Management Panel' }}
              </h1>
            </div>
            <div class="badge badge-teal" style="font-size: 0.9rem; padding: 0.5rem 1rem;">
              {{ lang.isRtl() ? 'مدير النظام' : 'Administrator' }}
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
            
            <!-- Sidebar -->
            <div style="flex: 0 0 250px;" class="card">
              <div style="display: flex; flex-direction: column; gap: 0.35rem;">
                <button
                  (click)="activeSection = 'overview'"
                  [style.background]="activeSection === 'overview' ? '#0d9488' : 'transparent'"
                  [style.color]="activeSection === 'overview' ? '#ffffff' : '#0f172a'"
                  style="display: flex; align-items: center; gap: 0.75rem; width: 100%; padding: 0.75rem 1rem; border: none; border-radius: 10px; font-weight: 800; cursor: pointer;"
                >
                  <span>📊</span> <span>نظرة عامة</span>
                </button>

                <button
                  (click)="activeSection = 'schedules'"
                  [style.background]="activeSection === 'schedules' ? '#0d9488' : 'transparent'"
                  [style.color]="activeSection === 'schedules' ? '#ffffff' : '#0f172a'"
                  style="display: flex; align-items: center; gap: 0.75rem; width: 100%; padding: 0.75rem 1rem; border: none; border-radius: 10px; font-weight: 800; cursor: pointer;"
                >
                  <span>🗓️</span> <span>جدول الأطباء</span>
                </button>

                <button
                  (click)="activeSection = 'appointments'"
                  [style.background]="activeSection === 'appointments' ? '#0d9488' : 'transparent'"
                  [style.color]="activeSection === 'appointments' ? '#ffffff' : '#0f172a'"
                  style="display: flex; align-items: center; gap: 0.75rem; width: 100%; padding: 0.75rem 1rem; border: none; border-radius: 10px; font-weight: 800; cursor: pointer;"
                >
                  <span>📝</span> <span>استفسارات التوجيه</span>
                </button>

                <button
                  (click)="activeSection = 'messages'"
                  [style.background]="activeSection === 'messages' ? '#0d9488' : 'transparent'"
                  [style.color]="activeSection === 'messages' ? '#ffffff' : '#0f172a'"
                  style="display: flex; align-items: center; gap: 0.75rem; width: 100%; padding: 0.75rem 1rem; border: none; border-radius: 10px; font-weight: 800; cursor: pointer;"
                >
                  <span>💬</span> <span>رسائل الزوار</span>
                </button>
              </div>
            </div>

            <!-- Content Area -->
            <div style="flex: 1 1 600px;">
              <div *ngIf="activeSection === 'overview'" class="card" style="background: #ffffff;">
                <h2 style="font-weight: 900; color: #0f172a; margin-bottom: 1rem;">
                  إحصائيات مستشفى دار اليسر بالعبور
                </h2>
                <div class="grid-3" style="gap: 1rem;">
                  <div style="background: #f8fafc; padding: 1.25rem; border-radius: 12px; text-align: center;">
                    <div style="font-size: 2rem; font-weight: 900; color: #0d9488;">{{ appointments.length }}</div>
                    <div style="font-size: 0.88rem; color: #64748b;">طلبات التوجيه</div>
                  </div>
                  <div style="background: #f8fafc; padding: 1.25rem; border-radius: 12px; text-align: center;">
                    <div style="font-size: 2rem; font-weight: 900; color: #f59e0b;">20+</div>
                    <div style="font-size: 0.88rem; color: #64748b;">تخصص طبي</div>
                  </div>
                  <div style="background: #f8fafc; padding: 1.25rem; border-radius: 12px; text-align: center;">
                    <div style="font-size: 2rem; font-weight: 900; color: #ef4444;">24/7</div>
                    <div style="font-size: 0.88rem; color: #64748b;">طوارئ مقيمة</div>
                  </div>
                </div>
              </div>

              <div *ngIf="activeSection === 'schedules'" class="card" style="background: #ffffff;">
                <h3 style="font-weight: 900; color: #0f172a; margin-bottom: 1rem;">
                  جدول مواعيد الأطباء المسجل
                </h3>
                <p style="font-size: 0.9rem; color: #64748b;">
                  يمكنك تعديل حالة حضور واعتذارات الأطباء حسب الجدول الأسبوعي الرسمي للمركز.
                </p>
              </div>

              <div *ngIf="activeSection === 'appointments'" class="card" style="background: #ffffff;">
                <h3 style="font-weight: 900; color: #0f172a; margin-bottom: 1rem;">
                  قائمة استفسارات المراجعين
                </h3>
                <div *ngFor="let app of appointments" style="border-bottom: 1px solid #f1f5f9; padding: 0.75rem 0;">
                  <div style="font-weight: 800; color: #0f172a;">{{ app.patientName }} ({{ app.patientPhone }})</div>
                  <div style="font-size: 0.85rem; color: #64748b;">{{ app.notes }} • {{ app.date }}</div>
                </div>
              </div>

              <div *ngIf="activeSection === 'messages'" class="card" style="background: #ffffff;">
                <h3 style="font-weight: 900; color: #0f172a; margin-bottom: 1rem;">
                  رسائل الوارد
                </h3>
                <div *ngFor="let msg of messages" style="border-bottom: 1px solid #f1f5f9; padding: 0.75rem 0;">
                  <div style="font-weight: 800; color: #0f172a;">{{ msg.fullName }} ({{ msg.phone }})</div>
                  <div style="font-size: 0.88rem; color: #475569;">"{{ msg.message }}"</div>
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
  messages = this.data.messages();
}
