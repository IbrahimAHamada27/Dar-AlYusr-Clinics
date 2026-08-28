import { Component, OnInit, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from './core/services/language.service';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HomeComponent } from './features/home/home.component';
import { SchedulesComponent } from './features/schedules/schedules.component';
import { DoctorsComponent } from './features/doctors/doctors.component';
import { DentalClinicComponent } from './features/dental-clinic/dental-clinic.component';
import { ClinicsComponent } from './features/clinics/clinics.component';
import { AppointmentsComponent } from './features/appointments/appointments.component';
import { ContactComponent } from './features/contact/contact.component';
import { AboutComponent } from './features/about/about.component';
import { AdminDashboardComponent } from './features/admin-dashboard/admin-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SchedulesComponent,
    DoctorsComponent,
    DentalClinicComponent,
    ClinicsComponent,
    AppointmentsComponent,
    ContactComponent,
    AboutComponent,
    AdminDashboardComponent
  ],
  template: `
    <div [dir]="lang.isRtl() ? 'rtl' : 'ltr'" style="min-height: 100vh; display: flex; flex-direction: column; background-color: #f8fafc; color: #0f172a;">
      <app-header
        [activeTab]="activeTab"
        [isAdmin]="isAdmin"
        (tabChange)="setTab($event)"
        (adminToggle)="toggleAdmin($event)"
      ></app-header>

      <main style="flex: 1;">
        <app-home *ngIf="activeTab === 'home'" (tabChange)="setTab($event)"></app-home>
        <app-schedules *ngIf="activeTab === 'schedules'"></app-schedules>
        <app-doctors *ngIf="activeTab === 'doctors'" (tabChange)="setTab($event)"></app-doctors>
        <app-dental-clinic *ngIf="activeTab === 'dental'"></app-dental-clinic>
        <app-clinics *ngIf="activeTab === 'clinics'" (tabChange)="setTab($event)"></app-clinics>
        <app-appointments *ngIf="activeTab === 'appointments'"></app-appointments>
        <app-contact *ngIf="activeTab === 'contact'" (tabChange)="setTab($event)"></app-contact>
        <app-about *ngIf="activeTab === 'about'" (tabChange)="setTab($event)"></app-about>
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
      this.activeTab = rawHash;
    } else {
      this.activeTab = 'home';
    }
  }

  setTab(tab: string): void {
    this.activeTab = tab;
    if (window.location.hash !== '#' + tab) {
      history.pushState(null, '', '#' + tab);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleAdmin(val: boolean): void {
    this.isAdmin = val;
    if (val) this.setTab('admin');
    else this.setTab('home');
  }
}
