import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <!-- 1. HERO SECTION -->
      <section style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0d9488 100%); color: #ffffff; padding: 4rem 0 3.5rem 0; position: relative; overflow: hidden;">
        <div style="position: absolute; top: -50px; left: -50px; width: 300px; height: 300px; background: rgba(56, 189, 248, 0.15); filter: blur(80px); border-radius: 50%;"></div>
        <div style="position: absolute; bottom: -50px; right: -50px; width: 300px; height: 300px; background: rgba(245, 158, 11, 0.15); filter: blur(80px); border-radius: 50%;"></div>

        <div class="container" style="position: relative; z-index: 2;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 2.5rem; flex-wrap: wrap;">
            
            <!-- Hero Left Content -->
            <div style="flex: 1 1 520px; max-width: 680px;">
              <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem; flex-wrap: wrap;">
                <img
                  src="/yosser-logo-full.jpg"
                  alt="لوجو عيادات اليسر"
                  style="height: 54px; border-radius: 10px; background: #ffffff; padding: 4px; box-shadow: 0 4px 15px rgba(0,0,0,0.25); border: 2px solid #38bdf8;"
                />
                <img
                  src="/yosser-logo-icon.jpg"
                  alt="شعار دار اليسر الدائري"
                  class="hide-on-mobile"
                  style="height: 54px; width: 54px; border-radius: 10px; object-fit: cover; background: #ffffff; padding: 2px; box-shadow: 0 4px 15px rgba(0,0,0,0.25); border: 2px solid #f59e0b;"
                />
                <span class="badge" style="background: rgba(13, 148, 136, 0.25); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.4); font-size: 0.82rem; padding: 0.4rem 0.85rem; font-weight: 800;">
                  {{ lang.isRtl() ? 'صرح طبي تخصصي متكامل بالعبور' : 'Comprehensive Medical Center' }}
                </span>
              </div>

              <h1 style="color: #ffffff; margin-bottom: 1rem; font-size: 2.4rem; font-weight: 900; line-height: 1.25;">
                {{ lang.getText(hospital.name) }}
              </h1>

              <p style="font-size: 1.15rem; color: #38bdf8; font-weight: 800; margin-bottom: 1rem;">
                {{ lang.getText(hospital.slogan) }}
              </p>

              <p style="font-size: 0.98rem; color: #cbd5e1; line-height: 1.7; margin-bottom: 1.75rem;">
                {{ lang.getText(hospital.aboutText) }}
              </p>

              <!-- Quick Highlights Badges -->
              <div style="display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 2rem;">
                <span style="background: rgba(239, 68, 68, 0.2); color: #f87171; padding: 0.4rem 0.85rem; border-radius: 8px; font-size: 0.85rem; font-weight: 800; border: 1px solid rgba(239, 68, 68, 0.4);">
                  {{ lang.isRtl() ? 'طوارئ 24/7 (نساء - عظام - باطنة - جراحة - أطفال)' : '24/7 Emergency Care' }}
                </span>
                <span style="background: rgba(245, 158, 11, 0.2); color: #fbbf24; padding: 0.4rem 0.85rem; border-radius: 8px; font-size: 0.85rem; font-weight: 800; border: 1px solid rgba(245, 158, 11, 0.4);">
                  {{ lang.isRtl() ? 'اليسر كلينك أسنان (خصم 20%)' : 'Dental 20% OFF' }}
                </span>
                <span style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; padding: 0.4rem 0.85rem; border-radius: 8px; font-size: 0.85rem; font-weight: 700; border: 1px solid rgba(56, 189, 248, 0.3);">
                  {{ lang.isRtl() ? 'رسم مخ ورسم عصب' : 'EEG & EMG Unit' }}
                </span>
              </div>

              <!-- Hero Call-to-Action Buttons -->
              <div style="display: flex; align-items: center; gap: 0.85rem; flex-wrap: wrap;">
                <button (click)="nav('schedules')" class="btn btn-primary btn-lg" style="background: #0d9488; border: none; font-weight: 900; box-shadow: 0 4px 16px rgba(13, 148, 136, 0.4); color: #ffffff;">
                  <span>{{ lang.isRtl() ? 'عرض جدول المواعيد اليومي' : 'View Doctor Schedules' }}</span>
                </button>

                <button (click)="nav('dental')" class="btn btn-gold btn-lg" style="background: #f59e0b; border: none; color: #000000; font-weight: 900; box-shadow: 0 4px 16px rgba(245, 158, 11, 0.35);">
                  <span>{{ lang.isRtl() ? 'مركز الأسنان والتخدير الكلي' : 'Dental & Anesthesia Unit' }}</span>
                </button>

                <a href="tel:01030252002" class="btn btn-lg" style="background: rgba(255, 255, 255, 0.12); color: #ffffff; border: 1.5px solid rgba(255, 255, 255, 0.35); font-weight: 800; backdrop-filter: blur(8px);">
                  <span dir="ltr">01030252002</span>
                </a>
              </div>
            </div>

            <!-- Hero Right: Authentic Hospital Building Exterior Image Card -->
            <div style="flex: 1 1 380px; max-width: 440px;">
              <div style="position: relative; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.4); border: 3px solid rgba(255,255,255,0.2);">
                <img
                  src="/hospital-exterior.jpg"
                  alt="مبنى مستشفى دار اليسر التخصصية بالعبور"
                  style="width: 100%; height: 380px; object-fit: cover; display: block;"
                />
                <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0) 100%); padding: 1.5rem 1.25rem 1rem 1.25rem; color: #fff;">
                  <div style="font-weight: 900; font-size: 1.15rem; color: #ffffff; margin-bottom: 0.25rem;">
                    مبنى مستشفى وعيادات دار اليسر
                  </div>
                  <div style="font-size: 0.85rem; color: #38bdf8; font-weight: 700;">
                    العبور – الحي الأول – صينية الخامس (على الطريق البطئ)
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- QUICK ACTIONS BAR (FORMAL MEDICAL DESIGN SYSTEM) -->
      <section style="padding: 2rem 0; background: #f8fafc; border-bottom: 1px solid #e2e8f0; overflow: hidden;">
        <div class="container">
          <div class="quick-actions-grid">
            
            <!-- Card 1: 24/7 Emergency -->
            <a href="tel:01030252002" class="quick-action-card card card-hover" style="background: #ffffff; border: 1.5px solid #fecaca; border-radius: 20px; padding: 1.5rem 1rem; cursor: pointer; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem; text-decoration: none; box-shadow: 0 4px 14px rgba(239, 68, 68, 0.08);">
              <div style="width: 54px; height: 54px; border-radius: 16px; background: #fef2f2; color: #dc2626; border: 1.5px solid #fecaca; display: flex; align-items: center; justify-content: center;">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="4"/></svg>
              </div>
              <span style="font-weight: 900; font-size: 1.02rem; color: #0f172a; margin-top: 0.2rem;">{{ lang.isRtl() ? 'طوارئ واستقبال 24/7' : '24/7 Emergency' }}</span>
              <span style="font-size: 0.82rem; color: #dc2626; font-weight: 800;">{{ lang.isRtl() ? 'اتصال مباشر: 01030252002' : 'Call 01030252002' }}</span>
            </a>

            <!-- Card 2: Dental Clinic -->
            <button (click)="nav('dental')" class="quick-action-card card card-hover" style="background: #ffffff; border: 1.5px solid #fde68a; border-radius: 20px; padding: 1.5rem 1rem; cursor: pointer; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem; box-shadow: 0 4px 14px rgba(245, 158, 11, 0.06);">
              <div style="width: 54px; height: 54px; border-radius: 16px; background: #fffbeb; color: #b45309; border: 1.5px solid #fde68a; display: flex; align-items: center; justify-content: center;">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8.5 2 6 4.5 6 7.5C6 11 7.5 13 8 16.5C8.4 19.3 9.5 22 11 22C11.6 22 12 20.5 12 19C12 20.5 12.4 22 13 22C14.5 22 15.6 19.3 16 16.5C16.5 13 18 11 18 7.5C18 4.5 15.5 2 12 2Z"/></svg>
              </div>
              <span style="font-weight: 900; font-size: 1.02rem; color: #0f172a; margin-top: 0.2rem;">{{ lang.isRtl() ? 'اليسر كلينك - أسنان (%20-)' : 'Dental Clinic (-20%)' }}</span>
              <span style="font-size: 0.82rem; color: #64748b; font-weight: 700;">{{ lang.isRtl() ? 'تخدير كلي وتجميل الأسنان' : 'Dental & Anesthesia' }}</span>
            </button>

            <!-- Card 3: Schedules -->
            <button (click)="nav('schedules')" class="quick-action-card card card-hover" style="background: #ffffff; border: 1.5px solid #99f6e4; border-radius: 20px; padding: 1.5rem 1rem; cursor: pointer; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem; box-shadow: 0 4px 14px rgba(13, 148, 136, 0.06);">
              <div style="width: 54px; height: 54px; border-radius: 16px; background: #f0fdfa; color: #0d9488; border: 1.5px solid #99f6e4; display: flex; align-items: center; justify-content: center;">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              </div>
              <span style="font-weight: 900; font-size: 1.02rem; color: #0f172a; margin-top: 0.2rem;">{{ lang.isRtl() ? 'جدول مواعيد العيادات' : 'Clinic Schedule' }}</span>
              <span style="font-size: 0.82rem; color: #64748b; font-weight: 700;">{{ lang.isRtl() ? 'مواعيد الأسبوع والشفتات' : 'Weekly Roster' }}</span>
            </button>

            <!-- Card 4: Doctors -->
            <button (click)="nav('doctors')" class="quick-action-card card card-hover" style="background: #ffffff; border: 1.5px solid #bae6fd; border-radius: 20px; padding: 1.5rem 1rem; cursor: pointer; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem; box-shadow: 0 4px 14px rgba(3, 105, 161, 0.06);">
              <div style="width: 54px; height: 54px; border-radius: 16px; background: #f0f9ff; color: #0369a1; border: 1.5px solid #bae6fd; display: flex; align-items: center; justify-content: center;">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <span style="font-weight: 900; font-size: 1.02rem; color: #0f172a; margin-top: 0.2rem;">{{ lang.isRtl() ? 'دليل الأطباء والاستشاريين' : 'Doctors Directory' }}</span>
              <span style="font-size: 0.82rem; color: #64748b; font-weight: 700;">{{ lang.isRtl() ? 'تصفح قائمة الأطباء' : 'View Specialists' }}</span>
            </button>

          </div>
        </div>
      </section>

      <!-- 2. HOSPITAL AUTHENTIC BANNER SECTION -->
      <section style="padding: 2.5rem 0; background: #ffffff;">
        <div class="container">
          <div style="border-radius: 20px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
            <img
              src="/hospital-banner.jpg"
              alt="بانر مستشفى دار اليسر - كل التخصصات لصحة كل أسرة"
              style="width: 100%; height: auto; display: block;"
            />
          </div>
        </div>
      </section>

      <!-- 3. QUICK STATS COUNTER -->
      <section style="background-color: #0f172a; color: #ffffff; padding: 2.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
        <div class="container">
          <div class="grid-4" style="text-align: center; gap: 1.5rem;">
            <div style="background: rgba(255,255,255,0.03); padding: 1.25rem; border-radius: 14px; border: 1px solid rgba(255,255,255,0.08);">
              <div style="font-size: 2.2rem; font-weight: 900; color: #38bdf8; margin-bottom: 0.25rem;">
                35,000+
              </div>
              <div style="font-size: 0.88rem; color: #94a3b8; font-weight: 700;">
                {{ lang.isRtl() ? 'متابع ويثق بدار اليسر' : 'Trusting Followers' }}
              </div>
            </div>

            <div style="background: rgba(255,255,255,0.03); padding: 1.25rem; border-radius: 14px; border: 1px solid rgba(255,255,255,0.08);">
              <div style="font-size: 2.2rem; font-weight: 900; color: #f59e0b; margin-bottom: 0.25rem;">
                20+
              </div>
              <div style="font-size: 0.88rem; color: #94a3b8; font-weight: 700;">
                {{ lang.isRtl() ? 'تخصص عيادات وتأهيل' : 'Medical Specialties' }}
              </div>
            </div>

            <div style="background: rgba(255,255,255,0.03); padding: 1.25rem; border-radius: 14px; border: 1px solid rgba(255,255,255,0.08);">
              <div style="font-size: 2.2rem; font-weight: 900; color: #ef4444; margin-bottom: 0.25rem;">
                24/7
              </div>
              <div style="font-size: 0.88rem; color: #94a3b8; font-weight: 700;">
                {{ lang.isRtl() ? 'أخصائيون طوارئ مقيمون' : '24/7 Emergency Care' }}
              </div>
            </div>

            <div style="background: rgba(255,255,255,0.03); padding: 1.25rem; border-radius: 14px; border: 1px solid rgba(255,255,255,0.08);">
              <div style="font-size: 2.2rem; font-weight: 900; color: #4ade80; margin-bottom: 0.25rem;">
                100%
              </div>
              <div style="font-size: 0.88rem; color: #94a3b8; font-weight: 700;">
                {{ lang.isRtl() ? 'تجهيزات وأمان طبي' : 'Patient Safety Standards' }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. BOOKING POLICY WARNING CARD -->
      <section style="padding: 2.5rem 0 0 0;">
        <div class="container">
          <div style="background: linear-gradient(135deg, #fef3c7 0%, #fffbeb 100%); border: 2px solid #f59e0b; border-radius: 16px; padding: 1.5rem 1.75rem; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 1rem;">
              <div>
                <h3 style="color: #92400e; font-size: 1.15rem; font-weight: 900; margin-bottom: 0.25rem;">
                  {{ lang.isRtl() ? 'تنبيه هام جداً بشأن الحجز بالتليفون' : 'Important Telephone Booking Notice' }}
                </h3>
                <p style="color: #b45309; font-size: 0.92rem; margin: 0; font-weight: 700;">
                  غير متاح الحجز بالتليفون! للحجز يرجى التوجه لمبنى المركز بالعبور مباشرة. الحجز بأسبقية الحضور أو بالسيستم.
                </p>
              </div>
            </div>
            <button (click)="nav('appointments')" class="btn btn-gold btn-sm" style="background: #f59e0b; border: none; color: #000; font-weight: 800;">
              <span>{{ lang.isRtl() ? 'اقرأ تعليمات الحجز' : 'Read Booking Rules' }}</span>
            </button>
          </div>
        </div>
      </section>

      <!-- 5. DOCTOR SCHEDULE LOOKUP WIDGET -->
      <section class="section">
        <div class="container">
          <div class="section-header" style="text-align: center; margin-bottom: 2.5rem;">
            <span class="badge badge-teal" style="font-size: 0.85rem; padding: 0.35rem 0.85rem; font-weight: 800; margin-bottom: 0.5rem;">
              {{ lang.isRtl() ? 'مواعيد الأطباء والعيادات' : 'Doctor Rosters' }}
            </span>
            <h2 style="font-weight: 900; color: #0f172a;">
              {{ lang.isRtl() ? 'جدول مواعيد أطباء عيادات دار اليسر' : 'Dar El Yosser Daily Doctor Schedules' }}
            </h2>
            <p style="color: #64748b; font-size: 0.98rem; max-width: 700px; margin: 0.5rem auto 0 auto;">
              تصفح مواعيد استشاريي وأخصائيي دار اليسر بحسب أيام الأسبوع والتخصصات الطبية المختلفة.
            </p>
          </div>

          <!-- Day Selection Tabs -->
          <div style="display: flex; justify-content: center; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 2rem;">
            <button
              *ngFor="let day of availableDays"
              (click)="selectedDayKey = day.key"
              [style.background]="selectedDayKey === day.key ? '#0d9488' : '#f1f5f9'"
              [style.color]="selectedDayKey === day.key ? '#ffffff' : '#334155'"
              [style.font-weight]="selectedDayKey === day.key ? '800' : '600'"
              style="padding: 0.65rem 1.25rem; border-radius: 30px; border: none; cursor: pointer; font-size: 0.92rem; transition: all 0.2s;"
            >
              {{ lang.isRtl() ? day.ar : day.en }}
            </button>
          </div>

          <!-- Active Day Schedule Roster Grid -->
          <div class="grid-3" style="gap: 1.25rem;">
            <div
              *ngFor="let doc of getActiveDayDoctors()"
              class="card card-hover"
              style="border-radius: 14px; border: 1px solid #e2e8f0; background: #ffffff; padding: 1.25rem;"
            >
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
                <span style="background: #e0f2fe; color: #0369a1; font-weight: 800; font-size: 0.78rem; padding: 0.2rem 0.6rem; border-radius: 6px;">
                  {{ lang.getText(doc.specialtyName) }}
                </span>

                <!-- Status Badge -->
                <span
                  [style.background]="getStatusBg(doc.status)"
                  [style.color]="getStatusColor(doc.status)"
                  style="font-weight: 800; font-size: 0.78rem; padding: 0.2rem 0.6rem; border-radius: 6px;"
                >
                  {{ getStatusText(doc.status) }}
                </span>
              </div>

              <h4 style="font-size: 1.15rem; font-weight: 900; color: #0f172a; margin-bottom: 0.5rem;">
                {{ doc.name }}
              </h4>

              <div style="display: flex; align-items: center; justify-content: space-between; color: #475569; font-size: 0.88rem; font-weight: 700; margin-bottom: 0.5rem;">
                <span>الموعد:</span>
                <span style="color: #0d9488; font-weight: 800;">{{ doc.timeSlot }}</span>
              </div>

              <div *ngIf="doc.statusNote" style="font-size: 0.82rem; color: #d97706; background: #fffbeb; padding: 0.35rem 0.6rem; border-radius: 6px; font-weight: 700;">
                {{ doc.statusNote }}
              </div>
            </div>
          </div>

          <div style="text-align: center; margin-top: 2rem;">
            <button (click)="nav('schedules')" class="btn btn-navy btn-lg" style="font-weight: 800;">
              <span>{{ lang.isRtl() ? 'عرض الجدول الكامل لكافة الأيام والتخصصات' : 'View Full Roster' }}</span>
            </button>
          </div>
        </div>
      </section>

      <!-- 6. MEDICAL DEPARTMENTS showcase -->
      <section class="section section-alt" style="background-color: #f8fafc;">
        <div class="container">
          <div class="section-header" style="text-align: center; margin-bottom: 3rem;">
            <span class="badge badge-teal" style="font-size: 0.85rem; padding: 0.35rem 0.85rem; font-weight: 800; margin-bottom: 0.5rem;">
              {{ lang.isRtl() ? 'الخدمات الطبية' : 'Departments' }}
            </span>
            <h2 style="font-weight: 900; color: #0f172a;">
              {{ lang.isRtl() ? 'الأقسام والعيادات التخصصية في دار اليسر' : 'Dar El Yosser Medical Departments' }}
            </h2>
          </div>

          <div class="grid-4" style="gap: 1.25rem;">
            <div *ngFor="let dept of data.getDepartments()" class="card card-hover" style="border-radius: 16px; border: 1px solid #e2e8f0; background: #ffffff;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                <div style="width: 44px; height: 44px; border-radius: 12px; background: #ccfbf1; color: #0d9488; display: flex; align-items: center; justify-content: center;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.8 2.3A.3.3 0 0 0 4.5 2h-1a.3.3 0 0 0-.3.3v3.4c0 .8.6 1.5 1.4 1.7A10 10 0 0 0 12 21.9a10 10 0 0 0 7.4-14.5c.8-.2 1.4-.9 1.4-1.7V2.3a.3.3 0 0 0-.3-.3h-1a.3.3 0 0 0-.3.3v3.4c0 .2-.1.4-.3.5a8 8 0 0 1-13.8 0c-.2-.1-.3-.3-.3-.5Z"/></svg>
                </div>
                <span *ngIf="dept.isEmergencyAvailable" style="background: #fee2e2; color: #dc2626; font-size: 0.72rem; font-weight: 800; padding: 0.15rem 0.5rem; border-radius: 4px;">
                  طوارئ 24/7
                </span>
              </div>

              <h3 style="font-size: 1.15rem; font-weight: 900; color: #0f172a; margin-bottom: 0.5rem;">
                {{ lang.getText(dept.name) }}
              </h3>

              <p style="font-size: 0.88rem; color: #64748b; line-height: 1.6; margin-bottom: 1.0rem;">
                {{ lang.getText(dept.description) }}
              </p>

              <div style="border-top: 1px solid #f1f5f9; padding-top: 0.75rem;">
                <div *ngFor="let srv of dept.services" style="font-size: 0.82rem; color: #334155; font-weight: 600; margin-bottom: 0.25rem;">
                  ✓ {{ lang.getText(srv) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 7. LOCATION & MAP GUIDE -->
      <section class="section">
        <div class="container">
          <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #ffffff; border-radius: 24px; padding: 2.5rem; overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.15);">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 2rem; flex-wrap: wrap;">
              <div style="flex: 1 1 450px;">
                <span class="badge" style="background: rgba(56, 189, 248, 0.2); color: #38bdf8; font-weight: 800; margin-bottom: 0.85rem;">
                  {{ lang.isRtl() ? 'عنوان وتوجيهات الوصول' : 'Location & Directions' }}
                </span>
                
                <h2 style="color: #ffffff; font-weight: 900; margin-bottom: 1rem;">
                  {{ lang.isRtl() ? 'كيف تصل لمستشفى دار اليسر بالعبور؟' : 'How to Reach Dar El Yosser Hospital?' }}
                </h2>

                <p style="font-size: 1.05rem; color: #cbd5e1; line-height: 1.7; margin-bottom: 1.5rem;">
                  <strong>العنوان التفصيلي:</strong> مدينة العبور، الحي الأول، بعد صينية الخامس بـ 200 - 300 متر على الطريق الرئيسي (الطريق البطئ) أمام يوني مول، القاهرة، مصر.
                </p>

                <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem; font-size: 0.95rem; color: #e2e8f0;">
                  <div><strong>الاستفسارات:</strong> 01030252002 - 01030252005</div>
                  <div><strong>واتساب:</strong> 01030252002</div>
                  <div><strong>حجز الأسنان:</strong> 01092893808</div>
                </div>

                <div style="display: flex; gap: 0.85rem; flex-wrap: wrap;">
                  <a href="https://maps.google.com/maps?q=El+Obour+City+1st+District+Cairo+Egypt" target="_blank" class="btn btn-gold btn-lg" style="background: #f59e0b; border: none; color: #000; font-weight: 800;">
                    <span>{{ lang.isRtl() ? 'فتح الخريطة بالتفصيل' : 'Open in Google Maps' }}</span>
                  </a>

                  <button (click)="nav('contact')" class="btn btn-outline btn-lg" style="color: #ffffff; border-color: rgba(255,255,255,0.3);">
                    <span>{{ lang.isRtl() ? 'تواصل معنا' : 'Contact Us' }}</span>
                  </button>
                </div>
              </div>

              <!-- Map Frame Embed -->
              <div style="flex: 1 1 400px; max-width: 500px; width: 100%; height: 320px; border-radius: 16px; overflow: hidden; border: 2px solid rgba(255,255,255,0.2);">
                <iframe
                  src="https://maps.google.com/maps?q=El+Obour+City+1st+District+Cairo+Egypt&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style="border:0;"
                  allowfullscreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class HomeComponent {
  lang = inject(LanguageService);
  data = inject(DataService);

  @Output() tabChange = new EventEmitter<string>();

  hospital = this.data.getHospital();
  selectedDayKey: string = 'MONDAY';

  availableDays = [
    { key: 'MONDAY', ar: 'الإثنين', en: 'Monday' },
    { key: 'TUESDAY', ar: 'الثلاثاء', en: 'Tuesday' },
    { key: 'WEDNESDAY', ar: 'الأربعاء', en: 'Wednesday' },
    { key: 'THURSDAY', ar: 'الخميس', en: 'Thursday' }
  ];

  nav(tab: string): void {
    this.tabChange.emit(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getActiveDayDoctors() {
    return this.data.getDoctorsByDay(this.selectedDayKey).slice(0, 9);
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
