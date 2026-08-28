import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="section" style="padding-top: 3rem;">
      <div class="container">
        
        <!-- Header -->
        <div class="section-header" style="text-align: center; margin-bottom: 3rem;">
          <span class="badge badge-teal" style="font-size: 0.88rem; padding: 0.4rem 0.9rem; font-weight: 800; margin-bottom: 0.5rem;">
            🏥 {{ lang.isRtl() ? 'نبذة عن المستشفى' : 'About Hospital' }}
          </span>
          <h1 style="font-weight: 900; color: #0f172a; font-size: 2.3rem; margin-bottom: 0.75rem;">
            {{ lang.isRtl() ? 'عن مستشفى وعيادات دار اليسر التخصصية' : 'About Dar El Yosser Hospital' }}
          </h1>
          <p style="color: #64748b; font-size: 1.05rem; max-width: 750px; margin: 0 auto;">
            رعاية صحية شاملة بمدينة العبور تضم أكثر من 20 عيادة تخصصية وطوارئ 24/7.
          </p>
        </div>

        <div style="background: #ffffff; border-radius: 24px; border: 1px solid #e2e8f0; padding: 3rem; box-shadow: 0 4px 25px rgba(0,0,0,0.06); margin-bottom: 3rem;">
          <div style="display: flex; gap: 3rem; flex-wrap: wrap; align-items: center;">
            
            <div style="flex: 1 1 450px;">
              <h2 style="font-size: 1.8rem; font-weight: 900; color: #0f172a; margin-bottom: 1.25rem;">
                رؤيتنا ورسالتنا لخدمة أهالي العبور والقاهرة
              </h2>
              <p style="font-size: 1.05rem; color: #475569; line-height: 1.8; margin-bottom: 1.5rem;">
                {{ lang.getText(hospital.aboutText) }}
              </p>
              <div style="display: flex; flex-direction: column; gap: 0.75rem; font-weight: 700; color: #0f172a;">
                <div>✔️ طوارئ واستقبال على مدار 24 ساعة بأخصائيين مقيمين.</div>
                <div>✔️ مركز اليسر المتخصص لطب الأسنان والتخدير الكلي للأطفال والكبار.</div>
                <div>✔️ أحدث وحدات رسم المخ ورسم العصب والسونار التخصصي.</div>
                <div>✔️ أكثر من 20 عيادة تخصصية تحت إشراف نخبة من كبار الأطباء والاستشاريين.</div>
              </div>
            </div>

            <div style="flex: 1 1 350px; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #ffffff; border-radius: 20px; padding: 2.25rem; text-align: center;">
              <div style="font-size: 3.5rem; margin-bottom: 1rem;">🏥✨</div>
              <h3 style="color: #ffffff; font-weight: 900; font-size: 1.4rem; margin-bottom: 0.5rem;">
                مستشفى دار اليسر
              </h3>
              <p style="color: #38bdf8; font-weight: 800; font-size: 1rem; margin-bottom: 1.5rem;">
                العبور – الحي الأول – صينية الخامس
              </p>
              <button (click)="nav('schedules')" class="btn btn-gold btn-lg" style="background: #0d9488; border: none; color: #fff; font-weight: 900; width: 100%;">
                🗓️ استعرض جدول الأطباء
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  `
})
export class AboutComponent {
  lang = inject(LanguageService);
  data = inject(DataService);

  @Output() tabChange = new EventEmitter<string>();

  hospital = this.data.getHospital();

  nav(tab: string): void {
    this.tabChange.emit(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
