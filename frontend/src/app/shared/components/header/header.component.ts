import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header style="position: sticky; top: 0; z-index: 900;" class="glass-header">
      <!-- ROW 1: Doctor Name & Quick Actions (Compact Single Row on Mobile) -->
      <div style="padding: 0.6rem 1rem; border-bottom: 1px solid var(--border-light); background: rgba(255, 255, 255, 0.95);">
        <div class="container" style="display: flex; align-items: center; justify-content: space-between; gap: 0.75rem;">
          <!-- Doctor Brand Info -->
          <div
            (click)="nav('home')"
            style="display: flex; align-items: center; gap: 0.65rem; cursor: pointer; flex-shrink: 1; min-width: 0;"
          >
            <div
              style="width: 40px; height: 40px; border-radius: 10px; background: linear-gradient(135deg, #0B132B 0%, #1C2541 100%); color: #ffffff; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(11, 19, 43, 0.15); border: 1.5px solid var(--gold-accent); flex-shrink: 0;"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2.2"><path d="M4.8 2.3A.3.3 0 0 0 4.5 2.6V5A6 6 0 0 0 16.5 5V2.6a.3.3 0 0 0-.3-.3h-1.4a.3.3 0 0 0-.3.3V5a3.5 3.5 0 0 1-7 0V2.6a.3.3 0 0 0-.3-.3H4.8z"/><path d="M10.5 11v6a3.5 3.5 0 0 0 7 0v-1"/><circle cx="17.5" cy="14.5" r="2.5"/></svg>
            </div>
            <div style="min-width: 0; flex-shrink: 1;">
              <!-- Shortened name for mobile display so it NEVER clips -->
              <div style="font-weight: 800; font-size: 1.05rem; color: var(--primary-dark); line-height: 1.25; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">
                {{ lang.isRtl() ? 'د. أمل حماده' : 'Dr. Aml Hamada' }}
              </div>
              <div class="hide-on-mobile" style="font-size: 0.8rem; color: var(--accent-teal); font-weight: 700; margin-top: 2px;">
                {{ lang.isRtl() ? 'أستاذ مساعد التشريح الآدمي وعلم الأجنة | استشاري النساء والتوليد' : 'Associate Professor & OB-GYN Consultant' }}
              </div>
            </div>
          </div>

          <!-- Header Actions (Language Switcher, Phone Info, Mobile Hamburger) -->
          <div style="display: flex; align-items: center; gap: 0.5rem; flex-shrink: 0;">
            <!-- Language Toggle Button -->
            <button
              (click)="lang.toggleLanguage()"
              class="btn btn-outline btn-pill btn-sm"
              style="padding: 0.35rem 0.65rem; gap: 0.3rem; font-size: 0.8rem; font-weight: 700;"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              <span>{{ lang.language() === 'en' ? 'عربي' : 'English' }}</span>
            </button>

            <!-- Desktop Direct Phone Pill -->
            <div class="desktop-only-btn" style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.82rem; font-weight: 700; color: var(--primary-dark); background-color: var(--bg-alt); padding: 0.35rem 0.75rem; border-radius: var(--radius-full); border: 1px solid var(--border-light);">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold-accent)" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>01003514770</span>
            </div>

            <!-- Mobile Hamburger Button -->
            <button
              (click)="mobileMenuOpen = !mobileMenuOpen"
              class="mobile-hamburger"
              style="width: 38px; height: 38px; border-radius: 8px; background-color: var(--bg-alt); border: 1px solid var(--border-light); display: flex; align-items: center; justify-content: center; cursor: pointer; padding: 0;"
              aria-label="Toggle Navigation Menu"
            >
              <svg *ngIf="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-dark)" stroke-width="2"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
              <svg *ngIf="mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-dark)" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
        </div>
      </div>

      <!-- ROW 2: Navigation Links (Desktop Only) -->
      <div class="desktop-only-btn" style="padding: 0.5rem 1.25rem; background-color: #FFFFFF; border-bottom: 1px solid var(--border-light);">
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

          <!-- Control Action Buttons (Admin & Book CTA) -->
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <button
              (click)="toggleAdmin()"
              [class]="isAdmin ? 'btn btn-navy btn-pill btn-sm' : 'btn btn-outline btn-pill btn-sm'"
              style="padding: 0.42rem 0.8rem; gap: 0.35rem; font-size: 0.825rem; font-weight: 700;"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
              <span>{{ isAdmin ? (lang.isRtl() ? 'الموقع العام' : 'Public Site') : (lang.isRtl() ? 'التحكم CMS' : 'Admin CMS') }}</span>
            </button>

            <button
              (click)="nav('appointments')"
              class="btn btn-primary btn-sm"
              style="gap: 0.4rem; padding: 0.48rem 1.05rem; font-weight: 700;"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
              <span>{{ lang.ui().bookAppointment }}</span>
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
          style="padding: 1rem 1.25rem; display: flex; align-items: center; justify-content: space-between; border-bottom: 1.5px solid var(--border-light); background-color: #FFFFFF;"
        >
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div
              style="width: 42px; height: 42px; border-radius: 10px; background: linear-gradient(135deg, #0B132B 0%, #1C2541 100%); color: #ffffff; display: flex; align-items: center; justify-content: center; border: 1.5px solid var(--gold-accent);"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2.2"><path d="M4.8 2.3A.3.3 0 0 0 4.5 2.6V5A6 6 0 0 0 16.5 5V2.6a.3.3 0 0 0-.3-.3h-1.4a.3.3 0 0 0-.3.3V5a3.5 3.5 0 0 1-7 0V2.6a.3.3 0 0 0-.3-.3H4.8z"/><path d="M10.5 11v6a3.5 3.5 0 0 0 7 0v-1"/><circle cx="17.5" cy="14.5" r="2.5"/></svg>
            </div>
            <div>
              <div style="font-weight: 800; font-size: 1.05rem; color: var(--primary-dark);">
                {{ lang.isRtl() ? 'د. أمل محمد عبدالستار حماده' : 'Dr. Aml Mohamed Abd El-Sattar Hamada' }}
              </div>
              <div style="font-size: 0.75rem; color: var(--accent-teal); font-weight: 700;">
                {{ lang.isRtl() ? 'أستاذ مساعد التشريح الآدمي وعلم الأجنة | استشاري النساء والتوليد' : 'Associate Professor & OB-GYN Consultant' }}
              </div>
            </div>
          </div>

          <button
            (click)="mobileMenuOpen = false"
            style="width: 38px; height: 38px; border-radius: 50%; background-color: var(--bg-alt); border: 1px solid var(--border-light); display: flex; align-items: center; justify-content: center; cursor: pointer;"
            aria-label="Close Navigation Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-dark)" stroke-width="2.2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <!-- Mobile Drawer Body Links with Structured Layout and Visual Highlights -->
        <div style="padding: 1.25rem; flex: 1; display: flex; flex-direction: column; gap: 0.5rem; overflow-y: auto;">
          <!-- Admin CMS Access Item inside Drawer -->
          <button
            (click)="toggleAdmin(); mobileMenuOpen = false;"
            style="display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 0.8rem 1rem; border-radius: var(--radius-md); background: linear-gradient(135deg, #0B132B 0%, #1C2541 100%); color: #ffffff; font-weight: 700; font-size: 0.95rem; border: 1px solid var(--gold-accent); margin-bottom: 0.75rem; cursor: pointer; box-shadow: var(--shadow-sm);"
          >
            <div style="display: flex; align-items: center; gap: 0.65rem;">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold-accent)" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
              <span>{{ isAdmin ? (lang.isRtl() ? 'العودة للموقع العام' : 'Public Site') : (lang.isRtl() ? 'لوحة التحكم CMS' : 'Admin CMS Dashboard') }}</span>
            </div>
            <span style="font-size: 0.75rem; background: var(--gold-accent); color: #000; font-weight: 800; padding: 0.15rem 0.5rem; border-radius: var(--radius-full);">CMS</span>
          </button>

          <!-- Categorized Navigation Items with Icons & Active Highlights -->
          <button
            *ngFor="let item of navItems"
            (click)="nav(item.id)"
            [style.background-color]="activeTab === item.id ? 'var(--accent-teal-light)' : '#ffffff'"
            [style.color]="activeTab === item.id ? 'var(--accent-teal)' : 'var(--primary-dark)'"
            [style.font-weight]="activeTab === item.id ? '800' : '600'"
            [style.border-right]="activeTab === item.id && lang.isRtl() ? '4px solid var(--accent-teal)' : '1px solid var(--border-light)'"
            [style.border-left]="activeTab === item.id && !lang.isRtl() ? '4px solid var(--accent-teal)' : '1px solid var(--border-light)'"
            style="display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 0.8rem 1rem; border-radius: var(--radius-md); font-size: 0.95rem; cursor: pointer; transition: var(--transition-fast);"
          >
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <span style="color: var(--accent-teal); display: flex; align-items: center;">
                <svg *ngIf="item.id === 'home'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                <svg *ngIf="item.id === 'about'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <svg *ngIf="item.id === 'education'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                <svg *ngIf="item.id === 'certificates'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/></svg>
                <svg *ngIf="item.id === 'research'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0-14 0"/><path d="M9 14v2"/><path d="M9 12a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2z"/></svg>
                <svg *ngIf="item.id === 'publications'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/></svg>
                <svg *ngIf="item.id === 'conferences'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>
                <svg *ngIf="item.id === 'articles'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                <svg *ngIf="item.id === 'clinics'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <svg *ngIf="item.id === 'socialMedia'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
                <svg *ngIf="item.id === 'contact'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </span>
              <span>{{ item.label }}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" [style.transform]="lang.isRtl() ? 'rotate(180deg)' : 'none'"><path d="m9 18 6-6-6-6"/></svg>
          </button>

          <!-- Mobile Action Controls -->
          <div style="margin-top: 1.25rem; display: flex; flex-direction: column; gap: 0.85rem;">
            <button
              (click)="lang.toggleLanguage(); mobileMenuOpen = false;"
              class="btn btn-outline"
              style="width: 100%; justify-content: center; font-weight: 700;"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              <span>{{ lang.language() === 'en' ? 'تغيير إلى اللغة العربية' : 'Switch to English' }}</span>
            </button>

            <button
              (click)="nav('appointments')"
              class="btn btn-primary btn-lg"
              style="width: 100%; justify-content: center; font-weight: 800;"
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
        <span>{{ lang.isRtl() ? 'العيادات' : 'Clinics' }}</span>
      </button>

      <button (click)="nav('appointments')" class="mobile-bottom-item mobile-bottom-cta">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
        <span>{{ lang.isRtl() ? 'احجز كشف' : 'Book' }}</span>
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
