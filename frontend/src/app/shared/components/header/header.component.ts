import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header style="position: sticky; top: 0; z-index: 900;" class="glass-header">
      <!-- ROW 1: Doctor Name & Academic Title Section (Dedicated Line) -->
      <div style="padding: 0.85rem 1.25rem; border-bottom: 1px solid var(--border-light); background: rgba(255, 255, 255, 0.85);">
        <div class="container" style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
          <!-- Doctor Brand Info -->
          <div
            (click)="nav('home')"
            style="display: flex; align-items: center; gap: 0.85rem; cursor: pointer; flex-shrink: 0;"
          >
            <div
              style="width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg, #0B132B 0%, #1C2541 100%); color: #ffffff; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(11, 19, 43, 0.2); border: 1.5px solid var(--gold-accent); flex-shrink: 0;"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2.2"><path d="M4.8 2.3A.3.3 0 0 0 4.5 2.6V5A6 6 0 0 0 16.5 5V2.6a.3.3 0 0 0-.3-.3h-1.4a.3.3 0 0 0-.3.3V5a3.5 3.5 0 0 1-7 0V2.6a.3.3 0 0 0-.3-.3H4.8z"/><path d="M10.5 11v6a3.5 3.5 0 0 0 7 0v-1"/><circle cx="17.5" cy="14.5" r="2.5"/></svg>
            </div>
            <div>
              <div style="font-weight: 800; font-size: 1.25rem; color: var(--primary-dark); line-height: 1.15; letter-spacing: -0.01em;">
                {{ lang.isRtl() ? 'د. أمل محمد عبدالستار حماده' : 'Dr. Aml Mohamed Abd El-Sattar Hamada' }}
              </div>
              <div style="font-size: 0.82rem; color: var(--accent-teal); font-weight: 700; margin-top: 3px;">
                {{ lang.isRtl() ? 'أستاذ مساعد التشريح الآدمي وعلم الأجنة - كلية الطب جامعة طنطا | استشاري النساء والتوليد' : 'Associate Professor of Anatomy & Embryology — Tanta Faculty of Medicine | OB-GYN Consultant' }}
              </div>
            </div>
          </div>

          <!-- Quick Direct Contact Details on Name Row -->
          <div class="desktop-only-btn" style="display: flex; align-items: center; gap: 1rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; font-weight: 700; color: var(--primary-dark); background-color: var(--bg-alt); padding: 0.4rem 0.9rem; border-radius: var(--radius-full); border: 1px solid var(--border-light);">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--gold-accent)" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>01003514770</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; font-weight: 700; color: var(--primary-dark); background-color: var(--bg-alt); padding: 0.4rem 0.9rem; border-radius: var(--radius-full); border: 1px solid var(--border-light);">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2.2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <span>amal.hamada&#64;med.tanta.edu.eg</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ROW 2: Navigation Buttons & Control Actions (Underneath the Name Row) -->
      <div style="padding: 0.5rem 1.25rem; background-color: #FFFFFF;">
        <div class="container" style="display: flex; align-items: center; justify-content: space-between; gap: 1rem;">
          <!-- Desktop Navigation Links -->
          <nav style="display: flex; align-items: center; gap: 0.5rem;" class="desktop-nav">
            <button
              (click)="nav('home')"
              [class.active]="activeTab === 'home'"
              class="nav-link-btn"
            >
              {{ lang.ui().home }}
            </button>

            <button
              (click)="nav('about')"
              [class.active]="activeTab === 'about'"
              class="nav-link-btn"
            >
              {{ lang.ui().about }}
            </button>

            <!-- Academic Dropdown -->
            <div style="position: relative;">
              <button
                (click)="academicOpen = !academicOpen; researchOpen = false;"
                [class.active]="['education', 'certificates'].includes(activeTab)"
                class="nav-link-btn"
              >
                {{ lang.ui().academic }}
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
              </button>

              <div
                *ngIf="academicOpen"
                style="position: absolute; top: 100%; margin-top: 0.5rem; background-color: #ffffff; border-radius: var(--radius-md); box-shadow: var(--shadow-lg); border: 1px solid var(--border-light); padding: 0.5rem 0; min-width: 190px; z-index: 99;"
                [style.right]="lang.isRtl() ? '0' : 'auto'"
                [style.left]="lang.isRtl() ? 'auto' : '0'"
              >
                <button (click)="nav('education')" style="display: block; width: 100%; padding: 0.5rem 1rem; border: none; background: none; cursor: pointer; font-size: 0.88rem; font-weight: 600;" [style.text-align]="lang.isRtl() ? 'right' : 'left'">
                  {{ lang.ui().education }}
                </button>
                <button (click)="nav('certificates')" style="display: block; width: 100%; padding: 0.5rem 1rem; border: none; background: none; cursor: pointer; font-size: 0.88rem; font-weight: 600;" [style.text-align]="lang.isRtl() ? 'right' : 'left'">
                  {{ lang.ui().certificates }}
                </button>
              </div>
            </div>

            <!-- Research Dropdown -->
            <div style="position: relative;">
              <button
                (click)="researchOpen = !researchOpen; academicOpen = false;"
                [class.active]="['research', 'publications', 'conferences', 'articles'].includes(activeTab)"
                class="nav-link-btn"
              >
                {{ lang.ui().research }}
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
              </button>

              <div
                *ngIf="researchOpen"
                style="position: absolute; top: 100%; margin-top: 0.5rem; background-color: #ffffff; border-radius: var(--radius-md); box-shadow: var(--shadow-lg); border: 1px solid var(--border-light); padding: 0.5rem 0; min-width: 210px; z-index: 99;"
                [style.right]="lang.isRtl() ? '0' : 'auto'"
                [style.left]="lang.isRtl() ? 'auto' : '0'"
              >
                <button (click)="nav('research')" style="display: block; width: 100%; padding: 0.5rem 1rem; border: none; background: none; cursor: pointer; font-size: 0.88rem; font-weight: 600;" [style.text-align]="lang.isRtl() ? 'right' : 'left'">
                  {{ lang.ui().researchAreas }}
                </button>
                <button (click)="nav('publications')" style="display: block; width: 100%; padding: 0.5rem 1rem; border: none; background: none; cursor: pointer; font-size: 0.88rem; font-weight: 600;" [style.text-align]="lang.isRtl() ? 'right' : 'left'">
                  {{ lang.ui().publications }}
                </button>
                <button (click)="nav('conferences')" style="display: block; width: 100%; padding: 0.5rem 1rem; border: none; background: none; cursor: pointer; font-size: 0.88rem; font-weight: 600;" [style.text-align]="lang.isRtl() ? 'right' : 'left'">
                  {{ lang.ui().conferences }}
                </button>
                <button (click)="nav('articles')" style="display: block; width: 100%; padding: 0.5rem 1rem; border: none; background: none; cursor: pointer; font-size: 0.88rem; font-weight: 600;" [style.text-align]="lang.isRtl() ? 'right' : 'left'">
                  {{ lang.ui().articles }}
                </button>
              </div>
            </div>

            <button
              (click)="nav('clinics')"
              [class.active]="activeTab === 'clinics'"
              class="nav-link-btn"
            >
              {{ lang.ui().clinics }}
            </button>

            <button
              (click)="nav('socialMedia')"
              [class.active]="activeTab === 'socialMedia'"
              class="nav-link-btn"
            >
              {{ lang.ui().socialMedia }}
            </button>

            <button
              (click)="nav('contact')"
              [class.active]="activeTab === 'contact'"
              class="nav-link-btn"
            >
              {{ lang.ui().contact }}
            </button>
          </nav>

          <!-- Control Action Buttons (Language, Admin, CTA) -->
          <div style="display: flex; align-items: center; gap: 0.6rem; width: 100%; justify-content: flex-end;" class="header-actions">
            <!-- Language Toggle Button -->
            <button
              (click)="lang.toggleLanguage()"
              class="btn btn-outline btn-pill btn-sm"
              style="padding: 0.42rem 0.75rem; gap: 0.35rem; font-size: 0.825rem; font-weight: 700;"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              <span>{{ lang.language() === 'en' ? 'عربي' : 'English' }}</span>
            </button>

            <!-- Admin Toggle Button (Desktop Only) -->
            <button
              (click)="toggleAdmin()"
              [class]="isAdmin ? 'btn btn-navy btn-pill btn-sm desktop-only-btn' : 'btn btn-outline btn-pill btn-sm desktop-only-btn'"
              style="padding: 0.42rem 0.8rem; gap: 0.35rem; font-size: 0.825rem; font-weight: 700;"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
              <span>{{ isAdmin ? (lang.isRtl() ? 'الموقع العام' : 'Public Site') : (lang.isRtl() ? 'التحكم CMS' : 'Admin CMS') }}</span>
            </button>

            <!-- Book Appointment CTA Button (Desktop Only) -->
            <button
              (click)="nav('appointments')"
              class="btn btn-primary btn-sm desktop-cta"
              style="gap: 0.4rem; padding: 0.48rem 1.05rem; font-weight: 700;"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
              <span>{{ lang.ui().bookAppointment }}</span>
            </button>

            <!-- Mobile Hamburger Button -->
            <button
              (click)="mobileMenuOpen = !mobileMenuOpen"
              class="mobile-hamburger"
              style="width: 40px; height: 40px; border-radius: 10px; background-color: var(--bg-alt); border: 1px solid var(--border-light); display: flex; align-items: center; justify-content: center; cursor: pointer; padding: 0;"
              aria-label="Toggle Navigation Menu"
            >
              <svg *ngIf="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary-dark)" stroke-width="2"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
              <svg *ngIf="mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary-dark)" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
        </div>
      </div>

      <!-- 100% Solid Fullscreen Mobile & Tablet Drawer -->
      <div
        *ngIf="mobileMenuOpen"
        [dir]="lang.isRtl() ? 'rtl' : 'ltr'"
        class="mobile-drawer-overlay"
      >
        <!-- Mobile Drawer Header -->
        <div
          style="padding: 1rem 1.25rem; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-light); background-color: #FFFFFF;"
        >
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div
              style="width: 40px; height: 40px; border-radius: 10px; background: linear-gradient(135deg, #0B132B 0%, #1C2541 100%); color: #ffffff; display: flex; align-items: center; justify-content: center; border: 1px solid var(--gold-accent);"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2.2"><path d="M4.8 2.3A.3.3 0 0 0 4.5 2.6V5A6 6 0 0 0 16.5 5V2.6a.3.3 0 0 0-.3-.3h-1.4a.3.3 0 0 0-.3.3V5a3.5 3.5 0 0 1-7 0V2.6a.3.3 0 0 0-.3-.3H4.8z"/><path d="M10.5 11v6a3.5 3.5 0 0 0 7 0v-1"/><circle cx="17.5" cy="14.5" r="2.5"/></svg>
            </div>
            <div>
              <div style="font-weight: 800; font-size: 1.05rem; color: var(--primary-dark);">
                {{ lang.isRtl() ? 'د. أمل محمد عبدالستار حماده' : 'Dr. Aml Mohamed Abd El-Sattar Hamada' }}
              </div>
              <div style="font-size: 0.75rem; color: var(--accent-teal); font-weight: 600;">
                {{ lang.isRtl() ? 'أستاذ مساعد التشريح وعلم الأجنة واستشاري النساء والتوليد' : 'Associate Professor & OB-GYN Consultant' }}
              </div>
            </div>
          </div>

          <button
            (click)="mobileMenuOpen = false"
            style="width: 38px; height: 38px; border-radius: 50%; background-color: var(--bg-alt); border: none; display: flex; align-items: center; justify-content: center; cursor: pointer;"
            aria-label="Close Navigation Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary-dark)" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <!-- Mobile Drawer Body Links -->
        <div style="padding: 1.25rem; flex: 1; display: flex; flex-direction: column; gap: 0.4rem;">
          <!-- Admin CMS Access Item inside Drawer -->
          <button
            (click)="toggleAdmin(); mobileMenuOpen = false;"
            style="display: flex; align-items: center; gap: 0.75rem; width: 100%; padding: 0.75rem 1rem; border-radius: var(--radius-md); background-color: var(--primary-light); color: var(--primary-navy); font-weight: 700; font-size: 0.95rem; border: 1px solid rgba(30, 62, 98, 0.2); margin-bottom: 0.5rem; cursor: pointer;"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-navy)" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
            <span>{{ isAdmin ? (lang.isRtl() ? 'الموقع العام' : 'Public Site') : (lang.isRtl() ? 'لوحة التحكم CMS' : 'Admin CMS Dashboard') }}</span>
          </button>

          <button
            *ngFor="let item of navItems"
            (click)="nav(item.id)"
            [style.background-color]="activeTab === item.id ? 'var(--accent-teal-light)' : 'transparent'"
            [style.color]="activeTab === item.id ? 'var(--accent-teal)' : 'var(--primary-dark)'"
            [style.font-weight]="activeTab === item.id ? '800' : '600'"
            style="display: flex; align-items: center; gap: 0.75rem; width: 100%; padding: 0.75rem 1rem; border-radius: var(--radius-md); border: none; font-size: 1rem; cursor: pointer;"
            [style.text-align]="lang.isRtl() ? 'right' : 'left'"
          >
            <span>{{ item.label }}</span>
          </button>

          <!-- Mobile Action Controls -->
          <div style="margin-top: 1.25rem; display: flex; flex-direction: column; gap: 0.85rem;">
            <button
              (click)="lang.toggleLanguage(); mobileMenuOpen = false;"
              class="btn btn-outline"
              style="width: 100%; justify-content: center;"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              <span>{{ lang.language() === 'en' ? 'تغيير إلى اللغة العربية' : 'Switch to English' }}</span>
            </button>

            <button
              (click)="nav('appointments')"
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

    <!-- Mobile Floating Action Bar (Sticky at bottom for smartphones) -->
    <nav class="mobile-bottom-bar" [dir]="lang.isRtl() ? 'rtl' : 'ltr'">
      <button (click)="nav('home')" [class.active]="activeTab === 'home'" class="mobile-bottom-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        <span>{{ lang.ui().home }}</span>
      </button>

      <button (click)="nav('clinics')" [class.active]="activeTab === 'clinics'" class="mobile-bottom-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
        <span>{{ lang.ui().clinics }}</span>
      </button>

      <button (click)="nav('appointments')" class="mobile-bottom-item mobile-bottom-cta">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
        <span>{{ lang.ui().bookAppointment }}</span>
      </button>

      <a href="tel:01003514770" class="mobile-bottom-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        <span>{{ lang.isRtl() ? 'اتصال' : 'Call' }}</span>
      </a>

      <button (click)="mobileMenuOpen = true" class="mobile-bottom-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        <span>{{ lang.isRtl() ? 'القائمة' : 'Menu' }}</span>
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
  academicOpen = false;
  researchOpen = false;

  get navItems() {
    const ui = this.lang.ui();
    return [
      { id: 'home', label: ui.home },
      { id: 'about', label: ui.about },
      { id: 'education', label: ui.education },
      { id: 'certificates', label: ui.certificates },
      { id: 'research', label: ui.researchAreas },
      { id: 'publications', label: ui.publications },
      { id: 'conferences', label: ui.conferences },
      { id: 'articles', label: ui.articles },
      { id: 'clinics', label: ui.clinics },
      { id: 'socialMedia', label: ui.socialMedia },
      { id: 'contact', label: ui.contact }
    ];
  }

  nav(tab: string): void {
    this.tabChange.emit(tab);
    this.mobileMenuOpen = false;
    this.academicOpen = false;
    this.researchOpen = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleAdmin(): void {
    this.adminToggle.emit(!this.isAdmin);
    if (!this.isAdmin) this.nav('admin');
    else this.nav('home');
  }
}
