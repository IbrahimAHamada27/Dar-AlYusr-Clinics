import { Component, OnInit, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from './core/services/language.service';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HomeComponent } from './features/home/home.component';
import { AboutComponent } from './features/about/about.component';
import { EducationComponent } from './features/education/education.component';
import { CertificatesComponent } from './features/certificates/certificates.component';
import { ResearchComponent } from './features/research/research.component';
import { PublicationsComponent } from './features/publications/publications.component';
import { ConferencesComponent } from './features/conferences/conferences.component';
import { ArticlesComponent } from './features/articles/articles.component';
import { ClinicsComponent } from './features/clinics/clinics.component';
import { AppointmentsComponent } from './features/appointments/appointments.component';
import { SocialMediaComponent } from './features/social-media/social-media.component';
import { ContactComponent } from './features/contact/contact.component';
import { AdminDashboardComponent } from './features/admin-dashboard/admin-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    EducationComponent,
    CertificatesComponent,
    ResearchComponent,
    PublicationsComponent,
    ConferencesComponent,
    ArticlesComponent,
    ClinicsComponent,
    AppointmentsComponent,
    SocialMediaComponent,
    ContactComponent,
    AdminDashboardComponent
  ],
  template: `
    <div [dir]="lang.isRtl() ? 'rtl' : 'ltr'" style="min-height: 100vh; display: flex; flex-direction: column;">
      <app-header
        [activeTab]="activeTab"
        [isAdmin]="isAdmin"
        (tabChange)="setTab($event)"
        (adminToggle)="toggleAdmin($event)"
      ></app-header>

      <main style="flex: 1;">
        <app-home *ngIf="activeTab === 'home'" (tabChange)="setTab($event)"></app-home>
        <app-about *ngIf="activeTab === 'about'" (tabChange)="setTab($event)"></app-about>
        <app-education *ngIf="activeTab === 'education'"></app-education>
        <app-certificates *ngIf="activeTab === 'certificates'"></app-certificates>
        <app-research *ngIf="activeTab === 'research'"></app-research>
        <app-publications *ngIf="activeTab === 'publications'"></app-publications>
        <app-conferences *ngIf="activeTab === 'conferences'"></app-conferences>
        <app-articles *ngIf="activeTab === 'articles'"></app-articles>
        <app-clinics *ngIf="activeTab === 'clinics'" (tabChange)="setTab($event)" (selectClinic)="selectedClinicId = $event"></app-clinics>
        <app-appointments *ngIf="activeTab === 'appointments'" [initialClinicId]="selectedClinicId"></app-appointments>
        <app-social-media *ngIf="activeTab === 'socialMedia'"></app-social-media>
        <app-contact *ngIf="activeTab === 'contact'" (tabChange)="setTab($event)"></app-contact>
        <app-admin-dashboard *ngIf="activeTab === 'admin'"></app-admin-dashboard>
      </main>

      <app-footer (tabChange)="setTab($event)"></app-footer>
    </div>
  `
})
export class AppComponent implements OnInit {
  lang = inject(LanguageService);

  activeTab = 'home';
  isAdmin = false;
  selectedClinicId = '';

  ngOnInit(): void {
    this.syncTabFromUrl();
  }

  @HostListener('window:popstate')
  @HostListener('window:hashchange')
  onUrlChange(): void {
    this.syncTabFromUrl();
  }

  syncTabFromUrl(): void {
    const rawHash = window.location.hash.replace('#', '').trim();
    if (rawHash) {
      if (rawHash === 'social-media') this.activeTab = 'socialMedia';
      else this.activeTab = rawHash;
    } else {
      this.activeTab = 'home';
    }
  }

  setTab(tab: string): void {
    this.activeTab = tab;
    const urlHash = tab === 'socialMedia' ? 'social-media' : tab;
    if (window.location.hash !== '#' + urlHash) {
      history.pushState(null, '', '#' + urlHash);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleAdmin(val: boolean): void {
    this.isAdmin = val;
    if (val) this.setTab('admin');
    else this.setTab('home');
  }
}
