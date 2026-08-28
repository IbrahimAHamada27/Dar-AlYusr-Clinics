import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../core/services/language.service';
import { DataService } from '../../core/services/data.service';
import { DoctorRosterItem } from '../../core/models';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="section" style="padding-top: 3rem;">
      <div class="container">
        
        <!-- Header -->
        <div class="section-header" style="text-align: center; margin-bottom: 2.5rem;">
          <span class="badge badge-teal" style="font-size: 0.88rem; padding: 0.4rem 0.9rem; font-weight: 800; margin-bottom: 0.5rem;">
            {{ lang.isRtl() ? 'دليل الأطباء والاستشاريين' : 'Doctors Directory' }}
          </span>
          <h1 style="font-weight: 900; color: #0f172a; font-size: 2.2rem; margin-bottom: 0.75rem;">
            {{ lang.isRtl() ? 'نخبة أطباء مستشفى دار اليسر التخصصية' : 'Our Medical Specialists & Doctors' }}
          </h1>
          <p style="color: #64748b; font-size: 1.05rem; max-width: 750px; margin: 0 auto;">
            استكشف قائمة كبار الاستشاريين والأخصائيين بمدينة العبور، وتعرف على مواعيد تواجدهم وأيام العمل والتخصصات.
          </p>
        </div>

        <!-- Filter & Search Controls -->
        <div style="background: #ffffff; border-radius: 20px; padding: 1.5rem; border: 1px solid #e2e8f0; box-shadow: 0 4px 20px rgba(0,0,0,0.05); margin-bottom: 2.5rem;">
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; justify-content: space-between;">
            
            <!-- Search Box -->
            <div style="flex: 1 1 320px;">
              <input
                type="text"
                [(ngModel)]="searchQuery"
                [placeholder]="lang.isRtl() ? 'ابحث باسم الطبيب أو التخصص (مثلاً: د/ أحمد، عظام، أطفال)...' : 'Search doctor name or specialty...'"
                style="width: 100%; padding: 0.75rem 1.25rem; border-radius: 12px; border: 1.5px solid #cbd5e1; font-size: 0.95rem; font-family: inherit; font-weight: 600; outline: none;"
              />
            </div>

            <!-- Specialty Dropdown -->
            <div style="flex: 0 0 240px;">
              <select
                [(ngModel)]="selectedSpecialty"
                style="width: 100%; padding: 0.75rem 1rem; border-radius: 12px; border: 1.5px solid #cbd5e1; font-size: 0.95rem; font-family: inherit; font-weight: 700; background: #ffffff;"
              >
                <option value="ALL">{{ lang.isRtl() ? 'جميع التخصصات' : 'All Specialties' }}</option>
                <option value="dept-cardiology">القلب والأوعية</option>
                <option value="dept-pediatrics">الأطفال وحديثي الولادة</option>
                <option value="dept-obgyn">النساء والتوليد</option>
                <option value="dept-orthopedics">جراحة العظام والمفاصل</option>
                <option value="dept-internal">الباطنة العامة والسكر</option>
                <option value="dept-ophthalmology">الرمد وجراحة العيون</option>
                <option value="dept-ent">أنف وأذن وحنجرة</option>
                <option value="dept-dermatology">الجلدية والتجميل</option>
                <option value="dept-general-surgery">الجراحة العامة</option>
                <option value="dept-urology">المسالك البولية</option>
                <option value="dept-neurology">مخ وأعصاب</option>
                <option value="dept-physio">العلاج الطبيعي</option>
                <option value="dept-sonar">مركز السونار</option>
                <option value="dept-eeg-emg">رسم مخ ورسم عصب</option>
                <option value="dept-dental">اليسر كلينك - أسنان</option>
              </select>
            </div>

            <!-- Day Filter Dropdown -->
            <div style="flex: 0 0 180px;">
              <select
                [(ngModel)]="selectedDay"
                style="width: 100%; padding: 0.75rem 1rem; border-radius: 12px; border: 1.5px solid #cbd5e1; font-size: 0.95rem; font-family: inherit; font-weight: 700; background: #ffffff;"
              >
                <option value="ALL">{{ lang.isRtl() ? 'جميع الأيام' : 'All Days' }}</option>
                <option value="SATURDAY">السبت</option>
                <option value="SUNDAY">الأحد</option>
                <option value="MONDAY">الإثنين</option>
                <option value="TUESDAY">الثلاثاء</option>
                <option value="WEDNESDAY">الأربعاء</option>
                <option value="THURSDAY">الخميس</option>
                <option value="FRIDAY">الجمعة</option>
              </select>
            </div>

          </div>
        </div>

        <!-- Doctors Grid -->
        <div class="grid-3" style="gap: 1.5rem;" *ngIf="getFilteredDoctors().length > 0">
          <div
            *ngFor="let doc of getFilteredDoctors()"
            class="card card-hover"
            style="border-radius: 18px; border: 1px solid #e2e8f0; background: #ffffff; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;"
          >
            <div>
              <!-- Header Row -->
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                <span style="background: #e0f2fe; color: #0369a1; font-weight: 800; font-size: 0.8rem; padding: 0.25rem 0.65rem; border-radius: 8px;">
                  {{ lang.getText(doc.specialtyName) }}
                </span>
                <span
                  [style.background]="getStatusBg(doc.status)"
                  [style.color]="getStatusColor(doc.status)"
                  style="font-weight: 900; font-size: 0.78rem; padding: 0.25rem 0.65rem; border-radius: 8px;"
                >
                  {{ getStatusText(doc.status) }}
                </span>
              </div>

              <!-- Avatar & Name -->
              <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                <div style="width: 54px; height: 54px; border-radius: 50%; background: linear-gradient(135deg, #0d9488 0%, #0f172a 100%); color: #ffffff; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 4px 12px rgba(13, 148, 136, 0.25);">
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div>
                  <h3 style="font-size: 1.2rem; font-weight: 900; color: #0f172a; margin: 0; line-height: 1.3;">
                    {{ doc.name }}
                  </h3>
                  <div style="font-size: 0.82rem; color: #64748b; font-weight: 700; margin-top: 2px;">
                    استشاري / أخصائي بمستشفى دار اليسر
                  </div>
                </div>
              </div>

              <!-- Time Slot Info Box -->
              <div style="background: #f8fafc; border-radius: 12px; padding: 0.85rem; border: 1px solid #f1f5f9; margin-bottom: 1.25rem;">
                <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.88rem; color: #334155; font-weight: 700; margin-bottom: 0.35rem;">
                  <span>يوم الزيارة:</span>
                  <span style="color: #0f172a; font-weight: 900;">{{ getDayAr(doc.dayOfWeek) }}</span>
                </div>
                <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.88rem; color: #334155; font-weight: 700;">
                  <span>الموعد:</span>
                  <span style="color: #0d9488; font-weight: 900;">{{ doc.timeSlot }}</span>
                </div>
                <div *ngIf="doc.statusNote" style="margin-top: 0.4rem; font-size: 0.8rem; color: #d97706; font-weight: 800; display: flex; align-items: center; gap: 0.35rem;">
                  <span style="width: 6px; height: 6px; border-radius: 50%; background: #d97706; display: inline-block;"></span>
                  <span>{{ doc.statusNote }}</span>
                </div>
              </div>
            </div>

            <!-- Actions Row -->
            <div style="display: flex; gap: 0.6rem; border-top: 1px solid #f1f5f9; padding-top: 1rem;">
              <button (click)="openDoctorModal(doc)" class="btn btn-outline btn-sm" style="flex: 1; justify-content: center; font-size: 0.82rem; font-weight: 800;">
                التفاصيل
              </button>
              <button (click)="nav('appointments')" class="btn btn-primary btn-sm" style="flex: 1.2; justify-content: center; background: #0d9488; border: none; font-size: 0.82rem; font-weight: 800;">
                تعليمات الحجز
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="getFilteredDoctors().length === 0" style="text-align: center; padding: 4rem 1rem; background: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0;">
          <h3 style="color: #0f172a; font-weight: 900; margin-bottom: 0.5rem;">
            لم يتم العثور على أطباء وفق خيارات البحث
          </h3>
          <p style="color: #64748b; font-size: 0.95rem;">
            يرجى مراجعة مسمى الطبيب أو التخصص أو اختيار يوم آخر من الأسبوع.
          </p>
        </div>

      </div>
    </div>

    <!-- Doctor Details Modal -->
    <div *ngIf="selectedDoctor" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(6px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 1.5rem;">
      <div style="background: #ffffff; border-radius: 24px; max-width: 550px; width: 100%; padding: 2rem; box-shadow: 0 25px 50px rgba(0,0,0,0.25); position: relative; max-height: 90vh; overflow-y: auto;">
        
        <button (click)="selectedDoctor = null" style="position: absolute; top: 1.25rem; left: 1.25rem; border: none; background: #f1f5f9; width: 36px; height: 36px; border-radius: 50%; font-size: 1.2rem; cursor: pointer;">✕</button>

        <div style="text-align: center; margin-bottom: 1.5rem;">
          <div style="width: 70px; height: 70px; border-radius: 50%; background: linear-gradient(135deg, #0d9488 0%, #0f172a 100%); color: #ffffff; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto;">
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <h2 style="font-weight: 900; color: #0f172a; font-size: 1.5rem; margin-bottom: 0.25rem;">
            {{ selectedDoctor.name }}
          </h2>
          <span style="background: #e0f2fe; color: #0369a1; font-weight: 800; font-size: 0.85rem; padding: 0.25rem 0.75rem; border-radius: 12px; display: inline-block;">
            {{ lang.getText(selectedDoctor.specialtyName) }}
          </span>
        </div>

        <div style="background: #f8fafc; border-radius: 16px; padding: 1.25rem; border: 1px solid #e2e8f0; margin-bottom: 1.5rem;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.6rem; font-size: 0.92rem; font-weight: 700;">
            <span>يوم العيادة:</span>
            <span style="color: #0f172a; font-weight: 900;">{{ getDayAr(selectedDoctor.dayOfWeek) }}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.6rem; font-size: 0.92rem; font-weight: 700;">
            <span>موعد الحضور:</span>
            <span style="color: #0d9488; font-weight: 900;">{{ selectedDoctor.timeSlot }}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.92rem; font-weight: 700;">
            <span>المكان:</span>
            <span style="color: #0f172a;">مستشفى دار اليسر - العبور</span>
          </div>
        </div>

        <div style="background: #fffbeb; border: 1.5px solid #f59e0b; border-radius: 14px; padding: 1rem; margin-bottom: 1.5rem; font-size: 0.88rem; color: #78350f; font-weight: 700; line-height: 1.6;">
          <strong>تعليمات الحجز:</strong> الحجز بأسبقية الحضور أو بالسيستم داخل المركز بالعبور. غير متاح الحجز بالتليفون.
        </div>

        <div style="display: flex; gap: 0.75rem;">
          <a href="tel:01030252002" class="btn btn-gold" style="flex: 1; justify-content: center; background: #f59e0b; border: none; color: #000; font-weight: 900;">
            اتصل بالاستقبال: 01030252002
          </a>
          <button (click)="selectedDoctor = null" class="btn btn-outline" style="flex: 0.5;">
            إغلاق
          </button>
        </div>

      </div>
    </div>
  `
})
export class DoctorsComponent {
  lang = inject(LanguageService);
  data = inject(DataService);

  @Output() tabChange = new EventEmitter<string>();

  searchQuery = '';
  selectedSpecialty = 'ALL';
  selectedDay = 'ALL';

  selectedDoctor: DoctorRosterItem | null = null;

  nav(tab: string): void {
    this.tabChange.emit(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openDoctorModal(doc: DoctorRosterItem): void {
    this.selectedDoctor = doc;
  }

  getAllDoctors(): DoctorRosterItem[] {
    const list: DoctorRosterItem[] = [];
    const schedules = this.data.getGeneralSchedules();
    for (const day of schedules) {
      for (const doc of day.doctors) {
        list.push(doc);
      }
    }
    const dental = this.data.getDentalRoster();
    for (const d of dental) {
      list.push(d);
    }
    return list;
  }

  getFilteredDoctors(): DoctorRosterItem[] {
    let list = this.getAllDoctors();

    if (this.selectedSpecialty !== 'ALL') {
      list = list.filter(d => d.specialtyId === this.selectedSpecialty);
    }

    if (this.selectedDay !== 'ALL') {
      list = list.filter(d => d.dayOfWeek === this.selectedDay);
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.trim().toLowerCase();
      list = list.filter(d =>
        d.name.toLowerCase().includes(q) ||
        this.lang.getText(d.specialtyName).toLowerCase().includes(q)
      );
    }

    return list;
  }

  getDayAr(key: string): string {
    switch (key) {
      case 'SATURDAY': return 'السبت';
      case 'SUNDAY': return 'الأحد';
      case 'MONDAY': return 'الإثنين';
      case 'TUESDAY': return 'الثلاثاء';
      case 'WEDNESDAY': return 'الأربعاء';
      case 'THURSDAY': return 'الخميس';
      case 'FRIDAY': return 'الجمعة';
      default: return key;
    }
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
      case 'AVAILABLE': return 'متاح اليوم';
      case 'PRIOR_RESERVATION': return 'حجز مسبق';
      case 'FULL': return 'اكتمل العدد';
      case 'APOLOGIZED': return 'اعتذار';
      default: return '';
    }
  }
}
