import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../core/services/language.service';
import { DataService } from '../../core/services/data.service';
import { AppointmentBooking } from '../../core/models';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="section" style="padding-top: 3rem;">
      <div class="container" style="max-width: 900px;">
        
        <!-- Header -->
        <div class="section-header" style="text-align: center; margin-bottom: 2.5rem;">
          <span class="badge badge-teal" style="font-size: 0.88rem; padding: 0.4rem 0.9rem; font-weight: 800; margin-bottom: 0.5rem;">
            {{ lang.isRtl() ? 'تعليمات ونظام الحجز والزيارة' : 'Visiting & Registration Guide' }}
          </span>
          <h1 style="font-weight: 900; color: #0f172a; font-size: 2.2rem; margin-bottom: 0.75rem;">
            {{ lang.isRtl() ? 'كيفية الحجز والتوجيه بالمركز' : 'Dar El Yosser Booking Guide' }}
          </h1>
        </div>

        <!-- Warning Policy Box -->
        <div style="background: #fffbeb; border: 2.5px solid #f59e0b; border-radius: 20px; padding: 2rem; margin-bottom: 3rem; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
          <div style="display: flex; align-items: flex-start; gap: 1.25rem;">
            <div>
              <h2 style="color: #92400e; font-weight: 900; font-size: 1.35rem; margin-bottom: 0.5rem;">
                تنبيه حازم بشأن نظام الحجز بالمركز
              </h2>
              <p style="color: #78350f; font-size: 1rem; font-weight: 800; line-height: 1.7; margin-bottom: 1rem;">
                غير متاح الحجز بالتليفون إطلاقاً! للحجز يرجى التوجه لمبنى عيادات دار اليسر بمدينة العبور. الحجز بأسبقية الحضور أو بالسيستم داخل المركز.
              </p>
              <div style="background: rgba(255,255,255,0.7); padding: 1rem; border-radius: 12px; font-size: 0.92rem; color: #451a03; font-weight: 700;">
                <strong>العنوان:</strong> مدينة العبور – الحي الأول – بعد صينية الخامس بـ 200 متر من الطريق البطئ، أمام يوني مول.<br />
                <strong>أرقام الاستفسار والواتساب:</strong> 01030252002 - 01030252005 | <strong>أسنان:</strong> 01092893808
              </div>
            </div>
          </div>
        </div>

        <!-- Optional Pre-Registration & Inquiry Form -->
        <div *ngIf="!isSubmitted" class="card" style="padding: 2.5rem; background: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; box-shadow: 0 4px 25px rgba(0,0,0,0.05);">
          
          <div style="margin-bottom: 1.75rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 1rem;">
            <h3 style="font-size: 1.3rem; font-weight: 900; color: #0f172a; margin-bottom: 0.35rem;">
              تسجيل استفسار وإشعار توجيه للمركز
            </h3>
            <p style="color: #64748b; font-size: 0.92rem; margin: 0;">
              يمكنك كتابة بياناتك وإرسال استفسارك ليصل لفريق خدمة العملاء بالمركز مباشرة، وسنقوم بالتواصل معك عبر الواتساب.
            </p>
          </div>

          <form (ngSubmit)="handleSubmit()" style="display: flex; flex-direction: column; gap: 1.5rem;">
            
            <div class="grid-2" style="gap: 1.25rem;">
              <div>
                <label style="display: block; font-weight: 800; font-size: 0.92rem; margin-bottom: 0.4rem; color: #0f172a;">
                  اسم المريض / المراجع *
                </label>
                <input
                  type="text"
                  required
                  [(ngModel)]="patientName"
                  name="patientName"
                  class="input-field"
                  placeholder="مثال: أحمد محمود"
                />
              </div>

              <div>
                <label style="display: block; font-weight: 800; font-size: 0.92rem; margin-bottom: 0.4rem; color: #0f172a;">
                  رقم الهاتف والواتساب *
                </label>
                <input
                  type="tel"
                  required
                  [(ngModel)]="patientPhone"
                  name="patientPhone"
                  class="input-field"
                  placeholder="01030252002"
                />
              </div>
            </div>

            <div class="grid-2" style="gap: 1.25rem;">
              <div>
                <label style="display: block; font-weight: 800; font-size: 0.92rem; margin-bottom: 0.4rem; color: #0f172a;">
                  القسم أو الخدمة المطلوبة *
                </label>
                <select [(ngModel)]="serviceType" name="serviceType" class="input-field" style="font-weight: 700;">
                  <option value="الأسنان (اليسر كلينك - خصم 20%)">الأسنان (اليسر كلينك - خصم 20%)</option>
                  <option value="تخدير كلي للأسنان">علاج أسنان تحت التخدير الكلي</option>
                  <option value="طوارئ ونسا وتوليد">نساء وتوليد 24/7</option>
                  <option value="الأطفال">طب الأطفال حديثي الولادة</option>
                  <option value="العظام">جراحة العظام والمفاصل</option>
                  <option value="الباطنة العامة والسكر">الباطنة والسكر</option>
                  <option value="أنف وأذن وحنجرة">أنف وأذن وحنجرة</option>
                  <option value="الرمد">عيادة الرمد والعيون</option>
                  <option value="رسم مخ ورسم عصب">مركز رسم المخ ورسم العصب</option>
                  <option value="السونار">الأشعة التلفزيونية والسونار</option>
                </select>
              </div>

              <div>
                <label style="display: block; font-weight: 800; font-size: 0.92rem; margin-bottom: 0.4rem; color: #0f172a;">
                  اليوم المفضل للزيارة
                </label>
                <input
                  type="date"
                  [(ngModel)]="selectedDate"
                  name="selectedDate"
                  class="input-field"
                />
              </div>
            </div>

            <div>
              <label style="display: block; font-weight: 800; font-size: 0.92rem; margin-bottom: 0.4rem; color: #0f172a;">
                تفاصيل الاستفسار أو الملاحظات
              </label>
              <textarea
                rows="3"
                [(ngModel)]="notes"
                name="notes"
                class="input-field"
                placeholder="اكتب استفسارك هنا..."
              ></textarea>
            </div>

            <button
              type="submit"
              [disabled]="!patientName || !patientPhone"
              class="btn btn-primary btn-lg"
              style="width: 100%; justify-content: center; background: linear-gradient(135deg, #0d9488 0%, #0f172a 100%); border: none; font-weight: 900; font-size: 1.1rem;"
            >
              💬 إرسال التوجيه والتواصل عبر الواتساب
            </button>
          </form>

        </div>

        <!-- Confirmed Submission Box -->
        <div *ngIf="isSubmitted && confirmedBooking" class="card" style="padding: 2.5rem; background: #ffffff; border-radius: 20px; text-align: center; box-shadow: 0 4px 25px rgba(0,0,0,0.08);">
          <div style="font-size: 3.5rem; margin-bottom: 1rem;">✅</div>
          <h2 style="color: #0f172a; font-weight: 900; margin-bottom: 0.5rem;">
            تم تسجيل استفسارك بنجاح!
          </h2>
          <p style="color: #64748b; font-size: 1rem; margin-bottom: 1.5rem;">
            رمز المرجعية الخاص بك هو: <strong style="color: #0d9488;">{{ confirmedBooking.bookingRef }}</strong>
          </p>

          <div style="background: #f8fafc; border-radius: 14px; padding: 1.25rem; margin-bottom: 2rem; border: 1px solid #e2e8f0; text-align: right;">
            <div>• <strong>المراجع:</strong> {{ confirmedBooking.patientName }}</div>
            <div>• <strong>رقم الهاتف:</strong> {{ confirmedBooking.patientPhone }}</div>
            <div>• <strong>الخدمة:</strong> {{ confirmedBooking.notes }}</div>
          </div>

          <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <a [href]="getWhatsAppUrl()" target="_blank" class="btn btn-gold" style="background: #25D366; color: #fff; border: none; font-weight: 900;">
              💬 فتح الواتساب للتأكيد
            </a>
            <button (click)="isSubmitted = false" class="btn btn-outline">
              تسجيل استفسار آخر
            </button>
          </div>
        </div>

      </div>
    </div>
  `
})
export class AppointmentsComponent implements OnInit {
  lang = inject(LanguageService);
  data = inject(DataService);

  patientName = '';
  patientPhone = '';
  serviceType = 'الأسنان (اليسر كلينك - خصم 20%)';
  selectedDate = new Date().toISOString().split('T')[0];
  notes = '';

  isSubmitted = false;
  confirmedBooking: AppointmentBooking | null = null;

  ngOnInit(): void {}

  getWhatsAppUrl(): string {
    const text = `السلام عليكم ورحمة الله وبركاته،
أود الاستفسار والتنسيق للتوجه لمركز دار اليسر بالعبور:
• *الاسم*: ${this.patientName}
• *رقم الهاتف*: ${this.patientPhone}
• *القسم / الخدمة*: ${this.serviceType}
• *التاريخ*: ${this.selectedDate}
${this.notes ? `• *ملاحظات*: ${this.notes}` : ''}`;

    const num = this.serviceType.includes('أسنان') ? '201092893808' : '201030252002';
    return `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
  }

  handleSubmit(): void {
    if (!this.patientName || !this.patientPhone) return;

    this.confirmedBooking = this.data.addAppointmentInquiry({
      patientName: this.patientName,
      patientPhone: this.patientPhone,
      appointmentType: 'On-site Registration Inquiry',
      date: this.selectedDate,
      timeSlot: 'الفترة المسائية',
      notes: `${this.serviceType} - ${this.notes}`
    });

    this.isSubmitted = true;
    window.open(this.getWhatsAppUrl(), '_blank');
  }
}
