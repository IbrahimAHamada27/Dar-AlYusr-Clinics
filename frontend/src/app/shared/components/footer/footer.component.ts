import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../core/services/language.service';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer style="background-color: #0f172a; color: #ffffff; padding: 4rem 0 2rem 0; border-top: 4px solid #0d9488;">
      <div class="container">
        
        <!-- Emergency & Booking Policy Notice Cards -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; margin-bottom: 3.5rem;">
          
          <!-- 24/7 Emergency Care Card -->
          <div style="background: rgba(239, 68, 68, 0.12); border: 1.5px solid rgba(239, 68, 68, 0.4); border-radius: 16px; padding: 1.25rem 1.5rem; display: flex; align-items: flex-start; gap: 1rem;">
            <div style="font-size: 2rem; line-height: 1; flex-shrink: 0;">🚨</div>
            <div>
              <div style="font-weight: 900; font-size: 1.05rem; color: #f87171; margin-bottom: 0.35rem;">
                {{ lang.isRtl() ? 'طوارئ واستقبال على مدار 24 ساعة' : '24/7 Hospital Emergency Unit' }}
              </div>
              <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.6;">
                {{ lang.getText(hospital.emergencyCare) }}
              </div>
            </div>
          </div>

          <!-- Official Booking Policy Notice Card -->
          <div style="background: rgba(245, 158, 11, 0.12); border: 1.5px solid rgba(245, 158, 11, 0.4); border-radius: 16px; padding: 1.25rem 1.5rem; display: flex; align-items: flex-start; gap: 1rem;">
            <div style="font-size: 2rem; line-height: 1; flex-shrink: 0;">🔴</div>
            <div>
              <div style="font-weight: 900; font-size: 1.05rem; color: #fbbf24; margin-bottom: 0.35rem;">
                {{ lang.isRtl() ? 'تنبيه هام بشأن نظام الحجز بالمركز' : 'Important Booking Policy Notice' }}
              </div>
              <div style="font-size: 0.88rem; color: #e2e8f0; line-height: 1.6;">
                {{ lang.getText(hospital.bookingPolicyNotice) }}
              </div>
            </div>
          </div>

        </div>

        <!-- Main Footer 4-Column Grid -->
        <div class="grid-4" style="margin-bottom: 3.5rem; gap: 2.5rem;">
          
          <!-- Column 1: Hospital Brand & Mission -->
          <div>
            <div style="display: flex; align-items: center; gap: 0.85rem; margin-bottom: 1.25rem;">
              <img
                src="/yosser-logo-icon.jpg"
                alt="شعار مستشفى دار اليسر"
                style="width: 46px; height: 46px; border-radius: 12px; object-fit: cover; border: 2px solid #0d9488;"
              />
              <div style="font-weight: 900; font-size: 1.15rem; color: #ffffff; line-height: 1.3;">
                {{ lang.getText(hospital.name) }}
              </div>
            </div>

            <p style="font-size: 0.9rem; color: #94a3b8; line-height: 1.7; margin-bottom: 1.25rem;">
              صرح طبي تخصصي متكامل بمدينة العبور يوفر رعاية طبية شاملة بأعلى مستويات الأمان والاحترافية عبر نخبة من الاستشاريين والأخصائيين وطوارئ 24/7.
            </p>

            <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.3); color: #38bdf8; font-weight: 800; font-size: 0.85rem; padding: 0.4rem 0.85rem; border-radius: 10px;">
              <span>👍 35,000+ {{ lang.isRtl() ? 'متابع ويثق بدار اليسر' : 'Facebook Followers' }}</span>
            </div>
          </div>

          <!-- Column 2: Quick Navigation Links -->
          <div>
            <h4 style="color: #ffffff; margin-bottom: 1.25rem; font-size: 1.1rem; font-weight: 900; border-bottom: 2px solid #0d9488; padding-bottom: 0.4rem; display: inline-block;">
              {{ lang.isRtl() ? 'روابط سريعة' : 'Quick Links' }}
            </h4>
            <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.65rem;">
              <li>
                <button (click)="nav('home')" class="footer-link-btn" style="background: none; border: none; color: #cbd5e1; font-size: 0.92rem; font-weight: 700; cursor: pointer; padding: 0; display: flex; align-items: center; gap: 0.4rem;">
                  <span>🏠</span> <span>{{ lang.ui().home }}</span>
                </button>
              </li>
              <li>
                <button (click)="nav('clinics')" class="footer-link-btn" style="background: none; border: none; color: #cbd5e1; font-size: 0.92rem; font-weight: 700; cursor: pointer; padding: 0; display: flex; align-items: center; gap: 0.4rem;">
                  <span>🏥</span> <span>{{ lang.ui().departments }}</span>
                </button>
              </li>
              <li>
                <button (click)="nav('doctors')" class="footer-link-btn" style="background: none; border: none; color: #cbd5e1; font-size: 0.92rem; font-weight: 700; cursor: pointer; padding: 0; display: flex; align-items: center; gap: 0.4rem;">
                  <span>👨‍⚕️</span> <span>{{ lang.isRtl() ? 'دليل الأطباء والاستشاريين' : 'Doctors Directory' }}</span>
                </button>
              </li>
              <li>
                <button (click)="nav('schedules')" class="footer-link-btn" style="background: none; border: none; color: #cbd5e1; font-size: 0.92rem; font-weight: 700; cursor: pointer; padding: 0; display: flex; align-items: center; gap: 0.4rem;">
                  <span>🗓️</span> <span>{{ lang.ui().schedules }}</span>
                </button>
              </li>
              <li>
                <button (click)="nav('dental')" class="footer-link-btn" style="background: none; border: none; color: #f59e0b; font-size: 0.92rem; font-weight: 800; cursor: pointer; padding: 0; display: flex; align-items: center; gap: 0.4rem;">
                  <span>🦷</span> <span>اليسر كلينك - أسنان (خصم 20%)</span>
                </button>
              </li>
              <li>
                <button (click)="nav('about')" class="footer-link-btn" style="background: none; border: none; color: #cbd5e1; font-size: 0.92rem; font-weight: 700; cursor: pointer; padding: 0; display: flex; align-items: center; gap: 0.4rem;">
                  <span>ℹ️</span> <span>{{ lang.ui().about }}</span>
                </button>
              </li>
            </ul>
          </div>

          <!-- Column 3: Direct Emergency & Special Clinics -->
          <div>
            <h4 style="color: #ffffff; margin-bottom: 1.25rem; font-size: 1.1rem; font-weight: 900; border-bottom: 2px solid #0d9488; padding-bottom: 0.4rem; display: inline-block;">
              {{ lang.isRtl() ? 'أرقام الاستقبال والحجز' : 'Contact Numbers' }}
            </h4>
            <div style="display: flex; flex-direction: column; gap: 0.95rem; font-size: 0.9rem; color: #cbd5e1;">
              <div>
                <strong style="color: #ffffff; display: block; margin-bottom: 0.25rem; font-size: 0.92rem;">📞 للاستفسارات وطوارئ العيادات:</strong>
                <span dir="ltr" style="display: inline-block;">
                  <a href="tel:01030252002" style="color: #38bdf8; text-decoration: none; font-weight: 800;">01030252002</a> - 
                  <a href="tel:01030252005" style="color: #38bdf8; text-decoration: none; font-weight: 800;">01030252005</a>
                </span>
              </div>
              <div>
                <strong style="color: #ffffff; display: block; margin-bottom: 0.25rem; font-size: 0.92rem;">💬 خدمة الواتساب:</strong>
                <a href="https://wa.me/201030252002" target="_blank" style="color: #4ade80; text-decoration: none; font-weight: 800;" dir="ltr">01030252002</a>
              </div>
              <div>
                <strong style="color: #ffffff; display: block; margin-bottom: 0.25rem; font-size: 0.92rem;">🦷 مركز اليسر للأسنان:</strong>
                <a href="tel:01092893808" style="color: #f59e0b; text-decoration: none; font-weight: 900;" dir="ltr">01092893808</a>
              </div>
            </div>
          </div>

          <!-- Column 4: Address & Facebook Button -->
          <div>
            <h4 style="color: #ffffff; margin-bottom: 1.25rem; font-size: 1.1rem; font-weight: 900; border-bottom: 2px solid #0d9488; padding-bottom: 0.4rem; display: inline-block;">
              {{ lang.isRtl() ? 'الموقع وصفحة الفيسبوك' : 'Location & Social' }}
            </h4>
            <div style="font-size: 0.9rem; color: #94a3b8; line-height: 1.6; margin-bottom: 1.25rem;">
              📍 مدينة العبور، الحي الأول، بعد صينية الخامس بـ 200 - 300 متر على الطريق الرئيسي (الطريق البطئ) أمام يوني مول
            </div>
            
            <a
              [href]="hospital.facebookUrl"
              target="_blank"
              rel="noopener noreferrer"
              style="background: #1877f2; color: #ffffff; border: none; border-radius: 12px; font-weight: 800; font-size: 0.92rem; padding: 0.75rem 1.25rem; display: flex; align-items: center; justify-content: center; gap: 0.6rem; text-decoration: none; width: 100%; box-shadow: 0 4px 14px rgba(24, 119, 242, 0.4); transition: transform 0.2s;"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              <span>{{ lang.isRtl() ? 'تابع صفحتنا على فيسبوك' : 'Follow Us on Facebook' }}</span>
            </a>
          </div>

        </div>

        <!-- Footer Bottom Legal & Copyright Bar -->
        <div style="border-top: 1px solid rgba(255,255,255,0.12); padding-top: 1.75rem; font-size: 0.88rem; color: #64748b; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
          <div>
            © 2026 مستشفى وعيادات دار اليسر التخصصية. {{ lang.ui().allRightsReserved }}
          </div>
          <div style="display: flex; gap: 1.25rem; font-weight: 700; color: #94a3b8;">
            <span (click)="nav('about')" style="cursor: pointer;">سياسة الخصوصية</span>
            <span>•</span>
            <span (click)="nav('appointments')" style="cursor: pointer;">الشروط والأحكام</span>
          </div>
        </div>

      </div>
    </footer>
  `
})
export class FooterComponent {
  lang = inject(LanguageService);
  data = inject(DataService);

  @Output() tabChange = new EventEmitter<string>();

  hospital = this.data.getHospital();

  nav(tab: string): void {
    this.tabChange.emit(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
