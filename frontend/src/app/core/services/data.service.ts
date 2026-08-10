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

  getExpertiseAreas(): ExpertiseArea[] {
    return this.expertise();
  }

  getEducation(): EducationItem[] {
    return this.education();
  }

  getTimeline(): CareerTimelineItem[] {
    return this.timeline();
  }

  getCertificates(): CertificateItem[] {
    return this.certificates();
  }

  getResearchAreas(): ResearchAreaItem[] {
    return this.researchAreas();
  }

  getResearchProjects(): ResearchProjectItem[] {
    return this.researchProjects();
  }

  getPublications(): PublicationItem[] {
    return this.publications();
  }

  getConferences(): ConferenceItem[] {
    return this.conferences();
  }

  getArticles(): ArticleItem[] {
    return this.articles();
  }

  getClinics(): ClinicLocation[] {
    return this.clinics();
  }

  updateAppointmentStatus(id: string, status: string): void {
    this.appointments.update(list =>
      list.map(a => a.id === id ? { ...a, status: status as any } : a)
    );
  }

  deleteAppointment(id: string): void {
    this.appointments.update(list => list.filter(a => a.id !== id));
  }

  markMessageRead(id: string): void {
    this.messages.update(list =>
      list.map(m => m.id === id ? { ...m, isRead: true } : m)
    );
  }

  deleteMessage(id: string): void {
    this.messages.update(list => list.filter(m => m.id !== id));
  }
}
