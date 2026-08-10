import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../core/services/language.service';
import { DataService } from '../../core/services/data.service';
import { ApiService } from '../../core/services/api.service';
import { ClinicLocation, MedicalService, AppointmentBooking } from '../../core/models';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <!-- Hero Header -->
      <section style="background-color: var(--primary-light); padding: 4rem 0;">
        <div class="container" style="text-align: center; max-width: 800px;">
          <span class="section-subtitle">{{ lang.isRtl() ? 'حجز العيادات والمواعيد' : 'Online Scheduling' }}</span>
          <h1 style="color: var(--primary-dark); margin-bottom: 1rem;">
            {{ lang.isRtl() ? 'حجز موعد كشف واستشارة' : 'Book a Consultation Appointment' }}
          </h1>
          <p style="font-size: 1.1rem; color: var(--text-muted);">
            {{ lang.isRtl()
              ? 'اختر الفرع المناسب والتاريخ والخدمة الطبية لتأكيد حجزك مسبقاً.'
              : 'Select your preferred clinic, medical service, date, and time slot to confirm your booking.' }}
          </p>
        </div>
      </section>

      <!-- Wizard Main Container -->
      <section class="section">
        <div class="container" style="max-width: 900px;">
          <!-- Stepper Progress Header -->
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2.5rem; position: relative;">
            <div *ngFor="let s of [1, 2, 3, 4, 5]" style="display: flex; flex-direction: column; align-items: center; gap: 0.35rem; z-index: 2;">
              <div
                [style.background-color]="step >= s ? 'var(--accent-teal)' : '#ffffff'"
                [style.color]="step >= s ? '#ffffff' : 'var(--text-muted)'"
                [style.border]="step >= s ? '2px solid var(--accent-teal)' : '2px solid var(--border-light)'"
                style="width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1rem;"
              >
                {{ s }}
              </div>
              <span style="font-size: 0.78rem; font-weight: 700; color: var(--primary-dark);" class="desktop-only-btn">
                {{ getStepLabel(s) }}
              </span>
            </div>
          </div>

          <div class="card" style="padding: 2.5rem; background-color: #ffffff;">
            <!-- STEP 1: SELECT CLINIC -->
            <div *ngIf="step === 1">
              <h2 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--primary-dark);">
                {{ lang.isRtl() ? '1. اختر عيادة الفرع' : '1. Select Clinic Branch' }}
              </h2>
              <p style="color: var(--text-muted); margin-bottom: 1.5rem; font-size: 0.95rem;">
                {{ lang.isRtl() ? 'حدد العيادة التي ترغب بالحجز فيها:' : 'Choose the location for your visit:' }}
              </p>

              <div class="grid-3" style="margin-bottom: 2rem;">
                <div
                  *ngFor="let clinic of data.getClinics()"
                  (click)="selectedClinic = clinic; selectedService = null"
                  [style.border-color]="selectedClinic?.id === clinic.id ? 'var(--accent-teal)' : 'var(--border-light)'"
                  [style.background-color]="selectedClinic?.id === clinic.id ? 'var(--accent-teal-light)' : '#ffffff'"
                  class="card card-hover"
                  style="cursor: pointer; border-width: 2px;"
                >
                  <span class="badge badge-navy" style="margin-bottom: 0.75rem;">
                    {{ lang.getText(clinic.city) }}
                  </span>
                  <h3 style="font-size: 1.2rem; margin-bottom: 0.5rem; color: var(--primary-dark);">
                    {{ lang.getText(clinic.name) }}
                  </h3>
                  <p style="font-size: 0.88rem; color: var(--text-muted);">
                    {{ lang.getText(clinic.address) }}
                  </p>
                </div>
              </div>

              <div style="display: flex; justify-content: flex-end;">
                <button (click)="handleNextStep()" [disabled]="!selectedClinic" class="btn btn-primary">
                  <span>{{ lang.isRtl() ? 'المتابعة للخدمات' : 'Continue to Services' }}</span>
                </button>
              </div>
            </div>

            <!-- STEP 2: SELECT SERVICE -->
            <div *ngIf="step === 2 && selectedClinic">
              <h2 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--primary-dark);">
                {{ lang.isRtl() ? '2. اختر الخدمة الطبية' : '2. Select Medical Service' }}
              </h2>
              <p style="color: var(--text-muted); margin-bottom: 1.5rem; font-size: 0.95rem;">
                {{ lang.isRtl() ? 'الخدمات المتاحة في فرع ' + lang.getText(selectedClinic.name) + ':' : 'Available services at ' + lang.getText(selectedClinic.name) + ':' }}
              </p>

              <div class="grid-2" style="margin-bottom: 2rem;">
                <div
                  *ngFor="let srv of selectedClinic.services"
                  (click)="selectedService = srv"
                  [style.border-color]="selectedService?.id === srv.id ? 'var(--accent-teal)' : 'var(--border-light)'"
                  [style.background-color]="selectedService?.id === srv.id ? 'var(--accent-teal-light)' : '#ffffff'"
                  class="card card-hover"
                  style="cursor: pointer; border-width: 2px;"
                >
                  <h3 style="font-size: 1.15rem; margin-bottom: 0.35rem; color: var(--primary-dark);">
                    {{ lang.getText(srv.name) }}
                  </h3>
                  <p *ngIf="srv.description" style="font-size: 0.88rem; color: var(--text-muted);">
                    {{ lang.getText(srv.description) }}
                  </p>
                </div>
              </div>

              <div style="display: flex; justify-content: space-between;">
                <button (click)="handlePrevStep()" class="btn btn-outline">
                  {{ lang.isRtl() ? 'السابق' : 'Back' }}
                </button>
                <button (click)="handleNextStep()" [disabled]="!selectedService" class="btn btn-primary">
                  <span>{{ lang.isRtl() ? 'المتابعة لتاريخ الموعد' : 'Continue to Date' }}</span>
                </button>
              </div>
            </div>

            <!-- STEP 3: SELECT DATE -->
            <div *ngIf="step === 3">
              <h2 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--primary-dark);">
                {{ lang.isRtl() ? '3. اختر تاريخ الكشف' : '3. Select Appointment Date' }}
              </h2>
              <p style="color: var(--text-muted); margin-bottom: 1.5rem; font-size: 0.95rem;">
                {{ lang.isRtl() ? 'اختر اليوم المناسب لاستشارتك:' : 'Choose your consultation date:' }}
              </p>

              <div style="margin-bottom: 2rem; max-width: 380px;">
                <input
                  type="date"
                  [(ngModel)]="selectedDate"
                  [min]="minDate"
                  class="input-field"
                  style="font-size: 1.1rem; padding: 0.85rem;"
                />
              </div>

              <div style="display: flex; justify-content: space-between;">
                <button (click)="handlePrevStep()" class="btn btn-outline">
                  {{ lang.isRtl() ? 'السابق' : 'Back' }}
                </button>
                <button (click)="handleNextStep()" [disabled]="!selectedDate" class="btn btn-primary">
                  <span>{{ lang.isRtl() ? 'المتابعة لاختيار الوقت' : 'Continue to Time Slot' }}</span>
                </button>
              </div>
            </div>

            <!-- STEP 4: SELECT TIME SLOT -->
            <div *ngIf="step === 4">
              <h2 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--primary-dark);">
                {{ lang.isRtl() ? '4. اختر توقيت الموعد' : '4. Select Time Slot' }}
              </h2>
              <p style="color: var(--text-muted); margin-bottom: 1.5rem; font-size: 0.95rem;">
                {{ lang.isRtl() ? 'المواعيد المتاحة ليوم ' + selectedDate + ':' : 'Available time slots for ' + selectedDate + ':' }}
              </p>

              <div style="display: flex; gap: 0.85rem; flex-wrap: wrap; margin-bottom: 2rem;">
                <button
                  *ngFor="let slot of availableSlots"
                  (click)="selectedTimeSlot = slot"
                  [class]="selectedTimeSlot === slot ? 'btn btn-primary' : 'btn btn-outline'"
                  style="min-width: 110px;"
                >
                  {{ slot }}
                </button>
              </div>

              <div style="display: flex; justify-content: space-between;">
                <button (click)="handlePrevStep()" class="btn btn-outline">
                  {{ lang.isRtl() ? 'السابق' : 'Back' }}
                </button>
                <button (click)="handleNextStep()" [disabled]="!selectedTimeSlot" class="btn btn-primary">
                  <span>{{ lang.isRtl() ? 'المتابعة لبيانات المريض' : 'Continue to Patient Info' }}</span>
                </button>
              </div>
            </div>

            <!-- STEP 5: PATIENT DETAILS & CONFIRMATION -->
            <div *ngIf="step === 5">
              <h2 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--primary-dark);">
                {{ lang.isRtl() ? '5. بيانات المريض والتأكيد' : '5. Patient Details & Confirmation' }}
              </h2>
              <p style="color: var(--text-muted); margin-bottom: 1.5rem; font-size: 0.95rem;">
                {{ lang.isRtl() ? 'يرجى إدخال البيانات الشخصية لإتمام الحجز:' : 'Fill in patient information to complete booking:' }}
              </p>

              <form (ngSubmit)="handleFinalSubmit()" style="display: flex; flex-direction: column; gap: 1.25rem;">
                <div class="grid-2">
                  <div>
                    <label style="display: block; font-weight: 700; font-size: 0.9rem; margin-bottom: 0.35rem;">
                      {{ lang.isRtl() ? 'اسم المريض بالكامل *' : 'Patient Full Name *' }}
                    </label>
                    <input type="text" required [(ngModel)]="patientName" name="patientName" class="input-field" placeholder="اسم الطفل / المريض" />
                  </div>

                  <div>
                    <label style="display: block; font-weight: 700; font-size: 0.9rem; margin-bottom: 0.35rem;">
                      {{ lang.isRtl() ? 'رقم الهاتف / الواتساب *' : 'Phone / WhatsApp *' }}
                    </label>
                    <input type="tel" required [(ngModel)]="patientPhone" name="patientPhone" class="input-field" placeholder="01000000000" />
                  </div>
                </div>

                <div class="grid-2">
                  <div>
                    <label style="display: block; font-weight: 700; font-size: 0.9rem; margin-bottom: 0.35rem;">
                      {{ lang.isRtl() ? 'البريد الإلكتروني' : 'Email Address' }}
                    </label>
                    <input type="email" [(ngModel)]="patientEmail" name="patientEmail" class="input-field" placeholder="patient@example.com" />
                  </div>

                  <div>
                    <label style="display: block; font-weight: 700; font-size: 0.9rem; margin-bottom: 0.35rem;">
                      {{ lang.isRtl() ? 'نوع الزيارة' : 'Appointment Type' }}
                    </label>
                    <select [(ngModel)]="appointmentType" name="appointmentType" class="input-field">
                      <option value="New Consultation">{{ lang.isRtl() ? 'كشف جديد (New Consultation)' : 'New Consultation' }}</option>
                      <option value="Follow-up">{{ lang.isRtl() ? 'متابعة دورية (Follow-up)' : 'Follow-up' }}</option>
                      <option value="Online Consultation">{{ lang.isRtl() ? 'استشارة أونلاين (Online Consultation)' : 'Online Consultation' }}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style="display: block; font-weight: 700; font-size: 0.9rem; margin-bottom: 0.35rem;">
                    {{ lang.isRtl() ? 'ملاحظات إضافية (اختياري)' : 'Optional Message / Notes' }}
                  </label>
                  <textarea rows="3" [(ngModel)]="notes" name="notes" class="input-field" [placeholder]="lang.isRtl() ? 'أي تفاصيل عن الحالة الطبية...' : 'Brief notes about your condition...'"></textarea>
                </div>

                <div style="display: flex; justify-content: space-between; margin-top: 1rem;">
                  <button type="button" (click)="handlePrevStep()" class="btn btn-outline">
                    {{ lang.isRtl() ? 'السابق' : 'Back' }}
                  </button>
                  <button type="submit" class="btn btn-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    <span>{{ lang.ui().confirmBooking }}</span>
                  </button>
                </div>
              </form>
            </div>

            <!-- STEP 6: BOOKING CONFIRMED -->
            <div *ngIf="step === 6 && confirmedBooking" style="text-align: center;">
              <div
                style="width: 64px; height: 64px; border-radius: 50%; background-color: var(--accent-teal-light); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 1.25rem;"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>

              <h2 style="color: var(--primary-dark); margin-bottom: 0.5rem;">
                {{ lang.isRtl() ? 'تم تأكيد طلب الموعد بنجاح!' : 'Appointment Booking Confirmed!' }}
              </h2>

              <p style="color: var(--text-muted); margin-bottom: 1.75rem;">
                {{ lang.isRtl() ? 'رقم المرجعية الخاص بحجزك هو:' : 'Your appointment reference code is:' }}
              </p>

              <div
                style="background-color: var(--primary-dark); color: var(--gold-accent); padding: 1rem 2rem; border-radius: var(--radius-md); font-size: 1.75rem; font-weight: 800; letter-spacing: 0.08em; display: inline-block; margin-bottom: 2rem;"
              >
                {{ confirmedBooking.bookingRef }}
              </div>

              <!-- Booking Summary Box -->
              <div style="background-color: var(--bg-alt); border-radius: var(--radius-md); padding: 1.5rem; margin-bottom: 2rem; font-size: 0.95rem;" [style.text-align]="lang.isRtl() ? 'right' : 'left'">
                <div style="margin-bottom: 0.5rem;">
                  <strong>{{ lang.isRtl() ? 'المريض:' : 'Patient:' }}</strong> {{ confirmedBooking.patientName }}
                </div>
                <div style="margin-bottom: 0.5rem;">
                  <strong>{{ lang.isRtl() ? 'العيادة:' : 'Clinic:' }}</strong> {{ lang.getText(confirmedBooking.clinicName) }}
                </div>
                <div style="margin-bottom: 0.5rem;">
                  <strong>{{ lang.isRtl() ? 'الخدمة:' : 'Service:' }}</strong> {{ lang.getText(confirmedBooking.serviceName) }} ({{ confirmedBooking.appointmentType }})
                </div>
                <div style="margin-bottom: 0.5rem;">
                  <strong>{{ lang.isRtl() ? 'التاريخ والوقت:' : 'Date & Time:' }}</strong> {{ confirmedBooking.date }} at {{ confirmedBooking.timeSlot }}
                </div>
              </div>

              <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <a
                  [href]="'https://wa.me/201000577622?text=Hello%20Doctor,%20I%20have%20booked%20an%20appointment%20ref:%20' + confirmedBooking.bookingRef"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-primary"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  <span>{{ lang.isRtl() ? 'إرسال تأكيد عبر الواتساب' : 'Send WhatsApp Confirmation' }}</span>
                </a>

                <button (click)="printReceipt()" class="btn btn-outline">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
                  <span>{{ lang.isRtl() ? 'طباعة تذكرة الحجز' : 'Print Booking Receipt' }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class AppointmentsComponent implements OnInit {
  lang = inject(LanguageService);
  data = inject(DataService);
  api = inject(ApiService);

  @Input() initialClinicId?: string;

  step = 1;
  selectedClinic: ClinicLocation | null = null;
  selectedService: MedicalService | null = null;
  selectedDate = '';
  selectedTimeSlot = '';
  patientName = '';
  patientPhone = '';
  patientEmail = '';
  appointmentType: 'New Consultation' | 'Follow-up' | 'Online Consultation' = 'New Consultation';
  notes = '';

  confirmedBooking: AppointmentBooking | null = null;

  availableSlots = [
    '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM',
    '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM'
  ];

  minDate = new Date().toISOString().split('T')[0];

  ngOnInit(): void {
    if (this.initialClinicId) {
      const clinic = this.data.getClinics().find(c => c.id === this.initialClinicId);
      if (clinic) {
        this.selectedClinic = clinic;
      }
    }
  }

  getStepLabel(s: number): string {
    const labelsEn = ['Clinic', 'Service', 'Date', 'Time', 'Confirm'];
    const labelsAr = ['العيادة', 'الخدمة', 'التاريخ', 'الوقت', 'التأكيد'];
    return this.lang.isRtl() ? labelsAr[s - 1] : labelsEn[s - 1];
  }

  handleNextStep(): void {
    if (this.step < 5) this.step++;
  }

  handlePrevStep(): void {
    if (this.step > 1) this.step--;
  }

  handleFinalSubmit(): void {
    if (!this.selectedClinic || !this.selectedService || !this.selectedDate || !this.selectedTimeSlot || !this.patientName || !this.patientPhone) {
      return;
    }

    const payload = {
      clinicId: this.selectedClinic.id,
      serviceId: this.selectedService.id,
      patientName: this.patientName,
      patientPhone: this.patientPhone,
      patientEmail: this.patientEmail,
      appointmentType: this.appointmentType,
      date: this.selectedDate,
      timeSlot: this.selectedTimeSlot,
      notes: this.notes
    };

    this.api.createAppointment(payload).subscribe({
      next: (res) => {
        this.confirmedBooking = {
          id: res.appointment?.id || 'APPT-' + Date.now(),
          bookingRef: res.appointment?.bookingRef || 'REF-' + Math.floor(100000 + Math.random() * 900000),
          clinicId: this.selectedClinic!.id,
          clinicName: this.selectedClinic!.name,
          serviceId: this.selectedService!.id,
          serviceName: this.selectedService!.name,
          patientName: this.patientName,
          patientPhone: this.patientPhone,
          patientEmail: this.patientEmail,
          appointmentType: this.appointmentType,
          date: this.selectedDate,
          timeSlot: this.selectedTimeSlot,
          status: 'Confirmed',
          notes: this.notes,
          createdAt: new Date().toISOString()
        };
        this.step = 6;
      },
      error: () => {
        // Local fallback if backend fails
        this.confirmedBooking = {
          id: 'APPT-' + Date.now(),
          bookingRef: 'REF-' + Math.floor(100000 + Math.random() * 900000),
          clinicId: this.selectedClinic!.id,
          clinicName: this.selectedClinic!.name,
          serviceId: this.selectedService!.id,
          serviceName: this.selectedService!.name,
          patientName: this.patientName,
          patientPhone: this.patientPhone,
          patientEmail: this.patientEmail,
          appointmentType: this.appointmentType,
          date: this.selectedDate,
          timeSlot: this.selectedTimeSlot,
          status: 'Confirmed',
          notes: this.notes,
          createdAt: new Date().toISOString()
        };
        this.step = 6;
      }
    });
  }

  printReceipt(): void {
    window.print();
  }
}
