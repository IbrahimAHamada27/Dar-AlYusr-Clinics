import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-clinics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="section" style="padding-top: 3rem;">
      <div class="container">
        
        <!-- Header -->
        <div class="section-header" style="text-align: center; margin-bottom: 3rem;">
          <span class="badge badge-teal" style="font-size: 0.88rem; padding: 0.4rem 0.9rem; font-weight: 800; margin-bottom: 0.5rem;">
            🏥 {{ lang.isRtl() ? 'الأقسام والخدمات التخصصية' : 'Departments & Services' }}
          </span>
          <h1 style="font-weight: 900; color: #0f172a; font-size: 2.3rem; margin-bottom: 0.75rem;">
            {{ lang.isRtl() ? 'أقسام وعيادات مستشفى دار اليسر التخصصية' : 'Dar El Yosser Medical Departments' }}
          </h1>
          <p style="color: #64748b; font-size: 1.05rem; max-width: 750px; margin: 0 auto;">
            نوفر أكثر من 20 تخصصاً طبيًا تحت إشراف نخبة من كبار الأطباء والاستشاريين بالعبور والقاهرة.
          </p>
        </div>

        <!-- Emergency Banner Card -->
        <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #ffffff; border-radius: 20px; padding: 2rem; margin-bottom: 3rem; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="font-size: 2.5rem;">🚨</div>
            <div>
              <h3 style="color: #ef4444; font-weight: 900; font-size: 1.25rem; margin-bottom: 0.35rem;">
                طوارئ 24/7 (نساء - عظام - باطنة - جراحة - أطفال)
              </h3>
              <p style="color: #cbd5e1; font-size: 0.95rem; margin: 0;">
                أخصائيون مقيمون ومتاحون على مدار الـ 24 ساعة طوال أيام الأسبوع في مبنى المركز بالعبور.
              </p>
            </div>
          </div>
          <a href="tel:01030252002" class="btn btn-gold btn-lg" style="background: #ef4444; border: none; color: #fff; font-weight: 900;">
            📞 <span>طوارئ: 01030252002</span>
          </a>
        </div>

        <!-- Special Diagnostics Highlight Cards (EEG, Sonar, Anesthesia Dental) -->
        <div class="grid-3" style="gap: 1.5rem; margin-bottom: 3.5rem;">
          
          <div style="background: #ffffff; border: 2px solid #0d9488; border-radius: 20px; padding: 1.75rem; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
            <div style="font-size: 2.2rem; margin-bottom: 0.75rem;">🧠</div>
            <h3 style="font-size: 1.25rem; font-weight: 900; color: #0f172a; margin-bottom: 0.5rem;">
              مركز رسم المخ ورسم العصب
            </h3>
            <p style="font-size: 0.9rem; color: #475569; line-height: 1.6; margin-bottom: 1rem;">
              أحدث أجهزة رسم المخ الكهربائي ورسم العصب والعضلات بحجز مسبق مع استشاريي الفسيولوجيا العصبية.
            </p>
            <div style="background: #ccfbf1; color: #0f766e; font-weight: 800; font-size: 0.82rem; padding: 0.35rem 0.75rem; border-radius: 8px; display: inline-block;">
              حجز مسبق متاح
            </div>
          </div>

          <div style="background: #ffffff; border: 2px solid #f59e0b; border-radius: 20px; padding: 1.75rem; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
            <div style="font-size: 2.2rem; margin-bottom: 0.75rem;">🦷✨</div>
            <h3 style="font-size: 1.25rem; font-weight: 900; color: #0f172a; margin-bottom: 0.5rem;">
              اليسر كلينك - عيادة الأسنان والتخدير الكلي
            </h3>
            <p style="font-size: 0.9rem; color: #475569; line-height: 1.6; margin-bottom: 1rem;">
              خصم 20% على جميع خدمات الأسنان مع إمكانية التخدير الكلي للأطفال والكبار بدون ألم أو خوف.
            </p>
            <button (click)="nav('dental')" class="btn btn-gold btn-sm" style="background: #f59e0b; border: none; color: #000; font-weight: 900;">
              🦷 استعرض عروض الأسنان
            </button>
          </div>

          <div style="background: #ffffff; border: 2px solid #0284c7; border-radius: 20px; padding: 1.75rem; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
            <div style="font-size: 2.2rem; margin-bottom: 0.75rem;">📡</div>
            <h3 style="font-size: 1.25rem; font-weight: 900; color: #0f172a; margin-bottom: 0.5rem;">
              مركز السونار والأشعة التلفزيونية
            </h3>
            <p style="font-size: 0.9rem; color: #475569; line-height: 1.6; margin-bottom: 1rem;">
              فحوصات الأشعة التلفزيونية والدوبلر المتقدم على الحوض والبطن والجنين تحت إشراف د/ بهاء الرفاعي.
            </p>
            <div style="background: #e0f2fe; color: #0369a1; font-weight: 800; font-size: 0.82rem; padding: 0.35rem 0.75rem; border-radius: 8px; display: inline-block;">
              خارج التأمين
            </div>
          </div>

        </div>

        <!-- All Departments Grid -->
        <h2 style="font-weight: 900; color: #0f172a; margin-bottom: 1.5rem; text-align: center;">
          كافة التخصصات والعيادات اليومية
        </h2>

        <div class="grid-4" style="gap: 1.25rem;">
          <div *ngFor="let dept of data.getDepartments()" class="card card-hover" style="border-radius: 16px; border: 1px solid #e2e8f0; background: #ffffff;">
            <h3 style="font-size: 1.15rem; font-weight: 900; color: #0f172a; margin-bottom: 0.5rem;">
              {{ lang.getText(dept.name) }}
            </h3>

            <p style="font-size: 0.88rem; color: #64748b; line-height: 1.6; margin-bottom: 1rem;">
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
    </div>
  `
})
export class ClinicsComponent {
  lang = inject(LanguageService);
  data = inject(DataService);

  @Output() tabChange = new EventEmitter<string>();

  nav(tab: string): void {
    this.tabChange.emit(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
