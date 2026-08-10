import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from './core/services/language.service';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

// Feature Components
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
    <div [attr.dir]="lang.isRtl() ? 'rtl' : 'ltr'" style="display: flex; flex-direction: column; min-height: 100vh;">
      <app-header
        [activeTab]="activeTab"
        (tabChange)="activeTab = $event"
        [isAdmin]="isAdmin"
        (adminChange)="isAdmin = $event"
      ></app-header>

      <main style="flex: 1;">
        <app-home *ngIf="activeTab === 'home'" (tabChange)="activeTab = $event"></app-home>
        <app-about *ngIf="activeTab === 'about'" (tabChange)="activeTab = $event"></app-about>
        <app-education *ngIf="activeTab === 'education'"></app-education>
        <app-certificates *ngIf="activeTab === 'certificates'"></app-certificates>
        <app-research *ngIf="activeTab === 'research'"></app-research>
        <app-publications *ngIf="activeTab === 'publications'"></app-publications>
        <app-conferences *ngIf="activeTab === 'conferences'"></app-conferences>
        <app-articles *ngIf="activeTab === 'articles'"></app-articles>
        <app-clinics *ngIf="activeTab === 'clinics'" (tabChange)="activeTab = $event"></app-clinics>
        <app-appointments *ngIf="activeTab === 'appointments'"></app-appointments>
        <app-social-media *ngIf="activeTab === 'socialMedia'"></app-social-media>
        <app-contact *ngIf="activeTab === 'contact'"></app-contact>
        <app-admin-dashboard *ngIf="activeTab === 'admin'"></app-admin-dashboard>
      </main>

      <app-footer (tabChange)="activeTab = $event"></app-footer>
    </div>
  `
})
export class AppComponent {
  lang = inject(LanguageService);

  activeTab: string = 'home';
  isAdmin: boolean = false;
}
