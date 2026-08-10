import { Injectable, signal } from '@angular/core';
import {
  DoctorProfile,
  ExpertiseArea,
  EducationItem,
  CareerTimelineItem,
  CertificateItem,
  ResearchAreaItem,
  ResearchProjectItem,
  PublicationItem,
  ConferenceItem,
  ArticleItem,
  ClinicLocation,
  SocialLink,
  SiteSettings,
  AppointmentBooking,
  ContactMessage
} from '../models';

import {
  initialDoctorProfile,
  initialExpertiseAreas,
  initialEducation,
  initialCareerTimeline,
  initialCertificates,
  initialResearchAreas,
  initialResearchProjects,
  initialPublications,
  initialConferences,
  initialArticles,
  initialClinics,
  initialSocialLinks,
  initialSiteSettings,
  initialAppointments,
  initialContactMessages
} from '../../../data/demoData';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  readonly profile = signal<DoctorProfile>(initialDoctorProfile);
  readonly expertise = signal<ExpertiseArea[]>(initialExpertiseAreas);
  readonly education = signal<EducationItem[]>(initialEducation);
  readonly timeline = signal<CareerTimelineItem[]>(initialCareerTimeline);
  readonly certificates = signal<CertificateItem[]>(initialCertificates);
  readonly researchAreas = signal<ResearchAreaItem[]>(initialResearchAreas);
  readonly researchProjects = signal<ResearchProjectItem[]>(initialResearchProjects);
  readonly publications = signal<PublicationItem[]>(initialPublications);
  readonly conferences = signal<ConferenceItem[]>(initialConferences);
  readonly articles = signal<ArticleItem[]>(initialArticles);
  readonly clinics = signal<ClinicLocation[]>(initialClinics);
  readonly socialLinks = signal<SocialLink[]>(initialSocialLinks);
  readonly settings = signal<SiteSettings>(initialSiteSettings);
  readonly appointments = signal<AppointmentBooking[]>(initialAppointments);
  readonly messages = signal<ContactMessage[]>(initialContactMessages);

  getProfile(): DoctorProfile {
    return this.profile();
  }

  getSettings(): SiteSettings {
    return this.settings();
  }

  getClinics(): ClinicLocation[] {
    return this.clinics();
  }

  getArticles(): ArticleItem[] {
    return this.articles();
  }

  getPublications(): PublicationItem[] {
    return this.publications();
  }

  addAppointment(booking: Omit<AppointmentBooking, 'id' | 'bookingRef' | 'createdAt' | 'status'>): AppointmentBooking {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const newBooking: AppointmentBooking = {
      ...booking,
      id: `appt-${Date.now()}`,
      bookingRef: `DR-2026-${randomNum}`,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    this.appointments.update(list => [newBooking, ...list]);
    return newBooking;
  }

  addMessage(msg: { fullName: string; email: string; phone: string; subject: string; message: string; }): void {
    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      ...msg,
      createdAt: new Date().toISOString(),
      isRead: false
    };
    this.messages.update(list => [newMsg, ...list]);
  }

  resetToDefaults(): void {
    this.profile.set(initialDoctorProfile);
    this.expertise.set(initialExpertiseAreas);
    this.education.set(initialEducation);
    this.timeline.set(initialCareerTimeline);
    this.certificates.set(initialCertificates);
    this.researchAreas.set(initialResearchAreas);
    this.researchProjects.set(initialResearchProjects);
    this.publications.set(initialPublications);
    this.conferences.set(initialConferences);
    this.articles.set(initialArticles);
    this.clinics.set(initialClinics);
    this.socialLinks.set(initialSocialLinks);
    this.settings.set(initialSiteSettings);
    this.appointments.set(initialAppointments);
    this.messages.set(initialContactMessages);
  }
}
