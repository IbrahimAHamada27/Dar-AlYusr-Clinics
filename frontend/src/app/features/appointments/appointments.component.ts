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
          <span class="section-subtitle">{{ lang.isRtl() ? 'حجز المواعيد والعيادات' : 'Online Scheduling' }}</span>
          <h1 style="color: var(--primary-dark); margin-bottom: 1rem;">
            {{ lang.isRtl() ? 'نموذج حجز كشف واستشارة طبية' : 'Book a Consultation Appointment' }}
          </h1>
          <p style="font-size: 1.1rem; color: var(--text-muted);">
            {{ lang.isRtl()
              ? 'قم بملء البيانات التالية لتأكيد حجزك الفوري والتواصل المباشر عبر الواتساب.'
              : 'Fill in your details below to confirm your appointment and connect directly via WhatsApp.' }}
          </p>
        </div>
      </section>

      <!-- Main Booking Form Section -->
      <section class="section">
        <div class="container" style="max-width: 900px;">
          <!-- Single All-in-One Form Card -->
          <div *ngIf="!isSubmitted" class="card" style="padding: 2.5rem; background-color: #ffffff; box-shadow: var(--shadow-md);">
            <form (ngSubmit)="handleFinalSubmit()" style="display: flex; flex-direction: column; gap: 2rem;">
              
              <!-- SECTION 1: Clinic & Medical Service Selection -->
              <div>
                <h3 style="font-size: 1.25rem; color: var(--primary-dark); margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.5rem; border-bottom: 2px solid var(--accent-teal-light); padding-bottom: 0.6rem;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2.2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>{{ lang.isRtl() ? '1. العيادة والخدمة الطبية المطلوبة' : '1. Clinic Branch & Medical Service' }}</span>
                </h3>

                <div class="grid-2">
                  <!-- Select Clinic -->
                  <div>
                    <label style="display: block; font-weight: 700; font-size: 0.93rem; margin-bottom: 0.4rem; color: var(--primary-dark);">
                      {{ lang.isRtl() ? 'الفرع / العيادة *' : 'Clinic Branch *' }}
                    </label>
                    <select
                      required
                      [ngModel]="selectedClinic?.id"
                      (ngModelChange)="onClinicChange($event)"
                      name="clinicIdSelect"
                      class="input-field"
                      style="font-weight: 600;"
                    >
                      <option value="" disabled selected>{{ lang.isRtl() ? '-- اختر العيادة / الفرع --' : '-- Select Clinic --' }}</option>
                      <option *ngFor="let clinic of clinics" [value]="clinic.id">
                        {{ lang.getText(clinic.name) }} ({{ lang.getText(clinic.city) }})
                      </option>
                    </select>
                  </div>

                  <!-- Select Medical Service -->
                  <div>
                    <label style="display: block; font-weight: 700; font-size: 0.93rem; margin-bottom: 0.4rem; color: var(--primary-dark);">
                      {{ lang.isRtl() ? 'الخدمة الطبية *' : 'Medical Service *' }}
                    </label>
                    <select
                      required
                      [ngModel]="selectedService?.id"
                      (ngModelChange)="onServiceChange($event)"
                      name="serviceIdSelect"
                      class="input-field"
                      style="font-weight: 600;"
                      [disabled]="!selectedClinic"
                    >
                      <option value="" disabled selected>{{ lang.isRtl() ? '-- اختر الخدمة الطبية --' : '-- Select Service --' }}</option>
                      <option *ngFor="let srv of availableServices" [value]="srv.id">
                        {{ lang.getText(srv.name) }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- SECTION 2: Date & Time Slot Selection -->
              <div>
                <h3 style="font-size: 1.25rem; color: var(--primary-dark); margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.5rem; border-bottom: 2px solid var(--accent-teal-light); padding-bottom: 0.6rem;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold-accent)" stroke-width="2.2"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 2v4"/><path d="M16 2v4"/></svg>
                  <span>{{ lang.isRtl() ? '2. موعد وتوقيت الكشف' : '2. Date & Time Slot' }}</span>
                </h3>

                <div class="grid-2" style="align-items: flex-start;">
                  <!-- Select Date -->
                  <div>
                    <label style="display: block; font-weight: 700; font-size: 0.93rem; margin-bottom: 0.4rem; color: var(--primary-dark);">
                      {{ lang.isRtl() ? 'تاريخ الكشف المطلوب *' : 'Appointment Date *' }}
                    </label>
                    <input
                      type="date"
                      required
                      [(ngModel)]="selectedDate"
                      [min]="minDate"
                      name="selectedDate"
                      class="input-field"
                      style="font-weight: 600;"
                    />
                  </div>

                  <!-- Select Visit Type -->
                  <div>
                    <label style="display: block; font-weight: 700; font-size: 0.93rem; margin-bottom: 0.4rem; color: var(--primary-dark);">
                      {{ lang.isRtl() ? 'نوع الزيارة *' : 'Visit Type *' }}
                    </label>
                    <select [(ngModel)]="appointmentType" name="appointmentType" class="input-field" style="font-weight: 600;">
                      <option value="New Consultation">{{ lang.isRtl() ? 'كشف جديد (New Consultation)' : 'New Consultation' }}</option>
                      <option value="Follow-up">{{ lang.isRtl() ? 'متابعة دورية (Follow-up)' : 'Follow-up' }}</option>
                      <option value="Online Consultation">{{ lang.isRtl() ? 'استشارة أونلاين (Online Consultation)' : 'Online Consultation' }}</option>
                    </select>
                  </div>
                </div>

                <!-- Select Time Slot -->
                <div style="margin-top: 1.25rem;">
                  <label style="display: block; font-weight: 700; font-size: 0.93rem; margin-bottom: 0.6rem; color: var(--primary-dark);">
                    {{ lang.isRtl() ? 'التوقيت المفضل *' : 'Preferred Time Slot *' }}
                  </label>
                  <div style="display: flex; gap: 0.65rem; flex-wrap: wrap;">
                    <button
                      type="button"
                      *ngFor="let slot of availableSlots"
                      (click)="selectedTimeSlot = slot"
                      [class]="selectedTimeSlot === slot ? 'btn btn-primary btn-sm' : 'btn btn-outline btn-sm'"
                      style="min-width: 100px; font-size: 0.88rem;"
                    >
                      {{ slot }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- SECTION 3: Patient Information -->
              <div>
                <h3 style="font-size: 1.25rem; color: var(--primary-dark); margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.5rem; border-bottom: 2px solid var(--accent-teal-light); padding-bottom: 0.6rem;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2.2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <span>{{ lang.isRtl() ? '3. بيانات المريض الشخصية' : '3. Patient Personal Details' }}</span>
                </h3>

                <div class="grid-2">
                  <!-- Patient Name -->
                  <div>
                    <label style="display: block; font-weight: 700; font-size: 0.93rem; margin-bottom: 0.4rem; color: var(--primary-dark);">
                      {{ lang.isRtl() ? 'اسم المريض بالكامل *' : 'Patient Full Name *' }}
                    </label>
                    <input
                      type="text"
                      required
                      [(ngModel)]="patientName"
                      name="patientName"
                      class="input-field"
                      [placeholder]="lang.isRtl() ? 'مثال: أسماء أحمد' : 'e.g. Asmaa Ahmed'"
                    />
                  </div>

                  <!-- Patient Phone -->
                  <div>
                    <label style="display: block; font-weight: 700; font-size: 0.93rem; margin-bottom: 0.4rem; color: var(--primary-dark);">
                      {{ lang.isRtl() ? 'رقم الهاتف / الواتساب *' : 'Phone / WhatsApp *' }}
                    </label>
                    <input
                      type="tel"
                      required
                      [(ngModel)]="patientPhone"
                      name="patientPhone"
                      class="input-field"
                      placeholder="01003514770"
                    />
                  </div>
                </div>

                <div class="grid-2" style="margin-top: 1.25rem;">
                  <!-- Email -->
                  <div>
                    <label style="display: block; font-weight: 700; font-size: 0.93rem; margin-bottom: 0.4rem; color: var(--primary-dark);">
                      {{ lang.isRtl() ? 'البريد الإلكتروني (اختياري)' : 'Email Address (Optional)' }}
                    </label>
                    <input
                      type="email"
                      [(ngModel)]="patientEmail"
                      name="patientEmail"
                      class="input-field"
                      placeholder="patient@example.com"
                    />
                  </div>

                  <!-- Notes -->
                  <div>
                    <label style="display: block; font-weight: 700; font-size: 0.93rem; margin-bottom: 0.4rem; color: var(--primary-dark);">
                      {{ lang.isRtl() ? 'ملاحظات إضافية (اختياري)' : 'Additional Notes (Optional)' }}
                    </label>
                    <input
                      type="text"
                      [(ngModel)]="notes"
                      name="notes"
                      class="input-field"
                      [placeholder]="lang.isRtl() ? 'أي تفاصيل عن الحالة الطبية...' : 'Any details about your condition...'"
                    />
                  </div>
                </div>
              </div>

              <!-- Submit Form Button -->
              <div style="margin-top: 1rem; text-align: center;">
                <button
                  type="submit"
                  [disabled]="!selectedClinic || !selectedService || !selectedDate || !selectedTimeSlot || !patientName || !patientPhone"
                  class="btn btn-gold btn-lg"
                  style="background: #25D366; border-color: #25D366; color: #ffffff; font-weight: 800; font-size: 1.15rem; width: 100%; max-width: 480px; box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  <span>{{ lang.isRtl() ? 'تأكيد الحجز والتوجيه للواتساب 💬' : 'Confirm & Open WhatsApp 💬' }}</span>
                </button>
              </div>
            </form>
          </div>

          <!-- BOOKING CONFIRMED CARD (Shown after submitting) -->
          <div *ngIf="isSubmitted && confirmedBooking" class="card" style="padding: 2.5rem; background-color: #ffffff; text-align: center; box-shadow: var(--shadow-lg);">
            <div
              style="width: 72px; height: 72px; border-radius: 50%; background-color: #DCFCE7; color: #16A34A; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 1.25rem;"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>

            <h2 style="color: var(--primary-dark); margin-bottom: 0.5rem; font-size: 1.8rem;">
              {{ lang.isRtl() ? 'تم تأكيد طلب الحجز بنجاح!' : 'Appointment Request Confirmed!' }}
            </h2>

            <p style="color: var(--text-muted); margin-bottom: 1.5rem; font-size: 1.05rem;">
              {{ lang.isRtl() ? 'رقم المرجعية الخاص بحجزك هو:' : 'Your appointment reference code is:' }}
            </p>

            <div
              style="background: linear-gradient(135deg, #0B132B 0%, #1C2541 100%); color: var(--gold-accent); padding: 1.1rem 2.5rem; border-radius: var(--radius-md); font-size: 2rem; font-weight: 800; letter-spacing: 0.08em; display: inline-block; margin-bottom: 2rem; border: 1.5px solid var(--gold-accent);"
            >
              {{ confirmedBooking.bookingRef }}
            </div>

            <!-- Booking Summary Box -->
            <div style="background-color: var(--bg-alt); border-radius: var(--radius-md); padding: 1.75rem; margin-bottom: 2rem; font-size: 1rem; border: 1px solid var(--border-light);" [style.text-align]="lang.isRtl() ? 'right' : 'left'">
              <div style="margin-bottom: 0.6rem;">
                <strong>{{ lang.isRtl() ? 'اسم المريض:' : 'Patient:' }}</strong> {{ confirmedBooking.patientName }}
              </div>
              <div style="margin-bottom: 0.6rem;">
                <strong>{{ lang.isRtl() ? 'رقم الهاتف:' : 'Phone:' }}</strong> {{ confirmedBooking.patientPhone }}
              </div>
              <div style="margin-bottom: 0.6rem;">
                <strong>{{ lang.isRtl() ? 'العيادة / الفرع:' : 'Clinic:' }}</strong> {{ lang.getText(confirmedBooking.clinicName) }}
              </div>
              <div style="margin-bottom: 0.6rem;">
                <strong>{{ lang.isRtl() ? 'الخدمة الطبية:' : 'Service:' }}</strong> {{ lang.getText(confirmedBooking.serviceName) }} ({{ confirmedBooking.appointmentType }})
              </div>
              <div>
                <strong>{{ lang.isRtl() ? 'التاريخ والوقت:' : 'Date & Time:' }}</strong> {{ confirmedBooking.date }} - {{ confirmedBooking.timeSlot }}
              </div>
            </div>

            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
              <a
                [href]="getWhatsAppUrl()"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-gold"
                style="background: #25D366; border-color: #25D366; color: #ffffff; font-weight: 800;"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                <span>{{ lang.isRtl() ? 'تكرار الإرسال عبر الواتساب' : 'Resend via WhatsApp' }}</span>
              </a>

              <button (click)="isSubmitted = false" class="btn btn-outline">
                <span>{{ lang.isRtl() ? 'حجز موعد جديد' : 'Book Another Appointment' }}</span>
              </button>

              <button (click)="printReceipt()" class="btn btn-outline">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
                <span>{{ lang.isRtl() ? 'طباعة تذكرة الحجز' : 'Print Receipt' }}</span>
              </button>
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

  clinics: ClinicLocation[] = [];
  availableServices: MedicalService[] = [];

  selectedClinic: ClinicLocation | null = null;
  selectedService: MedicalService | null = null;
  selectedDate = new Date().toISOString().split('T')[0];
  selectedTimeSlot = '05:00 PM';
  patientName = '';
  patientPhone = '';
  patientEmail = '';
  appointmentType: 'New Consultation' | 'Follow-up' | 'Online Consultation' = 'New Consultation';
  notes = '';

  isSubmitted = false;
  confirmedBooking: AppointmentBooking | null = null;

  availableSlots = [
    '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
    '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM'
  ];

  minDate = new Date().toISOString().split('T')[0];

  ngOnInit(): void {
    this.clinics = this.data.getClinics();
    if (this.clinics.length > 0) {
      const match = this.initialClinicId ? this.clinics.find(c => c.id === this.initialClinicId) : null;
      this.selectedClinic = match || this.clinics[0];
      this.availableServices = this.selectedClinic.services || [];
      if (this.availableServices.length > 0) {
        this.selectedService = this.availableServices[0];
      }
    }
  }

  onClinicChange(clinicId: string): void {
    const found = this.clinics.find(c => c.id === clinicId);
    if (found) {
      this.selectedClinic = found;
      this.availableServices = found.services || [];
      this.selectedService = this.availableServices.length > 0 ? this.availableServices[0] : null;
    }
  }

  onServiceChange(serviceId: string): void {
    const found = this.availableServices.find(s => s.id === serviceId);
    if (found) {
      this.selectedService = found;
    }
  }

  getWhatsAppUrl(refCode?: string): string {
    const clinicName = this.selectedClinic ? this.lang.getText(this.selectedClinic.name) : '';
    const serviceName = this.selectedService ? this.lang.getText(this.selectedService.name) : '';
    const ref = refCode || (this.confirmedBooking?.bookingRef || '');

    const textAr = `السلام عليكم ورحمة الله وبركاته،
أود تأكيد حجز موعد كشف لدى أ.د. أمل محمد عبدالستار حماده

📋 *تفاصيل طلب الحجز*:
• *رقم المرجعية*: ${ref}
• *اسم المريض*: ${this.patientName}
• *رقم الهاتف*: ${this.patientPhone}
${this.patientEmail ? `• *البريد*: ${this.patientEmail}\n` : ''}• *العيادة / الفرع*: ${clinicName}
• *الخدمة الطبية*: ${serviceName} (${this.appointmentType})
• *التاريخ المطلوب*: ${this.selectedDate}
• *التوقيت المفضل*: ${this.selectedTimeSlot}
${this.notes ? `• *ملاحظات المريض*: ${this.notes}\n` : ''}
أرجو تأكيد الموعد، وشكراً جزيلاً!`;

    return `https://wa.me/201003514770?text=${encodeURIComponent(textAr)}`;
  }

  handleFinalSubmit(): void {
    if (!this.selectedClinic || !this.selectedService || !this.selectedDate || !this.selectedTimeSlot || !this.patientName || !this.patientPhone) {
      return;
    }

    const bookingRef = 'REF-' + Math.floor(100000 + Math.random() * 900000);

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

    this.confirmedBooking = {
      id: 'APPT-' + Date.now(),
      bookingRef: bookingRef,
      clinicId: this.selectedClinic.id,
      clinicName: this.selectedClinic.name,
      serviceId: this.selectedService.id,
      serviceName: this.selectedService.name,
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

    this.api.createAppointment(payload).subscribe({
      next: (res) => {
        if (res.appointment?.bookingRef) {
          this.confirmedBooking!.bookingRef = res.appointment.bookingRef;
        }
      },
      error: () => {}
    });

    this.isSubmitted = true;

    // Automatically open WhatsApp with formatted message
    const waUrl = this.getWhatsAppUrl(bookingRef);
    window.open(waUrl, '_blank');
  }

  printReceipt(): void {
    window.print();
  }
}
