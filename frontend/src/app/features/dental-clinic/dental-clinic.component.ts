import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-dental-clinic',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="section" style="padding-top: 3rem;">
      <div class="container">
        
        <!-- Top Hero Offer Card -->
        <div style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4338ca 100%); color: #ffffff; border-radius: 24px; padding: 3rem 2.5rem; position: relative; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.2); margin-bottom: 3rem;">
          <div style="position: absolute; top: -30px; right: -30px; width: 220px; height: 220px; background: rgba(245, 158, 11, 0.25); filter: blur(60px); border-radius: 50%;"></div>
          
          <div style="position: relative; z-index: 2; display: flex; align-items: center; justify-content: space-between; gap: 2rem; flex-wrap: wrap;">
            <div style="flex: 1 1 500px;">
              <span style="background: #f59e0b; color: #000000; font-weight: 900; font-size: 0.85rem; padding: 0.35rem 0.9rem; border-radius: 20px; text-transform: uppercase; margin-bottom: 1rem; display: inline-block;">
                🎉 {{ lang.isRtl() ? 'خصم 20% لفترة محدودة' : '20% Special Discount' }}
              </span>

              <h1 style="color: #ffffff; font-weight: 900; font-size: 2.3rem; margin-bottom: 0.75rem; line-height: 1.3;">
                🤍 {{ lang.isRtl() ? 'اليسر كلينك – في دار اليسر' : 'El Yosr Dental Clinic' }} 🤍
              </h1>

              <p style="font-size: 1.2rem; color: #fbbf24; font-weight: 800; margin-bottom: 1rem;">
                🦷✨ ابتسامتك تستاهل الأفضل! ✨🦷
              </p>

              <p style="font-size: 1rem; color: #e0e7ff; line-height: 1.7; margin-bottom: 1.75rem;">
                لأن ابتسامتك تهمنا... خلي دايمًا ليها اهتمام خاص! خصم 20% على جميع خدمات الأسنان (حشو تجميلي، تركيبات، تقويم، أسنان أطفال، وتخدير كلي).
              </p>

              <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <a href="tel:01092893808" class="btn btn-gold btn-lg" style="background: #f59e0b; border: none; color: #000; font-weight: 900; font-size: 1.05rem;">
                  📞 <span>اتصل فوراً: 01092893808</span>
                </a>
                <a href="https://wa.me/201092893808" target="_blank" class="btn btn-outline btn-lg" style="color: #ffffff; border-color: rgba(255,255,255,0.4);">
                  💬 <span>حجز واتساب للأسنان</span>
                </a>
              </div>
            </div>

            <!-- Big Tooth Graphic Badge / Logo -->
            <div style="flex: 0 0 200px; text-align: center;">
              <img
                src="/yosser-logo-full.jpg"
                alt="لوجو عيادات اليسر"
                style="width: 160px; height: 160px; border-radius: 20px; object-fit: contain; background: #ffffff; padding: 10px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); border: 2px solid rgba(255,255,255,0.3);"
              />
            </div>
          </div>
        </div>

        <!-- Official Pediatric Dental Poster Showcase -->
        <div style="margin-bottom: 3.5rem; text-align: center;">
          <div style="display: inline-block; border-radius: 24px; overflow: hidden; box-shadow: 0 15px 40px rgba(0,0,0,0.12); border: 2px solid #e2e8f0; max-width: 750px; width: 100%;">
            <img
              src="/pediatric-dental-poster.jpg"
              alt="بوستر اليسر كلينك - ضحكة طفلك نحافظ عليها من أول سنة"
              style="width: 100%; height: auto; display: block;"
            />
          </div>
        </div>

        <!-- General Anesthesia & Special Dental Services -->
        <div class="grid-2" style="gap: 1.75rem; margin-bottom: 3.5rem;">
          <!-- General Anesthesia Card -->
          <div style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 20px; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
            <div style="font-size: 2.5rem; margin-bottom: 1rem;">😴🦷</div>
            <h2 style="font-size: 1.35rem; font-weight: 900; color: #0f172a; margin-bottom: 0.75rem;">
              علاج أسنان بدون خوف أو قلق تحت التخدير الكلي
            </h2>
            <p style="font-size: 0.95rem; color: #475569; line-height: 1.65; margin-bottom: 1.25rem;">
              بتخافي من دكتور الأسنان؟ طفلك مش بيتعاون أثناء العلاج؟ أو محتاجين إجراءات أسنان متعددة في جلسة واحدة؟ دلوقتي ممكن علاج الأسنان تحت التخدير الكلي مع فريق طبي متخصص وتجهيزات مناسبة لضمان أعلى درجات الأمان والراحة.
            </p>

            <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.9rem; color: #334155; font-weight: 700; margin-bottom: 1.5rem;">
              <li>✔️ مناسب لحالات الخوف الشديد وعدم التعاون للأطفال والكبار</li>
              <li>✔️ إمكانية إجراء أكثر من علاج في جلسة واحدة بدون ألم</li>
              <li>✔️ راحة أكبر للمريض وتقييم كامل من أطباء التخدير والأسنان</li>
            </ul>

            <a href="tel:01092893808" class="btn btn-primary btn-sm" style="width: 100%; justify-content: center; background: #0d9488; border: none; font-weight: 800;">
              📞 استفسر عن عيادة التخدير الكلي
            </a>
          </div>

          <!-- Back to School Pediatric Dentistry -->
          <div style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 20px; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
            <div style="font-size: 2.5rem; margin-bottom: 1rem;">🎒🦷</div>
            <h2 style="font-size: 1.35rem; font-weight: 900; color: #0f172a; margin-bottom: 0.75rem;">
              قبل ما المدارس تبدأ... اطمني على أسنان طفلك!
            </h2>
            <p style="font-size: 0.95rem; color: #475569; line-height: 1.65; margin-bottom: 1.25rem;">
              الابتسامة الحلوة بتبدأ من أسنان صحية ❤️ قبل الزحمة والدراسة والواجبات، خدي خطوة بسيطة واعملي لطفلك كشف أسنان شامل عشان نكتشف أي تسوس أو مشكلة بدري ونبدأ السنة بابتسامة صحية وواثقة.
            </p>

            <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.9rem; color: #334155; font-weight: 700; margin-bottom: 1.5rem;">
              <li>👧👦 الكشف المبكر = علاج أسهل وابتسامة أجمل</li>
              <li>✨ عيادة مجهزة بألوان وأدوات مريحة للطفل</li>
              <li>📅 احجزي لطفلك دلوقتي واستقبلي الدراسة مطمنة</li>
            </ul>

            <a href="tel:01092893808" class="btn btn-gold btn-sm" style="width: 100%; justify-content: center; background: #f59e0b; border: none; color: #000; font-weight: 800;">
              📞 حجز كشف أسنان الأطفال
            </a>
          </div>
        </div>

        <!-- Weekly Dentists Shift Schedule Table -->
        <div style="background: #ffffff; border-radius: 24px; padding: 2.5rem 2rem; border: 1.5px solid #cbd5e1; box-shadow: 0 4px 25px rgba(0,0,0,0.06); margin-bottom: 3rem;">
          <div style="text-align: center; margin-bottom: 2rem;">
            <span class="badge badge-gold" style="font-size: 0.85rem; padding: 0.35rem 0.85rem; font-weight: 900; margin-bottom: 0.5rem; background: #fef3c7; color: #b45309;">
              📋 {{ lang.isRtl() ? 'جدول المواعيد والشيفتات' : 'Dentists Roster' }}
            </span>
            <h2 style="font-weight: 900; color: #0f172a; font-size: 1.8rem; margin-bottom: 0.5rem;">
              جدول أطباء عيادة الأسنان التخصصية (اليسر كلينك)
            </h2>
            <p style="color: #64748b; font-size: 0.95rem;">
              مدينة العبور – الحي الأول – صينية الخامس (على الطريق الرئيسي) | مباشر أسنان: <span dir="ltr" style="font-weight: 800; color: #0d9488;">01092893808</span>
            </p>
          </div>

          <!-- HIGH-CONTRAST DENTAL ROSTER TABLE -->
          <div style="border-radius: 18px; overflow: hidden; border: 1.5px solid #cbd5e1; box-shadow: 0 4px 20px rgba(15,23,42,0.05); background: #ffffff; margin-bottom: 2rem;">
            <div style="overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; text-align: start; font-size: 0.95rem;">
                <thead>
                  <tr style="background: #0f172a; color: #ffffff; font-weight: 900;">
                    <th style="padding: 1rem 1.25rem; text-align: start; width: 140px;">اليوم</th>
                    <th style="padding: 1rem 1.25rem; text-align: start;">☀️ الفترة الصباحية</th>
                    <th style="padding: 1rem 1.25rem; text-align: start;">🌙 الفترة المسائية</th>
                    <th style="padding: 1rem 1.25rem; text-align: center; width: 140px;">الحجز المباشر</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    *ngFor="let day of weekDays; let idx = index"
                    [style.background]="idx % 2 === 0 ? '#ffffff' : '#f8fafc'"
                    style="border-bottom: 1px solid #e2e8f0; transition: background 0.15s;"
                  >
                    <!-- Day Column -->
                    <td style="padding: 1.15rem 1.25rem; font-weight: 900; color: #0f172a; font-size: 1.05rem;">
                      📅 {{ day.nameAr }}
                    </td>

                    <!-- Morning Shift Column -->
                    <td style="padding: 1.15rem 1.25rem;">
                      <div *ngIf="getShiftDoctors(day.key, 'MORNING').length > 0">
                        <div *ngFor="let doc of getShiftDoctors(day.key, 'MORNING')" style="font-weight: 800; color: #166534; font-size: 0.95rem; margin-bottom: 0.25rem;">
                          • {{ doc.name }}
                        </div>
                      </div>
                      <span *ngIf="getShiftDoctors(day.key, 'MORNING').length === 0" style="color: #94a3b8; font-size: 0.85rem; font-style: italic;">
                        — لا توجد عيادة صباحية
                      </span>
                    </td>

                    <!-- Evening Shift Column -->
                    <td style="padding: 1.15rem 1.25rem;">
                      <div *ngIf="getShiftDoctors(day.key, 'EVENING').length > 0">
                        <div *ngFor="let doc of getShiftDoctors(day.key, 'EVENING')" style="font-weight: 800; color: #312e81; font-size: 0.95rem; margin-bottom: 0.25rem;">
                          • {{ doc.name }}
                        </div>
                      </div>
                      <span *ngIf="getShiftDoctors(day.key, 'EVENING').length === 0" style="color: #94a3b8; font-size: 0.85rem; font-style: italic;">
                        — لا توجد عيادة مسائية
                      </span>
                    </td>

                    <!-- Direct Action Column -->
                    <td style="padding: 1.15rem 1.25rem; text-align: center;">
                      <a href="tel:01092893808" class="btn btn-gold btn-sm" style="background: #f59e0b; border: none; color: #000; font-weight: 900; padding: 0.4rem 0.85rem; font-size: 0.82rem;">
                        📞 اتصل فوراً
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  `
})
export class DentalClinicComponent {
  lang = inject(LanguageService);
  data = inject(DataService);

  weekDays = [
    { key: 'SATURDAY', nameAr: 'السبت' },
    { key: 'SUNDAY', nameAr: 'الأحد' },
    { key: 'MONDAY', nameAr: 'الإثنين' },
    { key: 'TUESDAY', nameAr: 'الثلاثاء' },
    { key: 'WEDNESDAY', nameAr: 'الأربعاء' },
    { key: 'THURSDAY', nameAr: 'الخميس' },
    { key: 'FRIDAY', nameAr: 'الجمعة' }
  ];

  getShiftDoctors(dayKey: string, shift: 'MORNING' | 'EVENING') {
    return this.data.getDentalRoster().filter(d => d.dayOfWeek === dayKey && d.shiftType === shift);
  }
}
