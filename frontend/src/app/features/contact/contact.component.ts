import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../core/services/language.service';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="section" style="padding-top: 3rem;">
      <div class="container">
        
        <!-- Header -->
        <div class="section-header" style="text-align: center; margin-bottom: 3rem;">
          <span class="badge badge-teal" style="font-size: 0.88rem; padding: 0.4rem 0.9rem; font-weight: 800; margin-bottom: 0.5rem;">
            {{ lang.isRtl() ? 'اتصل بنا والموقع الجغرافي' : 'Contact & Location' }}
          </span>
          <h1 style="font-weight: 900; color: #0f172a; font-size: 2.3rem; margin-bottom: 0.75rem;">
            {{ lang.isRtl() ? 'تواصل مع مستشفى وعيادات دار اليسر' : 'Contact Dar El Yosser Hospital' }}
          </h1>
          <p style="color: #64748b; font-size: 1.05rem; max-width: 750px; margin: 0 auto;">
            مدينة العبور، الحي الأول، بعد صينية الخامس بـ 200 - 300 متر من الطريق البطئ أمام يوني مول.
          </p>
        </div>

        <div style="display: flex; gap: 2.5rem; flex-wrap: wrap;">
          
          <!-- Left Direct Contact Details -->
          <div style="flex: 1 1 420px;">
            
            <div style="background: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.05); margin-bottom: 2rem;">
              <h2 style="font-weight: 900; color: #0f172a; font-size: 1.4rem; margin-bottom: 1.25rem;">
                أرقام الاتصال والواتساب
              </h2>

              <div style="display: flex; flex-direction: column; gap: 1rem;">
                <div style="background: #f8fafc; padding: 1rem 1.25rem; border-radius: 12px; border-inline-start: 4px solid #0d9488;">
                  <div style="font-weight: 800; font-size: 0.88rem; color: #64748b; margin-bottom: 0.2rem;">
                    الاستفسارات العامة وطوارئ العيادات:
                  </div>
                  <div style="font-size: 1.15rem; font-weight: 900; color: #0f172a;">
                    <a href="tel:01030252002" style="color: #0d9488; text-decoration: none;">01030252002</a> - 
                    <a href="tel:01030252005" style="color: #0d9488; text-decoration: none;">01030252005</a>
                  </div>
                </div>

                <div style="background: #fffbeb; padding: 1rem 1.25rem; border-radius: 12px; border-inline-start: 4px solid #f59e0b;">
                  <div style="font-weight: 800; font-size: 0.88rem; color: #b45309; margin-bottom: 0.2rem;">
                    مركز الأسنان (اليسر كلينك):
                  </div>
                  <div style="font-size: 1.15rem; font-weight: 900; color: #78350f;">
                    <a href="tel:01092893808" style="color: #d97706; text-decoration: none;">01092893808</a>
                  </div>
                </div>

                <div style="background: #f0fdf4; padding: 1rem 1.25rem; border-radius: 12px; border-inline-start: 4px solid #22c55e;">
                  <div style="font-weight: 800; font-size: 0.88rem; color: #15803d; margin-bottom: 0.2rem;">
                    المحادثة الفورية عبر الواتساب:
                  </div>
                  <div style="font-size: 1.1rem; font-weight: 900; color: #166534;">
                    <a href="https://wa.me/201030252002" target="_blank" style="color: #16a34a; text-decoration: none;">01030252002</a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Facebook Page Card -->
            <div style="background: linear-gradient(135deg, #1e3a8a 0%, #1e293b 100%); color: #ffffff; border-radius: 20px; padding: 2rem;">
              <h3 style="color: #ffffff; font-weight: 900; font-size: 1.25rem; margin-bottom: 0.5rem;">
                📘 الصفحة الرسمية على الفيسبوك
              </h3>
              <p style="color: #93c5fd; font-size: 0.92rem; line-height: 1.6; margin-bottom: 1.25rem;">
                تابع تحديثات جدول مواعيد الأطباء، والعروض والخصومات اليومية على صفحتنا الرسمية (35,000+ متابع).
              </p>
              <a href="https://web.facebook.com/darel.Yosser2014" target="_blank" rel="noopener noreferrer" class="btn btn-gold" style="background: #3b82f6; border: none; color: #fff; font-weight: 800; width: 100%; justify-content: center;">
                🌐 زيارة صفحة فيسبوك
              </a>
            </div>

          </div>

          <!-- Right Map Frame -->
          <div style="flex: 1 1 450px;">
            <div style="background: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; padding: 1.5rem; box-shadow: 0 4px 20px rgba(0,0,0,0.05); height: 100%; display: flex; flex-direction: column;">
              <h3 style="font-weight: 900; color: #0f172a; font-size: 1.25rem; margin-bottom: 1rem;">
                خريطة الموقع والوصول للمركز
              </h3>
              
              <div style="flex: 1; min-height: 380px; border-radius: 14px; overflow: hidden; border: 1px solid #cbd5e1;">
                <iframe
                  src="https://maps.google.com/maps?q=El+Obour+City+1st+District+Cairo+Egypt&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style="border:0; min-height: 380px;"
                  allowfullscreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  `
})
export class ContactComponent {
  lang = inject(LanguageService);
  data = inject(DataService);

  @Output() tabChange = new EventEmitter<string>();

  nav(tab: string): void {
    this.tabChange.emit(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
