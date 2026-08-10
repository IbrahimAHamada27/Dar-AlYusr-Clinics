import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../core/services/language.service';
import { DataService } from '../../core/services/data.service';
import { ApiService } from '../../core/services/api.service';
import { AppointmentBooking } from '../../core/models';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section style="background-color: var(--primary-light); padding: 3.5rem 0;">
      <div className="container" style="text-align: center; max-width: 800px;">
        <span className="section-subtitle">{{ lang.isRtl() ? 'حجز موعد العيادة' : 'Online Appointment Booking' }}</span>
        <h1 className="section-title">{{ lang.isRtl() ? 'خطوات حجز موعد بالعيادة' : 'Book Your Clinic Appointment' }}</h1>
      </div>
    </section>

    <section style="padding: 5rem 0;">
      <div className="container" style="max-width: 850px;">

        <!-- Wizard Progress Bar -->
        <div *ngIf="step <= 5" style="display: flex; justify-content: space-between; margin-bottom: 3rem; position: relative;">
          <div *ngFor="let s of [1, 2, 3, 4, 5]"
               [style.background-color]="step >= s ? 'var(--accent-teal)' : 'var(--border-light)'"
               [style.color]="step >= s ? '#ffffff' : 'var(--text-muted)'"
               style="width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.1rem; z-index: 2;">
            {{ s }}
          </div>
        </div>

        <!-- STEP 1: SELECT CLINIC -->
        <div *ngIf="step === 1" className="card" style="padding: 2.5rem;">
          <h3 style="font-size: 1.4rem; color: var(--primary-dark); font-weight: 800; margin-bottom: 1.5rem;">
            {{ lang.isRtl() ? 'الخطوة 1: اختر العيادة الفرع المطلوب' : 'Step 1: Select Clinic Branch' }}
          </h3>

          <div style="display: flex; flex-direction: column; gap: 1.25rem;">
            <div *ngFor="let clinic of clinics"
                 (click)="selectedClinicId = clinic.id"
                 [style.border-color]="selectedClinicId === clinic.id ? 'var(--accent-teal)' : 'var(--border-light)'"
                 [style.background-color]="selectedClinicId === clinic.id ? 'var(--accent-teal-light)' : '#ffffff'"
                 style="padding: 1.5rem; border: 2px solid; border-radius: var(--radius-md); cursor: pointer; transition: var(--transition-fast);">
              <h4 style="font-size: 1.2rem; color: var(--primary-dark); font-weight: 800; margin-bottom: 0.5rem;">
                {{ lang.getText(clinic.name) }}
              </h4>
              <p style="font-size: 0.95rem; color: var(--text-muted);">{{ lang.getText(clinic.address) }}</p>
            </div>
          </div>
        </div>

        <!-- STEP 2: SELECT SERVICE -->
        <div *ngIf="step === 2" className="card" style="padding: 2.5rem;">
          <h3 style="font-size: 1.4rem; color: var(--primary-dark); font-weight: 800; margin-bottom: 1.5rem;">
            {{ lang.isRtl() ? 'الخطوة 2: اختر الخدمة الطبية المطلوب حجزها' : 'Step 2: Select Medical Service' }}
          </h3>

          <div style="display: flex; flex-direction: column; gap: 1.25rem;">
            <div *ngFor="let srv of getSelectedClinic().services"
                 (click)="selectedServiceId = srv.id"
                 [style.border-color]="selectedServiceId === srv.id ? 'var(--accent-teal)' : 'var(--border-light)'"
                 [style.background-color]="selectedServiceId === srv.id ? 'var(--accent-teal-light)' : '#ffffff'"
                 style="padding: 1.5rem; border: 2px solid; border-radius: var(--radius-md); cursor: pointer;">
              <h4 style="font-size: 1.15rem; color: var(--primary-dark); font-weight: 800; margin-bottom: 0.25rem;">
                {{ lang.getText(srv.name) }}
              </h4>
            </div>
          </div>
        </div>

        <!-- STEP 3: SELECT DATE -->
        <div *ngIf="step === 3" className="card" style="padding: 2.5rem;">
          <h3 style="font-size: 1.4rem; color: var(--primary-dark); font-weight: 800; margin-bottom: 1.5rem;">
            {{ lang.isRtl() ? 'الخطوة 3: اختر تاريخ الحجز' : 'Step 3: Select Appointment Date' }}
          </h3>

          <input
            type="date"
            [(ngModel)]="selectedDate"
            className="input-field"
            style="font-size: 1.1rem; padding: 1rem;"
          />
        </div>

        <!-- STEP 4: SELECT TIME SLOT -->
        <div *ngIf="step === 4" className="card" style="padding: 2.5rem;">
          <h3 style="font-size: 1.4rem; color: var(--primary-dark); font-weight: 800; margin-bottom: 1.5rem;">
            {{ lang.isRtl() ? 'الخطوة 4: اختر الموعد المتاح' : 'Step 4: Select Time Slot' }}
          </h3>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
            <button *ngFor="let slot of availableTimeSlots"
                    (click)="selectedTimeSlot = slot"
                    [class]="selectedTimeSlot === slot ? 'btn btn-primary' : 'btn btn-outline'"
                    style="justify-content: center;">
              {{ slot }}
            </button>
          </div>
        </div>

        <!-- STEP 5: PATIENT FORM -->
        <div *ngIf="step === 5" className="card" style="padding: 2.5rem;">
          <h3 style="font-size: 1.4rem; color: var(--primary-dark); font-weight: 800; margin-bottom: 1.5rem;">
            {{ lang.isRtl() ? 'الخطوة 5: بيانات المريض وتأكيد الحجز' : 'Step 5: Patient Details & Confirmation' }}
          </h3>

          <!-- Error Alert Banner -->
          <div *ngIf="bookingError" style="background-color: rgba(239, 68, 68, 0.1); border: 1px solid #EF4444; color: #DC2626; padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; font-weight: 700;">
            ⚠️ {{ bookingError }}
          </div>

          <form (ngSubmit)="submitBooking()">
            <div style="display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 2rem;">
              <div>
                <label className="input-label">{{ lang.isRtl() ? 'اسم المريض رباعي:' : 'Patient Full Name:' }}</label>
                <input type="text" [(ngModel)]="patientName" name="patientName" required className="input-field" placeholder="أحمد محمود..." />
              </div>

              <div>
                <label className="input-label">{{ lang.isRtl() ? 'رقم الهاتف / الواتساب:' : 'Phone / WhatsApp:' }}</label>
                <input type="tel" [(ngModel)]="patientPhone" name="patientPhone" required className="input-field" placeholder="01000577622" />
              </div>

              <div>
                <label className="input-label">{{ lang.isRtl() ? 'البريد الإلكتروني (اختياري):' : 'Email (Optional):' }}</label>
                <input type="email" [(ngModel)]="patientEmail" name="patientEmail" className="input-field" placeholder="example@domain.com" />
              </div>

              <div>
                <label className="input-label">{{ lang.isRtl() ? 'ملاحظات إضافية أو تفاصيل الحالة:' : 'Medical Notes:' }}</label>
                <textarea [(ngModel)]="notes" name="notes" rows="3" className="input-field" placeholder="تفاصيل حالة الطفل أو الاستفسار..."></textarea>
              </div>
            </div>

            <div style="display: flex; gap: 1rem; justify-content: space-between;">
              <button type="button" (click)="step = step - 1" className="btn btn-outline">
                {{ lang.isRtl() ? 'السابق' : 'Previous' }}
              </button>
              <button type="submit" [disabled]="isSubmitting" className="btn btn-primary btn-lg">
                {{ isSubmitting ? (lang.isRtl() ? 'جاري التأكيد...' : 'Confirming...') : (lang.isRtl() ? 'تأكيد الحجز النهائي' : 'Confirm Booking') }}
              </button>
            </div>
          </form>
        </div>

        <!-- STEP 6: CONFIRMATION SCREEN -->
        <div *ngIf="step === 6 && confirmedBooking" className="card" style="padding: 3rem; text-align: center;">
          <div style="width: 70px; height: 70px; border-radius: 50%; background-color: var(--accent-teal-light); color: var(--accent-teal); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto;">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
          </div>

          <h2 style="font-size: 2rem; color: var(--primary-dark); font-weight: 800; margin-bottom: 0.5rem;">
            {{ lang.isRtl() ? 'تم تأكيد طلب الحجز بنجاح!' : 'Booking Request Confirmed!' }}
          </h2>

          <p style="font-size: 1.1rem; color: var(--text-muted); margin-bottom: 2rem;">
            {{ lang.isRtl() ? 'الكود المرجعي لتأكيد الموعد:' : 'Booking Reference Number:' }}
            <strong style="color: var(--accent-teal); font-size: 1.25rem;">{{ confirmedBooking.bookingRef }}</strong>
          </p>

          <div style="background-color: var(--bg-alt); padding: 1.5rem; border-radius: var(--radius-md); text-align: right; margin-bottom: 2rem;" [style.text-align]="lang.isRtl() ? 'right' : 'left'">
            <p><strong>{{ lang.isRtl() ? 'العيادة:' : 'Clinic:' }}</strong> {{ lang.getText(confirmedBooking.clinicName) }}</p>
            <p><strong>{{ lang.isRtl() ? 'الموعد:' : 'Date & Time:' }}</strong> {{ confirmedBooking.date }} — {{ confirmedBooking.timeSlot }}</p>
            <p><strong>{{ lang.isRtl() ? 'اسم المريض:' : 'Patient:' }}</strong> {{ confirmedBooking.patientName }}</p>
            <p><strong>{{ lang.isRtl() ? 'الهاتف:' : 'Phone:' }}</strong> {{ confirmedBooking.patientPhone }}</p>
          </div>

          <button (click)="step = 1; confirmedBooking = null;" className="btn btn-primary">
            {{ lang.isRtl() ? 'حجز موعد جديد' : 'Book Another Appointment' }}
          </button>
        </div>

        <!-- Wizard Nav Buttons (Steps 1 to 4) -->
        <div *ngIf="step < 5" style="display: flex; justify-content: space-between; margin-top: 2rem;">
          <button (click)="step = step - 1" [disabled]="step === 1" className="btn btn-outline">
            {{ lang.isRtl() ? 'السابق' : 'Previous' }}
          </button>

          <button (click)="nextStep()" className="btn btn-primary">
            {{ lang.isRtl() ? 'التالي' : 'Next' }}
          </button>
        </div>

      </div>
    </section>
  `
})
export class AppointmentsComponent {
  lang = inject(LanguageService);
  data = inject(DataService);
  api = inject(ApiService);

  step = 1;
  clinics = this.data.getClinics();

  selectedClinicId = this.clinics[0]?.id || 'clinic-obour';
  selectedServiceId = this.getSelectedClinic()?.services[0]?.id || 'srv-1';
  selectedDate = '2026-08-16';
  selectedTimeSlot = '07:30 PM';

  patientName = '';
  patientPhone = '';
  patientEmail = '';
  notes = '';

  isSubmitting = false;
  bookingError: string | null = null;
  confirmedBooking: AppointmentBooking | null = null;

  availableTimeSlots = [
    '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM'
  ];

  getSelectedClinic() {
    return this.clinics.find(c => c.id === this.selectedClinicId) || this.clinics[0];
  }

  nextStep(): void {
    if (this.step === 1 && !this.selectedClinicId) return;
    if (this.step === 2 && !this.selectedServiceId) return;
    if (this.step === 3 && !this.selectedDate) return;
    if (this.step === 4 && !this.selectedTimeSlot) return;
    this.step++;
  }

  async submitBooking(): Promise<void> {
    if (!this.patientName || !this.patientPhone) return;

    this.isSubmitting = true;
    this.bookingError = null;

    try {
      const apiResult = await this.api.createAppointment({
        clinicId: this.selectedClinicId,
        serviceId: this.selectedServiceId,
        patientName: this.patientName,
        patientPhone: this.patientPhone,
        patientEmail: this.patientEmail,
        appointmentDate: this.selectedDate,
        startTime: this.selectedTimeSlot,
        notes: this.notes
      });
      this.confirmedBooking = apiResult;
      this.step = 6;
    } catch (err: any) {
      if (err?.message?.includes('no longer available')) {
        this.bookingError = this.lang.isRtl() ? 'عفواً، هذا الموعد تم حجزه مؤخراً وهو غير متاح الآن.' : 'This appointment slot is no longer available.';
      } else {
        // Fallback local booking creation
        const chosenClinic = this.getSelectedClinic();
        const chosenService = chosenClinic.services.find(s => s.id === this.selectedServiceId) || chosenClinic.services[0];

        const localBooking = this.data.addAppointment({
          clinicId: chosenClinic.id,
          clinicName: chosenClinic.name,
          serviceId: chosenService?.id || 'srv-1',
          serviceName: chosenService?.name || { en: 'Pediatric Service', ar: 'خدمة طبية' },
          date: this.selectedDate,
          timeSlot: this.selectedTimeSlot,
          patientName: this.patientName,
          patientPhone: this.patientPhone,
          patientEmail: this.patientEmail,
          appointmentType: 'New Consultation',
          notes: this.notes
        });
        this.confirmedBooking = localBooking;
        this.step = 6;
      }
    } finally {
      this.isSubmitting = false;
    }
  }
}
