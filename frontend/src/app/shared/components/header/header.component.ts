import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Top Medical Emergency & Direct Contact Bar (Hidden on Mobile for Clean View) -->
    <div class="hide-on-mobile" style="background: #0f172a; color: #ffffff; padding: 0.4rem 1rem; font-size: 0.82rem; border-bottom: 1px solid rgba(255,255,255,0.1);">
      <div class="container" style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
        
        <!-- Emergency Badge & Details -->
        <div style="display: flex; align-items: center; gap: 0.6rem; font-weight: 700;">
          <span style="background: #ef4444; color: #ffffff; padding: 0.15rem 0.6rem; border-radius: 4px; font-weight: 900; font-size: 0.72rem; display: inline-flex; align-items: center; gap: 0.3rem;">
            {{ lang.isRtl() ? 'طوارئ 24/7' : '24/7 EMERGENCY' }}
          </span>
          <span style="color: #cbd5e1; font-size: 0.82rem;">
            {{ lang.isRtl() ? 'أخصائيون مقيمون (نساء - عظام - باطنة - جراحة - أطفال) بالعبور' : 'On-duty Specialists 24 Hours in El Obour City' }}
          </span>
        </div>

        <!-- Phone Lines, Facebook & Language Toggle -->
        <div style="display: flex; align-items: center; gap: 1rem; font-weight: 700; font-size: 0.85rem;">
          <a href="https://web.facebook.com/darel.Yosser2014" target="_blank" rel="noopener noreferrer" style="background: #1877f2; color: #ffffff; padding: 0.2rem 0.65rem; border-radius: 6px; font-weight: 800; font-size: 0.78rem; text-decoration: none; display: flex; align-items: center; gap: 0.35rem; box-shadow: 0 2px 6px rgba(24, 119, 242, 0.3);">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            <span>فيسبوك (35k+)</span>
          </a>

          <a href="tel:01030252002" style="color: #38bdf8; text-decoration: none; display: flex; align-items: center; gap: 0.35rem;">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span dir="ltr">01030252002</span>
          </a>
          <a href="tel:01092893808" style="color: #fbbf24; text-decoration: none; display: flex; align-items: center; gap: 0.35rem;">
            <span>الأسنان: <span dir="ltr">01092893808</span></span>
          </a>
          
          <button
            (click)="lang.toggleLanguage()"
            style="background: rgba(255,255,255,0.12); color: #ffffff; border: 1px solid rgba(255,255,255,0.25); padding: 0.2rem 0.6rem; border-radius: 6px; font-size: 0.75rem; font-weight: 800; cursor: pointer;"
          >
            {{ lang.language() === 'en' ? 'عربي' : 'English' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Main Header Container (Sticky) -->
    <header style="position: sticky; top: 0; z-index: 900; background: #ffffff; border-bottom: 2px solid #e2e8f0; box-shadow: 0 4px 20px rgba(15,23,42,0.06);">
      
      <!-- ROW 1: Hospital Name & Brand Title -->
      <div style="padding: 0.65rem 1rem; background: #ffffff;">
        <div class="container" style="display: flex; align-items: center; justify-content: space-between; gap: 0.75rem;">
          
          <!-- Hospital Brand Logo & Prominent Title -->
          <div
            (click)="nav('home')"
            style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer; flex: 1; min-width: 0;"
          >
            <img
              src="/yosser-logo-full.jpg"
              alt="لوجو مستشفى دار اليسر التخصصية"
              style="height: 52px; border-radius: 12px; object-fit: contain; background: #ffffff; padding: 4px; border: 2px solid #0d9488; box-shadow: 0 4px 15px rgba(13, 148, 136, 0.2); flex-shrink: 0;"
            />
            <div style="min-width: 0; flex: 1;">
              <div style="font-weight: 900; font-size: clamp(0.92rem, 3.8vw, 1.35rem); color: #0f172a; line-height: 1.25; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                {{ lang.isRtl() ? 'مستشفى وعيادات دار اليسر التخصصية' : 'Dar El Yosser Hospital' }}
              </div>
              <div style="font-size: clamp(0.72rem, 2.4vw, 0.82rem); color: #0d9488; font-weight: 800; margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                {{ lang.isRtl() ? 'مدينة العبور - الحي الأول - صينية الخامس (أمام يوني مول)' : 'El Obour City - 1st District - 5th Square' }}
              </div>
            </div>
          </div>

          <!-- Header Action Buttons & Hamburger Toggle -->
          <div style="display: flex; align-items: center; gap: 0.5rem; flex-shrink: 0;">
            
            <a
              href="https://web.facebook.com/darel.Yosser2014"
              target="_blank"
              rel="noopener noreferrer"
              class="btn hide-on-mobile"
              style="background: #1877f2; color: #ffffff; border: none; font-weight: 800; padding: 0.55rem 1rem; font-size: 0.85rem; border-radius: 10px; display: flex; align-items: center; gap: 0.4rem; text-decoration: none; box-shadow: 0 4px 12px rgba(24, 119, 242, 0.3);"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              <span>فيسبوك</span>
            </a>

            <button
              (click)="nav('appointments')"
              class="btn btn-primary btn-sm hide-on-mobile"
              style="background: #0d9488; border: none; font-weight: 800; padding: 0.55rem 1.15rem; font-size: 0.88rem;"
            >
              <span>{{ lang.isRtl() ? 'تعليمات وقواعد الحجز' : 'Booking Rules' }}</span>
            </button>

            <!-- Mobile Hamburger Toggle -->
            <button
              (click)="mobileMenuOpen = !mobileMenuOpen"
              class="mobile-hamburger"
              style="width: 42px; height: 42px; border-radius: 10px; background: #f8fafc; border: 1.5px solid #cbd5e1; display: flex; align-items: center; justify-content: center; cursor: pointer; padding: 0;"
              aria-label="Toggle Menu"
            >
              <svg *ngIf="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0f172a" stroke-width="2.5"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
              <svg *ngIf="mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0f172a" stroke-width="2.5"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

        </div>
      </div>

      <!-- ROW 2: Medical Departments Navigation (DESKTOP) -->
      <div style="background: #f8fafc; border-top: 1px solid #f1f5f9; padding: 0.3rem 1rem;" class="hide-on-mobile">
        <div class="container">
          <nav class="header-nav-scroll" style="justify-content: space-between;">
            
            <button
              (click)="nav('home')"
              [style.color]="activeTab === 'home' ? '#0d9488' : '#334155'"
              [style.font-weight]="activeTab === 'home' ? '900' : '700'"
              [style.background]="activeTab === 'home' ? '#ffffff' : 'transparent'"
              style="border: none; padding: 0.45rem 0.85rem; border-radius: 8px; font-size: 0.88rem; cursor: pointer;"
            >
              {{ lang.ui().home }}
            </button>

            <button
              (click)="nav('clinics')"
              [style.color]="activeTab === 'clinics' ? '#0d9488' : '#334155'"
              [style.font-weight]="activeTab === 'clinics' ? '900' : '700'"
              [style.background]="activeTab === 'clinics' ? '#ffffff' : 'transparent'"
              style="border: none; padding: 0.45rem 0.85rem; border-radius: 8px; font-size: 0.88rem; cursor: pointer;"
            >
              {{ lang.ui().departments }}
            </button>

            <button
              (click)="nav('doctors')"
              [style.color]="activeTab === 'doctors' ? '#0d9488' : '#334155'"
              [style.font-weight]="activeTab === 'doctors' ? '900' : '700'"
              [style.background]="activeTab === 'doctors' ? '#ffffff' : 'transparent'"
              style="border: none; padding: 0.45rem 0.85rem; border-radius: 8px; font-size: 0.88rem; cursor: pointer;"
            >
              {{ lang.isRtl() ? 'دليل الأطباء والاستشاريين' : 'Doctors Directory' }}
            </button>

            <button
              (click)="nav('schedules')"
              [style.color]="activeTab === 'schedules' ? '#0d9488' : '#334155'"
              [style.font-weight]="activeTab === 'schedules' ? '900' : '700'"
              [style.background]="activeTab === 'schedules' ? '#ffffff' : 'transparent'"
              style="border: none; padding: 0.45rem 0.85rem; border-radius: 8px; font-size: 0.88rem; cursor: pointer;"
            >
              {{ lang.ui().schedules }}
            </button>

            <button
              (click)="nav('dental')"
              [style.color]="activeTab === 'dental' ? '#b45309' : '#334155'"
              [style.font-weight]="activeTab === 'dental' ? '900' : '700'"
              [style.background]="activeTab === 'dental' ? '#fffbeb' : 'transparent'"
              style="padding: 0.45rem 0.85rem; border-radius: 8px; font-size: 0.88rem; cursor: pointer;"
            >
              {{ lang.isRtl() ? 'اليسر كلينك أسنان' : 'Dental Clinic' }}
              <span style="background: #f59e0b; color: #000000; font-size: 0.68rem; font-weight: 900; padding: 0.05rem 0.35rem; border-radius: 4px; margin-inline-start: 4px;">-20%</span>
            </button>

            <button
              (click)="nav('about')"
              [style.color]="activeTab === 'about' ? '#0d9488' : '#334155'"
              [style.font-weight]="activeTab === 'about' ? '900' : '700'"
              [style.background]="activeTab === 'about' ? '#ffffff' : 'transparent'"
              style="border: none; padding: 0.45rem 0.85rem; border-radius: 8px; font-size: 0.88rem; cursor: pointer;"
            >
              {{ lang.ui().about }}
            </button>

            <button
              (click)="nav('contact')"
              [style.color]="activeTab === 'contact' ? '#0d9488' : '#334155'"
              [style.font-weight]="activeTab === 'contact' ? '900' : '700'"
              [style.background]="activeTab === 'contact' ? '#ffffff' : 'transparent'"
              style="border: none; padding: 0.45rem 0.85rem; border-radius: 8px; font-size: 0.88rem; cursor: pointer;"
            >
              {{ lang.ui().contact }}
            </button>

          </nav>
        </div>
      </div>

      <!-- Mobile Navigation Drawer Overlay -->
      <div
        *ngIf="mobileMenuOpen"
        [dir]="lang.isRtl() ? 'rtl' : 'ltr'"
        style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(15, 23, 42, 0.96); backdrop-filter: blur(20px); z-index: 999; display: flex; flex-direction: column;"
      >
        <!-- Mobile Drawer Header -->
        <div style="padding: 1.25rem 1.5rem; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); background: #0f172a;">
          <div style="display: flex; align-items: center; gap: 0.85rem;">
            <img
              src="/yosser-logo-full.jpg"
              alt="لوجو دار اليسر"
              style="height: 50px; border-radius: 12px; object-fit: contain; background: #ffffff; padding: 4px; border: 2px solid #0d9488;"
            />
            <div>
              <div style="font-weight: 900; font-size: 1.05rem; color: #ffffff;">
                مستشفى وعيادات دار اليسر
              </div>
              <div style="font-size: 0.78rem; color: #38bdf8; font-weight: 700;">
                العبور - الحي الأول (أمام يوني مول)
              </div>
            </div>
          </div>
          <button (click)="mobileMenuOpen = false" style="width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,0.15); border: none; color: #ffffff; font-size: 1.3rem; cursor: pointer; display: flex; align-items: center; justify-content: center;">✕</button>
        </div>

        <!-- Mobile Drawer Menu Items -->
        <div style="padding: 1.5rem; flex: 1; display: flex; flex-direction: column; gap: 0.75rem; overflow-y: auto;">
          
          <button (click)="nav('home')" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: #ffffff; padding: 0.9rem 1.25rem; border-radius: 14px; font-weight: 800; font-size: 1rem; text-align: start; display: flex; align-items: center; gap: 0.85rem;">
            <span>{{ lang.ui().home }}</span>
          </button>

          <a href="https://web.facebook.com/darel.Yosser2014" target="_blank" rel="noopener noreferrer" style="background: #1877f2; color: #ffffff; padding: 0.9rem 1.25rem; border-radius: 14px; font-weight: 900; font-size: 1rem; text-align: start; display: flex; align-items: center; gap: 0.85rem; text-decoration: none; box-shadow: 0 4px 14px rgba(24, 119, 242, 0.4);">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            <span>صفحتنا على فيسبوك (35,000+ متابع)</span>
          </a>

          <button (click)="nav('clinics')" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: #ffffff; padding: 0.9rem 1.25rem; border-radius: 14px; font-weight: 800; font-size: 1rem; text-align: start; display: flex; align-items: center; gap: 0.85rem;">
            <span>{{ lang.ui().departments }}</span>
          </button>

          <button (click)="nav('doctors')" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: #ffffff; padding: 0.9rem 1.25rem; border-radius: 14px; font-weight: 800; font-size: 1rem; text-align: start; display: flex; align-items: center; gap: 0.85rem;">
            <span>{{ lang.isRtl() ? 'دليل الأطباء والاستشاريين' : 'Doctors Directory' }}</span>
          </button>

          <button (click)="nav('schedules')" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: #ffffff; padding: 0.9rem 1.25rem; border-radius: 14px; font-weight: 800; font-size: 1rem; text-align: start; display: flex; align-items: center; gap: 0.85rem;">
            <span>{{ lang.ui().schedules }}</span>
          </button>

          <button (click)="nav('dental')" style="background: rgba(245, 158, 11, 0.15); border: 1.5px solid #f59e0b; color: #fbbf24; padding: 0.9rem 1.25rem; border-radius: 14px; font-weight: 900; font-size: 1rem; text-align: start; display: flex; align-items: center; gap: 0.85rem;">
            <span>اليسر كلينك - أسنان (خصم 20%)</span>
          </button>

          <button (click)="nav('about')" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: #ffffff; padding: 0.9rem 1.25rem; border-radius: 14px; font-weight: 800; font-size: 1rem; text-align: start; display: flex; align-items: center; gap: 0.85rem;">
            <span>{{ lang.ui().about }}</span>
          </button>

          <button (click)="nav('contact')" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: #ffffff; padding: 0.9rem 1.25rem; border-radius: 14px; font-weight: 800; font-size: 1rem; text-align: start; display: flex; align-items: center; gap: 0.85rem;">
            <span>{{ lang.ui().contact }}</span>
          </button>

          <button (click)="nav('appointments')" style="background: #0d9488; border: none; color: #ffffff; padding: 1rem 1.25rem; border-radius: 14px; font-weight: 900; font-size: 1.05rem; display: flex; align-items: center; justify-content: center; gap: 0.6rem; margin-top: 1rem;">
            <span>{{ lang.isRtl() ? 'تعليمات وقواعد الحجز' : 'Booking Rules' }}</span>
          </button>

        </div>

        <!-- Mobile Drawer Bottom Direct Action Buttons -->
        <div style="padding: 1.25rem 1.5rem; border-top: 1px solid rgba(255,255,255,0.1); background: #0f172a; display: flex; gap: 0.75rem;">
          <a href="tel:01030252002" class="btn" style="flex: 1; background: #ef4444; color: #ffffff; font-weight: 900; padding: 0.8rem; border-radius: 12px; text-decoration: none; text-align: center; font-size: 0.9rem;">
            طوارئ 01030252002
          </a>
          <a href="tel:01092893808" class="btn" style="flex: 1; background: #f59e0b; color: #000000; font-weight: 900; padding: 0.8rem; border-radius: 12px; text-decoration: none; text-align: center; font-size: 0.9rem;">
            أسنان 01092893808
          </a>
        </div>

      </div>
    </header>

    <!-- Mobile Bottom Navigation Bar -->
    <nav class="mobile-bottom-bar" [dir]="lang.isRtl() ? 'rtl' : 'ltr'">
      <button (click)="nav('home')" [class.active]="activeTab === 'home'" class="mobile-bottom-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        <span>{{ lang.isRtl() ? 'الرئيسية' : 'Home' }}</span>
      </button>

      <button (click)="nav('schedules')" [class.active]="activeTab === 'schedules'" class="mobile-bottom-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
        <span>{{ lang.isRtl() ? 'المواعيد' : 'Roster' }}</span>
      </button>

      <button (click)="nav('doctors')" [class.active]="activeTab === 'doctors'" class="mobile-bottom-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        <span>{{ lang.isRtl() ? 'الأطباء' : 'Doctors' }}</span>
      </button>

      <button (click)="nav('dental')" [class.active]="activeTab === 'dental'" class="mobile-bottom-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8.5 2 6 4.5 6 7.5C6 11 7.5 13 8 16.5C8.4 19.3 9.5 22 11 22C11.6 22 12 20.5 12 19C12 20.5 12.4 22 13 22C14.5 22 15.6 19.3 16 16.5C16.5 13 18 11 18 7.5C18 4.5 15.5 2 12 2Z"/></svg>
        <span>{{ lang.isRtl() ? 'الأسنان' : 'Dental' }}</span>
      </button>
    </nav>
  `
})
export class HeaderComponent {
  lang = inject(LanguageService);

  @Input() activeTab = 'home';
  @Input() isAdmin = false;

  @Output() tabChange = new EventEmitter<string>();
  @Output() adminToggle = new EventEmitter<boolean>();

  mobileMenuOpen = false;

  nav(tab: string): void {
    this.tabChange.emit(tab);
    this.mobileMenuOpen = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleAdmin(): void {
    this.adminToggle.emit(!this.isAdmin);
    if (!this.isAdmin) this.nav('admin');
    else this.nav('home');
  }
}
