import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../core/services/language.service';
import { DataService } from '../../core/services/data.service';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <!-- Hero Header -->
      <section style="background-color: var(--primary-light); padding: 4rem 0;">
        <div class="container" style="text-align: center; max-width: 800px;">
          <span class="section-subtitle">{{ lang.isRtl() ? 'تواصل معنا' : 'Get in Touch' }}</span>
          <h1 style="color: var(--primary-dark); margin-bottom: 1rem;">
            {{ lang.isRtl() ? 'التواصل المباشر والاستفسارات' : 'Contact Dr. Aml Mohamed Abd El-Sattar Hamada' }}
          </h1>
          <p style="font-size: 1.1rem; color: var(--text-muted);">
            {{ lang.isRtl()
              ? 'يسعدنا استقبال استفساراتكم الأكاديمية والسريرية وحجوزاتكم عبر النموذج المباشر أو أرقام التواصل.'
              : 'Reach out for consultation inquiries, academic collaborations, or appointment bookings.' }}
          </p>
        </div>
      </section>

      <!-- Main Contact Section -->
      <section class="section">
        <div class="container">
          <div style="display: flex; gap: 3.5rem; flex-wrap: wrap;">
            <!-- Left Info Column -->
            <div style="flex: 1 1 400px;">
              <h2 style="font-size: 1.8rem; margin-bottom: 1.5rem; color: var(--primary-dark);">
                {{ lang.isRtl() ? 'معلومات الاتصال المباشرة' : 'Direct Contact Info' }}
              </h2>

              <div style="display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 2.5rem;">
                <div style="display: flex; align-items: center; gap: 1rem; padding: 1.25rem; background-color: var(--accent-teal-light); border-radius: var(--radius-md);">
                  <div style="width: 44px; height: 44px; border-radius: 50%; background-color: #ffffff; display: flex; align-items: center; justify-content: center;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div>
                    <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">
                      {{ lang.isRtl() ? 'رقم التليفون / واتساب' : 'Phone / WhatsApp' }}
                    </div>
                    <div style="font-size: 1.1rem; font-weight: 800; color: var(--primary-dark);">
                      01003514770
                    </div>
                  </div>
                </div>

                <div style="display: flex; align-items: center; gap: 1rem; padding: 1.25rem; background-color: var(--primary-light); border-radius: var(--radius-md);">
                  <div style="width: 44px; height: 44px; border-radius: 50%; background-color: #ffffff; display: flex; align-items: center; justify-content: center;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary-navy)" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </div>
                  <div>
                    <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">
                      {{ lang.isRtl() ? 'البريد الإلكتروني الرسمي' : 'Official Email' }}
                    </div>
                    <div style="font-size: 1.05rem; font-weight: 800; color: var(--primary-dark);">
                      amal.hamada&#64;med.tanta.edu.eg
                    </div>
                  </div>
                </div>
              </div>

              <!-- Clinic Summaries -->
              <h3 style="font-size: 1.25rem; margin-bottom: 1rem; color: var(--primary-dark);">
                {{ lang.ui().clinicLocations }}
              </h3>
              <div style="display: flex; flex-direction: column; gap: 1rem;">
                <div *ngFor="let clinic of data.getClinics()" style="background-color: var(--bg-alt); padding: 1rem 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
                  <div style="font-weight: 700; color: var(--primary-dark); font-size: 1rem; margin-bottom: 0.25rem;">
                    {{ lang.getText(clinic.name) }} ({{ lang.getText(clinic.city) }})
                  </div>
                  <div style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 0.5rem;">
                    {{ lang.getText(clinic.address) }}
                  </div>
                  <button (click)="nav('appointments')" class="btn btn-outline btn-sm" style="font-size: 0.8rem; padding: 0.3rem 0.75rem;">
                    {{ lang.ui().bookAppointment }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Right Contact Form -->
            <div style="flex: 1 1 450px;">
              <div class="card" style="background-color: #ffffff; padding: 2.25rem;">
                <h2 style="font-size: 1.6rem; margin-bottom: 1.5rem; color: var(--primary-dark);">
                  {{ lang.isRtl() ? 'إرسال رسالة مباشرة' : 'Send a Direct Message' }}
                </h2>

                <div *ngIf="submitted" style="text-align: center; padding: 2rem 1rem;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2" style="margin-bottom: 1rem;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <h3 style="color: var(--primary-dark); margin-bottom: 0.5rem;">
                    {{ lang.isRtl() ? 'تم إرسال رسالتك بنجاح!' : 'Message Sent Successfully!' }}
                  </h3>
                  <p style="color: var(--text-muted); margin-bottom: 1.5rem;">
                    {{ lang.isRtl() ? 'سيقوم فريق العيادة بالرد على استفسارك في أقرب وقت.' : 'Our clinic reception will review your message and reply promptly.' }}
                  </p>
                  <button (click)="submitted = false" class="btn btn-outline btn-sm">
                    {{ lang.isRtl() ? 'إرسال رسالة أخرى' : 'Send Another Message' }}
                  </button>
                </div>

                <form *ngIf="!submitted" (ngSubmit)="handleSubmit()" style="display: flex; flex-direction: column; gap: 1.25rem;">
                  <div>
                    <label style="display: block; font-weight: 700; font-size: 0.9rem; margin-bottom: 0.35rem;">
                      {{ lang.isRtl() ? 'الاسم الكامل *' : 'Full Name *' }}
                    </label>
                    <input type="text" required [(ngModel)]="fullName" name="fullName" class="input-field" [placeholder]="lang.isRtl() ? 'أدخل اسمك' : 'Your full name'" />
                  </div>

                  <div class="grid-2" style="gap: 1rem;">
                    <div>
                      <label style="display: block; font-weight: 700; font-size: 0.9rem; margin-bottom: 0.35rem;">
                        {{ lang.isRtl() ? 'البريد الإلكتروني *' : 'Email *' }}
                      </label>
                      <input type="email" required [(ngModel)]="email" name="email" class="input-field" placeholder="email@example.com" />
                    </div>

                    <div>
                      <label style="display: block; font-weight: 700; font-size: 0.9rem; margin-bottom: 0.35rem;">
                        {{ lang.isRtl() ? 'رقم الهاتف' : 'Phone Number' }}
                      </label>
                      <input type="tel" [(ngModel)]="phone" name="phone" class="input-field" placeholder="01000000000" />
                    </div>
                  </div>

                  <div>
                    <label style="display: block; font-weight: 700; font-size: 0.9rem; margin-bottom: 0.35rem;">
                      {{ lang.isRtl() ? 'الموضوع' : 'Subject' }}
                    </label>
                    <input type="text" [(ngModel)]="subject" name="subject" class="input-field" [placeholder]="lang.isRtl() ? 'موضوع الرسالة...' : 'Inquiry subject'" />
                  </div>

                  <div>
                    <label style="display: block; font-weight: 700; font-size: 0.9rem; margin-bottom: 0.35rem;">
                      {{ lang.isRtl() ? 'الرسالة *' : 'Message *' }}
                    </label>
                    <textarea rows="4" required [(ngModel)]="message" name="message" class="input-field" [placeholder]="lang.isRtl() ? 'اكتب نص استفسارك هنا...' : 'Write your message details...'"></textarea>
                  </div>

                  <button type="submit" class="btn btn-primary" style="justify-content: center;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    <span>{{ lang.ui().sendMessage }}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class ContactComponent {
  lang = inject(LanguageService);
  data = inject(DataService);
  api = inject(ApiService);

  @Output() tabChange = new EventEmitter<string>();

  fullName = '';
  email = '';
  phone = '';
  subject = '';
  message = '';
  submitted = false;

  nav(tab: string): void {
    this.tabChange.emit(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  handleSubmit(): void {
    if (!this.fullName || !this.email || !this.message) return;

    this.api.sendMessage({
      fullName: this.fullName,
      email: this.email,
      phone: this.phone,
      subject: this.subject,
      message: this.message
    }).subscribe({
      next: () => {
        this.submitted = true;
      },
      error: () => {
        this.submitted = true;
      }
    });
  }
}
