import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <!-- 1. HERO SECTION -->
      <section style="background-color: var(--primary-light); padding: 5rem 0 4rem 0; position: relative; overflow: hidden;">
        <div class="container">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 3.5rem; flex-wrap: wrap;">
            <!-- Hero Left Content -->
            <div style="flex: 1 1 500px; max-width: 640px;">
              <div class="badge badge-teal" style="margin-bottom: 1.25rem;">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/></svg>
                <span>{{ lang.getText(profile.title) }}</span>
              </div>

              <h1 style="color: var(--primary-dark); margin-bottom: 1rem; letter-spacing: -0.02em;">
                {{ lang.getText(profile.name) }}
              </h1>

              <div style="font-size: 1.15rem; color: var(--accent-teal); font-weight: 700; margin-bottom: 1.5rem; line-height: 1.4;">
                {{ getSubSpecialtiesString() }}
              </div>

              <p style="font-size: 1.1rem; color: var(--text-muted); margin-bottom: 2.5rem; line-height: 1.7;">
                "{{ lang.getText(profile.brandTagline) }}"
              </p>

              <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
                <button (click)="nav('appointments')" class="btn btn-primary btn-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                  <span>{{ lang.ui().bookAppointment }}</span>
                </button>

                <button (click)="nav('about')" class="btn btn-outline btn-lg">
                  <span>{{ lang.isRtl() ? 'استكشف الملف الشخصي' : 'Explore Profile' }}</span>
                  <svg *ngIf="!lang.isRtl()" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  <svg *ngIf="lang.isRtl()" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
                </button>
              </div>
            </div>

            <!-- Hero Right Image -->
            <div style="flex: 1 1 380px; display: flex; justify-content: center;">
              <div style="position: relative; max-width: 420px; width: 100%;">
                <div
                  style="border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-lg); border: 4px solid #ffffff; background-color: #ffffff;"
                >
                  <img
                    [src]="profile.doctorPortrait"
                    [alt]="lang.getText(profile.name)"
                    style="width: 100%; height: auto; display: block; object-fit: cover;"
                  />
                </div>

                <!-- Floating Badge on Image -->
                <div
                  style="position: absolute; bottom: -20px; background-color: #ffffff; padding: 1rem 1.25rem; border-radius: var(--radius-md); box-shadow: var(--shadow-md); border: 1px solid var(--border-light); display: flex; align-items: center; gap: 0.85rem;"
                  [style.right]="lang.isRtl() ? '-20px' : 'auto'"
                  [style.left]="lang.isRtl() ? 'auto' : '-20px'"
                >
                  <div
                    style="width: 42px; height: 42px; border-radius: 50%; background-color: var(--accent-teal-light); display: flex; align-items: center; justify-content: center;"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                  </div>
                  <div>
                    <div style="font-weight: 800; font-size: 1rem; color: var(--primary-dark);">
                      15+ {{ lang.isRtl() ? 'سنوات خبرة' : 'Years Experience' }}
                    </div>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">
                      {{ lang.isRtl() ? 'رعاية طبية تخصصية' : 'Evidence-Based Medicine' }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. QUICK STATISTICS COUNTER -->
      <section style="background-color: var(--primary-dark); color: #ffffff; padding: 3rem 0;">
        <div class="container">
          <div class="grid-4" style="text-align: center;">
            <div style="padding: 1rem;">
              <div style="font-size: 2.75rem; font-weight: 800; color: var(--gold-accent); margin-bottom: 0.25rem;">
                {{ profile.experienceYears }}+
              </div>
              <div style="font-size: 0.95rem; color: #E2E8F0; font-weight: 600;">
                {{ lang.ui().yearsExperience }}
              </div>
            </div>

            <div style="padding: 1rem;">
              <div style="font-size: 2.75rem; font-weight: 800; color: var(--gold-accent); margin-bottom: 0.25rem;">
                {{ profile.publicationCount }}+
              </div>
              <div style="font-size: 0.95rem; color: #E2E8F0; font-weight: 600;">
                {{ lang.ui().publishedResearch }}
              </div>
            </div>

            <div style="padding: 1rem;">
              <div style="font-size: 2.75rem; font-weight: 800; color: var(--gold-accent); margin-bottom: 0.25rem;">
                {{ profile.conferenceCount }}+
              </div>
              <div style="font-size: 0.95rem; color: #E2E8F0; font-weight: 600;">
                {{ lang.ui().speakingConferences }}
              </div>
            </div>

            <div style="padding: 1rem;">
              <div style="font-size: 2.75rem; font-weight: 800; color: var(--gold-accent); margin-bottom: 0.25rem;">
                {{ profile.certificationCount }}+
              </div>
              <div style="font-size: 0.95rem; color: #E2E8F0; font-weight: 600;">
                {{ lang.ui().verifiedCertificates }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. ABOUT PREVIEW -->
      <section class="section">
        <div class="container">
          <div style="display: flex; align-items: center; gap: 3rem; flex-wrap: wrap;">
            <div style="flex: 1 1 450px;">
              <span class="section-subtitle">{{ lang.isRtl() ? 'نبذة عن الطبيب' : 'About the Physician' }}</span>
              <h2 style="margin-bottom: 1.5rem;">{{ lang.isRtl() ? 'الالتزام والخبرة الجراحية' : 'Surgical Excellence & Care' }}</h2>
              <p style="font-size: 1.08rem; line-height: 1.8; margin-bottom: 2rem;">
                {{ lang.getText(profile.bioIntro) }}
              </p>
              <button (click)="nav('about')" class="btn btn-navy">
                <span>{{ lang.isRtl() ? 'قراءة الملف الكامل' : 'Read Full Profile' }}</span>
                <svg *ngIf="!lang.isRtl()" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                <svg *ngIf="lang.isRtl()" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
              </button>
            </div>
            <div style="flex: 1 1 450px;">
              <div class="card" style="background-color: var(--bg-alt); border-left: 4px solid var(--accent-teal);">
                <h3 style="margin-bottom: 1rem; color: var(--primary-dark);">
                  {{ lang.isRtl() ? 'الرؤية والنهج العلاجي' : 'Clinical Philosophy' }}
                </h3>
                <p style="line-height: 1.7; color: var(--text-muted);">
                  {{ lang.getText(profile.fullBio) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. AREAS OF EXPERTISE -->
      <section class="section section-alt">
        <div class="container">
          <div class="section-header">
            <span class="section-subtitle">{{ lang.isRtl() ? 'المجالات الطبية' : 'Medical Specialties' }}</span>
            <h2>{{ lang.isRtl() ? 'التخصصات والخدمات المتقدمة' : 'Areas of Expertise' }}</h2>
          </div>

          <div class="grid-4">
            <div *ngFor="let exp of data.expertise()" class="card card-hover">
              <div style="margin-bottom: 1.25rem;">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2"><path d="M4.8 2.3A.3.3 0 0 0 4.5 2.6V5A6 6 0 0 0 16.5 5V2.6a.3.3 0 0 0-.3-.3h-1.4a.3.3 0 0 0-.3.3V5a3.5 3.5 0 0 1-7 0V2.6a.3.3 0 0 0-.3-.3H4.8z"/><path d="M10.5 11v6a3.5 3.5 0 0 0 7 0v-1"/><circle cx="17.5" cy="14.5" r="2.5"/></svg>
              </div>
              <h3 style="font-size: 1.2rem; margin-bottom: 0.75rem;">
                {{ lang.getText(exp.title) }}
              </h3>
              <p style="font-size: 0.92rem; line-height: 1.6;">
                {{ lang.getText(exp.description) }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. CLINICS PREVIEW -->
      <section class="section">
        <div class="container">
          <div class="section-header">
            <span class="section-subtitle">{{ lang.isRtl() ? 'المواقع والمواعيد' : 'Locations & Hours' }}</span>
            <h2>{{ lang.isRtl() ? 'عيادات الفروع المتاحة' : 'Clinic Locations' }}</h2>
            <p style="margin-top: 0.5rem;">
              {{ lang.isRtl() ? 'اختر العيادة الأقرب لك واطلع على مواعيد الاستشارات المتاحة.' : 'Choose the location that works best for you and book your appointment.' }}
            </p>
          </div>

          <div class="grid-3">
            <div *ngFor="let clinic of data.getClinics()" class="card card-hover" style="display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                  <h3 style="color: var(--primary-dark); font-size: 1.35rem;">
                    {{ lang.getText(clinic.name) }}
                  </h3>
                  <span class="badge badge-navy">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    {{ lang.getText(clinic.city) }}
                  </span>
                </div>

                <p style="font-size: 0.95rem; margin-bottom: 1.25rem; color: var(--text-muted);">
                  {{ lang.getText(clinic.address) }}
                </p>

                <div style="background-color: var(--bg-alt); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1.5rem;">
                  <div style="font-weight: 700; font-size: 0.85rem; color: var(--primary-navy); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.4rem;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <span>{{ lang.isRtl() ? 'مواعيد العمل:' : 'Working Hours:' }}</span>
                  </div>
                  <div *ngFor="let wh of clinic.workingHours" style="font-size: 0.88rem; color: var(--text-main); margin-bottom: 0.25rem;">
                    • {{ lang.getText(wh) }}
                  </div>
                </div>
              </div>

              <div style="display: flex; gap: 0.75rem;">
                <button (click)="nav('appointments')" class="btn btn-primary btn-sm" style="flex: 1;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                  <span>{{ lang.ui().bookAppointment }}</span>
                </button>
                <button (click)="nav('clinics')" class="btn btn-outline btn-sm">
                  <span>{{ lang.isRtl() ? 'التفاصيل' : 'View Details' }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 6. LATEST PUBLICATIONS -->
      <section class="section section-alt">
        <div class="container">
          <div class="section-header">
            <span class="section-subtitle">{{ lang.isRtl() ? 'الإنتاج العلمي' : 'Research Output' }}</span>
            <h2>{{ lang.isRtl() ? 'أحدث المنشورات والأبحاث' : 'Latest Publications' }}</h2>
          </div>

          <div class="grid-3">
            <div *ngFor="let pub of getLatestPublications()" class="card card-hover" style="display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div class="badge badge-teal" style="margin-bottom: 0.85rem; font-size: 0.75rem;">
                  {{ pub.type }} • {{ pub.year }}
                </div>
                <h3 style="font-size: 1.1rem; margin-bottom: 0.75rem; line-height: 1.4;">
                  {{ lang.getText(pub.title) }}
                </h3>
                <div style="font-size: 0.85rem; color: var(--accent-teal); font-weight: 600; margin-bottom: 0.75rem;">
                  {{ pub.journal }}
                </div>
                <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 1.25rem;">
                  {{ lang.getText(pub.abstract).slice(0, 140) }}...
                </p>
              </div>

              <button (click)="nav('publications')" class="btn btn-outline btn-sm" style="width: 100%; justify-content: center;">
                <span>{{ lang.isRtl() ? 'عرض البحث' : 'View Publication' }}</span>
                <svg *ngIf="!lang.isRtl()" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                <svg *ngIf="lang.isRtl()" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
              </button>
            </div>
          </div>

          <div style="text-align: center; margin-top: 2.5rem;">
            <button (click)="nav('publications')" class="btn btn-navy">
              <span>{{ lang.isRtl() ? 'تصفح كافة المنشورات' : 'Explore All Publications' }}</span>
              <svg *ngIf="!lang.isRtl()" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              <svg *ngIf="lang.isRtl()" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            </button>
          </div>
        </div>
      </section>

      <!-- 7. FEATURED ARTICLE & UPCOMING CONFERENCE -->
      <section class="section">
        <div class="container">
          <div class="grid-2">
            <!-- Featured Article Card -->
            <div *ngIf="getFeaturedArticle()" class="card" style="border-top: 4px solid var(--accent-teal);">
              <span class="section-subtitle">{{ lang.isRtl() ? 'مقالة مميزة' : 'Featured Article' }}</span>
              <h3 style="font-size: 1.3rem; margin-bottom: 0.75rem; margin-top: 0.25rem;">
                {{ lang.getText(getFeaturedArticle()!.title) }}
              </h3>
              <div style="font-size: 0.85rem; color: var(--text-light); margin-bottom: 1rem;">
                {{ lang.getText(getFeaturedArticle()!.category) }} • {{ getFeaturedArticle()!.readingTime }} read
              </div>
              <p style="font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
                {{ lang.getText(getFeaturedArticle()!.summary) }}
              </p>
              <button (click)="nav('articles')" class="btn btn-primary btn-sm">
                <span>{{ lang.isRtl() ? 'قراءة المقال' : 'Read Article' }}</span>
                <svg *ngIf="!lang.isRtl()" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                <svg *ngIf="lang.isRtl()" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
              </button>
            </div>

            <!-- Upcoming Conference Banner -->
            <div *ngIf="getUpcomingConference()" class="card" style="background-color: var(--primary-dark); color: #ffffff;">
              <span class="badge badge-gold" style="margin-bottom: 0.85rem;">
                {{ lang.isRtl() ? 'مؤتمر قادم' : 'Upcoming Conference' }}
              </span>
              <h3 style="color: #ffffff; font-size: 1.3rem; margin-bottom: 0.75rem;">
                {{ lang.getText(getUpcomingConference()!.eventName) }}
              </h3>
              <div style="font-size: 0.9rem; color: var(--gold-accent); font-weight: 600; margin-bottom: 0.5rem;">
                📅 {{ getUpcomingConference()!.date }} | 📍 {{ lang.getText(getUpcomingConference()!.location) }}
              </div>
              <div style="font-size: 0.9rem; color: #E2E8F0; margin-bottom: 1.25rem;">
                <strong>{{ lang.isRtl() ? 'الدور:' : 'Role:' }}</strong> {{ lang.getText(getUpcomingConference()!.role) }} <br />
                <strong>{{ lang.isRtl() ? 'الموضوع:' : 'Topic:' }}</strong> "{{ lang.getText(getUpcomingConference()!.topic) }}"
              </div>
              <button (click)="nav('conferences')" class="btn btn-outline btn-sm" style="color: #ffffff; border-color: #475569;">
                <span>{{ lang.isRtl() ? 'عرض التفاصيل' : 'View Details' }}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 8. FINAL CTA -->
      <section style="background-color: var(--primary-light); padding: 4.5rem 0; text-align: center;">
        <div class="container" style="max-width: 800px;">
          <h2 style="margin-bottom: 1rem; color: var(--primary-dark);">
            {{ lang.isRtl() ? 'احجز موعد كشف واستشارة جراحة الأطفال' : 'Schedule Your Surgical Consultation' }}
          </h2>
          <p style="font-size: 1.1rem; color: var(--text-muted); margin-bottom: 2rem; line-height: 1.7;">
            {{ lang.isRtl() ? 'اختر الفرع المناسب و الموعد المفضل لطلب استشارة أو متابعة حالة طفلك.' : 'Select your preferred clinic branch and time slot for specialized care.' }}
          </p>
          <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
            <button (click)="nav('appointments')" class="btn btn-primary btn-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
              <span>{{ lang.ui().bookAppointment }}</span>
            </button>
            <button (click)="nav('contact')" class="btn btn-outline btn-lg">
              <span>{{ lang.isRtl() ? 'تواصل مع العيادة' : 'Contact Clinic' }}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  `
})
export class HomeComponent {
  lang = inject(LanguageService);
  data = inject(DataService);

  @Output() tabChange = new EventEmitter<string>();

  profile = this.data.getProfile();

  nav(tab: string): void {
    this.tabChange.emit(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getSubSpecialtiesString(): string {
    return this.profile.subSpecialties.map(s => this.lang.getText(s)).join('  •  ');
  }

  getLatestPublications() {
    return this.data.getPublications().slice(0, 3);
  }

  getFeaturedArticle() {
    const articles = this.data.getArticles();
    return articles.find(a => a.isFeatured) || articles[0];
  }

  getUpcomingConference() {
    return this.data.conferences().find(c => c.isUpcoming);
  }
}
