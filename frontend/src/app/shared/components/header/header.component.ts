import { Component, Input, Output, EventEmitter, inject, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header style="position: sticky; top: 0; z-index: 900;" class="glass-header">
      <!-- Top Demo Disclaimer Bar -->
      <div className="demo-banner">
        <div style="display: flex; align-items: center; justify-content: center; gap: 0.6rem; flex-wrap: wrap; width: 100%;">
          <span className="demo-banner-tag">{{ lang.ui().demoContentNotice }}</span>
          <span style="font-size: 0.8rem; line-height: 1.3;">{{ lang.ui().demoNoticeDesc }}</span>
        </div>
      </div>

      <div className="container" style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1.5rem;">
        <!-- Brand Logo & Name -->
        <div
          (click)="handleNavClick('home')"
          style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer; flex-shrink: 0;"
        >
          <div
            style="width: 42px; height: 42px; border-radius: 10px; background-color: var(--primary-navy); color: #ffffff; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-sm); flex-shrink: 0;"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0D9488" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4.8 2.3A.3.3 0 0 0 4.5 2.6V5A6 6 0 0 0 16.5 5V2.6a.3.3 0 0 0-.3-.3h-1.4a.3.3 0 0 0-.3.3V5a3.5 3.5 0 0 1-7 0V2.6a.3.3 0 0 0-.3-.3H4.8z"/>
              <path d="M10.5 11v6a3.5 3.5 0 0 0 7 0v-1"/>
              <circle cx="17.5" cy="14.5" r="2.5"/>
            </svg>
          </div>
          <div>
            <div style="font-weight: 800; font-size: 1.1rem; color: var(--primary-dark); line-height: 1.1;">
              {{ lang.isRtl() ? 'د. إبراهيم الشرقاوي' : 'Dr. Ibrahim El Sherqawy' }}
            </div>
            <div style="font-size: 0.75rem; color: var(--accent-teal); font-weight: 600;">
              {{ lang.isRtl() ? 'استشاري الأمراض الباطنية والباحث الطبي' : 'Consultant Physician & Researcher' }}
            </div>
          </div>
        </div>

        <!-- Desktop Navigation Links -->
        <nav style="display: flex; align-items: center; gap: 1.15rem;" class="desktop-nav">
          <button
            (click)="handleNavClick('home')"
            [style.font-weight]="activeTab === 'home' ? 700 : 500"
            [style.color]="activeTab === 'home' ? 'var(--accent-teal)' : 'var(--text-main)'"
            style="background: none; border: none; cursor: pointer; font-size: 0.92rem;"
          >
            {{ lang.ui().home }}
          </button>

          <button
            (click)="handleNavClick('about')"
            [style.font-weight]="activeTab === 'about' ? 700 : 500"
            [style.color]="activeTab === 'about' ? 'var(--accent-teal)' : 'var(--text-main)'"
            style="background: none; border: none; cursor: pointer; font-size: 0.92rem;"
          >
            {{ lang.ui().about }}
          </button>

          <!-- Academic Dropdown -->
          <div style="position: relative;">
            <button
              (click)="academicDropdownOpen = !academicDropdownOpen"
              [style.font-weight]="['education', 'certificates'].includes(activeTab) ? 700 : 500"
              [style.color]="['education', 'certificates'].includes(activeTab) ? 'var(--accent-teal)' : 'var(--text-main)'"
              style="background: none; border: none; cursor: pointer; font-size: 0.92rem; display: flex; align-items: center; gap: 0.25rem;"
            >
              {{ lang.ui().academic }}
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div
              *ngIf="academicDropdownOpen"
              style="position: absolute; top: 100%; margin-top: 0.5rem; background-color: #ffffff; border-radius: var(--radius-md); box-shadow: var(--shadow-lg); border: 1px solid var(--border-light); padding: 0.5rem 0; min-width: 190px; z-index: 99;"
              [style.right]="lang.isRtl() ? '0' : 'auto'"
              [style.left]="lang.isRtl() ? 'auto' : '0'"
            >
              <button
                (click)="handleNavClick('education')"
                style="display: block; width: 100%; padding: 0.5rem 1rem; border: none; background: none; cursor: pointer; font-size: 0.88rem;"
                [style.text-align]="lang.isRtl() ? 'right' : 'left'"
              >
                {{ lang.ui().education }}
              </button>
              <button
                (click)="handleNavClick('certificates')"
                style="display: block; width: 100%; padding: 0.5rem 1rem; border: none; background: none; cursor: pointer; font-size: 0.88rem;"
                [style.text-align]="lang.isRtl() ? 'right' : 'left'"
              >
                {{ lang.ui().certificates }}
              </button>
            </div>
          </div>

          <!-- Research Dropdown -->
          <div style="position: relative;">
            <button
              (click)="researchDropdownOpen = !researchDropdownOpen"
              [style.font-weight]="['research', 'publications'].includes(activeTab) ? 700 : 500"
              [style.color]="['research', 'publications'].includes(activeTab) ? 'var(--accent-teal)' : 'var(--text-main)'"
              style="background: none; border: none; cursor: pointer; font-size: 0.92rem; display: flex; align-items: center; gap: 0.25rem;"
            >
              {{ lang.ui().research }}
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div
              *ngIf="researchDropdownOpen"
              style="position: absolute; top: 100%; margin-top: 0.5rem; background-color: #ffffff; border-radius: var(--radius-md); box-shadow: var(--shadow-lg); border: 1px solid var(--border-light); padding: 0.5rem 0; min-width: 190px; z-index: 99;"
              [style.right]="lang.isRtl() ? '0' : 'auto'"
              [style.left]="lang.isRtl() ? 'auto' : '0'"
            >
              <button
                (click)="handleNavClick('research')"
                style="display: block; width: 100%; padding: 0.5rem 1rem; border: none; background: none; cursor: pointer; font-size: 0.88rem;"
                [style.text-align]="lang.isRtl() ? 'right' : 'left'"
              >
                {{ lang.ui().researchAreas }}
              </button>
              <button
                (click)="handleNavClick('publications')"
                style="display: block; width: 100%; padding: 0.5rem 1rem; border: none; background: none; cursor: pointer; font-size: 0.88rem;"
                [style.text-align]="lang.isRtl() ? 'right' : 'left'"
              >
                {{ lang.ui().publications }}
              </button>
            </div>
          </div>

          <button
            (click)="handleNavClick('publications')"
            [style.font-weight]="activeTab === 'publications' ? 700 : 500"
            [style.color]="activeTab === 'publications' ? 'var(--accent-teal)' : 'var(--text-main)'"
            style="background: none; border: none; cursor: pointer; font-size: 0.92rem;"
          >
            {{ lang.ui().publications }}
          </button>

          <button
            (click)="handleNavClick('conferences')"
            [style.font-weight]="activeTab === 'conferences' ? 700 : 500"
            [style.color]="activeTab === 'conferences' ? 'var(--accent-teal)' : 'var(--text-main)'"
            style="background: none; border: none; cursor: pointer; font-size: 0.92rem;"
          >
            {{ lang.ui().conferences }}
          </button>

          <button
            (click)="handleNavClick('articles')"
            [style.font-weight]="activeTab === 'articles' ? 700 : 500"
            [style.color]="activeTab === 'articles' ? 'var(--accent-teal)' : 'var(--text-main)'"
            style="background: none; border: none; cursor: pointer; font-size: 0.92rem;"
          >
            {{ lang.ui().articles }}
          </button>

          <button
            (click)="handleNavClick('clinics')"
            [style.font-weight]="activeTab === 'clinics' ? 700 : 500"
            [style.color]="activeTab === 'clinics' ? 'var(--accent-teal)' : 'var(--text-main)'"
            style="background: none; border: none; cursor: pointer; font-size: 0.92rem;"
          >
            {{ lang.ui().clinics }}
          </button>

          <button
            (click)="handleNavClick('socialMedia')"
            [style.font-weight]="activeTab === 'socialMedia' ? 700 : 500"
            [style.color]="activeTab === 'socialMedia' ? 'var(--accent-teal)' : 'var(--text-main)'"
            style="background: none; border: none; cursor: pointer; font-size: 0.92rem;"
          >
            {{ lang.ui().socialMedia }}
          </button>

          <button
            (click)="handleNavClick('contact')"
            [style.font-weight]="activeTab === 'contact' ? 700 : 500"
            [style.color]="activeTab === 'contact' ? 'var(--accent-teal)' : 'var(--text-main)'"
            style="background: none; border: none; cursor: pointer; font-size: 0.92rem;"
          >
            {{ lang.ui().contact }}
          </button>
        </nav>

        <!-- Action Controls -->
        <div style="display: flex; align-items: center; gap: 0.65rem; flex-shrink: 0;">
          <!-- Language Switcher -->
          <button
            (click)="lang.toggleLanguage()"
            class="btn btn-outline btn-sm"
            title="Switch Language / تغيير اللغة"
            style="padding: 0.4rem 0.65rem; gap: 0.35rem; font-size: 0.825rem;"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0D9488" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            <span>{{ lang.language() === 'en' ? 'العربية' : 'English' }}</span>
          </button>

          <!-- Admin Toggle Button (Desktop Only) -->
          <button
            (click)="toggleAdmin()"
            [class]="isAdmin ? 'btn btn-navy btn-sm desktop-only-btn' : 'btn btn-outline btn-sm desktop-only-btn'"
            style="padding: 0.4rem 0.65rem; gap: 0.35rem; font-size: 0.825rem;"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m16 11 2 2 4-4"/></svg>
            <span>{{ isAdmin ? (lang.isRtl() ? 'الموقع العام' : 'Public Site') : (lang.isRtl() ? 'التحكم CMS' : 'Admin CMS') }}</span>
          </button>

          <!-- Book Appointment CTA (Desktop Only) -->
          <button
            (click)="handleNavClick('appointments')"
            class="btn btn-primary btn-sm desktop-cta"
            style="gap: 0.35rem; padding: 0.45rem 0.9rem;"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
            <span>{{ lang.ui().bookAppointment }}</span>
          </button>

          <!-- Mobile Hamburger Button -->
          <button
            (click)="toggleMobileMenu()"
            class="mobile-hamburger"
            style="width: 38px; height: 38px; border-radius: 8px; background-color: var(--bg-alt); border: 1px solid var(--border-light); display: flex; align-items: center; justify-content: center; cursor: pointer; padding: 0;"
            aria-label="Toggle Navigation Menu"
          >
            <svg *ngIf="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary-dark)" stroke-width="2"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            <svg *ngIf="mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary-dark)" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
      </div>

      <!-- 100% Solid Fullscreen Mobile Drawer Portal -->
      <div
        *ngIf="mobileMenuOpen"
        [attr.dir]="lang.isRtl() ? 'rtl' : 'ltr'"
        style="position: fixed; inset: 0; background-color: #FFFFFF; z-index: 999999; display: flex; flex-direction: column; overflow-y: auto;"
      >
        <!-- Mobile Drawer Header -->
        <div
          style="padding: 1rem 1.25rem; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-light); background-color: #FFFFFF;"
        >
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div
              style="width: 38px; height: 38px; border-radius: 10px; background-color: var(--primary-navy); color: #ffffff; display: flex; align-items: center; justify-content: center;"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0D9488" stroke-width="2"><path d="M4.8 2.3A.3.3 0 0 0 4.5 2.6V5A6 6 0 0 0 16.5 5V2.6a.3.3 0 0 0-.3-.3h-1.4a.3.3 0 0 0-.3.3V5a3.5 3.5 0 0 1-7 0V2.6a.3.3 0 0 0-.3-.3H4.8z"/><path d="M10.5 11v6a3.5 3.5 0 0 0 7 0v-1"/><circle cx="17.5" cy="14.5" r="2.5"/></svg>
            </div>
            <div>
              <div style="font-weight: 800; font-size: 1.05rem; color: var(--primary-dark);">
                {{ lang.isRtl() ? 'د. إبراهيم الشرقاوي' : 'Dr. Ibrahim El Sherqawy' }}
              </div>
              <div style="font-size: 0.75rem; color: var(--accent-teal); font-weight: 600;">
                {{ lang.isRtl() ? 'استشاري الأمراض الباطنية' : 'Consultant Physician' }}
              </div>
            </div>
          </div>

          <button
            (click)="toggleMobileMenu()"
            style="width: 38px; height: 38px; border-radius: 50%; background-color: var(--bg-alt); border: none; display: flex; align-items: center; justify-content: center; cursor: pointer;"
            aria-label="Close Navigation Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary-dark)" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <!-- Mobile Drawer Body Links -->
        <div style="padding: 1.25rem; flex: 1; display: flex; flex-direction: column; gap: 0.4rem;">
          <button
            (click)="toggleAdmin(); toggleMobileMenu();"
            style="display: flex; align-items: center; gap: 0.75rem; width: 100%; padding: 0.75rem 1rem; border-radius: var(--radius-md); background-color: var(--primary-light); color: var(--primary-navy); font-weight: 700; font-size: 0.95rem; border: 1px solid rgba(30, 62, 98, 0.2); margin-bottom: 0.5rem; cursor: pointer;"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-navy)" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m16 11 2 2 4-4"/></svg>
            <span>{{ isAdmin ? (lang.isRtl() ? 'الموقع العام' : 'Public Site') : (lang.isRtl() ? 'لوحة التحكم CMS' : 'Admin CMS Dashboard') }}</span>
          </button>

          <button
            *ngFor="let item of navItems"
            (click)="handleNavClick(item.id)"
            [style.background-color]="activeTab === item.id ? 'var(--accent-teal-light)' : 'transparent'"
            [style.color]="activeTab === item.id ? 'var(--accent-teal)' : 'var(--primary-dark)'"
            [style.font-weight]="activeTab === item.id ? 800 : 600"
            style="display: flex; align-items: center; gap: 0.75rem; width: 100%; text-align: inherit; padding: 0.75rem 1rem; border-radius: var(--radius-md); border: none; font-size: 1rem; cursor: pointer;"
          >
            <span>{{ item.label }}</span>
          </button>

          <div style="margin-top: 1.25rem; display: flex; flex-direction: column; gap: 0.85rem;">
            <button
              (click)="lang.toggleLanguage(); toggleMobileMenu();"
              class="btn btn-outline"
              style="width: 100%; justify-content: center;"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
              <span>{{ lang.language() === 'en' ? 'تغيير إلى اللغة العربية' : 'Switch to English' }}</span>
            </button>

            <button
              (click)="handleNavClick('appointments')"
              class="btn btn-primary btn-lg"
              style="width: 100%; justify-content: center;"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
              <span>{{ lang.ui().bookAppointment }}</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <style>
      @media (max-width: 992px) {
        .desktop-nav { display: none !important; }
        .desktop-cta { display: none !important; }
        .desktop-only-btn { display: none !important; }
      }
      @media (min-width: 993px) {
        .mobile-hamburger { display: none !important; }
      }
    </style>
  `
})
export class HeaderComponent {
  lang = inject(LanguageService);

  @Input() activeTab: string = 'home';
  @Output() tabChange = new EventEmitter<string>();

  @Input() isAdmin: boolean = false;
  @Output() adminChange = new EventEmitter<boolean>();

  mobileMenuOpen = false;
  academicDropdownOpen = false;
  researchDropdownOpen = false;

  navItems = [
    { id: 'home', label: this.lang.ui().home },
    { id: 'about', label: this.lang.ui().about },
    { id: 'education', label: this.lang.ui().education },
    { id: 'certificates', label: this.lang.ui().certificates },
    { id: 'research', label: this.lang.ui().researchAreas },
    { id: 'publications', label: this.lang.ui().publications },
    { id: 'conferences', label: this.lang.ui().conferences },
    { id: 'articles', label: this.lang.ui().articles },
    { id: 'clinics', label: this.lang.ui().clinics },
    { id: 'socialMedia', label: this.lang.ui().socialMedia },
    { id: 'contact', label: this.lang.ui().contact }
  ];

  handleNavClick(tab: string): void {
    this.tabChange.emit(tab);
    this.mobileMenuOpen = false;
    this.academicDropdownOpen = false;
    this.researchDropdownOpen = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleAdmin(): void {
    this.adminChange.emit(!this.isAdmin);
    if (!this.isAdmin) this.handleNavClick('admin');
    else this.handleNavClick('home');
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    if (this.mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
}
