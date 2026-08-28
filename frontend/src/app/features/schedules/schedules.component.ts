import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { DataService } from '../../core/services/data.service';
import { DoctorRosterItem } from '../../core/models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-schedules',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="section" style="padding-top: 3rem;">
      <div class="container">
        
        <!-- Header -->
        <div class="section-header" style="text-align: center; margin-bottom: 2.5rem;">
          <span class="badge badge-teal" style="font-size: 0.88rem; padding: 0.4rem 0.9rem; font-weight: 800; margin-bottom: 0.5rem;">
            🗓️ {{ lang.isRtl() ? 'جدول مواعيد الأطباء التفاعلي' : 'Interactive Doctor Schedules' }}
          </span>
          <h1 style="font-weight: 900; color: #0f172a; font-size: 2.2rem; margin-bottom: 0.75rem;">
            {{ lang.isRtl() ? 'مواعيد عيادات مستشفى دار اليسر التخصصية' : 'Dar El Yosser Clinic Schedules' }}
          </h1>
          <p style="color: #64748b; font-size: 1.05rem; max-width: 750px; margin: 0 auto;">
            استعرض مواعيد وأوقات حضور الاستشاريين والأخصائيين حسب أيام الأسبوع والتخصصات الطبية، مع تحديثات المواعيد والاعتذارات فوراً.
          </p>
        </div>

        <!-- Official Booking Policy Warning Banner -->
        <div style="background: #fffbeb; border: 2px solid #f59e0b; border-radius: 16px; padding: 1.25rem 1.5rem; margin-bottom: 2.5rem; display: flex; align-items: center; gap: 1rem;">
          <div style="font-size: 2rem;">🔴</div>
          <div>
            <div style="font-weight: 900; font-size: 1.05rem; color: #b45309; margin-bottom: 0.25rem;">
              {{ lang.isRtl() ? 'قواعد وتعليمات الحجز في دار اليسر' : 'Official Clinic Booking Instructions' }}
            </div>
            <div style="font-size: 0.92rem; color: #78350f; font-weight: 700; line-height: 1.6;">
              غير متاح الحجز بالتليفون! للحجز يرجى التوجه للمركز مباشرة. الحجز بأسبقية الحضور أو بالسيستم بالمبنى. للاستفسارات اتصل بنا: 01030252002 - 01030252005.
            </div>
          </div>
        </div>

        <!-- Filter Controls Bar -->
        <div style="background: #ffffff; border-radius: 20px; padding: 1.5rem; border: 1px solid #e2e8f0; box-shadow: 0 4px 20px rgba(0,0,0,0.05); margin-bottom: 2.5rem;">
          
          <!-- Day Tabs -->
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.25rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 1rem;">
            <button
              *ngFor="let day of daysList"
              (click)="selectedDayKey = day.key"
              [style.background]="selectedDayKey === day.key ? '#0d9488' : '#f8fafc'"
              [style.color]="selectedDayKey === day.key ? '#ffffff' : '#334155'"
              [style.font-weight]="selectedDayKey === day.key ? '900' : '700'"
              style="padding: 0.65rem 1.25rem; border-radius: 12px; border: 1px solid #e2e8f0; cursor: pointer; font-size: 0.95rem; transition: all 0.2s;"
            >
              {{ lang.isRtl() ? day.ar : day.en }}
            </button>
          </div>

          <!-- Search Input & Specialty Filter & View Switcher -->
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; justify-content: space-between;">
            
            <!-- Search Box -->
            <div style="flex: 1 1 300px;">
              <input
                type="text"
                [placeholder]="lang.isRtl() ? '🔍 ابحث باسم الطبيب أو التخصص (مثلاً: د/ أحمد، عظام، رمد)...' : 'Search doctor or specialty...'"
                [(ngModel)]="searchQuery"
                (input)="onSearchInput($event)"
                style="width: 100%; padding: 0.75rem 1.25rem; border-radius: 12px; border: 1.5px solid #cbd5e1; font-size: 0.95rem; font-family: inherit; font-weight: 600; outline: none;"
              />
            </div>

            <!-- Specialty Dropdown -->
            <div style="flex: 0 0 220px;">
              <select
                [value]="selectedSpecialty"
                (change)="onSpecialtySelect($event)"
                style="width: 100%; padding: 0.75rem 1rem; border-radius: 12px; border: 1.5px solid #cbd5e1; font-size: 0.95rem; font-family: inherit; font-weight: 700; background: #ffffff;"
              >
                <option value="ALL">{{ lang.isRtl() ? 'جميع التخصصات' : 'All Specialties' }}</option>
                <option value="dept-cardiology">القلب</option>
                <option value="dept-pediatrics">الأطفال</option>
                <option value="dept-obgyn">النساء والتوليد</option>
                <option value="dept-orthopedics">العظام</option>
                <option value="dept-internal">الباطنة العامة والسكر</option>
                <option value="dept-ophthalmology">الرمد والجراحة</option>
                <option value="dept-ent">أنف وأذن وحنجرة</option>
                <option value="dept-dermatology">الجلدية والتجميل</option>
                <option value="dept-general-surgery">الجراحة العامة</option>
                <option value="dept-urology">المسالك البولية</option>
                <option value="dept-neurology">مخ وأعصاب</option>
                <option value="dept-physio">العلاج الطبيعي</option>
                <option value="dept-sonar">مركز السونار</option>
                <option value="dept-eeg-emg">رسم مخ ورسم عصب</option>
                <option value="dept-oncology">الأورام</option>
                <option value="dept-rheumatology">أمراض روماتيزم</option>
                <option value="dept-chest">أمراض صدرية</option>
              </select>
            </div>

            <!-- View Mode Switcher Buttons -->
            <div style="display: flex; gap: 0.4rem; background: #f1f5f9; padding: 0.3rem; border-radius: 12px; border: 1px solid #e2e8f0;">
              <button
                (click)="viewMode = 'TABLE'"
                [style.background]="viewMode === 'TABLE' ? '#ffffff' : 'transparent'"
                [style.color]="viewMode === 'TABLE' ? '#0f172a' : '#64748b'"
                [style.font-weight]="viewMode === 'TABLE' ? '900' : '600'"
                [style.box-shadow]="viewMode === 'TABLE' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none'"
                style="border: none; padding: 0.45rem 0.85rem; border-radius: 8px; font-size: 0.88rem; cursor: pointer;"
              >
                📊 {{ lang.isRtl() ? 'جدول منظم' : 'Table View' }}
              </button>
              <button
                (click)="viewMode = 'CARDS'"
                [style.background]="viewMode === 'CARDS' ? '#ffffff' : 'transparent'"
                [style.color]="viewMode === 'CARDS' ? '#0f172a' : '#64748b'"
                [style.font-weight]="viewMode === 'CARDS' ? '900' : '600'"
                [style.box-shadow]="viewMode === 'CARDS' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none'"
                style="border: none; padding: 0.45rem 0.85rem; border-radius: 8px; font-size: 0.88rem; cursor: pointer;"
              >
                🗂️ {{ lang.isRtl() ? 'بطاقات' : 'Cards View' }}
              </button>
            </div>

          </div>
        </div>

        <!-- Schedule Results Section -->
        <div>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem;">
            <h3 style="font-weight: 900; color: #0f172a; font-size: 1.3rem; margin: 0;">
              {{ lang.isRtl() ? 'أطباء عيادات يوم ' + getDayNameAr(selectedDayKey) : 'Doctors Scheduled for ' + selectedDayKey }}
            </h3>
            <span style="background: #e0f2fe; color: #0369a1; font-size: 0.85rem; font-weight: 800; padding: 0.35rem 0.85rem; border-radius: 10px;">
              {{ getFilteredDoctors().length }} {{ lang.isRtl() ? 'طبيب مسجل' : 'Doctors Listed' }}
            </span>
          </div>

          <!-- OPTION A: HIGH-CONTRAST ORGANIZED TABLE VIEW -->
          <div *ngIf="viewMode === 'TABLE' && getFilteredDoctors().length > 0" style="border-radius: 18px; overflow: hidden; border: 1.5px solid #cbd5e1; box-shadow: 0 4px 25px rgba(15,23,42,0.06); background: #ffffff;">
            <div style="overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; text-align: start; font-size: 0.95rem;">
                <thead>
                  <tr style="background: #0f172a; color: #ffffff; font-weight: 900;">
                    <th style="padding: 1rem 1.25rem; text-align: start;">#</th>
                    <th style="padding: 1rem 1.25rem; text-align: start;">التخصص الطبي</th>
                    <th style="padding: 1rem 1.25rem; text-align: start;">اسم الطبيب والاستشاري</th>
                    <th style="padding: 1rem 1.25rem; text-align: start;">موعد العيادة والحضور</th>
                    <th style="padding: 1rem 1.25rem; text-align: start;">حالة العيادة والملاحظات</th>
                    <th style="padding: 1rem 1.25rem; text-align: center;">المكان والتأكيد</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    *ngFor="let doc of getFilteredDoctors(); let idx = index"
                    [style.background]="idx % 2 === 0 ? '#ffffff' : '#f8fafc'"
                    style="border-bottom: 1px solid #e2e8f0; transition: background 0.15s;"
                  >
                    <td style="padding: 1rem 1.25rem; font-weight: 800; color: #64748b;">
                      {{ idx + 1 }}
                    </td>
                    <td style="padding: 1rem 1.25rem;">
                      <span style="background: #e0f2fe; color: #0369a1; font-weight: 800; font-size: 0.82rem; padding: 0.3rem 0.7rem; border-radius: 8px; display: inline-block;">
                        {{ lang.getText(doc.specialtyName) }}
                      </span>
                    </td>
                    <td style="padding: 1rem 1.25rem; font-weight: 900; color: #0f172a; font-size: 1.05rem;">
                      {{ doc.name }}
                    </td>
                    <td style="padding: 1rem 1.25rem; font-weight: 800; color: #0d9488;">
                      ⏰ {{ doc.timeSlot }}
                    </td>
                    <td style="padding: 1rem 1.25rem;">
                      <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                        <span
                          [style.background]="getStatusBg(doc.status)"
                          [style.color]="getStatusColor(doc.status)"
                          style="font-weight: 900; font-size: 0.8rem; padding: 0.3rem 0.65rem; border-radius: 6px;"
                        >
                          {{ getStatusText(doc.status) }}
                        </span>
                        <span *ngIf="doc.statusNote" style="font-size: 0.82rem; color: #d97706; font-weight: 700;">
                          📌 {{ doc.statusNote }}
                        </span>
                      </div>
                    </td>
                    <td style="padding: 1rem 1.25rem; text-align: center;">
                      <a href="tel:01030252002" class="btn btn-outline btn-sm" style="font-weight: 800; padding: 0.35rem 0.85rem; font-size: 0.82rem;">
                        📞 استفسار
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- OPTION B: DOCTOR CARDS GRID VIEW -->
          <div class="grid-3" style="gap: 1.35rem;" *ngIf="viewMode === 'CARDS' && getFilteredDoctors().length > 0">
            <div
              *ngFor="let doc of getFilteredDoctors()"
              class="card card-hover"
              style="border-radius: 18px; border: 1.5px solid #e2e8f0; background: #ffffff; padding: 1.35rem; display: flex; flex-direction: column; justify-content: space-between;"
            >
              <div>
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.85rem;">
                  <span style="background: #e0f2fe; color: #0369a1; font-weight: 800; font-size: 0.82rem; padding: 0.25rem 0.65rem; border-radius: 8px;">
                    {{ lang.getText(doc.specialtyName) }}
                  </span>

                  <!-- Status Badge -->
                  <span
                    [style.background]="getStatusBg(doc.status)"
                    [style.color]="getStatusColor(doc.status)"
                    style="font-weight: 900; font-size: 0.8rem; padding: 0.25rem 0.65rem; border-radius: 8px;"
                  >
                    {{ getStatusText(doc.status) }}
                  </span>
                </div>

                <h3 style="font-size: 1.2rem; font-weight: 900; color: #0f172a; margin-bottom: 0.6rem;">
                  {{ doc.name }}
                </h3>

                <div style="background: #f8fafc; border-radius: 12px; padding: 0.85rem; border: 1px solid #f1f5f9; margin-bottom: 0.85rem;">
                  <div style="display: flex; align-items: center; gap: 0.5rem; color: #334155; font-size: 0.92rem; font-weight: 700; margin-bottom: 0.25rem;">
                    <span>⏰ موعد العيادة:</span>
                    <span style="color: #0d9488; font-weight: 900;">{{ doc.timeSlot }}</span>
                  </div>

                  <div *ngIf="doc.statusNote" style="margin-top: 0.4rem; font-size: 0.82rem; color: #d97706; font-weight: 800;">
                    📌 ملاحظة: {{ doc.statusNote }}
                  </div>
                </div>
              </div>

              <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; border-top: 1px solid #f1f5f9; padding-top: 0.85rem;">
                <span style="font-size: 0.78rem; color: #64748b; font-weight: 700;">
                  🏢 مركز دار اليسر - العبور
                </span>
                <a href="tel:01030252002" style="color: #0d9488; text-decoration: none; font-size: 0.82rem; font-weight: 800;">
                  📞 استفسار
                </a>
              </div>
            </div>
          </div>

          <!-- Empty Search State -->
          <div *ngIf="getFilteredDoctors().length === 0" style="text-align: center; padding: 4rem 1rem; background: #ffffff; border-radius: 18px; border: 1.5px solid #e2e8f0;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
            <h3 style="color: #0f172a; font-weight: 900; margin-bottom: 0.5rem;">
              {{ lang.isRtl() ? 'لم يتم العثور على أطباء بهذا البحث' : 'No Doctors Found' }}
            </h3>
            <p style="color: #64748b; font-size: 0.95rem;">
              جرب البحث عن تخصص آخر أو اختر يوماً آخر من الأسبوع.
            </p>
          </div>
        </div>

      </div>
    </div>
  `
})
export class SchedulesComponent {
  lang = inject(LanguageService);
  data = inject(DataService);

  selectedDayKey: string = 'MONDAY';
  searchQuery = '';
  selectedSpecialty = 'ALL';
  viewMode: 'TABLE' | 'CARDS' = 'TABLE';

  daysList = [
    { key: 'MONDAY', ar: 'الإثنين', en: 'Monday' },
    { key: 'TUESDAY', ar: 'الثلاثاء', en: 'Tuesday' },
    { key: 'WEDNESDAY', ar: 'الأربعاء', en: 'Wednesday' },
    { key: 'THURSDAY', ar: 'الخميس', en: 'Thursday' }
  ];

  getDayNameAr(key: string): string {
    const d = this.daysList.find(x => x.key === key);
    return d ? d.ar : key;
  }

  onSearchInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.searchQuery = val;
  }

  onSpecialtySelect(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.selectedSpecialty = val;
  }

  getFilteredDoctors(): DoctorRosterItem[] {
    let list = this.data.getDoctorsByDay(this.selectedDayKey);

    if (this.selectedSpecialty !== 'ALL') {
      list = list.filter(d => d.specialtyId === this.selectedSpecialty);
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.trim().toLowerCase();
      list = list.filter(d =>
        d.name.toLowerCase().includes(q) ||
        this.lang.getText(d.specialtyName).toLowerCase().includes(q) ||
        (d.statusNote && d.statusNote.toLowerCase().includes(q))
      );
    }

    return list;
  }

  getStatusBg(status: string): string {
    switch (status) {
      case 'AVAILABLE': return '#dcfce7';
      case 'PRIOR_RESERVATION': return '#fef3c7';
      case 'FULL': return '#ffedd5';
      case 'APOLOGIZED': return '#fee2e2';
      default: return '#f1f5f9';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'AVAILABLE': return '#166534';
      case 'PRIOR_RESERVATION': return '#b45309';
      case 'FULL': return '#c2410c';
      case 'APOLOGIZED': return '#991b1b';
      default: return '#334155';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'AVAILABLE': return this.lang.isRtl() ? 'متاح اليوم' : 'Available Today';
      case 'PRIOR_RESERVATION': return this.lang.isRtl() ? 'حجز مسبق' : 'Prior Reservation';
      case 'FULL': return this.lang.isRtl() ? 'اكتمل العدد' : 'Capacity Full';
      case 'APOLOGIZED': return this.lang.isRtl() ? 'اعتذار' : 'Apologized';
      default: return '';
    }
  }
}
