import type {
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
} from '../types';

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
  initialAppointments,
  initialMessages,
  initialSiteSettings
} from '../data/demoData';

const STORAGE_KEYS = {
  PROFILE: 'dr_ibrahim_profile',
  EXPERTISE: 'dr_ibrahim_expertise',
  EDUCATION: 'dr_ibrahim_education',
  TIMELINE: 'dr_ibrahim_timeline',
  CERTIFICATES: 'dr_ibrahim_certificates',
  RESEARCH_AREAS: 'dr_ibrahim_research_areas',
  RESEARCH_PROJECTS: 'dr_ibrahim_research_projects',
  PUBLICATIONS: 'dr_ibrahim_publications',
  CONFERENCES: 'dr_ibrahim_conferences',
  ARTICLES: 'dr_ibrahim_articles',
  CLINICS: 'dr_ibrahim_clinics',
  SOCIAL_LINKS: 'dr_ibrahim_social_links',
  APPOINTMENTS: 'dr_ibrahim_appointments',
  MESSAGES: 'dr_ibrahim_messages',
  SETTINGS: 'dr_ibrahim_settings'
};

// Event emitter target for state changes
const eventTarget = new EventTarget();
export const DATA_CHANGE_EVENT = 'dr_ibrahim_data_changed';

function getItem<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (err) {
    console.error(`Error reading ${key} from localStorage`, err);
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    eventTarget.dispatchEvent(new CustomEvent(DATA_CHANGE_EVENT, { detail: { key } }));
  } catch (err) {
    console.error(`Error writing ${key} to localStorage`, err);
  }
}

export const dataService = {
  // Event listener subscription
  subscribe(callback: () => void): () => void {
    const handler = () => callback();
    eventTarget.addEventListener(DATA_CHANGE_EVENT, handler);
    return () => eventTarget.removeEventListener(DATA_CHANGE_EVENT, handler);
  },

  // Reset all data to initial demo data
  resetToDemoData(): void {
    setItem(STORAGE_KEYS.PROFILE, initialDoctorProfile);
    setItem(STORAGE_KEYS.EXPERTISE, initialExpertiseAreas);
    setItem(STORAGE_KEYS.EDUCATION, initialEducation);
    setItem(STORAGE_KEYS.TIMELINE, initialCareerTimeline);
    setItem(STORAGE_KEYS.CERTIFICATES, initialCertificates);
    setItem(STORAGE_KEYS.RESEARCH_AREAS, initialResearchAreas);
    setItem(STORAGE_KEYS.RESEARCH_PROJECTS, initialResearchProjects);
    setItem(STORAGE_KEYS.PUBLICATIONS, initialPublications);
    setItem(STORAGE_KEYS.CONFERENCES, initialConferences);
    setItem(STORAGE_KEYS.ARTICLES, initialArticles);
    setItem(STORAGE_KEYS.CLINICS, initialClinics);
    setItem(STORAGE_KEYS.SOCIAL_LINKS, initialSocialLinks);
    setItem(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
    setItem(STORAGE_KEYS.MESSAGES, initialMessages);
    setItem(STORAGE_KEYS.SETTINGS, initialSiteSettings);
  },

  // Profile
  getProfile(): DoctorProfile {
    return getItem(STORAGE_KEYS.PROFILE, initialDoctorProfile);
  },
  saveProfile(profile: DoctorProfile): void {
    setItem(STORAGE_KEYS.PROFILE, profile);
  },

  // Expertise Areas
  getExpertiseAreas(): ExpertiseArea[] {
    return getItem(STORAGE_KEYS.EXPERTISE, initialExpertiseAreas);
  },
  saveExpertiseAreas(areas: ExpertiseArea[]): void {
    setItem(STORAGE_KEYS.EXPERTISE, areas);
  },

  // Education
  getEducation(): EducationItem[] {
    return getItem(STORAGE_KEYS.EDUCATION, initialEducation);
  },
  saveEducation(items: EducationItem[]): void {
    setItem(STORAGE_KEYS.EDUCATION, items);
  },

  // Career Timeline
  getTimeline(): CareerTimelineItem[] {
    return getItem(STORAGE_KEYS.TIMELINE, initialCareerTimeline);
  },
  saveTimeline(items: CareerTimelineItem[]): void {
    setItem(STORAGE_KEYS.TIMELINE, items);
  },

  // Certificates
  getCertificates(): CertificateItem[] {
    return getItem(STORAGE_KEYS.CERTIFICATES, initialCertificates);
  },
  saveCertificates(items: CertificateItem[]): void {
    setItem(STORAGE_KEYS.CERTIFICATES, items);
  },

  // Research Areas
  getResearchAreas(): ResearchAreaItem[] {
    return getItem(STORAGE_KEYS.RESEARCH_AREAS, initialResearchAreas);
  },
  saveResearchAreas(areas: ResearchAreaItem[]): void {
    setItem(STORAGE_KEYS.RESEARCH_AREAS, areas);
  },

  // Research Projects
  getResearchProjects(): ResearchProjectItem[] {
    return getItem(STORAGE_KEYS.RESEARCH_PROJECTS, initialResearchProjects);
  },
  saveResearchProjects(projects: ResearchProjectItem[]): void {
    setItem(STORAGE_KEYS.RESEARCH_PROJECTS, projects);
  },

  // Publications
  getPublications(): PublicationItem[] {
    return getItem(STORAGE_KEYS.PUBLICATIONS, initialPublications);
  },
  savePublications(items: PublicationItem[]): void {
    setItem(STORAGE_KEYS.PUBLICATIONS, items);
  },

  // Conferences
  getConferences(): ConferenceItem[] {
    return getItem(STORAGE_KEYS.CONFERENCES, initialConferences);
  },
  saveConferences(items: ConferenceItem[]): void {
    setItem(STORAGE_KEYS.CONFERENCES, items);
  },

  // Articles / Blog
  getArticles(): ArticleItem[] {
    return getItem(STORAGE_KEYS.ARTICLES, initialArticles);
  },
  saveArticles(items: ArticleItem[]): void {
    setItem(STORAGE_KEYS.ARTICLES, items);
  },

  // Clinics
  getClinics(): ClinicLocation[] {
    return getItem(STORAGE_KEYS.CLINICS, initialClinics);
  },
  saveClinics(items: ClinicLocation[]): void {
    setItem(STORAGE_KEYS.CLINICS, items);
  },

  // Social Links
  getSocialLinks(): SocialLink[] {
    return getItem(STORAGE_KEYS.SOCIAL_LINKS, initialSocialLinks);
  },
  saveSocialLinks(items: SocialLink[]): void {
    setItem(STORAGE_KEYS.SOCIAL_LINKS, items);
  },

  // Appointments
  getAppointments(): AppointmentBooking[] {
    return getItem(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
  },
  addAppointment(booking: Omit<AppointmentBooking, 'id' | 'bookingRef' | 'createdAt' | 'status'>): AppointmentBooking {
    const existing = this.getAppointments();
    const newRef = `DES-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: AppointmentBooking = {
      ...booking,
      id: `app-${Date.now()}`,
      bookingRef: newRef,
      createdAt: new Date().toISOString(),
      status: 'Pending'
    };
    setItem(STORAGE_KEYS.APPOINTMENTS, [newBooking, ...existing]);
    return newBooking;
  },
  updateAppointmentStatus(id: string, status: AppointmentBooking['status']): void {
    const appointments = this.getAppointments();
    const updated = appointments.map(app => app.id === id ? { ...app, status } : app);
    setItem(STORAGE_KEYS.APPOINTMENTS, updated);
  },
  deleteAppointment(id: string): void {
    const appointments = this.getAppointments();
    setItem(STORAGE_KEYS.APPOINTMENTS, appointments.filter(a => a.id !== id));
  },

  // Contact Messages
  getMessages(): ContactMessage[] {
    return getItem(STORAGE_KEYS.MESSAGES, initialMessages);
  },
  addMessage(msg: Omit<ContactMessage, 'id' | 'createdAt' | 'isRead'>): ContactMessage {
    const existing = this.getMessages();
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString(),
      isRead: false
    };
    setItem(STORAGE_KEYS.MESSAGES, [newMsg, ...existing]);
    return newMsg;
  },
  markMessageRead(id: string): void {
    const messages = this.getMessages();
    const updated = messages.map(m => m.id === id ? { ...m, isRead: true } : m);
    setItem(STORAGE_KEYS.MESSAGES, updated);
  },
  deleteMessage(id: string): void {
    const messages = this.getMessages();
    setItem(STORAGE_KEYS.MESSAGES, messages.filter(m => m.id !== id));
  },

  // Site Settings
  getSettings(): SiteSettings {
    return getItem(STORAGE_KEYS.SETTINGS, initialSiteSettings);
  },
  saveSettings(settings: SiteSettings): void {
    setItem(STORAGE_KEYS.SETTINGS, settings);
  }
};
