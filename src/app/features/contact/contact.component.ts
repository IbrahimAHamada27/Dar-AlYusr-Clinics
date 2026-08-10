import { Component, inject } from '@angular/core';
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
    <section style="background-color: var(--primary-light); padding: 3.5rem 0;">
      <div className="container" style="text-align: center; max-width: 800px;">
        <span className="section-subtitle">{{ lang.ui().contact }}</span>
        <h1 className="section-title">{{ lang.isRtl() ? 'تواصل مع العيادة والاستشارات' : 'Get in Touch' }}</h1>
      </div>
    </section>

    <section style="padding: 5rem 0;">
      <div className="container">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3.5rem;" class="grid-responsive">

          <!-- Contact Details -->
          <div>
            <h2 style="font-size: 1.8rem; color: var(--primary-dark); font-weight: 800; margin-bottom: 1.5rem;">
              {{ lang.isRtl() ? 'معلومات الاتصال المباشرة' : 'Direct Contact Info' }}
            </h2>

            <div style="display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 2.5rem;">
              <div className="card" style="padding: 1.5rem; display: flex; align-items: center; gap: 1rem;">
                <div style="width: 46px; height: 46px; border-radius: 10px; background-color: var(--accent-teal-light); color: var(--accent-teal); display: flex; align-items: center; justify-content: center;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <div style="font-size: 0.85rem; color: var(--text-muted);">{{ lang.isRtl() ? 'الهاتف والواتساب الموحد' : 'Unified Phone & WhatsApp' }}</div>
                  <div style="font-size: 1.15rem; font-weight: 800; color: var(--primary-dark);">01000577622</div>
                </div>
              </div>

              <div className="card" style="padding: 1.5rem; display: flex; align-items: center; gap: 1rem;">
                <div style="width: 46px; height: 46px; border-radius: 10px; background-color: var(--accent-teal-light); color: var(--accent-teal); display: flex; align-items: center; justify-content: center;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <div>
                  <div style="font-size: 0.85rem; color: var(--text-muted);">{{ lang.isRtl() ? 'البريد الإلكتروني' : 'Email Address' }}</div>
                  <div style="font-size: 1.05rem; font-weight: 700; color: var(--primary-dark);">info&#64;dribrahim-pedsurg.com</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Message Form -->
          <div className="card" style="padding: 2.5rem;">
            <h3 style="font-size: 1.4rem; color: var(--primary-dark); font-weight: 800; margin-bottom: 1.5rem;">
              {{ lang.isRtl() ? 'إرسال رسالة مباشرة للعيادة' : 'Send Message' }}
            </h3>

            <div *ngIf="submitted" style="background-color: var(--accent-teal-light); color: var(--accent-teal); padding: 1rem; border-radius: var(--radius-md); font-weight: 700; margin-bottom: 1.5rem;">
              ✓ {{ lang.isRtl() ? 'تم إرسال رسالتك بنجاح، وسيتم التواصل معك قريباً.' : 'Your message has been sent successfully.' }}
            </div>

            <form (ngSubmit)="sendMessage()">
              <div style="display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 1.5rem;">
                <div>
                  <label className="input-label">{{ lang.isRtl() ? 'الاسم الكامل:' : 'Full Name:' }}</label>
                  <input type="text" [(ngModel)]="fullName" name="fullName" required className="input-field" placeholder="أحمد..." />
                </div>

                <div>
                  <label className="input-label">{{ lang.isRtl() ? 'البريد الإلكتروني:' : 'Email Address:' }}</label>
                  <input type="email" [(ngModel)]="email" name="email" required className="input-field" placeholder="name@domain.com" />
                </div>

                <div>
                  <label className="input-label">{{ lang.isRtl() ? 'رقم الهاتف:' : 'Phone Number:' }}</label>
                  <input type="tel" [(ngModel)]="phone" name="phone" className="input-field" placeholder="01000577622" />
                </div>

                <div>
                  <label className="input-label">{{ lang.isRtl() ? 'عنوان الموضوع:' : 'Subject:' }}</label>
                  <input type="text" [(ngModel)]="subject" name="subject" required className="input-field" placeholder="استفسار عن الطهارة..." />
                </div>

                <div>
                  <label className="input-label">{{ lang.isRtl() ? 'نص الرسالة:' : 'Message Text:' }}</label>
                  <textarea [(ngModel)]="message" name="message" rows="4" required className="input-field" placeholder="تفاصيل استفسارك..."></textarea>
                </div>
              </div>

              <button type="submit" [disabled]="loading" className="btn btn-primary btn-lg" style="width: 100%; justify-content: center;">
                {{ loading ? (lang.isRtl() ? 'جاري الإرسال...' : 'Sending...') : (lang.isRtl() ? 'إرسال الرسالة الآن' : 'Send Message') }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <style>
      @media (max-width: 992px) {
        .grid-responsive { grid-template-columns: 1fr !important; }
      }
    </style>
  `
})
export class ContactComponent {
  lang = inject(LanguageService);
  data = inject(DataService);
  api = inject(ApiService);

  fullName = '';
  email = '';
  phone = '';
  subject = '';
  message = '';

  loading = false;
  submitted = false;

  async sendMessage(): Promise<void> {
    if (!this.fullName || !this.email || !this.message) return;

    this.loading = true;
    try {
      await this.api.submitContactMsg({
        fullName: this.fullName,
        email: this.email,
        phone: this.phone,
        subject: this.subject,
        message: this.message
      });
      this.submitted = true;
      this.fullName = '';
      this.email = '';
      this.phone = '';
      this.subject = '';
      this.message = '';
    } catch {
      this.data.addMessage({
        fullName: this.fullName,
        email: this.email,
        phone: this.phone,
        subject: this.subject,
        message: this.message
      });
      this.submitted = true;
    } finally {
      this.loading = false;
    }
  }
}
